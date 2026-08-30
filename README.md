# AdereSUS

Nova fundação do AdereSUS — acompanhamento digital pós-consulta, com monitoramento definido pelo profissional, comunicação pelo WhatsApp e integração com HDI-PEP e HDI.

## Estado atual

Este pacote contém somente a estrutura inicial e a documentação arquitetural. As regras de negócio serão implementadas gradualmente e validadas em conjunto.

O protótipo anterior não é dependência deste projeto. Ele será utilizado apenas como referência visual para login, navegação, dashboard, pacientes, planos, alertas e indicadores.

## Decisões aprovadas

- produto e interface próprios;
- banco operacional próprio e separado;
- frontend em React, Vite, TypeScript e Material UI;
- backend único em Python e FastAPI;
- monitoramento criado e ativado por profissional autorizado;
- bot/orquestrador determinístico para agendamento e mensagens;
- IA opcional, supervisionada e não prescritiva;
- integração com WhatsApp por adaptador;
- integração com HDI-PEP e HDI por APIs e eventos;
- segregação por instituição desde o início;
- ausência de resposta e falta à consulta são eventos diferentes;
- nenhuma informação clínica real em dados de demonstração.

## Estrutura

```text
aderesus/
├── apps/
│   └── web-professional/
├── backend/
│   └── app/
│       └── modules/
│           ├── identity/
│           ├── institutions/
│           ├── patients/
│           ├── monitoring/
│           ├── scheduling/
│           ├── messaging/
│           ├── responses/
│           ├── occurrences/
│           ├── appointments/
│           ├── integrations/
│           └── audit/
├── workers/
│   ├── scheduler/
│   └── whatsapp/
├── database/
│   ├── migrations/
│   └── seeds/
├── contracts/
│   ├── api/
│   └── events/
├── infrastructure/
└── tests/
```

## Primeiro fluxo a implementar

1. profissional acessa o portal;
2. localiza ou inicia o vínculo do paciente;
3. cria e ativa um monitoramento;
4. tarefas futuras são geradas;
5. worker envia mensagem pelo WhatsApp;
6. webhook registra entrega e resposta;
7. motor de regras classifica o retorno;
8. ocorrência é aberta quando necessário;
9. profissional registra a intervenção;
10. resumo é publicado para o HDI-PEP;
11. eventos autorizados alimentam métricas do HDI.

Consulte [docs/README.md](docs/README.md) para o índice completo.

## Dependências

Frontend:

```bash
pnpm install
```

Backend para desenvolvimento:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
```

Os arquivos declaram dependências, mas a aplicação ainda não foi implementada. Consulte [docs/dependencies.md](docs/dependencies.md).
# adereSUS
# adereSUS
