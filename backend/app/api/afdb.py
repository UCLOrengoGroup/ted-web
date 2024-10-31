import logging
import requests

from app.exceptions import ExternalServiceError

LOG = logging.getLogger(__name__)

AFDB_ENTRY_URL = "https://alphafold.ebi.ac.uk/api/uniprot/summary/{uniprot_acc}.json"


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
