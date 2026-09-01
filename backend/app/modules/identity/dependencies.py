from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Annotated

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.database import get_db
from app.core.security import digest_session_token
from app.modules.identity.models import AuthSession, Membership, Professional
from app.modules.institutions.models import Organization


@dataclass(frozen=True)
class AuthContext:
    session: AuthSession
    professional: Professional
    membership: Membership
    organization: Organization


def get_auth_context(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
) -> AuthContext:
    settings = get_settings()
    session_token = request.cookies.get(settings.session_cookie_name)
    if not session_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Autenticação necessária")

    statement = (
        select(AuthSession, Professional, Membership, Organization)
        .join(Membership, Membership.id == AuthSession.membership_id)
        .join(Professional, Professional.id == Membership.professional_id)
        .join(Organization, Organization.id == Membership.organization_id)
        .where(
            AuthSession.token_hash == digest_session_token(session_token),
            AuthSession.revoked_at.is_(None),
            AuthSession.expires_at > datetime.now(timezone.utc),
            Professional.active.is_(True),
            Membership.active.is_(True),
            Organization.active.is_(True),
        )
    )
    row = db.execute(statement).one_or_none()
    if row is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Sessão inválida ou expirada")

    return AuthContext(*row)
