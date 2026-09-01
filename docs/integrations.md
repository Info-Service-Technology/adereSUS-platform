# Integrações

## WhatsApp

Será acessado por uma interface própria do AdereSUS. O provedor concreto ficará atrás de um adaptador. O domínio não dependerá do formato específico de um fornecedor.

Responsabilidades: templates, envio, identificador externo, webhooks, tentativas, falhas, respostas e opt-out.

## HDI-PEP

Integração bidirecional e controlada para identidade vinculada, agenda/comparecimento quando disponível, monitoramentos ativos, resumos, dificuldades e intervenções relevantes.

O histórico completo de mensagens não deve ser copiado indiscriminadamente para o prontuário.

## HDI

Recebe eventos autorizados e rastreáveis para produzir indicadores institucionais. O HDI não será fonte operacional dos planos ou mensagens.

## Eventos iniciais

- `patient.linked`
- `monitoring.created`
- `monitoring.activated`
- `monitoring.response.recorded`
- `monitoring.help.requested`
- `monitoring.intervention.closed`
- `monitoring.summary.updated`
- `appointment.status.changed`
- `message.delivery.failed`

Os contratos definitivos serão versionados em `contracts/api` e `contracts/events`.
