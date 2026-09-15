-- Conteúdo inicial do Learning Log.
--
-- Só entra aqui o que foi de fato estudado, lido ou está em estudo. Nada é
-- preenchimento. Todos os slugs começam com "seed-", então dá para remover tudo
-- de uma vez com `npm run db:seed:clean`.
--
-- Convenção de datas: a coluna é DATE, mas a página só exibe mês e ano (e, para
-- artigos e papers, só o ano). Quando a referência é "agosto de 2026", grava-se
-- o dia 01 como marcador do mês; o dia nunca chega à interface.

INSERT INTO learning_items
  (title, slug, type, status, description, progress, author, publisher,
   cover_url, external_url, repository_url, started_at, completed_at, tags)
VALUES
  -- ---------- Livros ----------
  (
    'AI Agents in Action, Second Edition',
    'seed-ai-agents-in-action',
    'book',
    'reading',
    'Estudo prático sobre construção de agentes de IA, incluindo tool use, MCP, A2A, reasoning, planning, memória, avaliação e sistemas multiagentes.',
    NULL,
    'Micheal Lanham',
    'Manning',
    '/images/covers/ai-agents-in-action.jpg', NULL, NULL,
    DATE '2026-09-01', NULL,
    ARRAY['AI Agents', 'MCP', 'A2A', 'Multi-Agent', 'Tool Use']
  ),
  (
    'AI Engineering',
    'seed-ai-engineering',
    'book',
    'finished',
    'Fundamentos de engenharia de aplicações com foundation models, passando por avaliação, prompt engineering, RAG, agentes, fine-tuning, otimização e sistemas de IA em produção.',
    NULL,
    'Chip Huyen',
    'O''Reilly',
    '/images/covers/ai-engineering.jpg', NULL, NULL,
    NULL, DATE '2026-08-01',
    ARRAY['AI Engineering', 'Evals', 'RAG', 'Agents', 'LLMs']
  ),

  -- ---------- Estudando agora ----------
  (
    'Responsible AI',
    'seed-responsible-ai',
    'study',
    'studying',
    'Estudo de avaliação, confiabilidade, governança e monitoramento de sistemas de IA, com foco em como medir riscos, comportamento e qualidade de modelos em produção.',
    NULL, NULL, NULL, NULL, NULL, NULL,
    DATE '2026-09-01', NULL,
    ARRAY['AI Governance', 'AI Evals', 'Reliability', 'Human Oversight', 'Groundedness']
  ),
  (
    'AI Evals & Observability',
    'seed-ai-evals-observability',
    'study',
    'studying',
    'Avaliação de sistemas com LLMs e agentes, métricas, LLM-as-a-judge, traces, monitoramento, confiabilidade e análise de falhas.',
    NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL,
    ARRAY['Evals', 'Langfuse', 'Reliability', 'Observability']
  ),

  -- ---------- Estudado recentemente ----------
  (
    'MCP — Model Context Protocol',
    'seed-mcp',
    'study',
    'explored',
    'Arquitetura cliente-servidor, tools, resources, prompts, transports e uso do MCP como fronteira padronizada entre agentes e sistemas externos.',
    NULL, NULL, NULL, NULL, NULL, NULL,
    DATE '2026-08-01', DATE '2026-09-01',
    ARRAY['MCP', 'Tooling', 'Agents', 'Integrations']
  ),
  (
    'LangGraph',
    'seed-langgraph',
    'study',
    'explored',
    'Orquestração de agentes stateful, grafos de execução, controle de fluxo, estado, ciclos e padrões para workflows agentic.',
    NULL, NULL, NULL, NULL, NULL, NULL,
    DATE '2026-08-01', DATE '2026-08-01',
    ARRAY['Agents', 'Orchestration', 'State', 'Python']
  ),
  (
    'Agent Architectures',
    'seed-agent-architectures',
    'study',
    'explored',
    'Estudo de workflows e agentes, routing, prompt chaining, orchestrator-workers, tool use e padrões de sistemas multiagentes.',
    NULL, NULL, NULL, NULL, NULL, NULL,
    DATE '2026-08-01', DATE '2026-09-01',
    ARRAY['Agents', 'Routing', 'Multi-Agent', 'Orchestration']
  ),
  (
    'Multi-Agent Systems',
    'seed-multi-agent-systems',
    'study',
    'explored',
    'Padrões de colaboração e coordenação entre agentes, incluindo hub-and-spoke, blackboard e divisão de responsabilidades.',
    NULL, NULL, NULL, NULL, NULL, NULL,
    DATE '2026-09-01', DATE '2026-09-01',
    ARRAY['Multi-Agent', 'Blackboard', 'Hub-and-Spoke', 'Agents']
  ),
  (
    'Prompt & Context Engineering',
    'seed-prompt-context-engineering',
    'study',
    'explored',
    'Estruturação de prompts, few-shot, decomposição, delimitadores, prompt caching, context management e design de instruções para sistemas com LLMs.',
    NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL,
    ARRAY['Prompting', 'Context Engineering', 'LLMs']
  ),

  -- ---------- Artigos e papers ----------
  (
    'Building effective agents',
    'seed-building-effective-agents',
    'article',
    'read',
    'Princípios e padrões para construção de sistemas agentic, diferenciando workflows de agentes e abordando prompt chaining, routing, parallelization, orchestrator-workers e evaluator-optimizer.',
    NULL,
    'Anthropic',
    NULL, NULL,
    'https://www.anthropic.com/engineering/building-effective-agents',
    NULL,
    NULL, DATE '2024-01-01',
    ARRAY['Agents', 'Agentic Workflows', 'Routing', 'Orchestration', 'Tool Use']
  ),
  (
    'τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains',
    'seed-tau-bench',
    'paper',
    'read',
    'Benchmark para avaliar agentes em interações realistas envolvendo usuários, ferramentas, APIs e políticas de domínio, com foco também na consistência do comportamento ao longo de várias execuções.',
    NULL,
    'Shunyu Yao, Noah Shinn, Pedram Razavi e Karthik Narasimhan',
    NULL, NULL,
    'https://arxiv.org/abs/2406.12045',
    NULL,
    NULL, DATE '2024-01-01',
    ARRAY['Agent Evals', 'Benchmarks', 'Tool Use', 'Reliability', 'Agents']
  ),
  (
    'τ²-Bench: Evaluating Conversational Agents in a Dual-Control Environment',
    'seed-tau2-bench',
    'paper',
    'read',
    'Extensão do τ-bench para ambientes de dual-control, nos quais tanto o agente quanto o usuário podem executar ações e alterar o estado do ambiente durante a resolução de uma tarefa.',
    NULL, NULL, NULL, NULL,
    'https://arxiv.org/abs/2506.07982',
    NULL,
    NULL, DATE '2025-01-01',
    ARRAY['Agent Evals', 'Conversational Agents', 'Dual-Control', 'Reliability', 'Benchmarks']
  ),

  -- ---------- Experimentos e projetos ----------
  (
    'Study Notes Agent',
    'seed-study-notes-agent',
    'project',
    'studying',
    'Agente que transforma anotações de estudo em material organizado e pode buscar referências externas para complementar o conteúdo.',
    NULL, NULL, NULL, NULL, NULL,
    NULL, -- sem repositório cadastrado: link não é inventado
    NULL, NULL,
    ARRAY['Python', 'LLM', 'Web Search', 'Agents']
  ),
  -- ---------- Livros concluidos em 2025 ----------
  -- Data 01/01 = marcador de ano: so "2025" foi informado, e a pagina exibe so o ano.
  (
    'Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow',
    'seed-hands-on-ml',
    'book',
    'finished',
    NULL,
    NULL,
    'Aurélien Géron',
    'O''Reilly',
    '/images/covers/hands-on-ml.jpg', NULL, NULL,
    NULL, DATE '2025-01-01',
    ARRAY['Machine Learning', 'Scikit-Learn', 'Keras', 'TensorFlow']
  ),
  (
    'Entendendo Algoritmos',
    'seed-entendendo-algoritmos',
    'book',
    'finished',
    NULL,
    NULL,
    'Aditya Y. Bhargava',
    'Novatec',
    '/images/covers/entendendo-algoritmos.jpg', NULL, NULL,
    NULL, DATE '2025-01-01',
    ARRAY['Algoritmos', 'Estruturas de Dados']
  ),
  (
    'Clean Code',
    'seed-clean-code',
    'book',
    'finished',
    NULL,
    NULL,
    'Robert C. Martin',
    'Pearson',
    '/images/covers/clean-code.jpg', NULL, NULL,
    NULL, DATE '2025-01-01',
    ARRAY['Clean Code', 'Boas Práticas', 'Engenharia de Software']
  ),

  -- ---------- Artigos da Anthropic ----------
  -- Tags saem do proprio titulo; descricao fica vazia para nao inventar resumo.
  (
    'Building agents with the Claude Agent SDK',
    'seed-claude-agent-sdk',
    'article',
    'read',
    'Introdução ao Claude Agent SDK e aos padrões usados para construir agentes capazes de coletar contexto, executar ações, utilizar ferramentas e verificar o próprio trabalho.',
    NULL,
    'Anthropic',
    NULL, NULL,
    'https://claude.com/blog/building-agents-with-the-claude-agent-sdk',
    NULL,
    NULL, DATE '2025-01-01',
    ARRAY['Claude Agent SDK', 'Agents', 'Tool Use', 'Agent Harness', 'Context']
  ),
  (
    'Effective context engineering for AI agents',
    'seed-effective-context-engineering',
    'article',
    'read',
    'Estratégias para gerenciar o contexto de agentes, incluindo seleção de informações relevantes, just-in-time retrieval, compaction, memória e execução de tarefas longas.',
    NULL,
    'Anthropic',
    NULL, NULL,
    'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
    NULL,
    NULL, DATE '2025-01-01',
    ARRAY['Context Engineering', 'Agents', 'Memory', 'Retrieval', 'Long-Horizon']
  ),
  (
    'Evaluating and mitigating the growing risk of LLM-discovered 0-days',
    'seed-llm-discovered-0-days',
    'article',
    'read',
    'Pesquisa sobre a crescente capacidade de modelos de linguagem de encontrar vulnerabilidades zero-day em software e sobre os riscos, avaliações e estratégias defensivas associadas a essa capacidade.',
    NULL,
    'Anthropic — Frontier Red Team',
    NULL, NULL,
    'https://www.anthropic.com/research/zero-days',
    NULL,
    NULL, DATE '2026-01-01',
    ARRAY['Cybersecurity', 'LLM Security', 'Vulnerability Research', 'Red Teaming', '0-Day']
  ),

  -- ---------- Especializacao ----------
  -- Datas 01/01 = marcadores de ano: o periodo informado foi 2025-2026.
  (
    'Especialização em Engenharia de IA',
    'seed-especializacao-eng-ia',
    'course',
    'completed',
    NULL,
    NULL,
    'Dev+Eficiente',
    NULL,
    NULL, NULL, NULL,
    DATE '2025-01-01', DATE '2026-01-01',
    ARRAY['AI Engineering']
  )
ON CONFLICT (slug) DO NOTHING;
