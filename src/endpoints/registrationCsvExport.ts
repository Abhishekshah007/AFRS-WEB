import type { Endpoint, Payload, User, Where } from 'payload'
import { APIError } from 'payload'

import {
  buildRegistrationsCsv,
  registrationCsvFilename,
} from '@/lib/submissions/exportRegistrationsCsv'

type RegistrationCollection = 'courseRegistrations' | 'eventRegistrations'

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
      depth: 0,
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

export function registrationCsvExportEndpoint(collection: RegistrationCollection): Endpoint {
  return {
    path: '/export-csv',
    method: 'get',
    handler: async (req) => {
      assertExportAccess(req.user)

      const url = new URL(req.url || 'http://localhost', 'http://localhost')
      const where = buildWhere(url, collection)
      const docs = await fetchAllRegistrations({
        payload: req.payload,
        collection,
        where,
        user: req.user as User,
      })

      const csv = buildRegistrationsCsv(docs, collection)
      const filterLabel =
        collection === 'courseRegistrations'
          ? readParam(url, 'programmeTitle') || readParam(url, 'programmeId')
          : readParam(url, 'eventTitle') || readParam(url, 'eventSlug')

      const filename = registrationCsvFilename(collection, filterLabel)

      return new Response(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'no-store',
        },
      })
    },
  }
}
