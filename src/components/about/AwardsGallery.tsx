import Image from 'next/image'
import { ABOUT_IMAGES, aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type AwardsGalleryProps = {
  images?: [string, string, string]
}

/**
 * Bento-style awards & recognition image grid.
 */
export function AwardsGallery({
  images = [ABOUT_IMAGES.award1, ABOUT_IMAGES.award2, ABOUT_IMAGES.award3],
}: AwardsGalleryProps) {
  const [large, topRight, bottomRight] = images

  return (
    <section className={`${aboutTokens.sectionY} bg-white`} aria-labelledby="awards-heading">
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader
            id="awards-heading"
            title="Awards & Recognition"
            subtitle="Celebrating excellence in forensic education, research, and community impact."
          />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2 md:h-[420px]">
            <div className="relative md:col-span-5 md:row-span-2 min-h-[240px] md:min-h-0 overflow-hidden rounded-2xl">
              <Image
                src={large}
                alt="AFRS laboratory research"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative md:col-span-4 min-h-[180px] overflow-hidden rounded-2xl">
              <Image
                src={topRight}
                alt="AFRS training session"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative md:col-span-3 min-h-[180px] overflow-hidden rounded-2xl bg-[var(--about-primary-soft)] hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <p className="text-sm font-bold text-[var(--about-primary)]">More highlights coming soon</p>
              </div>
            </div>
            <div className="relative md:col-span-7 min-h-[200px] overflow-hidden rounded-2xl">
              <Image
                src={bottomRight}
                alt="AFRS team recognition"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
