import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchItems } from '../lib/learningApi'

/**
 * Carrega os itens do Learning Log.
 * Distingue "banco não configurado" (503) de falha real, porque o primeiro é um
 * estado esperado enquanto a DATABASE_URL não existe e merece outra mensagem.
 */
export default function useLearningItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Evita setState depois do unmount e descarta resposta de request antigo.
  const mounted = useRef(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchItems()
      if (mounted.current) setItems(data)
    } catch (err) {
      if (mounted.current) {
        setError(err.status === 503 ? 'notConfigured' : 'failed')
        setItems([])
      }
    } finally {
      if (mounted.current) setLoading(false)
    }
  }, [])

  useEffect(() => {
    mounted.current = true
    load()
    return () => {
      mounted.current = false
    }
  }, [load])

  return { items, loading, error, reload: load }
}
