'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import type { Event as AfrsEvent } from '@/payload-types'

type EventOption = Pick<AfrsEvent, 'title' | 'startDate'> & { slug: string }

type Props = {
  selectedSlug: string
  onChange: (_value: string) => void
  className?: string
  style?: CSSProperties
  allLabel?: string
}

function eventOptionLabel(event: EventOption): string {
  const date = new Date(event.startDate)
  const dateLabel = Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    : ''

  return dateLabel ? `${event.title} · ${dateLabel}` : event.title
}

export function EventSelect({
  selectedSlug,
  onChange,
  className,
  style,
  allLabel = 'All events',
}: Props) {
  const [events, setEvents] = useState<EventOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadEvents() {
      setLoading(true)
      setError(null)

      try {
        const options = new URLSearchParams({
          depth: '0',
          limit: '1000',
          sort: 'title',
        })
        options.set('select[title]', 'true')
        options.set('select[slug]', 'true')
        options.set('select[startDate]', 'true')

        const allEvents: EventOption[] = []
        let page = 1
        let hasNextPage = true

        while (hasNextPage) {
          options.set('page', String(page))
          const response = await fetch(`/api/events?${options.toString()}`, {
            cache: 'no-store',
            signal: controller.signal,
          })
          if (!response.ok) {
            throw new Error(`Unable to load events (${response.status}).`)
          }

          const result = (await response.json()) as {
            docs?: EventOption[]
            hasNextPage?: boolean
          }
          if (!Array.isArray(result.docs)) {
            throw new Error('The event list response was invalid.')
          }

          allEvents.push(
            ...result.docs.filter(
              (event): event is EventOption =>
                typeof event.slug === 'string' && event.slug.length > 0,
            ),
          )
          hasNextPage = result.hasNextPage === true
          page += 1
        }

        setEvents(allEvents)
      } catch (loadError) {
        if (controller.signal.aborted) return
        setError(loadError instanceof Error ? loadError.message : 'Unable to load events.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadEvents()
    return () => controller.abort()
  }, [retry])

  return (
    <div>
      <select
        className={className}
        disabled={loading || Boolean(error) || events.length === 0}
        onChange={(event) => onChange(event.target.value)}
        style={style}
        value={selectedSlug}
      >
        <option value="">{loading ? 'Loading events…' : allLabel}</option>
        {events.map((event) => (
          <option key={event.slug} value={event.slug}>
            {eventOptionLabel(event)}
          </option>
        ))}
      </select>
      {error ? (
        <p
          role="alert"
          style={{ color: 'var(--theme-error-500, #b42318)', fontSize: '12px', marginTop: '6px' }}
        >
          {error}{' '}
          <button onClick={() => setRetry((current) => current + 1)} type="button">
            Retry
          </button>
        </p>
      ) : null}
      {!loading && !error && events.length === 0 ? (
        <p style={{ color: 'var(--theme-text)', fontSize: '12px', marginTop: '6px' }}>
          No events are available.
        </p>
      ) : null}
    </div>
  )
}
