import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, isPublic } from '../access'

export const ContactMessages: CollectionConfig = {
  slug: 'contactMessages',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'mobile', 'status', 'createdAt'],
  },
  access: {
    create: isPublic,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'mobile',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'inProgress' },
        { label: 'Resolved', value: 'resolved' },
      ],
    },
  ],
  timestamps: true,
}

