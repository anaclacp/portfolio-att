const stackGroups = [
  {
    category: "IA & Dados",
    items: ["LLMs", "RAG", "Qdrant", "Embeddings", "Agentes", "Vector Search", "Hybrid Search", "ETL", "Pipelines", "Prompts"]
  },
  {
    category: "Back-end",
    items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "MySQL", "Docker"]
  },
  {
    category: "Front-end",
    items: ["React", "Next.js", "TypeScript", "Tailwind"]
  },
  {
    category: "Infra & automação",
    items: ["GitHub Actions", "AWS Lambda", "Serverless", "n8n", "CI/CD"]
  }
]

function TechStack() {
  return (
    <section id="stack" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl mb-4 text-center">
          Stack <span className="accent">tecnológica</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto text-sm md:text-base">
          Tecnologias com as quais trabalho no dia a dia.
        </p>

        <div className="space-y-8">
          {stackGroups.map((group) => (
            <div key={group.category} className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8 items-start">
              <div className="flex items-center gap-3 md:justify-end md:pt-1">
                <span className="hidden md:block h-px flex-1 bg-gradient-to-l from-purple-light/30 to-transparent" />
                <span className="font-display text-xs font-medium text-purple-light uppercase tracking-[0.2em] whitespace-nowrap">
                  {group.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-mono text-gray-300 bg-dark-700/40 border border-white/5 hover:border-purple-light/40 hover:text-white transition-all duration-200 px-3.5 py-1.5 rounded-full cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
