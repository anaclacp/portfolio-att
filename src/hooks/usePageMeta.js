import { useEffect } from 'react'

/**
 * Define title e meta description da rota atual.
 *
 * É a única fonte desses dois valores: o LanguageProvider cuida apenas do
 * atributo lang do <html>. Como os textos vêm das traduções, trocar de idioma
 * muda `title` e o efeito reaplica sozinho.
 */
export default function usePageMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }
  }, [title, description])
}
