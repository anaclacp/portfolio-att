/** Placeholder discreto para seção sem itens, no lugar de deixar buraco. */
function EmptyState({ message }) {
  return (
    <p className="text-gray-600 text-sm italic border border-dashed border-white/8 rounded-xl px-5 py-6 text-center">
      {message}
    </p>
  )
}

export default EmptyState
