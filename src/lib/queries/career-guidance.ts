import type {
  CareerDetailItem,
  CareerFaqItem,
  CareerGuidancePageContent,
  CareerLinkItem,
  CareerStepItem,
} from '@/components/student-hub/career-guidance/types'
import { defaultCareerGuidancePageContent } from '@/data/defaults/student-hub/career-guidance'

type CmsTextRow = { text?: string | null }

function withDefaultString(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback
}

function toTextArray(items: unknown, fallback: string[]): string[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) =>
      typeof item === 'string' ? item : (item as CmsTextRow | null | undefined)?.text,
    )
    .filter((item): item is string => Boolean(item?.trim()))
  return normalized.length > 0 ? normalized : fallback
}

function toLinks(items: CareerLinkItem[] | null | undefined, fallback: CareerLinkItem[]): CareerLinkItem[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      label: item.label?.trim() ?? '',
      href: item.href?.trim() ?? '',
    }))
    .filter((item) => item.label && item.href)
  return normalized.length > 0 ? normalized : fallback
}

function toSteps(items: CareerStepItem[] | null | undefined, fallback: CareerStepItem[]): CareerStepItem[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      label: item.label?.trim() ?? '',
      desc: item.desc?.trim() ?? '',
    }))
    .filter((item) => item.label && item.desc)
  return normalized.length > 0 ? normalized : fallback
}

function toDetails(
  items: CareerDetailItem[] | null | undefined,
  fallback: CareerDetailItem[],
): CareerDetailItem[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      label: item.label?.trim() ?? '',
      value: item.value?.trim() ?? '',
    }))
    .filter((item) => item.label && item.value)
  return normalized.length > 0 ? normalized : fallback
}

function toFaqs(items: CareerFaqItem[] | null | undefined, fallback: CareerFaqItem[]): CareerFaqItem[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      question: item.question?.trim() ?? '',
      answer: item.answer?.trim() ?? '',
    }))
    .filter((item) => item.question && item.answer)
  return normalized.length > 0 ? normalized : fallback
}

