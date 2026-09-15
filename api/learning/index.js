import { listItems, createItem, slugExists } from '../_lib/db.js'
import { rejectUnauthorized } from '../_lib/auth.js'
import { validateItem } from '../_lib/validate.js'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const items = await listItems()
      // Público e sempre fresco: o painel altera o banco e a página reflete no
      // próximo request, sem redeploy. stale-while-revalidate segura a carga
      // sem congelar o conteúdo.
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=30, stale-while-revalidate=300')
      return res.status(200).json({ items })
    }

    if (req.method === 'POST') {
      if (rejectUnauthorized(req, res)) return

      const { data, errors } = validateItem(req.body)
      if (errors.length > 0) return res.status(400).json({ errors })

      if (await slugExists(data.slug)) {
        return res.status(409).json({ errors: [`já existe um item com o slug "${data.slug}"`] })
      }

      const item = await createItem(data)
      return res.status(201).json({ item })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error) {
    const status = error.status || 500
    if (status === 503) return res.status(503).json({ error: error.message, items: [] })
    console.error('[api/learning]', error)
    return res.status(500).json({ error: 'Erro ao acessar os dados do Learning Log.' })
  }
}
