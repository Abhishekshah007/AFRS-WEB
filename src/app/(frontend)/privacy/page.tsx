import { PageHero } from '@/components/marketing/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How AFRS collects, uses, and protects your personal information.',
}

const sections = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly to us, such as when you register for events, submit the contact form, or create an account. This includes name, email address, phone number, and any message content you submit.\n\nWe also automatically collect certain technical information when you use our website, including IP address, browser type, pages visited, and time spent on pages.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use the information we collect to: (a) process event registrations and provide confirmations; (b) respond to your enquiries and contact form submissions; (c) send you newsletters and updates if you have subscribed; (d) improve our website content and user experience; (e) comply with legal obligations.`,
  },
  {
    title: '3. Sharing of Information',
    body: `We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating the website, conducting our business, or serving you — provided that those parties agree to keep this information confidential.\n\nWe may also disclose information when we believe release is appropriate to comply with the law or protect rights, property, or safety.`,
  },
  {
    title: '4. Cookies',
    body: `We use cookies to enhance your experience on our website. Cookies are small text files placed on your device. You can set your browser to refuse cookies, but some parts of the site may not function properly without them. We use session cookies (deleted when you close the browser) and persistent cookies (remain on your device until deleted or expired).`,
  },
  {
    title: '5. Data Security',
    body: `We implement appropriate technical and organisational measures to protect your personal information against accidental or unlawful destruction, loss, alteration, or unauthorised access. However, no internet transmission is completely secure and we cannot guarantee absolute security.`,
  },
  {
    title: '6. Your Rights',
    body: `Under applicable data protection law, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; object to processing; and request restriction of processing. To exercise these rights, contact us at afrsciences@gmail.com.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `We reserve the right to update this Privacy Policy at any time. We will notify you of any significant changes by posting the new policy on this page with a revised "last updated" date. Continued use of the website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '8. Contact',
    body: 'For any questions about this Privacy Policy, please contact us at afrsciences@gmail.com or write to: AFRS Institute, 123 Forensic Lane, Vijay Nagar, Indore, Madhya Pradesh 452010, India.',
  },
]

export default function PrivacyPage() {
  return (
    <div>
      <PageHero eyebrow="LEGAL" title="Privacy Policy" subtitle="Last updated: January 2026" />
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="space-y-10 text-slate-700">
          <p className="text-slate-600 leading-relaxed">
            Applied Forensic Research Sciences Institute (&ldquo;AFRS&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website.
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
