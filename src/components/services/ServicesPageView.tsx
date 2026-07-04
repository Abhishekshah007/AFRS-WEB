'use client'

// import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Award,
  BadgeCheck,
  Beaker,
  Box,
  BriefcaseBusiness,
  ClipboardList,
  FileSearch,
  Fingerprint,
  FlaskConical,
  Gavel,
  GraduationCap,
  MapPin,
  Microscope,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react'
// import { Modal } from '@/components/ui/Modal'
import { LabInquiryForm } from '@/components/services/LabInquiryForm'
import type { CatalogItem, DirectorateMember, SiteContact } from '@/components/services/types'
import AFRSLogo from '../../../public/assets/afsl-logo.png'

const CONTAINER = 'mx-auto w-full max-w-[1120px] px-6 sm:px-8'

const certifications = [
  { label: '11+', caption: 'Certifications' },
  { label: 'ISO', caption: 'ISO Certified' },
  { label: '24/7', caption: 'Forensic Access' },
]

const kitCards = [
  {
    title: 'Crime Scene Investigation Kit',
    icon: Box,
  },
  {
    title: 'Latent Fingerprint Development Kit',
    icon: Fingerprint,
  },
  {
    title: 'Fingerprint Collection Kit',
    icon: ClipboardList,
  },
  {
    title: 'Questioned Document Examination Kit',
    icon: FileSearch,
  },
  {
    title: 'Fire and Arson Investigation Kit',
    icon: FlaskConical,
  },
  {
    title: 'High Intensity Light Source Kit (ALS)',
    icon: Beaker,
  },
  {
    title: 'Biological Evidence Collection Kit',
    icon: Users,
  },
]

const legalLinks = [
  'Medico Legal Property Report',
  'Cross Examination Training',
  'Research & Lab Projects',
  'Expert Opinion (CrPC 45A)',
  'Internship & Training',
  'Insurance Forensics Panel',
]

const researchItems = [
  {
    num: '01',
    title: 'Guidelines & Protocols',
    desc: 'Advanced evidence operations workbook and investigation protocols',
  },
  {
    num: '02',
    title: 'Research & Development',
    desc: 'Research-ready analytical workflows for students and professionals',
  },
  {
    num: '03',
    title: 'Case Reporting',
    desc: 'Case reporting guides and court submission documentation',
  },
]

// const clientCategories = [
//   {
//     id: 'law-enforcement',
//     label: 'Law Enforcement Agencies',
//     description: 'State & Central Police Departments, CBI, and investigative bureaus',
//     icon: ShieldCheck,
//     count: '15+',
//     clients: [
//       { name: 'Mumbai Police', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/mumbai_police_j9k2l3.png' },
//       { name: 'Delhi Police', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/delhi_police_m5n8o1.png' },
//       { name: 'Central Bureau of Investigation', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/cbi_p2q5r8.png' },
//       { name: 'State Police - Maharashatra', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/maharashatra_police_s9t2u5.png' },
//       { name: 'State Police - Gujarat', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/gujarat_police_v6w3x9.png' },
//       { name: 'State Police - Rajasthan', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/rajasthan_police_y7z1a4.png' },
//     ],
//   },
//   {
//     id: 'judiciary',
//     label: 'Judiciary & Legal Bodies',
//     description: 'District Courts, High Courts, and legal institutions across India',
//     icon: Gavel,
//     count: '50+',
//     clients: [
//       { name: 'Supreme Court of India', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/supreme_court_b8c3d6.png' },
//       { name: 'High Court - Mumbai', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/mumbai_hc_e2f7g1.png' },
//       { name: 'High Court - Delhi', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/delhi_hc_h5i9j2.png' },
//       { name: 'District Court - Indore', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/indore_dc_k3l6m8.png' },
//       { name: 'National Commission for Women', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/ncw_n9o4p7.png' },
//       { name: 'Law Institute of India', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/law_institute_q5r8s2.png' },
//     ],
//   },
//   {
//     id: 'insurance-corporate',
//     label: 'Insurance & Corporate',
//     description: 'Insurance companies and corporate entities for fraud investigation',
//     icon: BriefcaseBusiness,
//     count: '25+',
//     clients: [
//       { name: 'HDFC Insurance', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/hdfc_insurance_t1u4v6.png' },
//       { name: 'ICICI Lombard', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/icici_lombard_w7x2y9.png' },
//       { name: 'Bajaj Insurance', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/bajaj_insurance_z3a8b5.png' },
//       { name: 'Reliance Corporation', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/reliance_c6d1e4.png' },
//       { name: 'TCS', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/tcs_f9g2h7.png' },
//       { name: 'Infosys', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/infosys_i5j8k3.png' },
//     ],
//   },
//   {
//     id: 'educational',
//     label: 'Educational Institutions',
//     description: 'Universities and forensic science programs for training and research',
//     icon: GraduationCap,
//     count: '40+',
//     clients: [
//       { name: 'University of Delhi', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/du_l1m4n6.png' },
//       { name: 'Mumbai University', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/mumbai_uni_o7p2q9.png' },
//       { name: 'Gujarat University', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/guj_uni_r5s8t3.png' },
//       { name: 'Rajasthan University', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/raj_uni_u1v4w7.png' },
//       { name: 'Chandigarh University', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/chandigarh_uni_x9y2z6.png' },
//       { name: 'Amity University', logo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/amity_uni_a3b6c1.png' },
//     ],
//   },
// ]

