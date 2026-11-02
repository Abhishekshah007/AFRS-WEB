import { describe, expect, it } from 'vitest'

import { defaultEducationCategories } from '@/data/defaults/programmes/catalog'
import { programmeList } from '@/data/defaults/programmes/lists'

describe('programme catalog defaults', () => {
  it('adds the default AFRS organization and registration settings to each programme item', () => {
    const programmes = programmeList('ot', ['FS-101: Sample Course'], '1 month', 'Online')

    expect(programmes[0]).toMatchObject({
      id: 'ot-1',
      organization: 'afrs',
      registration: {
        registrationType: 'paid_manual',
        participantRegion: 'both',
        requirePaymentProof: true,
        useGlobalPaymentDetails: true,
        useGlobalInstructions: true,
        requireAgreement: true,
      },
    })
  })

  it('keeps default categories compatible with the programmes catalog schema', () => {
    const firstProgrammes = defaultEducationCategories[0].programmes

    expect(firstProgrammes[0]).toMatchObject({
      organization: 'afrs',
      registration: {
        registrationType: 'paid_manual',
      },
    })
  })
})
