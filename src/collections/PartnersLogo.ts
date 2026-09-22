import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { orderField, publishedField } from '../fields/publishing'

export const PartnersLogo: CollectionConfig = {
  slug: 'partnersLogo',
  labels: {
    singular: 'Partner logo',
    plural: 'Partner logos',
  },
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'name',
    defaultColumns: ['name', 'published', 'order'],
    description: 'Organisation logos in the partners carousel. Upload the logo under Media first if needed.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    publishedField({ defaultValue: true }),
    orderField(),
  ],
}
