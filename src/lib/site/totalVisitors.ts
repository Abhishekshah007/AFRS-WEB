import type { SiteSetting } from '@/payload-types'

type SiteSettingsVisitorSource = Pick<SiteSetting, 'totalVisitors'> | null | undefined

/** The CMS value is a historical starting total; new unique visitors are counted separately. */
export function resolveTotalVisitors(siteSettings?: SiteSettingsVisitorSource): number {
  const value = siteSettings?.totalVisitors

  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.round(value)
  }

  return 0
}
