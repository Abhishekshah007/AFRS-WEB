import type { FeeTier, RegistrationSettingsSource } from '@/domain/registration/types'

export const DEFAULT_REGISTRATION_INSTRUCTIONS = `Please enter your Full Name, College/Institution Name, Course Name, and College Location exactly as you want them to appear on your certificate. No changes will be made later.

• Provide a valid Email ID and Phone Number to receive confirmation and program updates.
• Double-check all details for correct spelling and proper format before submitting the form.
• Registration fees are strictly non-refundable and non-transferable under any circumstances.
• Upload or provide a valid payment proof (screenshot/transaction ID) if required for verification.
• Submit only one registration per participant. Multiple entries may lead to disqualification.
• Ensure you complete your registration before the deadline to confirm your participation.
• All communication regarding the program (joining link, updates, instructions) will be shared via Email/WhatsApp.
• Participants are expected to maintain professional conduct and discipline throughout the program.
• Certificates will be issued only after successful participation/attendance as per the program guidelines.`

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
