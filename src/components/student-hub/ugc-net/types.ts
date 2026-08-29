export type UgcNetBenefitItem = {
  title: string
  desc: string
}

export type UgcNetLearningStep = {
  label: string
  desc: string
}

export type UgcNetFeatureRow = {
  feature: string
  details: string
}

export type UgcNetBatchDetail = {
  label: string
  value: string
}

export type UgcNetFaqItem = {
  question: string
  answer: string
}

export type UgcNetNavItem = {
  label: string
  href: string
}

export type UgcNetPageContent = {
  heroEyebrow: string
  heroTitlePrefix: string
  heroTitleHighlight: string
  heroDescription: string
  heroCtaLabel: string
  heroMetricEyebrow: string
  heroMetricValue: string
  overviewTitle: string
  overviewSubtitle: string
  overviewDescription: string
  overviewBody: string
  whyChooseTitle: string
  whyChooseItems: string[]
  programmeTitle: string
  paperOneTitle: string
  paperOneDescription: string
  paperTwoTitle: string
  paperTwoDescription: string
  benefitsTitle: string
  benefits: UgcNetBenefitItem[]
  learningTitle: string
  learningFlow: string
  learningSteps: UgcNetLearningStep[]
  audienceTitle: string
  audienceItems: string[]
  audienceNote: string
  featuresTitle: string
  features: UgcNetFeatureRow[]
  batchTitle: string
  batchDetails: UgcNetBatchDetail[]
  batchCtaLabel: string
  registrationTitle: string
  registrationSteps: string[]
  facultyTitle: string
  facultyDescription: string
  resourcesTitle: string
  resourceItems: string[]
  supportTitle: string
  supportDescription: string
  faqTitle: string
  faqs: UgcNetFaqItem[]
  bottomCtaTitle: string
  bottomCtaDescription: string
  bottomCtaTagline: string
  bottomCtaPrimaryLabel: string
  bottomCtaSecondaryLabel: string
  bottomCtaContactLabel: string
  achieversEyebrow: string
  achieversTitle: string
  statsValue: string
  statsDescription: string
  quickNav: UgcNetNavItem[]
}
