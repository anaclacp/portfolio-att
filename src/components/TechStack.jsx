const stackGroups = [
  {
    category: "IA / ML",
    items: ["LangChain", "YOLO", "Computer Vision", "scikit-learn", "PyTorch"]
  },
  {
    category: "Backend",
    items: ["Python", "FastAPI", "Node.js", "JavaScript", "Rust"]
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript"]
  },
  {
    category: "Infra & DevOps",
    items: ["Docker", "AWS", "Oracle", "GitHub Actions", "CI/CD", "n8n"]
  }
]

function TechStack() {
  return (
    <section id="stack" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-6 text-center">Stack Tecnológica</h2>
        <p className="text-gray-400 text-center mb-20 max-w-2xl mx-auto">
          Tecnologias com as quais trabalho no dia a dia, do modelo à produção
        </p>

        <div className="space-y-10">
          {stackGroups.map((group) => (
            <div key={group.category} className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8 items-start">
              {/* Category label */}
              <div className="flex items-center gap-3 md:justify-end md:pt-1">
                <span className="hidden md:block h-px flex-1 bg-gradient-to-l from-purple-deep/60 to-transparent" />
                <span className="font-display text-sm font-semibold text-purple-light uppercase tracking-widest whitespace-nowrap">
                  {group.category}
                </span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-mono text-gray-300 bg-dark-700/60 border border-purple-deep/30 hover:border-pink-vibrant/50 hover:text-white transition-all duration-200 px-4 py-1.5 rounded-full cursor-default"
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
