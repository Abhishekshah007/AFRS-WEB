import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { formatEventDate, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import { FALLBACK_BANNER_IMAGE } from '@/lib/constants/assets'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { normalizeDynamicSections } from '@/lib/registration/normalizeDynamicSections'
import { categoriesToFeeTiers, resolveRegistrationConfig } from '@/lib/registration/resolveConfig'
import { EventRegistrationFlow } from '@/components/events/EventRegistrationFlow'
import type { Event as AfrsEvent, Media, RegistrationForm } from '@/payload-types'
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

  const [result, registrationForm] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    }),
    payload.findGlobal({
      slug: 'registrationForm',
      depth: 1,
      overrideAccess: false,
    }) as Promise<RegistrationForm>,
  ])

  const evt = result.docs[0] as AfrsEvent | undefined
  if (!evt || evt.registrationOpen === false) notFound()

  const banner = resolveMediaUrl(
    evt.banner as number | Media | null | undefined,
    FALLBACK_BANNER_IMAGE,
  )
  const summary = evt.excerpt || richTextToPlain(evt.description, 170)

  const dateLabel = evt.endDate
    ? `${formatEventDate(evt.startDate)} - ${formatEventDate(evt.endDate)}`
    : formatEventDate(evt.startDate)

  const customSections = normalizeDynamicSections(evt.registrationSections as DynamicFormSection[])

  const feeTiers = categoriesToFeeTiers(evt.registrationCategories || [])
  const config = resolveRegistrationConfig({
    settings: evt.registrationSettings,
    globalForm: registrationForm,
    feeTiersOverride: feeTiers,
  })

  return (
    <EventRegistrationFlow
      config={config}
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
        categories: feeTiers,
      }}
    />
  )
}
