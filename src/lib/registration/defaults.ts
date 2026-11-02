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

export const DEFAULT_AFSL_REGISTRATION_INSTRUCTIONS = `𝗔𝗽𝗽𝗹𝗶𝗰𝗮𝗻𝘁𝘀 𝗮𝗿𝗲 𝗮𝗱𝘃𝗶𝘀𝗲𝗱 𝘁𝗼 𝗿𝗲𝗮𝗱 𝘁𝗵𝗲 𝗳𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴 𝗶𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 𝗰𝗮𝗿𝗲𝗳𝘂𝗹𝗹𝘆 𝗯𝗲𝗳𝗼𝗿𝗲 𝗽𝗿𝗼𝗰𝗲𝗲𝗱𝗶𝗻𝗴 𝘄𝗶𝘁𝗵 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝘁𝗶𝗼𝗻:
1. 𝑨𝒄𝒄𝒆𝒑𝒕𝒂𝒏𝒄𝒆 𝒐𝒇 𝑻𝒆𝒓𝒎𝒔: By submitting the registration form, applicants confirm that they have read, understood, and agreed to the applicable Terms & Conditions, Privacy Policy, and Refund/Cancellation Policy of Applied Forensic Science Lab India LLP (AFSL).
2. 𝑨𝒄𝒄𝒖𝒓𝒂𝒕𝒆 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏: All information provided in the registration form must be accurate, complete, and truthful to the best of the applicant’s knowledge.
3. 𝑵𝒂𝒎𝒆 𝒇𝒐𝒓 𝑪𝒆𝒓𝒕𝒊𝒇𝒊𝒄𝒂𝒕𝒆: Applicants must enter their full name exactly as it should appear on the certificate. Requests for name changes or corrections after submission may not be accepted; applicants should verify their details carefully before submitting.
4. 𝑶𝒇𝒇𝒊𝒄𝒊𝒂𝒍 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒄𝒂𝒕𝒊𝒐𝒏: A valid and active email address and functional mobile number, preferably WhatsApp-enabled, must be provided for official communication, updates, and certificate delivery, where applicable.
5. 𝑹𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒕𝒊𝒐𝒏 𝑪𝒐𝒏𝒇𝒊𝒓𝒎𝒂𝒕𝒊𝒐𝒏: Registration will be confirmed only after successful payment verification through the official payment gateway or another payment method expressly authorized by AFSL.
6. 𝑨𝒖𝒕𝒉𝒐𝒓𝒊𝒛𝒆𝒅 𝑷𝒂𝒚𝒎𝒆𝒏𝒕𝒔: Applicants must make payments only through official payment channels specified by AFSL. Payments made through unauthorized links or third-party sources will not be recognized unless verified and expressly approved by AFSL.
7. 𝑹𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒕𝒊𝒐𝒏 𝑭𝒆𝒆𝒔: Applicants must check the applicable registration category, program details, and fee before making payment. Fees are non-transferable and generally non-refundable.
8. 𝑨𝒑𝒑𝒍𝒊𝒄𝒂𝒏𝒕 𝑹𝒆𝒔𝒑𝒐𝒏𝒔𝒊𝒃𝒊𝒍𝒊𝒕𝒚: Applicants are responsible for verifying their eligibility, availability, selected program, and registration category before submitting the form and completing payment.
9. 𝑪𝒉𝒂𝒏𝒈𝒆𝒔 𝑨𝒇𝒕𝒆𝒓 𝑺𝒖𝒃𝒎𝒊𝒔𝒔𝒊𝒐𝒏: Requests to modify registration details, change program categories, or transfer registration after submission will be considered only at AFSL’s discretion and subject to the applicable policy.
10. 𝑪𝒆𝒓𝒕𝒊𝒇𝒊𝒄𝒂𝒕𝒆 𝑰𝒔𝒔𝒖𝒂𝒏𝒄𝒆: Certificates, where applicable, will be issued based on the information provided in the registration form and will be subject to fulfillment of the relevant attendance, assessment, participation, or completion requirements. AFSL shall not be responsible for errors resulting from incorrect information submitted by applicants.
11. 𝑷𝒂𝒚𝒎𝒆𝒏𝒕 𝑹𝒆𝒄𝒐𝒓𝒅𝒔: Applicants should retain their payment receipt, transaction ID/UTR number, and registration confirmation for future reference.
12. 𝑷𝒂𝒚𝒎𝒆𝒏𝒕 𝒐𝒓 𝑻𝒆𝒄𝒉𝒏𝒊𝒄𝒂𝒍 𝑰𝒔𝒔𝒖𝒆𝒔: If a payment is deducted but registration is not confirmed, or if any technical issue occurs, applicants should contact official AFSL support with the relevant transaction details before attempting another payment or registration.
13. 𝑷𝒓𝒐𝒈𝒓𝒂𝒎 𝑪𝒉𝒂𝒏𝒈𝒆𝒔 𝒐𝒓 𝑪𝒂𝒏𝒄𝒆𝒍𝒍𝒂𝒕𝒊𝒐𝒏: AFSL reserves the right to reschedule, modify, or cancel a program due to administrative, technical, or unforeseen circumstances. Applicants will be informed through available official communication channels, and any applicable refund or alternative arrangement will be governed by the published Refund/Cancellation Policy.
14. 𝑪𝒐𝒏𝒔𝒆𝒏𝒕 𝒂𝒏𝒅 𝑨𝒄𝒌𝒏𝒐𝒘𝒍𝒆𝒅𝒈𝒆𝒎𝒆𝒏𝒕: By submitting the registration form, applicants acknowledge that they have reviewed and agreed to these Registration Instructions, Terms & Conditions, Privacy Policy, and Refund Policy.

I have read and agree to the Registration Instructions, Terms & Conditions, Privacy Policy, and Refund/Cancellation Policy of AFSL SERVICES INDIA LLP (AFSL).`

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
