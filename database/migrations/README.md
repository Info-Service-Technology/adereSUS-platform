# Migrações

As migrações do banco operacional são gerenciadas com Alembic. Nenhum schema legado será importado automaticamente.

```bash
alembic upgrade head
```

A revisão inicial cria organizações, unidades, profissionais, vínculos e sessões.
