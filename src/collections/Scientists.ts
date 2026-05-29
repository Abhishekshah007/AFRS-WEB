import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedRead } from '../access'

export const Scientists: CollectionConfig = {
  slug: 'scientists',
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
    { name: 'designation', type: 'text', required: true },
    { name: 'bio', type: 'textarea' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'published', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
