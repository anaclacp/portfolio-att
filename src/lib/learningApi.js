const BASE = '/api/learning'

/** Guarda o token só na aba atual: fechou a aba, precisa entrar de novo. */
const TOKEN_KEY = 'learning-admin-token'

export function getToken() {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setToken(token) {
  try {
    if (token) window.sessionStorage.setItem(TOKEN_KEY, token)
    else window.sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    // sessionStorage bloqueado: o token vive só em memória nesta sessão
  }
}

/** Erro com o status HTTP e a lista de mensagens de validação, quando houver. */
export class ApiError extends Error {
  constructor(message, { status, errors = [] } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

async function request(url, { method = 'GET', body, token } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError('network', { status: 0 })
  }

  if (response.status === 204) return null

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    throw new ApiError(payload?.error || 'request failed', {
      status: response.status,
      errors: payload?.errors || (payload?.error ? [payload.error] : []),
    })
  }

  return payload
}

export async function fetchItems() {
  const payload = await request(BASE)
  return payload?.items ?? []
}

export function createItem(data, token) {
  return request(BASE, { method: 'POST', body: data, token }).then((p) => p.item)
}

export function updateItem(id, data, token) {
  return request(`${BASE}/${id}`, { method: 'PATCH', body: data, token }).then((p) => p.item)
}

export function deleteItem(id, token) {
  return request(`${BASE}/${id}`, { method: 'DELETE', token })
}

/**
 * Valida o token batendo em uma escrita inócua: um PATCH vazio em um id que não
 * existe. 404 significa que o token passou pela autenticação; 401 que não.
 */
export async function verifyToken(token) {
  try {
    await request(`${BASE}/999999999`, { method: 'PATCH', body: {}, token })
    return { ok: true }
  } catch (error) {
    if (error.status === 404) return { ok: true }
    if (error.status === 401) return { ok: false, reason: 'invalid' }
    if (error.status === 503) return { ok: false, reason: 'notConfigured' }
    return { ok: false, reason: 'error' }
  }
}
