import { VisitorCounterBar } from '../../student-hub/VisitorCounterBar'
import { getSiteVisitorTotal } from '@/lib/site/visitorTotal'
import type { SiteSetting } from '@/payload-types'

/** Home page visitor strip — same live total as every other page. */
export async function CommunityBannerSection({
  siteSettings,
}: {
  siteSettings?: Pick<SiteSetting, 'totalVisitors'> | null
}) {
  return <VisitorCounterBar totalVisitors={await getSiteVisitorTotal(siteSettings)} />
}
