import { useState, useEffect } from 'react'
import DownloadButton from './ui/DownloadButton'
import LanguageToggle from './ui/LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: t.nav.about, href: '#sobre' },
    { label: t.nav.services, href: '#servicos' },
    { label: t.nav.projects, href: '#projetos' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.academic, href: '#academico' },
    { label: t.nav.contact, href: '#contato' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-display font-semibold text-lg tracking-tight text-purple-light">AC</a>
        <div className="flex items-center gap-4 md:gap-7">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-gray-400 hover:text-purple-light transition-colors link-animate hidden md:block"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle />
          <DownloadButton href="/cv.pdf" />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
