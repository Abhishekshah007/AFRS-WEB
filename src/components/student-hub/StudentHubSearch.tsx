'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { studentHubTokens } from '@/components/student-hub/tokens'

/**
 * Hero search — redirects to site search with query param (min 2 chars).
 */
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
      className="mt-10 max-w-2xl mx-auto flex items-center gap-2 p-2 bg-white rounded-full shadow-lg shadow-indigo-500/10 border border-slate-100"
      role="search"
      aria-label="Search student resources"
    >
      <label htmlFor="hub-search" className="sr-only">
        Search for articles, papers, and case studies
      </label>
      <span className="pl-4 text-slate-400" aria-hidden>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
        </svg>
      </span>
      <input
        id="hub-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for articles, papers, case studies…"
        className="flex-1 min-w-0 h-11 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
        autoComplete="off"
      />
      <button
        type="submit"
        className={`shrink-0 h-11 px-6 sm:px-8 ${studentHubTokens.radiusPill} bg-[var(--hub-primary)] hover:bg-[var(--hub-primary-hover)] text-white text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hub-primary)]`}
      >
        Search
      </button>
    </form>
  )
}
