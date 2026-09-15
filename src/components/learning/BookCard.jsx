import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { formatPeriod, hasProgress } from '../../lib/learningFormat'
import { statusLabel } from '../../lib/learningLabels'

/**
 * Capa do livro. Sem cover_url, ou se a imagem falhar ao carregar, cai numa
 * capa tipográfica com as iniciais, para a estante nunca ter buraco.
 */
function Cover({ item }) {
  const [broken, setBroken] = useState(false)
  const showImage = Boolean(item.cover_url) && !broken

  if (showImage) {
    return (
      <img
        src={item.cover_url}
        alt={item.title}
        loading="lazy"
        onError={() => setBroken(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }

  const initials = item.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-deep/25 to-pink-vibrant/15 px-3">
      <span className="font-display text-2xl font-semibold text-white/80">{initials}</span>
      <span className="font-mono text-[10px] text-white/40 text-center leading-tight line-clamp-3">
        {item.title}
      </span>
    </div>
  )
}

function BookCard({ item }) {
  const { t, lang } = useLanguage()

  const periodo = formatPeriod(item, lang)
  const dateLabel = periodo
    ? `${item.completed_at ? t.learning.completedAt : t.learning.startedAt} ${periodo}`
    : null

  const body = (
    <>
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-white/10 group-hover/book:border-purple-light/40 transition-colors book-spine">
        <Cover item={item} />

        <span className="absolute top-2 left-2 text-[10px] font-mono text-white bg-dark-900/75 backdrop-blur border border-white/10 px-2 py-0.5 rounded-full">
          {statusLabel(t, item)}
        </span>

        {hasProgress(item) && item.status !== 'finished' && (
          <span className="absolute bottom-0 left-0 right-0 h-1 bg-dark-900/70">
            <span
              className="block h-full bg-purple-light"
              style={{ width: `${Math.max(0, Math.min(100, item.progress))}%` }}
            />
          </span>
        )}
      </div>

      <h3 className="font-display text-sm font-semibold text-white leading-snug mt-3 line-clamp-2 group-hover/book:text-purple-light transition-colors">
        {item.title}
      </h3>

      {item.author && (
        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{item.author}</p>
      )}

      {item.publisher && (
        <p className="text-gray-600 text-[11px] mt-0.5 line-clamp-1">{item.publisher}</p>
      )}

      {dateLabel && (
        <p className="text-gray-600 text-[11px] font-mono mt-1">{dateLabel}</p>
      )}
    </>
  )

  if (item.external_url) {
    return (
      <a
        href={item.external_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/book block"
      >
        {body}
      </a>
    )
  }

  return <div className="group/book">{body}</div>
}

export default BookCard
