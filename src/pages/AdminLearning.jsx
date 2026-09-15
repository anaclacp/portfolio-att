import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import usePageMeta from '../hooks/usePageMeta'
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  getToken,
  setToken,
  verifyToken,
} from '../lib/learningApi'
import LanguageToggle from '../components/ui/LanguageToggle'
import ItemForm from '../components/learning/ItemForm'
import { statusLabel, typeLabel } from '../lib/learningLabels'
import { acceptsProgress } from '../lib/learningTypes'

/**
 * "Terminar" quer dizer coisas diferentes: livro fica finished, assunto vira
 * explored (nao existe terminar de aprender um assunto), curso completa,
 * leitura vira read.
 */
const STATUS_FINAL = {
  book: 'finished',
  study: 'explored',
  research: 'explored',
  project: 'explored',
  article: 'read',
  paper: 'read',
  docs: 'read',
  course: 'completed',
  certification: 'completed',
}

/** Data de hoje em YYYY-MM-DD, em horário local. */
function today() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

function LoginScreen({ onAuthenticated }) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (event) => {
    event.preventDefault()
    setChecking(true)
    setError(null)

    const result = await verifyToken(value.trim())
    setChecking(false)

    if (result.ok) {
      setToken(value.trim())
      onAuthenticated(value.trim())
      return
    }
    setError(result.reason === 'notConfigured' ? 'notConfigured' : 'invalid')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={submit} className="card-soft rounded-2xl p-8 w-full max-w-sm">
        <h1 className="font-display text-xl font-semibold text-white tracking-tight mb-2">
          {t.admin.login.title}
        </h1>
        <p className="text-gray-400 text-sm mb-6">{t.admin.login.description}</p>

        <label className="block mb-4">
          <span className="admin-label">{t.admin.login.label}</span>
          <input
            className="admin-field"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            required
          />
        </label>

        {error && (
          <p className="text-sm text-pink-vibrant mb-4">
            {error === 'notConfigured' ? t.admin.login.notConfigured : t.admin.login.invalid}
          </p>
        )}

        <button
          type="submit"
          disabled={checking}
          className="btn-gradient w-full px-6 py-2.5 rounded-full text-sm font-medium disabled:opacity-60"
        >
          <span>{checking ? '...' : t.admin.login.submit}</span>
        </button>

        <Link
          to="/learning"
          className="block text-center text-xs text-gray-500 hover:text-purple-light transition-colors mt-5"
        >
          {t.admin.viewPublic}
        </Link>
      </form>
    </div>
  )
}

