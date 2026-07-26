import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { orderField, publishedField } from '../fields/publishing'

export const AboutCertifications: CollectionConfig = {
  slug: 'aboutCertifications',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.PAGES,
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuer', 'published', 'order'],
    description: 'Certifications and recognitions shown on the About page.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'issuer',
      type: 'text',
      admin: { description: 'Optional issuing authority, ministry, or institution.' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Upload the certification logo or emblem. Stored through Media.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional short note shown on the About page card.' },
    },
    {
      name: 'certificateUrl',
      type: 'text',
      admin: { description: 'Optional public URL to a certificate PDF, verification page, or proof.' },
    },
    publishedField({ defaultValue: true }),
    orderField(),
  ],
}
