import { useState, useEffect } from 'react'
import DownloadButton from './ui/DownloadButton'

function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = ['Sobre', 'Projetos', 'Pesquisa', 'Eventos', 'Contato']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-purple-deep/20' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-display font-bold text-xl glow-text">AC</a>
        <div className="flex items-center gap-8">
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm text-gray-300 hover:text-pink-vibrant transition-colors link-animate hidden md:block"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {link}
            </a>
          ))}
          <DownloadButton href="/cv.pdf" />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
