import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import usePageMeta from '../hooks/usePageMeta'
import useLearningItems from '../hooks/useLearningItems'
import { groupItems, buildTimeline } from '../lib/learningFormat'
import LanguageToggle from '../components/ui/LanguageToggle'
import Footer from '../components/Footer'
import SectionHeading from '../components/learning/SectionHeading'
import EmptyState from '../components/learning/EmptyState'
import LearningCard from '../components/learning/LearningCard'
import CurrentlyReading from '../components/learning/CurrentlyReading'
import RecentList from '../components/learning/RecentList'
import Bookshelf from '../components/learning/Bookshelf'
import ReadingList from '../components/learning/ReadingList'
import ProjectList from '../components/learning/ProjectList'
import Timeline from '../components/learning/Timeline'

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

/** Esqueleto durante o carregamento, no lugar de um spinner solto. */
function LoadingSkeleton() {
  return (
    <div className="space-y-4" aria-hidden>
      {[0, 1].map((i) => (
        <div key={i} className="card-soft rounded-2xl p-6">
          <div className="h-4 w-1/3 bg-white/8 rounded mb-4 animate-pulse" />
          <div className="h-3 w-2/3 bg-white/5 rounded mb-2 animate-pulse" />
          <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function ErrorState({ kind, onRetry }) {
  const { t } = useLanguage()

  return (
    <div className="card-soft rounded-2xl p-8 text-center">
      <p className="font-display text-base font-semibold text-white mb-2">
        {t.learning.error.title}
      </p>
      {kind === 'notConfigured' && (
        <p className="text-gray-400 text-sm mb-5">{t.learning.error.notConfigured}</p>
      )}
      {kind !== 'notConfigured' && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-ghost px-5 py-2 rounded-full text-sm font-medium"
        >
          {t.learning.error.retry}
        </button>
      )}
    </div>
  )
}

/** Renderiza a seção só quando há o que mostrar, sem deixar bloco vazio. */
function Section({ title, count, children }) {
  return (
    <section>
      <div data-reveal>
        <SectionHeading count={count}>{title}</SectionHeading>
      </div>
      <div data-reveal style={{ '--reveal-delay': '90ms' }}>{children}</div>
    </section>
  )
}

function Learning() {
  const { t } = useLanguage()
  const { items, loading, error, reload } = useLearningItems()

  usePageMeta({
    title: t.learning.metaTitle,
    description: t.learning.metaDescription,
  })

  const { current, recent, books, readings, projects, reading } = groupItems(items)
  const timeline = buildTimeline(items)
  const isEmpty = !loading && !error && items.length === 0

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

          {loading && <LoadingSkeleton />}
          {!loading && error && <ErrorState kind={error} onRetry={reload} />}
          {isEmpty && <EmptyState message={t.learning.empty.all} />}

          {!loading && !error && !isEmpty && (
            <div className="space-y-20">
              <Section title={t.learning.sections.current} count={current.length}>
                {current.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-5">
                    {current.map((item) => (
                      <LearningCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message={t.learning.empty.current} />
                )}

                {reading && (
                  <div className="mt-5">
                    <CurrentlyReading item={reading} />
                  </div>
                )}
              </Section>

              <Section title={t.learning.sections.bookshelf} count={books.length}>
                {books.length > 0 ? (
                  <Bookshelf items={books} />
                ) : (
                  <EmptyState message={t.learning.empty.bookshelf} />
                )}
              </Section>

              {readings.length > 0 && (
                <Section title={t.learning.sections.readings} count={readings.length}>
                  <ReadingList items={readings} />
                </Section>
              )}

              {recent.length > 0 && (
                <Section title={t.learning.sections.recent} count={recent.length}>
                  <RecentList items={recent} />
                </Section>
              )}

              {projects.length > 0 && (
                <Section title={t.learning.sections.projects} count={projects.length}>
                  <ProjectList items={projects} />
                </Section>
              )}

              {timeline.length > 0 && (
                <Section title={t.learning.sections.timeline}>
                  <Timeline groups={timeline} />
                </Section>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Learning
