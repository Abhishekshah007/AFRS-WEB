import type { Field } from 'payload'

/** Reusable CMS field rows for dynamic registration forms (courses + events). */
export const dynamicFormFieldRows: Field[] = [
  { name: 'name', type: 'text', required: true, admin: { description: 'Internal key — use camelCase, no spaces.' } },
  { name: 'label', type: 'text', required: true },
  {
    name: 'fieldType',
    type: 'select',
    required: true,
    options: [
      { label: 'Text', value: 'text' },
      { label: 'Email', value: 'email' },
      { label: 'Telephone', value: 'tel' },
      { label: 'Textarea', value: 'textarea' },
      { label: 'Select', value: 'select' },
      { label: 'Date', value: 'date' },
      { label: 'Time', value: 'time' },
      { label: 'File', value: 'file' },
      { label: 'Number', value: 'number' },
    ],
  },
  { name: 'required', type: 'checkbox', defaultValue: false },
  { name: 'placeholder', type: 'text' },
  {
    name: 'options',
    type: 'textarea',
    admin: { description: 'Comma-separated options for select fields.' },
  },
  { name: 'rows', type: 'number', admin: { description: 'Rows for textarea fields.' } },
  { name: 'accept', type: 'text', admin: { description: 'Accept attribute for file inputs (e.g. image/*,.pdf).' } },
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
        'Add sections and fields shown on the registration form. Leave empty to use default fields only.',
    },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      {
        name: 'fields',
        type: 'array',
        fields: dynamicFormFieldRows,
      },
    ],
  }
}
