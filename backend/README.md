# Backend

Backend único em Python e FastAPI, organizado inicialmente como monólito modular.

Os módulos de domínio ficam em `backend/app/modules`. Integrações externas e workers não devem duplicar regras de negócio.

## Executar

```bash
python -m uvicorn app.main:app --reload --port 8000
```

O primeiro endpoint disponível é `GET /health`.

## Banco e autenticação

```bash
cd ..
docker compose up -d postgres redis
alembic upgrade head
cd backend
PYTHONPATH=. python -m app.commands.bootstrap_access --help
```

A API utiliza sessão institucional em cookie HttpOnly. Não há cadastro público nem credencial padrão.
