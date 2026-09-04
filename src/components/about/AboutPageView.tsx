import { AboutHeroSection } from '@/components/about/AboutHeroSection'
import { AboutFeatureCards } from '@/components/about/AboutFeatureCards'
import { AboutPillarsSection } from '@/components/about/AboutPillarsSection'
import { AboutRoadmapSection } from '@/components/about/AboutRoadmapSection'
import { AchievementsBar } from '@/components/about/AchievementsBar'
import { AwardsGallery } from '@/components/about/AwardsGallery'
import { SiteGallerySection } from '@/components/gallery/SiteGallerySection'
import type { SiteGalleryItem } from '@/components/gallery/SiteGallerySection'
import { CertificationsSection } from '@/components/about/CertificationsSection'
import { LeadershipSection } from '@/components/about/LeadershipSection'
import { MembershipSection } from '@/components/about/MembershipSection'
import { TargetAudienceTable } from '@/components/about/TargetAudience'
import { ValuesSection } from '@/components/about/ValuesSection'
import { VisionMissionPurpose } from '@/components/about/VisionMissionPurpose'
import type {
  AboutSectionText,
  AchievementStat,
  CertificationItem,
  LeaderProfile,
  ListItem,
} from '@/components/about/types'

export type AboutPageViewProps = {
  sectionText: AboutSectionText
  featuredLeaders: LeaderProfile[]
  committee: LeaderProfile[]
  achievements: AchievementStat[]
  certifications: CertificationItem[]
  uniqueItems: ListItem[]
  activityItems: ListItem[]
  expertiseItems: string[]
  whyChooseItems: string[]
  qualityEthicsItems: string[]
  researchItems: string[]
  partnershipItems: string[]
  futureRoadmapItems: string[]
  membershipReasons: string[]
  heroImage?: string
  galleryItems: SiteGalleryItem[]
}

