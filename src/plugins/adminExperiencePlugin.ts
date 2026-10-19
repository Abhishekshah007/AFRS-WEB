import type { CollectionConfig, Config, GlobalConfig, Plugin } from 'payload'

import { getAdminRole } from '@/config/adminRoles'
import { isEntityHiddenForRole, mergeRoleMenuPolicy } from '@/config/adminRoleAccess'

function collectionHidden(collection: CollectionConfig): CollectionConfig['admin'] {
  const existing = collection.admin?.hidden
  return {
    ...collection.admin,
    hidden: (args) => {
      const role = getAdminRole(args.user)
      if (role === 'superAdmin') {
        if (typeof existing === 'function') return existing(args)
        return existing ?? false
      }
      const policy = mergeRoleMenuPolicy(role, null)
      if (isEntityHiddenForRole('collection', collection.slug, role, policy)) {
        return true
      }
      if (typeof existing === 'function') return existing(args)
      return existing ?? false
    },
  }
}

function globalHidden(global: GlobalConfig): GlobalConfig['admin'] {
  const existing = global.admin?.hidden
  return {
    ...global.admin,
    hidden: (args) => {
      const role = getAdminRole(args.user)
      if (role === 'superAdmin') {
        if (typeof existing === 'function') return existing(args)
        return existing ?? false
      }
      const policy = mergeRoleMenuPolicy(role, null)
      if (isEntityHiddenForRole('global', global.slug, role, policy)) {
        return true
      }
      if (typeof existing === 'function') return existing(args)
      return existing ?? false
    },
  }
}

/** Role-based sidebar hiding (defaults). Pair with custom Nav + AdminAccess global for overrides. */
export const adminExperiencePlugin =
  (): Plugin =>
  (incomingConfig: Config): Config => ({
    ...incomingConfig,
    collections: incomingConfig.collections?.map((collection) => ({
      ...collection,
      admin: collectionHidden(collection),
    })),
    globals: incomingConfig.globals?.map((global) => ({
      ...global,
      admin: globalHidden(global),
    })),
  })
