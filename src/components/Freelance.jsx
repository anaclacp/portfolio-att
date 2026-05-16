function Freelance() {
  return (
    <section id="freelance" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="card-soft rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-vibrant"></span>
              <span className="text-xs font-mono text-pink-vibrant uppercase tracking-[0.2em]">
                Disponível
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">
              Disponível para projetos freelancer
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Posso ajudar com desenvolvimento de sistemas web, APIs, automações, integrações com IA,
              RAG, agentes, melhorias de performance em projetos Python e deploy de aplicações.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#contato"
              className="btn-gradient inline-flex items-center gap-2 px-7 py-3 rounded-full font-body text-sm font-medium"
            >
              <span>Vamos conversar</span>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Freelance
