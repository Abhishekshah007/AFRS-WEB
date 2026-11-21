import { cache } from 'react'

import {
  defaultPrivacyPage,
  defaultTermsPage,
  type LegalPageContent,
} from '@/data/defaults/legal'
import { getPayloadClient } from '@/lib/payload'
import { logCmsError } from '@/lib/resilience/logger'
import type { LegalPage } from '@/payload-types'

type CmsLegalGroup = LegalPage['privacy']

function resolve(cms: CmsLegalGroup | undefined, fallback: LegalPageContent): LegalPageContent {
  const sections = (cms?.sections ?? [])
    .map((section) => ({ title: section.title?.trim() ?? '', body: section.body?.trim() ?? '' }))
    .filter((section) => section.title && section.body)
  return {
    title: cms?.title?.trim() || fallback.title,
    lastUpdated: cms?.lastUpdated?.trim() || fallback.lastUpdated,
    intro: cms?.intro?.trim() || fallback.intro,
    sections: sections.length > 0 ? sections : fallback.sections,
  }
}

/** Privacy Policy / Terms of Service text from CMS "Legal pages", with built-in fallback. */
export const getLegalPage = cache(async (page: 'privacy' | 'terms'): Promise<LegalPageContent> => {
  const fallback = page === 'privacy' ? defaultPrivacyPage : defaultTermsPage
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({
      slug: 'legalPages',
      depth: 0,
      overrideAccess: false,
    })) as LegalPage
    return resolve(global?.[page], fallback)
  } catch (error) {
    logCmsError('getLegalPage', error, { page })
    return fallback
  }
})
