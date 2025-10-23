import re

from app.api.afdb import AFDB_LATEST_VERSION

PROTEOME_ID_RE = re.compile(
    r"proteome-tax_id-(?P<proteome_id>\d+)-(\d+)_v(\d+).consensus_domains"
)
AF_ID_RE = re.compile(
    r"AF-(?P<uniprot_acc>[A-Z0-9]+)-(?P<frag_num>F[0-9]+)-model_v(?P<af_version>[0-9]+)"
)
TED_ID_RE = re.compile(
    r"AF-(?P<uniprot_acc>[A-Z0-9]+)-(?P<frag_num>F[0-9]+)-model_v(?P<af_version>[0-9]+)_(?P<ted_dom_num>TED[0-9]+)"
)


def ted_id_to_af_id(ted_id: str) -> str:
    m = AF_ID_RE.match(ted_id)
    if not m:
        raise ValueError(f"Invalid TED ID: {ted_id}")
    return m.group(0)


def af_id_to_latest_version(af_id: str) -> str:
    m = AF_ID_RE.match(af_id)
    if not m:
        raise ValueError(f"Invalid AF ID: {af_id}")
    uniprot_acc = m.group("uniprot_acc")
    frag_num = m.group("frag_num")
    latest_af_id = f"AF-{uniprot_acc}-{frag_num}-model_v{AFDB_LATEST_VERSION}"
    return latest_af_id

def ted_id_to_latest_version(ted_id: str) -> str:
    m = TED_ID_RE.match(ted_id)
    if not m:
        raise ValueError(f"Invalid TED ID: {ted_id}")
    uniprot_acc = m.group("uniprot_acc")
    frag_num = m.group("frag_num")
    latest_ted_id = f"AF-{uniprot_acc}-{frag_num}-model_v{AFDB_LATEST_VERSION}_{m.group('ted_dom_num')}"
    return latest_ted_id