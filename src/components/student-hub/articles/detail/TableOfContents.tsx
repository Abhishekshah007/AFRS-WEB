'use client'

import { useEffect, useState } from 'react'
import type { ArticleSection } from '@/components/student-hub/articles/detail/types'

export type TableOfContentsProps = {
  sections: ArticleSection[]
}

/**
 * Sticky table of contents — highlights section in view via IntersectionObserver.
 */
export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    if (sections.length === 0) return

    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(section.id)
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
      )
      io.observe(el)
      observers.push(io)
    })

    return () => observers.forEach((io) => io.disconnect())
  }, [sections])

  if (sections.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <ol className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block text-sm py-1.5 border-l-2 pl-3 transition ${
                activeId === section.id
                  ? 'border-[var(--articles-primary)] text-[var(--articles-primary)] font-bold'
                  : 'border-transparent text-slate-600 hover:text-[var(--articles-primary)]'
              }`}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
