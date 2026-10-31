import type { Endpoint, Payload, User, Where } from 'payload'
import { APIError } from 'payload'
import JSZip from 'jszip'

import {
  buildRegistrationsCsv,
  getRegistrationProofMedia,
  registrationExportColumnOptions,
  registrationCsvFilename,
  registrationProofFilename,
} from '@/lib/submissions/exportRegistrationsCsv'

type RegistrationCollection = 'courseRegistrations' | 'eventRegistrations'
const MAX_PROOF_FILE_BYTES = 15 * 1024 * 1024
const MAX_ARCHIVE_PROOF_BYTES = 200 * 1024 * 1024
const PROOF_FETCH_BATCH_SIZE = 5

const ALLOWED_ROLES = new Set(['superAdmin', 'eventManager'])

function assertExportAccess(user: unknown): void {
  if (!user) throw new APIError('Unauthorized', 401)
  const role = (user as { role?: string }).role
  if (!role || !ALLOWED_ROLES.has(role)) throw new APIError('Forbidden', 403)
}

function readParam(url: URL, key: string): string | undefined {
  const value = url.searchParams.get(key)?.trim()
  return value || undefined
}

function buildWhere(url: URL, collection: RegistrationCollection): Where {
  const and: Where[] = []

  if (collection === 'courseRegistrations') {
    const programmeTitle = readParam(url, 'programmeTitle')
    const programmeId = readParam(url, 'programmeId')
    const categorySlug = readParam(url, 'categorySlug')

    if (programmeTitle) and.push({ programmeTitle: { contains: programmeTitle } })
    if (programmeId) and.push({ programmeId: { equals: programmeId } })
    if (categorySlug) and.push({ categorySlug: { equals: categorySlug } })
  } else {
    const eventTitle = readParam(url, 'eventTitle')
    const eventSlug = readParam(url, 'eventSlug')

    if (eventTitle) and.push({ eventTitle: { contains: eventTitle } })
    if (eventSlug) and.push({ eventSlug: { equals: eventSlug } })
  }

  const paymentStatus = readParam(url, 'paymentStatus')
  const registrationStatus = readParam(url, 'registrationStatus')

  if (paymentStatus) and.push({ paymentStatus: { equals: paymentStatus } })
  if (registrationStatus) and.push({ registrationStatus: { equals: registrationStatus } })

  return and.length ? { and } : {}
}

async function fetchAllRegistrations({
  payload,
  collection,
  where,
  user,
}: {
  payload: Payload
  collection: RegistrationCollection
  where: Where
  user: User
}) {
  const docs = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection,
      where,
      limit: 250,
      page,
      depth: 1,
      sort: 'createdAt',
      user,
      overrideAccess: false,
    })

    docs.push(...result.docs)
    if (!result.hasNextPage) break
    page += 1
  }

  return docs
}

function selectedExportColumns(url: URL, collection: RegistrationCollection): string[] {
  const requested = url.searchParams.get('columns')
  const allowed = registrationExportColumnOptions(collection).map(({ key }) => key)
  if (requested === null) return allowed

  const selected = [...new Set(requested.split(',').filter(Boolean))]
  if (selected.some((key) => !allowed.includes(key))) {
    throw new APIError('Export includes an invalid column selection.', 400)
  }
  return selected
}

async function buildRegistrationArchive(
  docs: Awaited<ReturnType<typeof fetchAllRegistrations>>,
  collection: RegistrationCollection,
  selectedColumns: string[],
  filename: string,
): Promise<Uint8Array> {
  const zip = new JSZip()
  zip.file(`${filename}.csv`, buildRegistrationsCsv(docs, collection, selectedColumns))
  const proofs = docs.flatMap((doc) => {
    const media = getRegistrationProofMedia(doc)
    const proofFilename = registrationProofFilename(doc)
    return media?.url && proofFilename ? [{ media, proofFilename, registrationId: doc.id }] : []
  })

  let totalBytes = 0
  for (let offset = 0; offset < proofs.length; offset += PROOF_FETCH_BATCH_SIZE) {
    const batch = proofs.slice(offset, offset + PROOF_FETCH_BATCH_SIZE)
    const files = await Promise.all(
      batch.map(async ({ media, proofFilename, registrationId }) => {
        const proofUrl = new URL(media.url!)
        if (proofUrl.protocol !== 'https:' || proofUrl.hostname !== 'res.cloudinary.com') {
          throw new APIError('A payment-proof file has an unsupported storage URL.', 502)
        }

        const response = await fetch(proofUrl, {
          signal: AbortSignal.timeout(20_000),
          redirect: 'error',
        })
        if (!response.ok) {
          throw new APIError(
            `Unable to download payment proof for registration ${registrationId}.`,
            502,
          )
        }

        const contentType = response.headers.get('content-type') || ''
        if (!contentType.startsWith('image/')) {
          throw new APIError('A payment-proof file is not an image.', 502)
        }

        const declaredSize = Number(response.headers.get('content-length') || 0)
        if (declaredSize > MAX_PROOF_FILE_BYTES) {
          throw new APIError('A payment-proof image is larger than the 15 MB export limit.', 413)
        }

        const bytes = new Uint8Array(await response.arrayBuffer())
        if (bytes.byteLength > MAX_PROOF_FILE_BYTES) {
          throw new APIError('A payment-proof image is larger than the 15 MB export limit.', 413)
        }
        totalBytes += bytes.byteLength
        if (totalBytes > MAX_ARCHIVE_PROOF_BYTES) {
          throw new APIError('The selected proof images exceed the 200 MB archive limit.', 413)
        }

        return { proofFilename, bytes }
      }),
    )
    files.forEach(({ proofFilename, bytes }) => zip.file(proofFilename, bytes))
  }

  return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' })
}

export function registrationCsvExportEndpoint(collection: RegistrationCollection): Endpoint {
  return {
    path: '/export-csv',
    method: 'get',
    handler: async (req) => {
      assertExportAccess(req.user)

      const url = new URL(req.url || 'http://localhost', 'http://localhost')
      const where = buildWhere(url, collection)
      const selectedColumns = selectedExportColumns(url, collection)
      const docs = await fetchAllRegistrations({
        payload: req.payload,
        collection,
        where,
        user: req.user as User,
      })

      const filterLabel =
        collection === 'courseRegistrations'
          ? readParam(url, 'programmeTitle') || readParam(url, 'programmeId')
          : readParam(url, 'eventTitle') || readParam(url, 'eventSlug')

      const filename = registrationCsvFilename(collection, filterLabel)
      const format = readParam(url, 'format') || 'csv'

      if (format === 'csv') {
        const csv = buildRegistrationsCsv(docs, collection, selectedColumns, 'url')
        return new Response(csv, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${filename}.csv"`,
            'Cache-Control': 'no-store',
          },
        })
      }
      if (format !== 'zip') throw new APIError('Unsupported export format.', 400)

      const archive = await buildRegistrationArchive(docs, collection, selectedColumns, filename)
      return new Response(archive, {
        status: 200,
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${filename}.zip"`,
          'Cache-Control': 'no-store',
        },
      })
    },
  }
}
