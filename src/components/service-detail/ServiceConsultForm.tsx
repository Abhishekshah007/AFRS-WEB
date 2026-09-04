'use client'

import type { SubmissionFormType } from '@/fields/submissionExport'
import { useContactFormSubmit } from '@/hooks/useContactFormSubmit'

const inputClass =
  'mt-2 w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[var(--svc-primary)] focus:ring-2 focus:ring-[var(--svc-primary)]/20'

export type ServiceConsultFormProps = {
  serviceTitle: string
  serviceSlug?: string
  formType?: SubmissionFormType
  caseTypes?: string[]
  submitLabel?: string
}

/** Consultation form — posts to contactMessages with typed form metadata. */
export function ServiceConsultForm({
  serviceTitle,
  serviceSlug,
  formType = 'serviceConsult',
  caseTypes = ['New case', 'Ongoing investigation', 'Expert opinion', 'Training inquiry'],
  submitLabel = 'Send Message',
}: ServiceConsultFormProps) {
  const { state, disabled, onSubmit } = useContactFormSubmit({
    successMessage:
      formType === 'legalConsultancy'
        ? 'Consultancy request received. Our legal team will contact you shortly.'
        : 'Message sent. An expert will contact you shortly.',
    mapFormData: (formData) => {
      const fullName = String(formData.get('fullName') || '').trim()
      const email = String(formData.get('email') || '').trim()
      const caseType = String(formData.get('caseType') || serviceTitle).trim()
      const message = String(formData.get('message') || '').trim()
      return {
        fullName,
        email,
        subject: `${serviceTitle} — ${caseType}`,
        caseType,
        serviceSlug,
        message,
        formType,
      }
    },
  })

  const buttonLabel =
    state.status === 'submitting' ? 'Sending…' : state.status === 'success' ? 'Sent' : submitLabel

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        {formType === 'legalConsultancy' ? 'Consultancy Type' : 'Select Case Type'}
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
          className={`${inputClass} min-h-[120px] resize-y py-3`}
          placeholder={
            formType === 'legalConsultancy'
              ? 'Describe your legal or medico-legal requirement…'
              : 'Describe your case or question…'
          }
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
