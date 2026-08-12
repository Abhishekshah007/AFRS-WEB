import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { aboutPageSectionFields } from '../fields/aboutPage'

export const AboutPage: GlobalConfig = {
  slug: 'aboutPage',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.PAGES,
    description: 'About page hero image and all section copy.',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [{ name: 'heroImage', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'sectionText',
      type: 'group',
      admin: { description: 'Headings, body copy, and lists for the About page.' },
      fields: aboutPageSectionFields(),
    },
  ],
}
