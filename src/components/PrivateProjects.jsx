const privateProjects = [
  {
    title: "RAG Hybrid",
    description: "Sistema de Retrieval-Augmented Generation híbrido combinando busca semântica e keyword search para melhor precisão em consultas de documentação corporativa.",
    tags: ["Python", "RAG", "Qdrant", "OpenAI", "LangChain"]
  },
  {
    title: "ETL Completo",
    description: "Pipeline de ETL robusto para processamento de documentos em larga escala, com ingestão de múltiplas fontes, transformação e carga em banco vetorial.",
    tags: ["Python", "AWS Lambda", "SQS", "Clean Architecture"]
  },
  {
    title: "CI/CD com GitHub Actions",
    description: "Sistemas integrados com pipelines automatizados de deploy, testes e validação usando GitHub Actions para entrega contínua.",
    tags: ["GitHub Actions", "Docker", "CI/CD", "DevOps"]
  }
]

function PrivateProjectCard({ project }) {
  return (
    <div className="card-glow rounded-2xl p-6 group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-deep/50 to-pink-vibrant/50 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-pink-vibrant transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-purple-light/80 bg-purple-deep/20 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PrivateProjects() {
  return (
    <section id="projetos-privados" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-6 text-center">Projetos Privados</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Projetos desenvolvidos em ambiente corporativo com código proprietário
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {privateProjects.map((project, i) => (
            <PrivateProjectCard key={i} project={project} />
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Código fonte não disponível por questões de confidencialidade
        </p>
      </div>
    </section>
  )
}

export default PrivateProjects
