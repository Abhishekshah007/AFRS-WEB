import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../../access'

export const HeaderSettings: GlobalConfig = {
  slug: 'headerSettings',
  access: {
    read: isPublic,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Site',
  },
  fields: [
    {
      name: 'topBarEnabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'topBarLeftText',
      type: 'text',
      defaultValue: '+91-9926692487',
    },
    {
      name: 'topBarLeftText2',
      type: 'text',
      defaultValue: 'afrsciences@gmail.com',
    },
    {
      name: 'topBarLeftText3',
      type: 'array',
      fields: [
        { name: 'icon', type: 'upload', required: true, relationTo: 'media' },
        { name: 'url', type: 'text', required: true },
        { name: 'label', type: 'text' }
      ],
      defaultValue: [
        {
          icon: 9,
          label: 'Facebook',
          url: 'https://www.facebook.com/share/1BiD8xBRKc/',
        },
        {
          icon: 10,
          label: 'Instagram',
          url: 'https://instagram.com/afrsciences',
        },
        {
          icon: 11,
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/company/afrsciences',
        },
        {
          icon: 12,
          label: 'Twitter',
          url: 'https://twitter.com/afrsciences',
        },
        {
          icon: 13,
          label: 'YouTube',
          url: 'https://www.youtube.com/c/AppliedforensicscienceforjusticeStudentGroup/videos',
        },
        {
          icon: 14,
          label: 'WhatsApp',
          url: 'https://api.whatsapp.com/send/?phone=9926692487&text&type=phone_number&app_absent=0',
        },
        {
          icon: 15,
          label: 'Telegram',
          url: 'https://t.me/afsjstudent',
        },
      ],
    },
    {
      name: 'topBarLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Events', url: '/events' },
        { label: 'Language', url: '#' },
        { label: 'Notification', url: '#' },
      ],
    },
    {
      name: 'brandTitle',
      type: 'text',
      defaultValue: 'Applied Forensic Research Sciences',
      required: true,
    },
    {
      name: 'brandSubtitle',
      type: 'text',
      defaultValue: 'Forensic Education Institute',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Home', url: '/' },
        { label: 'About AFRS', url: '/about' },
        { label: 'AFSL Forensic Services', url: '/services' },
        { label: 'Student Corner', url: '/student-hub' },
        { label: 'Forensic Education & Training', url: '/courses' },
        { label: 'Reach Us', url: '/contact' },
      ],
    },
  ],
}
