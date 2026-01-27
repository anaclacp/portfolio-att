import { useState } from 'react'

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
  {
    title: "Ver mais eventos",
    description: "Quer conhecer outros eventos, palestras e workshops que participei? Acesse meu perfil no LinkedIn para ver a lista completa!",
    type: "LinkedIn",
    isCallToAction: true,
    linkedin: "https://www.linkedin.com/in/anaclacp/"
  }
]

function Events() {
  const [currentEvent, setCurrentEvent] = useState(0)

  const nextEvent = () => setCurrentEvent((prev) => (prev + 1) % events.length)
  const prevEvent = () => setCurrentEvent((prev) => (prev - 1 + events.length) % events.length)

  const event = events[currentEvent]

  return (
    <section id="eventos" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl mb-6 text-center">Eventos</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Conferências, workshops e encontros que participei
        </p>

        <div className="relative">
          <div className="card-glow rounded-2xl overflow-hidden grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative overflow-hidden">
              <div className="carousel-container h-full min-h-[300px] md:min-h-[400px]">
                <div
                  className="carousel-track h-full"
                  style={{ transform: `translateX(-${currentEvent * 100}%)` }}
                >
                  {events.map((evt, i) => (
                    <div key={i} className="carousel-slide h-full">
                      {evt.isCallToAction ? (
                        <div className="w-full h-full bg-gradient-to-br from-purple-deep via-pink-vibrant to-purple-medium flex items-center justify-center">
                          <div className="text-center p-8">
                            <svg className="w-16 h-16 mx-auto mb-4 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span className="text-white/80 font-display text-xl">+ Eventos</span>
                          </div>
                        </div>
                      ) : (
                        <div className="image-container w-full h-full bg-gradient-to-br from-purple-deep to-pink-vibrant flex items-center justify-center">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.parentElement.innerHTML = `<span class="text-white/80 font-display text-lg">${evt.title}</span>`
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevEvent}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-800/80 border border-purple-light/30 flex items-center justify-center hover:border-pink-vibrant transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextEvent}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-800/80 border border-purple-light/30 flex items-center justify-center hover:border-pink-vibrant transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Badge */}
              {!event.isCallToAction && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-pink-vibrant/90 text-white text-xs font-mono px-3 py-1 rounded-full">
                    {event.date}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-center">
              <div key={currentEvent} className="animate-fade-in">
                <span className="text-purple-light text-sm font-mono mb-2 block">{event.type}</span>
                <h3 className="font-display text-2xl font-semibold mb-3">{event.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{event.description}</p>

                {!event.isCallToAction && event.location && (
                  <p className="text-gray-500 text-sm">
                    <span className="text-pink-magenta">📍</span> {event.location}
                  </p>
                )}

                {event.linkedin && (
                  <a
                    href={event.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 transition-colors w-fit mt-4 ${
                      event.isCallToAction
                        ? 'btn-gradient px-6 py-3 rounded-full font-semibold text-white'
                        : 'text-purple-light hover:text-pink-vibrant'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>{event.isCallToAction ? 'Acessar meu LinkedIn' : 'Ver no LinkedIn'}</span>
                  </a>
                )}
              </div>

              {/* Dots */}
              <div className="flex gap-3 mt-8">
                {events.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentEvent(i)}
                    className={`nav-dot ${currentEvent === i ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
