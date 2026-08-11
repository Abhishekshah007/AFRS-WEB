import { ABOUT_IMAGES } from '@/components/about/tokens'
import type { AboutPageViewProps } from '@/components/about/AboutPageView'
import type {
  AboutSectionText,
  AchievementStat,
  CertificationItem,
  LeaderProfile,
  ListItem,
  MembershipPlan,
} from '@/components/about/types'
import {
  defaultAchievements,
  defaultActivities,
  defaultCertifications,
  defaultSectionText,
  defaultUnique,
  fallbackCommittee,
  fallbackLeaders,
} from '@/data/defaults/about'
import { resolveMediaUrl } from '@/lib/cms'
import { membershipWhatsAppHref } from '@/lib/queries/site'
import { getPayloadClient } from '@/lib/payload'
import type {
  AboutCertification,
  AboutPage,
  ImpactStat,
  Media,
  Scientist,
  SiteSetting,
} from '@/payload-types'

const toneMap: Record<string, AchievementStat['tone']> = {
  indigo: 'blue',
  blue: 'blue',
  purple: 'purple',
  orange: 'orange',
  emerald: 'green',
  green: 'green',
}

type CmsTextRow = { text?: string | null }
type CmsListRow = CmsTextRow & { description?: string | null }
type CmsCertificationRow = {
  icon?: string | null
  title?: string | null
  description?: string | null
}
type CmsMembershipPlanRow = {
  title?: string | null
  description?: string | null
  href?: string | null
  badge?: string | null
  dark?: boolean | null
}

type CmsAboutSectionText = Omit<
  AboutSectionText,
  | 'expertiseItems'
  | 'whyChooseItems'
  | 'qualityEthicsItems'
  | 'researchItems'
  | 'partnershipItems'
  | 'futureRoadmapItems'
  | 'membershipReasons'
  | 'pillarProofLabels'
  | 'certifications'
  | 'uniqueItems'
  | 'activityItems'
  | 'membershipPlans'
> & {
  expertiseItems?: (string | CmsTextRow)[] | null
  whyChooseItems?: (string | CmsTextRow)[] | null
  qualityEthicsItems?: (string | CmsTextRow)[] | null
  researchItems?: (string | CmsTextRow)[] | null
  partnershipItems?: (string | CmsTextRow)[] | null
  futureRoadmapItems?: (string | CmsTextRow)[] | null
  membershipReasons?: (string | CmsTextRow)[] | null
  pillarProofLabels?: (string | CmsTextRow)[] | null
  certifications?: CmsCertificationRow[] | null
  uniqueItems?: CmsListRow[] | null
  activityItems?: CmsListRow[] | null
  membershipPlans?: CmsMembershipPlanRow[] | null
}

function parseStatValue(raw: string): Pick<AchievementStat, 'value' | 'numericEnd' | 'suffix'> {
  const match = raw.trim().match(/^(\d+)(.*)$/)
  if (!match) return { value: raw }
  return {
    value: raw,
    numericEnd: Number(match[1]),
    suffix: match[2] || '',
  }
}

function toLeader(sci: Scientist, index: number): LeaderProfile {
  const photoUrl = resolveMediaUrl(sci.photo as number | Media | null | undefined, '')
  const initials =
    sci.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '??'

  return {
    id: String(sci.id ?? index),
    name: sci.name,
    designation: sci.designation ?? 'Forensic Scientist',
    bio: sci.bio,
    photoUrl: photoUrl || undefined,
    initials,
  }
}

function toTextArray(items: unknown): string[] | undefined {
  if (!Array.isArray(items)) return undefined
  const normalized = items
    .map((item) =>
      typeof item === 'string' ? item : (item as CmsTextRow | null | undefined)?.text,
    )
    .filter((item): item is string => Boolean(item?.trim()))
  return normalized.length > 0 ? normalized : undefined
}

function toListItems(items: CmsListRow[] | null | undefined): ListItem[] | undefined {
  if (!Array.isArray(items)) return undefined
  const normalized = items
    .map((item) => ({
      text: item.text?.trim() ?? '',
      description: item.description?.trim() || undefined,
    }))
    .filter((item) => item.text)
  return normalized.length > 0 ? normalized : undefined
}

function toCertifications(
  items: CmsCertificationRow[] | null | undefined,
): CertificationItem[] | undefined {
  if (!Array.isArray(items)) return undefined
  const normalized = items
    .map((item) => ({
      icon: item.icon?.trim() || '✓',
      title: item.title?.trim() ?? '',
      description: item.description?.trim() || undefined,
    }))
    .filter((item) => item.title)
  return normalized.length > 0 ? normalized : undefined
}

function toCertificationItem(cert: AboutCertification): CertificationItem {
  const icon = resolveMediaUrl(cert.logo as number | Media | null | undefined, '')

  return {
    title: cert.title,
    icon: icon || undefined,
    description: cert.description || undefined,
    issuer: cert.issuer || undefined,
    href: cert.certificateUrl || undefined,
  }
}

function toMembershipPlans(
  items: CmsMembershipPlanRow[] | null | undefined,
  whatsappPhone?: string | null,
): MembershipPlan[] | undefined {
  if (!Array.isArray(items)) return undefined
  const normalized = items
    .map((item) => ({
      title: item.title?.trim() ?? '',
      description: item.description?.trim() ?? '',
      href:
        item.href?.trim() ||
        membershipWhatsAppHref(whatsappPhone, item.title?.trim() || 'membership'),
      badge: item.badge?.trim() || 'Popular',
      dark: Boolean(item.dark),
    }))
    .filter((item) => item.title && item.description)
  return normalized.length > 0 ? normalized : undefined
}

