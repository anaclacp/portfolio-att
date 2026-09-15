function Tags({ items, className = '' }) {
  if (!items || items.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((tag) => (
        <span
          key={tag}
          className="text-[11px] font-mono text-gray-300 bg-dark-700/40 border border-white/5 px-2.5 py-0.5 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default Tags
