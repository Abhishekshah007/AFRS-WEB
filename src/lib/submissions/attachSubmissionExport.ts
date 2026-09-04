import type { CollectionSlug, PayloadRequest } from 'payload'
import { flattenDocForEmail, sendSubmissionNotification } from '@/lib/email/sendSubmissionNotification'
import { buildSubmissionDocx, slugifyExportName } from '@/lib/submissions/generateSubmissionDocx'
import type { SubmissionFormType } from '@/fields/submissionExport'

type ExportLine = { label: string; value?: string | number | boolean | null }

const SKIP_CONTEXT = 'skipSubmissionDocx'

function linesFromRecord(record: Record<string, unknown>, extra: ExportLine[] = []): ExportLine[] {
  const skip = new Set([
    'id',
    'createdAt',
    'updatedAt',
    'exportDocument',
    'description',
    'password',
    'salt',
    'hash',
    'loginAttempts',
    'lockUntil',
  ])

  const lines: ExportLine[] = [...extra]

  for (const [key, value] of Object.entries(record)) {
    if (skip.has(key)) continue
    if (value === null || value === undefined || value === '') continue

    if (key === 'customResponses' && typeof value === 'object' && !Array.isArray(value)) {
      for (const [customKey, customValue] of Object.entries(value as Record<string, unknown>)) {
        if (customValue == null || customValue === '') continue
        lines.push({ label: customKey, value: String(customValue) })
      }
      continue
    }

    if (typeof value === 'object') continue

    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (c) => c.toUpperCase())
      .trim()

    lines.push({ label, value: value as string | number | boolean })
  }

  return lines
}

const formTypeTitles: Record<SubmissionFormType, string> = {
  contact: 'General Contact Submission',
  labInquiry: 'AFSL Lab Inquiry Submission',
  serviceConsult: 'Service Consultation Request',
  legalConsultancy: 'Legal Consultancy Request',
}

const contactEmailKind: Record<SubmissionFormType, Parameters<typeof sendSubmissionNotification>[0]['kind']> = {
  contact: 'contact',
  labInquiry: 'labInquiry',
  serviceConsult: 'serviceConsult',
  legalConsultancy: 'legalConsultancy',
}

export async function attachSubmissionExport({
  req,
  collection,
  doc,
  title,
  extraLines = [],
  replaceExisting = false,
}: {
  req: PayloadRequest
  collection: CollectionSlug
  doc: Record<string, unknown> & { id: string | number }
  title: string
  extraLines?: ExportLine[]
  replaceExisting?: boolean
}): Promise<void> {
  if (!req?.payload) return
  if (doc.exportDocument && !replaceExisting) return

  const buffer = await buildSubmissionDocx(title, linesFromRecord(doc, extraLines))
  const slug = slugifyExportName(title)
  const fileName = `${slug}-${doc.id}-${Date.now()}.docx`

  const media = await req.payload.create({
    collection: 'media',
    data: {
      alt: `${title} export`,
    },
    file: {
      data: buffer,
      mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      name: fileName,
      size: buffer.length,
    },
    req,
    overrideAccess: true,
  })

  await req.payload.update({
    collection,
    id: doc.id,
    data: {
      exportDocument: media.id,
    },
    context: { [SKIP_CONTEXT]: true },
    req,
    overrideAccess: true,
  })
}

async function notifyByEmail({
  kind,
  title,
  doc,
}: {
  kind: Parameters<typeof sendSubmissionNotification>[0]['kind']
  title: string
  doc: Record<string, unknown>
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  await sendSubmissionNotification({
    kind,
    title,
    rows: flattenDocForEmail(doc),
    adminUrl: `${siteUrl}/admin`,
  })
}

export function contactExportTitle(formType?: string | null, subject?: string | null): string {
  if (formType && formType in formTypeTitles) {
    return formTypeTitles[formType as SubmissionFormType]
  }
  return subject ? `Contact — ${subject}` : 'Contact Submission'
}

export function shouldSkipSubmissionExport(context?: Record<string, unknown>): boolean {
  return Boolean(context?.[SKIP_CONTEXT])
}

export function contactSubmissionExportHook() {
  return async ({
    doc,
    req,
    operation,
    context,
  }: {
    doc: Record<string, unknown> & { id: string | number }
    req: PayloadRequest
    operation: 'create' | 'update'
    context?: Record<string, unknown>
  }) => {
    if (shouldSkipSubmissionExport(context)) return
    if (operation !== 'create') return

    const formType = (typeof doc.formType === 'string' ? doc.formType : 'contact') as SubmissionFormType
    const subject = typeof doc.subject === 'string' ? doc.subject : undefined
    const title = contactExportTitle(formType, subject)

    await attachSubmissionExport({
      req,
      collection: 'contactMessages',
      doc,
      title,
      extraLines: [{ label: 'Form Type', value: formType }],
    })

    await notifyByEmail({
      kind: contactEmailKind[formType] || 'contact',
      title: typeof doc.fullName === 'string' ? doc.fullName : title,
      doc,
    })
  }
}

export function registrationSubmissionExportHook(collection: 'courseRegistrations' | 'eventRegistrations') {
  return async ({
    doc,
    req,
    operation,
    previousDoc,
    context,
  }: {
    doc: Record<string, unknown> & { id: string | number }
    req: PayloadRequest
    operation: 'create' | 'update'
    previousDoc?: Record<string, unknown>
    context?: Record<string, unknown>
  }) => {
    if (shouldSkipSubmissionExport(context)) return

    const created = operation === 'create'
    const statusChanged =
      operation === 'update' && doc.registrationStatus !== previousDoc?.registrationStatus
    const proofAdded =
      operation === 'update' &&
      Boolean(doc.transactionProof) &&
      !previousDoc?.transactionProof

    if (!created && !statusChanged && !proofAdded) return

    const title =
      collection === 'courseRegistrations'
        ? `Course Registration — ${String(doc.programmeTitle || 'Programme')}`
        : `Event Registration — ${String(doc.eventTitle || 'Event')}`

    await attachSubmissionExport({
      req,
      collection,
      doc,
      title,
      extraLines: [{ label: 'Export Version', value: created ? 'Initial' : 'Updated' }],
      replaceExisting: !created,
    })

    if (created || proofAdded) {
      await notifyByEmail({
        kind: collection === 'courseRegistrations' ? 'courseRegistration' : 'eventRegistration',
        title:
          collection === 'courseRegistrations'
            ? String(doc.programmeTitle || doc.fullName || 'Course')
            : String(doc.eventTitle || doc.fullName || 'Event'),
        doc,
      })
    }
  }
}
