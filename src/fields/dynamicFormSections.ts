import type { Field } from 'payload'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'

export const DEFAULT_REGISTRATION_SECTIONS: DynamicFormSection[] = [
  {
    title: 'Personal Information',
    fields: [
      {
        name: 'title',
        label: 'MR/MS/DR',
        fieldType: 'select',
        required: true,
        options: 'Mr, Ms, Dr, Other',
      },
      {
        name: 'full-name-mention-in-certificate',
        label: 'Full Name (mention in certificate)',
        fieldType: 'text',
        required: true,
      },
      { name: 'email-id', label: 'Email ID', fieldType: 'email', required: true },
      { name: 'address', label: 'Address', fieldType: 'textarea', required: true },
      {
        name: 'contact-no-whatsapp',
        label: 'Contact No (WhatsApp)',
        fieldType: 'tel',
        required: true,
      },
    ],
  },
  {
    title: 'Academic Info / Professional Info',
    fields: [
      {
        name: 'current-study-job-status',
        label: 'Current Study/Job Status',
        fieldType: 'select',
        required: true,
        options:
          'School Student (10th / 12th), Undergraduate Student, Postgraduate Student, Research Scholar / PhD, Intern / Trainee, Employed — Government, Employed — Private sector, Self-employed / Practitioner, Faculty / Academic, Unemployed / Between roles, Other',
      },
      {
        name: 'department-institute-name',
        label: 'Department/Institute Name',
        fieldType: 'text',
        required: true,
      },
      {
        name: 'college-university-company-name',
        label: 'College/University/Company Name',
        fieldType: 'text',
        required: true,
      },
    ],
  },
]

/** Reusable CMS field rows for dynamic registration forms (courses + events). */
export const dynamicFormFieldRows: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
    admin: {
      description: 'Question shown to the participant (e.g. Full name for certificate).',
    },
  },
  {
    name: 'fieldType',
    type: 'select',
    required: true,
    defaultValue: 'text',
    options: [
      { label: 'Short text', value: 'text' },
      { label: 'Email', value: 'email' },
      { label: 'Phone / WhatsApp', value: 'tel' },
      { label: 'Long text / paragraph', value: 'textarea' },
      { label: 'Dropdown choices', value: 'select' },
      { label: 'Date', value: 'date' },
      { label: 'Time', value: 'time' },
      { label: 'File upload (image/PDF)', value: 'file' },
      { label: 'Number', value: 'number' },
    ],
  },
  {
    name: 'required',
    type: 'checkbox',
    defaultValue: false,
    label: 'Required field',
  },
  {
    name: 'placeholder',
    type: 'text',
    admin: { description: 'Optional hint inside the input box.' },
  },
  {
    name: 'options',
    type: 'textarea',
    admin: {
      description: 'For dropdown only — separate choices with commas (e.g. Student, Professional).',
      condition: (_, siblingData) => siblingData?.fieldType === 'select',
    },
  },
  {
    name: 'rows',
    type: 'number',
    admin: {
      description: 'Height for long text fields.',
      condition: (_, siblingData) => siblingData?.fieldType === 'textarea',
    },
  },
  {
    name: 'accept',
    type: 'text',
    defaultValue: 'image/*,.pdf',
    admin: {
      description: 'For file uploads — usually image/*,.pdf is fine.',
      condition: (_, siblingData) => siblingData?.fieldType === 'file',
    },
  },
  {
    name: 'name',
    type: 'text',
    admin: {
      readOnly: true,
      hidden: true,
      description: 'Auto-generated from the question label — do not edit.',
    },
  },
]

export function dynamicFormSectionsField({
  name,
  label,
  description,
}: {
  name: string
  label?: string
  description?: string
}): Field {
  return {
    name,
    type: 'array',
    label,
    defaultValue: DEFAULT_REGISTRATION_SECTIONS,
    admin: {
      description:
        description ||
        'Build the registration form participants will see. Add sections (e.g. Personal Information) and questions inside each section.',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        label: 'Section title',
        admin: { placeholder: 'e.g. Personal Information' },
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Section note (optional)',
        admin: { placeholder: 'Short note shown under the section title.' },
      },
      {
        name: 'fields',
        type: 'array',
        label: 'Questions',
        fields: dynamicFormFieldRows,
      },
    ],
  }
}
