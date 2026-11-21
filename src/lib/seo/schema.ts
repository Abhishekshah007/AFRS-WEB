import { AFSL_NAME, BRAND_LEGAL, absoluteUrl, getSiteUrl } from './site'

export type BreadcrumbCrumb = { name: string; path: string }

/** Built-in contact details; Site identity (phone, email, head office address) overrides. */
const DEFAULT_NAP = {
  telephone: '+91-9926692487',
  email: 'afrsciences@gmail.com',
  streetAddress: '2nd Floor, 8/1, Moti Tabela, Near Collectorate Office',
  addressLocality: 'Indore',
  addressRegion: 'Madhya Pradesh',
  postalCode: '452007',
  addressCountry: 'IN',
}

export type OrganizationContact = {
  telephone?: string | null
  email?: string | null
  streetAddress?: string | null
  addressLocality?: string | null
  addressRegion?: string | null
  postalCode?: string | null
}

function resolveNap(contact: OrganizationContact = {}) {
  const pick = (value: string | null | undefined, fallback: string) => value?.trim() || fallback
  return {
    telephone: pick(contact.telephone, DEFAULT_NAP.telephone),
    email: pick(contact.email, DEFAULT_NAP.email),
    streetAddress: pick(contact.streetAddress, DEFAULT_NAP.streetAddress),
    addressLocality: pick(contact.addressLocality, DEFAULT_NAP.addressLocality),
    addressRegion: pick(contact.addressRegion, DEFAULT_NAP.addressRegion),
    postalCode: pick(contact.postalCode, DEFAULT_NAP.postalCode),
    addressCountry: DEFAULT_NAP.addressCountry,
  }
}

export function organizationGraph(sameAs: string[] = [], contact?: OrganizationContact) {
  const origin = getSiteUrl()
  const NAP = resolveNap(contact)
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

/** schema.org Person for a resource person profile URL. */
export function resourcePersonSchema(person: {
  name: string
  title?: string | null
  bio?: string | null
  photoUrl?: string | null
  path: string
}) {
  const origin = getSiteUrl()
  return {
    '@type': 'Person',
    '@id': `${absoluteUrl(person.path)}#person`,
    name: person.name,
    url: absoluteUrl(person.path),
    ...(person.title ? { jobTitle: person.title } : {}),
    ...(person.bio ? { description: person.bio } : {}),
    ...(person.photoUrl
      ? { image: person.photoUrl.startsWith('http') ? person.photoUrl : absoluteUrl(person.photoUrl) }
      : {}),
    affiliation: { '@id': `${origin}/#organization` },
  }
}
