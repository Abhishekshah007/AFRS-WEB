import type {
  AboutSectionText,
  AchievementStat,
  CertificationItem,
  LeaderProfile,
} from '@/components/about/types'
const defaultCertifications: CertificationItem[] = [
  {
    icon: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1784837302/afrs/payload/media/AFRS%20certification/1280px-Emblem_of_Madhya_Pradesh.svg_yngo8m.png',
    title: 'Madhya Pradesh Society Registration Act, 1973 ',
  },
  {
    icon: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1784837592/afrs/payload/media/AFRS%20certification/MSME_Logo_ucxp1h.svg',
    title: 'MSME Registration',
  },
  {
    icon: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1784837670/afrs/payload/media/AFRS%20certification/NITI_Aayog_logo.svg_glpk2y.webp',
    title: 'NITI Aayog Recognition',
  },
  {
    icon: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1784838157/afrs/payload/media/AFRS%20certification/Ministry_of_Corporate_Affairs_India.svg_rsgp4g.webp',
    title: 'LLP Registered',
  },
  {
    icon: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1784838269/afrs/payload/media/AFRS%20certification/what-is-iso-9001-compliance_kwgwue.png',
    title: 'ISO 9001:2015 Certified',
  },
]

const defaultUnique = [
  {
    text: 'AFRS integrates forensic research, real casework, and professional training under one platform to provide end-to-end forensic solutions.  ',
    description:
      'AFRS bridges the gap between academic research, practical casework, and professional development, offering a comprehensive approach to forensic science education and practice.',
  },
  {
    text: 'We deliver multi-disciplinary expertise across Fingerprint Science, Questioned Document Examination, Crime Scene Management, Forensic Photography & Videography, and Medico-Legal Correlation.',
    description:
      'AFRS provides a holistic approach to forensic science, combining multiple disciplines to ensure comprehensive understanding and application in real-world scenarios.',
  },
  {
    text: 'All our programs and services are based on real case studies, simulated crime scenes, and practical exposure to medico-legal investigations.',
    description:
      'AFRS emphasizes experiential learning, allowing students and professionals to engage with authentic forensic scenarios, enhancing their practical skills and investigative acumen.',
  },
  {
    text: 'Our procedures strictly adhere to BNS, BNSS, BSA and focus on scientific documentation, chain of custody, and court-admissible evidence.',
    description:
      'AFRS maintains rigorous standards in forensic practice, ensuring that all procedures comply with established scientific and legal protocols, thereby enhancing the credibility and admissibility of evidence in judicial proceedings.',
  },
  {
    text: 'We follow advanced crime scene protocols including scene securing, evidence mapping, trace evidence collection, and contamination control as per ISO/IEC 17025 standards.',
    description:
      'AFRS implements internationally recognized standards for crime scene investigation, ensuring meticulous handling of evidence and adherence to best practices in forensic science.',
  },
  {
    text: 'AFRS emphasises research, method validation, and application of core forensic principles to ensure technically sound and legally defensible analysis.',
    description:
      'AFRS is committed to advancing forensic science through rigorous research, validation of methods, and application of core principles to ensure that all analyses are technically sound and legally defensible.',
  },
  {
    text: 'We act as a knowledge bridge between academia, law enforcement, and the judiciary through expert sessions, workshops, and capacity building.',
    description:
      'AFRS facilitates collaboration and knowledge exchange among academic institutions, law enforcement agencies, and the judiciary, fostering a well-informed and competent forensic community.',
  },
  {
    text: 'We maintain NABL-aligned SOPs with quality assurance and proficiency testing to uphold technical accuracy and legal integrity in every case.',
    description:
      'AFRS ensures that all procedures meet the highest standards of quality and accuracy, maintaining compliance with NABL requirements and promoting legal integrity in forensic analysis.',
  },
]

