import { EventsListingView } from '@/components/programmes/EventsListingView'
import { fetchProgrammeHubEvents, parseEventTypes } from '@/lib/programmeEvents'
import { getEventTypes } from '@/lib/queries/taxonomies'
import { DEFAULT_ARCHIVE_ROWS, getProgrammePagesCopy } from '@/lib/queries/programme-pages'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Workshops & Online Events',
  description:
    'Register for national and international forensic workshops, conferences and faculty development programmes.',
  path: '/courses/events',
})

type Props = {
  searchParams: Promise<{
    schedule?: string
    nature?: string
    type?: string
  }>
}

export default async function ProgrammeEventsPage({ searchParams }: Props) {
  const { schedule, nature, type } = await searchParams

  const initialSchedule =
    schedule === 'ongoing'
      ? 'ongoing'
      : schedule === 'completed' || schedule === 'archive'
        ? 'completed'
        : 'upcoming'
  const initialNature =
    nature === 'national' || nature === 'international' ? nature : ('all' as const)

  // ?type= may list several slugs (archive rows group related types, e.g. internships).
  const types = parseEventTypes(type)

  const [{ upcoming, ongoing, completed }, eventTypes, copy] = await Promise.all([
    fetchProgrammeHubEvents({
      nature: initialNature === 'all' ? undefined : initialNature,
      type: types,
    }),
    getEventTypes(),
    getProgrammePagesCopy(),
  ])

  // Label for the "Filtered:" chip: the archive row's name when the types match one,
  // otherwise the event type names.
  const archiveRows = copy.archiveRows.length > 0 ? copy.archiveRows : DEFAULT_ARCHIVE_ROWS
  const sameTypes = (a: string[] = [], b: string[]) =>
    a.length === b.length && a.every((slug) => b.includes(slug))
  const typeLabel = types.length
    ? (archiveRows.find((row) => sameTypes(row.eventTypeSlugs, types))?.label ??
      types.map((slug) => eventTypes.find((item) => item.slug === slug)?.label ?? slug).join(', '))
    : undefined

  return (
    <EventsListingView
      upcoming={upcoming}
      ongoing={ongoing}
      completed={completed}
      initialSchedule={initialSchedule}
      initialNature={initialNature}
      initialTypes={types}
      hero={copy.eventsHub}
      initialTypeLabel={typeLabel}
    />
  )
}
