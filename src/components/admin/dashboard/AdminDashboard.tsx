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
  const [
    newInquiries,
    eventRegs,
    courseRegs,
    publishedEvents,
    draftNotices,
    draftServices,
    draftEvents,
  ] = await Promise.all([
    safeCount(payload, user, 'contactMessages', { status: { equals: 'new' } }),
    safeCount(payload, user, 'eventRegistrations'),
    safeCount(payload, user, 'courseRegistrations'),
    safeCount(payload, user, 'events', { published: { equals: true } }),
    safeCount(payload, user, 'notices', { published: { equals: false } }),
    safeCount(payload, user, 'services', { published: { equals: false } }),
    safeCount(payload, user, 'events', { published: { equals: false } }),
  ])

  const draftTotal = [draftNotices, draftServices, draftEvents]
    .filter((value): value is number => typeof value === 'number')
    .reduce((sum, value) => sum + value, 0)

  const displayName = user?.name?.trim() || user?.email || 'there'
  const roleLabel = user?.role ? ROLE_LABELS[user.role] || user.role : null
  const isStudentRole = user?.role === 'student'

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

      {isStudentRole ? (
        <section className="afrs-guide" aria-label="No studio access">
          <h2>No Content Studio access</h2>
          <p>
            Your account uses the <strong>Student</strong> role. Ask a Super Admin to set{' '}
            <strong>Content Editor</strong> or <strong>Event Manager</strong> if you manage the
            website.
          </p>
        </section>
      ) : null}

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

      <section className="afrs-guide" aria-label="How publishing works">
        <h2>Why a save may not show on the website</h2>
        <p>The admin saves your work even when visitors cannot see it yet. Check these before reporting a missing update.</p>
        <div className="afrs-guide__grid">
          <p className="afrs-guide__item">
            <strong>1. Published on website</strong>
            <span>The sidebar checkbox must be on. Drafts stay in the CMS and stay hidden from the public site.</span>
          </p>
          <p className="afrs-guide__item">
            <strong>2. Right place</strong>
            <span>Service pages are Service listings. Landing-page wording is Services page (AFSL). Notices are their own list.</span>
          </p>
          <p className="afrs-guide__item">
            <strong>3. Placement</strong>
            <span>Testimonials need the correct page (Home, AFSL, or both). Laboratory people need Directorate or Team member.</span>
          </p>
          <p className="afrs-guide__item">
            <strong>4. Refresh after save</strong>
            <span>Open the public page in a new tab. The site updates from this save; you do not need a new deployment.</span>
          </p>
        </div>
      </section>

      {draftTotal > 0 ? (
        <section className="afrs-dashboard__drafts" aria-label="Unpublished content">
          <div className="afrs-dashboard__section-head">
            <h2>Not visible on the website yet</h2>
            <p>
              These entries are saved in the CMS but <strong>Published on website</strong> is off.
              Visitors cannot see them until you publish.
            </p>
          </div>
          <div className="afrs-dashboard__stats">
            <a className="afrs-stat afrs-stat--draft" href="/admin/collections/notices?where[published][equals]=false">
              <span className="afrs-stat__value">{formatCount(draftNotices)}</span>
              <span className="afrs-stat__label">Draft notices</span>
            </a>
            <a className="afrs-stat afrs-stat--draft" href="/admin/collections/services?where[published][equals]=false">
              <span className="afrs-stat__value">{formatCount(draftServices)}</span>
              <span className="afrs-stat__label">Draft services</span>
            </a>
            <a className="afrs-stat afrs-stat--draft" href="/admin/collections/events?where[published][equals]=false">
              <span className="afrs-stat__value">{formatCount(draftEvents)}</span>
              <span className="afrs-stat__label">Draft events</span>
            </a>
          </div>
        </section>
      ) : null}

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
