import { notFound } from 'next/navigation'
import { ServiceDetailView } from '@/components/service-detail/ServiceDetailView'
import { defaultHelpCards, featuresToHelpCards } from '@/components/service-detail/buildServiceContent'
import type { ServiceDetailData } from '@/components/service-detail/types'
import { SERVICE_DETAIL_IMAGES } from '@/components/service-detail/tokens'
import { resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import { serviceGalleryHref } from '@/lib/gallery/constants'
import { getServiceGallerySlides } from '@/lib/queries/gallery'
import { getPayloadClient } from '@/lib/payload'
import type { Media, Service, SiteSetting } from '@/payload-types'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList, withContext } from '@/lib/seo/schema'
import { absoluteUrl, clipMeta, getSiteUrl } from '@/lib/seo/site'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
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
    collection: 'services',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  })
  const srv = result.docs[0] as Service | undefined
  if (!srv) return { title: 'Service not found', robots: { index: false, follow: false } }
  const description = clipMeta(srv.excerpt || richTextToPlain(srv.content, 160) || srv.title, 160)
  return buildPageMetadata({
    title: srv.title,
    description,
    path: `/services/${srv.slug}`,
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const [serviceResult, siteSettings] = await Promise.all([
    payload.find({
      collection: 'services',
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    }),
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }),
  ])

  const srv = serviceResult.docs[0] as Service | undefined
  if (!srv) notFound()

  const site = siteSettings as SiteSetting
  const bannerUrl = resolveMediaUrl(
    srv.banner as number | Media | null | undefined,
    SERVICE_DETAIL_IMAGES.hero,
  )
  const overviewImageUrl = resolveMediaUrl(
    srv.overviewImage as number | Media | null | undefined,
    resolveMediaUrl(
      srv.banner as number | Media | null | undefined,
      SERVICE_DETAIL_IMAGES.overview,
    ),
  )
  const service: ServiceDetailData = {
    slug: srv.slug,
    title: srv.title,
    excerpt:
      srv.excerpt ||
      'Meticulous forensic investigation services preserving evidence integrity from scene to laboratory analysis.',
    contentPlain: richTextToPlain(srv.content, 4000),
    bannerUrl,
    overviewImageUrl,
    category: srv.category,
    helpHeading: srv.helpHeading,
    helpIntro: srv.helpIntro,
  }

  const helpCards = featuresToHelpCards(srv.features)

  const gallerySlides = await getServiceGallerySlides({
    serviceId: srv.id,
    serviceTitle: srv.title,
    serviceSlug: srv.slug,
    bannerUrl,
    overviewImageUrl,
    brand: 'afsl',
  })

  return (
    <>
      <JsonLd
        data={withContext([
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Forensic Services', path: '/services' },
            { name: srv.title, path: `/services/${srv.slug}` },
          ]),
          {
            '@type': 'Service',
            name: srv.title,
            description: service.excerpt,
            url: absoluteUrl(`/services/${srv.slug}`),
            provider: { '@id': `${getSiteUrl()}/#organization` },
            areaServed: 'India',
            serviceType: 'Forensic science laboratory service',
          },
        ])}
      />
      <ServiceDetailView
        service={service}
        helpCards={helpCards.length ? helpCards : defaultHelpCards()}
        gallerySlides={gallerySlides}
        galleryViewAllHref={serviceGalleryHref(srv.slug)}
        contact={{
          phone: site?.phone || '+91-9926692487',
          email: site?.email || 'afrsciences@gmail.com',
        }}
      />
    </>
  )
}
