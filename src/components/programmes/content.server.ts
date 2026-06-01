import type { GalleryThumb, HubEventCard, ResourcePerson } from '@/components/programmes/types'
import { defaultGallery, defaultHubEvents, defaultResourcePersons, trainingChecklist } from '@/components/programmes/content'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl } from '@/lib/cms'
import type { Media } from '@/payload-types'

type ProgrammesCatalogContent = {
  trainingChecklist?: Array<{ item?: string | null }>
  fallbackHubEvents?: HubEventCard[]
  fallbackResourcePersons?: Array<Pick<ResourcePerson, 'name' | 'title' | 'initials'>>
  fallbackGallery?: Array<{ image?: number | Media | null; alt?: string | null }>
}

export async function getTrainingChecklist() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({ slug: 'programmesCatalog', depth: 1, overrideAccess: false })) as ProgrammesCatalogContent
    const items = global.trainingChecklist?.map((x) => x.item?.trim()).filter((x): x is string => Boolean(x))
    if (items?.length) return items
  } catch {}
  return trainingChecklist
}

export async function getDefaultHubEvents() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({ slug: 'programmesCatalog', depth: 0, overrideAccess: false })) as ProgrammesCatalogContent
    if (global.fallbackHubEvents?.length) return global.fallbackHubEvents
  } catch {}
  return defaultHubEvents
}

export async function getDefaultResourcePersons() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({ slug: 'programmesCatalog', depth: 0, overrideAccess: false })) as ProgrammesCatalogContent
    if (global.fallbackResourcePersons?.length) {
      return global.fallbackResourcePersons.map((p, i) => ({ id: String(i + 1), name: p.name, title: p.title, initials: p.initials }))
    }
  } catch {}
  return defaultResourcePersons
}

export async function getDefaultGallery() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({ slug: 'programmesCatalog', depth: 1, overrideAccess: false })) as ProgrammesCatalogContent
    if (global.fallbackGallery?.length) {
      const items: GalleryThumb[] = global.fallbackGallery.map((g, i) => ({
        id: `g${i + 1}`,
        src: resolveMediaUrl(g.image as number | Media | null | undefined, defaultGallery[i % defaultGallery.length]?.src || defaultGallery[0].src),
        alt: g.alt || `Gallery image ${i + 1}`,
      }))
      if (items.length) return items
    }
  } catch {}
  return defaultGallery
}