const defaultServices = [
  {
    id: 'csi',
    title: 'CSI Services',
    slug: 'csi-services',
    desc: 'Comprehensive field processing, evidence documentation, and specialized examination of complex crime scene scenarios using advanced 3D scanning and photography.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008139/afrs-2026-assets/csi_service_oqxdnf.png',
  },
  {
    id: 'fingerprint',
    title: 'Fingerprint Analysis',
    slug: 'fingerprint-analysis',
    desc: 'Latent print development using chemical and fluorescent methods, international certification procedures, and expert comparison using AFIS-grade standards.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008138/afrs-2026-assets/fingerprint_services_zfjbcd.png',
  },
  {
    id: 'documents',
    title: 'Questioned Documents',
    slug: 'questioned-documents',
    desc: 'Detailed forensic examination of handwriting, signatures, ink, paper, and digital alterations using ESDA and electrostatic detection apparatus for uncompromised accuracy.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783008310/afrs-2026-assets/questionedDocument_services_mudcgv.png',
  },

  // Audio and Video Examination
  {
    id: 'audio-video',
    title: 'Audio & Video Forensics',
    slug: 'audio-video-forensics',
    desc: 'Expert analysis of audio and video evidence, including enhancement, authentication, and forensic reporting for legal proceedings.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020382/afrs-2026-assets/audioVideo_service_dtefco.png',
  },

  // Image & Photography Examination
  {
    id: 'image-photography',
    title: 'Image & Photography Forensics',
    slug: 'image-photography-forensics',
    desc: 'Forensic examination of digital and analog images, including metadata analysis, image authentication, and enhancement for investigative and legal purposes.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020383/afrs-2026-assets/image_service_bc6dzv.png',
  },

  // Digital Forensics
  {
    id: 'digital-forensics',
    title: 'Digital Forensics',
    slug: 'digital-forensics',
    desc: 'Comprehensive analysis of digital devices, data recovery, and cyber investigation to support legal cases and corporate security.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020382/afrs-2026-assets/digitalEvidence_zmscd8.png',
  },

  // Insurance Forensic Investigation

  {
    id: 'insurance-forensics',
    title: 'Insurance Forensic Investigation',
    slug: 'insurance-forensic-investigation',
    desc: 'Specialized forensic services for insurance claims, including fraud detection, accident reconstruction, and evidence analysis to support claim validation.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020382/afrs-2026-assets/insurance_service_c0oydn.png',
  },

  // Forensic Biology & Serology Examination
  {
    id: 'forensic-biology-serology',
    title: 'Forensic Biology & Serology Examination',
    slug: 'forensic-biology-serology-examination',
    desc: 'Biological evidence analysis, including DNA profiling, serological testing, and forensic pathology to support criminal investigations and legal proceedings.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020381/afrs-2026-assets/bloodGroupExamination_service_okok85.png',
  },

  // Cyber Security
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    slug: 'cyber-security',
    desc: 'Comprehensive cybersecurity assessments, penetration testing, and digital threat analysis to protect organizational assets and data integrity.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020380/afrs-2026-assets/cyberSecurity_service_rd8wfx.png',
  },

  // Forensic Legal Consultancy
  {
    id: 'forensic-legal-consultancy',
    title: 'Forensic Legal Consultancy',
    slug: 'forensic-legal-consultancy',
    desc: 'Expert legal consultancy services in forensic matters, providing guidance on evidence handling, case strategy, and courtroom presentation.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020375/afrs-2026-assets/forensicLegalCounsult_service_icfveh.png',
  },

  // Medicolegal Consultancy
  {
    id: 'medicolegal-consultancy',
    title: 'Medicolegal Consultancy',
    slug: 'medicolegal-consultancy',
    desc: 'Specialized consultancy in medicolegal cases, offering expert opinions, report preparation, and guidance on medico-legal procedures.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020374/afrs-2026-assets/medicolegalCounsult_service_aojxeq.png',
  },

  // Forensic Expert Opinion (Under 39 BSA)
  {
    id: 'forensic-expert-opinion',
    title: 'Forensic Expert Opinion (Under 39 BSA)',
    slug: 'forensic-expert-opinion',
    desc: 'Provision of expert forensic opinions in accordance with Section 39 of the BSA, supporting legal proceedings and investigative processes.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020374/afrs-2026-assets/expertOpinion_service_x9bmqo.png',
  },
  // Cross Examination
  {
    id: 'cross-examination',
    title: 'Cross Examination Training',
    slug: 'cross-examination-training',
    desc: 'Training programs focused on effective cross-examination techniques for forensic experts, enhancing courtroom performance and credibility.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020373/afrs-2026-assets/crossExamination_service_jrqu4i.png',
  },
  // Training and Internship Program
  {
    id: 'training-internship',
    title: 'Training and Internship Program',
    slug: 'training-internship-program',
    desc: 'Structured training and internship opportunities in forensic science, providing hands-on experience and professional development for students and early-career professionals.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020373/afrs-2026-assets/trainingInternship_service_dsyhmw.png',
  },

  // Research and Project
  {
    id: 'research-project',
    title: 'Research and Project',
    slug: 'research-and-project',
    desc: 'Collaborative research initiatives and project-based learning in forensic science, fostering innovation and practical application of forensic methodologies.',
    banner:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1783020373/afrs-2026-assets/research_service_em2lja.png',
  },
] satisfies CatalogItem[]

