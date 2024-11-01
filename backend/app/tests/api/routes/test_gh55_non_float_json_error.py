import pytest
from logging import getLogger
from unittest.mock import patch

from typing import Generator
from fastapi.testclient import TestClient
from sqlmodel import Session, select

from app.models.db import (
    DomainSummary,
    InteractionSummary,
    DomainSummaryPublic,
)
from app.core.config import settings

logger = getLogger(__name__)


@pytest.fixture(scope="function")
def domain_summary_entry(db) -> Generator[DomainSummary, None, None]:

    uniprot_acc = "A0A6P1NCC6"
    dom_summary = DomainSummary(
        ted_id=f"AF-{uniprot_acc}-F1-model_v4_TED01",
        uniprot_acc=uniprot_acc,
        md5_domain="38e717eada347ed434c63d30a1d332bf",
        consensus_level="medium",
        chopping="5-55",
        nres_domain=51,
        num_segments=1,
        plddt=54.1896,
        num_helix_strand_turn=2,
        num_helix=0,
        num_strand=2,
        num_helix_strand=2,
        num_turn=0,
        proteome_id=2697033,
        cath_label="-",
        cath_assignment_level="-",
        cath_assignment_method="-",
        packing_density="NaN",
        norm_rg=0.578,
        tax_common_name="-",
        tax_scientific_name="Aristophania_vespae",
        tax_lineage="cellular_organisms,Bacteria,Pseudomonadota,Alphaproteobacteria,Rhodospirillales,Acetobacteraceae,Aristophania",
    )

    logger.info(f"Adding domain summary {dom_summary.af_id} ...")
    db.add(dom_summary)
    db.commit()
    logger.info(f"  ...done")

    yield dom_summary

    logger.info(f"Deleting domain summary {dom_summary.af_id} ...")
    db.delete(dom_summary)
    db.commit()
    logger.info(f"  ...done")


def test_domain_summary_db(
    client: TestClient, db: Session, domain_summary_entry: DomainSummary
) -> None:

    ted_id = domain_summary_entry.ted_id
    uni_sum = db.get(DomainSummary, ted_id)
    uni_sum_dict = uni_sum.model_dump()
    assert uni_sum_dict["uniprot_acc"] == domain_summary_entry.uniprot_acc

    dom_sum_public = DomainSummaryPublic.model_validate(uni_sum_dict)
    assert dom_sum_public.uniprot_acc == domain_summary_entry.uniprot_acc


def test_domain_summary_api(
    client: TestClient, db: Session, domain_summary_entry: DomainSummary
) -> None:

    uni_acc = domain_summary_entry.uniprot_acc

    response = client.get(
        f"{settings.API_V1_STR}/uniprot/summary/{uni_acc}",
    )

    assert response.status_code == 200
    content = response.json()

    first_web_entry = content["data"][0]
    assert first_web_entry["uniprot_acc"] == uni_acc
    assert first_web_entry["packing_density"] == None
