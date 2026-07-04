import { EventsListingView } from '@/components/programmes/EventsListingView'
import { fetchProgrammeHubEvents } from '@/lib/programmeEvents'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Events Hub',
  description:
    'Register for national and international forensic workshops, conferences, and faculty development programmes.',
}

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

  const { upcoming, ongoing, completed } = await fetchProgrammeHubEvents({
    nature: initialNature === 'all' ? undefined : initialNature,
    type: type || undefined,
  })

  return (
    <EventsListingView
      upcoming={upcoming}
      ongoing={ongoing}
      completed={completed}
      initialSchedule={initialSchedule}
      initialNature={initialNature}
      initialType={type}
    />
  )
}
