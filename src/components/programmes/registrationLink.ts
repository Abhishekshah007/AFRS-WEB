import type { ProgrammeListItem } from '@/domain/programmes/catalog-types'

type ProgrammeRegistrationContext = {
  type: 'education' | 'training'
  categorySlug?: string
  categoryTitle: string
}

export function getProgrammeCta(
  programme: ProgrammeListItem,
  context: ProgrammeRegistrationContext,
): { href: string; label: string } {
  const eventSlug = programme.eventSlug?.trim()
  if (eventSlug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(eventSlug)) {
    return { href: `/events/${eventSlug}`, label: 'Register Now' }
  }

  const params = new URLSearchParams({
    type: context.type,
    ...(context.categorySlug ? { categorySlug: context.categorySlug } : {}),
    categoryTitle: context.categoryTitle,
    programmeId: programme.id,
    programmeTitle: programme.title,
    duration: programme.duration,
    mode: programme.mode,
  })

  return { href: `/courses/register?${params.toString()}`, label: 'Register Interest' }
}
