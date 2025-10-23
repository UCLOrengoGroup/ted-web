import logging
import subprocess
from tempfile import NamedTemporaryFile

import requests

from app.models.chopping import ChoppingNumeric
from app.models.db import DomainSummary
from app.models.utils import af_id_to_latest_version

logger = logging.getLogger(__name__)



def fetch_pdb_content_from_af(af_id: str) -> str:
    """
    Fetch PDB data from AlphaFold.
    """

    af_id_latest_version = af_id_to_latest_version(af_id)

    pdb_url = f"https://alphafold.ebi.ac.uk/files/{af_id_latest_version}.pdb"

    logger.info(f"GET: {pdb_url}")
    pdb_content = requests.get(pdb_url).content.decode("utf-8")
    if "ATOM" not in pdb_content:
        raise ValueError(
            f"No ATOM records found in PDB content for {af_id_latest_version} from AlphaFold"
        )
    return pdb_content


def fetch_pdb_for_ted_domain(ted_domain: DomainSummary) -> str:
    """
    Fetch PDB data for TED domain (get PDB coords from AF and chop).
    """
    ted_id = ted_domain.ted_id
    af_id = ted_domain.af_id
    chopping = ChoppingNumeric.from_chopping_str(
        domain_id=ted_id, chopping_str=ted_domain.chopping
    )

    logger.info(f"Fetching PDB data for TED domain {ted_id} from AlphaFold")

    pdb_content = fetch_pdb_content_from_af(af_id)

    tmp_pdb_file = NamedTemporaryFile(mode="wt", suffix=".pdb")
    tmp_pdb_file.write(pdb_content)
    tmp_pdb_file.flush()

    args = ["pdb_selres", "-" + chopping.to_selres_str(), tmp_pdb_file.name]
    logger.info(f"Running CMD: {' '.join(args)}")

    process = subprocess.run(args, stdout=subprocess.PIPE, text=True, check=True)

    return process.stdout
