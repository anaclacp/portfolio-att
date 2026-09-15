import BookCard from './BookCard'

/**
 * Estante: grade de capas que vai de 2 colunas no celular a 6 no desktop,
 * com a "prateleira" sugerida por uma linha fina sob a grade.
 */
function Bookshelf({ items }) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
        {items.map((item) => (
          <BookCard key={item.id} item={item} />
        ))}
      </div>
      <div className="shelf-line mt-6" />
    </div>
  )
}

export default Bookshelf
