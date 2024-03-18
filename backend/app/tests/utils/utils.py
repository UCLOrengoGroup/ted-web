import logging
import random
import string

from fastapi.testclient import TestClient

from app.core.config import settings

LOG = logging.getLogger(__name__)


def random_md5_string() -> str:
    return "".join(random.choices(string.hexdigits, k=32)).lower()


def random_lower_string() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=32))


def random_email() -> str:
    return f"{random_lower_string()}@{random_lower_string()}.com"


def get_superuser_token_headers(client: TestClient) -> dict[str, str]:
    login_data = {
        "username": settings.FIRST_SUPERUSER,
        "password": settings.FIRST_SUPERUSER_PASSWORD,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    LOG.error(f"get_superuser_token_headers.response: {r}")
    tokens = r.json()

    LOG.error(f"get_superuser_token_headers: {tokens}")
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}
    return headers
