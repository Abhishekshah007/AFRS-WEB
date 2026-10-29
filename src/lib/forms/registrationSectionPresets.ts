import { STUDY_JOB_STATUS_OPTIONS } from '@/lib/forms/studyJobStatusOptions'

export type RegistrationSectionPreset = {
  title: string
  description: string
  fields: Array<{
    label: string
    fieldType: string
    required: boolean
    options?: string
    rows?: number
  }>
}

export const registrationSectionPresets: RegistrationSectionPreset[] = [
  {
    title: 'Personal Information',
    description: 'Enter your personal and contact details.',
    fields: [
      {
        label: 'Title (Mr / Ms / Dr)',
        fieldType: 'select',
        required: true,
        options: 'Mr., Ms., Mrs., Dr., Prof.',
      },
      { label: 'Full Name (mention in certificate)', fieldType: 'text', required: true },
      { label: 'Email ID', fieldType: 'email', required: true },
      { label: 'Address', fieldType: 'textarea', required: true, rows: 4 },
      { label: 'Contact No (WhatsApp)', fieldType: 'tel', required: true },
    ],
  },
  {
    title: 'Academic Info / Professional Info',
    description: 'Tell us about your current study or professional background.',
    fields: [
      {
        label: 'Current Study / Job Status',
        fieldType: 'select',
        required: true,
        options: STUDY_JOB_STATUS_OPTIONS,
      },
      { label: 'Department / Institute Name', fieldType: 'text', required: true },
      { label: 'College / University / Company Name', fieldType: 'text', required: true },
    ],
  },
]
