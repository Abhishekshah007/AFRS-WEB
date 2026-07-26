import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { contentRichTextField, excerptField, slugField } from '../fields'
import { orderField, publishedField } from '../fields/publishing'

export const Services: CollectionConfig = {
  slug: 'services',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'published', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'banner', type: 'upload', relationTo: 'media' },
    excerptField({ description: 'Short summary shown in cards.' }),
    contentRichTextField(),
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Forensic Service', value: 'forensicService' },
        { label: 'Laboratory', value: 'laboratory' },
        { label: 'Training', value: 'training' },
        { label: 'Consultancy', value: 'consultancy' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'featureTitle', type: 'text' },
        { name: 'featureDescription', type: 'textarea' },
        { name: 'featureIcon', type: 'upload', relationTo: 'media' },
      ],
    },
    publishedField(),
    orderField(),
  ],
}
