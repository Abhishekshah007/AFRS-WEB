import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { featuredField, orderField, publishedField } from '../fields/publishing'
import {
  GALLERY_BRANDS,
  GALLERY_CATEGORIES,
  GALLERY_EXAM_PROGRAMS,
} from '../lib/gallery/constants'

export const GalleryItems: CollectionConfig = {
  slug: 'galleryItems',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'service', 'brand', 'featured', 'published', 'order'],
    description:
      'Shared image library. Set Category + Brand for hub tiles. Link a Service for that service detail page gallery.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'label', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'other',
      options: GALLERY_CATEGORIES.map((item) => ({ label: item.label, value: item.value })),
      admin: {
        description: 'Lab, Training, and Events appear on category hub tiles and /gallery filters.',
      },
    },
    {
      name: 'brand',
      type: 'select',
      required: true,
      defaultValue: 'afrs',
      options: GALLERY_BRANDS.map((item) => ({ label: item.label, value: item.value })),
      admin: {
        description: 'AFRS pages show AFRS + Both. AFSL pages show AFSL + Both.',
        position: 'sidebar',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Link to the AFSL service whose detail page should show this image.',
        position: 'sidebar',
      },
    },
    {
      name: 'examProgram',
      type: 'select',
      options: GALLERY_EXAM_PROGRAMS.map((item) => ({ label: item.label, value: item.value })),
      admin: {
        description: 'Optional. Used for UGC NET, FACT, or CUET teaching galleries.',
        position: 'sidebar',
      },
    },
    publishedField({ defaultValue: true }),
    featuredField({
      description: 'When checked, this image is preferred as the category hub tile cover for its category.',
    }),
    orderField(),
  ],
}
