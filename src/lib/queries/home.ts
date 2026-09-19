import { fetchActiveEvents } from '@/lib/queries/events'
import { testimonialPlacementWhere } from '@/lib/queries/testimonials'
import { getPayloadClient } from '@/lib/payload'
import { emptyPaginatedDocs } from '@/lib/resilience/emptyPaginated'
import { safeQuery } from '@/lib/resilience/safeQuery'
import type {
  Event as AfrsEvent,
  GalleryItem,
  HomePage,
  ImpactStat,
  Notice,
  PartnersLogo,
  Scientist,
  Service,
  SiteSetting,
  Testimonial,
} from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import type { HomeFaqItem, HomeNoticeBoardItem } from '@/lib/queries/home-content'
import { mapHomeNotices, resolveHomeFaqs } from '@/lib/queries/home-content'

export type HomePageData = {
  events: PaginatedDocs<AfrsEvent>
  services: PaginatedDocs<Service>
  testimonials: PaginatedDocs<Testimonial>
  scientists: PaginatedDocs<Scientist>
  galleryItems: PaginatedDocs<GalleryItem>
  impactStats: PaginatedDocs<ImpactStat>
  partnerLogos: PaginatedDocs<PartnersLogo>
  homePage: HomePage | null
  siteSettings: SiteSetting | null
  notices: HomeNoticeBoardItem[]
  faqs: HomeFaqItem[]
  cmsAvailable: boolean
}

const EMPTY_HOME: HomePageData = {
  events: emptyPaginatedDocs<AfrsEvent>(),
  services: emptyPaginatedDocs<Service>(),
  testimonials: emptyPaginatedDocs<Testimonial>(),
  scientists: emptyPaginatedDocs<Scientist>(),
  galleryItems: emptyPaginatedDocs<GalleryItem>(),
  impactStats: emptyPaginatedDocs<ImpactStat>(),
  partnerLogos: emptyPaginatedDocs<PartnersLogo>(),
  homePage: null,
  siteSettings: null,
  notices: mapHomeNotices([]),
  faqs: resolveHomeFaqs(null),
  cmsAvailable: false,
}

export async function getHomePageData(): Promise<HomePageData> {
  return safeQuery(
    'getHomePageData',
    async () => {
      const payload = await getPayloadClient()

      const [
        events,
        services,
        testimonials,
        scientists,
        galleryItems,
        impactStats,
        partnerLogos,
        homePage,
        siteSettings,
        noticeDocs,
      ] = await Promise.all([
        fetchActiveEvents(payload, { limit: 3, depth: 1 }),
        payload.find({
          collection: 'services',
          where: { published: { equals: true } },
          limit: 6,
          sort: 'order',
          depth: 1,
          overrideAccess: false,
        }),
        payload.find({
          collection: 'testimonials',
          where: testimonialPlacementWhere('afrs'),
          limit: 50,
          depth: 1,
          overrideAccess: false,
        }),
        payload.find({
          collection: 'scientists',
          where: { published: { equals: true } },
          limit: 2,
          sort: 'order',
          depth: 1,
          overrideAccess: false,
        }),
        payload.find({
          collection: 'galleryItems',
          where: { published: { equals: true }, featured: { equals: true } },
          limit: 4,
          sort: 'order',
          depth: 1,
          overrideAccess: false,
        }),
        payload.find({
          collection: 'impactStats',
          where: { published: { equals: true } },
          limit: 5,
          sort: 'order',
          overrideAccess: false,
        }),
        payload.find({
          collection: 'partnersLogo',
          where: { published: { equals: true } },
          limit: 50,
          sort: 'order',
          depth: 1,
          overrideAccess: false,
        }),
        payload.findGlobal({
          slug: 'homePage',
          depth: 1,
          overrideAccess: false,
        }) as Promise<HomePage>,
        payload.findGlobal({
          slug: 'siteSettings',
          depth: 0,
          overrideAccess: false,
        }) as Promise<SiteSetting>,
        payload.find({
          collection: 'notices',
          where: { published: { equals: true } },
          sort: ['-noticeDate', 'order'],
          limit: 3,
          depth: 0,
          overrideAccess: false,
        }),
      ])

      const resolvedHomePage = homePage as HomePage

      return {
        events,
        services,
        testimonials,
        scientists,
        galleryItems,
        impactStats,
        partnerLogos,
        homePage: resolvedHomePage,
        siteSettings,
        notices: mapHomeNotices(noticeDocs.docs as Notice[]),
        faqs: resolveHomeFaqs(resolvedHomePage),
        cmsAvailable: true,
      }
    },
    EMPTY_HOME,
  )
}
