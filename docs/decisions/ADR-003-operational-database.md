# ADR-003 — Banco operacional próprio

## Status

Aceita conceitualmente; tecnologia inicial recomendada: PostgreSQL.

## Decisão

O AdereSUS terá banco transacional separado do HDI e do HDI-PEP. O HDI receberá eventos para construir modelos analíticos próprios.

## Consequência

Não será utilizado modelo estrela como persistência operacional. Migrações serão versionadas e cada domínio terá fonte oficial claramente definida.
