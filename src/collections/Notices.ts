import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { orderField, publishedField } from '../fields/publishing'

export const Notices: CollectionConfig = {
  slug: 'notices',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'noticeDate', 'published'],
    description: 'Official announcements shown on the Notice Board page.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'tag',
      type: 'select',
      required: true,
      options: [
        { label: 'Admission', value: 'Admission' },
        { label: 'Service', value: 'Service' },
        { label: 'Results', value: 'Results' },
        { label: 'Partnership', value: 'Partnership' },
        { label: 'Event', value: 'Event' },
        { label: 'General', value: 'General' },
      ],
      defaultValue: 'General',
    },
    {
      name: 'noticeDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'summary', type: 'textarea' },
    { name: 'href', type: 'text', admin: { description: 'Optional link for more details.' } },
    publishedField({ defaultValue: true }),
    orderField(),
  ],
}
