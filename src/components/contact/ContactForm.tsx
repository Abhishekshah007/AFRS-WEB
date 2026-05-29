'use client'

import { useMemo, useState } from 'react'

type State =
  | { status: 'idle'; message?: string }
  | { status: 'submitting'; message?: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

export function ContactForm() {
  const [state, setState] = useState<State>({ status: 'idle' })

  const disabled = state.status === 'submitting'

  const buttonLabel = useMemo(() => {
    if (state.status === 'submitting') return 'Sending...'
    if (state.status === 'success') return 'Sent'
    return 'Send Message'
  }, [state.status])

  async function onSubmit(formData: FormData) {
    const fullName = String(formData.get('fullName') || '').trim()
    const mobile = String(formData.get('mobile') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const subject = String(formData.get('subject') || '').trim()
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
        body: JSON.stringify({ fullName, mobile, email, subject, message }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || 'Failed to send message')
      }

      setState({ status: 'success', message: 'Message sent successfully. We will contact you soon.' })
    } catch (e) {
      setState({ status: 'error', message: e instanceof Error ? e.message : 'Something went wrong' })
    }
  }

  return (
    <form
      action={onSubmit}
      className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8"
    >
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <span className="text-indigo-600">✦</span>
        Send a Message
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-xs font-semibold text-slate-600">
          FULL NAME
          <input
            name="fullName"
            disabled={disabled}
            className="mt-2 w-full h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </label>
        <label className="text-xs font-semibold text-slate-600">
          MOBILE NO.
          <input
            name="mobile"
            disabled={disabled}
            className="mt-2 w-full h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300"
            placeholder="+91 00000 00000"
            autoComplete="tel"
          />
        </label>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
          EMAIL ADDRESS
          <input
            name="email"
            type="email"
            disabled={disabled}
            className="mt-2 w-full h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
          SUBJECT
          <input
            name="subject"
            disabled={disabled}
            className="mt-2 w-full h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300"
            placeholder="How can we help?"
          />
        </label>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
          MESSAGE
          <textarea
            name="message"
            disabled={disabled}
            className="mt-2 w-full min-h-28 rounded-lg border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 resize-y"
            placeholder="Write your message..."
            required
          />
        </label>
      </div>

      {state.status !== 'idle' && (
        <p
          className={`mt-4 text-sm ${
            state.status === 'success' ? 'text-emerald-600' : state.status === 'error' ? 'text-rose-600' : 'text-slate-500'
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 inline-flex w-full h-12 items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-bold transition"
      >
        {buttonLabel} <span className="ml-2" aria-hidden>→</span>
      </button>
    </form>
  )
}

