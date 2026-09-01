# Histórico

## 0.4.0-institutional-auth — 2026-08-30

- criados modelos de organização, unidade, profissional, vínculo e sessão;
- criada migração inicial do PostgreSQL;
- implementados login, sessão atual e logout;
- adotada sessão em cookie HttpOnly com token armazenado somente como hash;
- conectado o login do portal ao backend;
- criado comando interativo para o primeiro administrador;
- adicionados PostgreSQL e Redis ao ambiente local;
- ampliados os testes de autenticação e segregação institucional inicial.

## 0.3.1-brand-assets — 2026-08-30

- adicionadas cinco imagens oficiais do AdereSUS;
- substituída a marca provisória do login pela versão oficial horizontal;
- adicionada marca empilhada como ícone provisório do navegador;
- documentados usos e restrições de cada ativo visual.

## 0.3.0-login-foundation — 2026-08-30

- inicializada a aplicação React/Vite/MUI;
- criado tema institucional do AdereSUS;
- criada tela de login e recuperação acessível;
- removido cadastro público de profissionais;
- inicializada a aplicação FastAPI e endpoint de saúde;
- adicionados testes iniciais de frontend e backend.

## 0.2.0-foundation — 2026-08-30

- adicionados `package.json` raiz e workspace PNPM;
- adicionadas dependências React, Vite, TypeScript e Material UI do portal;
- adicionadas dependências FastAPI, PostgreSQL, migrações, autenticação, filas e integrações;
- separadas dependências Python de produção e desenvolvimento;
- documentada a política inicial de dependências.

## 0.1.1-foundation — 2026-08-30

- alinhada a estrutura física com a árvore arquitetural aprovada;
- substituídos `services/api` por `backend/app/modules`;
- separados os workers em `workers/scheduler` e `workers/whatsapp`;
- substituído `packages/contracts` por `contracts/api` e `contracts/events`;
- adicionadas as pastas dos módulos de domínio e `database/seeds`.

## 0.1.0-foundation — 2026-08-30

- criada estrutura limpa do AdereSUS;
- registrada decisão de não reutilizar o código legado;
- documentados escopo, arquitetura, domínios e fluxo de dados;
- documentadas integrações com WhatsApp, HDI-PEP e HDI;
- documentados requisitos iniciais de segurança, LGPD e testes;
- registrado roteiro de desenvolvimento conjunto.
