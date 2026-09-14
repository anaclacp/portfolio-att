import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations, defaultLanguage } from './translations'

const STORAGE_KEY = 'portfolio-lang'

const LanguageContext = createContext(null)

function detectLanguage() {
  if (typeof window === 'undefined') return defaultLanguage

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && translations[stored]) return stored
  } catch {
    // localStorage bloqueado (modo privado, cookies desabilitados)
  }

  const browserLang = window.navigator?.language || ''
  return browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage)

  useEffect(() => {
    const t = translations[lang]
    document.documentElement.lang = t.meta.htmlLang
    document.title = t.meta.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) metaDescription.setAttribute('content', t.meta.description)

    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignora falha de persistência
    }
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'pt' ? 'en' : 'pt'))
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: translations[lang] }),
    [lang, toggleLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage precisa estar dentro de um LanguageProvider')
  }
  return context
}
