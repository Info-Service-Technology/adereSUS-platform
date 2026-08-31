# Domínios e responsabilidades

| Módulo | Responsabilidade principal |
| --- | --- |
| identity | Identificadores internos, vínculos externos e prevenção de duplicidade |
| organizations | Instituições, unidades, equipes e escopos |
| access | Usuários, sessões, papéis e autorizações |
| patients | Dados mínimos locais e preferências |
| consent | Autorizações, finalidades, canal e revogação |
| monitoring | Planos individuais, metas, período e estado |
| scheduling | Geração de tarefas, calendário e cancelamentos |
| messaging | Templates, mensagens, tentativas e estados técnicos |
| responses | Respostas estruturadas e texto livre |
| rules | Classificação determinística e prioridade |
| occurrences | Fila de trabalho, responsável, prazo e encerramento |
| interventions | Ações humanas e desfecho operacional |
| appointments | Agendamento, confirmação, falta, cancelamento e remarcação |
| integrations | HDI-PEP, HDI e WhatsApp |
| audit | Rastreamento de acesso, alteração e processamento |
| observability | Logs técnicos, métricas, alertas e reconciliação |

Os módulos serão inicialmente organizados como um monólito modular. Serviços separados somente serão criados quando houver necessidade operacional demonstrável.
