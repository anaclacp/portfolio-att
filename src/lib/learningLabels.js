/**
 * Rótulo de status sensível ao tipo.
 *
 * "planned" num livro é "Planejado"; num assunto de estudo é "Quero estudar".
 * O mapa `statusByType` guarda só as exceções, então o padrão continua sendo
 * uma tabela simples e não uma engine de regras.
 */
export function statusLabel(t, item) {
  if (item.type === 'certification' && ['in_progress', 'studying', 'preparing'].includes(item.status)) {
    return t.meta.htmlLang === 'pt-BR' ? 'Em preparação' : 'Preparing'
  }
  const porTipo = t.learning.statusByType?.[item.type]
  return porTipo?.[item.status] || t.learning.statuses[item.status] || item.status
}

export function typeLabel(t, item) {
  return t.learning.types[item.type] || item.type
}
