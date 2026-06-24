import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../../access'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  access: {
    read: isPublic,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Site',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: "Where Evidence Speaks. Science Answers." },
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
      fields: [
        { name: 'featuredCardsHeading', type: 'text', defaultValue: 'Our Key Services & Programs' },
        { name: 'servicesHeading', type: 'text', defaultValue: 'Our Key Services & Programs' },
        {
          name: 'servicesDescription',
          type: 'text',
          defaultValue: 'Comprehensive forensic solutions tailored for academic growth and professional expertise.',
        },
        { name: 'eventsHeading', type: 'text', defaultValue: 'Upcoming Events' },
        {
          name: 'eventsDescription',
          type: 'text',
          defaultValue: 'Join our forensic science training programs and workshops',
        },
        { name: 'aboutHeading', type: 'text', defaultValue: 'About Applied Forensic Research Sciences' },
        {
          name: 'aboutDescription1',
          type: 'textarea',
          defaultValue:
            'Applied Forensic Research Sciences (AFRS) is a premier organization established with a vision to revolutionize the forensic science landscape through research, training, and specialized services.',
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
