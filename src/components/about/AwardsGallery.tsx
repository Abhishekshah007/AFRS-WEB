import Image from 'next/image'
import { ABOUT_IMAGES, aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type AwardsGalleryProps = {
  images?: [string, string, string]
  title?: string
  subtitle?: string
  callout?: string
  imageAlts?: [string, string, string]
}

/**
 * Bento-style awards & recognition image grid.
 */
export function AwardsGallery({
  images = [ABOUT_IMAGES.award1, ABOUT_IMAGES.award2, ABOUT_IMAGES.award3],
  title = 'Awards & Recognition',
  subtitle = 'Celebrating excellence in forensic education, research, and community impact.',
  callout = 'Built for award-winning forensic research and training.',
  imageAlts = ['AFRS laboratory research', 'AFRS training session', 'AFRS team recognition'],
}: Readonly<AwardsGalleryProps>) {
  const [large, topRight, bottomRight] = images
  const [largeAlt, topRightAlt, bottomRightAlt] = imageAlts

  return (
    <section className={`${aboutTokens.sectionY} bg-white`} aria-labelledby="awards-heading">
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader id="awards-heading" title={title} subtitle={subtitle} />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2 md:h-110">
            <div className="relative md:col-span-5 md:row-span-2 min-h-65 md:min-h-0 overflow-hidden rounded-[28px]">
              <Image
                src={large}
                alt={largeAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative md:col-span-4 min-h-45 overflow-hidden rounded-[28px]">
              <Image
                src={topRight}
                alt={topRightAlt}
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative md:col-span-3 min-h-45 overflow-hidden rounded-[28px] bg-(--about-primary-soft) border border-dashed border-slate-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--about-primary) text-white text-2xl">
                  ★
                </span>
                <p className="text-sm font-semibold text-(--about-primary)">{callout}</p>
              </div>
            </div>
            <div className="relative md:col-span-7 min-h-55 overflow-hidden rounded-[28px]">
              <Image
                src={bottomRight}
                alt={bottomRightAlt}
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
