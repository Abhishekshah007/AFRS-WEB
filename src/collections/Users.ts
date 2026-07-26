import type { CollectionConfig } from 'payload'

import { isAdmin, isSelfOrAdmin } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: ADMIN_GROUPS.SYSTEM,
    useAsTitle: 'email',
  },
  access: {
    create: isAdmin,
    read: isSelfOrAdmin,
    update: isSelfOrAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      saveToJWT: true,
      access: {
        update: ({ req: { user } }) => {
          const role = (user as { role?: string } | null)?.role
          return role === 'superAdmin'
        },
      },
      options: [
        { label: 'Super Admin', value: 'superAdmin' },
        { label: 'Content Editor', value: 'contentEditor' },
        { label: 'Event Manager', value: 'eventManager' },
        { label: 'Student', value: 'student' },
      ],
    },
  ],
}
