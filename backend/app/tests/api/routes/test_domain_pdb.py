from logging import getLogger

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.uniprot_summary import (
    create_random_domain_summary,
    create_ted_id_string,
)

logger = getLogger(__name__)


def test_read_domain_pdb(client: TestClient, db: Session, mock_af_pdb: None) -> None:

    uniprot_acc = "P12345"
    chopping = "1-100_200-250"

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

    # check that the residue numbers match the chopping
    residue_labels = []
    last_residue = None
    for line in content.split("\n"):
        if line.startswith("ATOM"):
            residue_label = line[22:26].strip()
            if residue_label != last_residue:
                residue_labels.append(residue_label)
            last_residue = residue_label

    assert residue_labels == [
        str(i) for i in list(range(1, 101)) + list(range(200, 251))
    ]


def test_read_domain_pdb_fails_with_404(client: TestClient, db: Session) -> None:
    uni_acc = "A98765"
    ted_id = create_ted_id_string(uni_acc, 1)
    response = client.get(
        f"{settings.API_V1_STR}/files/{ted_id}.pdb",
    )
    assert response.status_code == 404
