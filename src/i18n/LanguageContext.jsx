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

    // title e meta description ficam com a pagina (usePageMeta). Se fossem
    // escritos aqui, o efeito do provider rodaria DEPOIS do efeito do filho na
    // troca de idioma e /learning voltaria a exibir o titulo da home.

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
