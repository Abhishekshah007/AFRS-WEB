import Link from 'next/link'
import { getCmsIcon } from '@/lib/cmsIcons'
import type { QuickLinksSectionContent } from '@/lib/queries/home-sections'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { BRAND_GRADIENTS } from '@/lib/brand'
import { CONTAINER, SECTION } from './constants'

export function MediaResourcesSection({ content }: { content: QuickLinksSectionContent }) {
  const items = content.items

  return (
    <section
      className={`${SECTION} text-white section-glow-top`}
      style={{ background: BRAND_GRADIENTS.hero }}
    >
      <div className={CONTAINER}>
        <SectionHeader
          light
          title={content.title}
          subtitle={content.subtitle}
        />
        <AnimateOnScroll stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="card-pop card-pop-on-dark rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center hover:bg-white/15 min-h-[120px] flex flex-col items-center justify-center gap-3"
            >
              <span className="text-2xl" aria-hidden>
                {(() => {
                  const Icon = getCmsIcon(item.icon)
                  return <Icon className="h-8 w-8" />
                })()}
              </span>
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
