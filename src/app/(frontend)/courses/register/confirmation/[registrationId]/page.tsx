import Link from 'next/link'
import { findRegistrationById } from '@/lib/registration/findRegistrationById'
import type { CourseRegistration } from '@/payload-types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ registrationId: string }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Registration Received',
    description: 'Your programme registration has been received.',
    robots: { index: false, follow: false },
  }
}

export default async function CourseRegistrationConfirmationPage({ params }: Props) {
  const { registrationId } = await params
  const record = await findRegistrationById<CourseRegistration>(
    'courseRegistrations',
    registrationId,
  )

  const isFree =
    !record || Number(record.totalAmount || 0) <= 0 || record.paymentStatus === 'notRequired'
  const amount = Number(record?.totalAmount || 0)
  const amountLabel =
    record?.feeTierCurrency === 'USD'
      ? `$${amount.toLocaleString('en-US')}`
      : `₹${amount.toLocaleString('en-IN')}`

  return (
    <div className="programmes-page min-h-screen bg-[var(--prog-surface)]">
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
              <span className="text-slate-500">Programme:</span>{' '}
              <span className="font-semibold">{record?.programmeTitle || 'Programme'}</span>
            </p>
            <p>
              <span className="text-slate-500">Registration ID:</span>{' '}
              <span className="font-semibold">{record?.id ?? registrationId}</span>
            </p>
            {!isFree && record?.paymentReference ? (
              <p>
                <span className="text-slate-500">Payment Reference:</span>{' '}
                <span className="font-semibold">{record.paymentReference}</span>
              </p>
            ) : null}
            {record?.fullName ? (
              <p>
                <span className="text-slate-500">Name:</span>{' '}
                <span className="font-semibold">{record.fullName}</span>
              </p>
            ) : null}
            {record?.email ? (
              <p>
                <span className="text-slate-500">Email:</span>{' '}
                <span className="font-semibold">{record.email}</span>
              </p>
            ) : null}
            {record && !isFree ? (
              <p>
                <span className="text-slate-500">Amount:</span>{' '}
                <span className="font-extrabold text-brand-700">{amountLabel}</span>
              </p>
            ) : null}
          </div>

          <div className="mt-7 flex gap-3">
            <Link
              href="/courses"
              className="h-11 px-5 rounded-xl border border-slate-300 text-slate-700 font-semibold inline-flex items-center"
            >
              Back to Programmes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
