import type { Media } from '@/payload-types'

export type PaymentMethodConfig = {
  title: string
  description?: string | null
  qrCode?: number | Media | null
  link?: string | null
}

export type PaymentInstructionsConfig = {
  title?: string | null
  accountName?: string | null
  accountNumber?: string | null
  ifsc?: string | null
  swift?: string | null
  branchAddress?: string | null
  upiId?: string | null
  note?: string | null
}

export type RegistrationPaymentConfig = {
  formTitle?: string | null
  formSubtitle?: string | null
  paymentInstructions?: PaymentInstructionsConfig | null
  paymentMethods?: PaymentMethodConfig[] | null
}

export type FormSubmitState =
  | { status: 'idle'; message?: string }
  | { status: 'submitting'; message?: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }
