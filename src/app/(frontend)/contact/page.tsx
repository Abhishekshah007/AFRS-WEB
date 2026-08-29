import { PageHero } from '@/components/marketing/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { getPayloadClient } from '@/lib/payload'
import type { SiteSetting } from '@/payload-types'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact AFRS & AFSL',
  description:
    'Contact AFRS and AFSL in Indore for forensic science education, training, internships, research and laboratory service enquiries.',
  path: '/contact',
})

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const site = (await payload.findGlobal({ slug: 'siteSettings' })) as SiteSetting
  const socials = site?.socialLinks || {}

  const socialItems = [
    { label: 'Instagram', href: socials.instagram },
    { label: 'Facebook', href: socials.facebook },
    { label: 'YouTube', href: socials.youtube },
    { label: 'LinkedIn', href: socials.linkedin },
    { label: 'X', href: socials.twitter },
  ].filter(
    (x): x is { label: string; href: string } =>
      typeof x.href === 'string' && x.href.startsWith('http'),
  )

  return (
    <div>
      <PageHero
        eyebrow="CONTACT FORM"
        title="Contact AFRS & AFSL"
        subtitle="We are here to assist you with forensic science inquiries, collaborations, and educational needs."
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 grid gap-10 lg:grid-cols-2">
          <ContactForm />

          <div className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-slate-900">Get In Touch</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Visit our headquarters or contact us via official channels.
            </p>

            <div className="mt-8 space-y-5 text-sm">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center">
                  📍
                </div>
                <div>
                  <p className="font-bold text-slate-900">Our Location</p>
                  <p className="text-slate-500 mt-1">{site?.address || 'AFRS Campus, India'}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center">
                  ☎
                </div>
                <div>
                  <p className="font-bold text-slate-900">Phone Number</p>
                  <p className="text-slate-500 mt-1">{site?.phone || '+91-9926692487'}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center">
                  ✉
                </div>
                <div>
                  <p className="font-bold text-slate-900">Email ID</p>
                  <p className="text-slate-500 mt-1">{site?.email || 'afrsciences@gmail.com'}</p>
                </div>
              </div>
            </div>

            {socialItems.length > 0 && (
              <div className="mt-10">
                <p className="text-sm font-extrabold text-slate-900 text-center">
                  Connect on Social Media
                </p>
                <p className="text-xs text-slate-500 text-center mt-2">
                  Follow us for updates, workshops, and announcements.
                </p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {socialItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-700 hover:text-brand-600 transition card-pop"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
