'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { resolveMediaUrl } from '@/lib/cms'
import type { Media } from '@/payload-types'

type DynamicField = {
  name: string
  label: string
  fieldType: string
  required?: boolean
  placeholder?: string
  options?: string
  rows?: number
  accept?: string
}

type Section = {
  title: string
  description?: string
  fields?: DynamicField[]
}

type PaymentMethod = {
  title: string
  description?: string
  qrCode?: number | Media
  link?: string
}

export type RegistrationFormConfig = {
  formTitle?: string
  formSubtitle?: string | null
  sections?: Section[]
  paymentInstructions?: {
    title?: string
    accountName?: string
    accountNumber?: string
    ifsc?: string
    swift?: string
    branchAddress?: string
    upiId?: string
    note?: string
  }
  paymentMethods?: PaymentMethod[]
}

type Props = Readonly<{
  config: RegistrationFormConfig
  submitUrl?: string
  hiddenData?: Record<string, string>
}>

const baseInputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100'

const sectionClass = 'rounded-3xl border border-slate-100 bg-white p-6 shadow-sm'

function parseOptions(value?: string): string[] {
  return value
    ? value
        .split(',')
        .map((option) => option.trim())
        .filter(Boolean)
    : []
}

function renderField(field: DynamicField, disabled: boolean) {
  const sharedProps = {
    name: field.name,
    disabled,
    placeholder: field.placeholder,
    required: field.required,
    className: baseInputClass,
  } as const

  switch (field.fieldType) {
    case 'textarea':
      return (
        <textarea
          {...sharedProps}
          rows={field.rows ?? 4}
          className={`${baseInputClass} min-h-30 resize-y py-3`}
        />
      )
    case 'select':
      return (
        <select {...sharedProps} defaultValue="" className={baseInputClass}>
          <option value="" disabled hidden>
            Select {field.label}
          </option>
          {parseOptions(field.options).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
    case 'date':
    case 'time':
    case 'email':
    case 'tel':
    case 'number':
      return <input {...sharedProps} type={field.fieldType} />
    case 'file':
      return <input {...sharedProps} type="file" accept={field.accept} />
    default:
      return <input {...sharedProps} type="text" />
  }
}

function renderPaymentInstructions(
  paymentInstructions?: RegistrationFormConfig['paymentInstructions'],
) {
  if (!paymentInstructions) return null

  return (
    <aside className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">{paymentInstructions.title}</h3>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        {paymentInstructions.accountName ? <p>{paymentInstructions.accountName}</p> : null}
        {paymentInstructions.accountNumber ? <p>{paymentInstructions.accountNumber}</p> : null}
        {paymentInstructions.ifsc ? <p>{paymentInstructions.ifsc}</p> : null}
        {paymentInstructions.swift ? <p>{paymentInstructions.swift}</p> : null}
        {paymentInstructions.branchAddress ? <p>{paymentInstructions.branchAddress}</p> : null}
        {paymentInstructions.upiId ? <p>UPI ID: {paymentInstructions.upiId}</p> : null}
        {paymentInstructions.note ? (
          <p className="whitespace-pre-line">{paymentInstructions.note}</p>
        ) : null}
      </div>
    </aside>
  )
}

function renderSection(section: Section, disabled: boolean) {
  return (
    <section key={section.title} className={sectionClass}>
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950">{section.title}</h2>
          {section.description ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
          ) : null}
        </div>
      </div>
      {section.fields?.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {section.fields.map((field) => (
            <label
              key={field.name}
              className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500"
            >
              {field.label}
              {field.required ? ' *' : ''}
              <div className="mt-2">{renderField(field, disabled)}</div>
            </label>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function renderPaymentMethods(paymentMethods: PaymentMethod[]) {
  if (!paymentMethods.length) return null

  return (
    <section className={sectionClass}>
      <h3 className="text-lg font-bold text-slate-950">Payment Methods</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {paymentMethods.map((method, methodIndex) => (
          <div
            key={`${method.title}-${methodIndex}`}
            className="rounded-3xl border border-slate-200 p-5"
          >
            <h4 className="text-sm font-semibold text-slate-900">{method.title}</h4>
            {method.description ? (
              <p className="mt-2 text-sm text-slate-600">{method.description}</p>
            ) : null}
            {method.qrCode ? (
              <div className="mt-4 h-40 overflow-hidden rounded-3xl bg-slate-100 p-3">
                <Image
                  src={resolveMediaUrl(method.qrCode as any, '/assets/svg/afsl-logo.png')}
                  alt={`${method.title} QR code`}
                  width={300}
                  height={300}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : null}
            {method.link ? (
              <a
                href={method.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Open payment method
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function RegistrationFormRenderer({
  config,
  submitUrl = '/api/course-registrations/initiate',
  hiddenData,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState<string | undefined>('')

  const sections = config.sections ?? []
  const paymentInstructions = config.paymentInstructions
  const paymentMethods = config.paymentMethods ?? []

  const heading = config.formTitle ?? 'Course Registration'
  const subtitle = config.formSubtitle

  const buttonText = useMemo(() => {
    if (status === 'submitting') return 'Submitting…'
    if (status === 'success') return 'Registration Submitted'
    return 'Submit Registration'
  }, [status])

  async function onSubmit(formData: FormData) {
    setStatus('submitting')
    setStatusMessage(undefined)

    if (hiddenData) {
      Object.entries(hiddenData).forEach(([key, value]) => {
        formData.set(key, value)
      })
    }

    try {
      const res = await fetch(submitUrl, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.error || 'Unable to submit registration.')
      }

      setStatus('success')
      setStatusMessage(
        data?.message ||
          'Registration received. Our team will review your submission and follow up shortly.',
      )
    } catch (error) {
      setStatus('error')
      setStatusMessage(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            {heading}
          </p>
          {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
        </div>
      </header>

      <form action={onSubmit} encType="multipart/form-data" className="space-y-6">
        {statusMessage ? (
          <div
            className={`rounded-2xl px-4 py-3 text-sm ${
              status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {statusMessage}
          </div>
        ) : null}

        {hiddenData &&
          Object.entries(hiddenData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}

        {sections.map((section) => renderSection(section, status === 'submitting'))}

        {renderPaymentInstructions(paymentInstructions)}
        {renderPaymentMethods(paymentMethods)}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
