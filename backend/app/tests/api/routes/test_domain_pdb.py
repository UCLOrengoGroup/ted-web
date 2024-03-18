from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.uniprot_summary import create_random_domain_summary
from app.tests.utils.uniprot_summary import create_ted_id_string
from logging import getLogger

logger = getLogger(__name__)

def test_read_domain_pdb(
    client: TestClient, 
    db: Session,
    mock_af_pdb: None
) -> None:
    
    uniprot_acc = "P12345"
    chopping = "1-100_200-250"

    logger.info("mock_af_pdb: {mock_af_pdb}")
    logger.info("mock_af_pdb: {app.}")

    dom_sum = create_random_domain_summary(uniprot_acc=uniprot_acc, chopping=chopping)
    db.add(dom_sum)
    db.commit()
    db.refresh(dom_sum)

    ted_id = dom_sum.ted_id
    response = client.get(
        f"{settings.API_V1_STR}/files/{ted_id}.pdb",
    )
    assert response.status_code == 200
    content = response.content.decode("utf-8")

    assert content is not None
        
    assert "ATOM" in content


def test_read_domain_pdb_fails_with_404(
    client: TestClient, db: Session
) -> None:
    uni_acc = "A98765"
    ted_id = create_ted_id_string(uni_acc, 1)
    response = client.get(
        f"{settings.API_V1_STR}/files/{ted_id}.pdb",
    )
    assert response.status_code == 404
