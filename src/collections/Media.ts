import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isPublic } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: isPublic,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: {
        description: 'Cloudinary public ID for the original asset.',
        readOnly: true,
      },
    },
    {
      name: 'cloudinaryResourceType',
      type: 'select',
      admin: {
        readOnly: true,
      },
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Raw', value: 'raw' },
      ],
    },
    {
      name: 'cloudinaryVersion',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      admin: {
        description: 'Direct Cloudinary delivery URL for the original asset.',
        readOnly: true,
      },
    },
    {
      name: 'cloudinaryMigratedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}
