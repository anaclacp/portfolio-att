import { useLanguage } from '../i18n/LanguageContext'

const stackGroups = [
  {
    key: "responsible",
    items: ["AI Governance", "AI Evals", "Groundedness", "Reliability", "Human Oversight"]
  },
  {
    key: "ai",
    items: ["LLMs", "RAG", "Qdrant", "Embeddings", "Agents", "Vector Search", "Hybrid Search", "ETL", "Pipelines", "Prompts"]
  },
  {
    key: "backend",
    items: ["Python", "FastAPI", "Go", "Node.js", "PostgreSQL", "MySQL", "MongoDB", "Docker"]
  },
  {
    key: "frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind"]
  },
  {
    key: "infra",
    items: ["GitHub Actions", "AWS Lambda", "Serverless", "n8n", "CI/CD", "Grafana", "Loki", "Tempo"]
  }
]

function TechStack() {
  const { t } = useLanguage()

  return (
    <section id="stack" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl mb-4 text-center">
          {t.stack.titleLead} <span className="accent">{t.stack.titleAccent}</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto text-sm md:text-base">
          {t.stack.subtitle}
        </p>

        <div className="space-y-8">
          {stackGroups.map((group) => (
            <div key={group.key} className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8 items-start">
              <div className="flex items-center gap-3 md:justify-end md:pt-1">
                <span className="hidden md:block h-px flex-1 bg-gradient-to-l from-purple-light/30 to-transparent" />
                <span className="font-display text-xs font-medium text-purple-light uppercase tracking-[0.2em] whitespace-nowrap">
                  {t.stack.categories[group.key]}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-mono text-gray-300 bg-dark-700/40 border border-white/5 hover:border-purple-light/40 hover:text-white transition-all duration-200 px-3.5 py-1.5 rounded-full cursor-default"
                  >
                    {t.stack.tags[item] || item}
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
