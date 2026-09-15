import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

/**
 * CTA do Learning Log, logo abaixo do "Sobre mim".
 *
 * É o único bloco da home com tratamento lavanda próprio (ver .learning-cta):
 * os demais cards usam a superfície neutra, então este se destaca por contraste
 * de tratamento, sem precisar gritar em tamanho ou cor saturada.
 */
function LearningCTA() {
  const { t } = useLanguage()

  return (
    // Margem negativa puxa o CTA para perto do "Sobre mim": o About fecha com
    // py-32 e sem isso o bloco pareceria solto entre duas seções.
    <div className="max-w-3xl mx-auto px-6 pb-8 -mt-16 md:-mt-20" data-reveal>
      <Link to="/learning" className="learning-cta group">
        <span className="cta-icon w-11 h-11 rounded-xl bg-purple-light/15 border border-purple-light/25 text-purple-light flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
        </span>

        <span className="flex-1 min-w-0">
          <span className="block font-display text-base md:text-lg font-semibold text-white group-hover:text-purple-light transition-colors">
            {t.learning.cta}
          </span>
          <span className="block text-gray-400 text-xs md:text-sm mt-1">
            {t.learning.ctaHint}
          </span>
        </span>

        {/* SVG em vez do caractere "→": o glyph carrega a caixa de linha junto
            (ascendente/descendente) e o flex acaba centralizando a linha, não o
            desenho, o que deixa a seta visivelmente torta dentro do disco. */}
        <span className="cta-arrow text-purple-light shrink-0" aria-hidden>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </Link>
    </div>
  )
}

export default LearningCTA
