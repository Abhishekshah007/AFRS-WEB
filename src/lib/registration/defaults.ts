import type { FeeTier, RegistrationSettingsSource } from '@/domain/registration/types'

export const DEFAULT_REGISTRATION_INSTRUCTIONS = `Applicants are strictly advised to read all instructions before proceeding.

By submitting this form, you acknowledge and accept all terms and policies of Applied Forensic Research Sciences.

• All information must be accurate, complete, and true.
• Your full name must match the name on your certificate — no changes after submission.
• A valid email and WhatsApp-enabled mobile number are required for updates and certificate delivery.
• Registration is confirmed only after successful payment through official channels.
• All program fees are strictly non-refundable and non-transferable.
• Requests for modification after submission will not be entertained.
• Certificates are issued based on the information provided and program completion criteria.

Applicants must retain a copy of the payment confirmation for future reference. In case of technical issues, contact official support before re-registering.`

export const DEFAULT_FEE_TIERS_INDIAN: FeeTier[] = [
  { id: 'student-inr', label: 'Students', amount: 300, currency: 'INR' },
  { id: 'scholar-inr', label: 'Research Scholars', amount: 400, currency: 'INR' },
  { id: 'academic-inr', label: 'Academicians', amount: 450, currency: 'INR' },
  { id: 'professional-inr', label: 'Working Professional', amount: 500, currency: 'INR' },
]

export const DEFAULT_FEE_TIERS_INTERNATIONAL: FeeTier[] = [
  { id: 'student-usd', label: 'Students', amount: 10, currency: 'USD' },
  { id: 'scholar-usd', label: 'Research Scholar', amount: 12, currency: 'USD' },
  { id: 'academic-usd', label: 'Academicians', amount: 15, currency: 'USD' },
  { id: 'professional-usd', label: 'Working Professional', amount: 20, currency: 'USD' },
]

export const DEFAULT_FEE_TIERS: FeeTier[] = [
  ...DEFAULT_FEE_TIERS_INDIAN,
  ...DEFAULT_FEE_TIERS_INTERNATIONAL,
]

export const DEFAULT_REGISTRATION_SETTINGS: RegistrationSettingsSource = {
  registrationType: 'paid_manual',
  participantRegion: 'both',
  requirePaymentProof: true,
  useGlobalPaymentDetails: true,
  useGlobalInstructions: true,
  requireAgreement: true,
}
