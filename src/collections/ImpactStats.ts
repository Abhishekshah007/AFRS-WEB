import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { orderField, publishedField } from '../fields/publishing'

export const ImpactStats: CollectionConfig = {
  slug: 'impactStats',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'label',
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'tone',
      type: 'select',
      options: ['indigo', 'blue', 'purple', 'emerald', 'orange'],
      defaultValue: 'indigo',
    },
    publishedField({ defaultValue: true }),
    orderField(),
  ],
}
