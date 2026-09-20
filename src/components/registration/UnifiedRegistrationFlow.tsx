'use client'

import { useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DynamicFormFields } from '@/components/forms/DynamicFormFields'
import { PaymentInstructionsPanel } from '@/components/forms/PaymentInstructionsPanel'
import type {
  FeeTier,
  ParticipantRegion,
  PaymentMode,
  ResolvedRegistrationConfig,
} from '@/domain/registration/types'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { validateCustomResponses } from '@/lib/forms/dynamicFormTypes'
import {
  feeTiersForRegion,
  filterPaymentMethodsByRegion,
  formatFeeAmount,
} from '@/lib/registration/resolveConfig'

type ContactFormState = {
  fullName: string
  email: string
  countryCode: string
  mobileNumber: string
  organization: string
  designation: string
  qualification: string
  preferredBatch: string
  message: string
}

type Props = {
  variant: 'event' | 'course'
  /** When true, only CMS-defined sections are shown (no hardcoded personal info blocks). */
  cmsFormOnly?: boolean
  config: ResolvedRegistrationConfig
  feeTiers: FeeTier[]
  customSections?: DynamicFormSection[]
  includeKitOption?: boolean
  kitPrice?: number
  sidebar?: ReactNode
  backLink: { href: string; label: string }
  /** Single multipart submit (events). */
  submitEndpoint?: string
  initiateEndpoint?: string
  completeEndpoint?: string
  confirmationPath: (registrationId: string) => string
  eventSlug?: string
  buildInitiatePayload?: (input: {
    form: ContactFormState
    selectedTier: FeeTier | undefined
    participantRegion: 'indian' | 'international'
    customResponses: Record<string, string>
    includeKit: boolean
    agreedToTerms: boolean
  }) => Record<string, unknown>
}

const inputClass =
  'w-full h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

