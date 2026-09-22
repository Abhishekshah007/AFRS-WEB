export type AdminShortcut = {
  href: string
  title: string
  blurb: string
}

export type AdminDashboardSection = {
  title: string
  hint: string
  items: AdminShortcut[]
}

export const ADMIN_DASHBOARD_SECTIONS: AdminDashboardSection[] = [
  {
    title: 'Start here',
    hint: 'Site-wide details that appear on every page.',
    items: [
      {
        href: '/admin/globals/siteSettings',
        title: 'Site identity',
        blurb: 'Institute name, logo, phone, email, address, and visitor count.',
      },
      {
        href: '/admin/globals/headerSettings',
        title: 'Header & navigation',
        blurb: 'Top bar, menus, and the links visitors use to move around the site.',
      },
      {
        href: '/admin/globals/footerSettings',
        title: 'Footer',
        blurb: 'Footer about text, link columns, and copyright line.',
      },
    ],
  },
  {
    title: 'Page copy',
    hint: 'Edit the words and hero images on the main public pages.',
    items: [
      {
        href: '/admin/globals/homePage',
        title: 'Home page',
        blurb: 'Hero, section headings, notice-board titles, and FAQs.',
      },
      {
        href: '/admin/globals/aboutPage',
        title: 'About page',
        blurb: 'Story, vision, mission, and other About section copy.',
      },
      {
        href: '/admin/globals/servicesPage',
        title: 'Services page (AFSL)',
        blurb: 'Laboratory services landing page copy, kits, and research lists.',
      },
      {
        href: '/admin/collections/aboutCertifications',
        title: 'Certifications',
        blurb: 'Recognition cards shown on the About page.',
      },
    ],
  },
  {
    title: 'Daily content',
    hint: 'Things you add or update often. Unpublished items stay hidden on the website.',
    items: [
      {
        href: '/admin/collections/notices',
        title: 'Notices',
        blurb: 'Admissions, results, and official announcements on the notice board.',
      },
      {
        href: '/admin/collections/articles',
        title: 'Articles',
        blurb: 'Student Hub articles, guides, and news posts.',
      },
      {
        href: '/admin/collections/galleryItems',
        title: 'Gallery',
        blurb: 'Photos for the gallery hubs and service pages.',
      },
      {
        href: '/admin/collections/testimonials',
        title: 'Testimonials',
        blurb: 'Quotes from students, partners, and clients.',
      },
      {
        href: '/admin/collections/services',
        title: 'Service listings',
        blurb: 'Individual forensic service pages (title, images, body copy).',
      },
      {
        href: '/admin/collections/scientists',
        title: 'Laboratory members',
        blurb: 'People shown on AFSL Services and Home expert sections.',
      },
      {
        href: '/admin/collections/impactStats',
        title: 'Impact numbers',
        blurb: 'Headline statistics such as students trained or cases handled.',
      },
      {
        href: '/admin/collections/partnersLogo',
        title: 'Partner logos',
        blurb: 'Organisation logos in the partners strip.',
      },
    ],
  },
  {
    title: 'Events, courses & registrations',
    hint: 'Create programmes, then review who signed up.',
    items: [
      {
        href: '/admin/collections/events',
        title: 'Events',
        blurb: 'Workshops, webinars, and conferences shown on the site.',
      },
      {
        href: '/admin/globals/programmesCatalog',
        title: 'Courses catalog',
        blurb: 'Education and training programme cards and categories.',
      },
      {
        href: '/admin/globals/registrationForm',
        title: 'Course registration form',
        blurb: 'Form fields and payment instructions for course sign-up.',
      },
      {
        href: '/admin/collections/resourcePersons',
        title: 'Resource persons',
        blurb: 'Faculty and experts listed on the programmes pages.',
      },
      {
        href: '/admin/collections/eventRegistrations',
        title: 'Event registrations',
        blurb: 'People who registered for a workshop or conference.',
      },
      {
        href: '/admin/collections/courseRegistrations',
        title: 'Course registrations',
        blurb: 'People who registered for education or training programmes.',
      },
    ],
  },
  {
    title: 'Student Hub',
    hint: 'Exam prep and career guidance pages.',
    items: [
      {
        href: '/admin/globals/studentHubContent',
        title: 'Student Hub pages',
        blurb: 'Academic resources, UGC-NET / CUET / FACT copy, and achievers.',
      },
    ],
  },
  {
    title: 'Inbox & system',
    hint: 'Messages from the website, plus files and staff logins.',
    items: [
      {
        href: '/admin/collections/contactMessages',
        title: 'Website inquiries',
        blurb: 'Contact, consult, and other form submissions from the public site.',
      },
      {
        href: '/admin/collections/media',
        title: 'Media library',
        blurb: 'Upload photos, logos, and documents used across the site.',
      },
      {
        href: '/admin/collections/users',
        title: 'Staff accounts',
        blurb: 'Who can sign in. Super admins manage roles.',
      },
    ],
  },
]
