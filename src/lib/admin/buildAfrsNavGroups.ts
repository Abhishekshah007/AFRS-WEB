import { EntityType } from '@payloadcms/ui/shared'
import type {
  SanitizedCollectionConfig,
  SanitizedGlobalConfig,
  SanitizedPermissions,
} from 'payload'

import { AFRS_NAV_SECTIONS } from '@/config/adminNav'
import type { AdminRole } from '@/config/adminRoles'
import { entityKey, isEntityHiddenForRole, mergeRoleMenuPolicy } from '@/config/adminRoleAccess'
import type { RoleMenuPolicyRow } from '@/config/adminRoleAccess'

export type AfrsNavEntity = {
  type: typeof EntityType.collection | typeof EntityType.global
  slug: string
  label: string
  href: string
}

export type AfrsNavSectionGroup = {
  id: string
  label: string
  hint: string
  tier: 'primary' | 'secondary'
  defaultOpen: boolean
  entities: AfrsNavEntity[]
}

function canReadEntity(
  type: 'collection' | 'global',
  slug: string,
  permissions: SanitizedPermissions | undefined,
): boolean {
  if (!permissions) return false
  const collectionPermissions = permissions.collections as Record<string, { read?: boolean }>
  const globalPermissions = permissions.globals as Record<string, { read?: boolean }>
  if (type === 'collection') {
    return Boolean(collectionPermissions[slug]?.read)
  }
  return Boolean(globalPermissions[slug]?.read)
}

export function buildAfrsNavGroups({
  adminRoute,
  collections,
  globals,
  permissions,
  role,
  policyRows,
  visibleCollectionSlugs,
  visibleGlobalSlugs,
}: {
  adminRoute: string
  collections: SanitizedCollectionConfig[]
  globals: SanitizedGlobalConfig[]
  permissions: SanitizedPermissions | undefined
  role: AdminRole | null
  policyRows?: RoleMenuPolicyRow[] | null
  visibleCollectionSlugs: string[]
  visibleGlobalSlugs: string[]
}): AfrsNavSectionGroup[] {
  const policy = mergeRoleMenuPolicy(role, policyRows)

  const collectionLabel = (collection: SanitizedCollectionConfig) => {
    const plural = collection.labels?.plural
    return typeof plural === 'string' ? plural : collection.slug
  }

  const globalLabel = (global: SanitizedGlobalConfig) => {
    const label = global.label
    return typeof label === 'string' ? label : global.slug
  }

  const sections: AfrsNavSectionGroup[] = []

  for (const section of AFRS_NAV_SECTIONS) {
    if (!role || !section.roles.includes(role)) continue

    const entities: AfrsNavEntity[] = []

    for (const ref of section.entities) {
      if (isEntityHiddenForRole(ref.type, ref.slug, role, policy)) continue

      const visible =
        ref.type === 'collection'
          ? visibleCollectionSlugs.includes(ref.slug)
          : visibleGlobalSlugs.includes(ref.slug)

      if (!visible) continue
      if (!canReadEntity(ref.type, ref.slug, permissions)) continue

      if (ref.type === 'collection') {
        const collection = collections.find((entry) => entry.slug === ref.slug)
        if (!collection) continue
        entities.push({
          type: EntityType.collection,
          slug: ref.slug,
          label: collectionLabel(collection),
          href: `${adminRoute}/collections/${ref.slug}`,
        })
      } else {
        const global = globals.find((entry) => entry.slug === ref.slug)
        if (!global) continue
        entities.push({
          type: EntityType.global,
          slug: ref.slug,
          label: globalLabel(global),
          href: `${adminRoute}/globals/${ref.slug}`,
        })
      }
    }

    if (entities.length > 0) {
      sections.push({
        id: section.id,
        label: section.label,
        hint: section.hint,
        tier: section.tier,
        defaultOpen: section.defaultOpen,
        entities,
      })
    }
  }

  // Any permitted entity not listed above — show under "More"
  const listed = new Set(
    sections.flatMap((section) =>
      section.entities.map((entity) => entityKey(entity.type, entity.slug)),
    ),
  )

  const overflow: AfrsNavEntity[] = []

  for (const slug of visibleCollectionSlugs) {
    const key = entityKey('collection', slug)
    if (listed.has(key)) continue
    if (isEntityHiddenForRole('collection', slug, role, policy)) continue
    if (!canReadEntity('collection', slug, permissions)) continue
    const collection = collections.find((entry) => entry.slug === slug)
    if (!collection) continue
    overflow.push({
      type: EntityType.collection,
      slug,
      label: collectionLabel(collection),
      href: `${adminRoute}/collections/${slug}`,
    })
  }

  for (const slug of visibleGlobalSlugs) {
    const key = entityKey('global', slug)
    if (listed.has(key)) continue
    if (isEntityHiddenForRole('global', slug, role, policy)) continue
    if (!canReadEntity('global', slug, permissions)) continue
    const global = globals.find((entry) => entry.slug === slug)
    if (!global) continue
    overflow.push({
      type: EntityType.global,
      slug,
      label: globalLabel(global),
      href: `${adminRoute}/globals/${slug}`,
    })
  }

  if (overflow.length > 0) {
    sections.push({
      id: 'more',
      label: 'More',
      hint: 'Additional items your role can access',
      tier: 'secondary',
      defaultOpen: false,
      entities: overflow.sort((a, b) => a.label.localeCompare(b.label)),
    })
  }

  return sections
}
