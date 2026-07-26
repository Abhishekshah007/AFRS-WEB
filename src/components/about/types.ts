export type AboutSectionText = {
  heroEyebrow?: string | null
  aboutHeading?: string | null
  aboutDescription1?: string | null
  aboutDescription2?: string | null
  heroCtaLabel?: string | null
  heroCtaHref?: string | null
  heroImageAlt?: string | null
  rakeshMessage?: string | null
  vijayMessage?: string | null
  founderMessage?: string | null
  visionBadge?: string | null
  visionTitle?: string | null
  visionBody?: string | null
  visionHighlight?: string | null
  visionImageAlt?: string | null
  missionBadge?: string | null
  missionTitle?: string | null
  missionBody?: string | null
  missionHighlight?: string | null
  missionImageAlt?: string | null
  purposeBadge?: string | null
  purposeTitle?: string | null
  purposeBody?: string | null
  purposeHighlight?: string | null
  purposeImageAlt?: string | null
  leadershipTitle?: string | null
  leadershipSubtitle?: string | null
  committeeTitle?: string | null
  committeeSubtitle?: string | null
  certificationsTitle?: string | null
  certificationsSubtitle?: string | null
  valuesTitle?: string | null
  valuesSubtitle?: string | null
  uniqueTitle?: string | null
  uniqueSubtitle?: string | null
  activitiesTitle?: string | null
  activitiesSubtitle?: string | null
  expertiseTitle?: string | null
  expertiseSubtitle?: string | null
  expertiseItems?: string[] | null
  whyChooseTitle?: string | null
  whyChooseSubtitle?: string | null
  whyChooseItems?: string[] | null
  pillarsTitle?: string | null
  pillarsSubtitle?: string | null
  qualityEthicsTitle?: string | null
  qualityEthicsEyebrow?: string | null
  qualityEthicsItems?: string[] | null
  researchTitle?: string | null
  researchEyebrow?: string | null
  researchItems?: string[] | null
  partnershipsTitle?: string | null
  partnershipsEyebrow?: string | null
  partnershipItems?: string[] | null
  pillarProofLabels?: string[] | null
  membershipTitle?: string | null
  membershipSubtitle?: string | null
  membershipCtaLabel?: string | null
  membershipAdvantageEyebrow?: string | null
  membershipAdvantageTitle?: string | null
  futureRoadmapItems?: string[] | null
  roadmapTitle?: string | null
  roadmapSubtitle?: string | null
  roadmapEyebrow?: string | null
  roadmapCardTitle?: string | null
  roadmapCardBody?: string | null
  awardsTitle?: string | null
  awardsSubtitle?: string | null
  awardsCallout?: string | null
  awardsImageAlt1?: string | null
  awardsImageAlt2?: string | null
  awardsImageAlt3?: string | null
  membershipReasons?: string[] | null
  certifications?: CertificationItem[] | null
  uniqueItems?: ListItem[] | null
  activityItems?: ListItem[] | null
  membershipPlans?: MembershipPlan[] | null
}

// leader section types
export type LeaderProfile = {
  id: string
  name: string
  designation: string
  bio?: string | null
  message?: string | null
  photoUrl?: string
  initials: string
  socials?: {
    linkedin?: string
    facebook?: string
    x?: string
    instagram?: string
  }
}

export type AchievementStat = {
  value: string
  label: string
  tone: 'blue' | 'purple' | 'orange' | 'green' | 'red'
  numericEnd?: number
  suffix?: string
}

export type CertificationItem = {
  title: string
  icon?: string
  description?: string
  issuer?: string
  href?: string
}

export type ListItem = {
  text: string
  description?: string
}

export type MembershipPlan = {
  title: string
  description: string
  href: string
  badge: string
  dark?: boolean
}
