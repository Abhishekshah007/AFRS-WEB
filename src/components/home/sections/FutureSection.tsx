import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { UI } from '../design'
import { CONTAINER, SECTION } from './constants'
import type { VideoSectionContent } from '@/lib/queries/home-sections'

export function FutureSection({ content }: { content: VideoSectionContent }) {
  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 items-center`}>
        <AnimateOnScroll direction="left">
          <div className="relative rounded-3xl overflow-hidden bg-slate-200 aspect-[16/10] lg:min-h-[320px] card-pop">
            <video
              key={content.videoUrl}
              controls
              muted
              playsInline
              preload="none"
              poster={content.posterUrl}
              controlsList="nodownload"
              className="absolute inset-0 h-full w-full object-contain bg-slate-900"
            >
              <source
                src={content.videoUrl}
                type="video/mp4"
              />
            </video>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll direction="right">
          <div>
            <SectionHeader
              align="left"
              accent={false}
              className="mb-0 max-w-none mx-0"
              titleClassName="lg:!text-[28px] xl:!text-[32px]"
              title={content.title}
            />
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? ` ${UI.body}` : `mt-1 ${UI.body}`}
                style={
                  index === 0
                    ? { marginTop: '-1.5rem', textAlign: 'justify' }
                    : { textAlign: 'justify' }
                }
              >
                {paragraph}
              </p>
            ))}
            <Link
              href={content.ctaHref}
              className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 hover:bg-brand-700 px-6 text-white text-sm font-bold transition"
            >
              {content.ctaLabel}
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
