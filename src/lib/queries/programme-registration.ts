import type { RegistrationSettingsSource } from '@/domain/registration/types'
import { getPayloadClient } from '@/lib/payload'
import type { ProgrammesCatalog, RegistrationForm } from '@/payload-types'

type ProgrammeMatch = {
  programmeId: string
  categorySlug: string
  categoryTitle: string
  programmeTitle: string
  registrationSettings?: RegistrationSettingsSource | null
}

function mapRegistrationSettings(
  raw: Record<string, unknown> | null | undefined,
): RegistrationSettingsSource | null {
  if (!raw || typeof raw !== 'object') return null
  return raw as RegistrationSettingsSource
}

function findInCategories(catalog: ProgrammesCatalog, programmeId: string): ProgrammeMatch | null {
  const buckets: Array<{
    categories: ProgrammesCatalog['educationCategories']
    type: 'education' | 'training'
  }> = [
    { categories: catalog.educationCategories, type: 'education' },
    { categories: catalog.trainingCategories, type: 'training' },
  ]

  for (const bucket of buckets) {
    for (const category of bucket.categories || []) {
      const programme = category.programmes?.find((item) => item.id === programmeId)
      if (!programme) continue
      return {
        programmeId: programme.id,
        categorySlug: category.slug,
        categoryTitle: category.title,
        programmeTitle: programme.title,
        registrationSettings: mapRegistrationSettings(
          programme.registration as Record<string, unknown> | undefined,
        ),
      }
    }
  }

  return null
}

export async function findProgrammeRegistrationContext(programmeId?: string | null) {
  if (!programmeId) return null

  const payload = await getPayloadClient()
  const [catalog, registrationForm] = await Promise.all([
    payload.findGlobal({
      slug: 'programmesCatalog',
      depth: 1,
      overrideAccess: false,
    }) as Promise<ProgrammesCatalog>,
    payload.findGlobal({
      slug: 'registrationForm',
      depth: 1,
      overrideAccess: false,
    }) as Promise<RegistrationForm>,
  ])

  const match = findInCategories(catalog, programmeId)
  return { match, registrationForm }
}
