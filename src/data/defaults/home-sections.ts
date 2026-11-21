/**
 * Current copy for Home page sections that used to be hard-coded in components.
 * It now lives in the CMS (Home page → section tabs). These values pre-fill the CMS
 * (migration 20261121_150000_cms_page_content) and are shown if a field is left empty.
 */

export const defaultTrainingSection = {
  eyebrow: 'Specialized Courses',
  title: 'Forensic Training Programs',
  subtitle: 'Specialized certification courses for future forensic professionals',
  ctaLabel: 'View All Programs',
  ctaHref: '/courses',
  items: [
    { icon: '🎯', title: 'Crime Scene Investigation Training' },
    { icon: '🌀', title: 'Fingerprint Examination Course' },
    { icon: '🧬', title: 'Forensic Biology & Serology Training' },
    { icon: '📄', title: 'Questioned Document Examination' },
    { icon: '💻', title: 'Multimedia & Digital Forensics' },
  ],
}

export const defaultInternshipSection = {
  eyebrow: 'Career Catalyst',
  title: 'Forensic Science Internship Program in India',
  description:
    'Join our highly structured internship programs designed to provide genuine practical exposure. Gain first-hand experience in professional laboratory settings and field investigations under the supervision of senior scientists.',
  features: [
    'Crime Scene Investigation Training',
    'Advanced Fingerprint Analysis',
    'Digital Forensics & Data Recovery',
    'Document & Handwriting Analysis',
  ],
  ctaLabel: 'Apply Now',
  ctaHref: '/courses',
  imageUrl:
    'https://res.cloudinary.com/drrzakkgo/image/upload/v1789644470/afrs/payload/media/AFRS%20SITE%20IMAGEs/HomeScreenAFSLAboutSection_j2xg1v.png',
  imageAlt: 'Forensic Internship Program',
}

export const defaultVideoSection = {
  title: 'Exploring the Future of Forensics',
  body: 'Explore our latest research breakthroughs and educational highlights. At AFRS, we use state-of-the-art technology to solve complex problems and train the next generation of forensic experts.\n\nWatch our introductory video to learn more about our mission and the impact we make globally.',
  ctaLabel: 'Explore Our Courses',
  ctaHref: '/courses',
  videoUrl: 'https://res.cloudinary.com/drrzakkgo/video/upload/Afrs_Final_Website_Reel_kokbnp.mp4',
  posterUrl:
    'https://res.cloudinary.com/drrzakkgo/video/upload/so_0,w_960,q_auto,f_jpg/Afrs_Final_Website_Reel_kokbnp.jpg',
}

export const defaultImpactSection = {
  title: 'The AFRS Impact',
  subtitle:
    'Our holistic approach ensures every student and professional gains more than just knowledge.',
  items: [
    {
      icon: 'brain',
      title: 'Skill Development',
      description:
        'Gain hands-on expertise in methodologies like DNA profiling and digital forensics.',
    },
    {
      icon: 'briefcase',
      title: 'Career Guidance',
      description: 'Personalized mentorship to navigate career paths in private and govt sectors.',
    },
    {
      icon: 'microscope',
      title: 'Practical Exposure',
      description: 'Bridge theory with access to state-of-the-art laboratory tools and methods.',
    },
    {
      icon: 'network',
      title: 'Mentorship & Networking',
      description: 'Connect with a global community of forensic experts and researchers.',
    },
    {
      icon: 'fileSearch',
      title: 'Real-World Case Studies',
      description: 'Learn from actual forensic cases to understand complex problem-solving.',
    },
    { icon: 'badge', title: 'Recognition', description: 'Earn industry-recognized certifications.' },
  ],
}

