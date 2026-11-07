export const REGISTRATION_PAYMENT_METHODS = [
  { label: 'Google Pay', value: 'google_pay', mode: 'upi' },
  { label: 'Apple Pay', value: 'apple_pay', mode: 'other' },
  { label: 'PhonePe', value: 'phonepe', mode: 'upi' },
  { label: 'Paytm', value: 'paytm', mode: 'upi' },
  { label: 'Other UPI app', value: 'other_upi', mode: 'upi' },
  { label: 'Bank transfer', value: 'bank_transfer', mode: 'bank' },
  { label: 'PayPal', value: 'paypal', mode: 'paypal' },
] as const

export type RegistrationPaymentMethod = (typeof REGISTRATION_PAYMENT_METHODS)[number]['value']
export type RegistrationPaymentMode = (typeof REGISTRATION_PAYMENT_METHODS)[number]['mode']

const PAYMENT_METHOD_MODES: Record<RegistrationPaymentMethod, RegistrationPaymentMode> = {
  google_pay: 'upi',
  apple_pay: 'other',
  phonepe: 'upi',
  paytm: 'upi',
  other_upi: 'upi',
  bank_transfer: 'bank',
  paypal: 'paypal',
}

export function isRegistrationPaymentMethod(value: string): value is RegistrationPaymentMethod {
  return REGISTRATION_PAYMENT_METHODS.some((method) => method.value === value)
}

export function paymentModeForMethod(method: RegistrationPaymentMethod): RegistrationPaymentMode {
  return PAYMENT_METHOD_MODES[method]
}
