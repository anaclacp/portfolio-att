/**
 * Vocabulário do Learning Log usado pela UI.
 *
 * A autoridade é `api/_lib/validate.js` (o servidor valida de verdade); este
 * arquivo é o espelho para o formulário do admin, porque o browser não importa
 * código de `api/`. Um teste compara os dois e falha se divergirem.
 */

export const TYPES = [
  'study', 'book', 'article', 'paper', 'docs',
  'course', 'research', 'project', 'certification', 'other',
]

export const STATUSES = [
  'studying', 'explored', 'reading', 'finished', 'read', 'saved',
  'in_progress', 'completed', 'planned', 'paused', 'dropped',
]

/**
 * Status que fazem sentido para cada tipo.
 * Não é motor de regras: é a lista que o select do admin mostra, e a mesma que
 * o servidor usa para recusar combinação incoerente (livro "explorado", por
 * exemplo). Tipos fora do mapa aceitam qualquer status.
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

export function statusesFor(type) {
  return STATUS_BY_TYPE[type] || STATUSES
}

/**
 * Tipos cujo progresso é mensurável: têm capítulos, módulos ou escopo fechado.
 * Assunto aberto (Responsible AI) não tem 100%, então o formulário nem oferece
 * o campo e a página nunca desenha barra.
 */
export const PROGRESS_TYPES = ['book', 'course', 'project', 'certification']

export function acceptsProgress(type) {
  return PROGRESS_TYPES.includes(type)
}

/** Tipos que aparecem na seção de artigos e leituras. */
export const READING_TYPES = ['article', 'paper', 'docs']

/** Tipos tratados como assunto de estudo nas seções da página. */
export const TOPIC_TYPES = ['study', 'research', 'course', 'certification']
