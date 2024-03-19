import logging
import re
from pathlib import Path

from sqlmodel import Session

from app.core.db import engine
from app.models.db import DomainSummary

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent / ".."
INITIAL_DATA_FILE = ROOT_DIR / "data" / "test100.domain_summary.tsv"

PROTEOME_ID_RE = re.compile(
    r"proteome-tax_id-(?P<proteome_id>\d+)-(\d+)_v(\d+).consensus_domains"
)
AF_ID_RE = re.compile(
    "AF-(?P<uniprot_acc>[A-Z0-9]+)-(?P<frag_num>F[0-9]+)-model_v(?P<af_version>[0-9]+)_(?P<ted_dom_num>TED[0-9]+)"
)


def load_domain_summary(session: Session, data_file: str) -> None:
    with open(str(data_file)) as f:
        for line in f:
            cols = line.strip().split("\t")
            if len(cols) != 21:
                msg = f"Invalid line: {line} (expected 21 columns, got {len(cols)}"
                raise ValueError(msg)

            proteome_id_raw = cols[12]
            m = PROTEOME_ID_RE.match(proteome_id_raw)
            if m is None:
                msg = f"Invalid proteome_id: {proteome_id_raw}"
                raise ValueError(msg)
            proteome_id = int(m.group("proteome_id"))
            del m

            ted_id = cols[0]
            m = AF_ID_RE.match(ted_id)
            if m is None:
                msg = f"Invalid TED domain id: {ted_id}"
                raise ValueError(msg)
            uniprot_acc = m.group("uniprot_acc")
            del m

            dom = DomainSummary(
                ted_id=ted_id,
                uniprot_acc=uniprot_acc,
                md5_domain=cols[1],
                consensus_level=cols[2],
                chopping=cols[3],
                nres_domain=int(cols[4]),
                num_segments=int(cols[5]),
                plddt=float(cols[6]),
                num_helix_strand_turn=int(cols[7]),
                num_helix=int(cols[8]),
                num_strand=int(cols[9]),
                num_helix_strand=int(cols[10]),
                num_turn=int(cols[11]),
                proteome_id=proteome_id,
                cath_label=cols[13],
                cath_assignment_level=cols[14],
                cath_assignment_method=cols[15],
                packing_density=float(cols[16]),
                norm_rg=float(cols[17]),
                tax_common_name=cols[18],
                tax_scientific_name=cols[19],
                tax_lineage=cols[20],
            )
            session.add(dom)

        session.commit()


def load_data(data_file) -> None:
    logger.info(f"Loading data from file: {data_file}")
    with Session(engine) as session:
        load_domain_summary(session, data_file)
    logger.info("Initial data created")


if __name__ == "__main__":
    load_data(INITIAL_DATA_FILE)
