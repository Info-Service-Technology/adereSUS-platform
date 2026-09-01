# Autenticação institucional

## Decisão atual

O profissional não cria uma conta pública. Um administrador autorizado estabelece a instituição e concede o primeiro acesso. Cada sessão está ligada a um vínculo entre profissional e instituição.

## Fluxo

1. o profissional informa o código da instituição, e-mail e senha;
2. a API procura profissional, vínculo e instituição ativos;
3. a senha é verificada com Argon2;
4. um token aleatório de alta entropia é criado;
5. somente o SHA-256 do token é armazenado em `auth_sessions`;
6. o token original é enviado em cookie HttpOnly;
7. cada requisição resolve profissional, papel e instituição pela sessão;
8. logout revoga a sessão no servidor e remove o cookie.

## Endpoints iniciais

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`

## Criar o primeiro administrador

Após iniciar o PostgreSQL e executar as migrações:

```bash
cd backend
PYTHONPATH=. python -m app.commands.bootstrap_access \
  --organization-name "Instituição Piloto" \
  --organization-slug "instituicao-piloto" \
  --full-name "Administrador da Instituição" \
  --email "administrador@exemplo.org"
```

A senha é solicitada de forma interativa e não aparece no comando, histórico ou repositório.

## Pendências antes da produção

- proteção CSRF para ações autenticadas;
- limitação de tentativas e bloqueio progressivo;
- recuperação de senha por token único;
- MFA;
- política de expiração e revogação administrativa;
- auditoria de login, falha e logout;
- rotação e limpeza de sessões expiradas;
- definição final dos papéis e permissões.
