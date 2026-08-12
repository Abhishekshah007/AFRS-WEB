import type { Field } from 'payload'

import {
  PAYMENT_PROVIDER_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
  REGISTRATION_STATUS_OPTIONS,
} from './options'

type RegistrationContactOptions = {
  organizationRequired?: boolean
  designationRequired?: boolean
}

/** Shared contact fields for event and course registrations. */
export const registrationContactFields = ({
  organizationRequired = false,
  designationRequired = false,
}: RegistrationContactOptions = {}): Field[] => [
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'countryCode', type: 'text', defaultValue: '+91' },
    { name: 'mobileNumber', type: 'text', required: true },
    { name: 'address', type: 'text' },
    { name: 'organization', type: 'text', required: organizationRequired },
    { name: 'designation', type: 'text', required: designationRequired },
  ]

/** Shared payment proof fields for manual UPI / bank transfer registrations. */
export const registrationPaymentProofFields: Field[] = [
  { name: 'transactionId', type: 'text', admin: { description: 'UPI / bank transaction reference.' } },
  { name: 'transactionDate', type: 'date' },
  { name: 'transactionTime', type: 'text', admin: { description: 'e.g. 14:30' } },
  { name: 'transactionProof', type: 'upload', relationTo: 'media' },
]

/** Shared payment tracking fields for registrations. */
export const registrationPaymentFields: Field[] = [
  { name: 'totalAmount', type: 'number', defaultValue: 0 },
  {
    name: 'paymentProvider',
    type: 'select',
    defaultValue: 'manual',
    options: [...PAYMENT_PROVIDER_OPTIONS],
  },
  {
    name: 'paymentStatus',
    type: 'select',
    defaultValue: 'pending',
    required: true,
    options: [...PAYMENT_STATUS_OPTIONS],
  },
  {
    name: 'registrationStatus',
    type: 'select',
    defaultValue: 'initiated',
    required: true,
    options: [...REGISTRATION_STATUS_OPTIONS],
  },
  { name: 'paymentReference', type: 'text' },
  {
    name: 'stripeCheckoutSessionId',
    type: 'text',
    admin: { condition: (_, siblingData) => siblingData?.paymentProvider === 'stripe' },
  },
  {
    name: 'stripePaymentIntentId',
    type: 'text',
    admin: { condition: (_, siblingData) => siblingData?.paymentProvider === 'stripe' },
  },
  { name: 'paymentConfirmedAt', type: 'date' },
]
