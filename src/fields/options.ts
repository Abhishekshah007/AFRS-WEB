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
  { label: 'Stripe', value: 'stripe' },
  { label: 'Manual / Offline', value: 'manual' },
] as const

export const PAYMENT_STATUS_OPTIONS = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Failed', value: 'failed' },
] as const

export const REGISTRATION_STATUS_OPTIONS = [
  { label: 'Initiated', value: 'initiated' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Cancelled', value: 'cancelled' },
] as const
