/** Client-safe URL helpers for resource person profiles (modal deep links). */
export const COURSES_PATH = '/courses'
export const RESOURCE_PERSONS_PATH = '/courses/resource-persons'

export function resourcePersonPath(slug: string): string {
  return `${RESOURCE_PERSONS_PATH}/${slug}`
}

/** Parse a pathname into the modal it represents, or null for the plain Courses page. */
export function modalViewFromPath(
  pathname: string,
): { kind: 'all' } | { kind: 'person'; slug: string } | null {
  const normalized = pathname.replace(/\/+$/, '')
  if (normalized === RESOURCE_PERSONS_PATH) return { kind: 'all' }
  if (normalized.startsWith(`${RESOURCE_PERSONS_PATH}/`)) {
    const slug = decodeURIComponent(normalized.slice(RESOURCE_PERSONS_PATH.length + 1))
    if (slug && !slug.includes('/')) return { kind: 'person', slug }
  }
  return null
}
