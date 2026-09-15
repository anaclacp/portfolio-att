import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DownloadButton from './ui/DownloadButton'
import LanguageToggle from './ui/LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()
  const { pathname } = useLocation()

  // Fora da home a ancora precisa do caminho: "#sobre" nao sai de /learning,
  // "/#sobre" volta para a home e rola ate a secao.
  const isHome = pathname === '/'
  const anchor = (hash) => (isHome ? hash : `/${hash}`)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: t.nav.about, href: anchor('#sobre') },
    { label: t.nav.services, href: anchor('#servicos') },
    { label: t.nav.projects, href: anchor('#projetos') },
    { label: t.nav.stack, href: anchor('#stack') },
    { label: t.nav.academic, href: anchor('#academico') },
    { label: t.nav.contact, href: anchor('#contato') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-blur' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-display font-semibold text-lg tracking-tight text-purple-light">AC</a>
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