function ItemRow({ item, onEdit, onRemove, onComplete, busy }) {
  const { t } = useLanguage()

  return (
    <li className="card-soft rounded-xl px-4 py-3.5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-sm font-semibold text-white truncate">{item.title}</h3>
          <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-0.5">
            {typeLabel(t, item)} · {statusLabel(t, item)}
            {typeof item.progress === 'number' && acceptsProgress(item.type) && ` · ${item.progress}%`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {item.status !== (STATUS_FINAL[item.type] || 'explored') && (
            <button
              type="button"
              onClick={() => onComplete(item)}
              disabled={busy}
              className="text-xs text-gray-400 hover:text-purple-light transition-colors disabled:opacity-50"
              title={t.admin.actions.complete}
            >
              ✓
            </button>
          )}
          <button
            type="button"
            onClick={() => onEdit(item)}
            disabled={busy}
            className="text-xs text-gray-400 hover:text-purple-light transition-colors disabled:opacity-50"
          >
            {t.admin.actions.edit}
          </button>
          <button
            type="button"
            onClick={() => onRemove(item)}
            disabled={busy}
            className="text-xs text-gray-500 hover:text-pink-vibrant transition-colors disabled:opacity-50"
          >
            {t.admin.actions.remove}
          </button>
        </div>
      </div>
    </li>
  )
}

function AdminLearning() {
  const { t } = useLanguage()
  usePageMeta({ title: t.admin.metaTitle, description: t.meta.description })

  const [token, setTokenState] = useState(() => getToken())
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState([])
  const [notice, setNotice] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await fetchItems())
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) load()
  }, [token, load])

  // A mensagem de sucesso some sozinha para não acumular na tela.
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 3000)
    return () => clearTimeout(timer)
  }, [notice])

  if (!token) {
    return <LoginScreen onAuthenticated={setTokenState} />
  }

  const handleAuthError = (error) => {
    if (error.status === 401) {
      setToken('')
      setTokenState('')
      return true
    }
    return false
  }

  const submit = async (data) => {
    setSaving(true)
    setErrors([])
    try {
      if (editing) {
        await updateItem(editing.id, data, token)
        setNotice(t.admin.feedback.updated)
      } else {
        await createItem(data, token)
        setNotice(t.admin.feedback.created)
      }
      setEditing(null)
      await load()
    } catch (error) {
      if (!handleAuthError(error)) {
        setErrors(error.errors.length > 0 ? error.errors : [error.message])
      }
    } finally {
      setSaving(false)
    }
  }

  const remove = async (item) => {
    if (!window.confirm(t.admin.actions.confirmRemove)) return
    setSaving(true)
    try {
      await deleteItem(item.id, token)
      if (editing?.id === item.id) setEditing(null)
      setNotice(t.admin.feedback.removed)
      await load()
    } catch (error) {
      if (!handleAuthError(error)) setErrors([error.message])
    } finally {
      setSaving(false)
    }
  }

  const complete = async (item) => {
    setSaving(true)
    try {
      const patch = {
        status: STATUS_FINAL[item.type] || 'explored',
        completed_at: item.completed_at || today(),
      }
      // Só marca 100% onde progresso significa alguma coisa.
      if (acceptsProgress(item.type)) patch.progress = 100

      await updateItem(item.id, patch, token)
      setNotice(t.admin.feedback.updated)
      await load()
    } catch (error) {
      if (!handleAuthError(error)) setErrors([error.message])
    } finally {
      setSaving(false)
    }
  }

  const signOut = () => {
    setToken('')
    setTokenState('')
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-start justify-between gap-4 flex-wrap mb-10">
          <div>
            <h1 className="section-title text-2xl md:text-3xl mb-1">
              {t.admin.title} <span className="accent">{t.admin.titleAccent}</span>
            </h1>
            <p className="text-gray-400 text-sm">{t.admin.subtitle}</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <LanguageToggle />
            <Link
              to="/learning"
              className="btn-ghost px-4 py-2 rounded-full text-xs font-medium"
            >
              {t.admin.viewPublic}
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="text-xs text-gray-500 hover:text-pink-vibrant transition-colors"
            >
              {t.admin.logout}
            </button>
          </div>
        </header>

        {notice && (
          <p className="mb-6 text-sm text-purple-light border border-purple-light/25 bg-purple-light/5 rounded-lg px-4 py-2.5">
            {notice}
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <ItemForm
            editing={editing}
            onSubmit={submit}
            onCancel={() => {
              setEditing(null)
              setErrors([])
            }}
            saving={saving}
            errors={errors}
          />

          <section>
            <h2 className="font-display text-lg font-semibold text-white tracking-tight mb-4">
              {t.admin.list.title}
              {items.length > 0 && (
                <span className="font-mono text-xs text-gray-600 ml-2">{items.length}</span>
              )}
            </h2>

            {loading ? (
              <p className="text-gray-500 text-sm">{t.learning.loading}</p>
            ) : items.length === 0 ? (
              <p className="text-gray-600 text-sm italic border border-dashed border-white/8 rounded-xl px-5 py-6 text-center">
                {t.admin.list.empty}
              </p>
            ) : (
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    onEdit={(value) => {
                      setEditing(value)
                      setErrors([])
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    onRemove={remove}
                    onComplete={complete}
                    busy={saving}
                  />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default AdminLearning
