import { cache } from 'react'

import { getPayloadClient } from '@/lib/payload'
import { logCmsError } from '@/lib/resilience/logger'
import { resolveTotalVisitors } from '@/lib/site/totalVisitors'
import type { SiteSetting } from '@/payload-types'

/**
 * Full visitor total for server rendering: the starting number from Site identity plus
 * every unique browser counted since. Rendering this on the server keeps the counter
 * correct even when the browser's live update (/api/visitors/track) is blocked.
 */
export const getSiteVisitorTotal = cache(
  async (siteSettings?: Pick<SiteSetting, 'totalVisitors'> | null): Promise<number> => {
    try {
      const payload = await getPayloadClient()
      const settings =
        siteSettings ??
        ((await payload.findGlobal({
          slug: 'siteSettings',
          depth: 0,
          select: { totalVisitors: true },
          overrideAccess: false,
        })) as Pick<SiteSetting, 'totalVisitors'>)
      // Counting only; individual visitor rows stay private (collection denies public reads).
      const { totalDocs } = await payload.count({ collection: 'siteVisitors', overrideAccess: true })
      return resolveTotalVisitors(settings) + totalDocs
    } catch (error) {
      logCmsError('getSiteVisitorTotal', error)
      return resolveTotalVisitors(siteSettings)
    }
  },
)