export function AboutPageView({
  sectionText,
  featuredLeaders,
  committee,
  achievements,
  certifications,
  uniqueItems,
  activityItems,
  expertiseItems,
  whyChooseItems,
  qualityEthicsItems,
  researchItems,
  partnershipItems,
  futureRoadmapItems,
  membershipReasons,
  heroImage,
  galleryItems,
}: Readonly<AboutPageViewProps>) {
  const heroTitle = sectionText.aboutHeading || 'Advancing the Frontiers of Forensic Science'

  const heroSubtitle =
    sectionText.aboutDescription1 ||
    'Applied Forensic Research Sciences (AFRS) is a multidisciplinary organization dedicated to advancing forensic science through education, research, training, and professional development. Recognized by MSME, NITI Aayog, and ISO 9001:2015 certified, AFRS fosters innovation, collaboration, and knowledge exchange in the forensic community.'

  return (
    <div className="about-page bg-white">
      <AboutHeroSection
        eyebrow={sectionText.heroEyebrow ?? undefined}
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaLabel={sectionText.heroCtaLabel ?? 'Download Society Profile'}
        ctaHref={sectionText.heroCtaHref ?? '#vision'}
        imageSrc={heroImage}
        imageAlt={sectionText.heroImageAlt ?? undefined}
      />

      <VisionMissionPurpose
        visionBadge={sectionText.visionBadge ?? undefined}
        visionTitle={sectionText.visionTitle ?? undefined}
        visionBody={sectionText.visionBody ?? undefined}
        visionHighlight={sectionText.visionHighlight ?? undefined}
        visionImageAlt={sectionText.visionImageAlt ?? undefined}
        missionBadge={sectionText.missionBadge ?? undefined}
        missionTitle={sectionText.missionTitle ?? undefined}
        missionBody={sectionText.missionBody ?? undefined}
        missionHighlight={sectionText.missionHighlight ?? undefined}
        missionImageAlt={sectionText.missionImageAlt ?? undefined}
        purposeBadge={sectionText.purposeBadge ?? undefined}
        purposeTitle={sectionText.purposeTitle ?? undefined}
        purposeBody={sectionText.purposeBody ?? undefined}
        purposeHighlight={sectionText.purposeHighlight ?? undefined}
        purposeImageAlt={sectionText.purposeImageAlt ?? undefined}
      />

      <LeadershipSection
        leaders={featuredLeaders}
        committee={committee}
        leadershipTitle={sectionText.leadershipTitle ?? undefined}
        leadershipSubtitle={sectionText.leadershipSubtitle ?? undefined}
        committeeTitle={sectionText.committeeTitle ?? undefined}
        committeeSubtitle={sectionText.committeeSubtitle ?? undefined}
      />

      <CertificationsSection
        items={certifications}
        title={sectionText.certificationsTitle ?? undefined}
        subtitle={sectionText.certificationsSubtitle ?? undefined}
      />

      <ValuesSection
        uniqueItems={uniqueItems}
        activityItems={activityItems}
        title={sectionText.valuesTitle ?? undefined}
        subtitle={sectionText.valuesSubtitle ?? undefined}
        uniqueTitle={sectionText.uniqueTitle ?? undefined}
        uniqueSubtitle={sectionText.uniqueSubtitle ?? undefined}
        activitiesTitle={sectionText.activitiesTitle ?? undefined}
        activitiesSubtitle={sectionText.activitiesSubtitle ?? undefined}
      />

      <AboutFeatureCards
        id="expertise-heading"
        title={sectionText.expertiseTitle ?? 'Our Expertise'}
        subtitle={
          sectionText.expertiseSubtitle ??
          'Multidisciplinary capabilities across forensic domains — from crime scene to courtroom.'
        }
        items={expertiseItems}
        surface="alt"
      />

      <AboutFeatureCards
        id="why-choose-heading"
        title={sectionText.whyChooseTitle ?? 'Why Choose AFRS'}
        subtitle={
          sectionText.whyChooseSubtitle ??
          'The practical, ethical, and research-driven advantage behind our programmes and consultancy.'
        }
        items={whyChooseItems}
        variant="compact"
      />

      <TargetAudienceTable />

      <AboutPillarsSection
        qualityEthicsItems={qualityEthicsItems}
        researchItems={researchItems}
        partnershipItems={partnershipItems}
        title={sectionText.pillarsTitle ?? undefined}
        subtitle={sectionText.pillarsSubtitle ?? undefined}
        qualityEthicsTitle={sectionText.qualityEthicsTitle ?? undefined}
        qualityEthicsEyebrow={sectionText.qualityEthicsEyebrow ?? undefined}
        researchTitle={sectionText.researchTitle ?? undefined}
        researchEyebrow={sectionText.researchEyebrow ?? undefined}
        partnershipsTitle={sectionText.partnershipsTitle ?? undefined}
        partnershipsEyebrow={sectionText.partnershipsEyebrow ?? undefined}
        proofLabels={sectionText.pillarProofLabels ?? undefined}
      />

      <AchievementsBar stats={achievements} />

      <MembershipSection
        reasons={membershipReasons}
        title={sectionText.membershipTitle ?? undefined}
        subtitle={sectionText.membershipSubtitle ?? undefined}
        plans={sectionText.membershipPlans ?? undefined}
        ctaLabel={sectionText.membershipCtaLabel ?? undefined}
        advantageEyebrow={sectionText.membershipAdvantageEyebrow ?? undefined}
        advantageTitle={sectionText.membershipAdvantageTitle ?? undefined}
      />

      <AboutRoadmapSection
        items={futureRoadmapItems}
        title={sectionText.roadmapTitle ?? undefined}
        subtitle={sectionText.roadmapSubtitle ?? undefined}
        eyebrow={sectionText.roadmapEyebrow ?? undefined}
        cardTitle={sectionText.roadmapCardTitle ?? undefined}
        cardBody={sectionText.roadmapCardBody ?? undefined}
      />

      {/* <AwardsGallery
        title={sectionText.awardsTitle ?? undefined}
        subtitle={sectionText.awardsSubtitle ?? undefined}
        callout={sectionText.awardsCallout ?? undefined}
        imageAlts={[
          sectionText.awardsImageAlt1 ?? 'AFRS laboratory research',
          sectionText.awardsImageAlt2 ?? 'AFRS training session',
          sectionText.awardsImageAlt3 ?? 'AFRS team recognition',
        ]}
      /> */}

      <SiteGallerySection items={galleryItems} title="Awards & Recognition" subtitle="" />
    </div>
  )
}
