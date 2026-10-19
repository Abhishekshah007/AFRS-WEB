import type { AdminRole } from '@/config/adminRoles'

/** Default hidden collections/globals per role (before Staff menu access overrides). */
export const DEFAULT_HIDDEN_BY_ROLE: Record<
  AdminRole,
  { collections: string[]; globals: string[] }
> = {
  superAdmin: { collections: [], globals: [] },
  contentEditor: {
    collections: ['users', 'events', 'eventRegistrations'],
    globals: ['adminAccess', 'programmesCatalog', 'registrationForm'],
  },
  eventManager: {
    collections: [
      'users',
      'articles',
      'galleryItems',
      'testimonials',
      'services',
      'scientists',
      'impactStats',
      'partnersLogo',
      'aboutCertifications',
      'notices',
      'adminAccess',
    ],
    globals: [
      'adminAccess',
      'homePage',
      'aboutPage',
      'servicesPage',
      'studentHubContent',
      'siteSettings',
      'headerSettings',
      'footerSettings',
    ],
  },
  student: {
    collections: [
      'articles',
      'aboutCertifications',
      'contactMessages',
      'courseRegistrations',
      'eventRegistrations',
      'events',
      'galleryItems',
      'impactStats',
      'media',
      'notices',
      'partnersLogo',
      'resourcePersons',
      'scientists',
      'services',
      'testimonials',
      'users',
    ],
    globals: [
      'aboutPage',
      'adminAccess',
      'footerSettings',
      'headerSettings',
      'homePage',
      'programmesCatalog',
      'registrationForm',
      'servicesPage',
      'siteSettings',
      'studentHubContent',
    ],
  },
}

export type RoleMenuPolicyRow = {
  role?: string | null
  hiddenCollections?: { slug?: string | null }[] | null
  hiddenGlobals?: { slug?: string | null }[] | null
}

export function mergeRoleMenuPolicy(
  role: AdminRole | null,
  rows?: RoleMenuPolicyRow[] | null,
): { collections: Set<string>; globals: Set<string> } {
  const base = role ? DEFAULT_HIDDEN_BY_ROLE[role] : DEFAULT_HIDDEN_BY_ROLE.student
  const collections = new Set(base.collections)
  const globals = new Set(base.globals)

  if (!role || !rows?.length) {
    return { collections, globals }
  }

  const row = rows.find((entry) => entry.role === role)
  if (!row) return { collections, globals }

  for (const item of row.hiddenCollections || []) {
    if (item?.slug) collections.add(item.slug)
  }
  for (const item of row.hiddenGlobals || []) {
    if (item?.slug) globals.add(item.slug)
  }

  return { collections, globals }
}

export function entityKey(
  type: 'collection' | 'global' | 'collections' | 'globals',
  slug: string,
): string {
  const normalized = type === 'collections' ? 'collection' : type === 'globals' ? 'global' : type
  return `${normalized}:${slug}`
}

export function isEntityHiddenForRole(
  type: 'collection' | 'global',
  slug: string,
  role: AdminRole | null,
  policy: { collections: Set<string>; globals: Set<string> },
): boolean {
  if (!role) return true
  if (role === 'superAdmin') {
    return type === 'collection'
      ? policy.collections.has(slug)
      : policy.globals.has(slug)
  }
  if (type === 'collection') return policy.collections.has(slug)
  return policy.globals.has(slug)
}
