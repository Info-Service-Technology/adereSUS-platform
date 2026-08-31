from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    organization_slug: str = Field(alias="organizationSlug", min_length=2, max_length=80)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class SessionUser(BaseModel):
    id: str
    full_name: str = Field(alias="fullName")
    email: EmailStr
    organization_id: str = Field(alias="organizationId")
    organization_name: str = Field(alias="organizationName")
    organization_slug: str = Field(alias="organizationSlug")
    role: str

    model_config = {"populate_by_name": True}


class SessionResponse(BaseModel):
    user: SessionUser
