import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { contentRichTextField, excerptField, slugField } from '../fields'
import { orderField, publishedField } from '../fields/publishing'

export const Services: CollectionConfig = {
  slug: 'services',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'published', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'banner', type: 'upload', relationTo: 'media' },
    excerptField({ description: 'Short summary shown in cards.' }),
    contentRichTextField(),
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Forensic Service', value: 'forensicService' },
        { label: 'Laboratory', value: 'laboratory' },
        { label: 'Training', value: 'training' },
        { label: 'Consultancy', value: 'consultancy' },
      ],
    },
    {
      name: 'helpHeading',
      type: 'text',
      defaultValue: 'How We Can Help',
      admin: {
        description: 'Heading for the capability rows on the service detail page.',
      },
    },
    {
      name: 'helpIntro',
      type: 'textarea',
      admin: {
        description: 'Optional intro paragraph shown under the heading.',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'How We Can Help',
      labels: {
        singular: 'Capability',
        plural: 'How We Can Help',
      },
      admin: {
        description:
          'Each item is a full-width row: content on the left and thumbnail on the right.',
        initCollapsed: true,
      },
      fields: [
        { name: 'featureTitle', type: 'text', required: true, label: 'Title' },
        {
          name: 'featureDescription',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'featurePoints',
          type: 'textarea',
          label: 'Key points',
          admin: {
            description: 'Optional supporting points. Enter one point per line.',
          },
        },
        {
          name: 'featureIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
          admin: {
            description: 'Image shown on the right side of this row.',
          },
        },
      ],
    },
    publishedField(),
    orderField(),
  ],
}
