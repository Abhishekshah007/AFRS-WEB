import type { SelectField } from 'payload'

export const EVENT_NATURE_OPTIONS = [
  { label: 'National', value: 'national' },
  { label: 'International', value: 'international' },
] as const

type SelectFieldOverrides = Omit<
  Partial<SelectField>,
  'hasMany' | 'name' | 'options' | 'type' | 'validate'
> & { hasMany?: false }

export const eventNatureField = (overrides: SelectFieldOverrides = {}): SelectField => ({
  name: 'eventNature',
  type: 'select',
  options: [...EVENT_NATURE_OPTIONS],
  ...overrides,
})

export const PAYMENT_PROVIDER_OPTIONS = [
  { label: 'Manual / UPI / Bank Transfer', value: 'manual' },
  { label: 'Stripe (future)', value: 'stripe' },
] as const

export const PAYMENT_STATUS_OPTIONS = [
  { label: 'Pending verification', value: 'pending' },
  { label: 'Verified', value: 'paid' },
  { label: 'Failed / Rejected', value: 'failed' },
  { label: 'Not required', value: 'notRequired' },
] as const

export const REGISTRATION_STATUS_OPTIONS = [
  { label: 'Submitted', value: 'initiated' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Contacted', value: 'contacted' },
] as const
