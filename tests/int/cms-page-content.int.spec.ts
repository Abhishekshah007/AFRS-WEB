import { describe, expect, it } from 'vitest'

import { defaultPrivacyPage } from '@/data/defaults/legal'
import { CMS_ICON_OPTIONS } from '@/fields/cmsIconOptions'
import { CMS_ICONS, getCmsIcon } from '@/lib/cmsIcons'
import {
  resolveAfslSection,
  resolveImpactSection,
  resolveQuickLinksSection,
  resolveTrainingSection,
  resolveVideoSection,
} from '@/lib/queries/home-sections'
import { archiveRowHref } from '@/lib/queries/programme-pages'
import { organizationGraph } from '@/lib/seo/schema'
import type { HomePage } from '@/payload-types'

describe('Home page sections from the CMS', () => {
  it('falls back to the built-in copy when the CMS group is empty', () => {
    const training = resolveTrainingSection(undefined)
    expect(training.title).toBe('Forensic Training Programs')
    expect(training.items).toHaveLength(5)
  })

  it('uses CMS values and lists when filled', () => {
    const training = resolveTrainingSection({
      title: 'New title',
      eyebrow: '  ',
      items: [{ id: 'a', icon: '🧪', title: 'Toxicology Lab Course' }],
    } as HomePage['training'])
    expect(training.title).toBe('New title')
    expect(training.eyebrow).toBe('Specialized Courses') // blank -> default
    expect(training.items).toEqual([{ icon: '🧪', title: 'Toxicology Lab Course' }])
  })

  it('splits the video body into paragraphs on blank lines', () => {
    const video = resolveVideoSection({ body: 'First.\n\nSecond.' } as HomePage['video'])
    expect(video.paragraphs).toEqual(['First.', 'Second.'])
  })

  it('keeps images on their current URL until an editor uploads one', () => {
    const afsl = resolveAfslSection(undefined)
    expect(afsl.offers.imageUrl).toMatch(/^https:\/\/res\.cloudinary\.com\//)
    const withUpload = resolveAfslSection({
      offersImage: { id: 1, url: 'https://res.cloudinary.com/x/new.jpg', alt: 'New alt' },
    } as unknown as HomePage['afsl'])
    expect(withUpload.offers.imageUrl).toBe('https://res.cloudinary.com/x/new.jpg')
    expect(withUpload.offers.imageAlt).toBe('New alt')
  })

  it('drops quick links without a label or link', () => {
    const links = resolveQuickLinksSection({
      items: [
        { id: '1', icon: 'youtube', label: 'Videos', href: 'https://youtube.com/@afrs' },
        { id: '2', icon: 'link', label: '', href: '/x' },
      ],
    } as HomePage['quickLinks'])
    expect(links.items.map((item) => item.label)).toEqual(['Videos'])
  })

  it('has an icon component for every CMS icon option', () => {
    for (const option of CMS_ICON_OPTIONS) expect(CMS_ICONS[option.value]).toBeDefined()
    expect(getCmsIcon('not-a-real-icon')).toBe(CMS_ICONS.link.Icon)
    expect(resolveImpactSection(undefined).items.every((item) => item.icon in CMS_ICONS)).toBe(true)
  })
})

describe('Programmes and SEO data from the CMS', () => {
  it('builds archive links from row filters', () => {
    expect(archiveRowHref({ label: 'Workshops', eventTypeSlug: 'workshop' })).toBe(
      '/courses/events?schedule=completed&type=workshop',
    )
    expect(archiveRowHref({ label: 'National', nature: 'national' })).toBe(
      '/courses/events?schedule=completed&nature=national',
    )
  })

  it('uses Site identity contact details in Google organisation data', () => {
    const graph = organizationGraph([], { telephone: '+91-11111', postalCode: '452001' })
    expect(graph.telephone).toBe('+91-11111')
    expect(graph.address.postalCode).toBe('452001')
    expect(graph.address.addressLocality).toBe('Indore') // default kept
  })

  it('no longer ships the placeholder "123 Forensic Lane" address', () => {
    expect(JSON.stringify(defaultPrivacyPage)).not.toContain('123 Forensic Lane')
  })
})
