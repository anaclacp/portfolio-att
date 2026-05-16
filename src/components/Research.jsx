import { useState } from 'react'
import Modal from './ui/Modal'

const items = [
  {
    year: "2026",
    type: "Docência / Curso",
    title: "Curso de n8n na UNAERP",
    description: "Curso prático sobre automação de workflows e integrações com IA, ministrado para alunos da universidade. Material aberto no GitHub.",
    institution: "Universidade de Ribeirão Preto",
    images: [
      "/images/curso-n8n-unaerp-1.jpg",
      "/images/curso-n8n-unaerp-2.jpg",
    ],
    github: "https://github.com/anaclacp/curso-n8n-unaerp-2026",
    linkedin: "https://www.linkedin.com/posts/anaclacp_n8n-ia-automaaexaetodeprocessos-ugcPost-7455258430782574592-aJDm?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs",
  },
  {
    year: "2025",
    type: "Iniciação Científica",
    title: "Impacto das variáveis climáticas na dinâmica dos casos de dengue",
    description: "Sistema de ML para analisar fatores climáticos e anomalias atmosféricas relacionados a casos de dengue em Ribeirão Preto, com foco em eventos extremos.",
    institution: "Universidade de Ribeirão Preto",
    images: ["/images/iniciacao-cientifica.jpg"],
  },
  {
    year: "2024",
    type: "Iniciação Científica",
    title: "Coleta automatizada de dados meteorológicos para estudos preditivos de arboviroses",
    description: "Base de dados com R, Python e MySQL para alimentar modelos preditivos de surtos de dengue, zika e chikungunya.",
    institution: "Universidade de Ribeirão Preto",
    images: ["/images/iniciacao-cientifica-2.jpg"],
    linkedin: "https://www.linkedin.com/posts/anaclacp_neste-ano-participei-do-25%C2%BA-conic-da-universidade-activity-7263220922872963073-YAai?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdEsl4B-Ekanl7KoM9f16jspnv4zBFKKGs",
  },
]

function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function Thumbnail({ images, alt, onOpen }) {
  if (!images || images.length === 0) return null
  const [first, second] = images
  const hasSecond = Boolean(second)

  return (
    <button
      onClick={onOpen}
      className="group relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-white/10 hover:border-purple-light/40 transition-colors"
      aria-label={`Ver imagens de ${alt}`}
    >
      {hasSecond ? (
        <div className="grid grid-cols-2 w-full h-full gap-px bg-dark-900">
          <img src={first} alt={alt} className="w-full h-full object-cover" />
          <img src={second} alt={alt} className="w-full h-full object-cover" />
        </div>
      ) : (
        <img src={first} alt={alt} className="w-full h-full object-cover" />
      )}
      <span className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </button>
  )
}

function TimelineItem({ item, isLast, onOpenImages }) {
  return (
    <li className="relative pl-8 md:pl-10">
      {!isLast && (
        <span className="absolute left-[7px] md:left-[9px] top-3 bottom-[-2rem] w-px bg-white/8" aria-hidden />
      )}
      <span className="absolute left-0 top-2.5 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-dark-700 border border-purple-light/40 flex items-center justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-light"></span>
      </span>

      <div className="pb-2 flex flex-col md:flex-row gap-4 md:gap-6 md:items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-mono text-xs text-purple-light tracking-wider">{item.year}</span>
            <span className="text-gray-500 text-xs uppercase tracking-wider">{item.type}</span>
          </div>
          <h3 className="font-display text-base md:text-lg font-semibold text-white tracking-tight mb-1.5 leading-snug">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            {item.description}
          </p>
          <p className="text-gray-500 text-xs mb-3">{item.institution}</p>

          {(item.github || item.linkedin) && (
            <div className="flex items-center gap-4">
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-light transition-colors"
                >
                  <GithubIcon />
                  GitHub
                </a>
              )}
              {item.linkedin && (
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-light transition-colors"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        <Thumbnail
          images={item.images}
          alt={item.title}
          onOpen={() => onOpenImages(item)}
        />
      </div>
    </li>
  )
}

function Lightbox({ item }) {
  if (!item) return null
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3 pr-10">
        <span className="font-mono text-xs text-purple-light tracking-wider">{item.year}</span>
        <span className="text-gray-500 text-xs uppercase tracking-wider">{item.type}</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-white tracking-tight mb-5 leading-snug">
        {item.title}
      </h3>

      <div className={item.images.length > 1 ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : ""}>
        {item.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={item.title}
            className="w-full h-auto rounded-lg border border-white/5"
          />
        ))}
      </div>
    </div>
  )
}

function Research() {
  const [active, setActive] = useState(null)

  return (
    <section id="academico" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl mb-4 text-center">
          <span className="accent">Acadêmico</span>
        </h2>
        <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto text-sm md:text-base">
          Iniciações científicas, docência e contribuições acadêmicas.
        </p>

        <ol className="space-y-8">
          {items.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              isLast={i === items.length - 1}
              onOpenImages={setActive}
            />
          ))}
        </ol>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        <Lightbox item={active} />
      </Modal>
    </section>
  )
}

export default Research
