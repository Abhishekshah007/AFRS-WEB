import { findRegistrationById } from '@/lib/registration/findRegistrationById'
import {
  formatRegistrationAmount,
  GenericRegistrationConfirmation,
  RegistrationConfirmationView,
} from '@/components/registration/RegistrationConfirmationView'
import { verifyRegistrationConfirmationToken } from '@/lib/registration/confirmationToken'
import type { EventRegistration } from '@/payload-types'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string; registrationId: string }>
  searchParams: Promise<{ token?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Registration Received',
    description: 'Your event registration has been received.',
    robots: { index: false, follow: false },
  }
}

export default async function RegistrationConfirmationPage({ params, searchParams }: Props) {
  const { slug, registrationId } = await params
  const { token } = await searchParams

  const authorized = verifyRegistrationConfirmationToken(registrationId, { kind: 'event', eventSlug: slug }, token)
  if (!authorized) {
    return <GenericRegistrationConfirmation variant="event" />
  }

  const record = await findRegistrationById<EventRegistration>('eventRegistrations', registrationId)
  if (!record || record.eventSlug !== slug) {
    return <GenericRegistrationConfirmation variant="event" />
  }

  const isFree =
    Number(record.totalAmount || 0) <= 0 || record.paymentStatus === 'notRequired'
  const amount = Number(record.totalAmount || 0)

  return (
    <RegistrationConfirmationView
      variant="event"
      isFree={isFree}
      subjectTitle={record.eventTitle || 'your event'}
      registrationId={String(record.id)}
      registrantName={record.fullName}
      registrantEmail={record.email}
      paymentReference={record.paymentReference}
      amountLabel={!isFree ? formatRegistrationAmount(amount, record.feeTierCurrency) : null}
      backHref={`/events/${slug}`}
      backLabel="Back to Event"
      secondaryHref="/events"
      secondaryLabel="Browse More Events"
    />
  )
}
