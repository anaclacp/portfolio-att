import { useLanguage } from '../../i18n/LanguageContext'
import { hasProgress } from '../../lib/learningFormat'

/**
 * Linha discreta dentro de "Atualmente estudando" apontando a leitura em curso.
 * O livro já tem card próprio na estante; aqui ele é só uma referência, para
 * ligar a leitura aos assuntos sem duplicar o card inteiro.
 */
function CurrentlyReading({ item }) {
  const { t } = useLanguage()
  if (!item) return null

  return (
    <p className="flex items-center gap-2.5 text-sm text-gray-400 flex-wrap">
      <span aria-hidden>📖</span>
      <span className="text-gray-500">{t.learning.currentlyReading}:</span>
      <span className="text-white font-medium">{item.title}</span>
      {item.author && <span className="text-gray-600 text-xs">· {item.author}</span>}
      {hasProgress(item) && (
        <span className="font-mono text-xs text-purple-light">{item.progress}%</span>
      )}
    </p>
  )
}

export default CurrentlyReading
