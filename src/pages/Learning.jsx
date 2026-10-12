import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import usePageMeta from '../hooks/usePageMeta'
import useLearningItems from '../hooks/useLearningItems'
import { groupItems, buildTimeline } from '../lib/learningFormat'
import LanguageToggle from '../components/ui/LanguageToggle'
import Footer from '../components/Footer'
import EmptyState from '../components/learning/EmptyState'
import LearningCard from '../components/learning/LearningCard'
import CurrentlyReading from '../components/learning/CurrentlyReading'
import RecentList from '../components/learning/RecentList'
import Bookshelf from '../components/learning/Bookshelf'
import ReadingList from '../components/learning/ReadingList'
import ProjectList from '../components/learning/ProjectList'
import Timeline from '../components/learning/Timeline'
import { curatedItems, mergeLearningItems, matchesLearning } from '../lib/learningContent'
import { JournalSection, LearningFilters, CertificationSection, LearningPathsSection, LearningActivitySection, LearningInsightsSection, journalCopy } from '../components/learning/LearningJournal'

function TopBar() {
  const { t } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
        <Link
          to="/"
          className="font-body text-sm text-gray-400 hover:text-purple-light transition-colors inline-flex items-center gap-2 min-w-0"
        >
          <span aria-hidden>←</span>
          <span className="truncate">{t.learning.backToHome}</span>
        </Link>
        <LanguageToggle />
      </div>
    </nav>
  )
}

function Learning() {
  const { t, lang } = useLanguage()
  const { items, loading, error, reload } = useLearningItems()
  const [filters, setFilters] = useState({ query: '', path: '', status: '' })
  const c = journalCopy[lang]

  usePageMeta({
    title: t.learning.metaTitle,
    description: t.learning.metaDescription,
  })

  const allItems = mergeLearningItems(curatedItems(lang), items)
  const visibleItems = allItems.filter(item => matchesLearning(item, filters, lang))
  const { current, recent, books, readings, projects, reading } = groupItems(visibleItems)
  // Only explicitly recorded dates (local content or admin records) enter this timeline.
  const timeline = buildTimeline(visibleItems)

  return (
    <>
      <TopBar />

      <main className="min-h-screen px-6 pt-28 pb-16">
        <div className="max-w-5xl mx-auto">
          <header className="mb-16 text-center" data-reveal>
            <h1 className="section-title text-3xl md:text-4xl mb-4">
              {t.learning.title} <span className="accent">{t.learning.titleAccent}</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              {t.learning.subtitle}
            </p>
          </header>

          <nav aria-label={c.navigation} className="learning-section-nav mb-8">
            {[[ 'current', t.learning.sections.current ], ['certifications', c.certifications], ['paths', c.paths], ['resources', t.learning.sections.bookshelf], ['practice', lang === 'pt' ? 'Conhecimento na prática' : 'Knowledge in practice'], ['activity', c.activity], ['insights', c.insights]].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <LearningFilters filters={filters} setFilters={setFilters} />
          {loading && <p role="status" className="text-xs text-gray-400 mb-8">{lang === 'pt' ? 'Carregando registros adicionais do diário…' : 'Loading additional journal records…'}</p>}
          {!loading && error && error !== 'notConfigured' && <div role="status" className="text-sm text-gray-400 mb-8">{lang === 'pt' ? 'Não foi possível carregar os registros do painel. O conteúdo local continua disponível.' : 'Could not load admin records. Local content is still available.'} <button type="button" className="learning-link" onClick={reload}>{t.learning.error.retry}</button></div>}

            <div className="space-y-20" aria-live="polite" aria-atomic="false">
              <JournalSection id="current" title={t.learning.sections.current} count={current.length}>
                {current.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {current.map((item) => (
                      <LearningCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message={c.empty} />
                )}

                {reading && (
                  <div className="mt-5">
                    <CurrentlyReading item={reading} />
                  </div>
                )}
              </JournalSection>

              <CertificationSection filters={filters} items={allItems} />
              <LearningPathsSection filters={filters} />

              <JournalSection id="resources" title={lang === 'pt' ? 'Livros & recursos' : 'Books & resources'} count={books.length + readings.length}>
                {books.length > 0 ? (
                  <Bookshelf items={books} />
                ) : (
                  readings.length === 0 && <EmptyState message={c.empty} />
                )}
                {readings.length > 0 && <div className={books.length ? 'mt-8' : ''}><ReadingList items={readings} /></div>}
              </JournalSection>

              {recent.length > 0 && (
                <JournalSection id="recent" title={t.learning.sections.recent} count={recent.length}>
                  <RecentList items={recent} />
                </JournalSection>
              )}

              <JournalSection id="practice" title={lang === 'pt' ? 'Conhecimento na prática' : 'Knowledge in practice'} count={projects.length}>
                {projects.length > 0 ? <ProjectList items={projects} /> : <EmptyState message={c.empty} />}
              </JournalSection>

              <LearningActivitySection filters={filters} />

              {timeline.length > 0 && (
                <JournalSection id="timeline" title={t.learning.sections.timeline}>
                  <Timeline groups={timeline} />
                </JournalSection>
              )}
              <LearningInsightsSection filters={filters} />
            </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Learning
