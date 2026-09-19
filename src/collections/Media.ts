import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, isPublic } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: ADMIN_GROUPS.SYSTEM,
  },
  access: {
    read: isPublic,
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
  ],
}
