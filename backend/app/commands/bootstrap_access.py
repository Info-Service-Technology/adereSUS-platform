import argparse
import re
from getpass import getpass

from sqlalchemy import select

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.modules.identity.models import Membership, Professional
from app.modules.institutions.models import Organization

SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def parser() -> argparse.ArgumentParser:
    command = argparse.ArgumentParser(description="Cria a instituição e o primeiro administrador do AdereSUS.")
    command.add_argument("--organization-name", required=True)
    command.add_argument("--organization-slug", required=True)
    command.add_argument("--full-name", required=True)
    command.add_argument("--email", required=True)
    return command


def main() -> None:
    args = parser().parse_args()
    slug = args.organization_slug.strip().lower()
    email = args.email.strip().lower()
    if not SLUG_PATTERN.fullmatch(slug):
        raise SystemExit("O código da instituição deve conter letras minúsculas, números e hífens.")

    password = getpass("Senha inicial (mínimo de 12 caracteres): ")
    confirmation = getpass("Confirme a senha: ")
    if len(password) < 12:
        raise SystemExit("A senha precisa ter pelo menos 12 caracteres.")
    if password != confirmation:
        raise SystemExit("As senhas não coincidem.")

    with SessionLocal.begin() as db:
        if db.scalar(select(Professional).where(Professional.email == email)):
            raise SystemExit("Já existe um profissional com este e-mail.")
        if db.scalar(select(Organization).where(Organization.slug == slug)):
            raise SystemExit("Já existe uma instituição com este código.")

        organization = Organization(name=args.organization_name.strip(), slug=slug)
        professional = Professional(
            full_name=args.full_name.strip(),
            email=email,
            password_hash=hash_password(password),
        )
        db.add_all([organization, professional])
        db.flush()
        db.add(
            Membership(
                professional_id=professional.id,
                organization_id=organization.id,
                role="organization_admin",
            )
        )

    print("Acesso administrativo criado com sucesso.")


if __name__ == "__main__":
    main()
