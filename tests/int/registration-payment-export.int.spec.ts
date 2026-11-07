import ExcelJS from 'exceljs'
import { describe, expect, it } from 'vitest'
import { isRegistrationPaymentMethod, paymentModeForMethod } from '../../src/lib/registration/paymentMethods'
import { buildRegistrationsXlsx } from '../../src/lib/submissions/exportRegistrationsXlsx'

describe('registration payment methods', () => {
  it('maps selected apps to the payment categories used by registrations', () => {
    expect(paymentModeForMethod('google_pay')).toBe('upi')
    expect(paymentModeForMethod('bank_transfer')).toBe('bank')
    expect(paymentModeForMethod('paypal')).toBe('paypal')
    expect(isRegistrationPaymentMethod('phonepe')).toBe(true)
    expect(isRegistrationPaymentMethod('unknown')).toBe(false)
  })
})

describe('event registration Excel export', () => {
  it('includes registration details and a clickable payment proof reference', async () => {
    const bytes = await buildRegistrationsXlsx([
      {
        id: 25,
        fullName: 'Test Participant',
        eventTitle: 'Forensic Workshop',
        paymentMethod: 'phonepe',
        transactionProof: {
          filename: 'payment-proof.jpg',
          url: 'https://res.cloudinary.com/example/image/upload/proof.jpg',
        },
      },
    ])
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(Buffer.from(bytes))

    const worksheet = workbook.getWorksheet('Registrations')
    expect(worksheet).toBeDefined()
    const headers = worksheet!.getRow(1).values as string[]
    expect(headers).toContain('Payment Proof')
    const proofColumn = headers.indexOf('Payment Proof')
    const proofCell = worksheet!.getRow(2).getCell(proofColumn)

    expect(worksheet!.getRow(2).values).toContain('Test Participant')
    expect(worksheet!.getRow(2).values).toContain('phonepe')
    expect(proofCell.value).toMatchObject({
      text: 'payment-proof.jpg',
      hyperlink: 'https://res.cloudinary.com/example/image/upload/proof.jpg',
    })
  })
})
