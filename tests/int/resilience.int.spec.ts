import { describe, expect, it, vi } from 'vitest'

import { resolveMediaUrl, resolveMediaUrlOptional } from '@/lib/cms'
import { FALLBACK_BANNER_IMAGE, FALLBACK_LOGO_IMAGE } from '@/lib/constants/assets'
import { getDefaultAboutPageData } from '@/lib/queries/about'
import { getDefaultServicesPageData } from '@/lib/queries/services'
import {
  isMaintenanceBypassPath,
  isMaintenanceModeEnabled,
  shouldRedirectToMaintenance,
} from '@/lib/resilience/maintenance'
import { isBrokenSlug } from '@/hooks/autoSlugFromTitle'
import { slugify } from '@/lib/utils/slugify'
import { safeQuery } from '@/lib/resilience/safeQuery'

describe('resolveMediaUrl', () => {
  it('returns populated media url when available', () => {
    expect(
      resolveMediaUrl(
        { id: 1, url: 'https://cdn.example/photo.jpg' } as never,
        FALLBACK_LOGO_IMAGE,
      ),
    ).toBe('https://cdn.example/photo.jpg')
  })

  it('returns fallback for missing media', () => {
    expect(resolveMediaUrl(null, FALLBACK_BANNER_IMAGE)).toBe(FALLBACK_BANNER_IMAGE)
  })

  it('uses default banner fallback when fallback argument is empty', () => {
    expect(resolveMediaUrl(undefined, '')).toBe(FALLBACK_BANNER_IMAGE)
  })

  it('returns undefined for optional resolver when media missing', () => {
    expect(resolveMediaUrlOptional(null)).toBeUndefined()
    expect(resolveMediaUrlOptional(42)).toBeUndefined()
  })
})

describe('safeQuery', () => {
  it('returns query result on success', async () => {
    const result = await safeQuery('test-success', async () => 'ok', 'fallback')
    expect(result).toBe('ok')
  })

  it('returns fallback and logs on failure', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const result = await safeQuery(
      'test-failure',
      async () => {
        throw new Error('database offline')
      },
      { ok: false },
    )

    expect(result).toEqual({ ok: false })
    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockRestore()
  })
})

describe('maintenance mode', () => {
  it('redirects public pages when maintenance is enabled', () => {
    vi.stubEnv('MAINTENANCE_MODE', 'true')
    expect(shouldRedirectToMaintenance('/')).toBe(true)
    expect(shouldRedirectToMaintenance('/about')).toBe(true)
    expect(shouldRedirectToMaintenance('/admin')).toBe(false)
    expect(shouldRedirectToMaintenance('/api/chat')).toBe(false)
    expect(shouldRedirectToMaintenance('/maintenance')).toBe(false)
    vi.unstubAllEnvs()
  })

  it('does not redirect when maintenance is disabled', () => {
    vi.stubEnv('MAINTENANCE_MODE', 'false')
    expect(isMaintenanceModeEnabled()).toBe(false)
    expect(shouldRedirectToMaintenance('/')).toBe(false)
    vi.unstubAllEnvs()
  })

  it('allows static asset paths', () => {
    expect(isMaintenanceBypassPath('/assets/logo.png')).toBe(true)
    expect(isMaintenanceBypassPath('/_next/static/chunk.js')).toBe(true)
  })
})

describe('event slug generation', () => {
  it('detects broken slugs like ----', () => {
    expect(isBrokenSlug('----')).toBe(true)
    expect(isBrokenSlug('')).toBe(true)
    expect(isBrokenSlug('s')).toBe(true)
    expect(isBrokenSlug('forensic-application-of-computational-techniques')).toBe(false)
  })

  it('slugifies titles for URLs', () => {
    expect(slugify('Forensic Application of Computational Techniques')).toBe(
      'forensic-application-of-computational-techniques',
    )
  })
})

describe('default page data', () => {
  it('returns usable about page fallback', () => {
    const data = getDefaultAboutPageData()
    expect(data.featuredLeaders.length).toBeGreaterThan(0)
    expect(data.heroImage).toBeTruthy()
    expect(data.galleryItems.length).toBeGreaterThan(0)
  })

  it('returns usable services page fallback', () => {
    const data = getDefaultServicesPageData()
    expect(data.catalogItems.length).toBeGreaterThan(0)
    expect(data.directors.length).toBeGreaterThan(0)
    expect(data.site.phone).toBeTruthy()
  })
})
