import { useLanguage } from '../../i18n/LanguageContext'
import { formatPeriod, formatLearningDate, hasProgress } from '../../lib/learningFormat'
import { statusLabel, typeLabel } from '../../lib/learningLabels'
import ProgressBar from './ProgressBar'
import RelatedProject from './RelatedProject'
import Tags from './Tags'

/** Card de um item em andamento: título, status, progresso, tags e datas. */
function LearningCard({ item }) {
  const { t, lang } = useLanguage()
  const ongoing = item.startedAt && item.started_at && !item.completed_at && ['in_progress', 'studying', 'reading'].includes(item.status)
  const periodo = ongoing ? `${formatLearningDate(item.started_at, lang)} — ${lang === 'pt' ? 'atual' : 'present'}` : formatPeriod(item, lang)

  return (
    <article className="card-glow rounded-2xl p-6 flex flex-col group">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-purple-light transition-colors">
          {item.title}
        </h3>
        <span className="text-[11px] font-mono text-purple-light bg-purple-light/10 border border-purple-light/20 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
          {statusLabel(t, item)}
        </span>
      </div>

      <p className="text-gray-500 text-[11px] uppercase tracking-wider mb-3">
        {typeLabel(t, item)}
        {item.author && (
          <span className="normal-case tracking-normal text-gray-500">
            {' '}
            · {t.learning.by} {item.author}
          </span>
        )}
      </p>

      {item.description && (
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
      )}

      {hasProgress(item) && (
        <div className="mb-4">
          <ProgressBar value={item.progress} label={item.title} />
        </div>
      )}

      <Tags items={item.tags} className="mb-4" />

      <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
        {periodo ? (
          <span className="text-gray-600 text-xs">
            {t.learning.startedAt} {periodo}
          </span>
        ) : (
          <span />
        )}

        {item.external_url && !item.resources?.length && (
          <a
            href={item.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-purple-light transition-colors inline-flex items-center gap-1"
          >
            Link <span className="text-purple-light">↗</span>
          </a>
        )}
      </div>

      {item.resources?.length > 0 && <div className="flex flex-wrap gap-4 mt-4">{item.resources.map(resource => (
        <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer" className="learning-link">{resource.title} <span aria-hidden>↗</span></a>
      ))}</div>}
      {item.notes && <p className="learning-personal-note mt-4">{item.notes}</p>}

      <RelatedProject item={item} />
    </article>
  )
}

export default LearningCard
