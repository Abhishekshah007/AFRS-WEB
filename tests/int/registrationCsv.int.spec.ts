import { describe, expect, it } from 'vitest'
import {
  buildRegistrationsCsv,
  registrationExportColumnOptions,
  registrationProofFilename,
} from '@/lib/submissions/exportRegistrationsCsv'

describe('registration CSV export', () => {
  it('keeps registration id and proof filename in the CSV and only exports selected columns', () => {
    const csv = buildRegistrationsCsv(
      [
        {
          id: 42,
          fullName: 'Ada Forensic',
          email: 'ada@example.com',
          transactionProof: {
            id: 7,
            url: 'https://res.cloudinary.com/example/image/upload/proof.png',
            mimeType: 'image/png',
          },
        } as never,
      ],
      'eventRegistrations',
      ['fullName'],
    )

    expect(csv).toContain('Registration ID,Payment Proof File,Full Name')
    expect(csv).toContain('42,payment-proofs/42.png,Ada Forensic')
    expect(csv).not.toContain('Email')
  })

  it('uses a public proof URL for CSV-only exports when available', () => {
    const csv = buildRegistrationsCsv(
      [
        {
          id: 43,
          transactionProof: {
            id: 8,
            url: 'https://res.cloudinary.com/example/image/upload/receipt.jpg',
            mimeType: 'image/jpeg',
          },
        } as never,
      ],
      'courseRegistrations',
      [],
      'url',
    )

    expect(csv).toContain(
      '43,https://res.cloudinary.com/example/image/upload/receipt.jpg',
    )
  })

  it('marks missing proof files and can select the custom-answer group', () => {
    const csv = buildRegistrationsCsv(
      [{ id: 44, fullName: 'Sam' } as never],
      'eventRegistrations',
      ['customResponses'],
    )

    expect(csv).toContain('44,MISSING')
    expect(registrationExportColumnOptions('eventRegistrations')).toContainEqual({
      key: 'customResponses',
      label: 'Custom Form Answers',
    })
    expect(registrationProofFilename({ id: 44 } as never)).toBeUndefined()
  })
})
