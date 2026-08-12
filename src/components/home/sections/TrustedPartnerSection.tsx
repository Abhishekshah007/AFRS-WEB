import Image from 'next/image'
import AFRSLogo from '../../../../public/assets/afsl-logo.png'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { UI } from '../design'
import { AfslOffers } from './AfslOffers'
import { ProgramCtaSection } from './ProgramCtaSection'

export function TrustedPartnerSection() {
  const cards = [
    { title: 'Crime Scene Investigation & Management', icon: '🕵️' },
    { title: 'Fingerprint Examination & Analysis', icon: '🔍' },
    { title: 'Questioned Document & Signature Analysis', icon: '📄' },
    { title: 'Multimedia & Digital Forensics', icon: '💻' },
    { title: '65B IEA Certificate (63(4)(C) BSA)', icon: '⚖️' },
    { title: 'Forensic Consultancy & Expert Opinion', icon: '📋' },
  ]

  return (
    <section
      className={`relative py-20 text-white overflow-hidden section-glow-top`} // Replaced ${SECTION} assuming standard padding
      style={{ background: UI.afslGradient }} // Ensure UI is imported in your actual file
    >
      {/* Huge Background Watermark for the whole section */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="130" cy="130" r="20" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="45" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="70" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="95" stroke="currentColor" strokeWidth="10" />
        </svg>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        {' '}
        {/* Replaced ${CONTAINER} for clarity */}
        <div className="mx-auto mb-12 flex justify-center">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl inline-block">
            <Image
              src={AFRSLogo} // Ensure AFRSLogo is imported
              alt="AFSL Logo"
              width={200}
              height={60}
              className="mx-auto"
            />
          </div>
        </div>
        <SectionHeader
          light
          title="Applied Forensic Science Laboratory (AFSL)"
          subtitle="Scientific. Reliable. Professional."
        />
        <p className="mx-auto mt-4 mb-14 max-w-3xl text-center text-base sm:text-lg leading-relaxed text-white/80">
          Applied Forensic Science Laboratory (AFSL) is committed to delivering reliable,
          scientific, and evidence-based forensic solutions that support investigations, legal
          proceedings, research, and professional development. Our multidisciplinary team provides
          expert forensic examination, analytical services, consultation, and training across
          various domains of forensic science.
        </p>
        <AnimateOnScroll stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-white/5 min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span
                className="text-4xl drop-shadow-md transition-transform duration-300 group-hover:scale-110 mb-4"
                aria-hidden
              >
                {card.icon}
              </span>
              <p className="text-sm sm:text-base font-semibold leading-snug text-white/95 tracking-wide">
                {card.title}
              </p>
            </div>
          ))}
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="mt-16 lg:mt-20">
            <AfslOffers />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="mt-10 lg:mt-12">
            <ProgramCtaSection />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
