export type LocalizedText = { pt: string; en: string }
export type PathId = 'claude-agents' | 'responsible-ai' | 'ai-engineering'
export type TopicStatus = 'not_started' | 'learning' | 'completed'
export type LearningStatus = 'in_progress' | 'completed' | 'planned'
export interface RelatedContent {
  id: string
  title: string
  description?: LocalizedText
  pathIds: PathId[]
  topics: string[]
  notes?: LocalizedText
  startedAt?: string
}
export interface LearningEntry extends RelatedContent {
  date: string
  type: 'reading' | 'course' | 'practice' | 'project' | 'research' | 'certification'
  resourceUrl?: string
  githubUrl?: string
}
export interface LearningTopic { id: string; title: string; status: TopicStatus }
export interface LearningPath {
  id: PathId
  title: string
  description: LocalizedText
  topics: LearningTopic[]
}
interface CertificationDetails extends RelatedContent {
  provider: string
  officialUrl: string
  milestones: LearningTopic[]
}
export type Certification = CertificationDetails & (
  | { status: 'planned' | 'preparing'; completedAt?: never; credentialUrl?: never }
  | { status: 'earned'; completedAt: string; credentialUrl?: string }
)
export interface LearningResource extends RelatedContent {
  author: string
  type: 'book' | 'docs' | 'article' | 'course' | 'paper'
  status: LearningStatus
  externalUrl?: string
  coverUrl?: string
  completedAt?: string
  progress?: number
}
export interface StudyInsight extends RelatedContent { category: string; text: LocalizedText }
export interface PracticalProject extends RelatedContent {
  technologies: string[]
  githubUrl: string
  status: LearningStatus
}
export interface CurrentLearning extends RelatedContent {
  category: string
  status: LearningStatus | 'preparing'
  certificationId?: string
  resources: { title: string; url: string }[]
  progress?: number
}

const text = (pt: string, en: string): LocalizedText => ({ pt, en })
// Record only verified milestones here, e.g. 'claude-1': 'learning'.
export const topicStatuses: Record<string, TopicStatus> = {}
const topicList = (prefix: string, titles: string[]): LearningTopic[] =>
  titles.map((title, index) => {
    const id = `${prefix}-${index + 1}`
    return { id, title, status: topicStatuses[id] ?? 'not_started' }
  })

// No topic-level completion has been reported. Update statuses only from actual study records.
export const learningPaths: LearningPath[] = [
  { id: 'claude-agents', title: 'Claude & Agent Engineering',
    description: text('Da API à arquitetura de agentes em produção.', 'From the API to production agent architecture.'),
    topics: topicList('claude', ['Claude API', 'Tool Use', 'Structured Outputs', 'Claude Agent SDK', 'Hooks and Permissions', 'MCP Integration', 'Multi-Agent Orchestration', 'Context Management', 'Deployment and Production Patterns']) },
  { id: 'responsible-ai', title: 'Responsible AI',
    description: text('Sistemas de IA seguros, responsáveis e supervisionados.', 'Safe, responsible AI systems with human oversight.'),
    topics: topicList('responsible', ['AI Governance', 'Risk Assessment', 'AI Safety', 'Prompt Injection', 'OWASP LLM Top 10', 'OWASP Agentic Security', 'Human-in-the-Loop', 'Least Privilege and Least Agency', 'AI Evaluation and Monitoring']) },
  { id: 'ai-engineering', title: 'AI Engineering',
    description: text('Do conhecimento teórico a sistemas confiáveis.', 'From theoretical knowledge to reliable systems.'),
    topics: topicList('engineering', ['RAG and Retrieval', 'Embeddings and Reranking', 'LLM Evaluation', 'Agentic Workflows', 'Model Optimization', 'Observability', 'Production AI Systems']) },
]

export const certifications: Certification[] = [{
  id: 'claude-architect', title: 'Claude Certified Architect – Professional', provider: 'Anthropic',
  startedAt: '2026-10-07',
  status: 'preparing', officialUrl: 'https://www.credly.com/org/anthropic/badge/claude-certified-architect-professional',
  pathIds: ['claude-agents'], topics: ['Claude API', 'Agent SDK', 'Tool Use', 'MCP', 'Hooks', 'Multi-Agent Orchestration', 'Context Management', 'Evaluation', 'Production Architecture'],
  milestones: topicList('cert', ['Review certification requirements', 'Study API and agent architecture', 'Practice integrations and evaluation', 'Review governance and production patterns']),
}]

