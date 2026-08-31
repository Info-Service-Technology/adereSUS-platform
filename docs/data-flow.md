# Fluxo de dados

## Fluxo principal

1. O profissional autenticado seleciona a instituição e unidade autorizadas.
2. Localiza uma identidade vinculada ou inicia um cadastro controlado.
3. Registra preferência e autorização do canal conforme regra aplicável.
4. Cria um monitoramento de nutrição, medicamento ou categoria aprovada.
5. Define período, metas, horários, respostas esperadas e regras de prioridade.
6. Valida e ativa o plano.
7. O sistema gera tarefas futuras, sem depender de IA.
8. O agendador publica cada tarefa na fila no momento adequado.
9. O bot seleciona template aprovado e solicita o envio ao WhatsApp.
10. O identificador externo e a tentativa são registrados.
11. Webhooks atualizam estados como enviado, entregue, lido, respondido ou falha.
12. A resposta é vinculada ao paciente, plano, meta, tarefa e mensagem corretos.
13. O motor de regras classifica adesão, dificuldade, pedido de ajuda ou ausência de resposta.
14. Texto livre pode ser classificado e resumido por IA supervisionada.
15. Uma ocorrência é criada quando as regras exigirem avaliação humana.
16. O profissional registra contato, orientação, remarcação ou encerramento.
17. O AdereSUS publica resumo relevante para o HDI-PEP.
18. Eventos autorizados alimentam as métricas do HDI.

## Estados de mensagem

`programada → enfileirada → enviada → entregue → lida → respondida`

Estados alternativos: `falha`, `expirada`, `cancelada` e `reprocessamento`.

## Separações obrigatórias

- sem resposta digital não significa falta à consulta;
- mensagem enviada não significa entregue;
- mensagem entregue não significa lida;
- mensagem lida não significa meta cumprida;
- adesão autorreferida não comprova resultado clínico;
- cancelamento e remarcação não são falta;
- falha técnica nunca deve ser atribuída ao paciente.
