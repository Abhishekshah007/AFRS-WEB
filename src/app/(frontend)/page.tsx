import { getPayloadClient } from '@/lib/payload'
import { fetchActiveEvents } from '@/lib/queries/events'
import { testimonialPlacementWhere } from '@/lib/queries/testimonials'
import type { HomePage, SiteSetting } from '@/payload-types'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { faqPage, withContext } from '@/lib/seo/schema'
import { HOME_FAQS } from '@/components/home/sections/faqs'
import {
  AboutSection,
  AchievementsSection,
  CommunityBannerSection,
  EventsSection,
  ExpertsSection,
  FaqSection,
  FutureSection,
  GallerySection,
  HeroSection,
  ImpactSection,
  InternshipProgramSection,
  LatestNewsSection,
  MediaResourcesSection,
  ForensicTrainingProgram,
  TestimonialsSection,
  TrustedPartnerSection,
  AFRSFeatureCards,
  PartnerLogosSection,
} from '@/components/home/sections'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Science Education, Training & Services',
  description:
    'Applied Forensic Research Sciences (AFRS) offers forensic science education, professional training, internships, research support and AFSL laboratory services.',
  path: '/',
})

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [
    events,
    _services,
    testimonials,
    scientists,
    galleryItems,
    impactStats,
    partnerLogos,
    homePage,
    siteSettings,
  ] = await Promise.all([
    fetchActiveEvents(payload, { limit: 3, depth: 1 }),
    payload.find({
      collection: 'services',
      where: { published: { equals: true } },
      limit: 6,
      sort: 'order',
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'testimonials',
      where: testimonialPlacementWhere('afrs'),
      limit: 50,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'scientists',
      where: { published: { equals: true } },
      limit: 2,
      sort: 'order',
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'galleryItems',
      where: { published: { equals: true }, featured: { equals: true } },
      limit: 4,
      sort: 'order',
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'impactStats',
      where: { published: { equals: true } },
      limit: 5,
      sort: 'order',
      overrideAccess: false,
    }),
    payload.find({
      collection: 'partnersLogo',
      where: { published: { equals: true } },
      limit: 50,
      sort: 'order',
      depth: 1,
      overrideAccess: false,
    }),
    payload.findGlobal({ slug: 'homePage', depth: 1 }),
    payload.findGlobal({ slug: 'siteSettings' }),
  ])

  const home = homePage as HomePage
  const site = siteSettings as SiteSetting
  const sectionText = home?.sectionText || {}
  const heroData = home?.hero || {}
  const totalVisitors = site?.totalVisitors
  const orgJsonLd = withContext([faqPage([...HOME_FAQS])])

  return (
    <div className="min-h-screen">
      <JsonLd data={orgJsonLd} />
      <HeroSection heroData={heroData} />
      <AFRSFeatureCards sectionText={sectionText} events={events} />
      <ForensicTrainingProgram />
      <EventsSection sectionText={sectionText} events={events} />
      <AboutSection sectionText={sectionText} />
      <ImpactSection impactStats={impactStats} />
      <InternshipProgramSection />
      <FutureSection />
      <AchievementsSection />
      <TrustedPartnerSection />
      <ExpertsSection scientists={scientists} />
      <TestimonialsSection testimonials={testimonials} />
      <MediaResourcesSection />
      <LatestNewsSection />
      <CommunityBannerSection totalVisitors={totalVisitors ?? undefined} />
      <GallerySection galleryItems={galleryItems} />
      <PartnerLogosSection partnerLogos={partnerLogos} />
      <FaqSection />
    </div>
  )
}
