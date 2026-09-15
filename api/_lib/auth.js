import { timingSafeEqual } from 'node:crypto'

/**
 * Autenticação do painel: um token estático em ADMIN_TOKEN, enviado como
 * `Authorization: Bearer <token>`.
 *
 * É o mínimo defensável para um painel pessoal de uma pessoa só. O que ele
 * garante: o segredo nunca está no código nem no bundle do client, e a
 * comparação não vaza o token por tempo de resposta. O que ele não faz:
 * sessões, expiração, múltiplos usuários. Se um dia isso for necessário,
 * troque por um provedor de auth de verdade.
 */
export function isAuthorized(req) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) return false

  const header = req.headers?.authorization || ''
  const match = header.match(/^Bearer\s+(.+)$/i)
  if (!match) return false

  const provided = match[1].trim()

  // timingSafeEqual exige buffers do mesmo tamanho; comparar o tamanho antes
  // vazaria o comprimento, então normalizamos para o mesmo número de bytes.
  const a = Buffer.from(provided, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  const length = Math.max(a.length, b.length)
  const paddedA = Buffer.alloc(length)
  const paddedB = Buffer.alloc(length)
  a.copy(paddedA)
  b.copy(paddedB)

  return timingSafeEqual(paddedA, paddedB) && a.length === b.length
}

/** Responde 401 e devolve true quando a requisição não está autorizada. */
export function rejectUnauthorized(req, res) {
  if (isAuthorized(req)) return false

  if (!process.env.ADMIN_TOKEN) {
    res.status(503).json({
      error: 'ADMIN_TOKEN não configurada no servidor. O painel fica indisponível até ela existir.',
    })
    return true
  }

  res.status(401).json({ error: 'Token inválido.' })
  return true
}
