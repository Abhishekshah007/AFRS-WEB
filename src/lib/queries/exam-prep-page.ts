import type {
  UgcNetBenefitItem,
  UgcNetBatchDetail,
  UgcNetFaqItem,
  UgcNetFeatureRow,
  UgcNetLearningStep,
  UgcNetNavItem,
  UgcNetPageContent,
} from '@/components/student-hub/ugc-net/types'

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

function toBenefits(
  items: UgcNetBenefitItem[] | null | undefined,
  fallback: UgcNetBenefitItem[],
): UgcNetBenefitItem[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      title: item.title?.trim() ?? '',
      desc: item.desc?.trim() ?? '',
    }))
    .filter((item) => item.title && item.desc)
  return normalized.length > 0 ? normalized : fallback
}

function toLearningSteps(
  items: UgcNetLearningStep[] | null | undefined,
  fallback: UgcNetLearningStep[],
): UgcNetLearningStep[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      label: item.label?.trim() ?? '',
      desc: item.desc?.trim() ?? '',
    }))
    .filter((item) => item.label && item.desc)
  return normalized.length > 0 ? normalized : fallback
}

function toFeatures(
  items: UgcNetFeatureRow[] | null | undefined,
  fallback: UgcNetFeatureRow[],
): UgcNetFeatureRow[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      feature: item.feature?.trim() ?? '',
      details: item.details?.trim() ?? '',
    }))
    .filter((item) => item.feature && item.details)
  return normalized.length > 0 ? normalized : fallback
}

function toBatchDetails(
  items: UgcNetBatchDetail[] | null | undefined,
  fallback: UgcNetBatchDetail[],
): UgcNetBatchDetail[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      label: item.label?.trim() ?? '',
      value: item.value?.trim() ?? '',
    }))
    .filter((item) => item.label && item.value)
  return normalized.length > 0 ? normalized : fallback
}

function toFaqs(items: UgcNetFaqItem[] | null | undefined, fallback: UgcNetFaqItem[]): UgcNetFaqItem[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      question: item.question?.trim() ?? '',
      answer: item.answer?.trim() ?? '',
    }))
    .filter((item) => item.question && item.answer)
  return normalized.length > 0 ? normalized : fallback
}

function toQuickNav(items: UgcNetNavItem[] | null | undefined, fallback: UgcNetNavItem[]): UgcNetNavItem[] {
  if (!Array.isArray(items)) return fallback
  const normalized = items
    .map((item) => ({
      label: item.label?.trim() ?? '',
      href: item.href?.trim() ?? '',
    }))
    .filter((item) => item.label && item.href)
  const nav = normalized.length > 0 ? normalized : fallback
  if (nav.some((item) => item.href === '#gallery')) return nav

  const withGallery = [...nav]
  const faqsIndex = withGallery.findIndex((item) => item.href === '#faqs')
  withGallery.splice(faqsIndex >= 0 ? faqsIndex + 1 : withGallery.length, 0, {
    label: 'Gallery',
    href: '#gallery',
  })
  return withGallery
}

