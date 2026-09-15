import { useState } from 'react'
import Modal from './ui/Modal'
import { useLanguage } from '../i18n/LanguageContext'

/* Dados independentes de idioma, na mesma ordem de t.projects.items */
const projectMeta = [
  {
    tags: ["React Native", "Expo", "FastAPI", "PostgreSQL", "Gemini", "Multimodal", "NLP", "JWT"],
    images: ["/images/chefai-tcc-apresentacao.jpg"],
  },
  {
    tags: ["Go", "PostgreSQL", "MongoDB", "Docker", "REST API", "Async"],
  },
  {
    tags: ["Python", "RAG", "Qdrant", "Gemini", "ColBERT", "HuggingFace"],
    github: "https://github.com/anaclacp/rag-implementation-",
  },
  {
    tags: ["Python", "FastAPI", "Groq", "LLM Agents", "Function Calling"],
    github: "https://github.com/anaclacp/agentic-support-router",
  },
  {
    tags: ["Python", "AWS Lambda", "SQS", "Clean Architecture", "Vector DB"],
  },
  {
    tags: ["GitHub Actions", "Docker", "CI/CD", "DevOps", "Python"],
  },
]

function StatusChip({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-purple-light bg-purple-light/10 border border-purple-light/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      {status}
    </span>
  )
}

function ProjectCard({ project, onOpen, labels }) {
  return (
    <article className="card-glow rounded-2xl p-6 group flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-purple-light transition-colors">
          {project.title}
        </h3>
        {project.status && <StatusChip status={project.status} />}
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-5">
        {project.short}
      </p>

      <ul className="space-y-1.5 mb-5">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-purple-light mt-0.5 shrink-0">›</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="text-[11px] font-mono text-gray-300 bg-dark-700/40 border border-white/5 px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
        {project.tags.length > 5 && (
          <span className="text-[11px] font-mono text-gray-500 px-1 py-0.5">
            +{project.tags.length - 5}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-2">
        <button
          onClick={onOpen}
          className="text-sm font-medium text-purple-light hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          {labels.viewDetails}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {project.github && (
          <>
            <span className="text-gray-700">·</span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-purple-light transition-colors inline-flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </>
        )}
      </div>
    </article>
  )
}

function ProjectDetails({ project, labels }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-5 pr-10">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        {project.status && <StatusChip status={project.status} />}
      </div>

      {project.images && project.images.length > 0 && (
        <div className={`mb-5 ${project.images.length > 1 ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : ""}`}>
          {project.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} · ${labels.presentation}`}
              className="w-full h-auto rounded-lg border border-white/5"
            />
          ))}
        </div>
      )}

      <div className="space-y-5 text-sm md:text-base">
        <section>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1.5">{labels.problem}</p>
          <p className="text-gray-300 leading-relaxed">{project.problem}</p>
        </section>

        <section>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1.5">{labels.solution}</p>
          <p className="text-gray-300 leading-relaxed">{project.solution}</p>
        </section>

        <section>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">{labels.implemented}</p>
          <ul className="space-y-1.5">
            {project.implemented.map((feat) => (
              <li key={feat} className="flex items-start gap-2 text-gray-300">
                <span className="text-purple-light mt-0.5 shrink-0">›</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">{labels.stack}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-gray-300 bg-dark-700/40 border border-white/5 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {(project.github || project.demo) && (
          <section className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
              >
                <span>Demo</span>
              </a>
            )}
          </section>
        )}

        {project.note && (
          <p className="text-gray-500 text-xs italic pt-3 border-t border-white/5">
            {project.note}
          </p>
        )}
      </div>
    </div>
  )
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState(null)
  const { t } = useLanguage()

  const labels = { ...t.projects.labels, viewDetails: t.projects.viewDetails }
  const projects = t.projects.items.map((item, i) => ({ ...item, ...projectMeta[i] }))
  const active = activeIndex === null ? null : projects[activeIndex]

  return (
    <section id="projetos" className="py-32 px-6 bg-dark-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl mb-4 text-center" data-reveal>
          <span className="accent">{t.projects.title}</span>
        </h2>
        <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto text-sm md:text-base" data-reveal style={{ '--reveal-delay': '80ms' }}>
          {t.projects.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div key={i} data-reveal style={{ '--reveal-delay': `${(i % 2) * 90}ms` }}>
              <ProjectCard
                project={project}
                labels={labels}
                onOpen={() => setActiveIndex(i)}
              />
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs mt-10" data-reveal>
          {t.projects.confidentialityNote}
        </p>

        <div className="text-center mt-6">
          <a
            href="https://github.com/anaclacp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-light hover:text-white transition-colors link-animate text-sm"
          >
            {t.projects.seeMore}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActiveIndex(null)}>
        {active && <ProjectDetails project={active} labels={labels} />}
      </Modal>
    </section>
  )
}

export default Projects
