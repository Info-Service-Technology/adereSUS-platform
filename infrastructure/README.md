# Infraestrutura

O arquivo `compose.yaml` na raiz inicia PostgreSQL e Redis para desenvolvimento:

```bash
docker compose up -d postgres redis
```

Posteriormente, esta pasta receberá infraestrutura versionada para nuvem, observabilidade, segredos, backup e recuperação.