export const currentLearning: CurrentLearning[] = [
  { id: 'claude-preparation', title: certifications[0].title, category: 'Claude & Agent Engineering', status: 'preparing',
    startedAt: '2026-10-07',
    certificationId: 'claude-architect', pathIds: ['claude-agents'], topics: certifications[0].topics,
    description: text('Preparação para a certificação da Anthropic, com foco em arquitetura, integração e avaliação de agentes.', 'Preparing for the Anthropic certification, focusing on agent architecture, integration and evaluation.'),
    resources: [{ title: 'Claude Docs', url: 'https://platform.claude.com/docs/en/home' }] },
  { id: 'responsible-study', title: 'Responsible AI & AI Governance', category: 'Responsible AI', status: 'in_progress', pathIds: ['responsible-ai'],
    startedAt: '2026-10-07',
    topics: ['Risk Assessment', 'AI Governance', 'Guardrails', 'Human Oversight', 'AI Evaluations', 'NIST AI RMF', 'OWASP'],
    description: text('Governança, avaliação de riscos e supervisão humana ao longo do ciclo de vida de sistemas de IA.', 'Governance, risk assessment and human oversight throughout the AI system lifecycle.'),
    resources: [{ title: 'NIST AI RMF', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }, { title: 'OWASP GenAI', url: 'https://genai.owasp.org/' }] },
  { id: 'agents-study', title: 'AI Agents & Agentic Systems', category: 'Claude & Agent Engineering', status: 'in_progress', pathIds: ['claude-agents', 'ai-engineering'],
    startedAt: '2026-10-07',
    topics: ['Agent Architecture', 'Multi-Agent Systems', 'Orchestration', 'MCP', 'Tool Calling', 'Memory', 'Observability'],
    description: text('Arquitetura e orquestração de agentes, integração de ferramentas, memória e observabilidade.', 'Agent architecture and orchestration, tool integration, memory and observability.'),
    resources: [{ title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/docs/getting-started/intro' }] },
]

export const learningResources: LearningResource[] = [
  { id: 'book-ai-engineering', title: 'AI Engineering', author: 'Chip Huyen', type: 'book', status: 'completed', pathIds: ['ai-engineering'], topics: ['AI Engineering'], coverUrl: '/images/covers/ai-engineering.jpg', externalUrl: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/' },
  { id: 'book-agents', title: 'AI Agents in Action, Second Edition', author: 'Micheal Lanham', type: 'book', status: 'in_progress', pathIds: ['claude-agents', 'ai-engineering'], topics: ['AI Agents', 'Agentic Workflows'], coverUrl: '/images/covers/ai-agents-in-action.jpg', externalUrl: 'https://www.manning.com/books/ai-agents-in-action-second-edition' },
  { id: 'book-ml', title: 'Hands-On Machine Learning', author: 'Aurélien Géron', type: 'book', status: 'completed', pathIds: ['ai-engineering'], topics: ['Machine Learning'], coverUrl: '/images/covers/hands-on-ml.jpg' },
  { id: 'book-clean-code', title: 'Clean Code', author: 'Robert C. Martin', type: 'book', status: 'completed', pathIds: ['ai-engineering'], topics: ['Software Engineering'], coverUrl: '/images/covers/clean-code.jpg' },
  { id: 'book-algorithms', title: 'Grokking Algorithms', author: 'Aditya Bhargava', type: 'book', status: 'completed', pathIds: ['ai-engineering'], topics: ['Algorithms'], coverUrl: '/images/covers/entendendo-algoritmos.jpg' },
]

export const practicalProjects: PracticalProject[] = [{
  id: 'agents-notes', title: 'AI Agents in Action — Study Notes', status: 'in_progress',
  description: text('Repositório de estudo que conecta a leitura de AI Agents in Action à prática.', 'A study repository connecting AI Agents in Action reading with practice.'),
  technologies: [], pathIds: ['claude-agents', 'ai-engineering'], topics: ['AI Agents', 'Agentic Workflows'],
  githubUrl: 'https://github.com/anaclacp/ai-agents-in-action',
}]

export const studyInsights: StudyInsight[] = [
  { id: 'agency', title: 'Agency', category: 'Agent Architecture', pathIds: ['claude-agents'], topics: ['AI Agents'], text: text('Encadear ferramentas não torna um sistema necessariamente um agente autônomo.', 'Tool chaining does not necessarily make a system an autonomous agent.') },
  { id: 'oversight', title: 'Human oversight', category: 'Responsible AI', pathIds: ['responsible-ai'], topics: ['Human Oversight'], text: text('A supervisão humana deve ser proporcional ao risco de uma ação.', 'Human oversight should be proportional to the risk of an action.') },
  { id: 'permissions', title: 'Permissions', category: 'Agent Security', pathIds: ['responsible-ai', 'claude-agents'], topics: ['Least Privilege'], text: text('As permissões de agentes devem seguir o princípio do menor privilégio.', 'Agent permissions should follow the principle of least privilege.') },
  { id: 'calculations', title: 'Deterministic calculations', category: 'AI Engineering', pathIds: ['ai-engineering'], topics: ['Auditability'], text: text('Cálculos determinísticos devem ficar fora do LLM quando precisão e auditabilidade são essenciais.', 'Deterministic calculations should remain outside the LLM when accuracy and auditability are critical.') },
  { id: 'evaluation', title: 'Evaluation', category: 'Responsible AI', pathIds: ['responsible-ai', 'ai-engineering'], topics: ['Evaluation'], text: text('A avaliação de IA deve acompanhar todo o ciclo de vida do sistema.', 'AI evaluation should be incorporated throughout the system lifecycle.') },
]

// Add dated activity only when a real date is known. Book completion does not imply a date.
export const learningEntries: LearningEntry[] = []
