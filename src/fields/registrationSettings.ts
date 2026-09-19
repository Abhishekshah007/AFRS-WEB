import type { Field } from 'payload'

export const REGISTRATION_TYPE_OPTIONS = [
  { label: 'Free registration', value: 'free' },
  { label: 'Paid — manual verification (UPI / bank / PayPal)', value: 'paid_manual' },
  { label: 'Paid — payment gateway (future)', value: 'paid_gateway' },
] as const

export const PARTICIPANT_REGION_OPTIONS = [
  { label: 'Indian participants', value: 'indian' },
  { label: 'International participants', value: 'international' },
  { label: 'Both (participant chooses)', value: 'both' },
] as const

function withDbName<T extends Field>(field: T, dbName: string, enabled: boolean): T {
  return enabled ? ({ ...field, dbName } as T) : field
}

function feeTierFieldsForDb(compactDbNames: boolean): Field[] {
  return [
    { name: 'label', type: 'text', required: true },
    { name: 'amount', type: 'number', required: true, min: 0 },
    withDbName(
      {
        name: 'currency',
        type: 'select',
        required: true,
        defaultValue: 'INR',
        options: [
          { label: 'INR (₹)', value: 'INR' },
          { label: 'USD ($)', value: 'USD' },
        ],
      },
      'cur',
      compactDbNames,
    ),
    { name: 'description', type: 'text' },
  ]
}

function paymentInstructionsOverrideFieldsForDb(_compactDbNames: boolean): Field[] {
  return [
    { name: 'title', type: 'text' },
    { name: 'accountName', type: 'text' },
    { name: 'accountNumber', type: 'text' },
    { name: 'ifsc', type: 'text' },
    { name: 'swift', type: 'text' },
    { name: 'branchAddress', type: 'textarea' },
    { name: 'upiId', type: 'text' },
    {
      name: 'paypalLink',
      type: 'text',
      admin: { description: 'PayPal.me or international payment link.' },
    },
    { name: 'note', type: 'textarea' },
  ]
}

type RegistrationSettingsFieldOptions = {
  /** Programme items can define fee tiers; events use registration categories instead. */
  includeFeeTiers?: boolean
  name?: string
  /** Shorten Postgres table/column names — required for nested programme catalog fields. */
  dbName?: string
  compactDbNames?: boolean
}

/** Per-programme or per-event registration behaviour (payment, instructions, tiers). */
export function registrationSettingsField({
  includeFeeTiers = false,
  name = 'registrationSettings',
  dbName,
  compactDbNames = false,
}: RegistrationSettingsFieldOptions = {}): Field {
  const short = compactDbNames || Boolean(dbName)

  return {
    name,
    type: 'group',
    ...(dbName ? { dbName } : {}),
    admin: {
      description:
        'Control whether registration is free or paid, fee tiers, payment QR/bank details, and instructions participants must accept.',
    },
    fields: [
      withDbName(
        {
          name: 'registrationType',
          type: 'select',
          defaultValue: 'paid_manual',
          options: [...REGISTRATION_TYPE_OPTIONS],
        },
        'reg_type',
        short,
      ),
      withDbName(
        {
          name: 'participantRegion',
          type: 'select',
          defaultValue: 'both',
          options: [...PARTICIPANT_REGION_OPTIONS],
          admin: {
            description:
              'Which payment block to show. Use “Both” to let participants choose Indian or International fees.',
          },
        },
        'part_rgn',
        short,
      ),
      ...(includeFeeTiers
        ? [
            withDbName(
              {
                name: 'feeTiers',
                type: 'array',
                admin: {
                  description:
                    'Fee options for this programme. Leave empty to use global defaults from Registration Form.',
                },
                fields: feeTierFieldsForDb(short),
              },
              'fee_tiers',
              short,
            ) as Field,
          ]
        : []),
      {
        name: 'requirePaymentProof',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          description: 'When paid, require transaction ID and proof upload before submission.',
        },
      },
      {
        name: 'useGlobalPaymentDetails',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          description:
            'Use bank/UPI/QR from Globals → Registration Form. Turn off to override for this item only.',
        },
      },
      withDbName(
        {
          name: 'paymentInstructions',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData?.useGlobalPaymentDetails === false,
            description:
              'Text-only bank/UPI/PayPal overrides. QR codes stay on Globals → Registration Form.',
          },
          fields: paymentInstructionsOverrideFieldsForDb(short),
        },
        'pay_inst',
        short,
      ),
      {
        name: 'useGlobalInstructions',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          description: 'Use default instructions from Globals → Registration Form.',
        },
      },
      {
        name: 'instructions',
        type: 'textarea',
        admin: {
          condition: (_, siblingData) => siblingData?.useGlobalInstructions === false,
          description: 'Shown before payment. Participants must agree to continue.',
        },
      },
      {
        name: 'requireAgreement',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          description: 'Require participants to accept instructions before proceeding to payment.',
        },
      },
    ],
  }
}

export const globalRegistrationDefaultsFields: Field[] = [
  {
    name: 'defaultInstructions',
    type: 'textarea',
    admin: {
      description:
        'Default registration instructions shown before payment. Can be overridden per programme or event.',
    },
  },
  {
    name: 'requireAgreement',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      description: 'Default: require agreement checkbox before payment.',
    },
  },
  withDbName(
    {
      name: 'defaultFeeTiers',
      type: 'array',
      admin: {
        description:
          'Default fee tiers for course/training registrations when a programme has none configured.',
      },
      fields: feeTierFieldsForDb(false),
    },
    'def_fee_tiers',
    true,
  ),
]
