import Link from 'next/link'
import { SubPageHero, type BreadcrumbItem } from '@/components/programmes/SubPageHero'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { resolveIcon } from '@/components/ui/iconMap'

export type CategoryIndexItem = {
  slug: string
  icon: string
  title: string
  summary: string
  href: string
  tag?: string
}

export type CategoryIndexViewProps = {
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  title: string
  description: string
  items: CategoryIndexItem[]
}

/**
 * Index of education or training categories before drilling into a single track.
 */
export function CategoryIndexView({ breadcrumbs, eyebrow, title, description, items }: CategoryIndexViewProps) {
  return (
    <div className="programmes-page bg-white min-h-screen">
      <SubPageHero breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} description={description} />

      <section className={programmesTokens.sectionY}>
        <div className={programmesTokens.container}>
          <AnimateOnScroll stagger>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                const Icon = resolveIcon(item.icon)
                return (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className={`${programmesTokens.radiusCard} border border-slate-100 bg-white p-6 shadow-sm card-pop block h-full group`}
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6 text-brand-500" strokeWidth={1.8} />
                    </span>
                    {item.tag && (
                      <span className="mt-3 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {item.tag}
                      </span>
                    )}
                    <h2 className="mt-3 font-extrabold text-slate-900 group-hover:text-[var(--prog-primary)] transition">
                      {item.title}
                    </h2>
                    <p className={`mt-2 text-sm ${programmesTokens.body}`}>{item.summary}</p>
                    <span className="mt-4 inline-flex text-sm font-bold text-[var(--prog-primary)]">
                      View programmes →
                    </span>
                  </Link>
                </li>
                )
              })}
            </ul>
          </AnimateOnScroll>
          <p className="mt-10 text-center">
            <Link href="/courses" className="text-sm font-bold text-[var(--prog-primary)] hover:underline">
              ← Back to Programmes &amp; Events
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