export function UnifiedRegistrationFlow({
  variant,
  cmsFormOnly = false,
  config,
  feeTiers,
  customSections = [],
  includeKitOption = false,
  kitPrice = 0,
  sidebar,
  backLink,
  submitEndpoint,
  initiateEndpoint,
  completeEndpoint,
  confirmationPath,
  eventSlug,
  buildInitiatePayload,
}: Props) {
  const router = useRouter()
  const isPaid = config.registrationType !== 'free'
  const showPayment = isPaid && config.requirePaymentProof

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [participantRegion, setParticipantRegion] = useState<'indian' | 'international'>(
    config.participantRegion === 'international' ? 'international' : 'indian',
  )
  const [customResponses, setCustomResponses] = useState<Record<string, string>>({})
  const [customFiles, setCustomFiles] = useState<Record<string, File | null>>({})
  const [includeKit, setIncludeKit] = useState(false)
  const [selectedTierId, setSelectedTierId] = useState(feeTiers[0]?.id || '')
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('upi')
  const [paymentForm, setPaymentForm] = useState({
    transactionId: '',
    transactionDate: '',
    transactionTime: '',
    transactionProof: null as File | null,
  })
  const [form, setForm] = useState<ContactFormState>({
    fullName: '',
    email: '',
    countryCode: '+91',
    mobileNumber: '',
    organization: '',
    designation: '',
    qualification: '',
    preferredBatch: '',
    message: '',
  })

  const activeRegion: ParticipantRegion =
    config.participantRegion === 'both' ? participantRegion : config.participantRegion

  const visibleTiers = useMemo(
    () => feeTiersForRegion(feeTiers, activeRegion),
    [feeTiers, activeRegion],
  )

  const selectedTier = useMemo(
    () => visibleTiers.find((tier) => tier.id === selectedTierId) || visibleTiers[0],
    [visibleTiers, selectedTierId],
  )

  const total = (selectedTier?.amount || 0) + (includeKit && includeKitOption ? kitPrice : 0)

  const paymentConfigForRegion = useMemo(
    () => ({
      ...config.payment,
      paymentMethods: filterPaymentMethodsByRegion(
        config.payment.paymentMethods,
        activeRegion === 'international' ? 'international' : 'indian',
      ),
    }),
    [config.payment, activeRegion],
  )

  const validate = () => {
    if (cmsFormOnly && !customSections.length) {
      setError('Registration form is not set up for this event yet. Please contact the organizer.')
      return false
    }

    if (!cmsFormOnly) {
      if (!form.fullName || !form.email || !form.mobileNumber) {
        setError('Please fill all required contact fields.')
        return false
      }
    }

    if (config.requireAgreement && !agreedToTerms) {
      setError('Please read and accept the registration instructions.')
      return false
    }

    if (isPaid && visibleTiers.length > 0 && !selectedTier) {
      setError('Please select a registration category.')
      return false
    }

    const customError = validateCustomResponses(customSections, customResponses, customFiles)
    if (customError) {
      setError(customError)
      return false
    }

    if (showPayment) {
      if (!paymentForm.transactionId.trim()) {
        setError('Please enter your transaction reference.')
        return false
      }
      if (!paymentForm.transactionDate || !paymentForm.transactionTime) {
        setError('Please enter transaction date and time.')
        return false
      }
      if (!paymentForm.transactionProof) {
        setError('Please upload your payment screenshot / proof.')
        return false
      }
    }

    setError('')
    return true
  }

  const submitEventForm = async () => {
    if (!submitEndpoint || !eventSlug) return
    const body = new FormData()
    body.set('eventSlug', eventSlug)
    body.set('registrationCategoryId', selectedTier?.id || '')
    body.set('participantRegion', activeRegion === 'international' ? 'international' : 'indian')
    body.set('includeKit', String(includeKit))
    body.set('agreedToTerms', String(agreedToTerms))
    body.set('paymentMode', paymentMode)

    Object.entries(customResponses).forEach(([key, value]) => {
      body.set(`custom_${key}`, value)
    })
    Object.entries(customFiles).forEach(([key, file]) => {
      if (file) body.set(`customFile_${key}`, file)
    })

    if (paymentForm.transactionId) body.set('transactionId', paymentForm.transactionId.trim())
    if (paymentForm.transactionDate) body.set('transactionDate', paymentForm.transactionDate)
    if (paymentForm.transactionTime) body.set('transactionTime', paymentForm.transactionTime)
    if (paymentForm.transactionProof) body.set('transactionProof', paymentForm.transactionProof)

    const res = await fetch(submitEndpoint, { method: 'POST', body })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Unable to submit registration')
    router.push(data.redirectTo || confirmationPath(String(data.registrationId)))
  }

  const submitCourseForm = async () => {
    if (!initiateEndpoint || !buildInitiatePayload) return

    const res = await fetch(initiateEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        buildInitiatePayload({
          form,
          selectedTier,
          participantRegion: activeRegion === 'international' ? 'international' : 'indian',
          customResponses,
          includeKit,
          agreedToTerms,
        }),
      ),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Unable to submit registration')

    const registrationId = String(data.registrationId)
    if (!showPayment || data.isFree) {
      router.push(data.redirectTo || confirmationPath(registrationId))
      return
    }

    if (!completeEndpoint) {
      router.push(confirmationPath(registrationId))
      return
    }

    const body = new FormData()
    body.set('registrationId', registrationId)
    body.set('transactionId', paymentForm.transactionId.trim())
    body.set('paymentMode', paymentMode)
    body.set('transactionDate', paymentForm.transactionDate)
    body.set('transactionTime', paymentForm.transactionTime)
    if (paymentForm.transactionProof) body.set('transactionProof', paymentForm.transactionProof)

    const completeRes = await fetch(completeEndpoint, { method: 'POST', body })
    const completeData = await completeRes.json()
    if (!completeRes.ok) throw new Error(completeData.error || 'Unable to submit payment details')
    router.push(completeData.redirectTo || confirmationPath(registrationId))
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    setError('')
    try {
      if (submitEndpoint) {
        await submitEventForm()
      } else {
        await submitCourseForm()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-10">
      <div className="text-xs text-slate-500 flex gap-2 items-center mb-6">
        <Link href={backLink.href} className="hover:text-brand-600">
          ← {backLink.label}
        </Link>
        <span>/</span>
        <span className="text-slate-700">Registration</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] items-start">
        {sidebar ? <aside className="space-y-4">{sidebar}</aside> : null}

        <main className="space-y-5">
          {config.requireAgreement && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-xl">
                  1. Registration Instructions
                </h3>
                <p className="mt-2 text-sm text-red-600 font-semibold">
                  Please read carefully before filling the form.
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 whitespace-pre-line">
                {config.instructions}
              </div>
              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span>
                  I have read, understood, and agree to all instructions, terms and conditions, and
                  the non-refundable policy of Applied Forensic Research Sciences.
                </span>
              </label>
            </section>
          )}

          {config.participantRegion === 'both' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <h3 className="font-extrabold text-slate-900">
                {config.requireAgreement ? '2. Participant Type' : '1. Participant Type'}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {(['indian', 'international'] as const).map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => {
                      setParticipantRegion(region)
                      const nextTiers = feeTiersForRegion(feeTiers, region)
                      setSelectedTierId(nextTiers[0]?.id || '')
                    }}
                    className={`rounded-xl border p-4 text-left ${participantRegion === region ? 'border-brand-500 bg-brand-50' : 'border-slate-200'}`}
                  >
                    <p className="font-bold text-sm text-slate-900">
                      {region === 'indian' ? 'Indian Participants' : 'International Participants'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {region === 'indian'
                        ? 'INR fees, UPI / bank transfer'
                        : 'USD fees, PayPal / international payment'}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {!cmsFormOnly && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
              <h3 className="font-extrabold text-slate-900">Your details</h3>
              <input
                className={inputClass}
                placeholder="Full Name *"
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="Email *"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                />
                <div className="flex gap-2">
                  <input
                    className="h-11 w-20 rounded-xl border border-slate-200 px-2 text-sm"
                    value={form.countryCode}
                    onChange={(e) => setForm((p) => ({ ...p, countryCode: e.target.value }))}
                  />
                  <input
                    className="h-11 flex-1 rounded-xl border border-slate-200 px-3 text-sm"
                    placeholder="Mobile Number *"
                    value={form.mobileNumber}
                    onChange={(e) => setForm((p) => ({ ...p, mobileNumber: e.target.value }))}
                  />
                </div>
              </div>
              {variant === 'course' && (
                <>
                  <input
                    className={inputClass}
                    placeholder="Organization"
                    value={form.organization}
                    onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))}
                  />
                  <textarea
                    className={`${inputClass} min-h-24 py-3`}
                    placeholder="Message (optional)"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />
                </>
              )}
            </section>
          )}

          {customSections.length > 0 ? (
            <div className="space-y-2">
              <h3 className="font-extrabold text-slate-900 px-1">
                {cmsFormOnly
                  ? config.requireAgreement
                    ? '2. Your details'
                    : '1. Your details'
                  : 'Additional information'}
              </h3>
              <DynamicFormFields
                sections={customSections}
                values={customResponses}
                files={customFiles}
                onChange={(name, value) =>
                  setCustomResponses((prev) => ({ ...prev, [name]: value }))
                }
                onFileChange={(name, file) => setCustomFiles((prev) => ({ ...prev, [name]: file }))}
                disabled={loading}
              />
            </div>
          ) : cmsFormOnly ? (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              Registration fields have not been added in the CMS for this event yet. Please contact
              AFRS support.
            </section>
          ) : null}

          {visibleTiers.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
              <h3 className="font-extrabold text-slate-900">
                {isPaid ? 'Registration fees' : 'Registration category'}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {visibleTiers.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`text-left rounded-xl border p-4 ${selectedTierId === tier.id ? 'border-brand-500 bg-brand-50' : 'border-slate-200'}`}
                  >
                    <p className="font-bold text-slate-800 text-sm">{tier.label}</p>
                    {tier.description ? (
                      <p className="text-xs text-slate-500">{tier.description}</p>
                    ) : null}
                    <p className="mt-2 text-xl font-extrabold text-brand-700">
                      {isPaid ? formatFeeAmount(tier.amount, tier.currency) : 'Free'}
                    </p>
                  </button>
                ))}
              </div>
              {includeKitOption && isPaid && (
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={includeKit}
                    onChange={(e) => setIncludeKit(e.target.checked)}
                  />
                  Include Workshop Kit (+{formatFeeAmount(kitPrice, 'INR')})
                </label>
              )}
            </section>
          )}

          {showPayment && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-extrabold text-slate-900 text-xl">Payment</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Pay using the details below, then fill in your transaction details and upload
                  proof. You can also upload any screenshots requested above in the same submission.
                </p>
              </div>

              <PaymentInstructionsPanel
                config={paymentConfigForRegion}
                amount={total}
                currency={selectedTier?.currency || 'INR'}
                participantRegion={activeRegion === 'international' ? 'international' : 'indian'}
              />

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Payment mode *
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {(activeRegion === 'international'
                    ? (['paypal', 'bank'] as PaymentMode[])
                    : (['upi', 'bank'] as PaymentMode[])
                  ).map((mode) => (
                    <label
                      key={mode}
                      className={`flex items-center gap-2 rounded-xl border p-3 text-sm cursor-pointer ${paymentMode === mode ? 'border-brand-500 bg-brand-50' : 'border-slate-200'}`}
                    >
                      <input
                        type="radio"
                        name="paymentMode"
                        checked={paymentMode === mode}
                        onChange={() => setPaymentMode(mode)}
                      />
                      {mode === 'upi' ? 'UPI' : mode === 'bank' ? 'Bank Transfer' : 'PayPal'}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500 sm:col-span-2">
                  Transaction / UPI reference *
                  <input
                    className={`${inputClass} mt-2`}
                    value={paymentForm.transactionId}
                    onChange={(e) =>
                      setPaymentForm((p) => ({ ...p, transactionId: e.target.value }))
                    }
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Transaction date *
                  <input
                    type="date"
                    className={`${inputClass} mt-2`}
                    value={paymentForm.transactionDate}
                    onChange={(e) =>
                      setPaymentForm((p) => ({ ...p, transactionDate: e.target.value }))
                    }
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Transaction time *
                  <input
                    type="time"
                    className={`${inputClass} mt-2`}
                    value={paymentForm.transactionTime}
                    onChange={(e) =>
                      setPaymentForm((p) => ({ ...p, transactionTime: e.target.value }))
                    }
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500 sm:col-span-2">
                  Upload payment screenshot *
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className={`${inputClass} mt-2`}
                    onChange={(e) =>
                      setPaymentForm((p) => ({
                        ...p,
                        transactionProof: e.target.files?.[0] || null,
                      }))
                    }
                  />
                </label>
              </div>
            </section>
          )}

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <p className="text-xs text-slate-500">TOTAL</p>
              <p className="text-3xl font-extrabold text-slate-900">
                {isPaid ? formatFeeAmount(total, selectedTier?.currency || 'INR') : 'Free'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="h-12 px-8 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold disabled:opacity-60"
            >
              {loading ? 'Submitting…' : 'Submit registration'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
