'use client'

import { useCallback, useEffect, useState } from 'react'

export type ArticleShareActionsProps = {
  articleSlug: string
  title: string
}

/**
 * Save-for-later (localStorage) and native share / copy-link actions.
 */
export function ArticleShareActions({ articleSlug, title }: ArticleShareActionsProps) {
  const storageKey = `afrs-saved-article-${articleSlug}`
  const [saved, setSaved] = useState(false)
  const [shareMsg, setShareMsg] = useState<string | null>(null)

  useEffect(() => {
    try {
      setSaved(localStorage.getItem(storageKey) === '1')
    } catch {
      /* private browsing */
    }
  }, [storageKey])

  const toggleSave = useCallback(() => {
    try {
      const next = !saved
      if (next) localStorage.setItem(storageKey, '1')
      else localStorage.removeItem(storageKey)
      setSaved(next)
    } catch {
      /* ignore */
    }
  }, [saved, storageKey])

  const share = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setShareMsg('Link copied')
      setTimeout(() => setShareMsg(null), 2000)
    } catch {
      setShareMsg('Could not share')
      setTimeout(() => setShareMsg(null), 2000)
    }
  }, [title])

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={toggleSave}
        className="inline-flex h-10 items-center gap-2 rounded-xl border-2 border-[var(--articles-primary)] bg-white px-4 text-sm font-bold text-[var(--articles-primary)] hover:bg-[var(--articles-primary)]/5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-pressed={saved}
      >
        <span aria-hidden>{saved ? '🔖' : '🏷'}</span>
        {saved ? 'Saved' : 'Save for Later'}
      </button>
      <button
        type="button"
        onClick={share}
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--articles-primary)] px-4 text-sm font-bold text-white hover:bg-[var(--articles-primary-hover)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span aria-hidden>↗</span>
        Share
      </button>
      {shareMsg && (
        <span className="text-xs font-semibold text-emerald-600" role="status">
          {shareMsg}
        </span>
      )}
    </div>
  )
}
