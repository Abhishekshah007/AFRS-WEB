import type { ServicesPageViewProps } from '@/components/services/ServicesPageView'
import type { AfslTestimonial } from '@/components/services/AfslTestimonialsSection'
import type {
  CatalogItem,
  DirectorateMember,
  KitCardData,
  LegalLinkItem,
  ResearchItem,
  ServicesPageContent,
  SiteContact,
  TrainingCard,
} from '@/components/services/types'
import {
  defaultServicesPageContent,
  defaultSiteContact,
  fallbackBanners,
  fallbackCatalog,
  fallbackDirectors,
  fallbackTeam,
} from '@/data/defaults/services'
import { richTextToPlain, resolveMediaUrl } from '@/lib/cms'
import { getPayloadClient } from '@/lib/payload'
import { getFeaturedGalleryItems } from '@/lib/queries/gallery'
import { testimonialPlacementWhere } from '@/lib/queries/testimonials'
import type { Media, Scientist, Service, ServicesPage, SiteSetting, Testimonial } from '@/payload-types'

function toMember(sci: Scientist): DirectorateMember {
  const photo = resolveMediaUrl(sci.photo as number | Media | null | undefined, '')
  const initials =
    sci.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '??'
  return {
    id: sci.id,
    name: sci.name,
    designation: sci.designation ?? 'Forensic Scientist',
    bio: sci.bio,
    photo: photo || undefined,
    initials,
    status: sci.status === 'inactive' ? 'inactive' : 'active',
  }
}

function toLegalLinks(items: LegalLinkItem[] | null | undefined): LegalLinkItem[] | undefined {
  if (!Array.isArray(items)) return undefined
  const normalized = items
    .map((item) => ({
      title: item.title?.trim() ?? '',
      desc: item.desc?.trim() ?? '',
    }))
    .filter((item) => item.title && item.desc)
  return normalized.length > 0 ? normalized : undefined
}

function toLegalLinksLegacy(items: unknown): LegalLinkItem[] | undefined {
  if (!Array.isArray(items)) return undefined

  const normalized = items
    .map((item) => {
      if (typeof item === 'string') {
        return { title: item.trim(), desc: '' }
      }

      const row = item as { title?: string | null; desc?: string | null; text?: string | null }
      const title = row.title?.trim() || row.text?.trim() || ''
      const desc = row.desc?.trim() || ''
      return { title, desc }
    })
    .filter((item) => item.title)

  return normalized.length > 0 ? normalized : undefined
}

function toKitCards(items: KitCardData[] | null | undefined): KitCardData[] | undefined {
  if (!Array.isArray(items)) return undefined
  const normalized = items
    .map((item) => ({
      title: item.title?.trim() ?? '',
      icon: item.icon?.trim() || 'Box',
    }))
    .filter((item) => item.title)
  return normalized.length > 0 ? normalized : undefined
}

function toResearchItems(items: ResearchItem[] | null | undefined): ResearchItem[] | undefined {
  if (!Array.isArray(items)) return undefined
  const normalized = items
    .map((item) => ({
      num: item.num?.trim() ?? '',
      title: item.title?.trim() ?? '',
      desc: item.desc?.trim() ?? '',
    }))
    .filter((item) => item.title && item.desc)
  return normalized.length > 0 ? normalized : undefined
}

function toTrainingCards(items: TrainingCard[] | null | undefined): TrainingCard[] | undefined {
  if (!Array.isArray(items)) return undefined
  const normalized = items
    .map((item) => ({
      title: item.title?.trim() ?? '',
      desc: item.desc?.trim() ?? '',
      cta: item.cta?.trim() ?? 'Learn more',
      href: item.href?.trim() || '/courses',
    }))
    .filter((item) => item.title && item.desc)
  return normalized.length > 0 ? normalized : undefined
}

function withDefaultString(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback
}

