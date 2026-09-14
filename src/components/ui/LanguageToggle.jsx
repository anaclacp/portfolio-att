import { useLanguage } from '../../i18n/LanguageContext'
import { languages } from '../../i18n/translations'

function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage()

  const next = languages.find((option) => option.code !== lang)

  return (
    <button
      type="button"
      className="lang-toggle"
      data-lang={lang}
      onClick={toggleLang}
      aria-label={`${t.nav.switchTo} ${next.full}`}
    >
      <span className="lang-thumb" aria-hidden />
      {languages.map((option) => (
        <span
          key={option.code}
          className={`lang-option ${lang === option.code ? 'is-active' : ''}`}
        >
          {option.label}
        </span>
      ))}
    </button>
  )
}

export default LanguageToggle
