import { cache } from 'react'

import { getDefaultResourcePersons } from '@/components/programmes/content.server'
import { getResourcePersonDirectoryEntry } from '@/components/programmes/resourcePersonDirectory'
import type { ResourcePerson } from '@/components/programmes/types'
import { getPayloadClient } from '@/lib/payload'
import { slugify } from '@/lib/utils/slugify'
import type { ResourcePerson as CmsResourcePerson } from '@/payload-types'

/** Placeholder the CMS stores when an editor has not entered a real designation. */
const PLACEHOLDER_TITLE = 'Resource Person'

export {
  RESOURCE_PERSONS_PATH,
  resourcePersonPath,
} from '@/components/programmes/resourcePersonLinks'

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * The CMS is the source of truth. The bundled spreadsheet directory only fills in a
 * designation when the CMS still has the empty/placeholder title, so editor changes
 * to name or title always show on the site.
 */
export function resolveResourcePersonTitle(name: string, cmsTitle?: string | null): string {
  const title = cmsTitle?.trim()
  if (title && title !== PLACEHOLDER_TITLE) return title
  return getResourcePersonDirectoryEntry(name)?.designation ?? ''
}

/** URL slug derived from the person's name; duplicates get -2, -3… in list order. */
export function assignResourcePersonSlugs<T extends { name: string }>(
  people: T[],
): (T & { slug: string })[] {
  const seen = new Map<string, number>()
  return people.map((person) => {
    const base = slugify(person.name) || 'resource-person'
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    return { ...person, slug: count === 1 ? base : `${base}-${count}` }
  })
}

export function mapCmsResourcePerson(person: CmsResourcePerson): ResourcePerson {
  const name = person.name.trim()
  return {
    id: String(person.id),
    name,
    title: resolveResourcePersonTitle(name, person.title),
    photoUrl:
      person.photo && typeof person.photo === 'object' && person.photo.url
        ? person.photo.url
        : undefined,
    initials: initialsFromName(name),
    bio: person.bio,
  }
}

/**
 * Published resource persons for the Courses page and their profile URLs.
 * Falls back to the demo list only when the CMS has no published people; demo
 * entries get no slug, so they never produce indexable profile pages.
 */
export const getSiteResourcePersons = cache(
  async (): Promise<{ people: ResourcePerson[]; fromCms: boolean }> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'resourcePersons',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 200,
      depth: 1,
      overrideAccess: false,
    })

    if (result.totalDocs > 0) {
      const people = assignResourcePersonSlugs(
        (result.docs as CmsResourcePerson[]).map(mapCmsResourcePerson),
      )
      return { people, fromCms: true }
    }

    return { people: await getDefaultResourcePersons(), fromCms: false }
  },
)

export async function findSiteResourcePersonBySlug(
  slug: string,
): Promise<ResourcePerson | undefined> {
  const { people, fromCms } = await getSiteResourcePersons()
  if (!fromCms) return undefined
  return people.find((person) => person.slug === slug)
}
