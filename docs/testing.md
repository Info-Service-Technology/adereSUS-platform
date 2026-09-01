# Estratégia de testes

## Camadas

- testes unitários para regras puras;
- testes de integração para banco, filas e adaptadores;
- testes de contrato para APIs e eventos;
- testes de autorização entre instituições;
- testes de idempotência e reprocessamento;
- testes ponta a ponta dos fluxos críticos;
- testes de acessibilidade no frontend;
- testes de segurança automatizados no pipeline.

## Fluxo mínimo de aceite

O profissional ativa um monitoramento; uma tarefa é criada; a mensagem é enviada; o webhook é correlacionado; a resposta é registrada; uma ocorrência é aberta quando aplicável; a intervenção é encerrada; o resumo e os eventos autorizados são publicados uma única vez.

Nenhuma entrega será considerada pronta apenas porque a tela funciona isoladamente.
