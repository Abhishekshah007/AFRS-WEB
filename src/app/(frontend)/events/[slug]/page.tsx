import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { formatEventDate, formatEventType, renderRichTextHtml, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import type { Event as AfrsEvent, Media } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList, withContext } from '@/lib/seo/schema'
import { clipMeta } from '@/lib/seo/site'
import type { Metadata } from 'next'

import { FALLBACK_BANNER_IMAGE } from '@/lib/constants/assets'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    where: { published: { equals: true } },
    limit: 200,
    depth: 0,
    overrideAccess: false,
  })
  return result.docs
    .filter((doc) => typeof doc.slug === 'string' && doc.slug)
    .map((doc) => ({ slug: doc.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  })
  const evt = result.docs[0] as AfrsEvent | undefined
  if (!evt) return { title: 'Event not found', robots: { index: false, follow: false } }
  return buildPageMetadata({
    title: evt.title,
    description: clipMeta(evt.excerpt || richTextToPlain(evt.description, 160) || evt.title, 160),
    path: `/events/${evt.slug}`,
  })
}

export default async function EventDetailPage({ params }: Props) {
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
  if (!evt) notFound()

  const banner = resolveMediaUrl(evt.banner as number | Media | null | undefined, FALLBACK_BANNER_IMAGE)
  const summary = evt.excerpt || richTextToPlain(evt.description, 200)
  const descriptionHtml = renderRichTextHtml(evt.description)

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={withContext([
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Events', path: '/events' },
            { name: evt.title, path: `/events/${evt.slug}` },
          ]),
          {
            '@type': 'Event',
            name: evt.title,
            description: summary,
            startDate: evt.startDate || undefined,
            eventAttendanceMode:
              evt.mode === 'online'
                ? 'https://schema.org/OnlineEventAttendanceMode'
                : evt.mode === 'hybrid'
                  ? 'https://schema.org/MixedEventAttendanceMode'
                  : 'https://schema.org/OfflineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            organizer: { '@type': 'Organization', name: 'AFRS' },
            location: {
              '@type': 'Place',
              name: evt.venue || 'AFRS, Indore',
              address: evt.venue || 'Indore, Madhya Pradesh, India',
            },
          },
        ])}
      />
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-3 text-xs text-slate-500 flex gap-2 items-center">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/events" className="hover:text-brand-600">Events</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold line-clamp-1">{evt.title}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-12 grid gap-10 lg:grid-cols-[1fr_340px] items-start">
        {/* Main */}
        <div>
          <AnimateOnScroll>
            <div className="relative min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden shadow-lg bg-slate-50">
              <Image src={banner} alt={evt.title} fill sizes="(max-width: 1024px) 100vw, 800px" priority className="object-contain p-4 sm:p-6" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>

            <div className="mt-8">
              {evt.eventType && (
                <span className="rounded-full bg-brand-100 text-brand-700 px-4 py-1.5 text-xs font-bold">
                  {formatEventType(evt.eventType)}
                </span>
              )}
              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{evt.title}</h1>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600">
                {evt.startDate && (
                  <span className="flex items-center gap-1.5">📅 {formatEventDate(evt.startDate)}
                    {evt.endDate && ` – ${formatEventDate(evt.endDate)}`}
                  </span>
                )}
                {evt.startTime && <span className="flex items-center gap-1.5">🕐 {evt.startTime}</span>}
                {evt.venue && <span className="flex items-center gap-1.5">📍 {evt.venue}</span>}
                {evt.mode && <span className="flex items-center gap-1.5 capitalize">🖥 {evt.mode}</span>}
              </div>

              {summary && (
                <p className="mt-6 text-base leading-relaxed text-slate-600">{summary}</p>
              )}

              {descriptionHtml ? (
                <div
                  className="prose prose-slate mt-8 max-w-none prose-headings:font-extrabold prose-a:text-brand-600"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              ) : null}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Sidebar */}
        <AnimateOnScroll direction="right" className="space-y-5">
          {/* Registration card */}
          <div className="rounded-3xl border border-slate-100 bg-white shadow-sm p-7">
            <h2 className="font-extrabold text-slate-900 text-xl mb-5">Registration</h2>

            {evt.registrationCategories && evt.registrationCategories.length > 0 && (
              <div className="space-y-3 mb-6">
                {evt.registrationCategories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                    <span className="text-sm font-semibold text-slate-800">{cat.categoryName}</span>
                    <span className="text-sm font-extrabold text-brand-700">
                      {cat.price ? `₹${cat.price.toLocaleString('en-IN')}` : 'Free'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {evt.includeKitOption && evt.kitPrice && (
              <p className="text-xs text-slate-500 mb-4">
                + Workshop kit available for ₹{evt.kitPrice.toLocaleString('en-IN')}
              </p>
            )}

            {evt.registrationOpen !== false ? (
              <Link
                href={`/events/${evt.slug}/register`}
                className="block w-full text-center h-12 leading-[48px] rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition"
              >
                Register Now →
              </Link>
            ) : (
              <div className="block w-full text-center h-12 leading-[48px] rounded-xl bg-slate-100 text-slate-400 text-sm font-bold cursor-not-allowed">
                Registration Closed
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <p className="text-sm font-bold text-slate-800 mb-3">Need Help?</p>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              For queries about registration, fees, or certificates, contact our support team.
            </p>
            <Link href={`/events/${evt.slug}/register`} className="text-sm font-bold text-brand-600 hover:text-brand-700">
              Contact Support →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}


