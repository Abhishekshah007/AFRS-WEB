import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedRead } from '../access'

export const GalleryItems: CollectionConfig = {
  slug: 'galleryItems',
  access: {
    create: isAdminOrEditor,
    read: publishedRead,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  admin: {
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
    { name: 'published', type: 'checkbox', defaultValue: true },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show on home page gallery.' },
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
