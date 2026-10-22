import { fetchActiveEvents } from '@/lib/queries/events'
import { testimonialPlacementWhere } from '@/lib/queries/testimonials'
import { getPayloadClient } from '@/lib/payload'
import { emptyPaginatedDocs } from '@/lib/resilience/emptyPaginated'
import { safeQuery } from '@/lib/resilience/safeQuery'
import type {
  Event as AfrsEvent,
  HomePage,
  ImpactStat,
  Notice,
  PartnersLogo,
  Scientist,
  SitePopup,
  SiteSetting,
  Testimonial,
} from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import type { HomeFaqItem, HomeNoticeBoardItem } from '@/lib/queries/home-content'
import { SITE_CACHE_TAGS } from '@/lib/cache/siteCacheTags'
import { withSiteCache } from '@/lib/cache/withSiteCache'
import { mapHomeNotices, resolveHomeFaqs } from '@/lib/queries/home-content'
import {
  buildHomePopupSlides,
  homePopupFingerprint,
  type HomePopupSlide,
} from '@/lib/popups/homePopupQueue'

export type HomePageData = {
  events: PaginatedDocs<AfrsEvent>
  testimonials: PaginatedDocs<Testimonial>
  scientists: PaginatedDocs<Scientist>
  impactStats: PaginatedDocs<ImpactStat>
  partnerLogos: PaginatedDocs<PartnersLogo>
  homePage: HomePage | null
  siteSettings: SiteSetting | null
  notices: HomeNoticeBoardItem[]
  faqs: HomeFaqItem[]
  popups: HomePopupSlide[]
  popupFingerprint: string
  cmsAvailable: boolean
}

const EMPTY_HOME: HomePageData = {
  events: emptyPaginatedDocs<AfrsEvent>(),
  testimonials: emptyPaginatedDocs<Testimonial>(),
  scientists: emptyPaginatedDocs<Scientist>(),
  impactStats: emptyPaginatedDocs<ImpactStat>(),
  partnerLogos: emptyPaginatedDocs<PartnersLogo>(),
  homePage: null,
  siteSettings: null,
  notices: mapHomeNotices([], { usePlaceholderDefaults: true }),
  faqs: resolveHomeFaqs(null, { usePlaceholderDefaults: true }),
  popups: [],
  popupFingerprint: '',
  cmsAvailable: false,
}

async function loadHomePageData(): Promise<HomePageData> {
  const payload = await getPayloadClient()

  const [
    events,
    testimonials,
    scientists,
    impactStats,
    partnerLogos,
    homePage,
    siteSettings,
    noticeDocs,
    popupDocs,
    popupEvents,
  ] = await Promise.all([
        fetchActiveEvents(payload, { limit: 3, depth: 1 }),
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
        payload.find({
          collection: 'sitePopups',
          where: { published: { equals: true } },
          sort: 'order',
          limit: 5,
          depth: 1,
          overrideAccess: false,
        }),
        payload.find({
          collection: 'events',
          where: {
            and: [{ published: { equals: true } }, { showInHomePopup: { equals: true } }],
          },
          sort: 'startDate',
          limit: 20,
          depth: 1,
          overrideAccess: false,
        }),
  ])

  const resolvedHomePage = homePage as HomePage
  const popups = buildHomePopupSlides(
    popupDocs.docs as SitePopup[],
    popupEvents.docs as AfrsEvent[],
  )

  return {
    events,
    testimonials,
    scientists,
    impactStats,
    partnerLogos,
    homePage: resolvedHomePage,
    siteSettings,
    notices: mapHomeNotices(noticeDocs.docs as Notice[]),
    faqs: resolveHomeFaqs(resolvedHomePage),
    popups,
    popupFingerprint: homePopupFingerprint(popups),
    cmsAvailable: true,
  }
}

const loadHomePageDataCached = withSiteCache('home-page-data-popups', [
  SITE_CACHE_TAGS.home,
  SITE_CACHE_TAGS.notices,
], loadHomePageData)

export async function getHomePageData(): Promise<HomePageData> {
  return safeQuery('getHomePageData', () => loadHomePageDataCached(), EMPTY_HOME)
}
