import test from 'node:test'
import assert from 'node:assert/strict'
import { curatedItems, mergeLearningItems, matchesLearning, milestoneProgress } from '../src/lib/learningContent.js'
import { certifications, learningPaths, learningEntries, learningResources, currentLearning, studyInsights, practicalProjects } from '../src/data/learning.ts'
import { buildTimeline } from '../src/lib/learningFormat.js'

test('content never presents preparation as a credential or invents dated activity', () => {
  assert.equal(certifications[0].status, 'preparing')
  assert.equal(certifications[0].credentialUrl, undefined)
  assert.equal(certifications[0].completedAt, undefined)
  assert.deepEqual(learningEntries, [])
  assert.equal(buildTimeline(curatedItems('pt'))[0].key, '2026-10')
  assert.ok(currentLearning.every(item => item.startedAt === '2026-10-07'))
  assert.ok(curatedItems('pt').every(item => item.completed_at === undefined))
  assert.ok(curatedItems('en').every(item => item.progress === undefined))
  assert.equal(learningResources.filter(item => item.status === 'completed').length, 4)
})

test('admin values override defaults and known edition variants without losing path references', () => {
  const merged = mergeLearningItems(curatedItems('pt'), [
    { id: 21, title: 'AI Agents in Action', type: 'book', status: 'finished', progress: 100 },
    { id: 22, title: 'Claude Certified Architect - Professional', type: 'certification', status: 'planned' },
    { id: 23, title: 'Personal research', type: 'research', status: 'studying' },
    { id: 24, title: 'Entendendo Algoritmos', type: 'book', status: 'finished' },
    { id: 25, title: 'Responsible AI', type: 'study', status: 'studying', started_at: '2026-09-01' },
  ])
  assert.equal(merged.filter(item => item.type === 'book').length, 5)
  assert.equal(merged.filter(item => item.type === 'certification').length, 1)
  assert.equal(merged.find(item => item.id === 21).status, 'finished')
  assert.deepEqual(merged.find(item => item.id === 21).pathIds, ['claude-agents', 'ai-engineering'])
  assert.ok(merged.some(item => item.id === 23))
  assert.equal(merged.filter(item => item.title.startsWith('Responsible AI')).length, 1)
  assert.equal(merged.find(item => item.id === 25).started_at, '2026-10-07')
})

test('search is accent-insensitive and combines path and normalized status', () => {
  const items = curatedItems('pt')
  assert.ok(items.some(item => matchesLearning(item, { query: 'governanca', path: 'responsible-ai', status: 'in_progress' }, 'pt')))
  assert.equal(items.filter(item => matchesLearning(item, { status: 'completed' }, 'en')).length, 4)
  assert.equal(items.filter(item => matchesLearning(item, { query: 'no-such-topic' }, 'en')).length, 0)
  assert.equal(items.filter(item => matchesLearning(item, { path: 'responsible-ai', status: 'completed' }, 'pt')).length, 0)
})

test('progress derives only from completed milestones, including an empty path', () => {
  assert.deepEqual(milestoneProgress([]), { completed: 0, total: 0, percent: 0 })
  assert.deepEqual(milestoneProgress([{ status: 'completed' }, { status: 'learning' }, { status: 'not_started' }]), { completed: 1, total: 3, percent: 33 })
  assert.ok(learningPaths.every(path => milestoneProgress(path.topics).completed === 0))
})

test('all shared path references exist and content IDs are unique', () => {
  const ids = new Set(learningPaths.map(path => path.id))
  const content = [...currentLearning, ...certifications, ...learningResources, ...practicalProjects, ...studyInsights, ...learningEntries]
  assert.equal(new Set(content.map(item => item.id)).size, content.length)
  for (const item of content) for (const id of item.pathIds) assert.ok(ids.has(id), `${item.id}: unknown path ${id}`)
  for (const item of currentLearning) if (item.certificationId) assert.ok(certifications.some(cert => cert.id === item.certificationId))
})
