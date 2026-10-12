import { certifications, learningPaths, learningEntries, studyInsights } from '../../data/learning'
import { matchesLearning, milestoneProgress, normalizeTitle } from '../../lib/learningContent'
import { formatMonthYear, formatLearningDate } from '../../lib/learningFormat'
import { useLanguage } from '../../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import EmptyState from './EmptyState'
import Tags from './Tags'
import ProgressBar from './ProgressBar'

export const journalCopy = {
  pt: { certifications: 'Certificações', paths: 'Trilhas de aprendizagem', activity: 'Atividade de estudo', insights: 'Aprendizados',
    preparing: 'Em preparação', planned: 'Planejada', earned: 'Obtida', notEarned: 'Em preparação para o exame. Certificação ainda não obtida.',
    official: 'Informações oficiais', credential: 'Ver credencial', milestones: 'Checklist de preparação',
    completed: 'concluídos', untracked: 'Progresso por tópico ainda não registrado.', not_started: 'Não iniciado', learning: 'Estudando', done: 'Concluído',
    empty: 'Nenhum resultado para os filtros selecionados.', emptyActivity: 'As próximas atividades aparecerão aqui quando houver uma data de estudo registrada.',
    resource: 'Recurso', search: 'Buscar estudos, livros e aprendizados', category: 'Trilha', all: 'Todas as trilhas', status: 'Status', allStatus: 'Todos os status',
    inProgress: 'Em andamento', finished: 'Concluído', upcoming: 'Planejado', reset: 'Limpar filtros', navigation: 'Seções do Learning Log',
    reading: 'Leitura', course: 'Curso', practice: 'Prática', project: 'Projeto', research: 'Pesquisa', certification: 'Certificação' },
  en: { certifications: 'Certifications', paths: 'Learning paths', activity: 'Study activity', insights: 'Key takeaways',
    preparing: 'Preparing', planned: 'Planned', earned: 'Earned', notEarned: 'Preparing for the exam. This certification has not been earned yet.',
    official: 'Official information', credential: 'View credential', milestones: 'Preparation checklist',
    completed: 'completed', untracked: 'Topic progress has not been recorded yet.', not_started: 'Not started', learning: 'Learning', done: 'Completed',
    empty: 'No results for the selected filters.', emptyActivity: 'Future activities will appear here once an actual study date is recorded.',
    resource: 'Resource', search: 'Search studies, books and takeaways', category: 'Path', all: 'All paths', status: 'Status', allStatus: 'All statuses',
    inProgress: 'In progress', finished: 'Completed', upcoming: 'Planned', reset: 'Clear filters', navigation: 'Learning Log sections',
    reading: 'Reading', course: 'Course', practice: 'Practice', project: 'Project', research: 'Research', certification: 'Certification' },
}

export function JournalSection({ id, title, count, children }) {
  return <section id={id} className="learning-section" aria-labelledby={`${id}-heading`}>
    <div id={`${id}-heading`} data-reveal><SectionHeading count={count}>{title}</SectionHeading></div>
    <div data-reveal style={{ '--reveal-delay': '90ms' }}>{children}</div>
  </section>
}

function ExternalLink({ href, children }) {
  if (!href) return null
  return <a href={href} target="_blank" rel="noopener noreferrer" className="learning-link">{children} <span aria-hidden>↗</span></a>
}

function Milestones({ topics, title, c }) {
  const progress = milestoneProgress(topics)
  return <div className="mt-5">
    <p className="text-xs text-gray-400 mb-3">{progress.completed} / {progress.total} {c.completed}</p>
    {progress.total > 0 && <ProgressBar value={progress.percent} label={title} />}
    <ul className="learning-milestones mt-4">
      {topics.map(topic => <li key={topic.id}>
        <span aria-hidden className={`learning-topic-dot ${topic.status}`}>{topic.status === 'completed' ? '✓' : ''}</span>
        <span className="min-w-0">{topic.title}</span>
        <span className="learning-topic-status">{topic.status === 'completed' ? c.done : c[topic.status]}</span>
      </li>)}
    </ul>
    {topics.length > 0 && topics.every(topic => topic.status === 'not_started') && <p className="text-xs text-gray-500 mt-4">{c.untracked}</p>}
  </div>
}

