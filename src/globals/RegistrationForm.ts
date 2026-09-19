import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { dynamicFormSectionsField } from '../fields/dynamicFormSections'
import { globalRegistrationDefaultsFields } from '../fields/registrationSettings'
import { normalizeRegistrationFormSectionsData } from '../hooks/normalizeRegistrationSections'
import { DEFAULT_FEE_TIERS, DEFAULT_REGISTRATION_INSTRUCTIONS } from '@/lib/registration/defaults'

export const RegistrationForm: GlobalConfig = {
  slug: 'registrationForm',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.EVENTS,
    description: 'Configure the course registration form fields and payment instructions.',
  },
  hooks: {
    beforeChange: [normalizeRegistrationFormSectionsData],
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
    dynamicFormSectionsField({
      name: 'sections',
      label: 'Registration form',
      description:
        'Build the course registration form. Include at least one Email and one Phone/WhatsApp field so confirmations can be sent.',
    }),
    ...globalRegistrationDefaultsFields.map((field) => {
      if (field.type === 'textarea' && 'name' in field && field.name === 'defaultInstructions') {
        return { ...field, defaultValue: DEFAULT_REGISTRATION_INSTRUCTIONS }
      }
      if (field.type === 'array' && 'name' in field && field.name === 'defaultFeeTiers') {
        return {
          ...field,
          defaultValue: DEFAULT_FEE_TIERS.map((tier) => ({
            label: tier.label,
            amount: tier.amount,
            currency: tier.currency,
            description: tier.description,
          })),
        }
      }
      return field
    }),
    {
      name: 'paymentInstructions',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Registration Fees (Indian Participants)' },
        {
          name: 'accountName',
          type: 'text',
          defaultValue: 'A/N- Applied Forensic Research Sciences',
        },
        { name: 'accountNumber', type: 'text', defaultValue: 'A/N- No. 886220110000450' },
        { name: 'ifsc', type: 'text', defaultValue: 'IFSC-BKID0008862' },
        { name: 'swift', type: 'text', defaultValue: 'SWIFT CODE-BKIDINBBPAL' },
        {
          name: 'branchAddress',
          type: 'textarea',
          defaultValue:
            'Branch Address- Bank of India, Collectorate Indore, Prabhat Heights Lal Bagh Road Indore, MP-452001.',
        },
        { name: 'upiId', type: 'text', defaultValue: 'boim-886216890450@boi' },
        {
          name: 'paypalLink',
          type: 'text',
          admin: {
            description: 'PayPal.me or international payment link for international participants.',
          },
        },
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
        {
          name: 'region',
          type: 'select',
          defaultValue: 'indian',
          options: [
            { label: 'Indian participants', value: 'indian' },
            { label: 'International participants', value: 'international' },
            { label: 'All participants', value: 'all' },
          ],
        },
      ],
    },
  ],
}