const defaultActivities = [
  {
    text: 'Certificate programmes and short-term forensic courses',
    description: 'Structured learning pathways for students and working professionals.',
  },
  {
    text: 'Crime scene and laboratory internship placements',
    description: 'Practical exposure under supervision in real forensic environments.',
  },
  {
    text: 'Forensic consultancy for agencies and legal teams',
    description: 'Expert support for investigations, examinations, and case strategy.',
  },
  {
    text: 'Workshops, webinars, national and  international conferences',
    description: 'Regular platforms for knowledge exchange and professional networking.',
  },
  {
    text: 'Published research and collaborative investigations',
    description: 'Contributions to forensic science through applied research and publications.',
  },
  {
    text: 'Refresher Courses/Training on Forensic Perspectives to Investigation officers of State Police, Public Prosecutors/Lawyers, Vigilance officers of Banks and PSUs.',
    description: 'Specialized training sessions to enhance investigative and legal competencies.',
  },
  {
    text: 'Forensic Science Internship & Training Programmes (Online & Offline Mode)',
    description:
      'Hands-on training opportunities for students and professionals in forensic science.',
  },
  {
    text: 'Dissertation for UG & PG Students',
    description: 'Support for academic research projects and thesis work in forensic science.',
  },
  {
    text: 'Ambassadors, Volunteership and Membership Programs',
    description:
      'Engagement opportunities for students and professionals to contribute to AFRS initiatives.',
  },
]

const defaultAchievements: AchievementStat[] = [
  { value: '500+', label: 'Members', tone: 'blue', numericEnd: 500, suffix: '+' },
  { value: '400+', label: 'Students', tone: 'purple', numericEnd: 400, suffix: '+' },
  { value: '95+', label: 'Events', tone: 'orange', numericEnd: 95, suffix: '+' },
  { value: '1', label: 'National Network', tone: 'green', numericEnd: 1, suffix: '' },
  { value: '1000+', label: 'Followers', tone: 'red', numericEnd: 1000, suffix: '+' },
]

