const projects = [
  {
    title: "ChefAI",
    problem: "Decidir o que cozinhar com os ingredientes que já estão em casa gera desperdício e cansaço mental. Receitas online raramente partem da despensa real do usuário.",
    solution: "App mobile que une OCR para cadastro rápido de ingredientes e LLM (Gemini) para sugerir receitas personalizadas a partir da despensa digital do usuário.",
    tags: ["React Native", "Expo", "FastAPI", "PostgreSQL", "Gemini", "OCR", "JWT"],
    features: [
      "Despensa digital com cadastro por OCR via câmera",
      "Chat com IA para sugestão de receitas personalizadas",
      "Sistema de favoritos persistente",
      "Autenticação JWT com perfil de usuário"
    ],
    badge: "TCC em desenvolvimento",
    note: "Repositório privado até a apresentação do TCC. Conclusão prevista para agosto de 2026."
  },
  {
    title: "RAG System",
    problem: "Analisar centenas de documentos financeiros da SEC manualmente é inviável. Encontrar trechos relevantes demanda horas de leitura.",
    solution: "Pipeline RAG híbrido com busca densa, esparsa e reranking via ColBERT para recuperação precisa de informações e geração de respostas contextualizadas com LLM.",
    tags: ["Python", "RAG", "Qdrant", "Gemini", "ColBERT", "HuggingFace"],
    features: [
      "Ingestão e chunking de documentos PDF",
      "Busca híbrida: Dense + Sparse + ColBERT",
      "Reranking para maior precisão",
      "Respostas geradas por LLM com contexto"
    ],
    github: "https://github.com/anaclacp/rag-implementation-"
  },
  {
    title: "Agentic Support Router",
    problem: "Sistemas de suporte tradicionais não conseguem rotear e resolver tickets complexos de forma autônoma, criando gargalos no atendimento.",
    solution: "Sistema multi-agente com prompt chaining e roteamento dinâmico. Orquestração manual com FastAPI, sem dependência de frameworks de agentes.",
    tags: ["Python", "FastAPI", "Groq", "LLM Agents", "Function Calling"],
    features: [
      "Roteamento dinâmico por intenção do usuário",
      "Function calling para ações concretas",
      "Prompt chaining entre agentes especializados",
      "API REST completa com FastAPI"
    ],
    github: "https://github.com/anaclacp/agentic-support-router"
  },
  {
    title: "Pipeline ETL em Larga Escala",
    problem: "Documentos de múltiplas fontes chegavam em formatos diferentes e precisavam ser processados, transformados e indexados de forma confiável e escalável.",
    solution: "Pipeline ETL completo com ingestão assíncrona via SQS, processamento serverless com AWS Lambda e carga em banco vetorial, seguindo princípios de Clean Architecture.",
    tags: ["Python", "AWS Lambda", "SQS", "Clean Architecture", "Vector DB"],
    features: [
      "Ingestão assíncrona via filas SQS",
      "Processamento serverless com Lambda",
      "Carga em banco vetorial para busca semântica",
      "Rastreabilidade de erros e retries automáticos"
    ],
    badge: "Corporativo",
    note: "Projeto desenvolvido em ambiente corporativo, código não disponível por questões de confidencialidade."
  },
  {
    title: "CI/CD com GitHub Actions",
    problem: "Deploys manuais e sem cobertura de testes criavam risco de regressão em ambiente de produção.",
    solution: "Pipelines automatizados de build, testes e deploy contínuo com GitHub Actions, integrados com Docker para ambientes reproduzíveis.",
    tags: ["GitHub Actions", "Docker", "CI/CD", "DevOps", "Python"],
    features: [
      "Build e testes automatizados a cada push",
      "Deploy contínuo com rollback automático",
      "Imagens Docker reproduzíveis",
      "Pipelines integrados ao fluxo de PR"
    ],
    badge: "Corporativo",
    note: "Projeto desenvolvido em ambiente corporativo, código não disponível por questões de confidencialidade."
  }
]

function ProjectCard({ project, index }) {
  const isRestricted = Boolean(project.badge)

  return (
    <div
      className="card-glow rounded-2xl p-8 group flex flex-col"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5 gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-deep to-pink-vibrant flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-vibrant transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        ) : (
          <span className="text-xs font-mono text-purple-light bg-purple-deep/30 border border-purple-deep/40 px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {project.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-pink-vibrant transition-colors">
        {project.title}
      </h3>

      {/* Problem */}
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Problema</p>
      <p className="text-gray-400 text-sm mb-3 leading-relaxed">
        {project.problem}
      </p>

      {/* Solution */}
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Solução</p>
      <p className="text-gray-400 text-sm mb-5 leading-relaxed">
        {project.solution}
      </p>

      {/* Features */}
      <ul className="space-y-1.5 mb-6">
        {project.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-pink-vibrant mt-0.5 shrink-0">›</span>
            {feat}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono text-purple-light bg-purple-deep/20 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Note (TCC privado ou corporativo) */}
      {isRestricted && project.note && (
        <p className="text-purple-light/80 text-xs italic mt-auto pt-3 border-t border-purple-deep/20">
          {project.note}
        </p>
      )}
    </div>
  )
}

function Projects() {
  return (
    <section id="projetos" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-6 text-center">Projetos</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Sistemas que construí com RAG, agentes LLM, automações e pipelines de dados, do problema à produção
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm flex items-center justify-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Projetos marcados como corporativos não possuem código público por questões de confidencialidade
        </p>

        <div className="text-center mt-10">
          <a
            href="https://github.com/anaclacp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-pink-vibrant hover:text-pink-soft transition-colors link-animate"
          >
            Ver mais no GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
