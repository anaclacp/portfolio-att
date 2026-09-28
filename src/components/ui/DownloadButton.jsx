import { useLanguage } from '../../i18n/LanguageContext'

/** O CV acompanha o idioma do site: public/cv-pt.pdf ou public/cv-en.pdf. */
function DownloadButton({ onClick }) {
  const { lang, t } = useLanguage()

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
  }

  return (
    <a
      href={`/cv-${lang}.pdf`}
      className="download-btn"
      onClick={handleClick}
      download={`Ana_Clara_Pereira_CV_${lang.toUpperCase()}.pdf`}
      title={t.nav.downloadCvHint}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="icon-wrapper">
        <svg className="arrow" viewBox="0 0 24 24">
          <path d="M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span>{t.nav.downloadCv}</span>
    </a>
  )
}

export default DownloadButton
