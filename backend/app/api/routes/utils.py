import logging

from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr
import requests

from app.api.deps import get_current_active_superuser
from app.models.db import Message
from app.utils import generate_test_email, send_email
from app.exceptions import ExternalServiceError

LOG = logging.getLogger(__name__)

AFDB_ENTRY_URL = "https://alphafold.ebi.ac.uk/api/uniprot/summary/{uniprot_acc}.json"


router = APIRouter()


@router.post(
    "/test-email/",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=201,
)
def test_email(email_to: EmailStr) -> Message:
    """
    Test emails.
    """
    email_data = generate_test_email(email_to=email_to)
    send_email(
        email_to=email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Test email sent")


@router.get("/health-check/")
async def health_check() -> bool:
    return True


def uniprot_exists_in_afdb(uniprot_acc):
    """
    Check if the uniprot accession is in AFDB database.
    """

    afdb_url = AFDB_ENTRY_URL.format(uniprot_acc=uniprot_acc)
    try:
        LOG.info(f"Checking AFDB for uniprot acc {uniprot_acc}: {afdb_url}")
        response = requests.get(afdb_url, headers={"Accept": "application/json"})
        LOG.info(f" ... response={response}")
        return response.status_code == 200
    except requests.exceptions.RequestException as e:
        LOG.error(f"Error checking AFDB: {e}")
        raise ExternalServiceError("Error checking AFDB")