const defaultSectionText: AboutSectionText = {
  heroEyebrow: 'About AFRS',
  aboutHeading: 'About AFRS',
  aboutDescription1:
    'Applied Forensic Research Sciences (AFRS) is a multidisciplinary organization dedicated to advancing forensic science through education, research, training, and professional development. Recognized by MSME, NITI Aayog, and ISO 9001:2015 certified, AFRS fosters innovation, collaboration, and knowledge exchange in the forensic community.',
  aboutDescription2:
    'AFRS engages with a diverse range of domains — including traditional forensic sciences, digital forensics, forensic medicine, psychology, criminology and legal studies. Our objective is to empower individuals through quality education, promote a culture of scientific inquiry and nurture a community grounded in integrity, objectivity and academic excellence. We emphasize accessible, inclusive and practical-oriented learning, enabling learners to understand real-world forensic challenges with clarity and competence.',
  founderMessage:
    'At AFRS, we believe that forensic science is far more than a scientific discipline — it is a cornerstone of truth, justice, and public confidence. The rapidly evolving nature of crime, technology, and legal systems demands continuous innovation, professional competence, and scientific excellence. AFRS was established to address this need by creating a platform that integrates research, education, professional development, and collaborative engagement. Our vision extends beyond conventional learning. We aspire to build a community that inspires critical thinking, scientific inquiry, ethical responsibility, and professional leadership. Through our initiatives, we aim to contribute meaningfully to the advancement of forensic science while empowering individuals and institutions to achieve excellence in their respective fields. We invite professionals, researchers, students, and organizations worldwide to join us in shaping the future of forensic science.',
  visionBody:
    'At Applied Forensic Research Sciences (AFRS), our vision is to be a trusted, credible and inspiring leader in the field of forensic education and research—one that enables individuals to achieve both their immediate learning objectives and long-term professional aspirations. We are committed to providing high-quality academic resources, hands-on training, expert consultancy and accessible learning opportunities that create meaningful and lasting impact.',
  missionBody:
    'At Applied Forensic Research Sciences (AFRS), our mission is to empower individuals with a comprehensive and practical understanding of forensic science while increasing meaningful awareness of the diverse and continuously evolving nature of crime globally. We are dedicated to bridging the gap between education, research and real-world practice by fostering a collaborative platform where students, professionals, academicians, industries and other stakeholders can engage, share knowledge, and contribute to the advancement of forensic science and justice.',
  purposeBody:
    'As India’s first registered student-centered organization dedicated exclusively to Forensic Science, Applied Forensic Research Sciences (AFRS) was established with the vision of building a vibrant, inclusive, and dynamic learning ecosystem for students and professionals in the field. Our purpose is to create meaningful pathways for academic growth, practical exposure and professional development.',
  heroCtaLabel: 'Download Society Profile',
  heroCtaHref: '#vision',
  heroImageAlt: 'AFRS forensic research laboratory',
  visionBadge: 'Vision',
  visionTitle: 'Our Vision',
  visionHighlight: 'Science-led justice through rigorous forensic methodology.',
  visionImageAlt: 'Digital forensic analysis concept',
  missionBadge: 'Mission',
  missionTitle: 'Our Mission',
  missionHighlight: 'Practical training aligned with real investigation workflows.',
  missionImageAlt: 'Forensic investigators at a crime scene',
  purposeBadge: 'Purpose',
  purposeTitle: 'Our Purpose',
  purposeHighlight: 'Ethical practice and transparency in every examination.',
  purposeImageAlt: 'Forensic laboratory precision',
  leadershipTitle: 'Leadership Team',
  leadershipSubtitle:
    'Meet the visionaries shaping forensic education, research, and professional excellence at AFRS.',
  committeeTitle: 'Executive Committee & Members',
  committeeSubtitle:
    'The dedicated team driving operations, governance, and community initiatives.',
  certificationsTitle: 'Certification and Recognition',
  certificationsSubtitle:
    'AFRS maintains rigorous standards through accredited programmes, laboratory protocols, and professional memberships recognized across the forensic science community.',
  valuesTitle: 'What Sets AFRS Apart',
  valuesSubtitle:
    'Our unique strengths and core activities that define how we serve students, professionals, and institutions.',
  uniqueTitle: 'What Makes Us Unique',
  uniqueSubtitle: 'Differentiators that shape our forensic education and research ecosystem.',
  activitiesTitle: 'Our Core Activities',
  activitiesSubtitle:
    'Programmes and services that translate forensic science into real-world impact.',
  expertiseTitle: 'Our Expertise',
  expertiseSubtitle:
    'Multidisciplinary capabilities across forensic domains — from crime scene to courtroom.',
  expertiseItems: [
    'Digital & Cyber Forensics',
    'Audio and Video Forensics',
    'Questioned Document Examination',
    'Handwriting & Signature Analysis',
    'Fingerprint Examination',
    'Crime Scene Investigation',
    'Forensic Photography & Imaging',
    'Research Methodology',
    'Expert Witness Services',
    'Forensic Consultation & Advisory Services',
    'Capacity Building & Professional Training',
  ],
  whyChooseItems: [
    'Student-centric and affordable learning opportunities',
    'Exposure to multidisciplinary areas of forensic science',
    'Guidance from experienced academicians and professionals',
    'Focus on practical understanding through case discussions and interactive sessions',
    'Opportunities for academic networking and collaborative learning',
    'Encouragement for research and scientific writing',
    'Commitment to ethical and evidence-based practices',
    'Regular educational activities aimed at skill development and professional growth',
  ],
  whyChooseTitle: 'Why Choose AFRS',
  whyChooseSubtitle:
    'The practical, ethical, and research-driven advantage behind our programmes and consultancy.',
  pillarsTitle: 'Research, Quality & Partnerships',
  pillarsSubtitle:
    'How AFRS strengthens forensic science through evidence-based research, ethical practice, and collaborative networks.',
  qualityEthicsTitle: 'Quality & Ethics',
  qualityEthicsEyebrow: 'Standards',
  qualityEthicsItems: [
    'AFRS adheres to ISO/IEC 17025 standards and follows NABL-aligned SOPs to ensure technical competence, traceability, and reproducibility of all forensic analyses.',
    'Strict chain of custody protocols are maintained from evidence collection to final reporting to preserve integrity and ensure legal admissibility under BSA and BNSS.',
    'All casework follows principles of contamination control, documentation, and peer review to minimize error rates and uphold scientific defensibility in court.',
    'AFRS operates on the highest standards of forensic ethics, including objectivity, impartiality, confidentiality, and avoidance of bias or conflict of interest.',
    'Our experts are committed to scientific integrity and provide opinions based solely on empirical data, observation, and validated methodology without external influence.',
    'We ensure data security and privacy of all case materials and reports, with restricted access and secure storage as per legal and professional guidelines.',
    'Continuous training, competency assessment, and adherence to a code of conduct ensure that all personnel uphold professional accountability and ethical responsibility.',
  ],
  researchItems: [
    'Cultivating research awareness and scientific inquiry among students and forensic professionals to promote evidence-based practice.',
    'Providing mentorship in scientific writing, peer-reviewed publication, and technical documentation aligned with court-admissible standards.',
    'Facilitating critical review of case studies, research articles, and medico-legal discussions to strengthen analytical and interpretive skills.',
    'Ensuring exposure to emerging forensic technologies including digital forensics, 3D crime scene reconstruction, AI-driven pattern analysis, and advanced instrumental techniques in trace evidence.',
    'Promoting interdisciplinary collaboration and knowledge exchange across Fingerprint Science, Questioned Document Examination, Medico-Legal Sciences, and Criminalistics for innovative research outcomes.',
    'Conducting method validation, proficiency testing, and quality assurance studies to ensure reliability, reproducibility, and legal defensibility of forensic procedures as per ISO/IEC 17025 standards.',
    'Exploring the impact of BNS, BNSS, and BSA on scientific evidence handling, chain of custody, and admissibility to align research with contemporary legal frameworks.',
  ],
  researchTitle: 'Research Focus',
  researchEyebrow: 'Innovation',
  partnershipsTitle: 'Partnerships',
  partnershipsEyebrow: 'Collaboration',
  partnershipItems: [
    'Universities and academic institutions',
    'Research organizations',
    'Government bodies',
    'Professional associations',
    'Industry stakeholders',
    'International collaborators',
  ],
  pillarProofLabels: [
    'AFRS - Science in Service of Justice',
    'AFRS - Committed to Quality, Guided by Ethics, Driven by Science',
    'AFRS - Advancing Forensic Science Through Research and Innovation',
  ],
  membershipTitle: 'Membership Plans',
  membershipSubtitle:
    'AFRS Membership is designed to create a vibrant community of students, researchers, professionals, academicians, and institutions committed to the advancement of forensic science.\nMembership provides opportunities for professional networking, knowledge sharing, collaborative research, leadership development, and continued engagement with emerging trends and best practices.\nAFRS provides the following types of membership:',
  membershipCtaLabel: "Let's Talk 💬",
  membershipAdvantageEyebrow: 'Why AFRS?',
  membershipAdvantageTitle: 'The membership advantage',
  futureRoadmapItems: [
    'Establishment of advanced research initiatives',
    'Expansion of national and international collaborations',
    'Development of specialized professional certification programmes',
    'Promotion of interdisciplinary scientific research',
    'Strengthening forensic capacity-building initiatives',
    'Advancement of technology-driven forensic solutions',
  ],
  roadmapTitle: 'Future Roadmap',
  roadmapSubtitle:
    'What AFRS is building next for forensic education, research, and professional excellence.',
  roadmapEyebrow: '2026 & Beyond',
  roadmapCardTitle: 'Building the next generation of forensic science',
  roadmapCardBody:
    'Our roadmap focuses on research depth, international collaboration, and technology-led forensic capacity building across India.',
  awardsTitle: 'Awards & Recognition',
  awardsSubtitle: 'Celebrating excellence in forensic education, research, and community impact.',
  awardsCallout: 'Built for award-winning forensic research and training.',
  awardsImageAlt1: 'AFRS laboratory research',
  awardsImageAlt2: 'AFRS training session',
  awardsImageAlt3: 'AFRS team recognition',
  membershipReasons: [
    'Conduct national/international workshops monthly to grow knowledge and exchange views.',
    'Run research/review paper competitions, workshops, and publication support for UGC & ISBN resources.',
    'Enable members to organize events, seminars, and courses under their own name with certificates and expert signatures.',
    'Offer career guidance, counselling, and college recommendations tailored to individual interests.',
    'Provide expert mentorship from professors, laboratory scientists, and advisory committee members.',
  ],
  certifications: defaultCertifications,
  uniqueItems: defaultUnique,
  activityItems: defaultActivities,
  membershipPlans: [
    {
      title: 'Professional Membership',
      description:
        'Annual membership for professionals seeking to enhance their forensic expertise and stay updated with the latest advancements in the field.',
      href: '/contact',
      badge: 'Best Value',
      dark: true,
    },
    {
      title: 'Senior Membership',
      description:
        'Annual membership for professionals and students seeking a structured forensic development pathway.',
      href: '/contact',
      badge: 'Popular',
      dark: false,
    },
    {
      title: 'Academic Department Membership',
      description:
        'Annual membership for academic departments and institutions committed to advancing forensic science education and research.',
      href: '/contact',
      badge: 'Popular',
      dark: false,
    },
  ],
}

