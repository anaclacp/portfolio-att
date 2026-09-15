import { READING_TYPES, TOPIC_TYPES, acceptsProgress } from './learningTypes.js'

const LOCALES = { pt: 'pt-BR', en: 'en-US' }

/** Quebra "YYYY-MM-DD" em componentes numéricos, ou null se não for uma data. */
function parts(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '')
  if (!match) return null
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) }
}

/**
 * Formata uma data "YYYY-MM-DD" como mês abreviado + ano ("set 2026").
 * A string é montada com componentes UTC porque a coluna é um DATE: um dia de
 * calendário, sem hora nem fuso. Instanciar com `new Date('2026-09-01')` e ler
 * em horário local jogaria a data um dia para trás a oeste de Greenwich.
 */
export function formatMonthYear(value, lang = 'pt') {
  const p = parts(value)
  if (!p) return null

  const date = new Date(Date.UTC(p.year, p.month - 1, p.day))
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat(LOCALES[lang] || LOCALES.pt, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

/** Só o ano. Usado em artigos e papers, onde mês não diz nada. */
export function formatYear(value) {
  const p = parts(value)
  return p ? String(p.year) : null
}

/**
 * A coluna é DATE, mas nem toda referência tem precisão de mês: "livro lido em
 * 2025" não diz janeiro. A convenção é gravar 01/01 como marcador de ano, e
 * aqui é onde ela é lida, para a tela nunca afirmar um mês que não existiu.
 *
 * Preço da convenção: algo realmente concluído em 1º de janeiro aparece só com
 * o ano. É perder precisão, não exibir informação falsa.
 */
export function isYearOnly(value) {
  const p = parts(value)
  return Boolean(p) && p.month === 1 && p.day === 1
}

/** Mês e ano, ou só o ano quando a data é um marcador anual. */
function formatDate(value, lang) {
  return isYearOnly(value) ? formatYear(value) : formatMonthYear(value, lang)
}

/**
 * Período legível de um item: "ago 2026 – set 2026", ou só uma das pontas.
 * Para artigo/paper/docs devolve apenas o ano.
 */
export function formatPeriod(item, lang = 'pt') {
  if (READING_TYPES.includes(item.type)) {
    return formatYear(item.completed_at) || formatYear(item.started_at)
  }

  const inicio = formatDate(item.started_at, lang)
  const fim = formatDate(item.completed_at, lang)

  if (inicio && fim) return inicio === fim ? inicio : `${inicio} – ${fim}`
  return fim || inicio
}

/**
 * A barra de progresso só aparece quando o número existe E o tipo tem um fim
 * mensurável. "Responsible AI 65%" não significa nada: não há ponto onde a área
 * esteja 100% estudada.
 */
export function hasProgress(item) {
  return (
    typeof item.progress === 'number' &&
    Number.isFinite(item.progress) &&
    acceptsProgress(item.type)
  )
}

const isTopic = (item) => TOPIC_TYPES.includes(item.type)

/** Ordena por data mais recente (conclusão, senão início), desconhecida por último. */
function byRecent(a, b) {
  const key = (i) => i.completed_at || i.started_at || ''
  return String(key(b)).localeCompare(String(key(a)))
}

/**
 * Agrupa a lista crua da API nas seções da página.
 *
 * Cada item aparece em uma seção só. Livro em leitura fica na estante e é
 * apenas referenciado em "estudando agora"; projeto tem seção própria em vez de
 * se misturar a assunto de estudo.
 */
export function groupItems(items) {
  const list = Array.isArray(items) ? items : []

  const books = list.filter((item) => item.type === 'book')
  const readings = list.filter((item) => READING_TYPES.includes(item.type)).sort(byRecent)
  const projects = list.filter((item) => item.type === 'project').sort(byRecent)

  const current = list
    .filter((item) => isTopic(item) && (item.status === 'studying' || item.status === 'in_progress'))
    .sort(byRecent)

  const recent = list
    .filter((item) => isTopic(item) && (item.status === 'explored' || item.status === 'completed'))
    .sort(byRecent)

  // Livro em leitura vira só uma linha discreta dentro de "estudando agora".
  const reading = books.find((item) => item.status === 'reading') || null

  return { current, recent, books, readings, projects, reading }
}

const MONTH_KEY = (item) => {
  const p = parts(item.completed_at) || parts(item.started_at)
  return p ? `${p.year}-${String(p.month).padStart(2, '0')}` : null
}

/**
 * Agrupa os itens por mês, do mais recente para o mais antigo, para a faixa de
 * evolução no fim da página.
 *
 * Ficam de fora: item sem data nenhuma (não há onde posicioná-lo) e artigos,
 * papers e docs, cuja data guardada só tem precisão de ano. Exibi-los aqui
 * viraria um "jan 2024" que não corresponde a mês nenhum; o ano deles já
 * aparece na seção de leituras.
 */
export function buildTimeline(items) {
  const list = Array.isArray(items) ? items : []
  const meses = new Map()

  for (const item of list) {
    if (READING_TYPES.includes(item.type)) continue
    const ref = item.completed_at || item.started_at
    if (isYearOnly(ref)) continue
    const key = MONTH_KEY(item)
    if (!key) continue
    if (!meses.has(key)) meses.set(key, [])
    meses.get(key).push(item)
  }

  return [...meses.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, entries]) => ({
      key,
      date: `${key}-01`,
      items: entries.sort((a, b) => a.title.localeCompare(b.title)),
    }))
}
