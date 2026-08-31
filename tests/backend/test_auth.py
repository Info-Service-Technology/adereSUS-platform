import pytest
from httpx import AsyncClient
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.modules.identity.models import Membership, Professional
from app.modules.institutions.models import Organization


def create_access(db: Session) -> None:
    organization = Organization(name="Instituição de Teste", slug="instituicao-teste")
    professional = Professional(
        full_name="Profissional de Teste",
        email="profissional@example.org",
        password_hash=hash_password("senha-segura-123"),
    )
    db.add_all([organization, professional])
    db.flush()
    db.add(
        Membership(
            professional_id=professional.id,
            organization_id=organization.id,
            role="health_professional",
        )
    )
    db.commit()


@pytest.mark.asyncio
async def test_login_me_and_logout_use_http_only_cookie(client: AsyncClient, db: Session) -> None:
    create_access(db)

    login = await client.post(
        "/api/v1/auth/login",
        json={
            "organizationSlug": "instituicao-teste",
            "email": "profissional@example.org",
            "password": "senha-segura-123",
        },
    )

    assert login.status_code == 200
    assert "token" not in login.json()
    assert "HttpOnly" in login.headers["set-cookie"]
    assert login.json()["user"]["organizationSlug"] == "instituicao-teste"

    current = await client.get("/api/v1/auth/me")
    assert current.status_code == 200
    assert current.json()["user"]["role"] == "health_professional"

    logout = await client.post("/api/v1/auth/logout")
    assert logout.status_code == 204
    assert (await client.get("/api/v1/auth/me")).status_code == 401


@pytest.mark.asyncio
async def test_login_returns_generic_error(client: AsyncClient, db: Session) -> None:
    create_access(db)

    response = await client.post(
        "/api/v1/auth/login",
        json={
            "organizationSlug": "instituicao-teste",
            "email": "profissional@example.org",
            "password": "senha-incorreta",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Credenciais inválidas"
