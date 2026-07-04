'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap } from 'lucide-react'

type CourseRegistrationDetails = {
  programmeType: 'education' | 'training' | 'other'
  categorySlug?: string
  categoryTitle?: string
  programmeId?: string
  programmeTitle: string
  programmeDuration?: string
  programmeMode?: string
}

type State =
  | { status: 'idle'; message?: string; registrationId?: string }
  | { status: 'submitting'; message?: string; registrationId?: string }
  | { status: 'success'; message: string; registrationId: string }
  | { status: 'error'; message: string; registrationId?: string }

const inputClass =
  'mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--prog-primary)]/40 focus:ring-2 focus:ring-[var(--prog-primary)]/15'

export function CourseRegistrationForm({ details }: { details: CourseRegistrationDetails }) {
  const [state, setState] = useState<State>({ status: 'idle' })
  const disabled = state.status === 'submitting'

  const buttonLabel = useMemo(() => {
    if (state.status === 'submitting') return 'Submitting...'
    if (state.status === 'success') return 'Application Submitted'
    return 'Submit Registration'
  }, [state.status])

  async function onSubmit(formData: FormData) {
    const payload = {
      ...details,
      fullName: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      countryCode: String(formData.get('countryCode') || '+91').trim(),
      mobileNumber: String(formData.get('mobileNumber') || '').trim(),
      organization: String(formData.get('organization') || '').trim(),
      designation: String(formData.get('designation') || '').trim(),
      qualification: String(formData.get('qualification') || '').trim(),
      experienceLevel: String(formData.get('experienceLevel') || '').trim(),
      preferredBatch: String(formData.get('preferredBatch') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    }

    if (!payload.fullName || !payload.email || !payload.mobileNumber || !payload.programmeTitle) {
      setState({
        status: 'error',
        message: 'Please fill Full Name, Email, Mobile Number, and Programme.',
      })
      return
    }

    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/course-registrations/initiate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to submit registration.')

      setState({
        status: 'success',
        message:
          'Registration received. Our team will verify programme availability and share the payment link.',
        registrationId: String(data.registrationId),
      })
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong.',
      })
    }
  }

  return (
    <div className="programmes-page min-h-screen bg-[#f4f6fb]">
      <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[330px_1fr] lg:px-8">
        <aside className="space-y-4">
          <Link
            href="/courses"
            className="text-xs font-bold text-slate-500 hover:text-[var(--prog-primary)]"
          >
            ← Back to Programmes
          </Link>
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-[var(--prog-primary)] to-blue-500 p-6 text-white">
              <BookOpen className="h-8 w-8" />
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">
                Course Registration
              </p>
              <h1 className="mt-2 text-2xl font-extrabold leading-tight">
                {details.programmeTitle}
              </h1>
            </div>
            <div className="space-y-3 p-5 text-sm text-slate-600">
              {details.categoryTitle && (
                <p>
                  <span className="font-bold text-slate-900">Category:</span>{' '}
                  {details.categoryTitle}
                </p>
              )}
              {details.programmeDuration && (
                <p>
                  <span className="font-bold text-slate-900">Duration:</span>{' '}
                  {details.programmeDuration}
                </p>
              )}
              {details.programmeMode && (
                <p>
                  <span className="font-bold text-slate-900">Mode:</span> {details.programmeMode}
                </p>
              )}
            </div>
          </article>

          <article className="rounded-3xl bg-slate-950 p-5 text-white">
            <p className="font-extrabold">Payment note</p>
            <p className="mt-2 text-xs leading-5 text-white/65">
              Stripe checkout can be attached to this record next. For now this form creates a
              verified registration lead with payment status pending.
            </p>
          </article>
        </aside>

        <main>
          <div className="mb-6 grid grid-cols-3 gap-3 text-center text-xs font-bold text-slate-400">
            {[
              ['1', 'Personal Details'],
              ['2', 'Academic Info'],
              ['3', 'Payment'],
            ].map(([num, label], index) => (
              <div key={num} className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    index === 0
                      ? 'border-[var(--prog-primary)] bg-[var(--prog-primary)] text-white'
                      : 'border-slate-300 bg-white text-slate-400'
                  }`}
                >
                  {num}
                </span>
                <span className={index === 0 ? 'text-[var(--prog-primary)]' : ''}>{label}</span>
              </div>
            ))}
          </div>

          <form action={onSubmit} className="space-y-5">
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <GraduationCap className="h-5 w-5 text-[var(--prog-primary)]" />
                <h2 className="text-xl font-extrabold text-slate-950">Personal Information</h2>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500 sm:col-span-2">
                  Full Name *
                  <input name="fullName" disabled={disabled} className={inputClass} required />
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Email Address *
                  <input
                    name="email"
                    type="email"
                    disabled={disabled}
                    className={inputClass}
                    required
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Mobile Number *
                  <div className="mt-2 flex gap-2">
                    <input
                      name="countryCode"
                      defaultValue="+91"
                      disabled={disabled}
                      className="h-11 w-20 rounded-xl border border-slate-200 px-3 text-sm"
                    />
                    <input
                      name="mobileNumber"
                      disabled={disabled}
                      className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-sm"
                      required
                    />
                  </div>
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500 sm:col-span-2">
                  College / Organization
                  <input name="organization" disabled={disabled} className={inputClass} />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <CheckCircle2 className="h-5 w-5 text-[var(--prog-primary)]" />
                <h2 className="text-xl font-extrabold text-slate-950">Academic Details</h2>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Designation
                  <input name="designation" disabled={disabled} className={inputClass} />
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Qualification
                  <input name="qualification" disabled={disabled} className={inputClass} />
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Experience Level
                  <select
                    name="experienceLevel"
                    disabled={disabled}
                    className={inputClass}
                    defaultValue="student"
                  >
                    <option value="student">Student</option>
                    <option value="beginner">Beginner</option>
                    <option value="professional">Working Professional</option>
                    <option value="faculty">Faculty / Researcher</option>
                  </select>
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Preferred Batch
                  <input
                    name="preferredBatch"
                    disabled={disabled}
                    className={inputClass}
                    placeholder="Weekend / Next available"
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500 sm:col-span-2">
                  Message
                  <textarea
                    name="message"
                    disabled={disabled}
                    className={`${inputClass} min-h-28 resize-y py-3`}
                    placeholder="Anything we should know before contacting you?"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              {state.status !== 'idle' && (
                <p
                  className={`mb-4 rounded-2xl px-4 py-3 text-sm ${
                    state.status === 'success'
                      ? 'bg-emerald-50 text-emerald-700'
                      : state.status === 'error'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  {state.message}
                  {state.status === 'success' && (
                    <span className="block pt-1 font-bold">
                      Registration ID: {state.registrationId}
                    </span>
                  )}
                </p>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Amount
                  </p>
                  <p className="text-2xl font-extrabold text-slate-950">To be confirmed</p>
                </div>
                <button
                  type="submit"
                  disabled={disabled || state.status === 'success'}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--prog-primary)] px-8 text-sm font-bold text-white transition hover:bg-[var(--prog-primary-hover)] disabled:opacity-60"
                >
                  {buttonLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>
    </div>
  )
}
