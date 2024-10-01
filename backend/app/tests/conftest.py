import gzip
import logging
from collections.abc import Generator
from pathlib import Path
import random

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, delete, select

from app import structure
from app.core.config import settings
from app.core.db import engine, init_db
from app.main import app as app_singleton
from app.models.db import DomainSummary, InteractionSummary, Item, User
from app.tests.utils.user import authentication_token_from_email

from app.tests.utils.utils import (
    get_superuser_token_headers,
    random_md5_string,
)
from app.tests.utils.uniprot_summary import (
    create_random_domain_summary,
    create_random_uniprot_acc,
    create_random_pae_score,
)

from app.models.utils import ted_id_to_af_id

logger = logging.getLogger(__name__)
FIXTURES_DIR = Path(__file__).parent / "fixtures"
FIXTURES_PDB_DIR = FIXTURES_DIR / "pdb"


@pytest.fixture(scope="session", autouse=True)
def db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        init_db(session)
        yield session
        logger.info("Tearing down InteractionSummary")
        statement = delete(InteractionSummary)
        logger.info(f"Executing statement: {statement}")
        session.exec(statement)
        logger.info("Tearing down DomainSummary")
        statement = delete(DomainSummary)
        logger.info(f"Executing statement: {statement}")
        session.exec(statement)
        logger.info(f" ... done")
        statement = delete(Item)
        session.exec(statement)
        statement = delete(User)
        session.exec(statement)
        logger.info(f"Session commit")
        session.commit()


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app_singleton) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> dict[str, str]:
    return get_superuser_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> dict[str, str]:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )


@pytest.fixture(scope="function")
def mock_af_pdb(monkeypatch) -> str:

    def get_pdb_content_from_file(_af_id: str) -> str:
        pdb_file = FIXTURES_PDB_DIR / "AF-P12345-F1-model_v4.pdb.gz"
        logger.info(f"MOCK fetch PDB from AF with file: {pdb_file}")
        with gzip.open(str(pdb_file), mode="rt") as fh:
            pdb_content = fh.read(-1)
            return pdb_content

    monkeypatch.setattr(
        structure, "fetch_pdb_content_from_af", get_pdb_content_from_file
    )


@pytest.fixture(scope="function")
def create_random_domain_summary_entries(db) -> Generator[list[DomainSummary]]:

    dom_ted_ids = []

    logger.info("Creating random domain summaries function")

    def _create_random_domain_summary_entries(
        interactions=True,
    ) -> list[DomainSummary]:
        uniprot_acc = create_random_uniprot_acc()
        md5 = random_md5_string()

        logger.info(f"Creating random domain summaries for {uniprot_acc}")

        entries = []
        for domain_num, _ in enumerate(range(2, 5), 1):
            dom_summary = create_random_domain_summary(uniprot_acc, domain_num, md5=md5)
            logger.info(f"   adding ted domain: {dom_summary.ted_id}")
            db.add(dom_summary)
            entries.append(dom_summary)
            dom_ted_ids.append(dom_summary.ted_id)

        random_pairs = []
        for i in range(len(entries)):
            for j in range(i + 1, len(entries)):
                random_pairs.append((entries[i].ted_id, entries[j].ted_id))

        for pair in random_pairs:
            af_id = ted_id_to_af_id(pair[0])
            int_sum = InteractionSummary(
                af_id=af_id,
                ted_id1=pair[0],
                ted_id2=pair[1],
                pae_score=create_random_pae_score(),
            )
            logger.info(f"   adding interaction: {int_sum}")
            db.add(int_sum)

        logger.info(f"Committing {len(dom_ted_ids)} domain summary entries")

        db.commit()

        logger.info(f"  ...done, returning {len(entries)} entries")

        return entries

    yield _create_random_domain_summary_entries

    # logger.info(f"Deleting {len(dom_ted_ids)} domain summaries")
    # statement = delete(DomainSummary).where(DomainSummary.ted_id.in_(dom_ted_ids))
    # logger.info(f"Deleting interaction summaries")
    statement = delete(InteractionSummary)
    logger.info(f"SQL: {statement}")
    db.exec(statement)
    logger.info(f"Deleting domain summaries")
    statement = delete(DomainSummary)
    logger.info(f"SQL: {statement}")
    db.exec(statement)
    db.commit()
    logger.info(f"  ...done")