const defaultAfslTestimonials: AfslTestimonial[] = [
  {
    id: 'afsl-t1',
    name: 'Adv. Meera Joshi',
    title: 'Legal Practitioner',
    testimonial:
      'AFSL delivered a clear, well-documented forensic opinion that helped us prepare the matter with confidence. Communication was professional throughout.',
    rating: 5,
  },
  {
    id: 'afsl-t2',
    name: 'Inspector R. Chauhan',
    title: 'Investigating Officer',
    testimonial:
      'The laboratory examination and reporting were timely and scientifically structured. The team understood the investigative context and evidence handling requirements.',
    rating: 5,
  },
  {
    id: 'afsl-t3',
    name: 'Dr. Ankit Verma',
    title: 'Academic Partner',
    testimonial:
      'Our students gained valuable exposure through AFSL’s professional forensic workflows. The consultancy and laboratory guidance were practical and academically relevant.',
    rating: 5,
  },
]

function buildServicesContent(cms?: ServicesPage['sectionText']): ServicesPageContent {
  const defaults = defaultServicesPageContent
  const source = cms ?? {}

  return {
    heroEyebrow: withDefaultString(source.heroEyebrow, defaults.heroEyebrow),
    heroTitle: withDefaultString(source.heroTitle, defaults.heroTitle),
    heroHighlight: withDefaultString(source.heroHighlight, defaults.heroHighlight),
    heroDescription: withDefaultString(source.heroDescription, defaults.heroDescription),
    heroCtaLabel: withDefaultString(source.heroCtaLabel, defaults.heroCtaLabel),
    labStatusLabel: withDefaultString(source.labStatusLabel, defaults.labStatusLabel),
    labStatusValue: withDefaultString(source.labStatusValue, defaults.labStatusValue),
    labCardCtaLabel: withDefaultString(source.labCardCtaLabel, defaults.labCardCtaLabel),
    infrastructureEyebrow: withDefaultString(
      source.infrastructureEyebrow,
      defaults.infrastructureEyebrow,
    ),
    infrastructureTitle: withDefaultString(source.infrastructureTitle, defaults.infrastructureTitle),
    infrastructureBody1: withDefaultString(source.infrastructureBody1, defaults.infrastructureBody1),
    infrastructureBody2: withDefaultString(source.infrastructureBody2, defaults.infrastructureBody2),
    visionTitle: withDefaultString(source.visionTitle, defaults.visionTitle),
    visionBody: withDefaultString(source.visionBody, defaults.visionBody),
    missionTitle: withDefaultString(source.missionTitle, defaults.missionTitle),
    missionBody: withDefaultString(source.missionBody, defaults.missionBody),
    directorateEyebrow: withDefaultString(source.directorateEyebrow, defaults.directorateEyebrow),
    directorateTitle: withDefaultString(source.directorateTitle, defaults.directorateTitle),
    directorateSubtitle: withDefaultString(source.directorateSubtitle, defaults.directorateSubtitle),
    teamEyebrow: withDefaultString(source.teamEyebrow, defaults.teamEyebrow),
    teamTitle: withDefaultString(source.teamTitle, defaults.teamTitle),
    teamSubtitle: withDefaultString(source.teamSubtitle, defaults.teamSubtitle),
    catalogEyebrow: withDefaultString(source.catalogEyebrow, defaults.catalogEyebrow),
    catalogTitle: withDefaultString(source.catalogTitle, defaults.catalogTitle),
    legalTitle: withDefaultString(source.legalTitle, defaults.legalTitle),
    legalSubtitle: withDefaultString(source.legalSubtitle, defaults.legalSubtitle),
    legalDescription: withDefaultString(source.legalDescription, defaults.legalDescription),
    legalCtaLabel: withDefaultString(source.legalCtaLabel, defaults.legalCtaLabel),
    legalCtaSubtext: withDefaultString(source.legalCtaSubtext, defaults.legalCtaSubtext),
    kitsEyebrow: withDefaultString(source.kitsEyebrow, defaults.kitsEyebrow),
    kitsTitle: withDefaultString(source.kitsTitle, defaults.kitsTitle),
    kitsDescription: withDefaultString(source.kitsDescription, defaults.kitsDescription),
    trainingTitle: withDefaultString(source.trainingTitle, defaults.trainingTitle),
    researchTitle: withDefaultString(source.researchTitle, defaults.researchTitle),
    inquiryEyebrow: withDefaultString(source.inquiryEyebrow, defaults.inquiryEyebrow),
    inquiryTitle: withDefaultString(source.inquiryTitle, defaults.inquiryTitle),
    inquiryDescription: withDefaultString(source.inquiryDescription, defaults.inquiryDescription),
    priorityHelplineLabel: withDefaultString(
      source.priorityHelplineLabel,
      defaults.priorityHelplineLabel,
    ),
    reportVerificationLabel: withDefaultString(
      source.reportVerificationLabel,
      defaults.reportVerificationLabel,
    ),
    certificationStats:
      source.certificationStats?.length
        ? source.certificationStats.map((item) => ({
            label: item.label ?? '',
            caption: item.caption ?? '',
          }))
        : defaults.certificationStats,
    kitCards:
      toKitCards(source.kitCards as KitCardData[] | null | undefined) ?? defaults.kitCards,
    legalLinks:
      toLegalLinks(source.legalLinks as LegalLinkItem[] | null | undefined) ??
      toLegalLinksLegacy(source.legalLinks) ??
      defaults.legalLinks,
    researchItems:
      toResearchItems(source.researchItems as ResearchItem[] | null | undefined) ??
      defaults.researchItems,
    trainingCards:
      toTrainingCards(source.trainingCards as TrainingCard[] | null | undefined) ??
      defaults.trainingCards,
  }
}

