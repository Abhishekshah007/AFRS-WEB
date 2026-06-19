import { AboutHeroSection } from '@/components/about/AboutHeroSection'
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
  heroImage?: string
}

/**
 * Composes all About page sections — server-friendly wrapper around static + CMS props.
 */
export function AboutPageView({
  sectionText,
  featuredLeaders,
  committee,
  achievements,
  certifications,
  uniqueItems,
  activityItems,
  heroImage,
}: Readonly<AboutPageViewProps>) {
  const heroTitle = sectionText.aboutHeading || 'Advancing the Frontiers of Forensic Science'

  const heroSubtitle =
    sectionText.aboutDescription1 ||
    'AFRS is a premier organization established to revolutionize the forensic science landscape through research, training, and specialized laboratory services.'

  return (
    <div className="about-page bg-white">
      <AboutHeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaLabel="Download Programme"
        ctaHref="#vision"
        imageSrc={heroImage}
      />
      <VisionMissionPurpose missionBody={sectionText.aboutDescription2 ?? undefined} />
      <LeadershipSection featured={featuredLeaders} committee={committee} />
      <CertificationsSection items={certifications} />
      <ValuesSection uniqueItems={uniqueItems} activityItems={activityItems} />
      <AchievementsBar stats={achievements} />
      <MembershipSection />
      <AwardsGallery />
    </div>
  )
}