const fallbackLeaders: LeaderProfile[] = [
  {
    id: '1',
    name: 'Mr. Rakesh Mia',
    designation: 'Founder, AFRS',
    bio: 'Specialized in analytical forensics, evidence interpretation, and academic mentoring.',
    initials: 'RM',
  },
  {
    id: '2',
    name: 'Mr. Vijay',
    designation: 'Co-Founder, AFRS',
    bio: 'Focused on practical case workflows, documentation standards, and lab methodology.',
    initials: 'VJ',
  },
]

const fallbackCommittee: LeaderProfile[] = [
  {
    id: 'megha-jain',
    name: 'Ms. Megha Jain',
    designation: 'Secretary',
    initials: 'MJ',
    photoUrl:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1763141455/xpvpfqfee6ppp875xdd5.jpg',
    bio: 'Managing administrative excellence and organizational correspondence.',
  },

  {
    id: 'shrutika-sagnal',
    name: 'Dr. Shrutika Singla',
    designation: 'Joint Secretary',
    initials: 'SS',
    photoUrl:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1762258621/WhatsApp_Image_2025-11-04_at_12.37.51_AM_h1kedk.jpg',
    bio: 'Supporting operations and coordinating departmental activities.',
  },
  {
    id: 'abhishek-shah',
    name: 'Mr. Abhishek Shah',
    designation: 'Treasurer',
    initials: 'AS',
    photoUrl:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1762611909/b9xixjf0rlnquhherrh5.jpg',
    bio: 'Overseeing financial health and resource allocation for projects.',
  },
  {
    id: 'ayushi-mittal',
    name: 'Ms. Ayushi Mittal',
    designation: 'Member',
    initials: 'AM',
    photoUrl:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1784832632/afrs/payload/media/ChatGPT_Image_Jul_23_2026_11_18_28_PM_jtafxd.png',
    bio: 'Contributing to research initiatives and academic collaborations.',
  },
  {
    id: 'sanskriti-rani-sharma',
    name: 'Ms. Sanskriti Rani Sharma',
    designation: 'Member',
    initials: 'SRS',
    photoUrl:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1784832850/afrs/payload/media/WhatsApp_Image_2026-07-22_at_10.08.07_PM_prkqs8.jpg',
    bio: 'Engaging in community outreach and educational programme development.',
  },
]

export {
  defaultAchievements,
  defaultActivities,
  defaultCertifications,
  defaultSectionText,
  defaultUnique,
  fallbackCommittee,
  fallbackLeaders,
}
