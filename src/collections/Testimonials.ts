import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { publishedField } from '../fields/publishing'
import { testimonialDisplayOptions } from '@/lib/queries/testimonials'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'displayOn', 'published'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'testimonial', type: 'textarea', required: true },
    {
      name: 'displayOn',
      type: 'select',
      required: true,
      defaultValue: 'afrs',
      options: [...testimonialDisplayOptions],
      admin: {
        description: 'Choose whether this testimonial appears on AFRS Home, AFSL Services, or both.',
        position: 'sidebar',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    publishedField(),
  ],
}
