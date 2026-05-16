const events = [
  {
    title: "Oracle Dev Tour São Paulo",
    description: "Evento focado em IA, dados e automação, com discussões sobre IA generativa, RAG, agentes e bancos de dados autônomos.",
    date: "2025",
    location: "São Paulo, SP",
    type: "Conferência",
    image: "/images/oracle-dev-tour.jpg",
    linkedin: "https://www.linkedin.com/posts/anaclacp_hoje-tive-a-oportunidade-de-participar-do-activity-7310798785679441920-mO92?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs",
  },
  {
    title: "Palestra: Introdução ao n8n",
    description: "Palestra interna sobre n8n e automação de workflows, com foco em curadoria de conteúdo técnico e aplicação prática para a equipe.",
    date: "2025",
    location: "Citel · Ribeirão Preto, SP",
    type: "Palestra",
    image: "/images/palestra-n8n.jpg",
    linkedin: "https://www.linkedin.com/posts/anaclacp_n8n-automaaexaeto-citel-activity-7296293143128244226-6FPq?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs",
  },
  {
    title: "Evento CCM: IA em Ação",
    description: "Evento sobre aplicações práticas de IA, tendências do mercado e casos de uso em produtos reais.",
    date: "2025",
    location: "Dabi Business · Ribeirão Preto, SP",
    type: "Workshop",
    image: "/images/ccm-evento.jpg"
  },
]

function EventCard({ event }) {
  return (
    <article className="card-glow rounded-xl overflow-hidden flex flex-col">
      <div className="relative h-36 bg-dark-700 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-dark-900/80 backdrop-blur text-purple-light text-[11px] font-mono border border-purple-light/20 px-2.5 py-0.5 rounded-full">
            {event.date}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-purple-light text-[11px] font-mono uppercase tracking-wider mb-1.5 block">
          {event.type}
        </span>
        <h3 className="font-display text-base font-semibold text-white tracking-tight mb-2 leading-snug">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">
          {event.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          {event.location && (
            <p className="text-gray-500 text-xs truncate">{event.location}</p>
          )}
          {event.linkedin && (
            <a
              href={event.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-purple-light hover:text-white transition-colors ml-auto shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Events() {
  return (
    <section id="eventos" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl mb-4 text-center">
          <span className="accent">Eventos</span>
        </h2>
        <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto text-sm md:text-base">
          Conferências, workshops e encontros que participei.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {events.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.linkedin.com/in/anaclacp/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Mais eventos no LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Events
