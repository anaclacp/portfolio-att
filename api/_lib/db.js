import { neon } from '@neondatabase/serverless'

let client = null

/**
 * Cliente Neon sobre HTTP, criado sob demanda e reaproveitado entre invocações
 * quentes da função. Lança se DATABASE_URL não estiver configurada.
 */
export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw Object.assign(new Error('DATABASE_URL não configurada'), { status: 503 })
  }
  if (!client) client = neon(process.env.DATABASE_URL)
  return client
}

/**
 * Colunas devolvidas pela API. Datas viram texto no próprio Postgres para não
 * passarem por conversão de fuso no caminho até o browser: um DATE aqui é um
 * dia de calendário, não um instante.
 */
const COLUMNS = `
  id,
  title,
  slug,
  type,
  status,
  description,
  progress,
  author,
  publisher,
  cover_url,
  external_url,
  repository_url,
  started_at::text   AS started_at,
  completed_at::text AS completed_at,
  tags,
  created_at,
  updated_at
`

export async function listItems() {
  const sql = getSql()
  return sql.query(`
    SELECT ${COLUMNS}
    FROM learning_items
    ORDER BY
      completed_at DESC NULLS FIRST,
      COALESCE(started_at, created_at::date) DESC,
      id DESC
  `)
}

export async function getItem(id) {
  const sql = getSql()
  const rows = await sql.query(`SELECT ${COLUMNS} FROM learning_items WHERE id = $1`, [id])
  return rows[0] || null
}

export async function createItem(data) {
  const sql = getSql()
  const rows = await sql.query(
    `INSERT INTO learning_items
       (title, slug, type, status, description, progress, author, publisher,
        cover_url, external_url, repository_url, started_at, completed_at, tags)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING ${COLUMNS}`,
    [
      data.title,
      data.slug,
      data.type,
      data.status,
      data.description,
      data.progress,
      data.author,
      data.publisher,
      data.cover_url,
      data.external_url,
      data.repository_url,
      data.started_at,
      data.completed_at,
      data.tags,
    ]
  )
  return rows[0]
}

/**
 * Colunas que o UPDATE aceita. O nome da coluna é interpolado na query (não dá
 * para parametrizar identificador), então só pode sair desta lista: é o que
 * impede uma chave vinda do request de virar SQL.
 */
const UPDATABLE = new Set([
  'title', 'slug', 'type', 'status', 'description', 'progress', 'author', 'publisher',
  'cover_url', 'external_url', 'repository_url', 'started_at', 'completed_at', 'tags',
])

/** Atualização parcial: só as chaves presentes em `data` são escritas. */
export async function updateItem(id, data) {
  const sql = getSql()
  const fields = []
  const values = []

  for (const [key, value] of Object.entries(data)) {
    if (!UPDATABLE.has(key)) continue
    values.push(value)
    fields.push(`${key} = $${values.length}`)
  }

  if (fields.length === 0) return getItem(id)

  values.push(id)
  const rows = await sql.query(
    `UPDATE learning_items SET ${fields.join(', ')}
     WHERE id = $${values.length}
     RETURNING ${COLUMNS}`,
    values
  )
  return rows[0] || null
}

export async function deleteItem(id) {
  const sql = getSql()
  const rows = await sql.query('DELETE FROM learning_items WHERE id = $1 RETURNING id', [id])
  return rows.length > 0
}

export async function slugExists(slug, exceptId = null) {
  const sql = getSql()
  const rows = exceptId
    ? await sql.query('SELECT 1 FROM learning_items WHERE slug = $1 AND id <> $2', [slug, exceptId])
    : await sql.query('SELECT 1 FROM learning_items WHERE slug = $1', [slug])
  return rows.length > 0
}
