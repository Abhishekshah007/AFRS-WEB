import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, mediaRead } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'File',
    plural: 'Media library',
  },
  admin: {
    group: ADMIN_GROUPS.SYSTEM,
    description: 'Photos, logos, and documents used on the website. Upload here, then pick the file in other screens.',
  },
  access: {
    read: mediaRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    // Single Cloudinary upload per file. imageSizes were removed because they generated
    // 3 extra derivatives per image (thumbnail/card/hero), slowing uploads and cluttering
    // the library when combined with remote storage. The site uses media.url only.
    adminThumbnail: ({ doc }) => (typeof doc.url === 'string' ? doc.url : ''),
    mimeTypes: [
      'image/*',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'isPrivate',
      type: 'checkbox',
      label: 'Private (staff only)',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Set automatically for participant uploads (payment proofs, ID documents) and registration exports. Private files are hidden from the public API.',
      },
    },
  ],
}
