import type { RegistrationSettingsSource } from '@/domain/registration/types'
import { getPayloadClient } from '@/lib/payload'
import type { ProgrammeCategory, RegistrationForm } from '@/payload-types'

type ProgrammeMatch = {
  programmeId: string
  categorySlug: string
  categoryTitle: string
  programmeTitle: string
  organization?: 'afrs' | 'afsl' | null
  registrationSettings?: RegistrationSettingsSource | null
}

function mapRegistrationSettings(
  raw: Record<string, unknown> | null | undefined,
): RegistrationSettingsSource | null {
  if (!raw || typeof raw !== 'object') return null
  return raw as RegistrationSettingsSource
}

export async function findProgrammeRegistrationContext(programmeId?: string | null) {
  if (!programmeId) return null

  const payload = await getPayloadClient()
  const [programmeResult, registrationForm] = await Promise.all([
    payload.find({
      collection: 'programmes',
      where: { programmeId: { equals: programmeId } },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    }),
    payload.findGlobal({
      slug: 'registrationForm',
      depth: 1,
      overrideAccess: false,
    }) as Promise<RegistrationForm>,
  ])

  const programme = programmeResult.docs[0]
  const category = programme?.category as ProgrammeCategory | undefined
  const match: ProgrammeMatch | null =
    programme && category
      ? {
          programmeId: programme.programmeId,
          categorySlug: category.slug,
          categoryTitle: category.title,
          programmeTitle: programme.title,
          organization: programme.organization,
          registrationSettings: mapRegistrationSettings(
            programme.registration as Record<string, unknown> | undefined,
          ),
        }
      : null
  return { match, registrationForm }
}
