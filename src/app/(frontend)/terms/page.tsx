import { PageHero } from '@/components/marketing/PageHero'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Service',
  description: 'Terms governing use of the AFRS website, programmes and related services.',
  path: '/terms',
})

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing and using the AFRS website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.`,
  },
  {
    title: '2. Use of the Website',
    body: `You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You may not use the website to transmit any unsolicited communications, impersonate any person, or engage in any conduct that restricts or inhibits anyone else's use of the site.`,
  },
  {
    title: '3. Intellectual Property',
    body: `All content on this website, including text, graphics, logos, images, and software, is the property of AFRS or its content providers and is protected by applicable copyright and intellectual property laws. You may not reproduce, modify, or distribute any content without prior written consent.`,
  },
  {
    title: '4. Event Registrations',
    body: `Registration for events is subject to availability. AFRS reserves the right to cancel or reschedule events. In the event of cancellation, registered participants will be notified and refunds (where applicable) will be processed within 10 business days. Registration fees are non-transferable unless otherwise stated.`,
  },
  {
    title: '5. Limitation of Liability',
    body: `To the extent permitted by law, AFRS shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from: use or inability to use the website; any errors or omissions in content; or unauthorised access to or alteration of transmissions or data.`,
  },
  {
    title: '6. Third-Party Links',
    body: `Our website may contain links to third-party websites. These links are provided for your convenience only. AFRS has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.`,
  },
  {
    title: '7. Governing Law',
    body: `These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Indore, Madhya Pradesh.`,
  },
  {
    title: '8. Modifications',
    body: `AFRS reserves the right to change these Terms of Service at any time. Changes become effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of the revised terms.`,
  },
  {
    title: '9. Contact',
    body: 'For questions regarding these terms, contact us at afrsciences@gmail.com.',
  },
]

export default function TermsPage() {
  return (
    <div>
      <PageHero eyebrow="LEGAL" title="Terms of Service" subtitle="Last updated: January 2026" />
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="space-y-10 text-slate-700">
          <p className="text-sm leading-relaxed text-slate-600">
            Please read these Terms of Service carefully before using the Applied Forensic Research
            Sciences Institute website.
          </p>
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3">{s.title}</h2>
              {s.body.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate-600 mb-3">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