export const defaultAfslSection = {
  title: 'Applied Forensic Science Laboratory (AFSL)',
  tagline: 'Scientific. Reliable. Professional.',
  description:
    'Applied Forensic Science Laboratory (AFSL) is committed to delivering reliable, scientific, and evidence-based forensic solutions that support investigations, legal proceedings, research, and professional development. Our multidisciplinary team provides expert forensic examination, analytical services, consultation, and training across various domains of forensic science.',
  cards: [
    { icon: '🕵️', title: 'Crime Scene Investigation & Management' },
    { icon: '🔍', title: 'Fingerprint Examination & Analysis' },
    { icon: '📄', title: 'Questioned Document & Signature Analysis' },
    { icon: '💻', title: 'Multimedia & Digital Forensics' },
    { icon: '⚖️', title: '65B IEA Certificate (63(4)(C) BSA)' },
    { icon: '📋', title: 'Forensic Consultancy & Expert Opinion' },
  ],
  offersTitle: 'Forensic Science Training, Internship & Research Programs',
  offersDescription:
    'AFSL provides structured internship programs designed to give students practical exposure in forensic science disciplines — including crime scene investigation, fingerprint analysis, digital forensics, and more.',
  offersPrimaryLabel: 'Explore Training Programs',
  offersPrimaryHref: '/courses',
  offersSecondaryLabel: 'Apply for Internship',
  offersSecondaryHref: '/internship',
  offersImageUrl:
    'https://res.cloudinary.com/drrzakkgo/image/upload/v1789656204/afrs/payload/media/AFRS%20SITE%20IMAGEs/HomeScreenAFSLInternshipSection_o6gxcy.png',
  offersImageAlt: 'AFRS forensic training session',
  contactEyebrow: 'Get In Touch',
  contactDescription:
    'Need professional forensic assistance, expert opinion, training opportunities, or research collaboration? Contact AFSL today and connect with our forensic experts.',
  contactPrimaryLabel: 'Contact AFSL',
  contactPrimaryHref: '/contact',
  contactSecondaryLabel: 'Explore Our Services',
  contactSecondaryHref: '/services',
  contactImageUrl:
    'https://res.cloudinary.com/drrzakkgo/image/upload/v1789644470/afrs/payload/media/AFRS%20SITE%20IMAGEs/HomeScreenAFSLAboutSection_j2xg1v.png',
  contactImageAlt: 'Connect with AFRS forensic experts',
}

export const defaultQuickLinksSection = {
  title: 'Quick Links',
  subtitle: 'Access our resources and stay updated.',
  items: [
    { label: 'Virtual Museum', href: 'https://nfsmuseums.com/', icon: 'museum' },
    { label: 'Youtube Channel', href: 'https://www.youtube.com/@afrs', icon: 'youtube' },
    { label: 'E-Library', href: '/articles', icon: 'library' },
    { label: 'Blog', href: 'https://appliedforensicresearchscience.blogspot.com/', icon: 'blog' },
  ],
}

/** About page "Who it serves" table (was hard-coded in TargetAudience.tsx). */
export const defaultAudienceSection = {
  eyebrow: 'Who it serves',
  title: 'A platform built for every stage of forensic learning and practice',
  badge: '10+ professional groups',
  rows: [
    ['Students', 'Build a strong foundation in forensic science principles and practical learning.'],
    ['Research Scholars', 'Explore advanced research methods and academic pathways with confidence.'],
    ['Faculty Members', 'Gain skills that support teaching, training, and professional mentorship.'],
    ['Forensic Professionals', 'Connect theory to real-world investigative and case-based practice.'],
    ['Police Persons', 'Strengthen evidence handling, reporting, and operational understanding.'],
    ['Lawyers', 'Develop legal, ethical, and courtroom-ready perspectives for professional growth.'],
    [
      'Medical Professionals',
      'Bridge forensic science with medical and clinical decision-making environments.',
    ],
    ['Cyber Security Professionals', 'Advance digital, cyber-enabled, and modern forensic competencies.'],
    [
      'Government Employees',
      'Support public-sector roles through policy, compliance, and governance readiness.',
    ],
    ['Investigators', 'Enhance investigative reasoning and analytical capability in fieldwork.'],
  ].map(([audience, why]) => ({ audience, why })),
}
