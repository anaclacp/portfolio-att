import { useLanguage } from '../i18n/LanguageContext'

function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl mb-12 text-center">
          {t.about.titleLead} <span className="accent">{t.about.titleAccent}</span>
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-purple-light/20 image-container">
              <img
                src="/images/eu.jpg"
                alt="Ana Clara"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-5 text-gray-300 font-body text-center md:text-left">
          <p className="text-base md:text-lg leading-relaxed">
            {t.about.p1Before}
            <span className="text-purple-light">{t.about.p1Highlight1}</span>
            {t.about.p1Middle}
            <span className="text-purple-light">{t.about.p1Highlight2}</span>
            {t.about.p1After}
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            {t.about.p2}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-400">
            {t.about.p3Before}
            <span className="text-purple-light">{t.about.p3Highlight}</span>
            {t.about.p3After}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-400">
            {t.about.p4}
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
