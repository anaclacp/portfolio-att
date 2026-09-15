export const TYPES = [
  'study', 'book', 'article', 'paper', 'docs',
  'course', 'research', 'project', 'certification', 'other',
]

export const STATUSES = [
  'studying', 'explored', 'reading', 'finished', 'read', 'saved',
  'in_progress', 'completed', 'planned', 'paused', 'dropped',
]

/**
 * Status coerentes com cada tipo. Impede gravar combinacao sem sentido, como
 * livro "explorado" ou assunto "concluido". Tipo fora do mapa aceita qualquer
 * status da lista geral.
 */
export const STATUS_BY_TYPE = {
  book: ['reading', 'finished', 'planned', 'paused'],
  study: ['studying', 'explored', 'planned', 'paused'],
  research: ['studying', 'explored', 'planned', 'paused'],
  project: ['studying', 'explored', 'planned', 'paused'],
  article: ['read', 'reading', 'saved'],
  paper: ['read', 'reading', 'saved'],
  docs: ['read', 'reading', 'saved'],
  course: ['in_progress', 'completed', 'planned', 'paused'],
  certification: ['in_progress', 'completed', 'planned'],
}

/** Tipos com progresso mensuravel. Assunto aberto nao tem 100%. */
export const PROGRESS_TYPES = ['book', 'course', 'project', 'certification']

/** Status padrao de cada tipo, usado quando o corpo nao manda um. */
const DEFAULT_STATUS = {
  book: 'reading',
  article: 'read',
  paper: 'read',
  docs: 'read',
  course: 'in_progress',
  certification: 'in_progress',
}

const MAX = { title: 200, slug: 200, author: 160, publisher: 160, description: 2000, url: 2000, tag: 60 }

/** "Responsible AI" -> "responsible-ai" */
export function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX.slug)
}

const isBlank = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '')

function text(value, field, max, errors) {
  if (isBlank(value)) return null
  const str = String(value).trim()
  if (str.length > max) {
    errors.push(`${field} excede ${max} caracteres`)
    return null
  }
  return str
}

function url(value, field, errors) {
  const str = text(value, field, MAX.url, errors)
  if (str === null) return null
  try {
    const parsed = new URL(str)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      errors.push(`${field} deve usar http ou https`)
      return null
    }
    return str
  } catch {
    errors.push(`${field} não é uma URL válida`)
    return null
  }
}

/** Aceita URL http(s) ou caminho absoluto do proprio site ("/images/x.jpg"). */
function localOrUrl(value, field, errors) {
  if (isBlank(value)) return null
  const str = String(value).trim()
  if (str.startsWith('/') && !str.startsWith('//')) {
    if (str.length > MAX.url) {
      errors.push(`${field} excede ${MAX.url} caracteres`)
      return null
    }
    return str
  }
  return url(value, field, errors)
}

function date(value, field, errors) {
  if (isBlank(value)) return null
  const str = String(value).trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    errors.push(`${field} deve estar no formato YYYY-MM-DD`)
    return null
  }
  const parsed = new Date(`${str}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) {
    errors.push(`${field} não é uma data válida`)
    return null
  }
  return str
}

function progress(value, errors) {
  if (isBlank(value)) return null
  const num = Number(value)
  if (!Number.isFinite(num) || !Number.isInteger(num) || num < 0 || num > 100) {
    errors.push('progress deve ser um inteiro entre 0 e 100')
    return null
  }
  return num
}

function tags(value, errors) {
  if (isBlank(value)) return []
  const list = Array.isArray(value) ? value : String(value).split(',')
  const cleaned = []
  for (const raw of list) {
    const tag = String(raw).trim()
    if (!tag) continue
    if (tag.length > MAX.tag) {
      errors.push(`tag "${tag.slice(0, 20)}..." excede ${MAX.tag} caracteres`)
      continue
    }
    if (!cleaned.includes(tag)) cleaned.push(tag)
  }
  if (cleaned.length > 20) {
    errors.push('no máximo 20 tags por item')
    return cleaned.slice(0, 20)
  }
  return cleaned
}

/**
 * Valida e normaliza o corpo de um create/update.
 *
 * @param {object} body
 * @param {{ partial?: boolean }} options  partial=true ignora campos ausentes (PATCH)
 * @returns {{ data: object, errors: string[] }}
 */
export function validateItem(body, { partial = false } = {}) {
  const errors = []
  const data = {}
  const has = (key) => Object.prototype.hasOwnProperty.call(body ?? {}, key)

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { data: {}, errors: ['corpo da requisição deve ser um objeto JSON'] }
  }

  if (!partial || has('title')) {
    const title = text(body.title, 'title', MAX.title, errors)
    if (!title) errors.push('title é obrigatório')
    else data.title = title
  }

  if (!partial || has('slug') || has('title')) {
    const raw = !isBlank(body.slug) ? body.slug : data.title
    if (!isBlank(raw)) {
      const slug = slugify(raw)
      if (!slug) errors.push('slug não pôde ser gerado a partir do título')
      else data.slug = slug
    }
  }

  if (!partial || has('type')) {
    const type = isBlank(body.type) ? 'study' : String(body.type).trim()
    if (!TYPES.includes(type)) errors.push(`type deve ser um de: ${TYPES.join(', ')}`)
    else data.type = type
  }

  if (!partial || has('status')) {
    const fallback = DEFAULT_STATUS[data.type] || 'studying'
    const status = isBlank(body.status) ? fallback : String(body.status).trim()
    if (!STATUSES.includes(status)) errors.push(`status deve ser um de: ${STATUSES.join(', ')}`)
    else data.status = status
  }

  if (!partial || has('description')) data.description = text(body.description, 'description', MAX.description, errors)
  if (!partial || has('author')) data.author = text(body.author, 'author', MAX.author, errors)
  if (!partial || has('publisher')) data.publisher = text(body.publisher, 'publisher', MAX.publisher, errors)
  if (!partial || has('progress')) data.progress = progress(body.progress, errors)
  // Capa pode ser hospedada no proprio site (public/images), entao alem de
  // http/https aceita caminho relativo comecando com "/". Nao abre brecha:
  // continua sem aceitar protocolo arbitrario como javascript:.
  if (!partial || has('cover_url')) data.cover_url = localOrUrl(body.cover_url, 'cover_url', errors)
  if (!partial || has('external_url')) data.external_url = url(body.external_url, 'external_url', errors)
  if (!partial || has('repository_url')) data.repository_url = url(body.repository_url, 'repository_url', errors)
  if (!partial || has('started_at')) data.started_at = date(body.started_at, 'started_at', errors)
  if (!partial || has('completed_at')) data.completed_at = date(body.completed_at, 'completed_at', errors)
  if (!partial || has('tags')) data.tags = tags(body.tags, errors)

  if (data.started_at && data.completed_at && data.completed_at < data.started_at) {
    errors.push('completed_at não pode ser anterior a started_at')
  }

  // Coerencia tipo x status. No PATCH parcial so da para checar quando os dois
  // vierem juntos; quando so um muda, o par completo e conferido na camada que
  // ja tem o item atual.
  if (data.type && data.status) {
    const allowed = STATUS_BY_TYPE[data.type]
    if (allowed && !allowed.includes(data.status)) {
      errors.push(`status "${data.status}" não se aplica a type "${data.type}" (use: ${allowed.join(', ')})`)
    }
  }

  return { data, errors }
}
