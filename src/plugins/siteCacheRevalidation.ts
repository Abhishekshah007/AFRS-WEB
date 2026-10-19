import type { CollectionConfig, Config, GlobalConfig, Plugin } from 'payload'

import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
  revalidateGlobalAfterChange,
} from '@/hooks/revalidateFrontend'

function withCollectionRevalidation(collection: CollectionConfig): CollectionConfig {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), revalidateCollectionAfterChange],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), revalidateCollectionAfterDelete],
    },
  }
}

function withGlobalRevalidation(global: GlobalConfig): GlobalConfig {
  return {
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [...(global.hooks?.afterChange ?? []), revalidateGlobalAfterChange],
    },
  }
}

/** Revalidate public pages and tagged CMS caches whenever editors save content. */
export const siteCacheRevalidationPlugin =
  (): Plugin =>
  (incomingConfig: Config): Config => ({
    ...incomingConfig,
    collections: incomingConfig.collections?.map(withCollectionRevalidation),
    globals: incomingConfig.globals?.map(withGlobalRevalidation),
  })
