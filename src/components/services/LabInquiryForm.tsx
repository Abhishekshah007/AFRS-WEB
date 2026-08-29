'use client'

import { useContactFormSubmit } from '@/hooks/useContactFormSubmit'

const inputClass =
  'mt-2 w-full h-11 rounded-[8px] border border-[#eadcc0] bg-white px-4 text-[12px] font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15'

export function LabInquiryForm({ serviceOptions }: { serviceOptions: string[] }) {
  const { state, disabled, onSubmit } = useContactFormSubmit({
    successMessage: 'Inquiry received. Our lab team will contact you within 24 hours.',
    mapFormData: (formData) => ({
      fullName: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      mobile: String(formData.get('mobile') || '').trim(),
      subject: String(formData.get('serviceType') || 'Lab inquiry').trim(),
      message: String(formData.get('message') || '').trim(),
    }),
  })

  const buttonLabel =
    state.status === 'submitting'
      ? 'Submitting…'
      : state.status === 'success'
        ? 'Submitted'
        : 'SUBMIT INQUIRY'

  return (
    <form action={onSubmit} className="space-y-4" id="lab-inquiry-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block text-[9px] font-black uppercase tracking-[0.15em] text-[#687487]">
          Full Name
          <input
            name="fullName"
            disabled={disabled}
            className={inputClass}
            placeholder="Your name"
            required
          />
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
        <input
          name="email"
          type="email"
          disabled={disabled}
          className={inputClass}
          placeholder="official@agency.gov"
          required
        />
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
        className="w-full h-12 rounded-[7px] bg-[#081326] hover:bg-slate-950 disabled:opacity-60 text-white text-[11px] font-black uppercase tracking-[0.12em] transition shadow-lg"
      >
        {buttonLabel} +
      </button>
    </form>
  )
}
