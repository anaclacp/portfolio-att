import { currentLearning, certifications, learningResources, practicalProjects } from '../data/learning.ts'

export function normalizeTitle(title = '') {
  return title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ').trim()
}

// Match known edition/title variants without collapsing unrelated resources.
function identity(item) {
  const title = normalizeTitle(item.title)
  if (item.type === 'book' && title.startsWith('ai agents in action')) return 'book:ai agents in action'
  if (item.type === 'book' && title.startsWith('hands on machine learning')) return 'book:hands on machine learning'
  if (item.type === 'book' && ['entendendo algoritmos', 'grokking algorithms'].includes(title)) return 'book:grokking algorithms'
  if (item.type === 'study' && ['responsible ai', 'responsible ai ai governance'].includes(title)) return 'study:responsible ai'
  if (item.type === 'project' && item.repository_url) return `project:${item.repository_url.replace(/\/$/, '').toLowerCase()}`
  return `${item.type}:${title}`
}

export function curatedItems(lang) {
  return [
    ...currentLearning.filter(item => !item.certificationId).map(item => ({ ...item, type: 'study',
      description: item.description?.[lang], tags: item.topics,
      started_at: item.startedAt, external_url: item.resources[0]?.url, resources: item.resources, notes: item.notes?.[lang] })),
    ...certifications.map(cert => {
      const study = currentLearning.find(item => item.certificationId === cert.id)
      return { ...study, ...cert, type: 'certification', status: cert.status === 'preparing' ? 'in_progress' : cert.status === 'earned' ? 'completed' : 'planned',
        author: cert.provider, description: (study?.description || cert.description)?.[lang], tags: cert.topics,
        started_at: cert.startedAt, completed_at: cert.completedAt, external_url: cert.officialUrl, resources: study?.resources, notes: cert.notes?.[lang] }
    }),
    ...learningResources.map(item => ({ ...item, status: item.status === 'completed' ? 'finished' : item.status === 'in_progress' ? 'reading' : 'planned',
      description: item.description?.[lang], tags: item.topics, started_at: item.startedAt, completed_at: item.completedAt, external_url: item.externalUrl, cover_url: item.coverUrl, notes: item.notes?.[lang] })),
    ...practicalProjects.map(item => ({ ...item, type: 'project', description: item.description?.[lang], tags: [...item.technologies, ...item.topics],
      repository_url: item.githubUrl, notes: item.notes?.[lang] })),
  ]
}

/** Live admin records override matching curated values; never write defaults to the database. */
export function mergeLearningItems(defaults, liveItems) {
  const result = new Map(defaults.map(item => [identity(item), item]))
  for (const item of liveItems) {
    const key = identity(item)
    const existing = result.get(key)
    result.set(key, { ...existing, ...item, pathIds: item.pathIds ?? existing?.pathIds ?? [],
      // A study date explicitly supplied for this local update takes precedence over older records.
      started_at: existing?.startedAt ?? item.started_at })
  }
  return [...result.values()]
}

export function normalizedStatus(status) {
  if (['completed', 'finished', 'read', 'explored', 'earned'].includes(status)) return 'completed'
  if (['studying', 'reading', 'in_progress', 'learning', 'preparing'].includes(status)) return 'in_progress'
  if (['planned', 'saved', 'not_started'].includes(status)) return 'planned'
  return status
}

export function matchesLearning(item, { query = '', path = '', status = '' }, lang) {
  const localized = value => typeof value === 'string' ? value : value?.[lang] || ''
  const haystack = normalizeTitle([item.title, item.author, item.provider, item.category, localized(item.description), localized(item.text), localized(item.notes),
    ...(item.tags || item.topics?.map(topic => typeof topic === 'string' ? topic : topic.title) || []), ...(item.technologies || [])].join(' '))
  return (!query || haystack.includes(normalizeTitle(query))) && (!path || item.pathIds?.includes(path) || item.id === path) &&
    (!status || normalizedStatus(item.status) === status)
}

export function milestoneProgress(topics) {
  const completed = topics.filter(topic => topic.status === 'completed').length
  return { completed, total: topics.length, percent: topics.length ? Math.round(completed / topics.length * 100) : 0 }
}
