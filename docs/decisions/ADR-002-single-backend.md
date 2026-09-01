# ADR-002 — Backend único em FastAPI

## Status

Aceita.

## Decisão

A API oficial será implementada em Python com FastAPI. Não haverá backend concorrente em Express.

## Consequência

O frontend acessará contratos HTTP documentados. Processos assíncronos compartilharão regras e contratos Python quando apropriado, sem duplicar endpoints.
