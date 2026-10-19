'use client'

import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

const LABELS: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/collections/contactMessages': 'Website inquiries',
  '/admin/collections/courseRegistrations': 'Course requests',
  '/admin/collections/eventRegistrations': 'Event registrations',
  '/admin/collections/notices': 'Notices',
  '/admin/collections/users': 'Staff accounts',
  '/admin/globals/adminAccess': 'Staff menu access',
}

function resolveTitle(pathname: string): string {
  if (LABELS[pathname]) return LABELS[pathname]

  const collectionMatch = pathname.match(/\/admin\/collections\/([^/]+)/)
  if (collectionMatch) {
    const slug = collectionMatch[1]
    return slug.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
  }

  const globalMatch = pathname.match(/\/admin\/globals\/([^/]+)/)
  if (globalMatch) {
    const slug = globalMatch[1]
    return slug.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
  }

  return 'Content Studio'
}

export default function AdminStudioHeader() {
  const pathname = usePathname()

  const title = useMemo(() => resolveTitle(pathname), [pathname])
  const isDashboard = pathname === '/admin' || pathname === '/admin/'

  return (
    <div className="afrs-studio-header" aria-label="Current screen">
      <p className="afrs-studio-header__kicker">AFRS Content Studio</p>
      <p className="afrs-studio-header__title">{title}</p>
      {!isDashboard ? (
        <p className="afrs-studio-header__hint">
          Changes save to the database. Use <strong>Published on website</strong> for public content.
        </p>
      ) : null}
    </div>
  )
}
