import type {
  FeeTier,
  ParticipantRegion,
  PaymentInstructionsConfig,
  PaymentMethodConfig,
  RegistrationPaymentConfig,
  RegistrationSettingsSource,
  RegistrationType,
  ResolvedRegistrationConfig,
} from '@/domain/registration/types'
import {
  DEFAULT_FEE_TIERS,
  DEFAULT_REGISTRATION_INSTRUCTIONS,
  DEFAULT_REGISTRATION_SETTINGS,
} from '@/lib/registration/defaults'
import type { RegistrationForm } from '@/payload-types'

function normalizeTier(
  tier: NonNullable<RegistrationSettingsSource['feeTiers']>[number],
  index: number,
): FeeTier | null {
  const label = tier.label?.trim()
  if (!label) return null
  const currency = tier.currency === 'USD' ? 'USD' : 'INR'
  return {
    id: tier.id?.trim() || `${label.toLowerCase().replace(/\s+/g, '-')}-${currency}-${index}`,
    label,
    amount: Number(tier.amount ?? 0),
    currency,
    description: tier.description,
  }
}

export function feeTiersForRegion(tiers: FeeTier[], region: ParticipantRegion): FeeTier[] {
  if (region === 'both') return tiers
  const currency = region === 'international' ? 'USD' : 'INR'
  const filtered = tiers.filter((tier) => tier.currency === currency)
  return filtered.length ? filtered : tiers
}

export function inferRegistrationType(
  settings: RegistrationSettingsSource | null | undefined,
  feeTiers: FeeTier[],
): RegistrationType {
  if (settings?.registrationType) return settings.registrationType
  const maxAmount = feeTiers.reduce((max, tier) => Math.max(max, tier.amount), 0)
  return maxAmount > 0 ? 'paid_manual' : 'free'
}

function mergePaymentConfig(
  globalForm: RegistrationForm | null | undefined,
  settings: RegistrationSettingsSource | null | undefined,
): RegistrationPaymentConfig {
  const useGlobal = settings?.useGlobalPaymentDetails !== false

  const globalInstructions = globalForm?.paymentInstructions
  const globalMethods = globalForm?.paymentMethods

  const instructions: PaymentInstructionsConfig | undefined = useGlobal
    ? globalInstructions
      ? {
          title: globalInstructions.title,
          accountName: globalInstructions.accountName,
          accountNumber: globalInstructions.accountNumber,
          ifsc: globalInstructions.ifsc,
          swift: globalInstructions.swift,
          branchAddress: globalInstructions.branchAddress,
          upiId: globalInstructions.upiId,
          paypalLink: globalInstructions.paypalLink,
          note: globalInstructions.note,
        }
      : undefined
    : settings?.paymentInstructions
      ? {
          title: settings.paymentInstructions.title,
          accountName: settings.paymentInstructions.accountName,
          accountNumber: settings.paymentInstructions.accountNumber,
          ifsc: settings.paymentInstructions.ifsc,
          swift: settings.paymentInstructions.swift,
          branchAddress: settings.paymentInstructions.branchAddress,
          upiId: settings.paymentInstructions.upiId,
          paypalLink: settings.paymentInstructions.paypalLink,
          note: settings.paymentInstructions.note,
        }
      : undefined

  const methods: PaymentMethodConfig[] | undefined = useGlobal
    ? globalMethods?.map((method) => ({
        title: method.title,
        description: method.description,
        qrCode: method.qrCode,
        link: method.link,
        region: method.region as PaymentMethodConfig['region'],
      }))
    : undefined

  return {
    formTitle: globalForm?.formTitle,
    formSubtitle: globalForm?.formSubtitle,
    paymentInstructions: instructions,
    paymentMethods: methods,
  }
}

export function resolveRegistrationConfig({
  settings,
  globalForm,
  feeTiersOverride,
}: {
  settings?: RegistrationSettingsSource | null
  globalForm?: RegistrationForm | null
  feeTiersOverride?: FeeTier[]
}): ResolvedRegistrationConfig {
  const merged: RegistrationSettingsSource = {
    ...DEFAULT_REGISTRATION_SETTINGS,
    ...settings,
  }

  const globalTiers =
    globalForm?.defaultFeeTiers?.map((tier, index) => normalizeTier(tier, index)).filter(Boolean) ||
    []
  const itemTiers =
    merged.feeTiers?.map((tier, index) => normalizeTier(tier, index)).filter(Boolean) || []

  const feeTiers = feeTiersOverride?.length
    ? feeTiersOverride
    : itemTiers.length
      ? (itemTiers as FeeTier[])
      : globalTiers.length
        ? (globalTiers as FeeTier[])
        : DEFAULT_FEE_TIERS

  const registrationType = inferRegistrationType(merged, feeTiers)

  const useGlobalInstructions = merged.useGlobalInstructions !== false
  const instructions = useGlobalInstructions
    ? globalForm?.defaultInstructions?.trim() || DEFAULT_REGISTRATION_INSTRUCTIONS
    : merged.instructions?.trim() ||
      globalForm?.defaultInstructions?.trim() ||
      DEFAULT_REGISTRATION_INSTRUCTIONS

  const requireAgreement =
    merged.requireAgreement ??
    globalForm?.requireAgreement ??
    DEFAULT_REGISTRATION_SETTINGS.requireAgreement ??
    true

  const requirePaymentProof =
    registrationType === 'free'
      ? false
      : (merged.requirePaymentProof ?? DEFAULT_REGISTRATION_SETTINGS.requirePaymentProof ?? true)

  return {
    registrationType,
    participantRegion: merged.participantRegion || 'both',
    feeTiers,
    requirePaymentProof,
    requireAgreement: Boolean(requireAgreement),
    instructions,
    payment: mergePaymentConfig(globalForm, merged),
  }
}

export function categoriesToFeeTiers(
  categories: Array<{
    id?: string | number | null
    categoryName?: string | null
    price?: number | null
    description?: string | null
    currency?: 'INR' | 'USD' | null
  }>,
): FeeTier[] {
  const tiers: FeeTier[] = []

  categories.forEach((cat, index) => {
    const label = cat.categoryName?.trim()
    if (!label) return
    const currency: 'INR' | 'USD' = cat.currency === 'USD' ? 'USD' : 'INR'
    tiers.push({
      id: String(cat.id ?? `category-${index}`),
      label,
      amount: Number(cat.price ?? 0),
      currency,
      description: cat.description,
    })
  })

  return tiers
}

export function formatFeeAmount(amount: number, currency: 'INR' | 'USD'): string {
  if (currency === 'USD') return `$${amount.toLocaleString('en-US')}`
  return `₹${amount.toLocaleString('en-IN')}`
}

export function filterPaymentMethodsByRegion(
  methods: PaymentMethodConfig[] | null | undefined,
  region: 'indian' | 'international',
): PaymentMethodConfig[] {
  if (!methods?.length) return []
  return methods.filter((method) => {
    const methodRegion = method.region || 'all'
    return methodRegion === 'all' || methodRegion === region
  })
}
