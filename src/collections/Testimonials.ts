import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedRead } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: isAdminOrEditor,
    read: publishedRead,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'testimonial', type: 'textarea', required: true },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
}
