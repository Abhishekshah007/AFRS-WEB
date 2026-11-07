'use client'

import { useState, type FormEvent } from 'react'

const EVENT_LIST_FILTER = 'where[eventSlug][equals]'

export default function EventRegistrationTools() {
  const [eventSlug, setEventSlug] = useState('')

  function applyListFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const slug = eventSlug.trim()
    const params = new URLSearchParams(window.location.search)
    params.delete('page')

    if (slug) {
      params.set(EVENT_LIST_FILTER, slug)
    } else {
      params.delete(EVENT_LIST_FILTER)
    }

    const query = params.toString()
    window.location.assign(`${window.location.pathname}${query ? `?${query}` : ''}`)
  }

  function downloadExcel() {
    const slug = eventSlug.trim()
    if (!slug) return

    const params = new URLSearchParams({ eventSlug: slug, format: 'xlsx' })
    window.location.assign(`/api/eventRegistrations/export-csv?${params.toString()}`)
  }

  return (
    <section className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-bold text-slate-900">Manage registrations by event</h2>
      <p className="mt-1 text-xs text-slate-600">
        Enter the event slug to filter this list or export that event’s registrations and payment
        proof links.
      </p>
      <form className="mt-3 flex flex-wrap items-end gap-3" onSubmit={applyListFilter}>
        <label className="min-w-[220px] flex-1 text-xs font-semibold text-slate-700">
          Event slug
          <input
            autoComplete="off"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            onChange={(event) => setEventSlug(event.target.value)}
            placeholder="e.g. forensic-workshop-2026"
            value={eventSlug}
          />
        </label>
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800"
          type="submit"
        >
          Filter list
        </button>
        <button
          className="rounded-md bg-[#3B010B] px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!eventSlug.trim()}
          onClick={downloadExcel}
          type="button"
        >
          Download Excel
        </button>
      </form>
    </section>
  )
}