export function LearningFilters({ filters, setFilters }) {
  const { lang } = useLanguage()
  const c = journalCopy[lang]
  const update = event => setFilters(current => ({ ...current, [event.target.name]: event.target.value }))
  return <div className="learning-filters mb-12" role="search" aria-label={c.search}>
    <label className="learning-search"><span className="admin-label">{c.search}</span>
      <input type="search" name="query" value={filters.query} onChange={update} className="admin-field" placeholder={lang === 'pt' ? 'MCP, governança, agentes…' : 'MCP, governance, agents…'} />
    </label>
    <label><span className="admin-label">{c.category}</span><select name="path" value={filters.path} onChange={update} className="admin-field">
      <option value="">{c.all}</option>{learningPaths.map(path => <option key={path.id} value={path.id}>{path.title}</option>)}
    </select></label>
    <label><span className="admin-label">{c.status}</span><select name="status" value={filters.status} onChange={update} className="admin-field">
      <option value="">{c.allStatus}</option><option value="in_progress">{c.inProgress}</option><option value="completed">{c.finished}</option><option value="planned">{c.upcoming}</option>
    </select></label>
    {(filters.query || filters.path || filters.status) && <button type="button" className="learning-link learning-reset" onClick={() => setFilters({ query: '', path: '', status: '' })}>{c.reset}</button>}
  </div>
}

export function CertificationSection({ filters, items }) {
  const { lang } = useLanguage()
  const c = journalCopy[lang]
  // Include certifications created in the existing admin, keeping their current state authoritative.
  const records = items.filter(item => item.type === 'certification').map(item => {
    const detail = certifications.find(cert => normalizeTitle(cert.title) === normalizeTitle(item.title))
    return { ...detail, ...item, provider: item.author || detail?.provider,
      status: ['completed', 'earned'].includes(item.status) ? 'earned' : item.status === 'planned' ? 'planned' : 'preparing',
      officialUrl: detail?.officialUrl || item.external_url, credentialUrl: detail?.credentialUrl,
      topics: item.tags || detail?.topics || [], milestones: detail?.milestones || [], completedAt: item.completed_at, startedAt: item.started_at }
  }).filter(item => matchesLearning(item, filters, lang))
  return <JournalSection id="certifications" title={c.certifications} count={records.length}>
    {records.length ? <div className="grid md:grid-cols-2 gap-5">{records.map(cert => <article key={cert.id} className="card-soft rounded-2xl p-6 learning-certification">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3"><p className="text-xs text-gray-400">{cert.provider}</p><span className="learning-status">{c[cert.status]}</span></div>
      <h3 className="font-display text-lg font-semibold text-white mb-3">{cert.title}</h3>
      {cert.status !== 'earned' && <p className="text-sm text-gray-400 mb-4">{cert.status === 'preparing' ? c.notEarned : (lang === 'pt' ? 'Certificação planejada. Ainda não obtida.' : 'Planned certification. Not yet earned.')}</p>}
      {cert.startedAt && <p className="text-xs text-gray-400 mb-3">{formatLearningDate(cert.startedAt, lang)}{cert.status === 'preparing' && ` — ${lang === 'pt' ? 'atual' : 'present'}`}</p>}
      {cert.status === 'earned' && cert.completedAt && <p className="text-xs text-gray-400 mb-3">{c.done}: {formatMonthYear(cert.completedAt, lang)}</p>}
      <Tags items={cert.topics} className="mb-4" />
      {cert.notes && <p className="learning-personal-note mb-4">{typeof cert.notes === 'string' ? cert.notes : cert.notes[lang]}</p>}
      <div className="flex flex-wrap gap-4"><ExternalLink href={cert.officialUrl}>{c.official}</ExternalLink>{cert.status === 'earned' && <ExternalLink href={cert.credentialUrl}>{c.credential}</ExternalLink>}</div>
      {cert.milestones.length > 0 && <details className="learning-details mt-5"><summary>{c.milestones}</summary><Milestones topics={cert.milestones} title={cert.title} c={c} /></details>}
    </article>)}</div> : <EmptyState message={c.empty} />}
  </JournalSection>
}

