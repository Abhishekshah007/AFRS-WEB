import type { Field } from 'payload'

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
