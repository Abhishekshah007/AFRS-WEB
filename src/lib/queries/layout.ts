import { getPayloadClient } from '@/lib/payload'
import { safeQuery } from '@/lib/resilience/safeQuery'
import type { FooterSetting, HeaderSetting, SiteSetting } from '@/payload-types'

export type LayoutGlobals = {
  headerSettings: HeaderSetting | null
  footerSettings: FooterSetting | null
  siteSettings: SiteSetting | null
  cmsAvailable: boolean
}

const EMPTY_LAYOUT: LayoutGlobals = {
  headerSettings: null,
  footerSettings: null,
  siteSettings: null,
  cmsAvailable: false,
}

export async function getLayoutGlobals(): Promise<LayoutGlobals> {
  return safeQuery(
    'getLayoutGlobals',
    async () => {
      const payload = await getPayloadClient()
      const [headerSettings, footerSettings, siteSettings] = await Promise.all([
        payload.findGlobal({
          slug: 'headerSettings',
          depth: 1,
          overrideAccess: false,
        }) as Promise<HeaderSetting>,
        payload.findGlobal({
          slug: 'footerSettings',
          depth: 0,
          overrideAccess: false,
        }) as Promise<FooterSetting>,
        payload.findGlobal({
          slug: 'siteSettings',
          depth: 0,
          overrideAccess: false,
        }) as Promise<SiteSetting>,
      ])

      return {
        headerSettings,
        footerSettings,
        siteSettings,
        cmsAvailable: true,
      }
    },
    EMPTY_LAYOUT,
  )
}
