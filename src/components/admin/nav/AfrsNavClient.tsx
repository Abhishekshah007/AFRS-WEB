'use client'

import { Link } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'

import type { AfrsNavSectionGroup } from '@/lib/admin/buildAfrsNavGroups'

type Props = {
  adminRoute: string
  sections: AfrsNavSectionGroup[]
  roleLabel?: string | null
}

const baseClass = 'nav'

export function AfrsNavClient({ adminRoute, sections, roleLabel }: Props) {
  const pathname = usePathname()
  const dashboardHref = `${adminRoute}`

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const section of sections) {
      initial[section.id] = section.defaultOpen
    }
    return initial
  })

  const isDashboardActive = useMemo(() => {
    if (pathname === dashboardHref || pathname === `${dashboardHref}/`) return true
    return false
  }, [pathname, dashboardHref])

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="afrs-nav">
      <div className="afrs-nav__dashboard">
        {isDashboardActive ? (
          <div className={`${baseClass}__link ${baseClass}__link--active afrs-nav__link`} id="nav-dashboard">
            <div className={`${baseClass}__link-indicator`} />
            <span className={`${baseClass}__link-label`}>Dashboard</span>
          </div>
        ) : (
          <Link className={`${baseClass}__link afrs-nav__link`} href={dashboardHref} id="nav-dashboard">
            <span className={`${baseClass}__link-label`}>Dashboard</span>
          </Link>
        )}
      </div>

      {sections.map((section) => (
        <div
          key={section.id}
          className={`afrs-nav__section afrs-nav__section--${section.tier}`}
          data-section={section.id}
        >
          <button
            type="button"
            className="afrs-nav__section-toggle"
            onClick={() => toggleSection(section.id)}
            aria-expanded={openSections[section.id]}
          >
            <span className="afrs-nav__section-label">{section.label}</span>
            <span className="afrs-nav__section-hint">{section.hint}</span>
          </button>

          {openSections[section.id] ? (
            <div className="afrs-nav__links">
              {section.entities.map((entity) => {
                const isActive =
                  pathname === entity.href || pathname.startsWith(`${entity.href}/`)
                const label = entity.label

                if (isActive) {
                  return (
                    <div
                      key={`${entity.type}-${entity.slug}`}
                      className={`${baseClass}__link ${baseClass}__link--active afrs-nav__link`}
                      id={`nav-${entity.slug}`}
                    >
                      <div className={`${baseClass}__link-indicator`} />
                      <span className={`${baseClass}__link-label`}>{label}</span>
                    </div>
                  )
                }

                return (
                  <Link
                    key={`${entity.type}-${entity.slug}`}
                    className={`${baseClass}__link afrs-nav__link`}
                    href={entity.href}
                    id={`nav-${entity.slug}`}
                  >
                    <span className={`${baseClass}__link-label`}>{label}</span>
                  </Link>
                )
              })}
            </div>
          ) : null}
        </div>
      ))}

      {roleLabel ? (
        <p className="afrs-nav__role" aria-live="polite">
          Signed in as <strong>{roleLabel}</strong>
        </p>
      ) : null}
    </div>
  )
}
