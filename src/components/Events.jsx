const events = [
  {
    title: "Oracle Dev Tour São Paulo",
    description: "Participação em evento focado em IA, Dados e Automação. Aprofundamento em IA Generativa, Oracle Autonomous e RAG, com networking estratégico e discussões técnicas sobre a aplicação prática de agentes de IA e bancos de dados autônomos.",
    date: "2025",
    location: "São Paulo, SP",
    type: "Conferência / Workshop",
    image: "/images/oracle-dev-tour.jpg",
    linkedin: "https://www.linkedin.com/posts/anaclacp_hoje-tive-a-oportunidade-de-participar-do-activity-7310798785679441920-mO92?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs",
  },
  {
    title: "Palestra: Introdução ao n8n",
    description: "Ministrei uma palestra interna na Citel sobre o n8n e automação de workflows. O processo de curadoria e preparação do material técnico foi tão enriquecedor quanto a apresentação em si, permitindo-me consolidar conhecimentos avançados enquanto compartilhava estratégias para impulsionar a produtividade da equipe.",
    date: "2025",
    location: "Citel, Ribeirão Preto, SP",
    type: "Palestra",
    image: "/images/palestra-n8n.jpg",
    linkedin: "https://www.linkedin.com/posts/anaclacp_n8n-automaaexaeto-citel-activity-7296293143128244226-6FPq?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs",
  },
  {
    title: "Evento CCM: IA em Ação",
    description: "Participação em evento focado em Inteligência Artificial, com discussões sobre as últimas tendências e aplicações práticas de IA no mercado.",
    date: "2025",
    location: "Dabi Business (CCM), Ribeirão Preto, SP",
    type: "Evento / Workshop",
    image: "/images/ccm-evento.jpg"
  },
]

function EventCard({ event }) {
  return (
    <div className="card-glow rounded-2xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-dark-700 flex items-center justify-center overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-dark-900/80 backdrop-blur text-purple-light text-xs font-mono border border-purple-light/20 px-3 py-1 rounded-full">
            {event.date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-purple-light text-xs font-mono uppercase tracking-wider mb-2 block">{event.type}</span>
        <h3 className="font-display text-base font-semibold mb-3 tracking-tight">{event.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{event.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          {event.location && (
            <p className="text-gray-500 text-xs">
              <span className="text-purple-light/70">·</span> {event.location}
            </p>
          )}
          {event.linkedin && (
            <a
              href={event.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-purple-light hover:text-white transition-colors text-sm ml-auto"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Ver no LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Events() {
  return (
    <section id="eventos" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl mb-4 text-center">
          <span className="accent">Eventos</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto text-sm md:text-base">
          Conferências, workshops e encontros que participei.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {events.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>

        {/* CTA LinkedIn */}
        <div className="text-center">
          <a
            href="https://www.linkedin.com/in/anaclacp/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Ver mais eventos no LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Events
