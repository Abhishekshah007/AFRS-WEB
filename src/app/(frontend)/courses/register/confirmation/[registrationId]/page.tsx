import { findRegistrationById } from '@/lib/registration/findRegistrationById'
import {
  formatRegistrationAmount,
  GenericRegistrationConfirmation,
  RegistrationConfirmationView,
} from '@/components/registration/RegistrationConfirmationView'
import { verifyRegistrationConfirmationToken } from '@/lib/registration/confirmationToken'
import type { CourseRegistration } from '@/payload-types'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ registrationId: string }>
  searchParams: Promise<{ token?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Registration Received',
    description: 'Your programme registration has been received.',
    robots: { index: false, follow: false },
  }
}

export default async function CourseRegistrationConfirmationPage({ params, searchParams }: Props) {
  const { registrationId } = await params
  const { token } = await searchParams

  const authorized = verifyRegistrationConfirmationToken(registrationId, { kind: 'course' }, token)
  if (!authorized) {
    return <GenericRegistrationConfirmation variant="course" />
  }

  const record = await findRegistrationById<CourseRegistration>(
    'courseRegistrations',
    registrationId,
  )
  if (!record) {
    return <GenericRegistrationConfirmation variant="course" />
  }

  const isFree =
    Number(record.totalAmount || 0) <= 0 || record.paymentStatus === 'notRequired'
  const amount = Number(record.totalAmount || 0)

  return (
    <RegistrationConfirmationView
      variant="course"
      isFree={isFree}
      subjectTitle={record.programmeTitle || 'Programme'}
      registrationId={String(record.id)}
      registrantName={record.fullName}
      registrantEmail={record.email}
      paymentReference={record.paymentReference}
      amountLabel={!isFree ? formatRegistrationAmount(amount, record.feeTierCurrency) : null}
      backHref="/courses"
      backLabel="Back to Programmes"
    />
  )
}
