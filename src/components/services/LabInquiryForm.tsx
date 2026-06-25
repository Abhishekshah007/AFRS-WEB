'use client'

import { useMemo, useState } from 'react'

type State =
  | { status: 'idle'; message?: string }
  | { status: 'submitting'; message?: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

const inputClass =
  'mt-2 w-full h-11 rounded-[8px] border border-[#e4ebf4] bg-white px-4 text-[12px] font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/15'

export function LabInquiryForm({ serviceOptions }: { serviceOptions: string[] }) {
  const [state, setState] = useState<State>({ status: 'idle' })
  const disabled = state.status === 'submitting'

  const buttonLabel = useMemo(() => {
    if (state.status === 'submitting') return 'Submitting…'
    if (state.status === 'success') return 'Submitted'
    return 'SUBMIT INQUIRY'
  }, [state.status])

  async function onSubmit(formData: FormData) {
    const fullName = String(formData.get('fullName') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const mobile = String(formData.get('mobile') || '').trim()
    const subject = String(formData.get('serviceType') || 'Lab inquiry').trim()
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
      if (!res.ok) throw new Error(await res.text().catch(() => 'Failed to send'))
      setState({ status: 'success', message: 'Inquiry received. Our lab team will contact you within 24 hours.' })
    } catch (e) {
      setState({ status: 'error', message: e instanceof Error ? e.message : 'Something went wrong' })
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block text-[9px] font-black uppercase tracking-[0.15em] text-[#687487]">
          Full Name
          <input name="fullName" disabled={disabled} className={inputClass} placeholder="Your name" required />
        </label>
        <label className="block text-[9px] font-black uppercase tracking-[0.15em] text-[#687487]">
          Case Type
          <select
            name="serviceType"
            disabled={disabled}
            className={inputClass}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Fingerprint Verification
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-[9px] font-black uppercase tracking-[0.15em] text-[#687487]">
        Email Address
        <input name="email" type="email" disabled={disabled} className={inputClass} placeholder="official@agency.gov" required />
      </label>

      <label className="block text-[9px] font-black uppercase tracking-[0.15em] text-[#687487]">
        Brief Message / Report
        <textarea
          name="message"
          disabled={disabled}
          className={`${inputClass} min-h-[105px] resize-y py-3`}
          placeholder="Details of evidence or inquiry..."
          required
        />
      </label>

      <input name="mobile" type="hidden" value="" />

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
        className="w-full h-12 rounded-[7px] bg-[#081326] hover:bg-slate-950 disabled:opacity-60 text-white text-[11px] font-black uppercase tracking-[0.12em] transition shadow-lg"
      >
        {buttonLabel} +
      </button>
    </form>
  )
}
