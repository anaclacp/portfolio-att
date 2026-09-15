import { useLanguage } from '../../i18n/LanguageContext'
import { statusLabel } from '../../lib/learningLabels'
import { hasProgress } from '../../lib/learningFormat'
import ProgressBar from './ProgressBar'
import Tags from './Tags'

function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

/** Projetos nascidos dos estudos. Cards menores que os de "estudando agora". */
function ProjectList({ items }) {
  const { t } = useLanguage()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((item) => (
        <article key={item.id} className="card-soft rounded-xl p-5 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display text-base font-semibold text-white tracking-tight">
              {item.title}
            </h3>
            <span className="text-[11px] font-mono text-gray-400 whitespace-nowrap shrink-0">
              {statusLabel(t, item)}
            </span>
          </div>

          {item.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.description}</p>
          )}

          {hasProgress(item) && (
            <div className="mb-3">
              <ProgressBar value={item.progress} label={item.title} />
            </div>
          )}

          <Tags items={item.tags} className="mb-3" />

          {item.repository_url && (
            <a
              href={item.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-light transition-colors"
            >
              <GithubIcon />
              GitHub
              <span className="text-purple-light">↗</span>
            </a>
          )}
        </article>
      ))}
    </div>
  )
}

export default ProjectList
