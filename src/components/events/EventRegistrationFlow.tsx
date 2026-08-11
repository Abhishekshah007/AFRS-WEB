'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PaymentInstructionsPanel } from '@/components/forms/PaymentInstructionsPanel'
import type { RegistrationPaymentConfig } from '@/domain/registration/types'

type EventCategory = {
  id: string
  categoryName: string
  price: number
  description?: string | null
}

type EventRegistrationData = {
  slug: string
  title: string
  banner: string
  eventType: string
  mode: string
  dateLabel: string
  timeLabel: string
  locationLabel: string
  description: string
  includeKitOption: boolean
  kitPrice: number
  categories: EventCategory[]
}

type Props = {
  event: EventRegistrationData
  paymentConfig: RegistrationPaymentConfig
}

const inputClass = 'w-full h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

export function EventRegistrationFlow({ event, paymentConfig }: Props) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [registrationId, setRegistrationId] = useState('')
  const [paymentForm, setPaymentForm] = useState({
    transactionId: '',
    transactionDate: '',
    transactionTime: '',
    transactionProof: null as File | null,
  })
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    mobileNumber: '',
    organization: '',
    designation: '',
    areaOfInterest: 'Crime Scene Investigation',
    includeKit: false,
    idProofFileName: '',
    idProofFileSize: 0,
  })
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    event.categories[0]?.id || '',
  )
  const [error, setError] = useState('')

  const selectedCategory = useMemo(
    () => event.categories.find((c) => c.id === selectedCategoryId),
    [event.categories, selectedCategoryId],
  )
  const total =
    (selectedCategory?.price || 0) +
    (form.includeKit && event.includeKitOption ? event.kitPrice : 0)

  const onFileChange = (file: File | null) => {
    setForm((prev) => ({
      ...prev,
      idProofFileName: file?.name || '',
      idProofFileSize: file?.size || 0,
    }))
  }

  const validateStepOne = () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.mobileNumber ||
      !form.organization ||
      !form.designation ||
      !form.areaOfInterest ||
      !selectedCategoryId
    ) {
      setError('Please fill all required fields.')
      return false
    }
    setError('')
    return true
  }

  const initiateRegistration = async () => {
    if (!validateStepOne()) return
    setLoading(true)
    try {
      const res = await fetch('/api/event-registrations/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          eventSlug: event.slug,
          registrationCategoryId: selectedCategoryId,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to continue')
      setRegistrationId(String(data.registrationId))
      setStep(2)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const submitPaymentDetails = async () => {
    if (!registrationId) return
    if (!paymentForm.transactionId.trim()) {
      setError('Please enter your UPI / bank transaction reference.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const body = new FormData()
      body.set('registrationId', registrationId)
      body.set('transactionId', paymentForm.transactionId.trim())
      if (paymentForm.transactionDate) body.set('transactionDate', paymentForm.transactionDate)
      if (paymentForm.transactionTime) body.set('transactionTime', paymentForm.transactionTime)
      if (paymentForm.transactionProof) body.set('transactionProof', paymentForm.transactionProof)

      const res = await fetch('/api/event-registrations/complete', {
        method: 'POST',
        body,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to submit payment details')
      router.push(data.redirectTo)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-10">
      <div className="text-xs text-slate-500 flex gap-2 items-center mb-6">
        <Link href="/events" className="hover:text-indigo-600">
          ← Back to Events
        </Link>
        <span>/</span>
        <span className="text-slate-700">Registration</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] items-start">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="relative h-40">
              <Image src={event.banner} alt={event.title} fill className="object-cover" />
            </div>
            <div className="p-4 space-y-3">
              <p className="text-[10px] font-bold uppercase text-indigo-600">{event.eventType}</p>
              <h2 className="text-[30px] leading-tight font-extrabold text-slate-900">
                {event.title}
              </h2>
              <p className="text-sm text-slate-600">📅 {event.dateLabel}</p>
              <p className="text-sm text-slate-600">🕐 {event.timeLabel}</p>
              <p className="text-sm text-slate-600">📍 {event.locationLabel}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{event.description}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-4 text-white">
            <p className="font-bold">Need Help?</p>
            <p className="text-xs mt-2 text-indigo-100">
              Facing issues with registration? Contact support.
            </p>
            <Link href="/contact" className="inline-block mt-3 text-sm font-semibold">
              Contact Support
            </Link>
          </div>
        </aside>

        <main className="space-y-5">
          <div className="flex items-center gap-3 text-xs">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div
                  className={`h-7 w-7 rounded-full border text-center leading-7 font-bold ${step >= s ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-500'}`}
                >
                  {s}
                </div>
                {s < 2 ? <div className="h-[2px] bg-slate-200 flex-1" /> : null}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="font-extrabold text-slate-900">Personal Information</h3>
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
                <input
                  className={inputClass}
                  placeholder="University / Organization *"
                  value={form.organization}
                  onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))}
                />
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="font-extrabold text-slate-900">Professional Details</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className={inputClass}
                    placeholder="Designation *"
                    value={form.designation}
                    onChange={(e) => setForm((p) => ({ ...p, designation: e.target.value }))}
                  />
                  <select
                    className={inputClass}
                    value={form.areaOfInterest}
                    onChange={(e) => setForm((p) => ({ ...p, areaOfInterest: e.target.value }))}
                  >
                    {[
                      'Crime Scene Investigation',
                      'Digital Forensics',
                      'Toxicology',
                      'Questioned Documents',
                    ].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="block rounded-xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500 cursor-pointer">
                  Upload ID proof (optional)
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                  />
                  <div className="text-xs mt-1 text-slate-400">
                    PNG, JPG, PDF up to 5MB{' '}
                    {form.idProofFileName ? `• ${form.idProofFileName}` : ''}
                  </div>
                </label>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="font-extrabold text-slate-900">Registration Category</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {event.categories.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`text-left rounded-xl border p-4 ${selectedCategoryId === cat.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}`}
                    >
                      <p className="font-bold text-slate-800 text-sm">{cat.categoryName}</p>
                      <p className="text-xs text-slate-500">
                        {cat.description || 'Registration category'}
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-indigo-700">
                        ₹{(cat.price || 0).toLocaleString('en-IN')}
                      </p>
                    </button>
                  ))}
                </div>
                {event.includeKitOption && (
                  <label className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
                    <input
                      type="checkbox"
                      checked={form.includeKit}
                      onChange={(e) => setForm((p) => ({ ...p, includeKit: e.target.checked }))}
                    />
                    Include Workshop Kit (+₹{event.kitPrice.toLocaleString('en-IN')})
                  </label>
                )}
                {error && <p className="text-sm text-rose-600">{error}</p>}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-xs text-slate-500">TOTAL AMOUNT</p>
                    <p className="text-3xl font-extrabold text-slate-900">
                      ₹{total.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={initiateRegistration}
                    disabled={loading}
                    className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold disabled:opacity-60"
                  >
                    {loading ? 'Processing...' : 'Continue to Payment →'}
                  </button>
                </div>
              </section>
            </>
          )}

          {step === 2 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-extrabold text-slate-900 text-xl">Payment</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Pay using the QR code or UPI link below, then submit your transaction details for
                  verification.
                </p>
              </div>

              <PaymentInstructionsPanel
                config={paymentConfig}
                amount={total}
                registrationId={registrationId}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500 sm:col-span-2">
                  Transaction / UPI reference *
                  <input
                    className={`${inputClass} mt-2`}
                    value={paymentForm.transactionId}
                    onChange={(e) =>
                      setPaymentForm((p) => ({ ...p, transactionId: e.target.value }))
                    }
                    placeholder="e.g. 123456789012"
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Transaction date
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
                  Transaction time
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
                  Payment screenshot
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

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-11 px-5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={submitPaymentDetails}
                  disabled={loading}
                  className="h-11 px-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold disabled:opacity-60"
                >
                  {loading ? 'Submitting...' : 'Submit payment details'}
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
