import { getItem, updateItem, deleteItem, slugExists } from '../_lib/db.js'
import { rejectUnauthorized } from '../_lib/auth.js'
import { validateItem, STATUS_BY_TYPE } from '../_lib/validate.js'

export default async function handler(req, res) {
  const id = Number(req.query.id)
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'id inválido' })
  }

  try {
    if (req.method === 'GET') {
      const item = await getItem(id)
      if (!item) return res.status(404).json({ error: 'Item não encontrado' })
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=30, stale-while-revalidate=300')
      return res.status(200).json({ item })
    }

    // Tudo que escreve exige token.
    if (rejectUnauthorized(req, res)) return

    if (req.method === 'PATCH' || req.method === 'PUT') {
      const { data, errors } = validateItem(req.body, { partial: req.method === 'PATCH' })
      if (errors.length > 0) return res.status(400).json({ errors })

      // Num PATCH que muda so o status, o type vem do registro gravado. Sem
      // isso daria para deixar um livro com status de artigo.
      if (data.status && !data.type) {
        const atual = await getItem(id)
        if (!atual) return res.status(404).json({ error: 'Item não encontrado' })
        const allowed = STATUS_BY_TYPE[atual.type]
        if (allowed && !allowed.includes(data.status)) {
          return res.status(400).json({
            errors: [`status "${data.status}" não se aplica a type "${atual.type}" (use: ${allowed.join(', ')})`],
          })
        }
      }

      if (data.slug && (await slugExists(data.slug, id))) {
        return res.status(409).json({ errors: [`já existe um item com o slug "${data.slug}"`] })
      }

      const item = await updateItem(id, data)
      if (!item) return res.status(404).json({ error: 'Item não encontrado' })
      return res.status(200).json({ item })
    }

    if (req.method === 'DELETE') {
      const removed = await deleteItem(id)
      if (!removed) return res.status(404).json({ error: 'Item não encontrado' })
      return res.status(204).end()
    }

    res.setHeader('Allow', 'GET, PATCH, PUT, DELETE')
    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error) {
    const status = error.status || 500
    if (status === 503) return res.status(503).json({ error: error.message })
    console.error('[api/learning/:id]', error)
    return res.status(500).json({ error: 'Erro ao gravar os dados do Learning Log.' })
  }
}
