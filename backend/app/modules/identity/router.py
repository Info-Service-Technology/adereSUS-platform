from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.database import get_db
from app.core.security import digest_session_token, new_session_token, verify_password
from app.modules.identity.dependencies import AuthContext, get_auth_context
from app.modules.identity.models import AuthSession, Membership, Professional
from app.modules.identity.schemas import LoginRequest, SessionResponse, SessionUser
from app.modules.institutions.models import Organization

router = APIRouter(prefix="/auth", tags=["auth"])


def session_user(context: AuthContext) -> SessionUser:
    return SessionUser.model_validate(
        {
            "id": context.professional.id,
            "fullName": context.professional.full_name,
            "email": context.professional.email,
            "organizationId": context.organization.id,
            "organizationName": context.organization.name,
            "organizationSlug": context.organization.slug,
            "role": context.membership.role,
        }
    )


@router.post("/login", response_model=SessionResponse)
def login(body: LoginRequest, response: Response, db: Annotated[Session, Depends(get_db)]) -> SessionResponse:
    statement = (
        select(Professional, Membership, Organization)
        .join(Membership, Membership.professional_id == Professional.id)
        .join(Organization, Organization.id == Membership.organization_id)
        .where(
            Professional.email == body.email.lower(),
            Organization.slug == body.organization_slug.lower(),
            Professional.active.is_(True),
            Membership.active.is_(True),
            Organization.active.is_(True),
        )
    )
    row = db.execute(statement).one_or_none()
    if row is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Credenciais inválidas")

    professional, membership, organization = row
    if not verify_password(body.password, professional.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Credenciais inválidas")
    settings = get_settings()
    token = new_session_token()
    expires_at = datetime.now(timezone.utc) + timedelta(hours=settings.session_duration_hours)
    auth_session = AuthSession(
        membership_id=membership.id,
        token_hash=digest_session_token(token),
        expires_at=expires_at,
    )
    db.add(auth_session)
    db.commit()

    response.set_cookie(
        key=settings.session_cookie_name,
        value=token,
        max_age=settings.session_duration_hours * 3600,
        httponly=True,
        secure=settings.session_cookie_secure,
        samesite="lax",
        path="/",
    )
    context = AuthContext(auth_session, professional, membership, organization)
    return SessionResponse(user=session_user(context))


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    response: Response,
    context: Annotated[AuthContext, Depends(get_auth_context)],
    db: Annotated[Session, Depends(get_db)],
) -> None:
    context.session.revoked_at = datetime.now(timezone.utc)
    db.commit()
    response.delete_cookie(get_settings().session_cookie_name, path="/")


@router.get("/me", response_model=SessionResponse)
def me(context: Annotated[AuthContext, Depends(get_auth_context)]) -> SessionResponse:
    return SessionResponse(user=session_user(context))
