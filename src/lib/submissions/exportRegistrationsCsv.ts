import type { CourseRegistration, EventRegistration, Media } from '@/payload-types'

type RegistrationDoc = CourseRegistration | EventRegistration

const SKIP_FIELDS = new Set([
  'exportDocument',
  'transactionProof',
  'event',
  'password',
  'salt',
  'hash',
])

const BASE_COLUMNS: Array<{ key: string; label: string }> = [
  { key: 'createdAt', label: 'Registered At' },
  { key: 'fullName', label: 'Full Name' },
  { key: 'email', label: 'Email' },
  { key: 'countryCode', label: 'Country Code' },
  { key: 'mobileNumber', label: 'Mobile Number' },
  { key: 'organization', label: 'Organization' },
  { key: 'designation', label: 'Designation' },
  { key: 'feeTierLabel', label: 'Fee Category' },
  { key: 'feeTierCurrency', label: 'Currency' },
  { key: 'totalAmount', label: 'Total Amount' },
  { key: 'participantRegion', label: 'Participant Region' },
  { key: 'paymentMode', label: 'Payment Mode' },
  { key: 'paymentStatus', label: 'Payment Status' },
  { key: 'registrationStatus', label: 'Registration Status' },
  { key: 'transactionId', label: 'Transaction ID' },
  { key: 'transactionDate', label: 'Transaction Date' },
  { key: 'transactionTime', label: 'Transaction Time' },
  { key: 'paymentReference', label: 'Payment Reference' },
  { key: 'agreedToTerms', label: 'Agreed To Terms' },
]

const REGISTRATION_ID_COLUMN = { key: 'id', label: 'Registration ID' }
const PAYMENT_PROOF_COLUMN = { key: 'proofFile', label: 'Payment Proof File' }
const CUSTOM_RESPONSES_COLUMN = { key: 'customResponses', label: 'Custom Form Answers' }

const COURSE_COLUMNS: Array<{ key: string; label: string }> = [
  { key: 'programmeTitle', label: 'Programme Title' },
  { key: 'programmeType', label: 'Programme Type' },
  { key: 'categoryTitle', label: 'Category' },
  { key: 'categorySlug', label: 'Category Slug' },
  { key: 'programmeId', label: 'Programme ID' },
  { key: 'programmeDuration', label: 'Duration' },
  { key: 'programmeMode', label: 'Mode' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'experienceLevel', label: 'Experience Level' },
  { key: 'preferredBatch', label: 'Preferred Batch' },
  { key: 'message', label: 'Message' },
]

const EVENT_COLUMNS: Array<{ key: string; label: string }> = [
  { key: 'eventTitle', label: 'Event Title' },
  { key: 'eventSlug', label: 'Event Slug' },
  { key: 'registrationCategoryName', label: 'Registration Category' },
  { key: 'registrationCategoryPrice', label: 'Category Price' },
  { key: 'areaOfInterest', label: 'Area Of Interest' },
  { key: 'includeKit', label: 'Include Kit' },
  { key: 'kitPrice', label: 'Kit Price' },
  { key: 'idProofFileName', label: 'ID Proof File' },
]

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return ''
  const str = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`
  return str
}

function flattenCustomResponses(doc: RegistrationDoc): Record<string, string> {
  const raw = doc.customResponses
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}

  const flattened: Record<string, string> = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (value === null || value === undefined) continue
    flattened[`custom_${key}`] = String(value)
  }
  return flattened
}

function collectCustomColumns(docs: RegistrationDoc[]): string[] {
  const keys = new Set<string>()
  for (const doc of docs) {
    for (const key of Object.keys(flattenCustomResponses(doc))) {
      keys.add(key)
    }
  }
  return Array.from(keys).sort()
}

function getColumnValue(doc: RegistrationDoc, key: string): unknown {
  if (key.startsWith('custom_')) {
    return flattenCustomResponses(doc)[key] ?? ''
  }
  return (doc as unknown as Record<string, unknown>)[key]
}

export function registrationExportColumnOptions(
  collection: 'courseRegistrations' | 'eventRegistrations',
): Array<{ key: string; label: string }> {
  return [
    ...BASE_COLUMNS,
    ...(collection === 'courseRegistrations' ? COURSE_COLUMNS : EVENT_COLUMNS),
    CUSTOM_RESPONSES_COLUMN,
  ]
}

export function getRegistrationProofMedia(doc: RegistrationDoc): Media | undefined {
  const proof = doc.transactionProof
  return proof && typeof proof === 'object' && typeof proof.url === 'string' ? proof : undefined
}

export function registrationProofFilename(doc: RegistrationDoc): string | undefined {
  const media = getRegistrationProofMedia(doc)
  if (!media?.url) return undefined

  const url = new URL(media.url)
  const extensionFromUrl = url.pathname.match(/\.(jpe?g|png|webp|gif|pdf)$/i)?.[0]
  const extensionFromMime = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'application/pdf': '.pdf',
  }[media.mimeType || '']
  const extension = (extensionFromUrl || extensionFromMime || '.img').toLowerCase()
  return `payment-proofs/${doc.id}${extension}`
}

function registrationProofUrl(doc: RegistrationDoc): string | undefined {
  return getRegistrationProofMedia(doc)?.url || undefined
}

export function buildRegistrationsCsv(
  docs: RegistrationDoc[],
  collection: 'courseRegistrations' | 'eventRegistrations',
  selectedColumns: string[] = registrationExportColumnOptions(collection).map(({ key }) => key),
  proofMode: 'archive' | 'url' = 'archive',
): string {
  const allowedColumns = registrationExportColumnOptions(collection)
  const selected = new Set(selectedColumns)
  const columns = allowedColumns.filter(({ key }) => selected.has(key))
  const customColumns =
    selected.has(CUSTOM_RESPONSES_COLUMN.key) &&
    collectCustomColumns(docs).map((key) => ({
      key,
      label: key.replace(/^custom_/, 'Custom: '),
    }))
  const csvColumns = [
    REGISTRATION_ID_COLUMN,
    PAYMENT_PROOF_COLUMN,
    ...columns,
    ...(customColumns || []),
  ]

  const header = csvColumns.map((column) => csvCell(column.label)).join(',')
  const rows = docs.map((doc) =>
    csvColumns
      .map((column) => {
        if (column.key === PAYMENT_PROOF_COLUMN.key) {
          const proof = proofMode === 'url' ? registrationProofUrl(doc) : registrationProofFilename(doc)
          return csvCell(proof || 'MISSING')
        }
        return csvCell(getColumnValue(doc, column.key))
      })
      .join(','),
  )

  return `\uFEFF${[header, ...rows].join('\r\n')}`
}

export function registrationCsvFilename(
  collection: 'courseRegistrations' | 'eventRegistrations',
  filterLabel?: string | null,
): string {
  const prefix =
    collection === 'courseRegistrations' ? 'course-registrations' : 'event-registrations'
  const slug = (filterLabel || 'all')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  const date = new Date().toISOString().slice(0, 10)
  return `${prefix}-${slug || 'all'}-${date}`
}

export function registrationExportSkipFields(): Set<string> {
  return SKIP_FIELDS
}
