export type CatalogItem = {
  id: string | number
  title: string
  slug: string
  desc: string
  banner: string
}

export type DirectorateMember = {
  id: number | string
  name: string
  designation: string
  bio?: string | null
  photo?: string
  initials: string
  status: 'active' | 'inactive'
}

export type SiteContact = {
  phone: string
  email: string
  address: string
  mapEmbedUrl?: string | null
}

export type CertificationStat = {
  label: string
  caption: string
}

export type KitCardData = {
  title: string
  icon: string
}

export type ResearchItem = {
  num: string
  title: string
  desc: string
}

export type TrainingCard = {
  title: string
  desc: string
  cta: string
  href?: string
}

export type LegalLinkItem = {
  title: string
  desc: string
}

export type ServicesSectionText = {
  heroEyebrow: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  heroCtaLabel: string
  labStatusLabel: string
  labStatusValue: string
  labCardCtaLabel: string
  infrastructureEyebrow: string
  infrastructureTitle: string
  infrastructureBody1: string
  infrastructureBody2: string
  visionTitle: string
  visionBody: string
  missionTitle: string
  missionBody: string
  directorateEyebrow: string
  directorateTitle: string
  directorateSubtitle: string
  teamEyebrow: string
  teamTitle: string
  teamSubtitle: string
  catalogEyebrow: string
  catalogTitle: string
  legalTitle: string
  legalSubtitle: string
  legalDescription: string
  legalCtaLabel: string
  legalCtaSubtext: string
  kitsEyebrow: string
  kitsTitle: string
  kitsDescription: string
  trainingTitle: string
  researchTitle: string
  inquiryEyebrow: string
  inquiryTitle: string
  inquiryDescription: string
  priorityHelplineLabel: string
  reportVerificationLabel: string
}

export type ServicesPageContent = ServicesSectionText & {
  certificationStats: CertificationStat[]
  kitCards: KitCardData[]
  legalLinks: LegalLinkItem[]
  researchItems: ResearchItem[]
  trainingCards: TrainingCard[]
}
