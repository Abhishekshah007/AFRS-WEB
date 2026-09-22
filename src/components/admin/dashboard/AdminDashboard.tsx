import type { Payload, Where } from 'payload'
import { Gutter } from '@payloadcms/ui'

import { ADMIN_DASHBOARD_SECTIONS } from '../../../config/adminDashboard'

type DashboardUser = {
  name?: string | null
  email?: string | null
  role?: string | null
}

type AdminDashboardProps = {
  payload: Payload
  user?: DashboardUser | null
}

const ROLE_LABELS: Record<string, string> = {
  superAdmin: 'Super Admin',
  contentEditor: 'Content Editor',
  eventManager: 'Event Manager',
  student: 'Student',
}

async function safeCount(
  payload: Payload,
  user: DashboardUser | null | undefined,
  collection: string,
  where?: Where,
): Promise<number | null> {
  try {
    const result = await payload.find({
      collection: collection as 'articles',
      where,
      limit: 0,
      depth: 0,
      user,
      overrideAccess: false,
    })
    return result.totalDocs
  } catch {
    return null
  }
}

function formatCount(value: number | null): string {
  if (value === null) return '—'
  return new Intl.NumberFormat('en-IN').format(value)
}

export default async function AdminDashboard({ payload, user }: AdminDashboardProps) {
  const [newInquiries, eventRegs, courseRegs, publishedEvents] = await Promise.all([
    safeCount(payload, user, 'contactMessages', { status: { equals: 'new' } }),
    safeCount(payload, user, 'eventRegistrations'),
    safeCount(payload, user, 'courseRegistrations'),
    safeCount(payload, user, 'events', { published: { equals: true } }),
  ])

  const displayName = user?.name?.trim() || user?.email || 'there'
  const roleLabel = user?.role ? ROLE_LABELS[user.role] || user.role : null

  return (
    <Gutter className="afrs-dashboard">
      <header className="afrs-dashboard__hero">
        <div>
          <p className="afrs-dashboard__kicker">AFRS Content Studio</p>
          <h1>Welcome, {displayName}</h1>
          <p className="afrs-dashboard__lede">
            This panel controls the public AFRS website. Use the groups on the left, or jump from
            the cards below. Unpublished content stays hidden until you mark it published.
          </p>
          {roleLabel ? <p className="afrs-dashboard__role">Signed in as {roleLabel}</p> : null}
        </div>
        <a className="afrs-dashboard__site-link" href="/" target="_blank" rel="noreferrer">
          Open public website
        </a>
      </header>

      <section className="afrs-dashboard__stats" aria-label="Quick counts">
        <a className="afrs-stat" href="/admin/collections/contactMessages">
          <span className="afrs-stat__value">{formatCount(newInquiries)}</span>
          <span className="afrs-stat__label">New inquiries</span>
        </a>
        <a className="afrs-stat" href="/admin/collections/eventRegistrations">
          <span className="afrs-stat__value">{formatCount(eventRegs)}</span>
          <span className="afrs-stat__label">Event registrations</span>
        </a>
        <a className="afrs-stat" href="/admin/collections/courseRegistrations">
          <span className="afrs-stat__value">{formatCount(courseRegs)}</span>
          <span className="afrs-stat__label">Course registrations</span>
        </a>
        <a className="afrs-stat" href="/admin/collections/events">
          <span className="afrs-stat__value">{formatCount(publishedEvents)}</span>
          <span className="afrs-stat__label">Published events</span>
        </a>
      </section>

      {ADMIN_DASHBOARD_SECTIONS.map((section) => (
        <section key={section.title} className="afrs-dashboard__section">
          <div className="afrs-dashboard__section-head">
            <h2>{section.title}</h2>
            <p>{section.hint}</p>
          </div>
          <div className="afrs-dashboard__grid">
            {section.items.map((item) => (
              <a key={item.href} className="afrs-card" href={item.href}>
                <strong>{item.title}</strong>
                <span>{item.blurb}</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </Gutter>
  )
}
