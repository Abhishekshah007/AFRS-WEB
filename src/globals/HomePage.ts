import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.PAGES,
    description: 'Home page hero and section copy.',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Where Evidence Speaks. Science Answers.',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            "India's premier hub for forensic education, research & professional services",
        },
        { name: 'primaryCTALabel', type: 'text', defaultValue: 'Explore Now' },
        { name: 'primaryCTAUrl', type: 'text', defaultValue: '/courses' },
        { name: 'secondaryCTALabel', type: 'text', defaultValue: 'Learn More' },
        { name: 'secondaryCTAUrl', type: 'text', defaultValue: '/about' },
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'sectionText',
      type: 'group',
      admin: { description: 'Headings and body copy for home page sections only.' },
      fields: [
        { name: 'featuredCardsHeading', type: 'text', defaultValue: 'Our Key Services & Programs' },
        { name: 'servicesHeading', type: 'text', defaultValue: 'Our Key Services & Programs' },
        {
          name: 'servicesDescription',
          type: 'text',
          defaultValue:
            'Comprehensive forensic solutions tailored for academic growth and professional expertise.',
        },
        { name: 'eventsHeading', type: 'text', defaultValue: 'Upcoming Events' },
        {
          name: 'eventsDescription',
          type: 'text',
          defaultValue: 'Join our forensic science training programs and workshops',
        },
        {
          name: 'aboutHeading',
          type: 'text',
          defaultValue: 'Advancing Forensic Excellence Through Research, Education and Innovation.',
        },
        {
          name: 'aboutDescription1',
          type: 'textarea',
          defaultValue:
            'Applied Forensic Research Sciences (AFRS) is a dedicated platform committed to advancing education, research and professional development in the field of Forensic Science.',
        },
        {
          name: 'aboutDescription2',
          type: 'textarea',
          defaultValue:
            'We bridge the gap between academic theory and practical application, providing students and professionals with the tools they need to excel in the field of forensic investigation.',
        },
      ],
    },
  ],
}
