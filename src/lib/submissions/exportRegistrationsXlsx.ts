import ExcelJS from 'exceljs'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function labelForField(field: string): string {
  if (field === 'id') return 'Registration ID'
  if (field === 'createdAt') return 'Registered At'
  return field
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (character) => character.toUpperCase())
}

function cellValue(value: unknown): ExcelJS.CellValue {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }
  if (value instanceof Date) return value
  return JSON.stringify(value)
}

function paymentProofValue(value: unknown): ExcelJS.CellValue {
  if (!isRecord(value)) return typeof value === 'number' ? `Media ID ${value}` : ''

  const url = value.url
  if (typeof url !== 'string' || !/^https:\/\//i.test(url)) {
    return typeof value.filename === 'string' ? value.filename : ''
  }

  return {
    text: typeof value.filename === 'string' ? value.filename : 'Open payment proof',
    hyperlink: url,
    tooltip: 'Open the uploaded payment proof',
  }
}

export async function buildRegistrationsXlsx(docs: unknown[]): Promise<Uint8Array> {
  const records = docs.map((doc) => {
    if (!isRecord(doc)) throw new TypeError('Registration export received an invalid document.')
    return doc
  })

  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'AFRS'
  workbook.created = new Date()

  const worksheet = workbook.addWorksheet('Registrations', {
    views: [{ state: 'frozen', ySplit: 1 }],
  })

  const fieldOrder = [
    'id',
    'createdAt',
    'fullName',
    'email',
    'countryCode',
    'mobileNumber',
    'organization',
    'designation',
    'eventTitle',
    'eventSlug',
    'registrationCategoryName',
    'registrationCategoryPrice',
    'currency',
    'participantRegion',
    'areaOfInterest',
    'includeKit',
    'kitPrice',
    'totalAmount',
    'paymentMode',
    'paymentMethod',
    'paymentStatus',
    'registrationStatus',
    'transactionId',
    'transactionDate',
    'transactionTime',
    'paymentReference',
    'agreedToTerms',
    'idProofFileName',
    'idProofFileSize',
    'customResponses',
  ]
  const discoveredFields = [...new Set(records.flatMap((doc) => Object.keys(doc)))]
  const fields = [
    ...fieldOrder,
    ...discoveredFields.filter(
      (field) =>
        !fieldOrder.includes(field) &&
        !['event', 'transactionProof', 'updatedAt', 'createdAt'].includes(field),
    ),
    'transactionProof',
  ]

  worksheet.columns = fields.map((field) => ({
    header: field === 'transactionProof' ? 'Payment Proof' : labelForField(field),
    key: field,
    width: field === 'customResponses' ? 42 : field === 'transactionProof' ? 30 : 20,
  }))

  for (const doc of records) {
    worksheet.addRow(
      fields.map((field) =>
        field === 'transactionProof' ? paymentProofValue(doc[field]) : cellValue(doc[field]),
      ),
    )
  }

  const header = worksheet.getRow(1)
  header.font = { bold: true, color: { argb: 'FFFFFFFF' } }
  header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3B010B' } }
  header.alignment = { vertical: 'middle' }
  worksheet.views = [{ state: 'frozen', ySplit: 1 }]

  return new Uint8Array(await workbook.xlsx.writeBuffer())
}
