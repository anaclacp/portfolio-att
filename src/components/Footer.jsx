function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 border-t border-purple-deep/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © {currentYear} Ana Clara Pereira. Feito com 💜
        </p>
        <p className="text-gray-600 text-sm font-mono">
          Python • React • IA • Clean Architecture
        </p>
      </div>
    </footer>
  )
}

export default Footer
