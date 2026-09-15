import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { formatPeriod } from '../../lib/learningFormat'
import { statusLabel } from '../../lib/learningLabels'
import Tags from './Tags'

const PAGE_SIZE = 6

/**
 * Assuntos estudados recentemente.
 *
 * Deliberadamente sem ícone de "check": esses itens não foram concluídos, foram
 * explorados. O rótulo vem de statusLabel, que diz "Estudado recentemente".
 */
function RecentList({ items }) {
  const { t, lang } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? items : items.slice(0, PAGE_SIZE)
  const hidden = items.length - visible.length

  return (
    <div>
      <ul className="space-y-2.5">
        {visible.map((item) => {
          const periodo = formatPeriod(item, lang)

          return (
            <li key={item.id} className="card-soft rounded-xl px-5 py-4">
              <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1">
                <h3 className="font-display text-sm md:text-base font-semibold text-white tracking-tight">
                  {item.title}
                </h3>
                {periodo && (
                  <span className="font-mono text-[11px] text-gray-600 whitespace-nowrap">
                    {periodo}
                  </span>
                )}
              </div>

              <p className="text-purple-light/80 text-[11px] uppercase tracking-wider mb-2">
                {statusLabel(t, item)}
              </p>

              {item.description && (
                <p className="text-gray-400 text-sm leading-relaxed mb-2.5">{item.description}</p>
              )}

              <Tags items={item.tags} />

              {item.repository_url && (
                <a
                  href={item.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-light transition-colors mt-2.5"
                >
                  GitHub <span className="text-purple-light">↗</span>
                </a>
              )}
            </li>
          )
        })}
      </ul>

      {items.length > PAGE_SIZE && (
        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-sm text-purple-light hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            {expanded ? t.learning.showLess : `${t.learning.showMore} (${hidden})`}
            <span className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>↓</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default RecentList
