import type { RegistrationPaymentConfig } from '@/domain/registration/types'
import { getPayloadClient } from '@/lib/payload'
import type { RegistrationForm } from '@/payload-types'

export async function getRegistrationPaymentConfig(): Promise<RegistrationPaymentConfig> {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({
      slug: 'registrationForm',
      depth: 1,
      overrideAccess: false,
    })) as RegistrationForm

    return {
      formTitle: global.formTitle,
      formSubtitle: global.formSubtitle,
      paymentInstructions: global.paymentInstructions,
      paymentMethods: global.paymentMethods,
    }
  } catch (error) {
    console.error('[getRegistrationPaymentConfig]', error)
    return {}
  }
}
