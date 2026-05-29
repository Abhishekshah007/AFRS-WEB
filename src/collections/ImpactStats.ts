import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedRead } from '../access'

export const ImpactStats: CollectionConfig = {
  slug: 'impactStats',
  access: {
    create: isAdminOrEditor,
    read: publishedRead,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  admin: {
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
    { name: 'published', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
