import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { orderField, publishedField } from '../fields/publishing'

export const Scientists: CollectionConfig = {
  slug: 'scientists',
  labels: {
    singular: 'Laboratory Member',
    plural: 'Laboratory Members',
  },
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    description:
      'Add, edit, reorder, and publish people shown in Laboratory Directorate and Laboratory Members on the Services page. The same records also appear on Home and About when published.',
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'memberType', 'status', 'published', 'order'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'designation',
      type: 'text',
      required: true,
      admin: { description: 'Role shown under the name, for example Forensic Expert.' },
    },
    {
      name: 'memberType',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Directorate', value: 'director' },
        { label: 'Team member', value: 'member' },
      ],
      admin: {
        description: 'Directorate appears in Laboratory Directorate. Team member appears in Laboratory Members.',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      admin: {
        description: 'Badge on the profile card. Uncheck Published to hide this person from the website.',
      },
    },
    { name: 'bio', type: 'textarea' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square profile photo recommended.' },
    },
    publishedField({
      defaultValue: true,
      description: 'Unpublished people are hidden from the public site.',
    }),
    orderField({ description: 'Lower numbers appear first within the same section.' }),
  ],
}
