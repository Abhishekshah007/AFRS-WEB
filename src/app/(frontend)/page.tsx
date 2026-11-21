import { getHomePageData } from '@/lib/queries/home'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { HomePopupSequence } from '@/components/home/HomePopupSequence'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { faqPage, withContext } from '@/lib/seo/schema'
import {
  resolveAfslSection,
  resolveImpactSection,
  resolveInternshipSection,
  resolveQuickLinksSection,
  resolveTrainingSection,
  resolveVideoSection,
} from '@/lib/queries/home-sections'
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
    testimonials,
    scientists,
    impactStats,
    partnerLogos,
    homePage,
    siteSettings,
    notices,
    faqs,
    popups,
    popupFingerprint,
    cmsAvailable,
  } = await getHomePageData()

  const sectionText = homePage?.sectionText || {}
  const heroData = homePage?.hero ?? { title: 'Applied Forensic Research Sciences' }
  const orgJsonLd = withContext([faqPage(faqs)])

  return (
    <div className="min-h-screen  overflow-hidden">
      <JsonLd data={orgJsonLd} />
      <HomePopupSequence key={popupFingerprint} slides={popups} fingerprint={popupFingerprint} />
      <HeroSection heroData={heroData} />
      <AFRSFeatureCards sectionText={sectionText} events={events} />
      <ForensicTrainingProgram content={resolveTrainingSection(homePage?.training)} />
      <EventsSection sectionText={sectionText} events={events} />
      <AboutSection sectionText={sectionText} />
      <ImpactSection impactStats={impactStats} />
      <InternshipProgramSection content={resolveInternshipSection(homePage?.internship)} />
      <FutureSection content={resolveVideoSection(homePage?.video)} />
      <AchievementsSection content={resolveImpactSection(homePage?.impact)} />
      <TrustedPartnerSection content={resolveAfslSection(homePage?.afsl)} />
      <ExpertsSection scientists={scientists} usePlaceholderExperts={!cmsAvailable} />
      <TestimonialsSection testimonials={testimonials} />
      <MediaResourcesSection content={resolveQuickLinksSection(homePage?.quickLinks)} />
      <LatestNewsSection items={notices} sectionText={sectionText} />
      <CommunityBannerSection siteSettings={siteSettings} />
      <GallerySection />
      <PartnerLogosSection partnerLogos={partnerLogos} />
      <FaqSection faqs={faqs} sectionText={sectionText} />
    </div>
  )
}