function buildAboutSectionText(
  cmsSectionText?: AboutPage['sectionText'],
  whatsappPhone?: string | null,
): AboutSectionText {
  const cms = (cmsSectionText ?? {}) as CmsAboutSectionText

  return {
    ...defaultSectionText,
    ...cms,
    expertiseItems: toTextArray(cms.expertiseItems) ?? defaultSectionText.expertiseItems,
    whyChooseItems: toTextArray(cms.whyChooseItems) ?? defaultSectionText.whyChooseItems,
    qualityEthicsItems:
      toTextArray(cms.qualityEthicsItems) ?? defaultSectionText.qualityEthicsItems,
    researchItems: toTextArray(cms.researchItems) ?? defaultSectionText.researchItems,
    partnershipItems: toTextArray(cms.partnershipItems) ?? defaultSectionText.partnershipItems,
    futureRoadmapItems:
      toTextArray(cms.futureRoadmapItems) ?? defaultSectionText.futureRoadmapItems,
    membershipReasons: toTextArray(cms.membershipReasons) ?? defaultSectionText.membershipReasons,
    pillarProofLabels: toTextArray(cms.pillarProofLabels) ?? defaultSectionText.pillarProofLabels,
    certifications: toCertifications(cms.certifications) ?? defaultSectionText.certifications,
    uniqueItems: toListItems(cms.uniqueItems) ?? defaultSectionText.uniqueItems,
    activityItems: toListItems(cms.activityItems) ?? defaultSectionText.activityItems,
    membershipPlans:
      toMembershipPlans(cms.membershipPlans, whatsappPhone) ?? defaultSectionText.membershipPlans,
  }
}

function resolveWhatsappPhone(siteSettings: SiteSetting | null | undefined): string | null | undefined {
  return siteSettings?.socialLinks?.whatsapp || siteSettings?.phone
}

function applyMembershipWhatsAppLinks(
  plans: MembershipPlan[] | null | undefined,
  whatsappPhone?: string | null,
): MembershipPlan[] {
  return (plans ?? defaultSectionText.membershipPlans ?? []).map((plan) => ({
    ...plan,
    href:
      plan.href && plan.href !== '/contact'
        ? plan.href
        : membershipWhatsAppHref(whatsappPhone, plan.title),
  }))
}

export async function getAboutPageData(): Promise<AboutPageViewProps> {
  const payload = await getPayloadClient()

  const [aboutPage, siteSettings, scientists, impactStats, certificationsResult] = await Promise.all([
    payload.findGlobal({ slug: 'aboutPage', depth: 1, overrideAccess: false }),
    payload.findGlobal({ slug: 'siteSettings', depth: 0, overrideAccess: false }),
    payload.find({
      collection: 'scientists',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 12,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'impactStats',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 5,
      depth: 0,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'aboutCertifications',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 50,
      depth: 1,
      overrideAccess: false,
    }),
  ])

  const about = aboutPage as AboutPage
  const site = siteSettings as SiteSetting
  const whatsappPhone = resolveWhatsappPhone(site)
  const sectionText = buildAboutSectionText(about?.sectionText, whatsappPhone)
  const membershipPlans = applyMembershipWhatsAppLinks(sectionText.membershipPlans, whatsappPhone)

  const heroImage = resolveMediaUrl(
    (about?.hero as { heroImage?: number | Media | null })?.heroImage,
    ABOUT_IMAGES.hero,
  )

  const allLeaders =
    scientists.docs.length > 0
      ? (scientists.docs as Scientist[]).map((s, i) => toLeader(s, i))
      : [...fallbackLeaders, ...fallbackCommittee]

  const featuredLeaders = allLeaders.slice(0, Math.max(2, Math.min(4, allLeaders.length)))
  const committee = allLeaders.length > 2 ? allLeaders.slice(2, 7) : fallbackCommittee

  const achievements: AchievementStat[] =
    impactStats.docs.length > 0
      ? (impactStats.docs as ImpactStat[]).map((stat, i) => {
          const parsed = parseStatValue(stat.value ?? '0')
          const tones: AchievementStat['tone'][] = ['blue', 'purple', 'orange', 'green', 'red']
          return {
            ...parsed,
            label: stat.label ?? 'Stat',
            tone: toneMap[stat.tone ?? ''] ?? tones[i % tones.length],
          }
        })
      : defaultAchievements

  const cmsCertifications =
    certificationsResult.docs.length > 0
      ? (certificationsResult.docs as AboutCertification[]).map(toCertificationItem)
      : undefined

  return {
    sectionText: { ...sectionText, membershipPlans },
    featuredLeaders: featuredLeaders.length >= 2 ? featuredLeaders : fallbackLeaders,
    committee,
    achievements,
    certifications: cmsCertifications ?? sectionText.certifications ?? defaultCertifications,
    uniqueItems: sectionText.uniqueItems ?? defaultUnique,
    activityItems: sectionText.activityItems ?? defaultActivities,
    expertiseItems: sectionText.expertiseItems ?? [],
    whyChooseItems: sectionText.whyChooseItems ?? [],
    qualityEthicsItems: sectionText.qualityEthicsItems ?? [],
    researchItems: sectionText.researchItems ?? [],
    partnershipItems: sectionText.partnershipItems ?? [],
    futureRoadmapItems: sectionText.futureRoadmapItems ?? [],
    membershipReasons: sectionText.membershipReasons ?? [],
    heroImage,
  }
}
