import Link from 'next/link'

export type RegistrationConfirmationDetails = {
  variant: 'event' | 'course'
  isFree: boolean
  subjectTitle: string
  registrationId: string
  registrantName?: string | null
  registrantEmail?: string | null
  paymentReference?: string | null
  amountLabel?: string | null
  backHref: string
  backLabel: string
  secondaryHref?: string
  secondaryLabel?: string
}

export function GenericRegistrationConfirmation({
  variant,
}: {
  variant: 'event' | 'course'
}) {
  return (
    <div className="bg-[#F4F6FB] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold text-emerald-600">REGISTRATION RECEIVED</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Thank you for registering</h1>
          <p className="mt-3 text-slate-600">
            Your submission was received. If you completed a registration just now, check your email
            for confirmation details. For help, contact the AFRS team.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={variant === 'event' ? '/events' : '/courses'}
              className="h-11 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold inline-flex items-center"
            >
              {variant === 'event' ? 'Browse Events' : 'Back to Programmes'}
            </Link>
            <Link
              href="/contact"
              className="h-11 px-5 rounded-xl border border-slate-300 text-slate-700 font-semibold inline-flex items-center"
            >
              Contact AFRS
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RegistrationConfirmationView({
  variant,
  isFree,
  subjectTitle,
  registrationId,
  registrantName,
  registrantEmail,
  paymentReference,
  amountLabel,
  backHref,
  backLabel,
  secondaryHref,
  secondaryLabel,
}: RegistrationConfirmationDetails) {
  return (
    <div className={variant === 'course' ? 'programmes-page min-h-screen bg-[var(--prog-surface)]' : 'bg-[#F4F6FB] min-h-screen'}>
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold text-emerald-600">
            {isFree ? 'REGISTRATION RECEIVED' : 'PAYMENT DETAILS SUBMITTED'}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Thank you for registering</h1>
          <p className="mt-3 text-slate-600">
            {isFree
              ? 'Your registration has been received. No payment is required.'
              : 'Our team will verify your payment and confirm your registration shortly.'}
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm space-y-2">
            <p>
              <span className="text-slate-500">{variant === 'event' ? 'Event' : 'Programme'}:</span>{' '}
              <span className="font-semibold">{subjectTitle}</span>
            </p>
            <p>
              <span className="text-slate-500">Registration ID:</span>{' '}
              <span className="font-semibold">{registrationId}</span>
            </p>
            {registrantName ? (
              <p>
                <span className="text-slate-500">Name:</span>{' '}
                <span className="font-semibold">{registrantName}</span>
              </p>
            ) : null}
            {registrantEmail ? (
              <p>
                <span className="text-slate-500">Email:</span>{' '}
                <span className="font-semibold">{registrantEmail}</span>
              </p>
            ) : null}
            {!isFree && paymentReference ? (
              <p>
                <span className="text-slate-500">Payment Reference:</span>{' '}
                <span className="font-semibold">{paymentReference}</span>
              </p>
            ) : null}
            {!isFree && amountLabel ? (
              <p>
                <span className="text-slate-500">Amount:</span>{' '}
                <span className="font-extrabold text-brand-700">{amountLabel}</span>
              </p>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={backHref}
              className="h-11 px-5 rounded-xl border border-slate-300 text-slate-700 font-semibold inline-flex items-center"
            >
              {backLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="h-11 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold inline-flex items-center"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export function formatRegistrationAmount(
  amount: number,
  currency?: string | null,
): string {
  return currency === 'USD'
    ? `$${amount.toLocaleString('en-US')}`
    : `₹${amount.toLocaleString('en-IN')}`
}
