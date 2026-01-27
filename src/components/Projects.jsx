const projects = [
  {
    title: "RAG System",
    description: "Sistema avançado de Retrieval-Augmented Generation (RAG) para análise de documentos financeiros da SEC, utilizando busca híbrida (Dense + Sparse + ColBERT) e integração com LLM para geração de respostas contextualizadas",
    tags: ["Python", "RAG", "Qdrant", "Gemini", "Financial Docs"],
    github: "https://github.com/anaclacp/rag-implementation-",
    demo: null
  },
  {
    title: "Chef AI (TCC)",
    description: "Assistente culinário inteligente com visão computacional para gestão de despensa e redução de desperdício alimentar. Está em desenvolvimento no momento.",
    tags: ["Python", "Computer Vision", "AI", "React"],
    github: "#",
    demo: null
  },
  {
    title: "ETL Pipeline",
    description: "Pipeline de ETL com AWS Lambda, SQS e processamento em batch para documentação corporativa.",
    tags: ["AWS Lambda", "SQS", "Python", "Clean Architecture"],
    github: "#",
    demo: null
  }
]

function ProjectCard({ project, index }) {
  return (
    <div
      className="card-glow rounded-2xl p-8 group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-deep to-pink-vibrant flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <a href={project.github} className="text-gray-500 hover:text-pink-vibrant transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>

      <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-pink-vibrant transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono text-purple-light bg-purple-deep/20 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section id="projetos" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-6 text-center">Projetos Open Source</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Alguns dos projetos que desenvolvi e compartilho com a comunidade
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
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
