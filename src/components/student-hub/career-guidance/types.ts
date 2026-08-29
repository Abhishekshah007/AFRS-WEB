export type CareerLinkItem = {
  label: string
  href: string
}

export type CareerStepItem = {
  label: string
  desc: string
}

export type CareerFaqItem = {
  question: string
  answer: string
}

export type CareerDetailItem = {
  label: string
  value: string
}

export type CareerGuidancePageContent = {
  heroEyebrow: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  heroBody: string
  heroNote: string
  heroCtaLabel: string
  heroCtaHref: string
  careersTitle: string
  careersDescription: string
  careerPathways: string[]
  careersCtaLabel: string
  careersCtaHref: string
  specialisationTitle: string
  specialisationDescription: string
  specialisations: string[]
  specialisationPrimaryCtaLabel: string
  specialisationPrimaryCtaHref: string
  specialisationSecondaryCtaLabel: string
  specialisationSecondaryCtaHref: string
  academicTitle: string
  academicDescription: string
  academicSteps: string[]
  academicNote: string
  skillsTitle: string
  skillsIntro: string
  skillsDescription: string
  skills: string[]
  skillsCtaLabel: string
  skillsCtaHref: string
  internshipsTitle: string
  internshipsIntro: string
  internshipsDescription: string
  internships: string[]
  internshipsNote: string
  internshipsCtaLabel: string
  internshipsCtaHref: string
  examsTitle: string
  examsDescription: string
  exams: string[]
  examsNote: string
  examLinks: CareerLinkItem[]
  researchTitle: string
  researchDescription: string
  researchItems: string[]
  researchCtaLabel: string
  researchCtaHref: string
  finderTitle: string
  finderIntro: string
  finderDescription: string
  finderFormula: string
  finderDisclaimer: string
  consultationTitle: string
  consultationDescription: string
  consultationTopics: string[]
  consultationDetails: CareerDetailItem[]
  consultationCtaLabel: string
  consultationCtaHref: string
  journeyTitle: string
  journeySteps: CareerStepItem[]
  resourcesTitle: string
  resourcesDescription: string
  resources: string[]
  resourcesCtaLabel: string
  resourcesCtaHref: string
  faqTitle: string
  faqs: CareerFaqItem[]
  bottomCtaTitle: string
  bottomCtaIntro: string
  bottomCtaDescription: string
  bottomCtas: CareerLinkItem[]
  disclaimer: string
  quickNav: CareerLinkItem[]
}
