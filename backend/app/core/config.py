from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AdereSUS API"
    environment: str = "development"
    api_prefix: str = "/api/v1"
    database_url: str = "postgresql+psycopg://aderesus:aderesus@localhost:5432/aderesus"
    session_cookie_name: str = "aderesus_session"
    session_duration_hours: int = 12
    session_cookie_secure: bool = False

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="ADERESUS_",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
