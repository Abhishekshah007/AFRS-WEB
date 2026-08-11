import Image from 'next/image'
import type {
  PaymentInstructionsConfig,
  PaymentMethodConfig,
  RegistrationPaymentConfig,
} from '@/domain/registration/types'
import { FALLBACK_LOGO_IMAGE } from '@/lib/constants/assets'
import { resolveMediaUrl } from '@/lib/cms'
import type { MediaRef } from '@/lib/media'

type Props = Readonly<{
  config: RegistrationPaymentConfig
  amount?: number
  registrationId?: string
  compact?: boolean
}>

function PaymentInstructions({ instructions }: { instructions: PaymentInstructionsConfig }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 space-y-2">
      <h4 className="font-bold text-slate-900">{instructions.title || 'Payment details'}</h4>
      {instructions.accountName ? <p>{instructions.accountName}</p> : null}
      {instructions.accountNumber ? <p>{instructions.accountNumber}</p> : null}
      {instructions.ifsc ? <p>{instructions.ifsc}</p> : null}
      {instructions.swift ? <p>{instructions.swift}</p> : null}
      {instructions.branchAddress ? <p>{instructions.branchAddress}</p> : null}
      {instructions.upiId ? (
        <p>
          <span className="font-semibold text-slate-800">UPI ID:</span> {instructions.upiId}
        </p>
      ) : null}
      {instructions.note ? <p className="whitespace-pre-line">{instructions.note}</p> : null}
    </div>
  )
}

function PaymentMethodCard({ method }: { method: PaymentMethodConfig }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h4 className="text-sm font-semibold text-slate-900">{method.title}</h4>
      {method.description ? <p className="mt-2 text-sm text-slate-600">{method.description}</p> : null}
      {method.qrCode ? (
        <div className="mt-4 h-40 overflow-hidden rounded-2xl bg-slate-100 p-3">
          <Image
            src={resolveMediaUrl(method.qrCode as MediaRef, FALLBACK_LOGO_IMAGE)}
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
          className="mt-4 inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Pay via UPI / link
        </a>
      ) : null}
    </div>
  )
}

export function PaymentInstructionsPanel({
  config,
  amount,
  registrationId,
  compact = false,
}: Props) {
  const methods = config.paymentMethods ?? []
  const instructions = config.paymentInstructions

  return (
    <div className="space-y-4">
      {!compact && config.formSubtitle ? (
        <p className="text-sm text-slate-600">{config.formSubtitle}</p>
      ) : null}

      {typeof amount === 'number' ? (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Amount to pay</p>
          <p className="mt-1 text-3xl font-extrabold text-indigo-900">
            ₹{amount.toLocaleString('en-IN')}
          </p>
          {registrationId ? (
            <p className="mt-2 text-xs text-indigo-700">
              Registration ID: <span className="font-semibold">{registrationId}</span>
            </p>
          ) : null}
        </div>
      ) : null}

      {instructions ? <PaymentInstructions instructions={instructions} /> : null}

      {methods.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {methods.map((method, index) => (
            <PaymentMethodCard key={`${method.title}-${index}`} method={method} />
          ))}
        </div>
      ) : null}

      <p className="text-xs text-slate-500">
        After payment, enter your transaction reference and upload the payment screenshot below.
        Registrations are confirmed after manual verification by the AFRS team.
      </p>
    </div>
  )
}
