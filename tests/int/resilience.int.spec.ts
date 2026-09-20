import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

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
import { GALLERY_PAGE_PRESETS, galleryHref, serviceGalleryHref } from '@/lib/gallery/constants'
import { buildPublishedGalleryWhere } from '@/lib/queries/gallery'

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

describe('gallery page presets', () => {
  it('defines page-specific category and brand rules', () => {
    expect(GALLERY_PAGE_PRESETS.afsl.categories).toEqual(['lab'])
    expect(GALLERY_PAGE_PRESETS.afsl.brand).toBe('afsl')
    expect(GALLERY_PAGE_PRESETS.courses.categories).toEqual(['events'])
    expect(GALLERY_PAGE_PRESETS.studentHub.categories).toEqual(['training', 'events'])
  })

  it('builds brand-aware gallery links', () => {
    expect(galleryHref('lab', 'afsl')).toBe('/gallery?category=lab&brand=afsl')
    expect(galleryHref('events', 'afrs')).toBe('/gallery?category=events')
  })

  it('builds multi-category where clauses', () => {
    const where = buildPublishedGalleryWhere({
      brand: 'afrs',
      categories: ['training', 'events'],
    })

    expect(where).toEqual({
      and: [
        { published: { equals: true } },
        { or: [{ brand: { equals: 'afrs' } }, { brand: { equals: 'both' } }] },
        { category: { in: ['training', 'events'] } },
      ],
    })
  })

  it('builds service-specific gallery where clauses', () => {
    const where = buildPublishedGalleryWhere({ serviceId: 12 })

    expect(where).toEqual({
      and: [{ published: { equals: true } }, { service: { equals: 12 } }],
    })
  })

  it('builds service gallery links', () => {
    expect(serviceGalleryHref('crime-scene-investigation')).toBe(
      '/gallery?service=crime-scene-investigation',
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

describe('registration confirmation token', () => {
  const originalSecret = process.env.PAYLOAD_SECRET

  beforeEach(() => {
    process.env.PAYLOAD_SECRET = 'test-secret-for-confirmation-token'
  })

  afterEach(() => {
    process.env.PAYLOAD_SECRET = originalSecret
  })

  it('creates and verifies event-scoped tokens', async () => {
    const {
      buildEventConfirmationUrl,
      verifyRegistrationConfirmationToken,
    } = await import('@/lib/registration/confirmationToken')

    const url = buildEventConfirmationUrl(42, 'forensic-workshop')
    const token = new URL(url, 'http://localhost').searchParams.get('token')

    expect(token).toBeTruthy()
    expect(
      verifyRegistrationConfirmationToken(42, { kind: 'event', eventSlug: 'forensic-workshop' }, token),
    ).toBe(true)
    expect(
      verifyRegistrationConfirmationToken(42, { kind: 'event', eventSlug: 'other-event' }, token),
    ).toBe(false)
    expect(verifyRegistrationConfirmationToken(99, { kind: 'event', eventSlug: 'forensic-workshop' }, token)).toBe(
      false,
    )
  })
})

describe('rate limiting', () => {
  it('blocks requests after the configured limit', async () => {
    const { checkRateLimit } = await import('@/lib/security/rateLimit')

    const key = `test-${Date.now()}`

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const result = checkRateLimit(key, 3, 60_000)
      expect(result.allowed).toBe(true)
    }

    const blocked = checkRateLimit(key, 3, 60_000)
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)
  })
})

describe('turnstile verification', () => {
  it('skips verification when secret is not configured', async () => {
    const originalSecret = process.env.TURNSTILE_SECRET_KEY
    delete process.env.TURNSTILE_SECRET_KEY

    const { verifyTurnstileToken } = await import('@/lib/security/turnstile')
    await expect(verifyTurnstileToken(undefined)).resolves.toBe(true)

    if (originalSecret) process.env.TURNSTILE_SECRET_KEY = originalSecret
  })

  it('treats placeholder site keys as not configured', async () => {
    const originalSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = '...'

    const { isTurnstileConfiguredClient } = await import('@/lib/security/turnstileConfig')
    expect(isTurnstileConfiguredClient()).toBe(false)

    if (originalSiteKey) process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = originalSiteKey
    else delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  })
})
