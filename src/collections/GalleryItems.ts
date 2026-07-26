import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { featuredField, orderField, publishedField } from '../fields/publishing'

export const GalleryItems: CollectionConfig = {
  slug: 'galleryItems',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'published', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'label', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      type: 'select',
      options: ['lab', 'training', 'tech', 'events', 'other'],
      defaultValue: 'other',
    },
    publishedField({ defaultValue: true }),
    featuredField({ description: 'Show on home page gallery.' }),
    orderField(),
  ],
}
