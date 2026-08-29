import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TYPOGRAPHY, UI } from '../design'
import { aboutImage, CONTAINER, SECTION } from './constants'
import type { SectionText } from './types'

export function AboutSection({ sectionText }: { sectionText: SectionText }) {
  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2 items-center`}>
        <AnimateOnScroll direction="left">
          <SectionHeader
            align="left"
            accent={false}
            className="mb-0 max-w-none mx-0"
            title={sectionText.aboutHeading || 'About AFRS'}
          />
          <p className={`mt-6 ${UI.body} text-justify`}>
            {sectionText.aboutDescription1 ||
              'Applied Forensic Research Sciences (AFRS) is a dedicated platform committed to advancing education, research and professional development in the field of Forensic Science. Registered under the Madhya Pradesh Society Registration Act 1973, Ministry of Micro, Small & Medium Enterprises (MSME), NITI Aayog and accredited with ISO 9001:2015, Government of India, AFRS functions as a multidisciplinary organization focused on fostering collaboration, innovation and knowledge exchange.'}
          </p>
          <p className={`mt-4 ${UI.body}`}>
            {sectionText.aboutDescription2 ||
              'We bridge the gap between academic theory and practical application, providing students and professionals with the tools they need to excel in forensic investigation.'}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white px-8 text-sm font-bold transition"
          >
            Read More
          </Link>
        </AnimateOnScroll>
        <AnimateOnScroll direction="right">
          <div className="relative">
            <div className="rounded-[2rem] border-[10px] border-white shadow-2xl overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={aboutImage}
                  alt="AFRS laboratory"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="absolute -right-2 -bottom-2 sm:-right-4 sm:-bottom-4 rounded-2xl bg-brand-600 text-white px-5 py-4 shadow-xl">
              <p className="text-3xl font-extrabold leading-none">10+</p>
              <p className={`mt-1 ${TYPOGRAPHY.label} text-white/90`}>Years of Experience</p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
