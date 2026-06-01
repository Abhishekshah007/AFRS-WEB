import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { formatEventDate, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import { EventRegistrationFlow } from '@/components/events/EventRegistrationFlow'
import type { Event as AfrsEvent, Media } from '@/payload-types'
import type { Metadata } from 'next'

const fallbackBanner = 'https://www.figma.com/api/mcp/asset/4c42ae20-cfcd-4d2a-96e1-bc17321dcca2'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Event Registration | ${slug}`,
    description: 'Complete your event registration and payment.',
  }
}

export default async function EventRegisterPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })

  const evt = result.docs[0] as AfrsEvent | undefined
  if (!evt || evt.registrationOpen === false) notFound()

  const banner = resolveMediaUrl(evt.banner as number | Media | null | undefined, fallbackBanner)
  const summary = evt.excerpt || richTextToPlain(evt.description, 170)

  const dateLabel = evt.endDate
    ? `${formatEventDate(evt.startDate)} - ${formatEventDate(evt.endDate)}`
    : formatEventDate(evt.startDate)

  return (
    <div className="bg-[#F4F6FB] min-h-screen">
      <EventRegistrationFlow
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
