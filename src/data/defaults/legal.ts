/**
 * Built-in Privacy Policy and Terms of Service text. The live copy is edited in the CMS
 * (Page copy → Legal pages); these values pre-fill it and are shown if it is left empty.
 */

export type LegalSection = { title: string; body: string }

export type LegalPageContent = {
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}

export const defaultPrivacyPage: LegalPageContent = {
  title: 'Privacy Policy',
  lastUpdated: 'January 2026',
  intro:
    'Applied Forensic Research Sciences Institute (“AFRS”, “we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.',
  sections: [
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
      body: `We use cookies to enhance your experience on our website. Cookies are small text files placed on your device. You can set your browser to refuse cookies, but some parts of the site may not function properly without them. We use session cookies (deleted when you close the browser) and persistent cookies (remain on your device until deleted or expired). An anonymous first-party cookie helps us count unique browsers for the site-wide visitor counter. We store a hash of its random identifier, not the identifier itself, and do not use it to identify you. Clearing or blocking the cookie, or using another browser or device, may cause another count.`,
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
      body: 'For any questions about this Privacy Policy, please contact us at afrsciences@gmail.com or write to: AFRS, 2nd Floor, 8/1, Moti Tabela, Near Collectorate Office, Indore, Madhya Pradesh 452007, India.',
    },
  ],
}

export const defaultTermsPage: LegalPageContent = {
  title: 'Terms of Service',
  lastUpdated: 'January 2026',
  intro:
    'Please read these Terms of Service carefully before using the Applied Forensic Research Sciences Institute website.',
  sections: [
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
  ],
}
