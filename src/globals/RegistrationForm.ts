import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'

export const RegistrationForm: GlobalConfig = {
  slug: 'registrationForm',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.EVENTS,
    description: 'Configure the course registration form fields and payment instructions.',
  },
  fields: [
    {
      name: 'formTitle',
      type: 'text',
      required: true,
      defaultValue: 'Course Registration',
    },
    {
      name: 'formSubtitle',
      type: 'textarea',
      defaultValue:
        'Submit your registration details and payment confirmation information. This form is dynamic and can be adjusted from the admin CMS based on event requirements.',
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'fields',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
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
            { name: 'required', type: 'checkbox' },
            { name: 'placeholder', type: 'text' },
            {
              name: 'options',
              type: 'textarea',
              admin: {
                description: 'Comma-separated options for select fields.',
              },
            },
            { name: 'rows', type: 'number', admin: { description: 'Rows for textarea fields.' } },
            { name: 'accept', type: 'text', admin: { description: 'Accept attribute for file inputs.' } },
          ],
        },
      ],
    },
    {
      name: 'paymentInstructions',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Payment details' },
        { name: 'accountName', type: 'text', defaultValue: 'A/N- Applied Forensic Research Sciences' },
        { name: 'accountNumber', type: 'text', defaultValue: 'A/N- No. 886220110000450' },
        { name: 'ifsc', type: 'text', defaultValue: 'IFSC-BKID0008862' },
        { name: 'swift', type: 'text', defaultValue: 'SWIFT CODE-BKIDINBBPAL' },
        {
          name: 'branchAddress',
          type: 'textarea',
          defaultValue:
            'Branch Address- Bank of India, Collectorate Indore, Prabhat Heights Lal Bagh Road Indore, MP-452001.',
        },
        { name: 'upiId', type: 'text', defaultValue: 'boim-836216890450boi' },
        {
          name: 'note',
          type: 'textarea',
          defaultValue:
            'Use the transaction details below to confirm your registration. Upload the screenshot or transaction proof after payment, then submit the form.',
        },
      ],
    },
    {
      name: 'paymentMethods',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'qrCode', type: 'upload', relationTo: 'media' },
        { name: 'link', type: 'text' },
      ],
    },
  ],
}
