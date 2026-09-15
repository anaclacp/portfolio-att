import { useEffect } from 'react'

/**
 * Revela elementos marcados com [data-reveal] quando eles entram na viewport.
 *
 * Duas decisões que importam:
 *
 * 1. A classe `reveal-ready` só é posta no <html> depois que o observer existe.
 *    O CSS que esconde os elementos depende dela, então se o JS falhar, não
 *    carregar ou o navegador não tiver IntersectionObserver, o conteúdo aparece
 *    normalmente em vez de ficar invisível para sempre.
 *
 * 2. Um MutationObserver acompanha nós que chegam depois (cards do Learning Log
 *    vêm de fetch), sem precisar reavisar o hook a cada carregamento.
 *
 * Revela uma vez só: depois de visto, o elemento para de ser observado.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement

    // Sem suporte ou com movimento reduzido: nada é escondido, nada anima.
    const semMovimento = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (typeof IntersectionObserver === 'undefined' || semMovimento) return

    root.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      },
      {
        // Dispara um pouco antes de encostar na borda, para o movimento
        // terminar enquanto o elemento ainda está subindo na tela.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.08,
      }
    )

    const observar = (raiz) => {
      const alvos = raiz.querySelectorAll?.('[data-reveal]:not(.is-revealed)')
      alvos?.forEach((el) => observer.observe(el))
    }

    observar(document)

    const mutations = new MutationObserver((lista) => {
      for (const m of lista) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue
          if (node.matches?.('[data-reveal]')) observer.observe(node)
          observar(node)
        }
      }
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
