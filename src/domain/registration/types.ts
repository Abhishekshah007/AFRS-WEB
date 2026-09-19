import type { Media } from '@/payload-types'

export type RegistrationType = 'free' | 'paid_manual' | 'paid_gateway'
export type ParticipantRegion = 'indian' | 'international' | 'both'
export type PaymentMode = 'upi' | 'bank' | 'paypal'

export type FeeTier = {
  id: string
  label: string
  amount: number
  currency: 'INR' | 'USD'
  description?: string | null
}

export type PaymentMethodConfig = {
  title: string
  description?: string | null
  qrCode?: number | Media | null
  link?: string | null
  region?: 'indian' | 'international' | 'all' | null
}

export type PaymentInstructionsConfig = {
  title?: string | null
  accountName?: string | null
  accountNumber?: string | null
  ifsc?: string | null
  swift?: string | null
  branchAddress?: string | null
  upiId?: string | null
  paypalLink?: string | null
  note?: string | null
}

export type RegistrationPaymentConfig = {
  formTitle?: string | null
  formSubtitle?: string | null
  paymentInstructions?: PaymentInstructionsConfig | null
  paymentMethods?: PaymentMethodConfig[] | null
}

export type RegistrationSettingsSource = {
  registrationType?: RegistrationType | null
  participantRegion?: ParticipantRegion | null
  feeTiers?: Array<{
    id?: string | null
    label?: string | null
    amount?: number | null
    currency?: 'INR' | 'USD' | null
    description?: string | null
  }> | null
  requirePaymentProof?: boolean | null
  useGlobalPaymentDetails?: boolean | null
  paymentInstructions?: PaymentInstructionsConfig | null
  useGlobalInstructions?: boolean | null
  instructions?: string | null
  requireAgreement?: boolean | null
}

export type ResolvedRegistrationConfig = {
  registrationType: RegistrationType
  participantRegion: ParticipantRegion
  feeTiers: FeeTier[]
  requirePaymentProof: boolean
  requireAgreement: boolean
  instructions: string
  payment: RegistrationPaymentConfig
}

export type FormSubmitState =
  | { status: 'idle'; message?: string }
  | { status: 'submitting'; message?: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }
