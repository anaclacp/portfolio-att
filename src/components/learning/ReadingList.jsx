import { useLanguage } from '../../i18n/LanguageContext'
import { statusLabel, typeLabel } from '../../lib/learningLabels'
import { formatYear } from '../../lib/learningFormat'
import Tags from './Tags'

/**
 * Artigos, papers e documentação.
 * Lista editorial, mais leve que os cards da estante: a hierarquia é
 * organização, título, metadados. Sem caixa, só uma régua entre as entradas.
 */
function ReadingList({ items }) {
  const { t } = useLanguage()

  const abrir = (item) => {
    if (item.type === 'paper') return t.learning.openPaper
    if (item.type === 'docs') return t.learning.openDocs
    return t.learning.openReading
  }

  return (
    <ul className="divide-y divide-white/5 border-y border-white/5">
      {items.map((item) => {
        const ano = formatYear(item.completed_at) || formatYear(item.started_at)

        return (
          <li key={item.id} className="py-5 group/read">
            {item.author && (
              <p className="text-purple-light text-[11px] font-mono uppercase tracking-wider mb-1">
                {item.author}
              </p>
            )}

            <h3 className="font-display text-base md:text-lg font-semibold text-white tracking-tight leading-snug mb-1.5">
              {item.title}
            </h3>

            <p className="text-gray-500 text-xs mb-2">
              {typeLabel(t, item)} · {statusLabel(t, item)}
              {ano && ` · ${ano}`}
            </p>

            {item.description && (
              <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-2xl">
                {item.description}
              </p>
            )}

            <Tags items={item.tags} className="mb-3" />

            {item.external_url && (
              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-light transition-colors"
              >
                <span className="text-purple-light">↗</span>
                {abrir(item)}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default ReadingList
