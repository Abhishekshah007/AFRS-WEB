import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string; registrationId: string }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Registration Confirmed',
    description: 'Your event registration and payment are confirmed.',
  }
}

export default async function RegistrationConfirmationPage({ params }: Props) {
  const { registrationId } = await params
  const payload = await getPayloadClient()

  let record: any
  try {
    record = await payload.findByID({
      collection: 'eventRegistrations',
      id: registrationId,
      depth: 0,
      overrideAccess: true,
    })
  } catch {
    notFound()
  }

  if (!record) notFound()

  return (
    <div className="bg-[#F4F6FB] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold text-emerald-600">PAYMENT SUCCESS</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Registration Confirmed</h1>
          <p className="mt-3 text-slate-600">Your seat has been reserved for <span className="font-semibold">{record.eventTitle}</span>.</p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm space-y-2">
            <p><span className="text-slate-500">Registration ID:</span> <span className="font-semibold">{record.id}</span></p>
            <p><span className="text-slate-500">Payment Reference:</span> <span className="font-semibold">{record.paymentReference || '-'}</span></p>
            <p><span className="text-slate-500">Name:</span> <span className="font-semibold">{record.fullName}</span></p>
            <p><span className="text-slate-500">Email:</span> <span className="font-semibold">{record.email}</span></p>
            <p><span className="text-slate-500">Total Paid:</span> <span className="font-extrabold text-indigo-700">₹{Number(record.totalAmount || 0).toLocaleString('en-IN')}</span></p>
          </div>

          <div className="mt-7 flex gap-3">
            <Link href={`/events/${record.eventSlug}`} className="h-11 px-5 rounded-xl border border-slate-300 text-slate-700 font-semibold inline-flex items-center">Back to Event</Link>
            <Link href="/events" className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold inline-flex items-center">Browse More Events</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
