import { useLanguage } from '../../i18n/LanguageContext'
import { formatMonthYear, hasProgress } from '../../lib/learningFormat'
import ProgressBar from './ProgressBar'
import Tags from './Tags'

/**
 * Timeline de cursos, pesquisas e certificações.
 * Reaproveita o desenho da timeline da seção Acadêmico da home.
 */
function ResearchTimeline({ items }) {
  const { t, lang } = useLanguage()

  return (
    <ol className="space-y-7">
      {items.map((item, i) => {
        const started = formatMonthYear(item.started_at, lang)
        const done = formatMonthYear(item.completed_at, lang)
        const isLast = i === items.length - 1

        return (
          <li key={item.id} className="relative pl-8 md:pl-10">
            {!isLast && (
              <span
                className="absolute left-[7px] md:left-[9px] top-3 bottom-[-1.75rem] w-px bg-white/8"
                aria-hidden
              />
            )}
            <span className="absolute left-0 top-2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-dark-700 border border-purple-light/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-light" />
            </span>

            <div className="flex items-baseline gap-3 mb-1 flex-wrap">
              <span className="font-mono text-xs text-purple-light tracking-wider">
                {done || started || '—'}
              </span>
              <span className="text-gray-500 text-xs uppercase tracking-wider">
                {t.learning.types[item.type] || item.type}
              </span>
              <span className="text-gray-600 text-xs">
                {t.learning.statuses[item.status] || item.status}
              </span>
            </div>

            <h3 className="font-display text-base md:text-lg font-semibold text-white tracking-tight mb-1.5 leading-snug">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-gray-400 text-sm leading-relaxed mb-2.5">{item.description}</p>
            )}

            {hasProgress(item) && item.status !== 'completed' && (
              <div className="max-w-xs mb-3">
                <ProgressBar value={item.progress} label={item.title} />
              </div>
            )}

            <Tags items={item.tags} className="mb-2" />

            <div className="flex items-center gap-4 flex-wrap">
              {item.external_url && (
                <a
                  href={item.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-light transition-colors"
                >
                  Link <span className="text-purple-light">↗</span>
                </a>
              )}
              {item.repository_url && (
                <a
                  href={item.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-light transition-colors"
                >
                  GitHub <span className="text-purple-light">↗</span>
                </a>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default ResearchTimeline
