'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import type { TopicFilter } from '@/components/student-hub/articles/types'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ArticlesHeroProps = {
  filters: TopicFilter[]
  activeTopic: string
  initialQuery?: string
}

/**
 * Blue hero with search and topic pills — updates URL search params.
 */
export function ArticlesHero({ filters, activeTopic, initialQuery = '' }: ArticlesHeroProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)

  function buildUrl(overrides: { q?: string; topic?: string; page?: string }) {
    const params = new URLSearchParams(searchParams.toString())
    if (overrides.q !== undefined) {
      if (overrides.q) params.set('q', overrides.q)
      else params.delete('q')
    }
    if (overrides.topic !== undefined) {
      if (overrides.topic && overrides.topic !== 'all') params.set('topic', overrides.topic)
      else params.delete('topic')
    }
    params.delete('page')
    const qs = params.toString()
    return `/student-hub/articles${qs ? `?${qs}` : ''}`
  }

  function onSearch(e: FormEvent) {
    e.preventDefault()
    router.push(buildUrl({ q: query.trim() }))
  }

  function onTopic(topic: string) {
    router.push(buildUrl({ topic }))
  }

  return (
    <section className="articles-hero text-white py-14 md:py-16 lg:py-20" aria-labelledby="articles-hero-title">
      <div className={`${studentHubTokens.container} text-center`}>
        <span className="inline-flex rounded-full border border-white/40 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white/95">
          Knowledge Base
        </span>
        <h1 id="articles-hero-title" className="mt-5 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight">
          Forensic Insights &amp; Articles
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed">
          Explore curated forensic science articles, research summaries, and expert commentary for students and
          professionals.
        </p>

        <form
          onSubmit={onSearch}
          className="mt-8 max-w-2xl mx-auto flex items-center gap-0 p-1.5 bg-white rounded-full shadow-lg"
          role="search"
          aria-label="Search articles"
        >
          <label htmlFor="articles-search" className="sr-only">
            Search topics, authors, or keywords
          </label>
          <span className="pl-4 text-slate-400" aria-hidden>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
          </span>
          <input
            id="articles-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, authors, or keywords…"
            className="flex-1 min-w-0 h-11 bg-transparent text-sm text-slate-800 outline-none px-2"
          />
          <button
            type="submit"
            className="shrink-0 h-11 px-6 sm:px-8 rounded-full bg-[var(--articles-accent)] hover:bg-[var(--articles-accent-hover)] text-white text-xs sm:text-sm font-bold uppercase tracking-wide transition"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-3" role="group" aria-label="Filter by topic">
          {filters.map((filter) => {
            const isActive =
              filter.value === 'all' ? !activeTopic || activeTopic === 'all' : activeTopic === filter.value
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onTopic(filter.value === 'all' ? 'all' : filter.value)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isActive
                    ? 'bg-[var(--articles-accent)] text-white shadow-md'
                    : 'bg-white text-slate-800 hover:bg-white/90'
                }`}
                aria-pressed={isActive}
              >
                {filter.icon && <span aria-hidden>{filter.icon}</span>}
                {filter.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