export function LearningPathsSection({ filters }) {
  const { lang } = useLanguage()
  const c = journalCopy[lang]
  const paths = learningPaths.filter(path => {
    const progress = milestoneProgress(path.topics)
    const status = progress.total > 0 && progress.completed === progress.total ? 'completed' : path.topics.some(topic => topic.status !== 'not_started') ? 'in_progress' : 'planned'
    return matchesLearning({ ...path, status }, filters, lang)
  })
  return <JournalSection id="paths" title={c.paths} count={paths.length}>
    {paths.length ? <div className="grid lg:grid-cols-3 gap-5">{paths.map(path => <article key={path.id} id={`path-${path.id}`} className="card-soft rounded-2xl p-6 learning-section">
      <h3 className="font-display text-base font-semibold text-white mb-2">{path.title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{path.description[lang]}</p>
      <Milestones topics={path.topics} title={path.title} c={c} />
    </article>)}</div> : <EmptyState message={c.empty} />}
  </JournalSection>
}

export function LearningActivitySection({ filters }) {
  const { lang } = useLanguage()
  const c = journalCopy[lang]
  const entries = [...learningEntries].filter(entry => matchesLearning(entry, { ...filters, status: '' }, lang)).sort((a, b) => b.date.localeCompare(a.date))
  return <JournalSection id="activity" title={c.activity} count={entries.length}>
    {entries.length ? <ol className="learning-activity">{entries.map(entry => <li key={entry.id}>
      <time dateTime={entry.date} className="font-mono text-xs text-purple-light">{new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${entry.date}T00:00:00Z`))}</time>
      <p className="text-xs text-gray-400 mt-2">{c[entry.type]}</p><h3 className="text-white font-display mt-1">{entry.title}</h3>
      {entry.description && <p className="text-sm text-gray-400 mt-2">{entry.description[lang]}</p>}
      <div className="flex flex-wrap gap-3 mt-3">{entry.pathIds.map(id => <a key={id} className="learning-link" href="#paths">{learningPaths.find(path => path.id === id)?.title}</a>)}<ExternalLink href={entry.resourceUrl}>{c.resource}</ExternalLink><ExternalLink href={entry.githubUrl}>GitHub</ExternalLink></div>
    </li>)}</ol> : <EmptyState message={learningEntries.length ? c.empty : c.emptyActivity} />}
  </JournalSection>
}

export function LearningInsightsSection({ filters }) {
  const { lang } = useLanguage()
  const c = journalCopy[lang]
  const insights = studyInsights.filter(item => matchesLearning(item, { ...filters, status: '' }, lang))
  return <JournalSection id="insights" title={c.insights} count={insights.length}>
    {insights.length ? <ul className="grid md:grid-cols-2 gap-x-10 gap-y-6">{insights.map(insight => <li key={insight.id} className="learning-insight">
      <p className="font-mono text-[11px] text-purple-light mb-2">{insight.category}</p>
      <p className="text-gray-300 text-sm leading-relaxed">{insight.text[lang]}</p>
      <div className="flex flex-wrap gap-3 mt-2">{insight.pathIds.map(id => <a key={id} href="#paths" className="learning-link">{learningPaths.find(path => path.id === id)?.title}</a>)}</div>
    </li>)}</ul> : <EmptyState message={c.empty} />}
  </JournalSection>
}
