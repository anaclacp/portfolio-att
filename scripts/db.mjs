#!/usr/bin/env node
/**
 * Runner de schema do Learning Log.
 *
 *   npm run db:migrate      aplica db/migrations/*.sql em ordem
 *   npm run db:seed         insere os dados de exemplo
 *   npm run db:seed:clean   remove só os dados de exemplo (slug LIKE 'seed-%')
 *
 * Lê DATABASE_URL de process.env ou de um .env na raiz.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { neon } from '@neondatabase/serverless'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Carrega .env sem dependência externa. Não sobrescreve o que já existe no ambiente. */
function loadEnv() {
  const envPath = join(root, '.env')
  if (!existsSync(envPath)) return
  for (const rawLine of readFileSync(envPath, 'utf8').split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

/**
 * Separa um arquivo .sql em statements, respeitando strings, comentários
 * e blocos dollar-quoted ($$ ... $$), que é onde um split por ";" quebraria.
 */
export function splitStatements(sql) {
  const statements = []
  let current = ''
  let i = 0

  while (i < sql.length) {
    const rest = sql.slice(i)

    // comentário de linha
    if (rest.startsWith('--')) {
      const end = sql.indexOf('\n', i)
      const stop = end === -1 ? sql.length : end
      current += sql.slice(i, stop)
      i = stop
      continue
    }

    // comentário de bloco
    if (rest.startsWith('/*')) {
      const end = sql.indexOf('*/', i + 2)
      const stop = end === -1 ? sql.length : end + 2
      current += sql.slice(i, stop)
      i = stop
      continue
    }

    // string literal, com '' como escape
    if (sql[i] === "'") {
      let j = i + 1
      while (j < sql.length) {
        if (sql[j] === "'" && sql[j + 1] === "'") { j += 2; continue }
        if (sql[j] === "'") { j += 1; break }
        j += 1
      }
      current += sql.slice(i, j)
      i = j
      continue
    }

    // bloco dollar-quoted: $$ ... $$ ou $tag$ ... $tag$
    const dollar = rest.match(/^\$([A-Za-z_][A-Za-z0-9_]*)?\$/)
    if (dollar) {
      const tag = dollar[0]
      const end = sql.indexOf(tag, i + tag.length)
      const stop = end === -1 ? sql.length : end + tag.length
      current += sql.slice(i, stop)
      i = stop
      continue
    }

    if (sql[i] === ';') {
      statements.push(current)
      current = ''
      i += 1
      continue
    }

    current += sql[i]
    i += 1
  }

  statements.push(current)

  // Descarta trechos que só têm comentário/espaço. Os comentários seguem no
  // statement executado (são inofensivos); a remoção aqui serve só para decidir
  // se sobrou algum código de verdade.
  const codeOnly = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/--[^\n]*/g, '').trim()

  return statements.map((s) => s.trim()).filter((s) => codeOnly(s).length > 0)
}

async function run() {
  loadEnv()

  const command = process.argv[2]
  const url = process.env.DATABASE_URL

  if (!url) {
    console.error(
      'DATABASE_URL nao definida.\n' +
      'Crie um .env na raiz com a connection string do Neon (veja .env.example)\n' +
      'ou exporte a variavel antes de rodar o comando.'
    )
    process.exit(1)
  }

  const sql = neon(url)

  const exec = async (text, label) => {
    const statements = splitStatements(text)
    for (const statement of statements) {
      await sql.query(statement)
    }
    console.log(`  ${label}: ${statements.length} statement(s)`)
  }

  if (command === 'migrate') {
    const dir = join(root, 'db', 'migrations')
    const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()
    console.log(`Aplicando ${files.length} migration(s):`)
    for (const file of files) {
      await exec(readFileSync(join(dir, file), 'utf8'), file)
    }
    console.log('Migrations aplicadas.')
    return
  }

  if (command === 'seed') {
    console.log('Inserindo dados de exemplo:')
    await exec(readFileSync(join(root, 'db', 'seed.sql'), 'utf8'), 'seed.sql')
    const [{ count }] = await sql.query(
      "SELECT count(*)::int AS count FROM learning_items WHERE slug LIKE 'seed-%'"
    )
    console.log(`Seed aplicado. ${count} registro(s) de exemplo no banco.`)
    return
  }

  if (command === 'seed:clean') {
    const rows = await sql.query(
      "DELETE FROM learning_items WHERE slug LIKE 'seed-%' RETURNING id"
    )
    console.log(`${rows.length} registro(s) de exemplo removido(s).`)
    return
  }

  console.error('Comando desconhecido. Use: migrate | seed | seed:clean')
  process.exit(1)
}

// Só executa quando chamado direto, para o splitter poder ser testado por import.
if (process.argv[1] && process.argv[1].endsWith('db.mjs')) {
  run().catch((error) => {
    console.error('Falhou:', error.message)
    process.exit(1)
  })
}
