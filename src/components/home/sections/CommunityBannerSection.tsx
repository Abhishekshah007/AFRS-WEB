import { VisitorCounterBar } from '../../student-hub/VisitorCounterBar'
import { resolveTotalVisitors } from '@/lib/site/totalVisitors'
import type { SiteSetting } from '@/payload-types'

export function CommunityBannerSection({
  siteSettings,
}: {
  siteSettings?: Pick<SiteSetting, 'totalVisitors'> | null
}) {
  return <VisitorCounterBar totalVisitors={resolveTotalVisitors(siteSettings)} />
}
