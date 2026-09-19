import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import type { EventRegistration } from '@/payload-types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string; registrationId: string }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Registration Received',
    description: 'Your event registration has been received.',
    robots: { index: false, follow: false },
  }
}

export default async function RegistrationConfirmationPage({ params }: Props) {
  const { registrationId } = await params
  const payload = await getPayloadClient()

  let record: EventRegistration | null = null

  try {
    record = (await payload.findByID({
      collection: 'eventRegistrations',
      id: registrationId,
      depth: 0,
      overrideAccess: true,
    })) as EventRegistration
  } catch {
    notFound()
  }

  if (!record) notFound()

  const isFree = Number(record.totalAmount || 0) <= 0 || record.paymentStatus === 'notRequired'
  const amountLabel =
    record.feeTierCurrency === 'USD'
      ? `$${Number(record.totalAmount || 0).toLocaleString('en-US')}`
      : `₹${Number(record.totalAmount || 0).toLocaleString('en-IN')}`

  return (
    <div className="bg-[#F4F6FB] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold text-emerald-600">
            {isFree ? 'REGISTRATION RECEIVED' : 'PAYMENT DETAILS SUBMITTED'}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Thank you for registering</h1>
          <p className="mt-3 text-slate-600">
            {isFree
              ? 'Your seat has been reserved. No payment is required for this event.'
              : 'Our team will verify your payment and confirm your registration shortly.'}
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm space-y-2">
            <p>
              <span className="text-slate-500">Event:</span>{' '}
              <span className="font-semibold">{record.eventTitle}</span>
            </p>
            <p>
              <span className="text-slate-500">Registration ID:</span>{' '}
              <span className="font-semibold">{record.id}</span>
            </p>
            {!isFree && record.paymentReference ? (
              <p>
                <span className="text-slate-500">Payment Reference:</span>{' '}
                <span className="font-semibold">{record.paymentReference}</span>
              </p>
            ) : null}
            <p>
              <span className="text-slate-500">Name:</span>{' '}
              <span className="font-semibold">{record.fullName}</span>
            </p>
            <p>
              <span className="text-slate-500">Email:</span>{' '}
              <span className="font-semibold">{record.email}</span>
            </p>
            {!isFree ? (
              <p>
                <span className="text-slate-500">Amount:</span>{' '}
                <span className="font-extrabold text-brand-700">{amountLabel}</span>
              </p>
            ) : null}
          </div>

          <div className="mt-7 flex gap-3">
            <Link
              href={`/events/${record.eventSlug}`}
              className="h-11 px-5 rounded-xl border border-slate-300 text-slate-700 font-semibold inline-flex items-center"
            >
              Back to Event
            </Link>
            <Link
              href="/events"
              className="h-11 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold inline-flex items-center"
            >
              Browse More Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
