import Image from 'next/image'
import { serviceDetailTokens, SERVICE_DETAIL_IMAGES } from '@/components/service-detail/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type ServiceOverviewSectionProps = {
  title: string
  paragraphs: string[]
  imageUrl?: string
}

/**
 * “What is …?” two-column block with floating quality card on the image.
 */
export function ServiceOverviewSection({
  title,
  paragraphs,
  imageUrl = SERVICE_DETAIL_IMAGES.overview,
}: ServiceOverviewSectionProps) {
  return (
    <section
      className={`${serviceDetailTokens.sectionY} bg-white`}
      aria-labelledby="service-overview-heading"
    >
      <div className={serviceDetailTokens.container}>
        <AnimateOnScroll>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div>
              <span className={serviceDetailTokens.accentBar} aria-hidden />
              <h2
                id="service-overview-heading"
                className={`mt-4 ${serviceDetailTokens.heading} text-2xl sm:text-[28px] leading-tight`}
              >
                {title}
              </h2>
              <div className="mt-6 space-y-4 text-justify">
                {paragraphs.map((p, i) => (
                  <p key={i} className={`text-sm sm:text-base ${serviceDetailTokens.body}`}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className={`relative aspect-[4/3] overflow-hidden ${serviceDetailTokens.radiusLg} shadow-lg`}
              >
                <Image
                  src={imageUrl}
                  alt="Forensic professional at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div
                className={`absolute -bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-[280px] ${serviceDetailTokens.radiusCard} border border-slate-100 bg-white p-4 shadow-xl flex gap-3 items-start`}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--svc-primary-soft)] text-lg text-[var(--svc-primary)]"
                  aria-hidden
                >
                  ✓
                </span>
                <div>
                  <p className="text-sm font-bold text-[var(--svc-text)]">Professional Services</p>
                  <p className="text-xs text-[var(--svc-text-muted)] mt-0.5">
                    Quality you can trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