type Props = {
  catalogItems: CatalogItem[]
  directors: DirectorateMember[]
  teamMembers: DirectorateMember[]
  site: SiteContact
  totalVisitors: number
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#6d28d9]">
      {children}
    </p>
  )
}

export function ServicesPageView({
  catalogItems,
  directors,
  teamMembers,
  site,
  totalVisitors,
}: Props) {
  // const [selectedCategory, setSelectedCategory] = useState<typeof clientCategories[0] | null>(null)
  const services = catalogItems.length > 0 ? catalogItems : defaultServices
  const serviceOptions = services.map((c) => c.title)
  const people = teamMembers.length ? teamMembers.slice(0, 6) : directors

  return (
    <div className="afsl-page bg-white text-[#071329]">
      <section className="afsl-hero-ui relative overflow-hidden text-white">
        <div className=" absolute inset-0" aria-hidden />
        <div
          className={`${CONTAINER} grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[1fr_470px]`}
        >
          <div className="max-w-[570px]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/55">
              Scientific Assistance Towards Justice
            </p>
            <h1 className="mt-5 text-[44px] font-black leading-[0.98] tracking-[-0.01em] sm:text-[64px] lg:text-[76px]">
              Future-Ready <span className="block text-[#ffbd18]">Forensic</span>
            </h1>
            <p className="mt-7 max-w-[500px] text-[15px] font-medium leading-7 text-white/72">
              The Applied Forensic Science Laboratory (AFSL) integrates high-tech analytical
              methodologies with investigative excellence to serve the modern justice system.
            </p>
            <Link
              href="#service-catalog"
              className="mt-8 inline-flex h-12 items-center rounded-[6px] bg-white px-7 text-[13px] font-extrabold text-[#141a2d] shadow-sm"
            >
              Laboratory Catalog +
            </Link>
          </div>

          <div className="rounded-[22px] bg-[#ded4e8] p-10 shadow-[0_22px_60px_rgba(9,8,24,0.24)]">
            <div className="rounded-[6px] bg-[#222735] px-7 py-5 shadow-xl">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#62c47a]">
                Lab Status
              </p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <p className="text-[12px] font-bold text-[#62c47a]">Operational & Certified</p>
                <ShieldCheck className="h-4 w-4 text-white/35" />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Link
                href="#service-catalog"
                className="rounded-[6px] bg-[#5d20b7] px-7 py-3 text-[12px] font-extrabold text-white shadow-lg shadow-violet-900/25"
              >
                Our Service Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef3f9] py-20">
        <div className={CONTAINER}>
          <div>
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_55px_rgba(33,44,68,0.06)] lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[1fr_480px]">
                <div>
                  <Eyebrow>Scientific Infrastructure</Eyebrow>
                  <h2 className="mt-3 text-[31px] font-black tracking-[-0.01em]">
                    About AFSL Laboratory
                  </h2>
                  <p className="mt-5 max-w-[480px] text-[14px] font-medium leading-7 text-[#536176]">
                    Applied Forensic Science Laboratory (AFSL Services India LLP) is registered with
                    the Ministry of Corporate Affairs (MCA) and MSME, Government of India, and is an
                    ISO 9001:2015 Certified Forensic Science Laboratory. Our training programs
                    bridge the gap between theoretical knowledge and practical forensic application
                    through hands-on, offline learning using advanced forensic instruments in
                    fingerprint analysis, multimedia forensics, questioned document examination, and
                    trace evidence analysis.
                  </p>
                  <p className="mt-5 max-w-[480px] text-[14px] font-medium leading-7 text-[#536176]">
                    Participants gain real-world exposure through supervised autopsy visits,
                    simulated and actual crime scene visits, field investigations, evidence
                    collection, documentation, scientific report writing, and investigative
                    procedures under expert guidance. Our mission is to build practical skills,
                    professional confidence, and industry-ready forensic professionals who can
                    effectively contribute to justice and society.
                  </p>
                  <div className="mt-8 grid max-w-[420px] grid-cols-3 gap-4">
                    {certifications.map((stat) => (
                      <div
                        key={stat.caption}
                        className="border-t border-[#dfe7f2] pt-4 text-center"
                      >
                        <p className="text-[18px] font-black text-[#551dae]">{stat.label}</p>
                        <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#9aa7b8]">
                          {stat.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[330px] rounded-[14px] bg-white shadow-[0_16px_40px_rgba(24,31,43,0.16)]">
                  <Image src={AFRSLogo} alt="AFSL Logo" className="h-full w-full contain-content" />
                  <div className="absolute right-[-16px] top-[-18px] flex h-16 w-16 items-center justify-center rounded-[14px] bg-[#5b1eb2] text-white shadow-xl">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className={CONTAINER}>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <article className="min-h-[285px] rounded-[16px] bg-[#081326] p-8 text-white shadow-[0_18px_45px_rgba(6,14,29,0.18)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                  <Microscope className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-[21px] font-black">Laboratory Vision</h3>
                <p className="mt-4 max-w-[420px] text-[13px] font-medium leading-6 text-white/65">
                  To be a leading forensic science training and research centre, delivering
                  industry-oriented, hands-on education that bridges academic learning with
                  real-world forensic practice. We strive to develop skilled, ethical, and
                  investigation-ready forensic professionals through advanced laboratory training,
                  crime scene exposure, and experiential learning, contributing to excellence in the
                  justice system.
                </p>
                <div className="mt-7 h-1 w-10 rounded-full bg-[#7434d3]" />
              </article>
            </div>
            <div>
              <article className="min-h-[285px] rounded-[16px] border border-[#e5ebf4] bg-[#f8fafd] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#6d28d9] text-white">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-[21px] font-black">Our Mission</h3>
                <p className="mt-4 max-w-[420px] text-[13px] font-medium leading-6 text-[#5e6978]">
                  To provide high-quality, practical forensic education through state-of-the-art
                  laboratory facilities, expert mentorship, autopsy exposure, field investigations,
                  and crime scene training. Our mission is to equip students and professionals with
                  technical expertise, scientific thinking, evidence-handling skills, and
                  professional ethics, preparing them to meet the evolving demands of forensic
                  science and the criminal justice system..
                </p>
                <div className="mt-7 h-1 w-10 rounded-full bg-[#7434d3]" />
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className={CONTAINER}>
          {/* Directorate Section */}
          <div className="mb-24">
            <div className="mb-12 text-center">
              <Eyebrow>Leadership & Expertise</Eyebrow>
              <h2 className="mt-3 text-[36px] font-black leading-tight text-[#071329]">
                Laboratory Directorate
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-[14px] font-medium text-[#687487]">
                Meet the visionary leaders and scientific experts directing the laboratory&apos;s
                operations and research initiatives.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {directors.slice(0, 2).map((person) => (
                <div key={person.name}>
                  <article className="group overflow-hidden rounded-[20px] border border-[#e5ebf4] bg-gradient-to-br from-white to-[#f8fafd] shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition hover:shadow-[0_20px_48px_rgba(109,40,217,0.15)] hover:-translate-y-1">
                    {/* Top gradient bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#6d28d9]" />

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-start gap-6">
                        {/* Photo */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] opacity-0 transition group-hover:opacity-20" />
                          <div className="relative h-24 w-24 overflow-hidden rounded-[16px] border-2 border-[#e5ebf4] bg-[#f8fafd] shadow-md">
                            {person.photo ? (
                              <Image
                                src={person.photo}
                                alt={person.name}
                                fill
                                className="object-cover transition group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6d28d9]/10 to-[#8b5cf6]/10 text-2xl font-black text-[#6d28d9]">
                                {person.initials}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="text-[18px] font-black text-[#071329]">{person.name}</h3>
                          <p className="mt-2 text-[12px] font-black uppercase tracking-[0.16em] text-[#6d28d9]">
                            {person.designation}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#6d28d9]/10 px-3 py-1 text-[11px] font-bold text-[#6d28d9]">
                              <Award className="h-3 w-3" />
                              Expert Certified
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                              <ShieldCheck className="h-3 w-3" />
                              Active
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      {/* <div className="mt-6 border-t border-[#e5ebf4] pt-6">
                        <button className="w-full rounded-[10px] border border-[#6d28d9] bg-white px-4 py-2.5 text-center text-[12px] font-black text-[#6d28d9] transition hover:bg-[#6d28d9] hover:text-white">
                          View Credentials
                        </button>
                      </div> */}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Members Section */}
          <div>
            <div className="mb-12 text-center">
              <Eyebrow>Scientific Team</Eyebrow>
              <h2 className="mt-3 text-[36px] font-black leading-tight text-[#071329]">
                Laboratory Members
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-[14px] font-medium text-[#687487]">
                Dedicated forensic scientists and specialists committed to advancing forensic
                science and justice.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {people.map((person) => {
                return (
                  <div key={person.name}>
                    <article className="group h-full overflow-hidden rounded-[14px] border border-[#e5ebf4] bg-gradient-to-b from-white to-[#f8fafd] shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition hover:shadow-[0_12px_32px_rgba(109,40,217,0.12)] hover:-translate-y-0.5">
                      {/* Top accent line */}
                      <div className="h-0.5 w-full bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-transparent" />

                      <div className="p-4 text-center">
                        {/* Photo */}
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] border border-[#e5ebf4] bg-white overflow-hidden shadow-sm transition group-hover:shadow-md">
                          {person.photo ? (
                            <Image
                              src={person.photo}
                              alt={person.name}
                              width={56}
                              height={56}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6d28d9]/10 to-[#8b5cf6]/10 text-sm font-black text-[#6d28d9]">
                              {person.initials}
                            </div>
                          )}
                        </div>

                        {/* Name */}
                        <h4 className="text-[11px] font-black text-[#071329] line-clamp-2">
                          {person.name}
                        </h4>

                        {/* Designation */}
                        <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#9ba8ba] line-clamp-2">
                          {person.designation}
                        </p>

                        {/* Badge */}
                        <div className="mt-3 inline-block rounded-full bg-[#6d28d9]/10 px-2 py-1 text-[7px] font-black uppercase tracking-[0.08em] text-[#6d28d9]">
                          Active
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>

            {/* Team Stats */}
            <div className="mt-12 grid gap-4 rounded-[18px] bg-gradient-to-r from-[#6d28d9]/5 to-[#8b5cf6]/5 border border-[#e5ebf4] p-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-[28px] font-black text-[#6d28d9]">{people.length}+</p>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#687487]">
                  Team Members
                </p>
              </div>
              <div className="text-center">
                <p className="text-[28px] font-black text-[#8b5cf6]">2+</p>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#687487]">
                  Years Experience
                </p>
              </div>
              <div className="text-center">
                <p className="text-[28px] font-black text-[#6d28d9]">10+</p>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#687487]">
                  Cases Handled
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="service-catalog" className="bg-white py-20">
        <div className={CONTAINER}>
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Core Competence</Eyebrow>
              <h2 className="mt-2 text-[31px] font-black">Forensic Service Catalog</h2>
            </div>
            <div className="hidden items-center gap-5 text-[9px] font-black uppercase tracking-[0.16em] text-[#8c98aa] sm:flex">
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#6d28d9]" /> Analytical
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#c7d0dd]" /> Investigative
              </span>
            </div>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {services.map((item, index) => (
              <div key={item.id}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group block overflow-hidden rounded-[16px] border border-[#dce4ef] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-[185px] overflow-hidden">
                    <Image
                      src={item.banner}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071329]/85 via-[#071329]/12 to-transparent" />
                    <span className="absolute bottom-5 left-5 flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#6d28d9] text-white">
                      {index === 1 ? (
                        <Fingerprint className="h-4 w-4" />
                      ) : index === 2 ? (
                        <FileSearch className="h-4 w-4" />
                      ) : (
                        <Microscope className="h-4 w-4" />
                      )}
                    </span>
                    <h3 className="absolute bottom-5 left-16 right-5 text-[16px] font-black text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="min-h-[92px] text-[12px] font-medium leading-6 text-[#627086]">
                      {item.desc}
                    </p>
                    <span className="mt-5 flex h-10 items-center justify-center rounded-[5px] border border-[#6d28d9] text-[10px] font-black uppercase tracking-[0.12em] text-[#4f1aa0]">
                      View Details +
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div>
            <div className="mt-8 grid gap-8 rounded-[20px] bg-[#081326] p-8 text-white lg:grid-cols-[1fr_2fr] lg:p-10">
              <div>
                <h3 className="text-[25px] font-black leading-tight">Expert Legal Consultancy</h3>
                <p className="mt-4 max-w-[300px] text-[13px] font-medium leading-6 text-white/65">
                  Specialized legal support for judicial and corporate entities.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex rounded-[6px] bg-[#6420c3] px-7 py-3 text-[12px] font-extrabold"
                >
                  Legal Intake
                </Link>
              </div>
              <ul className="grid content-center gap-x-10 gap-y-5 sm:grid-cols-2">
                {legalLinks.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[12px] font-bold text-white/78"
                  >
                    <Gavel className="h-4 w-4 text-[#7434d3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <section className="bg-white py-20">
        <div className={CONTAINER}>
          <div className="text-center">
            <Eyebrow>Trusted Partners</Eyebrow>
            <h2 className="mt-2 text-[34px] font-black">Our Clients & Stakeholders</h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[14px] font-medium leading-6 text-[#687487]">
              AFSL partners with leading law enforcement agencies, judiciary, corporate institutions, and educational organizations across India. Our clients trust our scientific rigor and professional excellence.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.label}
                  onClick={() => setSelectedCategory(category)}
                  className="group rounded-[16px] border border-[#dce4ef] bg-[#f8fafd] p-7 shadow-sm transition hover:shadow-lg hover:-translate-y-1 text-left cursor-pointer hover:bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[10px] bg-[#6d28d9] text-white shadow-md">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <span className="rounded-full bg-[#6d28d9]/10 px-3 py-1 text-[11px] font-black text-[#6d28d9]">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[14px] font-black leading-snug text-[#071329] group-hover:text-[#6d28d9] transition">
                    {category.label}
                  </h3>
                  <p className="mt-3 text-[12px] font-medium leading-5 text-[#687487]">
                    {category.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section> */}

      <section className="bg-[#eef3f9] py-24">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-[740px] text-center">
            <Eyebrow>Proprietary Equipment</Eyebrow>
            <h2 className="mt-2 text-[36px] font-black leading-tight text-[#071329]">
              AFSL Professional Kits
            </h2>
            <p className="mt-4 text-[14px] font-medium leading-6 text-[#687487]">
              Engineered for field professionals and academic researchers. Each kit conforms to
              international forensic standards and is ready for deployment.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {kitCards.map((kit) => {
              const Icon = kit.icon
              return (
                <div key={kit.title}>
                  <article className="group h-full overflow-hidden rounded-[16px] border border-[#dfe7f2] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition hover:shadow-[0_16px_40px_rgba(109,40,217,0.12)] hover:-translate-y-1">
                    {/* Top gradient bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6]" />

                    {/* Content */}
                    <div className="flex h-full flex-col p-7">
                      {/* Icon */}
                      <div className="flex h-16 w-16 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#6d28d9]/10 to-[#8b5cf6]/10 text-[#6d28d9] shadow-sm transition group-hover:shadow-md">
                        <Icon className="h-7 w-7" strokeWidth={1.8} />
                      </div>

                      {/* Title */}
                      <h3 className="mt-6 flex-1 text-[14px] font-black leading-snug text-[#071329]">
                        {kit.title}
                      </h3>

                      {/* CTA */}
                      <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center justify-center rounded-[10px] border border-[#6d28d9] bg-white px-4 py-3 text-center text-[12px] font-black text-[#6d28d9] transition hover:bg-[#6d28d9] hover:text-white w-full"
                      >
                        Request Enquiry
                      </Link>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#071120] py-20 text-white">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1fr]`}>
          <div>
            <div className="space-y-6">
              <h2 className="text-[24px] font-black">Training & Internship</h2>
              {[
                [
                  'Corporate Training',
                  'Bespoke programs for law enforcement, insurance adjusters, and legal firms on evidence preservation and digital threat vectors.',
                  'View Modules +',
                ],
                [
                  'Student & Internships',
                  'Hands-on laboratory experience for aspiring forensic scientists. Accredited programs covering 12 scientific disciplines.',
                  'Apply Now +',
                ],
              ].map(([title, desc, cta], index) => (
                <article
                  key={title}
                  className={`rounded-[8px] bg-[#101d33] p-7 ${index === 0 ? 'border-l-4 border-[#6d28d9]' : 'border-l-4 border-[#10b8f0]'}`}
                >
                  <h3 className="text-[15px] font-black">{title}</h3>
                  <p className="mt-3 max-w-[430px] text-[12px] font-medium leading-6 text-white/58">
                    {desc}
                  </p>
                  <Link
                    href="/courses"
                    className="mt-5 inline-block text-[12px] font-black text-[#b38cff]"
                  >
                    {cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <div>
            <article className="rounded-[10px] bg-[#1d2a47] p-9">
              <h2 className="text-[24px] font-black">Research and Projects</h2>
              <ol className="mt-10 space-y-8">
                {researchItems.map((item) => (
                  <li key={item.num} className="grid grid-cols-[52px_1fr] gap-6">
                    <span className="text-[30px] font-black text-white/42">{item.num}</span>
                    <span>
                      <span className="block text-[15px] font-black">{item.title}</span>
                      <span className="mt-2 block text-[12px] font-medium leading-5 text-white/48">
                        {item.desc}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      <section id="lab-inquiry" className="bg-white py-20">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_520px] lg:items-center`}>
          <div>
            <div>
              <Eyebrow>Case Registration</Eyebrow>
              <h2 className="mt-2 max-w-[460px] text-[34px] font-black leading-tight">
                Laboratory Intake & Case Enquiry
              </h2>
              <p className="mt-6 max-w-[490px] text-[14px] font-medium leading-7 text-[#5f6d80]">
                Registered agencies and legal professionals can submit evidence and initiate case
                files through this portal. For emergency forensic support, please use our priority
                helpline.
              </p>
              <div className="mt-10 space-y-5">
                <a
                  href={`tel:${site.phone?.replace(/\s/g, '')}`}
                  className="flex max-w-[430px] items-center gap-5 rounded-[8px] bg-[#f4f7fb] px-6 py-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6d28d9] text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#a1acba]">
                      Priority Helpline
                    </span>
                    <span className="mt-1 block text-[16px] font-black">{site.phone}</span>
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex max-w-[430px] items-center gap-5 rounded-[8px] bg-[#f4f7fb] px-6 py-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#42a5f5] text-white">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#a1acba]">
                      Report Verification
                    </span>
                    <span className="mt-1 block text-[16px] font-black">{site.email}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-[18px] bg-[#f4f7fb] p-7 shadow-[0_18px_40px_rgba(18,31,47,0.14)]">
              <LabInquiryForm
                serviceOptions={
                  serviceOptions.length > 0 ? serviceOptions : ['General forensic inquiry']
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef3f9] py-12">
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1fr_360px]`}>
          <div>
            <div className="overflow-hidden rounded-[16px] border border-[#d4deea] bg-white shadow-sm">
              <div className="afsl-static-map relative h-[255px]">
                <div className="absolute left-[45%] top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <MapPin className="h-8 w-8 fill-[#ef4444] text-[#ef4444] drop-shadow" />
                  <span className="mt-1 rounded bg-white/90 px-2 py-1 text-[10px] font-black text-[#071329] shadow-sm">
                    Indore
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 rounded bg-white/95 px-3 py-2 text-[10px] font-bold text-[#4d5a6d] shadow-sm">
                  Open in Map +
                </span>
              </div>
            </div>
          </div>
          <div>
            <article className="flex min-h-[255px] flex-col justify-center rounded-[18px] bg-[#5b1eb2] p-9 text-white shadow-[0_18px_45px_rgba(74,29,150,0.28)]">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/58">
                Total Laboratory Visitors
              </p>
              <p className="mt-5 text-[48px] font-black tabular-nums">
                {totalVisitors.toLocaleString('en-IN')}
              </p>
              <div className="mt-8 flex gap-3">
                {[MapPin, GraduationCap].map((Icon, index) => (
                  <span
                    key={index}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* 
      <Modal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.label || ''}
      >
        <div className="space-y-4">
          <p className="text-[13px] font-medium text-[#687487]">
            {selectedCategory?.description}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {selectedCategory?.clients.map((client) => (
              <div
                key={client.name}
                className="flex flex-col items-center gap-3 rounded-[12px] border border-[#e5ebf4] bg-[#f8fafd] p-6 text-center transition hover:shadow-md"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <p className="text-[12px] font-bold text-[#071329]">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal> */}
    </div>
  )
}
