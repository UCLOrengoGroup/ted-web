import logging
from tempfile import NamedTemporaryFile
from typing import Any

from fastapi import APIRouter, HTTPException, Response
import requests
from sqlmodel import select

from app.api.deps import SessionDep
from app.models.db import DomainSummary
from app.structure import fetch_pdb_for_ted_domain

logger = logging.getLogger(__name__)

router = APIRouter()

FOLDSEEK_SEARCH_API_BASE = "https://search.foldseek.com/api"
FOLDSEEK_SEARCH_MODE = "3diaa"
FOLDSEEK_SEARCH_DATABASES = [
    "afdb50",
    "afdb-swissprot",
    "afdb-proteome",
    "pdb100",
    "gmgcl_id",
    "cath50"
]

@router.get(
    "/foldseek/{ted_id}",
    response_class=Response,
    responses={
        200: {
            "content": {"text/plain": {}},
            "description": "URL for FoldSeek search of TED consensus domain",
        },
        404: {"description": "Failed to find TED domain"},
    },
)
def create_consensus_domain_foldseek_search_url(
    session: SessionDep,
    ted_id: str
) -> str:
    """
    Create a link to search consensus domain against FoldSeek.
    """

    foldseek_api_base = FOLDSEEK_SEARCH_API_BASE

    foldseek_api_ticket_url = f"{foldseek_api_base}/ticket"
    foldseek_api_queue_url = f"{foldseek_api_base}/queue"

    statement = select(DomainSummary).where(DomainSummary.ted_id == ted_id)

    ted_domain = session.exec(statement).first()

    if not ted_domain:
        raise HTTPException(
            status_code=404, detail=f"Failed to find TED domain id {ted_id}"
        )

    pdb_text = fetch_pdb_for_ted_domain(ted_domain)

    # write PDB to temp file
    with NamedTemporaryFile(mode="wt", suffix=".pdb", delete=True) as tmp_pdb_file:
        tmp_pdb_file.write(pdb_text)
        tmp_pdb_file.flush()

        with open(tmp_pdb_file.name, "rb") as f:
            files = { "q": f }
            data = [
                ("mode", FOLDSEEK_SEARCH_MODE),
                *[("databases[]", db) for db in FOLDSEEK_SEARCH_DATABASES],
            ]
            response = requests.post(foldseek_api_ticket_url, files=files, data=data)
            response.raise_for_status()
            ticket = response.json().get("ticket")
            return Response(content=f"{foldseek_api_queue_url}/{ticket}", media_type="text/plain")


