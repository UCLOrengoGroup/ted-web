from logging import getLogger

from fastapi.testclient import TestClient
from sqlmodel import Session, select

from app.models.db import (
    DomainSummary,
    InteractionSummary,
)
from app.core.config import settings

logger = getLogger(__name__)


def test_domain_summary(
    client: TestClient, db: Session, create_random_domain_summary_entries: callable
) -> None:

    uni_sum_entries = create_random_domain_summary_entries(interactions=True)
    ted_id = uni_sum_entries[0].ted_id
    uni_sum = db.get(DomainSummary, ted_id)
    assert [uni_sum.uniprot_acc == us.uniprot_acc for us in uni_sum_entries]
    assert [isinstance(int_sum, InteractionSummary) for int_sum in uni_sum.interactions]


def test_read_uniprot_summary_passes(
    client: TestClient, db: Session, create_random_domain_summary_entries: callable
) -> None:

    uni_sum_entries = create_random_domain_summary_entries(interactions=True)
    first_db_entry = uni_sum_entries[0]

    uni_acc = first_db_entry.uniprot_acc
    response = client.get(
        f"{settings.API_V1_STR}/uniprot/summary/{uni_acc}",
    )
    assert response.status_code == 200
    content = response.json()

    first_web_entry = content["data"][0]
    assert first_web_entry["uniprot_acc"] == first_db_entry.uniprot_acc

    assert "interactions" in first_web_entry
    assert first_web_entry["interactions"] == [
        i.model_dump() for i in first_db_entry.interactions
    ]


def test_read_real_uniprot_summary_returns_empty_result(
    client: TestClient,
    db: Session,
) -> None:

    # uniprot accession in AFDB, but not in this database
    uni_acc = "P12345"
    response = client.get(
        f"{settings.API_V1_STR}/uniprot/summary/{uni_acc}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content == {"data": [], "count": 0}


def test_read_uniprot_summary_fails_with_404(client: TestClient, db: Session) -> None:
    uni_acc = "NOT_A_REAL_UNIPROT_ACC"
    response = client.get(
        f"{settings.API_V1_STR}/uniprot/summary/{uni_acc}",
    )
    assert response.status_code == 404


def test_read_uniprot_3dbeacons_summary(
    client: TestClient, db: Session, create_random_domain_summary_entries: callable
) -> None:
    uni_sum_entries = create_random_domain_summary_entries()
    uni_acc = uni_sum_entries[0].uniprot_acc
    response = client.get(
        f"{settings.API_V1_STR}/uniprot/3dbeacons/summary/{uni_acc}",
    )
    assert response.status_code == 200
    content = response.json()

    assert content["uniprot_entry"]["ac"] == uni_acc


def test_read_uniprot_3dbeacons_summary_fails_with_404(
    client: TestClient, db: Session
) -> None:
    uni_acc = "A98765"
    response = client.get(
        f"{settings.API_V1_STR}/uniprot/3dbeacons/summary/{uni_acc}",
    )
    assert response.status_code == 404
