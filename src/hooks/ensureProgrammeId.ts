import type { CollectionBeforeValidateHook } from 'payload'

import { slugify } from '@/lib/utils/slugify'

export const ensureProgrammeId: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (!data || operation !== 'create') return data

  if (data.sortOrder == null) {
    const categoryId =
      typeof data.category === 'object' && data.category !== null ? data.category.id : data.category

    if (typeof categoryId === 'number') {
      const lastProgramme = await req.payload.find({
        collection: 'programmes',
        where: { category: { equals: categoryId } },
        limit: 1,
        depth: 0,
        sort: '-sortOrder',
        overrideAccess: true,
        req,
      })
      data.sortOrder = (lastProgramme.docs[0]?.sortOrder ?? -1) + 1
    }
  }

  if (String(data.programmeId ?? '').trim()) return data

  const title = String(data.title ?? '').trim()
  if (!title) return data

  const baseId = slugify(title) || `programme-${Date.now().toString(36)}`

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const programmeId = attempt === 0 ? baseId : `${baseId}-${attempt + 1}`
    const existing = await req.payload.find({
      collection: 'programmes',
      where: { programmeId: { equals: programmeId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
      req,
    })

    if (existing.docs.length === 0) {
      data.programmeId = programmeId
      return data
    }
  }

  throw new Error(`Unable to generate a unique programme ID for "${title}".`)
}
