import { describe, expect, it } from 'vitest'
import type { RegistrationForm } from '@/payload-types'
import {
  categoriesToFeeTiers,
  feeTiersForRegion,
  resolveRegistrationConfig,
} from '@/lib/registration/resolveConfig'
import { DEFAULT_AFSL_REGISTRATION_INSTRUCTIONS } from '@/lib/registration/defaults'

describe('event registration fee categories', () => {
  it('keeps Indian and international categories in their own participant groups', () => {
    const tiers = categoriesToFeeTiers(
      [{ id: 'indian-student', categoryName: 'Students', price: 300, currency: 'INR' }],
      [{ id: 'international-student', categoryName: 'Students', price: 10, currency: 'USD' }],
    )

    expect(feeTiersForRegion(tiers, 'indian').map((tier) => tier.id)).toEqual(['indian-student'])
    expect(feeTiersForRegion(tiers, 'international').map((tier) => tier.id)).toEqual([
      'international-student',
    ])
  })

  it('allows events to omit international categories', () => {
    const tiers = categoriesToFeeTiers([
      { id: 'indian-student', categoryName: 'Students', price: 300, currency: 'INR' },
    ])

    expect(feeTiersForRegion(tiers, 'indian')).toHaveLength(1)
    expect(feeTiersForRegion(tiers, 'international')).toEqual([])
  })

  it('uses the payment method for the selected organization', () => {
    const globalForm = {
      paymentMethods: [
        { title: 'AFRS UPI', organization: 'afrs', qrCode: 10, region: 'indian' },
        { title: 'AFSL UPI', organization: 'afsl', qrCode: 20, region: 'indian' },
      ],
    } as RegistrationForm

    const afrsConfig = resolveRegistrationConfig({ globalForm, organization: 'afrs' })
    const afslConfig = resolveRegistrationConfig({ globalForm, organization: 'afsl' })

    expect(afrsConfig.payment.paymentMethods?.map((method) => method.title)).toEqual(['AFRS UPI'])
    expect(afslConfig.payment.paymentMethods?.map((method) => method.title)).toEqual(['AFSL UPI'])
    expect(afslConfig.payment.paymentInstructions?.upiId).toBe('afsl.llp09@kotak')
  })

  it('resolves registration instructions and consent organization separately for AFRS and AFSL', () => {
    const globalForm = {
      defaultInstructions: 'AFRS instructions',
      defaultInstructionsAFSL: 'AFSL instructions',
    } as RegistrationForm

    const afrsConfig = resolveRegistrationConfig({ globalForm, organization: 'afrs' })
    const afslConfig = resolveRegistrationConfig({ globalForm, organization: 'afsl' })

    expect(afrsConfig.instructions).toBe('AFRS instructions')
    expect(afrsConfig.organization).toBe('afrs')
    expect(afslConfig.instructions).toBe('AFSL instructions')
    expect(afslConfig.organization).toBe('afsl')
  })

  it('uses the AFSL default when no AFSL instructions have been saved yet', () => {
    const config = resolveRegistrationConfig({
      globalForm: { defaultInstructions: 'AFRS instructions' } as RegistrationForm,
      organization: 'afsl',
    })

    expect(config.instructions).toBe(DEFAULT_AFSL_REGISTRATION_INSTRUCTIONS)
  })

  it('uses the supplied AFSL QR and payment text for an item-level override', () => {
    const config = resolveRegistrationConfig({
      organization: 'afsl',
      settings: {
        useGlobalPaymentDetails: false,
        paymentQrCode: 42,
        paymentInstructions: { accountName: 'Custom AFSL account' },
      },
    })

    expect(config.payment.paymentInstructions?.accountName).toBe('Custom AFSL account')
    expect(config.payment.paymentInstructions?.upiId).toBe('afsl.llp09@kotak')
    expect(config.payment.paymentMethods).toEqual([
      {
        title: 'AFSL Services India LLP',
        qrCode: 42,
        region: 'indian',
        organization: 'afsl',
      },
    ])
  })

  it('keeps untagged legacy payment methods available to AFRS only', () => {
    const globalForm = {
      paymentMethods: [{ title: 'Existing UPI', qrCode: 10, region: 'indian' }],
    } as RegistrationForm

    expect(
      resolveRegistrationConfig({ globalForm, organization: 'afrs' }).payment.paymentMethods,
    ).toHaveLength(1)
    expect(
      resolveRegistrationConfig({ globalForm, organization: 'afsl' }).payment.paymentMethods?.[0]
        ?.qrCode,
    ).toBe('/assets/afsl-payment-qr.jpg')
  })
})
