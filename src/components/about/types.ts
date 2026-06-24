export type AboutSectionText = {
  aboutHeading?: string | null
  aboutDescription1?: string | null
  aboutDescription2?: string | null
  rakeshMessage?: string | null
  vijayMessage?: string | null
  founderMessage?: string | null
  visionBody?: string | null
  missionBody?: string | null
  purposeBody?: string | null
  expertiseItems?: string[] | null
  whyChooseItems?: string[] | null
  qualityEthicsItems?: string[] | null
  researchItems?: string[] | null
  partnershipItems?: string[] | null
  futureRoadmapItems?: string[] | null
  membershipReasons?: string[] | null
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
  description: string
  icon: string
}

export type ListItem = {
  text: string
}
