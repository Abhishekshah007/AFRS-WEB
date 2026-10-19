import type { GlobalConfig } from 'payload'

import { isAdmin } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { ADMIN_ROLE_LABELS, ADMIN_ROLES } from '../config/adminRoles'
import { collections } from '../config/collections'

const GLOBAL_SLUG_OPTIONS: { label: string; value: string }[] = [
  { label: 'Site identity', value: 'siteSettings' },
  { label: 'Header & navigation', value: 'headerSettings' },
  { label: 'Footer', value: 'footerSettings' },
  { label: 'Home page', value: 'homePage' },
  { label: 'About page', value: 'aboutPage' },
  { label: 'Services page (AFSL)', value: 'servicesPage' },
  { label: 'Courses catalog', value: 'programmesCatalog' },
  { label: 'Course registration form', value: 'registrationForm' },
  { label: 'Student Hub pages', value: 'studentHubContent' },
].sort((a, b) => a.label.localeCompare(b.label))

const collectionOptions = collections
  .map((collection) => {
    const plural = collection.labels?.plural
    const label = typeof plural === 'string' ? plural : collection.slug
    return { label, value: collection.slug }
  })
  .sort((a, b) => a.label.localeCompare(b.label))

export const AdminAccess: GlobalConfig = {
  slug: 'adminAccess',
  label: 'Staff menu access',
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  admin: {
    group: ADMIN_GROUPS.SYSTEM,
    description:
      'Super Admin only. Hide sidebar items per role on top of default permissions. Staff still cannot open hidden items if collection access denies them.',
  },
  fields: [
    {
      name: 'roleMenus',
      type: 'array',
      admin: {
        description: 'Add extra hidden menu items per role. Defaults are already applied in code.',
      },
      fields: [
        {
          name: 'role',
          type: 'select',
          required: true,
          options: ADMIN_ROLES.filter((role) => role !== 'superAdmin').map((role) => ({
            label: ADMIN_ROLE_LABELS[role],
            value: role,
          })),
        },
        {
          name: 'hiddenCollections',
          type: 'array',
          label: 'Hide collections',
          fields: [
            {
              name: 'slug',
              type: 'select',
              required: true,
              options: collectionOptions,
            },
          ],
        },
        {
          name: 'hiddenGlobals',
          type: 'array',
          label: 'Hide globals',
          fields: [
            {
              name: 'slug',
              type: 'select',
              required: true,
              options: GLOBAL_SLUG_OPTIONS,
            },
          ],
        },
      ],
    },
  ],
}
