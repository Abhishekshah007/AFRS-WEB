'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { TopicFilter } from '@/components/student-hub/articles/types'
import { VISIBLE_ARTICLE_CATEGORY_COUNT } from '@/data/article-categories'

export type ArticlesHeroProps = {
  filters: TopicFilter[]
  activeTopic: string
  initialQuery?: string
}

/**
 * Blue hero with search and topic pills — updates URL search params.
 */
export function ArticlesHero({
  filters,
  activeTopic,
  initialQuery = '',
}: Readonly<ArticlesHeroProps>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const [openMore, setOpenMore] = useState(false)
  const moreRef = useRef<HTMLDivElement | null>(null)

  const allFilter = filters.find((filter) => filter.value === 'all')
  const categoryFilters = filters.filter((filter) => filter.value !== 'all')
  const visibleCategoryFilters = categoryFilters.slice(0, VISIBLE_ARTICLE_CATEGORY_COUNT)
  const moreFilters = categoryFilters.slice(VISIBLE_ARTICLE_CATEGORY_COUNT)
  const visibleFilters = allFilter ? [allFilter, ...visibleCategoryFilters] : visibleCategoryFilters
  const activeMoreFilter = moreFilters.find((filter) => filter.value === activeTopic)

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setOpenMore(false)
      }
    }

    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

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
    return qs ? '/student-hub/articles?' + qs : '/student-hub/articles'
  }

  function onSearch(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push(buildUrl({ q: query.trim() }))
  }

  function onTopic(topic: string) {
    router.push(buildUrl({ topic }))
  }

  return (
    <div className="w-full text-center text-white px-6 py-16 sm:py-20 lg:py-24 bg-[#4F75F4]">
      {/* Badge — above title */}
      <span className="inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white/95">
        Knowledge Base
      </span>

      {/* Title */}
      <h1
        id="articles-hero-title"
        className="mt-5 text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.1] tracking-tight"
      >
        Forensic Insights &amp; Articles
      </h1>

      {/* Subtitle */}
      <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed">
        Explore curated forensic science articles, research summaries, and expert commentary for
        students and professionals.
      </p>

      {/* Search bar */}
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
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </span>
        <input
          id="articles-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics, authors, or keywords…"
          className="flex-1 min-w-0 h-11 bg-transparent text-sm text-slate-800 outline-none px-3"
        />
        <button
          type="submit"
          className="shrink-0 h-11 px-6 sm:px-8 rounded-full bg-(--articles-accent) hover:bg-(--articles-accent-hover) text-white text-xs sm:text-sm font-bold uppercase tracking-wide transition"
        >
          Search
        </button>
      </form>

      {/* Topic filter pills */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {visibleFilters.map((filter) => {
          const isActive = activeTopic === filter.value
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onTopic(filter.value)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                isActive
                  ? 'bg-white text-(--articles-accent) shadow-md'
                  : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
              }`}
              aria-pressed={isActive}
            >
              {filter.icon && <span aria-hidden="true">{filter.icon}</span>}
              {filter.label}
            </button>
          )
        })}

        {moreFilters.length > 0 && (
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setOpenMore((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                activeMoreFilter
                  ? 'bg-white text-(--articles-accent) shadow-md'
                  : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
              }`}
              aria-expanded={openMore}
              aria-haspopup="listbox"
            >
              {activeMoreFilter ? activeMoreFilter.label : 'More'}
              <span aria-hidden="true" className="text-xs">
                ▼
              </span>
            </button>

            {openMore && (
              <div
                className="absolute right-0 z-10 mt-3 w-72 max-h-80 overflow-y-auto rounded-[20px] border border-white/20 bg-white/95 p-3 shadow-[0_18px_32px_rgba(15,23,42,0.18)] backdrop-blur-sm"
                role="listbox"
              >
                <div className="space-y-1">
                  {moreFilters.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      role="option"
                      aria-selected={filter.value === activeTopic}
                      onClick={() => {
                        onTopic(filter.value)
                        setOpenMore(false)
                      }}
                      className={`w-full rounded-[18px] px-4 py-2 text-left text-sm font-semibold transition hover:bg-[#eef3f9] ${
                        filter.value === activeTopic ? 'bg-[#eef3f9] text-(--articles-accent)' : 'text-[#071329]'
                      }`}
                    >
                      {filter.icon && (
                        <span className="mr-2" aria-hidden="true">
                          {filter.icon}
                        </span>
                      )}
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
