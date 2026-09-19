import type { CourseRegistration, EventRegistration } from '@/payload-types'

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
  { key: 'id', label: 'Registration ID' },
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

export function buildRegistrationsCsv(
  docs: RegistrationDoc[],
  collection: 'courseRegistrations' | 'eventRegistrations',
): string {
  const specificColumns = collection === 'courseRegistrations' ? COURSE_COLUMNS : EVENT_COLUMNS
  const customColumns = collectCustomColumns(docs).map((key) => ({
    key,
    label: key.replace(/^custom_/, 'Custom: '),
  }))
  const columns = [...BASE_COLUMNS, ...specificColumns, ...customColumns]

  const header = columns.map((column) => csvCell(column.label)).join(',')
  const rows = docs.map((doc) =>
    columns.map((column) => csvCell(getColumnValue(doc, column.key))).join(','),
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
  return `${prefix}-${slug || 'all'}-${date}.csv`
}

export function registrationExportSkipFields(): Set<string> {
  return SKIP_FIELDS
}
