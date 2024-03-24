import re

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
