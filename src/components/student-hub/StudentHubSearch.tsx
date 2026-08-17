// StudentHubSearch.tsx
'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export function StudentHubSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q.length < 2) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center w-full max-w-[520px] rounded-full bg-white border border-slate-200 shadow-[0_4px_24px_rgba(91,95,232,0.10)] px-2 py-2 gap-1"
      role="search"
      aria-label="Search student resources"
    >
      {/* Search icon */}
      <span className="pl-3 pr-1 text-slate-400 shrink-0" aria-hidden>
        <svg
          className="h-[18px] w-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
      </span>

      <label htmlFor="hub-search" className="sr-only">
        Search for articles, papers, or topics
      </label>
      <input
        id="hub-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for articles, papers, or topics..."
        className="flex-1 min-w-0 bg-transparent text-[14px] text-slate-700 placeholder:text-slate-400 outline-none h-10 px-2"
        autoComplete="off"
      />

      {/* Search button — solid indigo pill */}
      <button
        type="submit"
        className="shrink-0 h-10 px-4 sm:px-7 rounded-full bg-[var(--hub-primary)] hover:bg-[var(--hub-primary-hover)] text-white text-[13px] font-bold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hub-primary)]"
      >
        Search
      </button>
    </form>
  )
}
