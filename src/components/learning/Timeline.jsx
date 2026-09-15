import { useLanguage } from '../../i18n/LanguageContext'
import { formatMonthYear } from '../../lib/learningFormat'
import { statusLabel } from '../../lib/learningLabels'

/**
 * Faixa de evolução: itens agrupados por mês, do mais recente para o mais
 * antigo. Usa started_at/completed_at, sem coluna nova nem redesenho: é uma
 * leitura diferente dos mesmos dados que as seções acima já mostram.
 */
function Timeline({ groups }) {
  const { t, lang } = useLanguage()

  return (
    <ol className="space-y-8">
      {groups.map((group) => (
        <li key={group.key} className="grid md:grid-cols-[110px_1fr] gap-3 md:gap-6">
          <div className="md:text-right md:pt-0.5">
            <span className="font-mono text-xs text-purple-light uppercase tracking-wider">
              {formatMonthYear(group.date, lang)}
            </span>
          </div>

          <ul className="space-y-2 border-l border-white/8 pl-5 md:pl-6">
            {group.items.map((item) => (
              <li key={item.id} className="relative">
                <span className="absolute -left-[1.55rem] md:-left-[1.8rem] top-2 w-1.5 h-1.5 rounded-full bg-purple-light/60" />
                <span className="text-sm text-white">{item.title}</span>
                <span className="text-gray-600 text-xs"> · {statusLabel(t, item)}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

export default Timeline
