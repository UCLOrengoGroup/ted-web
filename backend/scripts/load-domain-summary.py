import logging
import gzip
from io import FileIO
from pathlib import Path

from sqlmodel import Session
import typer
from typing_extensions import Annotated

from app.core.db import engine
from app.models.db import DomainSummary
from app.models.utils import TED_ID_RE, PROTEOME_ID_RE

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent / ".."
INITIAL_DATA_FILE = ROOT_DIR / "data" / "test100.domain_summary.tsv"
DEFAULT_CHUNK_SIZE = 100000

app = typer.Typer()


def load_domain_summary(
    session: Session,
    tsv_file: typer.FileText,
    chunk_size: int = 10000,
) -> None:
    """Loads domain summary data from a TSV file."""

    logger.info(
        f"Loading data from CSV file: {tsv_file.name} (chunk size: {chunk_size})"
    )

    line_count = 0
    for chunk_count, chunk_lines in enumerate(read_in_chunks(tsv_file, chunk_size), 1):
        logger.info(f"Chunk {chunk_count}: parsing {len(chunk_lines)} rows ...")
        try:
            for line in chunk_lines:
                line = line.strip()
                line_count += 1
                dom_summary = parse_domain_summary_line(line)
                session.add(dom_summary)

            logger.info(f"Chunk {chunk_count}: committing {len(chunk_lines)} rows ...")
            session.commit()
            logger.info(f"Chunk {chunk_count}: done")
        except Exception as e:
            logger.error(f"Error reading data '{line}' (line:{line_count}): {e}")
            session.rollback()
            raise


def parse_domain_summary_line(line: str) -> DomainSummary:
    """Parses a line from the domain summary TSV file and returns a DomainSummary object."""

    cols = line.split("\t")
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
    m = TED_ID_RE.match(ted_id)
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
    return dom


@app.command()
def load_domain_summary_from_file(
    tsv_file: Annotated[
        Path,
        typer.Argument(
            exists=True,
            file_okay=True,
            dir_okay=False,
            readable=True,
            resolve_path=True,
        ),
    ],
    chunk_size: int = typer.Option(
        DEFAULT_CHUNK_SIZE, help="Number of rows to commit in each transaction."
    ),
) -> None:
    """Loads domain summary data from a TSV file."""

    if str(tsv_file).endswith(".gz"):
        tsv_file_io = gzip.open(tsv_file, "rt")
    else:
        tsv_file_io = open(tsv_file, "rt")

    with Session(engine) as session:
        try:
            load_domain_summary(session, tsv_file_io, chunk_size=chunk_size)
        except Exception as e:
            logger.error(f"Error loading data: {e}")

    logger.info("DONE")


def read_in_chunks(file_object: FileIO, chunk_size=10000):
    """Yields chunks of lines from a file."""
    chunk = []
    for line in file_object:
        chunk.append(line)
        if len(chunk) == chunk_size:
            yield chunk
            chunk = []
    yield chunk


if __name__ == "__main__":
    typer.run(load_domain_summary_from_file)
