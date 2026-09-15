import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { TYPES, statusesFor, acceptsProgress } from '../../lib/learningTypes'

const EMPTY = {
  title: '',
  type: 'study',
  status: 'studying',
  progress: '',
  author: '',
  publisher: '',
  started_at: '',
  completed_at: '',
  tags: '',
  external_url: '',
  repository_url: '',
  cover_url: '',
  description: '',
}

/** Converte o item da API no formato de inputs controlados (tudo string). */
function toForm(item) {
  if (!item) return EMPTY
  return {
    title: item.title ?? '',
    type: item.type ?? 'study',
    status: item.status ?? 'studying',
    progress: item.progress === null || item.progress === undefined ? '' : String(item.progress),
    author: item.author ?? '',
    publisher: item.publisher ?? '',
    started_at: item.started_at ?? '',
    completed_at: item.completed_at ?? '',
    tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
    external_url: item.external_url ?? '',
    repository_url: item.repository_url ?? '',
    cover_url: item.cover_url ?? '',
    description: item.description ?? '',
  }
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="admin-label">
        {label}
        {hint && <span className="normal-case tracking-normal text-gray-600"> ({hint})</span>}
      </span>
      {children}
    </label>
  )
}

function ItemForm({ editing, onSubmit, onCancel, saving, errors }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(() => toForm(editing))

  useEffect(() => {
    setForm(toForm(editing))
  }, [editing])

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const statusOptions = statusesFor(form.type)
  const mostraProgresso = acceptsProgress(form.type)
  const ehLivro = form.type === 'book'

  // Trocar o tipo pode invalidar o status atual (livro nao fica "estudando"),
  // entao o status cai para o primeiro valido do tipo novo.
  const setType = (event) => {
    const type = event.target.value
    setForm((prev) => {
      const validos = statusesFor(type)
      return {
        ...prev,
        type,
        status: validos.includes(prev.status) ? prev.status : validos[0],
        progress: acceptsProgress(type) ? prev.progress : '',
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Strings vazias viram null para o banco não guardar "" onde cabe NULL.
    const clean = (value) => (value.trim() === '' ? null : value.trim())
    onSubmit({
      title: form.title.trim(),
      type: form.type,
      status: form.status,
      progress: form.progress.trim() === '' ? null : Number(form.progress),
      author: clean(form.author),
      publisher: clean(form.publisher),
      started_at: clean(form.started_at),
      completed_at: clean(form.completed_at),
      tags: form.tags,
      external_url: clean(form.external_url),
      repository_url: clean(form.repository_url),
      cover_url: clean(form.cover_url),
      description: clean(form.description),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card-soft rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-lg font-semibold text-white tracking-tight">
        {editing ? t.admin.editItem : t.admin.newItem}
      </h2>

      <Field label={t.admin.fields.title}>
        <input
          className="admin-field"
          value={form.title}
          onChange={set('title')}
          required
          maxLength={200}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.admin.fields.type}>
          <select className="admin-field" value={form.type} onChange={setType}>
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {t.learning.types[type]}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.admin.fields.status}>
          <select className="admin-field" value={form.status} onChange={set('status')}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {t.learning.statusByType?.[form.type]?.[status] || t.learning.statuses[status]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.admin.fields.author}>
          <input className="admin-field" value={form.author} onChange={set('author')} />
        </Field>

        {ehLivro ? (
          <Field label={t.admin.fields.publisher}>
            <input className="admin-field" value={form.publisher} onChange={set('publisher')} />
          </Field>
        ) : (
          <span />
        )}
      </div>

      {/* Progresso so para o que tem fim mensuravel: assunto aberto nao tem 100%. */}
      {mostraProgresso && (
        <Field label={t.admin.fields.progress} hint="0-100">
          <input
            className="admin-field"
            type="number"
            min={0}
            max={100}
            value={form.progress}
            onChange={set('progress')}
            placeholder="65"
          />
        </Field>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.admin.fields.startedAt}>
          <input
            className="admin-field"
            type="date"
            value={form.started_at}
            onChange={set('started_at')}
          />
        </Field>

        <Field label={t.admin.fields.completedAt}>
          <input
            className="admin-field"
            type="date"
            value={form.completed_at}
            onChange={set('completed_at')}
          />
        </Field>
      </div>

      <Field label={t.admin.fields.tags} hint={t.admin.fields.tagsHint}>
        <input
          className="admin-field"
          value={form.tags}
          onChange={set('tags')}
          placeholder="Responsible AI, Evals"
        />
      </Field>

      <Field label={t.admin.fields.externalUrl}>
        <input
          className="admin-field"
          type="url"
          value={form.external_url}
          onChange={set('external_url')}
          placeholder="https://"
        />
      </Field>

      <Field label={t.admin.fields.repositoryUrl}>
        <input
          className="admin-field"
          type="url"
          value={form.repository_url}
          onChange={set('repository_url')}
          placeholder="https://github.com/..."
        />
      </Field>

      {ehLivro && (
        <Field label={t.admin.fields.coverUrl}>
          <input
            className="admin-field"
            type="url"
            value={form.cover_url}
            onChange={set('cover_url')}
            placeholder="https://"
          />
        </Field>
      )}

      <Field label={t.admin.fields.description}>
        <textarea
          className="admin-field resize-y min-h-[88px]"
          value={form.description}
          onChange={set('description')}
          maxLength={2000}
        />
      </Field>

      {errors.length > 0 && (
        <ul className="text-sm text-pink-vibrant space-y-1 border border-pink-vibrant/25 bg-pink-vibrant/5 rounded-lg px-4 py-3">
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="btn-gradient px-6 py-2.5 rounded-full text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{saving ? t.admin.actions.saving : t.admin.actions.save}</span>
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-ghost px-5 py-2.5 rounded-full text-sm font-medium"
          >
            {t.admin.actions.cancel}
          </button>
        )}
      </div>
    </form>
  )
}

export default ItemForm
