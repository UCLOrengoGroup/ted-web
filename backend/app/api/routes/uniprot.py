import logging
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import select

from app.api.deps import SessionDep
from app.models.beacons import UniprotSummary
from app.models.db import (
    DomainSummary,
    DomainSummaryItemsPublic,
    ChainParse,
    ChainParseItemsPublic,
)
from app.transformers import create_uniprot_summary

from app.exceptions import ExternalServiceError
from ..afdb import uniprot_exists_in_afdb


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

    logger.info(f"Domain Summary Items: {domain_summary_items}")
    if len(domain_summary_items) == 0:
        check_uniprot(uniprot_acc)

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


@router.get("/chainparse/{uniprot_acc}", response_model=ChainParseItemsPublic)
def read_chainparse_by_uniprot(
    session: SessionDep, uniprot_acc: str, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve AFDB chain parses from individual methods.
    """

    statement = (
        select(ChainParse)
        .where(ChainParse.uniprot_acc == uniprot_acc)
        .offset(skip)
        .limit(limit)
    )

    chainparse_items = session.exec(statement).all()

    logger.info(f"ChainParse Items: {chainparse_items}")
    if len(chainparse_items) == 0:
        check_uniprot(uniprot_acc)

    uni_sum = ChainParseItemsPublic(data=chainparse_items, count=len(chainparse_items))

    return uni_sum


def check_uniprot(uniprot_acc: str):
    try:
        logger.info(f"Checking AFDB...")
        exists_in_afdb = uniprot_exists_in_afdb(uniprot_acc)
        logger.info(f"AFDB response: {exists_in_afdb}")
    except ExternalServiceError as e:
        raise HTTPException(status_code=500, detail=f"Error checking AFDB: {e}")

    if not exists_in_afdb:
        raise HTTPException(
            status_code=404,
            detail=f"UniProt accession '{uniprot_acc}' not found in AlphaFold DB",
        )
