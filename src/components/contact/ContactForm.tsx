'use client'

import { useContactFormSubmit } from '@/hooks/useContactFormSubmit'

export function ContactForm() {
  const { state, disabled, buttonLabel, onSubmit } = useContactFormSubmit({
    mapFormData: (formData) => ({
      fullName: String(formData.get('fullName') || '').trim(),
      mobile: String(formData.get('mobile') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      subject: String(formData.get('subject') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      formType: 'contact',
    }),
  })

  return (
    <form
      action={onSubmit}
      className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8"
    >
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <span className="text-brand-600">✦</span>
        Send a Message
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-xs font-semibold text-slate-600">
          FULL NAME
          <input
            name="fullName"
            disabled={disabled}
            className="mt-2 w-full h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-300"
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
            className="mt-2 w-full h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-300"
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
            className="mt-2 w-full h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-300"
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
            className="mt-2 w-full h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-300"
            placeholder="How can we help?"
          />
        </label>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
          MESSAGE
          <textarea
            name="message"
            disabled={disabled}
            className="mt-2 w-full min-h-28 rounded-lg border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-300 resize-y"
            placeholder="Write your message..."
            required
          />
        </label>
      </div>

      {state.status !== 'idle' && (
        <p
          className={`mt-4 text-sm ${
            state.status === 'success'
              ? 'text-emerald-600'
              : state.status === 'error'
                ? 'text-rose-600'
                : 'text-slate-500'
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 h-11 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold disabled:opacity-60"
      >
        {buttonLabel}
      </button>
    </form>
  )
}
