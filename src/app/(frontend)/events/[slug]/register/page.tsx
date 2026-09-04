import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { formatEventDate, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import { FALLBACK_BANNER_IMAGE } from '@/lib/constants/assets'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { getRegistrationPaymentConfig } from '@/lib/queries/registration-form'
import { EventRegistrationFlow } from '@/components/events/EventRegistrationFlow'
import type { Event as AfrsEvent, Media } from '@/payload-types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Register: ${slug}`,
    description: 'Complete event registration. This page is not indexed.',
    robots: { index: false, follow: false },
  }
}

export default async function EventRegisterPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const [result, paymentConfig] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    }),
    getRegistrationPaymentConfig(),
  ])

  const evt = result.docs[0] as AfrsEvent | undefined
  if (!evt || evt.registrationOpen === false) notFound()

  const banner = resolveMediaUrl(evt.banner as number | Media | null | undefined, FALLBACK_BANNER_IMAGE)
  const summary = evt.excerpt || richTextToPlain(evt.description, 170)

  const dateLabel = evt.endDate
    ? `${formatEventDate(evt.startDate)} - ${formatEventDate(evt.endDate)}`
    : formatEventDate(evt.startDate)

  const customSections = ((evt.registrationSections || []) as DynamicFormSection[]).map((section) => ({
    title: section.title,
    description: section.description,
    fields: section.fields?.map((field) => ({
      name: field.name,
      label: field.label,
      fieldType: field.fieldType,
      required: field.required,
      placeholder: field.placeholder,
      options: field.options,
      rows: field.rows,
      accept: field.accept,
    })),
  }))

  return (
    <div className="bg-[#F4F6FB] min-h-screen">
      <EventRegistrationFlow
        paymentConfig={paymentConfig}
        customSections={customSections}
        event={{
          slug: evt.slug,
          title: evt.title,
          banner,
          eventType: evt.eventType || 'Workshop',
          mode: evt.mode || 'hybrid',
          dateLabel,
          timeLabel: evt.startTime || '10:00 AM - 04:00 PM IST',
          locationLabel: evt.venue || 'Zoom / AFRS Campus',
          description: summary,
          includeKitOption: Boolean(evt.includeKitOption),
          kitPrice: Number(evt.kitPrice || 0),
          categories: (evt.registrationCategories || []).map((cat) => ({
            id: String(cat.id),
            categoryName: cat.categoryName || 'General',
            price: Number(cat.price || 0),
            description: cat.description,
          })),
        }}
      />
    </div>
  )
}
