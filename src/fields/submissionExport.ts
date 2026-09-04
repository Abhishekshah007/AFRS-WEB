import type { Field } from 'payload'

export const SUBMISSION_FORM_TYPES = [
  { label: 'General Contact', value: 'contact' },
  { label: 'Lab Inquiry (AFSL)', value: 'labInquiry' },
  { label: 'Service Consultation', value: 'serviceConsult' },
  { label: 'Legal Consultancy', value: 'legalConsultancy' },
] as const

export type SubmissionFormType = (typeof SUBMISSION_FORM_TYPES)[number]['value']

export const submissionExportField = (): Field => ({
  name: 'exportDocument',
  type: 'upload',
  relationTo: 'media',
  admin: {
    readOnly: true,
    description: 'Auto-generated DOCX export of this submission.',
  },
})
