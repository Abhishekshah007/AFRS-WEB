import type { SiteSetting } from '@/payload-types'

/** Shown when Site Settings → totalVisitors is unset or zero (not yet configured). */
export const DEFAULT_TOTAL_VISITORS = 25_847

type SiteSettingsVisitorSource = Pick<SiteSetting, 'totalVisitors'> | null | undefined

/**
 * Single resolver for the public visitor bar across home, courses, student hub, and services.
 * CMS value wins when it is a positive number; otherwise the shared default is used.
 */
export function resolveTotalVisitors(siteSettings?: SiteSettingsVisitorSource): number {
  const value = siteSettings?.totalVisitors

  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.round(value)
  }

  return DEFAULT_TOTAL_VISITORS
}
