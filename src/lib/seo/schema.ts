import { AFSL_NAME, BRAND_LEGAL, absoluteUrl, getSiteUrl } from './site'

export type BreadcrumbCrumb = { name: string; path: string }

const NAP = {
  telephone: '+91-9926692487',
  email: 'afrsciences@gmail.com',
  streetAddress: '8/1, 2nd Floor, Moti Tabela, Near Collectorate Office',
  addressLocality: 'Indore',
  addressRegion: 'Madhya Pradesh',
  postalCode: '452001',
  addressCountry: 'IN',
}

export function organizationGraph(sameAs: string[] = []) {
  const origin = getSiteUrl()
  return {
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': `${origin}/#organization`,
    name: BRAND_LEGAL,
    alternateName: ['AFRS', 'Applied Forensic Research Sciences'],
    url: `${origin}/`,
    logo: absoluteUrl('/assets/logo.png'),
    email: NAP.email,
    telephone: NAP.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      postalCode: NAP.postalCode,
      addressCountry: NAP.addressCountry,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    sameAs,
    department: {
      '@type': 'ProfessionalService',
      '@id': `${origin}/services#afsl`,
      name: AFSL_NAME,
      url: absoluteUrl('/services'),
      telephone: NAP.telephone,
      email: NAP.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: NAP.streetAddress,
        addressLocality: NAP.addressLocality,
        addressRegion: NAP.addressRegion,
        postalCode: NAP.postalCode,
        addressCountry: NAP.addressCountry,
      },
    },
  }
}

export function websiteGraph() {
  const origin = getSiteUrl()
  return {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: `${origin}/`,
    name: BRAND_LEGAL,
    publisher: { '@id': `${origin}/#organization` },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${origin}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbList(items: BreadcrumbCrumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

export function withContext(nodes: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': Array.isArray(nodes) ? nodes : [nodes],
  }
}
