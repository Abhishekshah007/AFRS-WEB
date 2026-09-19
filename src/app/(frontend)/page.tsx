import { getHomePageData } from '@/lib/queries/home'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { faqPage, withContext } from '@/lib/seo/schema'
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
  const {
    events,
    services: _services,
    testimonials,
    scientists,
    galleryItems,
    impactStats,
    partnerLogos,
    homePage,
    siteSettings,
    notices,
    faqs,
  } = await getHomePageData()

  const sectionText = homePage?.sectionText || {}
  const heroData = homePage?.hero ?? { title: 'Applied Forensic Research Sciences' }
  const orgJsonLd = withContext([faqPage(faqs)])

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
      <LatestNewsSection items={notices} sectionText={sectionText} />
      <CommunityBannerSection siteSettings={siteSettings} />
      <GallerySection galleryItems={galleryItems} />
      <PartnerLogosSection partnerLogos={partnerLogos} />
      <FaqSection faqs={faqs} sectionText={sectionText} />
    </div>
  )
}
