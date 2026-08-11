import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TYPOGRAPHY, UI } from '../design'
import { CONTAINER, SECTION } from './constants'

export function InternshipProgramSection() {
  const internshipFeatures = [
    'Crime Scene Investigation Training',
    'Advanced Fingerprint Analysis',
    'Digital Forensics & Data Recovery',
    'Document & Handwriting Analysis',
  ]
  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={CONTAINER}>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          <AnimateOnScroll direction="left">
            <div className="max-w-[560px]">
              <SectionHeader
                align="left"
                accent={false}
                eyebrow="Career Catalyst"
                className="mb-0 max-w-none mx-0"
                title="Forensic Science Internship Program in India"
                subtitle="Join our highly structured internship programs designed to provide genuine practical exposure. Gain first-hand experience in professional laboratory settings and field investigations under the supervision of senior scientists."
              />

              <div className="mt-10 grid gap-y-7 gap-x-10 sm:grid-cols-2">
                {internshipFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-4">
                    <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] bg-[#DDF7E7]">
                      <BadgeCheck className="h-[18px] w-[18px] text-[#10B981]" strokeWidth={2.2} />
                    </div>

                    <p className={`${TYPOGRAPHY.body} font-semibold text-slate-700`}>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link
                  href="/courses"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#F97316] px-8 text-sm font-bold text-white shadow-[0_20px_35px_rgba(249,115,22,0.28)] transition hover:bg-[#EA580C]"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right">
            <div className="relative">
              <div className="overflow-hidden rounded-[24px] border-[10px] border-white bg-white shadow-[0_32px_60px_rgba(15,23,42,0.18)]">
                <div className="relative aspect-[1/1] w-full">
                  <Image
                    src="https://res.cloudinary.com/drrzakkgo/image/upload/v1785958676/afrs/payload/media/Screenshot_2026-08-06_010405_y8knu5.png"
                    alt="Forensic Internship Program"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
