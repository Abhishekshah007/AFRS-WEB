import { PageHero } from '@/components/marketing/PageHero'
import { getPayloadClient } from '@/lib/payload'
import type { HomePage } from '@/payload-types'
import Image from 'next/image'

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const home = (await payload.findGlobal({ slug: 'homePage', depth: 1 })) as HomePage
  const sectionText = home?.sectionText

  return (
    <div>
      <PageHero
        eyebrow="ABOUT AFRS"
        title={sectionText?.aboutHeading || 'About Applied Forensic Research Sciences'}
        subtitle="Advancing the frontiers of forensic science through education, research, and professional excellence."
        primaryCta={{ label: 'Explore Programs', href: '/courses' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Our Mission
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed">
              {sectionText?.aboutDescription1 ||
                'AFRS is a premier organization established with a vision to revolutionize the forensic science landscape through research, training, and specialized services.'}
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {sectionText?.aboutDescription2 ||
                'We bridge the gap between academic theory and practical application, providing students and professionals with the tools they need to excel in the field of forensic investigation.'}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                ['Research-led', 'Programs designed with real case workflows'],
                ['Industry-ready', 'Practical skills and certification tracks'],
                ['Expert team', 'Guidance from experienced scientists'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 card-pop">
                  <p className="font-bold text-slate-900 text-sm">{title}</p>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-lg aspect-[4/3]">
            <Image
              src="https://www.figma.com/api/mcp/asset/e7944166-77e9-4951-b26b-6b9f94d7b9a2"
              alt="AFRS laboratory"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  )
}

