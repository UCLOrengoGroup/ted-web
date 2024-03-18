import logging
from typing import Any, Annotated

from fastapi import APIRouter, HTTPException, Body, Response
from sqlmodel import func, select

from app.api.deps import SessionDep
from app.models.db import DomainSummary
from app.models.beacons import UniprotSummary
from app.transformers import create_uniprot_summary
from app.structure import fetch_pdb_for_ted_domain


logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/{ted_id}.pdb", response_class=Response)
def read_consensus_domain_pdb(
    session: SessionDep, 
    ted_id: str,
    responses = {
        200: {
            "content": {
                "application/octet-stream": {}
            },
            "description": "PDB file for TED domain"
        },
        404: {
            "description": "Failed to find TED domain"
        }
    }
) -> Any:
    """
    Retrieve PDB data for TED Domain.
    """

    statement = (
        select(DomainSummary)
        .where(DomainSummary.ted_id == ted_id)
    )

    ted_domain = session.exec(statement).first()

    if not ted_domain:
        raise HTTPException(status_code=404, detail=f"Failed to find TED domain id {ted_id}")

    pdb_fh = fetch_pdb_for_ted_domain(ted_domain)

    pdb_lines = [] 
    for lineno, line in enumerate(pdb_fh):
       pdb_lines.append(line)
        
    pdb_bytes: bytes = "".join(pdb_lines).encode("utf-8")

    return Response(content=pdb_bytes, media_type="application/octet-stream")