export function buildCareerGuidancePageContent(
  source?: Partial<CareerGuidancePageContent> | null,
): CareerGuidancePageContent {
  const defaults = defaultCareerGuidancePageContent
  const cms = source ?? {}

  return {
    heroEyebrow: withDefaultString(cms.heroEyebrow, defaults.heroEyebrow),
    heroTitle: withDefaultString(cms.heroTitle, defaults.heroTitle),
    heroHighlight: withDefaultString(cms.heroHighlight, defaults.heroHighlight),
    heroDescription: withDefaultString(cms.heroDescription, defaults.heroDescription),
    heroBody: withDefaultString(cms.heroBody, defaults.heroBody),
    heroNote: withDefaultString(cms.heroNote, defaults.heroNote),
    heroCtaLabel: withDefaultString(cms.heroCtaLabel, defaults.heroCtaLabel),
    heroCtaHref: withDefaultString(cms.heroCtaHref, defaults.heroCtaHref),
    careersTitle: withDefaultString(cms.careersTitle, defaults.careersTitle),
    careersDescription: withDefaultString(cms.careersDescription, defaults.careersDescription),
    careerPathways: toTextArray(cms.careerPathways, defaults.careerPathways),
    careersCtaLabel: withDefaultString(cms.careersCtaLabel, defaults.careersCtaLabel),
    careersCtaHref: withDefaultString(cms.careersCtaHref, defaults.careersCtaHref),
    specialisationTitle: withDefaultString(cms.specialisationTitle, defaults.specialisationTitle),
    specialisationDescription: withDefaultString(
      cms.specialisationDescription,
      defaults.specialisationDescription,
    ),
    specialisations: toTextArray(cms.specialisations, defaults.specialisations),
    specialisationPrimaryCtaLabel: withDefaultString(
      cms.specialisationPrimaryCtaLabel,
      defaults.specialisationPrimaryCtaLabel,
    ),
    specialisationPrimaryCtaHref: withDefaultString(
      cms.specialisationPrimaryCtaHref,
      defaults.specialisationPrimaryCtaHref,
    ),
    specialisationSecondaryCtaLabel: withDefaultString(
      cms.specialisationSecondaryCtaLabel,
      defaults.specialisationSecondaryCtaLabel,
    ),
    specialisationSecondaryCtaHref: withDefaultString(
      cms.specialisationSecondaryCtaHref,
      defaults.specialisationSecondaryCtaHref,
    ),
    academicTitle: withDefaultString(cms.academicTitle, defaults.academicTitle),
    academicDescription: withDefaultString(cms.academicDescription, defaults.academicDescription),
    academicSteps: toTextArray(cms.academicSteps, defaults.academicSteps),
    academicNote: withDefaultString(cms.academicNote, defaults.academicNote),
    skillsTitle: withDefaultString(cms.skillsTitle, defaults.skillsTitle),
    skillsIntro: withDefaultString(cms.skillsIntro, defaults.skillsIntro),
    skillsDescription: withDefaultString(cms.skillsDescription, defaults.skillsDescription),
    skills: toTextArray(cms.skills, defaults.skills),
    skillsCtaLabel: withDefaultString(cms.skillsCtaLabel, defaults.skillsCtaLabel),
    skillsCtaHref: withDefaultString(cms.skillsCtaHref, defaults.skillsCtaHref),
    internshipsTitle: withDefaultString(cms.internshipsTitle, defaults.internshipsTitle),
    internshipsIntro: withDefaultString(cms.internshipsIntro, defaults.internshipsIntro),
    internshipsDescription: withDefaultString(cms.internshipsDescription, defaults.internshipsDescription),
    internships: toTextArray(cms.internships, defaults.internships),
    internshipsNote: withDefaultString(cms.internshipsNote, defaults.internshipsNote),
    internshipsCtaLabel: withDefaultString(cms.internshipsCtaLabel, defaults.internshipsCtaLabel),
    internshipsCtaHref: withDefaultString(cms.internshipsCtaHref, defaults.internshipsCtaHref),
    examsTitle: withDefaultString(cms.examsTitle, defaults.examsTitle),
    examsDescription: withDefaultString(cms.examsDescription, defaults.examsDescription),
    exams: toTextArray(cms.exams, defaults.exams),
    examsNote: withDefaultString(cms.examsNote, defaults.examsNote),
    examLinks: toLinks(cms.examLinks, defaults.examLinks),
    researchTitle: withDefaultString(cms.researchTitle, defaults.researchTitle),
    researchDescription: withDefaultString(cms.researchDescription, defaults.researchDescription),
    researchItems: toTextArray(cms.researchItems, defaults.researchItems),
    researchCtaLabel: withDefaultString(cms.researchCtaLabel, defaults.researchCtaLabel),
    researchCtaHref: withDefaultString(cms.researchCtaHref, defaults.researchCtaHref),
    finderTitle: withDefaultString(cms.finderTitle, defaults.finderTitle),
    finderIntro: withDefaultString(cms.finderIntro, defaults.finderIntro),
    finderDescription: withDefaultString(cms.finderDescription, defaults.finderDescription),
    finderFormula: withDefaultString(cms.finderFormula, defaults.finderFormula),
    finderDisclaimer: withDefaultString(cms.finderDisclaimer, defaults.finderDisclaimer),
    consultationTitle: withDefaultString(cms.consultationTitle, defaults.consultationTitle),
    consultationDescription: withDefaultString(
      cms.consultationDescription,
      defaults.consultationDescription,
    ),
    consultationTopics: toTextArray(cms.consultationTopics, defaults.consultationTopics),
    consultationDetails: toDetails(cms.consultationDetails, defaults.consultationDetails),
    consultationCtaLabel: withDefaultString(cms.consultationCtaLabel, defaults.consultationCtaLabel),
    consultationCtaHref: withDefaultString(cms.consultationCtaHref, defaults.consultationCtaHref),
    journeyTitle: withDefaultString(cms.journeyTitle, defaults.journeyTitle),
    journeySteps: toSteps(cms.journeySteps, defaults.journeySteps),
    resourcesTitle: withDefaultString(cms.resourcesTitle, defaults.resourcesTitle),
    resourcesDescription: withDefaultString(cms.resourcesDescription, defaults.resourcesDescription),
    resources: toTextArray(cms.resources, defaults.resources),
    resourcesCtaLabel: withDefaultString(cms.resourcesCtaLabel, defaults.resourcesCtaLabel),
    resourcesCtaHref: withDefaultString(cms.resourcesCtaHref, defaults.resourcesCtaHref),
    faqTitle: withDefaultString(cms.faqTitle, defaults.faqTitle),
    faqs: toFaqs(cms.faqs, defaults.faqs),
    bottomCtaTitle: withDefaultString(cms.bottomCtaTitle, defaults.bottomCtaTitle),
    bottomCtaIntro: withDefaultString(cms.bottomCtaIntro, defaults.bottomCtaIntro),
    bottomCtaDescription: withDefaultString(cms.bottomCtaDescription, defaults.bottomCtaDescription),
    bottomCtas: toLinks(cms.bottomCtas, defaults.bottomCtas),
    disclaimer: withDefaultString(cms.disclaimer, defaults.disclaimer),
    quickNav: toLinks(cms.quickNav, defaults.quickNav),
  }
}
