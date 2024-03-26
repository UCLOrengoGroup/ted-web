from logging import getLogger

from fastapi.testclient import TestClient
from sqlmodel import Session, select

from app.models.db import DomainSummary
from app.core.config import settings

logger = getLogger(__name__)


def test_read_uniprot_summary_passes(
    client: TestClient, db: Session, create_random_domain_summary_entries: callable
) -> None:

    uni_sum_entries = create_random_domain_summary_entries()

    uni_acc = uni_sum_entries[0].uniprot_acc
    response = client.get(
        f"{settings.API_V1_STR}/uniprot/summary/{uni_acc}",
    )
    assert response.status_code == 200
    content = response.json()

    first_entry = content["data"][0]
    assert first_entry["uniprot_acc"] == uni_acc


def test_read_uniprot_summary_fails_with_404(client: TestClient, db: Session) -> None:
    uni_acc = "A98765"
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
