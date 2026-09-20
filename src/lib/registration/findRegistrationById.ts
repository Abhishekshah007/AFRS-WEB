import { logCmsError } from '@/lib/resilience/logger'
import { getPayloadClient } from '@/lib/payload'
import type { CollectionSlug } from 'payload'

/** Payload Postgres IDs are numbers; URL params are strings. */
export function parseDocumentId(raw: string): number | string {
  const trimmed = raw.trim()
  if (/^\d+$/.test(trimmed)) return Number(trimmed)
  return trimmed
}

export async function findRegistrationById<T>(
  collection: Extract<CollectionSlug, 'eventRegistrations' | 'courseRegistrations'>,
  rawId: string,
): Promise<T | null> {
  const payload = await getPayloadClient()
  const id = parseDocumentId(rawId)

  try {
    return (await payload.findByID({
      collection,
      id,
      depth: 0,
      overrideAccess: true,
    })) as T
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (message !== 'Not Found') {
      logCmsError('findRegistrationById', error, { collection, rawId, id })
    }
  }

  try {
    const result = await payload.find({
      collection,
      where: { id: { equals: id } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    return (result.docs[0] as T | undefined) ?? null
  } catch (error) {
    logCmsError('findRegistrationById.fallback', error, { collection, rawId, id })
    return null
  }
}
