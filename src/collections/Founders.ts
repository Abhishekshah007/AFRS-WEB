import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { isSafeHref } from '../lib/cms'
import { orderField, publishedField } from '../fields/publishing'

const socialUrl = (name: string, label: string) => ({
  name,
  type: 'text' as const,
  label,
  validate: (value: unknown) => {
    if (value == null || value === '') return true
    if (typeof value === 'string' && isSafeHref(value.trim())) return true
    return 'Use a full profile URL starting with https://'
  },
})

export const Founders: CollectionConfig = {
  slug: 'founders',
  labels: {
    singular: 'Founder',
    plural: 'Founders',
  },
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.PAGES,
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'published', 'order'],
    description:
      'Founder cards on the About page. Name, role, photo, quote, short bio, and social links. Unpublished founders stay hidden. If none are published, the website keeps the built-in cards.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'designation',
      type: 'text',
      required: true,
      admin: { description: 'Role under the name, for example President, AFRS.' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait photo. A tall or square image works best on the card.' },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Quote',
      admin: { description: 'The quoted message shown on the founder card.' },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Short bio',
      admin: { description: 'One or two lines under the quote.' },
    },
    socialUrl('linkedin', 'LinkedIn'),
    socialUrl('instagram', 'Instagram'),
    socialUrl('facebook', 'Facebook'),
    publishedField({
      defaultValue: true,
      description: 'Unpublished founders are hidden from the About page.',
    }),
    orderField({ description: 'Lower numbers appear first.' }),
  ],
}
