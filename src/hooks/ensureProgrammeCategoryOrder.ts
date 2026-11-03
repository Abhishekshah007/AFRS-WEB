import type { CollectionBeforeValidateHook } from 'payload'

export const ensureProgrammeCategoryOrder: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (!data || operation !== 'create' || data.sortOrder != null || !data.kind) {
    return data
  }

  const lastCategory = await req.payload.find({
    collection: 'programmeCategories',
    where: { kind: { equals: data.kind } },
    limit: 1,
    depth: 0,
    sort: '-sortOrder',
    overrideAccess: true,
    req,
  })

  data.sortOrder = (lastCategory.docs[0]?.sortOrder ?? -1) + 1
  return data
}
