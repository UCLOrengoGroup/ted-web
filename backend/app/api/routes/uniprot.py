import logging
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import select

from app.api.deps import SessionDep
from app.models.beacons import UniprotSummary
from app.models.db import DomainSummary, DomainSummaryItemsPublic
from app.transformers import create_uniprot_summary

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/summary/{uniprot_acc}", response_model=DomainSummaryItemsPublic)
def read_uniprot_summary(
    session: SessionDep, uniprot_acc: str, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve summary information for TED Domains.
    """

    statement = (
        select(DomainSummary)
        .where(DomainSummary.uniprot_acc == uniprot_acc)
        .offset(skip)
        .limit(limit)
    )

    domain_summary_items = session.exec(statement).all()

    if len(domain_summary_items) == 0:
        raise HTTPException(
            status_code=404, detail=f"No domains found for Uniprot Acc {uniprot_acc}"
        )

    uni_sum = DomainSummaryItemsPublic(
        data=domain_summary_items, count=len(domain_summary_items)
    )

    return uni_sum


@router.get("/3dbeacons/summary/{uniprot_acc}", response_model=UniprotSummary)
def read_uniprot_summary(
    session: SessionDep, uniprot_acc: str, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve summary information for TED Domains (3D Beacons format).
    """

    statement = (
        select(DomainSummary)
        .where(DomainSummary.uniprot_acc == uniprot_acc)
        .offset(skip)
        .limit(limit)
    )

    domain_summary_items = session.exec(statement).all()

    if len(domain_summary_items) == 0:
        raise HTTPException(
            status_code=404, detail=f"No domains found for Uniprot Acc {uniprot_acc}"
        )

    uni_sum = create_uniprot_summary(uniprot_acc, domain_summary_items)

    return uni_sum
