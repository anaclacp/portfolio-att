export const translations = {
  pt: {
    meta: {
      htmlLang: 'pt-BR',
      title: 'Ana Clara Pereira | Responsible AI Senior Analyst',
      description:
        'Portfólio de Ana Clara Pereira, Responsible AI Senior Analyst na Accenture e engenheira da computação com experiência em IA generativa, agentes, RAG, Python e desenvolvimento de sistemas de IA.',
    },

    nav: {
      about: 'Sobre',
      services: 'Serviços',
      projects: 'Projetos',
      stack: 'Stack',
      academic: 'Acadêmico',
      contact: 'Contato',
      downloadCv: 'Baixar CV',
      switchTo: 'Mudar idioma para',
    },

    hero: {
      badge: 'Responsible AI Senior Analyst @ Accenture',
      role: 'AI Engineering · Generative AI · Python',
      description:
        'Engenheira da computação com experiência no desenvolvimento de soluções envolvendo LLMs, RAG, agentes, APIs e automações. Atualmente atuo como Responsible AI Senior Analyst na Accenture, ampliando meu foco para avaliação, confiabilidade, uso responsável e construção de sistemas de IA.',
      availability:
        'Também desenvolvo projetos independentes envolvendo IA aplicada, automações, APIs e sistemas web.',
      ctaProjects: 'Ver projetos',
      ctaContact: 'Falar comigo',
    },

    about: {
      titleLead: 'Sobre',
      titleAccent: 'mim',
      p1Before: 'Sou engenheira da computação formada pela ',
      p1Highlight1: 'UNAERP',
      p1Middle: ' e atualmente trabalho como Responsible AI Senior Analyst na ',
      p1Highlight2: 'Accenture',
      p1After:
        '. Tenho experiência prática no desenvolvimento de sistemas com Inteligência Artificial aplicada, utilizando principalmente Python, FastAPI, TypeScript, bancos de dados, APIs e integrações com modelos de linguagem.',
      p2: 'Minha trajetória inclui projetos com agentes, RAG, busca híbrida, automações, pipelines de dados, tool calling e observabilidade. Também participei do desenvolvimento e da entrega de aplicações completas, desde o back-end e a integração com modelos até o deploy e o monitoramento.',
      p3Before: 'Atualmente, estou aprofundando minha atuação em ',
      p3Highlight: 'Responsible AI',
      p3After:
        ', especialmente em avaliação, confiabilidade, governança e monitoramento de sistemas de IA.',
      p4: 'Gosto de estudar, pesquisar e transformar problemas complexos em soluções práticas, estruturadas e mensuráveis.',
    },

    services: {
      titleLead: 'O que',
      titleAccent: 'eu faço',
      subtitle: 'Três frentes principais de trabalho, do modelo à interface.',
      items: [
        {
          title: 'IA aplicada',
          description:
            'Agentes, RAG, integrações com LLMs, embeddings, automações inteligentes e fluxos com IA.',
        },
        {
          title: 'Back-end e integrações',
          description:
            'APIs, pipelines, bancos de dados, autenticação, integrações externas e estruturação de sistemas.',
        },
        {
          title: 'Front-end e produto',
          description:
            'Interfaces com React/Next.js, dashboards, experiências web e integração entre front-end e back-end.',
        },
      ],
    },

    projects: {
      title: 'Projetos',
      subtitle:
        'Sistemas com RAG, agentes LLM, automações e pipelines de dados, do problema à produção.',
      viewDetails: 'Ver detalhes',
      confidentialityNote:
        'Projetos corporativos são apresentados apenas em nível arquitetural e funcional, respeitando confidencialidade, propriedade intelectual e políticas das empresas envolvidas.',
      seeMore: 'Ver mais no GitHub',
      labels: {
        problem: 'Problema',
        solution: 'Solução',
        implemented: 'O que implementei',
        stack: 'Stack',
        presentation: 'apresentação',
      },
      items: [
        {
          title: 'ChefAI',
          short:
            'Assistente culinário que automatiza a gestão da despensa doméstica: identifica alimentos por foto e nota fiscal e sugere receitas personalizadas.',
          highlights: [
            'Identificação de alimentos por foto da despensa e por nota fiscal (Gemini)',
            'Assistente conversacional que sugere receitas conforme restrições alimentares',
            'Backend próprio: orquestração do modelo, validação estruturada e enriquecimento de contexto',
          ],
          status: 'TCC · Nota 10',
          problem:
            'O controle do estoque doméstico de alimentos ainda é majoritariamente manual, sujeito a esquecimentos, desperdício e compras duplicadas. Receitas online raramente partem da despensa real do usuário.',
          solution:
            'Assistente culinário inteligente que integra o modelo multimodal Gemini e processamento de linguagem natural para automatizar a gestão da despensa. Identifica alimentos a partir de fotos e de notas fiscais, organiza um inventário digital revisável pelo usuário e, com base nele e nas restrições cadastradas, sugere receitas personalizadas via assistente conversacional.',
          implemented: [
            'Identificação de alimentos por foto da despensa e por nota fiscal (modelo multimodal Gemini)',
            'Inventário digital revisável pelo usuário',
            'Assistente conversacional de receitas com base em preferências e restrições alimentares',
            'Backend próprio para orquestração do modelo, validação estruturada das respostas e enriquecimento dinâmico de contexto',
            'App móvel multiplataforma com autenticação JWT e favoritos persistentes',
          ],
          note: 'Monografia em Engenharia de Computação (UNAERP, 2026), defendida e aprovada com nota máxima (10). A avaliação exploratória apontou alta acurácia na identificação de itens e receitas coerentes e aderentes às restrições alimentares. Repositório fechado em evolução para virar um produto.',
        },
        {
          title: 'Go Ledger API',
          short:
            'API de controle financeiro com pegada fintech: contas, transações, importação e processamento assíncrono.',
          highlights: [
            'Contas, categorias e transações com resumo mensal',
            'Importação de transações e processamento assíncrono',
            'PostgreSQL, Docker e cobertura de testes',
          ],
          status: 'Em desenvolvimento',
          problem:
            'Controlar finanças com múltiplas contas, categorias e importação de extratos exige um backend confiável, com processamento assíncrono e dados consistentes.',
          solution:
            'Um mini sistema financeiro em Go com contas, transações, categorias, resumo mensal, importação de arquivos e processamento assíncrono, estruturado para escalar.',
          implemented: [
            'Usuários, contas, categorias e transações',
            'Resumo mensal e importação de transações',
            'Processamento assíncrono e logs',
            'Testes, Docker e PostgreSQL (MongoDB opcional)',
          ],
          note: 'Projeto de estudo em Go, em desenvolvimento. Foco em backend performático e boas práticas.',
        },
        {
          title: 'RAG System',
          short:
            'Pipeline RAG híbrido com busca densa, esparsa e reranking via ColBERT sobre documentos da SEC.',
          highlights: [
            'Busca híbrida: Dense + Sparse + ColBERT',
            'Reranking para maior precisão de recuperação',
            'Respostas geradas por LLM com contexto',
          ],
          problem:
            'Analisar centenas de documentos financeiros da SEC manualmente é inviável. Encontrar trechos relevantes demanda horas de leitura.',
          solution:
            'Pipeline RAG híbrido com busca densa, esparsa e reranking via ColBERT para recuperação precisa de informações e geração de respostas contextualizadas com LLM.',
          implemented: [
            'Ingestão e chunking de documentos PDF',
            'Busca híbrida: Dense + Sparse + ColBERT',
            'Reranking para maior precisão',
            'Respostas geradas por LLM com contexto',
          ],
        },
        {
          title: 'Agentic Support Router',
          short:
            'Sistema multi-agente para roteamento dinâmico de tickets de suporte com FastAPI.',
          highlights: [
            'Roteamento por intenção do usuário',
            'Function calling para ações concretas',
            'Prompt chaining entre agentes especializados',
          ],
          problem:
            'Sistemas de suporte tradicionais não conseguem rotear e resolver tickets complexos de forma autônoma, criando gargalos no atendimento.',
          solution:
            'Sistema multi-agente com prompt chaining e roteamento dinâmico. Orquestração manual com FastAPI, sem dependência de frameworks de agentes.',
          implemented: [
            'Roteamento dinâmico por intenção do usuário',
            'Function calling para ações concretas',
            'Prompt chaining entre agentes especializados',
            'API REST completa com FastAPI',
          ],
        },
        {
          title: 'Pipeline ETL em Larga Escala',
          short:
            'ETL serverless com SQS, Lambda e banco vetorial, seguindo Clean Architecture.',
          highlights: [
            'Ingestão assíncrona via filas SQS',
            'Processamento serverless com Lambda',
            'Carga em banco vetorial para busca semântica',
          ],
          status: 'Corporativo',
          problem:
            'Documentos de múltiplas fontes chegavam em formatos diferentes e precisavam ser processados, transformados e indexados de forma confiável e escalável.',
          solution:
            'Pipeline ETL completo com ingestão assíncrona via SQS, processamento serverless com AWS Lambda e carga em banco vetorial, seguindo princípios de Clean Architecture.',
          implemented: [
            'Ingestão assíncrona via filas SQS',
            'Processamento serverless com Lambda',
            'Carga em banco vetorial para busca semântica',
            'Rastreabilidade de erros e retries automáticos',
          ],
          note: 'Projeto corporativo. Código não disponível por questões de confidencialidade.',
        },
        {
          title: 'CI/CD com GitHub Actions',
          short:
            'Pipelines de build, testes e deploy contínuo com GitHub Actions e Docker.',
          highlights: [
            'Build e testes automatizados a cada push',
            'Deploy contínuo com rollback automático',
            'Imagens Docker reproduzíveis',
          ],
          status: 'Corporativo',
          problem:
            'Deploys manuais e sem cobertura de testes criavam risco de regressão em ambiente de produção.',
          solution:
            'Pipelines automatizados de build, testes e deploy contínuo com GitHub Actions, integrados com Docker para ambientes reproduzíveis.',
          implemented: [
            'Build e testes automatizados a cada push',
            'Deploy contínuo com rollback automático',
            'Imagens Docker reproduzíveis',
            'Pipelines integrados ao fluxo de PR',
          ],
          note: 'Projeto corporativo. Código não disponível por questões de confidencialidade.',
        },
      ],
    },

    stack: {
      titleLead: 'Stack',
      titleAccent: 'tecnológica',
      subtitle: 'Tecnologias com as quais trabalho no dia a dia.',
      categories: {
        responsible: 'Responsible AI',
        ai: 'IA & Dados',
        backend: 'Back-end',
        frontend: 'Front-end',
        infra: 'Infra & automação',
      },
      // tecnologias com nome próprio ficam iguais nos dois idiomas
      tags: {
        Agents: 'Agentes',
      },
    },

    research: {
      title: 'Acadêmico',
      subtitle: 'Iniciações científicas, docência e contribuições acadêmicas.',
      viewImages: 'Ver imagens de',
      items: [
        {
          type: 'Docência / Curso',
          title: 'Curso de n8n na UNAERP',
          description:
            'Curso prático sobre automação de workflows e integrações com IA, ministrado para alunos da universidade. Material aberto no GitHub.',
          institution: 'Universidade de Ribeirão Preto',
        },
        {
          type: 'Iniciação Científica',
          title: 'Impacto das variáveis climáticas na dinâmica dos casos de dengue',
          description:
            'Sistema de ML para analisar fatores climáticos e anomalias atmosféricas relacionados a casos de dengue em Ribeirão Preto, com foco em eventos extremos.',
          institution: 'Universidade de Ribeirão Preto',
        },
        {
          type: 'Iniciação Científica',
          title:
            'Coleta automatizada de dados meteorológicos para estudos preditivos de arboviroses',
          description:
            'Base de dados com R, Python e MySQL para alimentar modelos preditivos de surtos de dengue, zika e chikungunya.',
          institution: 'Universidade de Ribeirão Preto',
        },
      ],
    },

    events: {
      title: 'Eventos',
      subtitle: 'Conferências, workshops e encontros que participei.',
      moreOnLinkedin: 'Mais eventos no LinkedIn',
      items: [
        {
          title: 'Oracle Dev Tour São Paulo',
          description:
            'Evento focado em IA, dados e automação, com discussões sobre IA generativa, RAG, agentes e bancos de dados autônomos.',
          location: 'São Paulo, SP',
          type: 'Conferência',
        },
        {
          title: 'Palestra: Introdução ao n8n',
          description:
            'Palestra interna sobre n8n e automação de workflows, com foco em curadoria de conteúdo técnico e aplicação prática para a equipe.',
          location: 'Citel · Ribeirão Preto, SP',
          type: 'Palestra',
        },
        {
          title: 'Evento CCM: IA em Ação',
          description:
            'Evento sobre aplicações práticas de IA, tendências do mercado e casos de uso em produtos reais.',
          location: 'Dabi Business · Ribeirão Preto, SP',
          type: 'Workshop',
        },
      ],
    },

    freelance: {
      badge: 'Disponível',
      title: 'Disponível para projetos independentes',
      description:
        'Posso contribuir com sistemas web, APIs, automações, integrações com IA, RAG, agentes, pipelines de dados, melhorias de performance em Python e deploy de aplicações.',
      cta: 'Vamos conversar',
    },

    contact: {
      titleLead: 'Vamos',
      titleAccent: 'conversar',
      subtitle:
        'Aberta a conversas sobre Responsible AI, IA generativa, agentes, engenharia de software, colaborações e projetos independentes.',
      arccodeLabel: 'Perfil ArcCode',
    },

    footer: {
      tagline: 'AI Engineering · Generative AI · Python',
    },

    modal: {
      close: 'Fechar',
    },
  },

  en: {
    meta: {
      htmlLang: 'en',
      title: 'Ana Clara Pereira | Responsible AI Senior Analyst',
      description:
        'Portfolio of Ana Clara Pereira, Responsible AI Senior Analyst at Accenture and computer engineer with experience in generative AI, agents, RAG, Python and AI system development.',
    },

    nav: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      stack: 'Stack',
      academic: 'Academic',
      contact: 'Contact',
      downloadCv: 'Download CV',
      switchTo: 'Switch language to',
    },

    hero: {
      badge: 'Responsible AI Senior Analyst @ Accenture',
      role: 'AI Engineering · Generative AI · Python',
      description:
        'Computer engineer with experience building solutions involving LLMs, RAG, agents, APIs and automations. I currently work as a Responsible AI Senior Analyst at Accenture, widening my focus to the evaluation, reliability, responsible use and engineering of AI systems.',
      availability:
        'I also build independent projects involving applied AI, automations, APIs and web systems.',
      ctaProjects: 'View projects',
      ctaContact: 'Get in touch',
    },

    about: {
      titleLead: 'About',
      titleAccent: 'me',
      p1Before: 'I am a computer engineer with a degree from ',
      p1Highlight1: 'UNAERP',
      p1Middle: ' and I currently work as a Responsible AI Senior Analyst at ',
      p1Highlight2: 'Accenture',
      p1After:
        '. I have hands-on experience building systems with applied Artificial Intelligence, working mainly with Python, FastAPI, TypeScript, databases, APIs and language model integrations.',
      p2: 'My background includes projects with agents, RAG, hybrid search, automations, data pipelines, tool calling and observability. I have also taken part in developing and delivering complete applications, from the back-end and model integration through to deployment and monitoring.',
      p3Before: 'I am currently deepening my work in ',
      p3Highlight: 'Responsible AI',
      p3After:
        ', particularly around the evaluation, reliability, governance and monitoring of AI systems.',
      p4: 'I enjoy studying, researching and turning complex problems into practical, structured and measurable solutions.',
    },

    services: {
      titleLead: 'What',
      titleAccent: 'I do',
      subtitle: 'Three main areas of work, from the model to the interface.',
      items: [
        {
          title: 'Applied AI',
          description:
            'Agents, RAG, LLM integrations, embeddings, intelligent automations and AI-driven workflows.',
        },
        {
          title: 'Back-end and integrations',
          description:
            'APIs, pipelines, databases, authentication, third-party integrations and system architecture.',
        },
        {
          title: 'Front-end and product',
          description:
            'Interfaces with React/Next.js, dashboards, web experiences and front-end to back-end integration.',
        },
      ],
    },

    projects: {
      title: 'Projects',
      subtitle:
        'Systems with RAG, LLM agents, automations and data pipelines, from problem to production.',
      viewDetails: 'View details',
      confidentialityNote:
        'Corporate projects are presented only at an architectural and functional level, respecting confidentiality, intellectual property and the policies of the companies involved.',
      seeMore: 'See more on GitHub',
      labels: {
        problem: 'Problem',
        solution: 'Solution',
        implemented: 'What I built',
        stack: 'Stack',
        presentation: 'presentation',
      },
      items: [
        {
          title: 'ChefAI',
          short:
            'Cooking assistant that automates home pantry management: it identifies food from photos and receipts and suggests personalized recipes.',
          highlights: [
            'Food identification from pantry photos and receipts (Gemini)',
            'Conversational assistant that suggests recipes based on dietary restrictions',
            'Custom backend: model orchestration, structured validation and context enrichment',
          ],
          status: 'Thesis · Grade 10',
          problem:
            'Keeping track of the food at home is still mostly manual, which leads to forgotten items, waste and duplicate purchases. Online recipes rarely start from the user’s actual pantry.',
          solution:
            'Intelligent cooking assistant combining the Gemini multimodal model with natural language processing to automate pantry management. It identifies food from photos and receipts, organizes a digital inventory the user can review, and suggests personalized recipes through a conversational assistant based on that inventory and the registered dietary restrictions.',
          implemented: [
            'Food identification from pantry photos and receipts (Gemini multimodal model)',
            'Digital inventory the user can review and adjust',
            'Conversational recipe assistant based on preferences and dietary restrictions',
            'Custom backend for model orchestration, structured response validation and dynamic context enrichment',
            'Cross-platform mobile app with JWT authentication and persistent favorites',
          ],
          note: 'Computer Engineering thesis (UNAERP, 2026), defended and approved with the top grade (10). The exploratory evaluation showed high accuracy identifying items and recipes that were coherent and consistent with dietary restrictions. Repository is private and evolving into a product.',
        },
        {
          title: 'Go Ledger API',
          short:
            'Personal finance API with a fintech angle: accounts, transactions, imports and asynchronous processing.',
          highlights: [
            'Accounts, categories and transactions with a monthly summary',
            'Transaction imports and asynchronous processing',
            'PostgreSQL, Docker and test coverage',
          ],
          status: 'In progress',
          problem:
            'Managing finances across multiple accounts, categories and imported statements demands a reliable backend with asynchronous processing and consistent data.',
          solution:
            'A small financial system in Go with accounts, transactions, categories, monthly summaries, file imports and asynchronous processing, structured to scale.',
          implemented: [
            'Users, accounts, categories and transactions',
            'Monthly summary and transaction imports',
            'Asynchronous processing and logging',
            'Tests, Docker and PostgreSQL (MongoDB optional)',
          ],
          note: 'A study project in Go, still in progress. Focused on a performant backend and good practices.',
        },
        {
          title: 'RAG System',
          short:
            'Hybrid RAG pipeline with dense and sparse retrieval plus ColBERT reranking over SEC filings.',
          highlights: [
            'Hybrid search: Dense + Sparse + ColBERT',
            'Reranking for higher retrieval precision',
            'LLM-generated answers grounded in context',
          ],
          problem:
            'Reviewing hundreds of SEC financial filings by hand is impractical. Finding the relevant passages takes hours of reading.',
          solution:
            'Hybrid RAG pipeline with dense and sparse retrieval plus ColBERT reranking for precise information retrieval and context-grounded answer generation with an LLM.',
          implemented: [
            'PDF document ingestion and chunking',
            'Hybrid search: Dense + Sparse + ColBERT',
            'Reranking for higher precision',
            'LLM-generated answers grounded in context',
          ],
        },
        {
          title: 'Agentic Support Router',
          short:
            'Multi-agent system for dynamic support ticket routing, built with FastAPI.',
          highlights: [
            'Routing based on user intent',
            'Function calling for concrete actions',
            'Prompt chaining across specialized agents',
          ],
          problem:
            'Traditional support systems cannot route and resolve complex tickets autonomously, creating bottlenecks in service.',
          solution:
            'Multi-agent system with prompt chaining and dynamic routing. Orchestration handled manually with FastAPI, with no agent framework dependency.',
          implemented: [
            'Dynamic routing based on user intent',
            'Function calling for concrete actions',
            'Prompt chaining across specialized agents',
            'Full REST API with FastAPI',
          ],
        },
        {
          title: 'Large-Scale ETL Pipeline',
          short:
            'Serverless ETL with SQS, Lambda and a vector database, following Clean Architecture.',
          highlights: [
            'Asynchronous ingestion through SQS queues',
            'Serverless processing with Lambda',
            'Loading into a vector database for semantic search',
          ],
          status: 'Corporate',
          problem:
            'Documents from multiple sources arrived in different formats and had to be processed, transformed and indexed reliably and at scale.',
          solution:
            'Complete ETL pipeline with asynchronous SQS ingestion, serverless processing on AWS Lambda and loading into a vector database, following Clean Architecture principles.',
          implemented: [
            'Asynchronous ingestion through SQS queues',
            'Serverless processing with Lambda',
            'Loading into a vector database for semantic search',
            'Error traceability and automatic retries',
          ],
          note: 'Corporate project. Code not available due to confidentiality.',
        },
        {
          title: 'CI/CD with GitHub Actions',
          short:
            'Build, test and continuous deployment pipelines with GitHub Actions and Docker.',
          highlights: [
            'Automated builds and tests on every push',
            'Continuous deployment with automatic rollback',
            'Reproducible Docker images',
          ],
          status: 'Corporate',
          problem:
            'Manual deploys with no test coverage created a real risk of regressions in production.',
          solution:
            'Automated build, test and continuous deployment pipelines with GitHub Actions, integrated with Docker for reproducible environments.',
          implemented: [
            'Automated builds and tests on every push',
            'Continuous deployment with automatic rollback',
            'Reproducible Docker images',
            'Pipelines wired into the PR workflow',
          ],
          note: 'Corporate project. Code not available due to confidentiality.',
        },
      ],
    },

    stack: {
      titleLead: 'Tech',
      titleAccent: 'stack',
      subtitle: 'Technologies I work with day to day.',
      categories: {
        responsible: 'Responsible AI',
        ai: 'AI & Data',
        backend: 'Back-end',
        frontend: 'Front-end',
        infra: 'Infra & automation',
      },
      tags: {},
    },

    research: {
      title: 'Academic',
      subtitle: 'Undergraduate research, teaching and academic contributions.',
      viewImages: 'View images of',
      items: [
        {
          type: 'Teaching / Course',
          title: 'n8n course at UNAERP',
          description:
            'Hands-on course on workflow automation and AI integrations, taught to university students. Material open on GitHub.',
          institution: 'University of Ribeirão Preto',
        },
        {
          type: 'Undergraduate Research',
          title: 'Impact of climate variables on the dynamics of dengue cases',
          description:
            'ML system analyzing climate factors and atmospheric anomalies related to dengue cases in Ribeirão Preto, with a focus on extreme events.',
          institution: 'University of Ribeirão Preto',
        },
        {
          type: 'Undergraduate Research',
          title:
            'Automated collection of meteorological data for predictive arbovirus studies',
          description:
            'Database built with R, Python and MySQL to feed predictive models of dengue, zika and chikungunya outbreaks.',
          institution: 'University of Ribeirão Preto',
        },
      ],
    },

    events: {
      title: 'Events',
      subtitle: 'Conferences, workshops and meetups I attended.',
      moreOnLinkedin: 'More events on LinkedIn',
      items: [
        {
          title: 'Oracle Dev Tour São Paulo',
          description:
            'Event focused on AI, data and automation, with talks on generative AI, RAG, agents and autonomous databases.',
          location: 'São Paulo, Brazil',
          type: 'Conference',
        },
        {
          title: 'Talk: Introduction to n8n',
          description:
            'Internal talk on n8n and workflow automation, focused on curating technical content and applying it in practice with the team.',
          location: 'Citel · Ribeirão Preto, Brazil',
          type: 'Talk',
        },
        {
          title: 'CCM Event: AI in Action',
          description:
            'Event on practical AI applications, market trends and use cases in real products.',
          location: 'Dabi Business · Ribeirão Preto, Brazil',
          type: 'Workshop',
        },
      ],
    },

    freelance: {
      badge: 'Available',
      title: 'Available for independent projects',
      description:
        'I can contribute to web systems, APIs, automations, AI integrations, RAG, agents, data pipelines, Python performance work and application deployment.',
      cta: "Let's talk",
    },

    contact: {
      titleLead: "Let's",
      titleAccent: 'talk',
      subtitle:
        'Open to conversations about Responsible AI, generative AI, agents, software engineering, collaborations and independent projects.',
      arccodeLabel: 'ArcCode profile',
    },

    footer: {
      tagline: 'AI Engineering · Generative AI · Python',
    },

    modal: {
      close: 'Close',
    },
  },
}

export const languages = [
  { code: 'pt', label: 'PT', full: 'Português (BR)' },
  { code: 'en', label: 'EN', full: 'English (US)' },
]

export const defaultLanguage = 'pt'
