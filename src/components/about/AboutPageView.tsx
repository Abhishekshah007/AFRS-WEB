import { AboutHeroSection } from '@/components/about/AboutHeroSection'
import { AboutFeatureCards } from '@/components/about/AboutFeatureCards'
import { AboutPillarsSection } from '@/components/about/AboutPillarsSection'
import { AboutRoadmapSection } from '@/components/about/AboutRoadmapSection'
import { AchievementsBar } from '@/components/about/AchievementsBar'
import { AwardsGallery } from '@/components/about/AwardsGallery'
import { CertificationsSection } from '@/components/about/CertificationsSection'
import { LeadershipSection } from '@/components/about/LeadershipSection'
import { MembershipSection } from '@/components/about/MembershipSection'
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
}: Readonly<AboutPageViewProps>) {
  const heroTitle = sectionText.aboutHeading || 'Advancing the Frontiers of Forensic Science'

  const heroSubtitle =
    sectionText.aboutDescription1 ||
    'Applied Forensic Research Sciences (AFRS) is a multidisciplinary organization dedicated to advancing forensic science through education, research, training, and professional development. Recognized by MSME, NITI Aayog, and ISO 9001:2015 certified, AFRS fosters innovation, collaboration, and knowledge exchange in the forensic community.'

  const defaultFounderLeaders: LeaderProfile[] = [
    {
      id: 'rakesh',
      name: 'Mr. Rakesh Mia',
      designation: 'President, AFRS',
      initials: 'RM',
      photoUrl:
        'https://res.cloudinary.com/drrzakkgo/image/upload/v1784833177/afrs/payload/media/WhatsApp_Image_2026-07-22_at_10.07.28_PM_rop83x.jpg',
      message:
        '' +
        (sectionText.rakeshMessage ||
          'Student and professional development are at the heart of AFRS. We are committed to providing practical, research-driven training that empowers individuals to excel in forensic science and contribute to a safer society.'),
      bio: 'A visionary leader with over 15 years of experience in forensic education and administration.',
      socials: {
        linkedin: 'https://in.linkedin.com/in/rakesh-mia%F0%9F%87%AE%F0%9F%87%B3-2b9787182',
        instagram: 'https://instagram.com/rakesh_mia?utm_medium=copy_link',
        facebook: 'https://www.facebook.com/rakesh.mia.144',
        x: '#',
      },
    },
    {
      id: 'vijay',
      name: 'Mr. Vijay',
      designation: 'Vice President, AFRS',
      initials: 'V',
      photoUrl:
        'https://res.cloudinary.com/drrzakkgo/image/upload/v1762258620/WhatsApp_Image_2025-11-04_at_12.33.03_AM_fywjbh.jpg',
      message:
        '' +
        (sectionText.vijayMessage ||
          'Strengthening the bridge between academic theory and practical application is our mission. AFRS equips students and professionals with the skills and knowledge necessary to excel in forensic investigation, evidence handling, and court-ready reporting.'),
      bio: 'An expert in criminal investigation techniques with a passion for student mentorship.',
      socials: {
        linkedin: 'https://instagram.com/vijay_panchal9977?utm_medium=copy_link',
        instagram: 'https://in.linkedin.com/in/vijay-panchal-8631261b0',
        facebook: 'https://www.facebook.com/profile.php?id=100017360178631',
        x: '#',
      },
    },
  ]

  const leadershipLeaders =
    featuredLeaders.length >= 2
      ? featuredLeaders.slice(0, 2).map((leader, index) => ({
          ...defaultFounderLeaders[index],
          ...leader,
          message: leader.message ?? defaultFounderLeaders[index]?.message,
          bio: leader.bio ?? defaultFounderLeaders[index]?.bio,
          photoUrl: leader.photoUrl ?? defaultFounderLeaders[index]?.photoUrl,
          socials: leader.socials ?? defaultFounderLeaders[index]?.socials,
        }))
      : defaultFounderLeaders

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
        leaders={leadershipLeaders}
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

      <AwardsGallery
        title={sectionText.awardsTitle ?? undefined}
        subtitle={sectionText.awardsSubtitle ?? undefined}
        callout={sectionText.awardsCallout ?? undefined}
        imageAlts={[
          sectionText.awardsImageAlt1 ?? 'AFRS laboratory research',
          sectionText.awardsImageAlt2 ?? 'AFRS training session',
          sectionText.awardsImageAlt3 ?? 'AFRS team recognition',
        ]}
      />
    </div>
  )
}