export function buildExamPrepPageContent(
  defaults: UgcNetPageContent,
  source?: Partial<UgcNetPageContent> | null,
): UgcNetPageContent {
  const cms = source ?? {}

  return {
    heroEyebrow: withDefaultString(cms.heroEyebrow, defaults.heroEyebrow),
    heroTitlePrefix: withDefaultString(cms.heroTitlePrefix, defaults.heroTitlePrefix),
    heroTitleHighlight: withDefaultString(cms.heroTitleHighlight, defaults.heroTitleHighlight),
    heroDescription: withDefaultString(cms.heroDescription, defaults.heroDescription),
    heroCtaLabel: withDefaultString(cms.heroCtaLabel, defaults.heroCtaLabel),
    heroMetricEyebrow: withDefaultString(cms.heroMetricEyebrow, defaults.heroMetricEyebrow),
    heroMetricValue: withDefaultString(cms.heroMetricValue, defaults.heroMetricValue),
    overviewTitle: withDefaultString(cms.overviewTitle, defaults.overviewTitle),
    overviewSubtitle: withDefaultString(cms.overviewSubtitle, defaults.overviewSubtitle),
    overviewDescription: withDefaultString(cms.overviewDescription, defaults.overviewDescription),
    overviewBody: withDefaultString(cms.overviewBody, defaults.overviewBody),
    whyChooseTitle: withDefaultString(cms.whyChooseTitle, defaults.whyChooseTitle),
    whyChooseItems: toTextArray(cms.whyChooseItems, defaults.whyChooseItems),
    programmeTitle: withDefaultString(cms.programmeTitle, defaults.programmeTitle),
    paperOneTitle: withDefaultString(cms.paperOneTitle, defaults.paperOneTitle),
    paperOneDescription: withDefaultString(cms.paperOneDescription, defaults.paperOneDescription),
    paperTwoTitle: withDefaultString(cms.paperTwoTitle, defaults.paperTwoTitle),
    paperTwoDescription: withDefaultString(cms.paperTwoDescription, defaults.paperTwoDescription),
    benefitsTitle: withDefaultString(cms.benefitsTitle, defaults.benefitsTitle),
    benefits: toBenefits(cms.benefits, defaults.benefits),
    learningTitle: withDefaultString(cms.learningTitle, defaults.learningTitle),
    learningFlow: withDefaultString(cms.learningFlow, defaults.learningFlow),
    learningSteps: toLearningSteps(cms.learningSteps, defaults.learningSteps),
    audienceTitle: withDefaultString(cms.audienceTitle, defaults.audienceTitle),
    audienceItems: toTextArray(cms.audienceItems, defaults.audienceItems),
    audienceNote: withDefaultString(cms.audienceNote, defaults.audienceNote),
    featuresTitle: withDefaultString(cms.featuresTitle, defaults.featuresTitle),
    features: toFeatures(cms.features, defaults.features),
    batchTitle: withDefaultString(cms.batchTitle, defaults.batchTitle),
    batchDetails: toBatchDetails(cms.batchDetails, defaults.batchDetails),
    batchCtaLabel: withDefaultString(cms.batchCtaLabel, defaults.batchCtaLabel),
    registrationTitle: withDefaultString(cms.registrationTitle, defaults.registrationTitle),
    registrationSteps: toTextArray(cms.registrationSteps, defaults.registrationSteps),
    facultyTitle: withDefaultString(cms.facultyTitle, defaults.facultyTitle),
    facultyDescription: withDefaultString(cms.facultyDescription, defaults.facultyDescription),
    resourcesTitle: withDefaultString(cms.resourcesTitle, defaults.resourcesTitle),
    resourceItems: toTextArray(cms.resourceItems, defaults.resourceItems),
    supportTitle: withDefaultString(cms.supportTitle, defaults.supportTitle),
    supportDescription: withDefaultString(cms.supportDescription, defaults.supportDescription),
    faqTitle: withDefaultString(cms.faqTitle, defaults.faqTitle),
    faqs: toFaqs(cms.faqs, defaults.faqs),
    bottomCtaTitle: withDefaultString(cms.bottomCtaTitle, defaults.bottomCtaTitle),
    bottomCtaDescription: withDefaultString(cms.bottomCtaDescription, defaults.bottomCtaDescription),
    bottomCtaTagline: withDefaultString(cms.bottomCtaTagline, defaults.bottomCtaTagline),
    bottomCtaPrimaryLabel: withDefaultString(
      cms.bottomCtaPrimaryLabel,
      defaults.bottomCtaPrimaryLabel,
    ),
    bottomCtaSecondaryLabel: withDefaultString(
      cms.bottomCtaSecondaryLabel,
      defaults.bottomCtaSecondaryLabel,
    ),
    bottomCtaContactLabel: withDefaultString(
      cms.bottomCtaContactLabel,
      defaults.bottomCtaContactLabel,
    ),
    achieversEyebrow: withDefaultString(cms.achieversEyebrow, defaults.achieversEyebrow),
    achieversTitle: withDefaultString(cms.achieversTitle, defaults.achieversTitle),
    statsValue: withDefaultString(cms.statsValue, defaults.statsValue),
    statsDescription: withDefaultString(cms.statsDescription, defaults.statsDescription),
    quickNav: toQuickNav(cms.quickNav, defaults.quickNav),
  }
}
