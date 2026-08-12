import { VisitorCounterBar } from '../../student-hub/VisitorCounterBar'

export function CommunityBannerSection({ totalVisitors }: { totalVisitors?: number }) {
  const count =
    typeof totalVisitors === 'number' ? totalVisitors : 25000

  return <VisitorCounterBar totalVisitors={count} />
}
