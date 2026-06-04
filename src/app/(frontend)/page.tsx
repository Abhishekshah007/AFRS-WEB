import { getPayloadClient } from '@/lib/payload'
import type { HomePage, SiteSetting } from '@/payload-types'
import type { Metadata } from 'next'
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
  heroPanelImage,
  ImpactSection,
  InternshipFeatureSection,
  LatestNewsSection,
  MediaResourcesSection,
  ForensicTrainingProgram,
  PartnerLogosSection,
  ProgramCtaSection,
  ServicesSection,
  TestimonialsSection,
  TrustedPartnerSection,
  AFRSFeatureCards,
  InternshipProgramSection,
} from '@/components/home/sections'

export const metadata: Metadata = {
  title: 'Forensic Training, Services, and Research Programs',
  description:
    'Explore AFRS forensic services, events, internship programs, expert scientists, and advanced research-led training opportunities.',
}

export default async function HomePage() {
  const payload = await getPayloadClient()
  const today = new Date().toISOString()

  const [
    events,
    services,
    testimonials,
    scientists,
    galleryItems,
    impactStats,
    homePage,
    siteSettings,
  ] = await Promise.all([
    payload.find({
      collection: 'events',
      where: {
        and: [{ published: { equals: true } }, { startDate: { greater_than_equal: today } }],
      },
      limit: 3,
      sort: 'startDate',
      depth: 1,
      overrideAccess: false,
    }),
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
      where: { published: { equals: true } },
      limit: 3,
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
    payload.findGlobal({ slug: 'homePage', depth: 1 }),
    payload.findGlobal({ slug: 'siteSettings' }),
  ])

  const home = homePage as HomePage
  const site = siteSettings as SiteSetting
  const sectionText = home?.sectionText || {}
  const heroData = home?.hero || {}
  const totalVisitors = site?.totalVisitors
  const socials = site?.socialLinks || {}
  const sameAs = [
    socials.facebook,
    socials.instagram,
    socials.linkedin,
    socials.youtube,
    socials.twitter,
  ].filter((url): url is string => typeof url === 'string' && url.startsWith('http'))
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site?.siteName || 'Applied Forensic Research Sciences',
    url: 'https://afrs-webapp.vercel.app',
    logo: heroPanelImage,
    sameAs,
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HeroSection heroData={heroData} />
      <AFRSFeatureCards sectionText={sectionText} events={events} />
      {/* <ProgramCtaSection /> */}
      <ForensicTrainingProgram />
      <EventsSection sectionText={sectionText} events={events} />
      <AboutSection sectionText={sectionText} />
      <AchievementsSection />
      <InternshipProgramSection />
      <FutureSection />
      <ImpactSection impactStats={impactStats} />
      {/* <InternshipFeatureSection /> */}
      {/* <ServicesSection sectionText={sectionText} services={services} /> */}

      <TrustedPartnerSection />
      <ExpertsSection scientists={scientists} />
      <TestimonialsSection testimonials={testimonials} />
      <PartnerLogosSection />
      <MediaResourcesSection />
      <LatestNewsSection />
      <FaqSection />
      <CommunityBannerSection totalVisitors={totalVisitors ?? undefined} />
      <GallerySection galleryItems={galleryItems} />
    </div>
  )
}
