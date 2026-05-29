import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedRead } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: isAdminOrEditor,
    read: publishedRead,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'published', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'banner', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Short summary shown in cards.' } },
    { name: 'content', type: 'richText' },
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
    { name: 'published', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0, admin: { description: 'Lower numbers appear first.' } },
  ],
}
