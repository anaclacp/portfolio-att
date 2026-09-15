/** Cabeçalho de seção do Learning Log: rótulo curto e uma régua fina. */
function SectionHeading({ children, count }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <h2 className="font-display text-xs font-medium text-purple-light uppercase tracking-[0.2em] whitespace-nowrap">
        {children}
      </h2>
      {typeof count === 'number' && count > 0 && (
        <span className="font-mono text-[11px] text-gray-600 tabular-nums">{count}</span>
      )}
      <span className="h-px flex-1 bg-gradient-to-r from-purple-light/25 to-transparent" />
    </div>
  )
}

export default SectionHeading
