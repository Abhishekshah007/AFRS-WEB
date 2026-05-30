export type AboutSectionText = {
  aboutHeading?: string | null
  aboutDescription1?: string | null
  aboutDescription2?: string | null
}

export type LeaderProfile = {
  id: string
  name: string
  designation: string
  bio?: string | null
  photoUrl?: string
  initials: string
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
