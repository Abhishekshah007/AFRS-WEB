'use client'

import { useMemo, useState } from 'react'

type State =
  | { status: 'idle'; message?: string }
  | { status: 'submitting'; message?: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

const inputClass =
  'mt-2 w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[var(--svc-primary)] focus:ring-2 focus:ring-[var(--svc-primary)]/20'

export type ServiceConsultFormProps = {
  serviceTitle: string
  caseTypes?: string[]
}

/**
 * Consultation form — posts to contactMessages with service pre-filled as subject.
 */
export function ServiceConsultForm({
  serviceTitle,
  caseTypes = ['New case', 'Ongoing investigation', 'Expert opinion', 'Training inquiry'],
}: ServiceConsultFormProps) {
  const [state, setState] = useState<State>({ status: 'idle' })
  const disabled = state.status === 'submitting'

  const buttonLabel = useMemo(() => {
    if (state.status === 'submitting') return 'Sending…'
    if (state.status === 'success') return 'Sent'
    return 'Send Message'
  }, [state.status])

  async function onSubmit(formData: FormData) {
    const fullName = String(formData.get('fullName') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const caseType = String(formData.get('caseType') || serviceTitle).trim()
    const message = String(formData.get('message') || '').trim()

    if (!fullName || !email || !message) {
      setState({ status: 'error', message: 'Please fill Full Name, Email, and Message.' })
      return
    }

    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/contactMessages', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          subject: `${serviceTitle} — ${caseType}`,
          message,
        }),
      })
      if (!res.ok) throw new Error(await res.text().catch(() => 'Failed to send'))
      setState({ status: 'success', message: 'Message sent. An expert will contact you shortly.' })
    } catch (e) {
      setState({ status: 'error', message: e instanceof Error ? e.message : 'Something went wrong' })
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Full Name
          <input name="fullName" disabled={disabled} className={inputClass} required autoComplete="name" />
        </label>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Email Address
          <input name="email" type="email" disabled={disabled} className={inputClass} required autoComplete="email" />
        </label>
      </div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Select Case Type
        <select name="caseType" disabled={disabled} className={inputClass} defaultValue={caseTypes[0]}>
          {caseTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Write Message
        <textarea
          name="message"
          disabled={disabled}
          className={`${inputClass} min-h-[120px] py-3 resize-y`}
          placeholder="Describe your case or question…"
          required
        />
      </label>
      {state.status !== 'idle' && (
        <p
          className={`text-sm ${
            state.status === 'success' ? 'text-emerald-600' : state.status === 'error' ? 'text-rose-600' : 'text-slate-500'
          }`}
        >
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={disabled}
        className="w-full h-12 rounded-xl bg-[var(--svc-primary)] hover:bg-[var(--svc-primary-hover)] disabled:opacity-60 text-white text-sm font-bold transition shadow-md"
      >
        {buttonLabel}
      </button>
    </form>
  )
}
