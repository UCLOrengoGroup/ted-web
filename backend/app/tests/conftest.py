import gzip
import logging
from collections.abc import Generator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, delete

from app import structure
from app.core.config import settings
from app.core.db import engine, init_db
from app.main import app as app_singleton
from app.models.db import DomainSummary, Item, User
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import get_superuser_token_headers

logger = logging.getLogger(__name__)
FIXTURES_DIR = Path(__file__).parent / 'fixtures'
FIXTURES_PDB_DIR = FIXTURES_DIR / 'pdb'

@pytest.fixture(scope="session", autouse=True)
def db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        init_db(session)
        yield session
        statement = delete(Item)
        session.execute(statement)
        statement = delete(User)
        session.execute(statement)
        statement = delete(DomainSummary)
        session.execute(statement)
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
        pdb_file = FIXTURES_PDB_DIR / 'AF-P12345-F1-model_v4.pdb.gz'
        logger.info(f"MOCK fetch PDB from AF with file: {pdb_file}")
        with gzip.open(str(pdb_file), mode='rt') as fh:
            pdb_content = fh.read(-1)
            return pdb_content

    monkeypatch.setattr(structure, "fetch_pdb_content_from_af", get_pdb_content_from_file)
