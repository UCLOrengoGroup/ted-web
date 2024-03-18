from fastapi.testclient import TestClient
from sqlmodel import Session
import logging

from app.core.config import settings
from app.tests.utils.uniprot_summary import create_random_domain_summary_entries

from logging import getLogger

logger = getLogger(__name__)

def test_read_uniprot_summary(
    client: TestClient, db: Session
) -> None:
    uni_sum_entries = create_random_domain_summary_entries(db)
    uni_acc = uni_sum_entries[0].uniprot_acc
    response = client.get(
        f"{settings.API_V1_STR}/uniprot/summary/{uni_acc}",
    )
    assert response.status_code == 200
    content = response.json()

    assert content["uniprot_entry"]["ac"] == uni_acc


def test_read_uniprot_summary_fails_with_404(
    client: TestClient, db: Session
) -> None:
    uni_acc = "A98765"
    response = client.get(
        f"{settings.API_V1_STR}/uniprot/summary/{uni_acc}",
    )
    assert response.status_code == 404
