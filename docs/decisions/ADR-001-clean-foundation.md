# ADR-001 — Nova base sem dependência do legado

## Status

Aceita.

## Decisão

O novo AdereSUS será construído em uma base limpa. O ZIP anterior servirá exclusivamente como referência visual e funcional.

## Motivo

O protótipo possui backends duplicados, banco analítico usado operacionalmente, ausência do fluxo real de mensageria e insuficiência de segregação institucional. Adaptá-lo criaria maior risco e custo de verificação do que reconstruir o núcleo.

## Consequência

Nenhuma importação direta de código legado será realizada sem uma análise isolada e uma justificativa registrada.