function buildSiteContact(site: SiteSetting | null | undefined): SiteContact {
  return {
    phone: site?.phone || defaultSiteContact.phone,
    email: site?.email || defaultSiteContact.email,
    address: site?.address || defaultSiteContact.address,
    mapEmbedUrl: site?.mapEmbedUrl,
  }
}

export async function getServicesPageData(): Promise<ServicesPageViewProps> {
  const payload = await getPayloadClient()

  const [servicesPage, services, scientists, siteData, galleryItems, testimonials] = await Promise.all([
    payload.findGlobal({ slug: 'servicesPage', depth: 0, overrideAccess: false }),
    payload.find({
      collection: 'services',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 50,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'scientists',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 200,
      depth: 1,
      overrideAccess: false,
    }),
    payload.findGlobal({ slug: 'siteSettings', depth: 0, overrideAccess: false }),
    getFeaturedGalleryItems(4),
    payload.find({
      collection: 'testimonials',
      where: testimonialPlacementWhere('afsl'),
      limit: 50,
      depth: 0,
      overrideAccess: false,
    }),
  ])

  const site = siteData as SiteSetting
  const content = buildServicesContent((servicesPage as ServicesPage)?.sectionText)

  const catalogItems: CatalogItem[] =
    services.docs.length > 0
      ? services.docs.map((s, i) => {
          const srv = s as Service
          return {
            id: srv.id,
            title: srv.title,
            slug: srv.slug,
            desc: srv.excerpt || richTextToPlain(srv.content, 120),
            banner: resolveMediaUrl(
              srv.banner as number | Media | null | undefined,
              fallbackBanners[i % fallbackBanners.length],
            ),
          }
        })
      : fallbackCatalog

  const cmsScientists = scientists.docs as Scientist[]
  const directors = cmsScientists
    .filter((scientist) => scientist.memberType === 'director')
    .map(toMember)
  const teamMembers = cmsScientists
    .filter((scientist) => scientist.memberType !== 'director')
    .map(toMember)

  const resolvedDirectors = cmsScientists.length === 0 ? fallbackDirectors : directors
  const resolvedTeamMembers = cmsScientists.length === 0 ? fallbackTeam : teamMembers

  const cmsTestimonials: AfslTestimonial[] = (testimonials.docs as Testimonial[]).map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title,
    testimonial: item.testimonial,
    rating: item.rating,
  }))

  return {
    content,
    catalogItems,
    directors: resolvedDirectors,
    teamMembers: resolvedTeamMembers,
    site: buildSiteContact(site),
    totalVisitors: site?.totalVisitors || 200,
    galleryItems,
    testimonials: cmsTestimonials.length > 0 ? cmsTestimonials : defaultAfslTestimonials,
  }
}
