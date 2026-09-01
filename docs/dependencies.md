# Dependências e ferramentas

## Política

- dependências de execução ficam separadas das ferramentas de desenvolvimento;
- versões utilizam faixas limitadas para evitar atualizações maiores automáticas;
- o lockfile do frontend será versionado após a primeira instalação validada;
- dependências Python serão travadas em arquivo de lock antes da implantação;
- uma biblioteca só permanecerá se houver uso real no código;
- atualizações deverão passar por testes, revisão de segurança e changelog.

## Frontend

O frontend utiliza React, Vite, TypeScript e Material UI. React Router organiza as rotas; TanStack Query gerencia estado de servidor; React Hook Form e Zod validam formulários; Recharts atende aos indicadores visuais.

O `package.json` da raiz contém somente scripts de orquestração. As dependências da interface ficam em `apps/web-professional/package.json`.

## Backend

FastAPI e Uvicorn fornecem a API. SQLAlchemy, Psycopg e Alembic atendem ao PostgreSQL. Celery e Redis atendem aos workers e tarefas assíncronas. HTTPX e Tenacity atendem às integrações externas. Pwdlib com Argon2 e PyJWT formam a base inicial de autenticação, sujeita ao desenho definitivo das sessões.

As dependências de produção ficam em `backend/requirements.txt`. Testes, lint e tipagem ficam em `backend/requirements-dev.txt`.

## Decisões ainda não implementadas

- o lockfile definitivo do frontend;
- o mecanismo definitivo de sessão e renovação;
- a configuração do Celery e do agendamento;
- o provedor oficial de WhatsApp;
- bibliotecas específicas de observabilidade em nuvem.
