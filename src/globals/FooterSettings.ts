import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { linkItemFields } from '../fields'

export const FooterSettings: GlobalConfig = {
  slug: 'footerSettings',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.SITE_SETTINGS,
    description: 'Footer about text, link columns, and copyright.',
  },
  fields: [
    {
      name: 'aboutTitle',
      type: 'text',
      defaultValue: 'Applied Forensic Research Sciences',
      required: true,
    },
    {
      name: 'aboutDescription',
      type: 'textarea',
      defaultValue:
        'Dedicated to advancing the frontiers of forensic science through education and research excellence across the globe.',
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'links', type: 'array', fields: linkItemFields },
      ],
      defaultValue: [
        {
          title: 'Quick Links',
          links: [
            { label: 'Home', url: '/' },
            { label: 'About Us', url: '/about' },
            { label: 'Programmes', url: '/courses' },
            { label: 'Services', url: '/services' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Notice Board', url: '/notices' },
            { label: 'Student Corner', url: '/student-hub' },
            { label: 'Articles', url: '/articles' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact Us', url: '/contact' },
            { label: 'Privacy Policy', url: '/privacy' },
            { label: 'Terms of Service', url: '/terms' },
          ],
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2026 Applied Forensic Research Sciences. All rights reserved.',
      required: true,
    },
  ],
}
