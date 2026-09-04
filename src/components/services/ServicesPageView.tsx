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
  Microscope,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react'
// import { Modal } from '@/components/ui/Modal'
import { LabInquiryForm } from '@/components/services/LabInquiryForm'
import { AfslTestimonialsSection } from '@/components/services/AfslTestimonialsSection'
import type { AfslTestimonial } from '@/components/services/AfslTestimonialsSection'
import { VisitorCounterBar } from '@/components/student-hub/VisitorCounterBar'
import { SiteGallerySection } from '@/components/gallery/SiteGallerySection'
import type { SiteGalleryItem } from '@/components/gallery/SiteGallerySection'
import type {
  CatalogItem,
  DirectorateMember,
  ServicesPageContent,
  SiteContact,
} from '@/components/services/types'
import { defaultServicesCatalog } from '@/data/defaults/services-catalog'
import type { LucideIcon } from 'lucide-react'
import AFRSLogo from '../../../public/assets/afsl-logo.png'

const CONTAINER = 'mx-auto w-full max-w-[1120px] px-6 sm:px-8'

const KIT_ICONS: Record<string, LucideIcon> = {
  Box,
  Fingerprint,
  ClipboardList,
  FileSearch,
  FlaskConical,
  Beaker,
  Users,
}

export type ServicesPageViewProps = {
  content: ServicesPageContent
  catalogItems: CatalogItem[]
  directors: DirectorateMember[]
  teamMembers: DirectorateMember[]
  site: SiteContact
  totalVisitors: number
  galleryItems: SiteGalleryItem[]
  testimonials: AfslTestimonial[]
}

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#75162D]">
      {children}
    </p>
  )
}

export function ServicesPageView({
  content,
  catalogItems,
  directors,
  teamMembers,
  site,
  totalVisitors,
  galleryItems,
  testimonials,
}: ServicesPageViewProps) {
  // const [selectedCategory, setSelectedCategory] = useState<typeof clientCategories[0] | null>(null)
  const services = catalogItems.length > 0 ? catalogItems : defaultServicesCatalog
  const serviceOptions = services.map((c) => c.title)
  const people = teamMembers

  return (
    <div className="afsl-page bg-white text-[#1A0C0F]">
      <section className="afsl-hero-ui relative overflow-hidden text-white">
        <div className=" absolute" aria-hidden />
        <div
          className={`${CONTAINER} grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[1fr_470px]`}
        >
          <div className="max-w-[570px]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/55">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-5 text-[44px] font-black leading-[0.98] tracking-[-0.01em] sm:text-[64px] lg:text-[76px]">
              {content.heroTitle}{' '}
              <span className="block text-brand-gold">{content.heroHighlight}</span>
            </h1>
            <p className="mt-7 max-w-[500px] text-[15px] font-medium leading-7 text-white/72">
              {content.heroDescription}
            </p>
            <Link
              href="#service-catalog"
              className="mt-8 inline-flex h-12 items-center rounded-[6px] bg-white px-7 text-[13px] font-extrabold text-[#141a2d] shadow-sm"
            >
              {content.heroCtaLabel}
            </Link>
          </div>

          <div className="rounded-[22px] bg-brand-beige p-10 shadow-[0_22px_60px_rgba(59,1,11,0.24)]">
            <div className="rounded-[6px] bg-[#3B010B] px-7 py-5 shadow-xl">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#62c47a]">
                {content.labStatusLabel}
              </p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <p className="text-[12px] font-bold text-[#62c47a]">{content.labStatusValue}</p>
                <ShieldCheck className="h-4 w-4 text-white/35" />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Link
                href="#service-catalog"
                className="rounded-[6px] bg-[#3B010B] px-7 py-3 text-[12px] font-extrabold text-white shadow-lg shadow-brand/25"
              >
                {content.labCardCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-soft py-20">
        <div className={CONTAINER}>
          <div>
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_55px_rgba(33,44,68,0.06)] lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[1fr_480px]">
                <div>
                  <Eyebrow>{content.infrastructureEyebrow}</Eyebrow>
                  <h2 className="mt-3 text-[31px] font-black tracking-[-0.01em]">
                    {content.infrastructureTitle}
                  </h2>
                  <p className="mt-5 max-w-[480px] text-[14px] font-medium leading-7 text-[#536176] text-justify">
                    {content.infrastructureBody1}
                  </p>
                  <p className="mt-5 max-w-[480px] text-[14px] font-medium leading-7 text-[#536176] text-justify">
                    {content.infrastructureBody2}
                  </p>
                  <div className="mt-8 grid max-w-[420px] grid-cols-3 gap-4">
                    {content.certificationStats.map((stat) => (
                      <div
                        key={stat.caption}
                        className="border-t border-[#dfe7f2] pt-4 text-center"
                      >
                        <p className="text-[18px] font-black text-brand-burgundy">{stat.label}</p>
                        <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#9aa7b8]">
                          {stat.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[330px] rounded-[14px] bg-white shadow-[0_16px_40px_rgba(24,31,43,0.16)]">
                  <Image src={AFRSLogo} alt="AFSL Logo" className="h-full w-full contain-content" />
                  <div className="absolute right-[-16px] top-[-18px] flex h-16 w-16 items-center justify-center rounded-[14px] bg-brand-burgundy text-white shadow-xl">
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
              <article className="min-h-[285px] rounded-[16px] bg-brand p-8 text-white shadow-[0_18px_45px_rgba(59,1,11,0.18)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                  <Microscope className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-[21px] font-black">{content.visionTitle}</h3>
                <p className="mt-4 max-w-[420px] text-[13px] font-medium leading-6 text-white/65 text-justify">
                  {content.visionBody}
                </p>
                <div className="mt-7 h-1 w-10 rounded-full bg-[#F2D9A0]" />
              </article>
            </div>
            <div>
              <article className="min-h-[285px] rounded-[16px] border border-[#e5ebf4] bg-[#FBF6EC] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#75162D] text-white">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-[21px] font-black">{content.missionTitle}</h3>
                <p className="mt-4 max-w-[420px] text-[13px] font-medium leading-6 text-[#5e6978] text-justify">
                  {content.missionBody}
                </p>
                <div className="mt-7 h-1 w-10 rounded-full bg-[#F2D9A0]" />
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
              <Eyebrow>{content.directorateEyebrow}</Eyebrow>
              <h2 className="mt-3 text-[42px] sm:text-[46px] font-black tracking-[-0.02em] leading-tight text-[#1A0C0F]">
                {content.directorateTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-[15px] font-medium text-[#687487]">
                {content.directorateSubtitle}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {directors.length === 0 ? (
                <p className="col-span-full text-center text-[14px] font-medium text-[#687487]">
                  No directors published yet.
                </p>
              ) : (
                directors.map((person) => (
                  <div key={person.id}>
                    <article className="group overflow-hidden rounded-[20px] border border-[#e5ebf4] bg-gradient-to-br from-white to-[#FBF6EC] shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition hover:shadow-[0_20px_48px_rgba(59,1,11,0.15)] hover:-translate-y-1">
                      {/* Top gradient bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-[#75162D] via-[#F2D9A0] to-[#75162D]" />

                      {/* Content */}
                      <div className="p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                          {/* Photo */}
                          <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#75162D] to-[#F2D9A0] opacity-0 transition group-hover:opacity-20" />
                            <div className="relative h-36 w-36 overflow-hidden rounded-[24px] border-2 border-[#e5ebf4] bg-[#FBF6EC] shadow-xl">
                              {person.photo ? (
                                <Image
                                  src={person.photo}
                                  alt={person.name}
                                  fill
                                  className="object-cover transition duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#75162D]/10 to-[#F2D9A0]/10 text-4xl font-black text-[#75162D]">
                                  {person.initials}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 text-center lg:text-left">
                            <h3 className="text-[24px] sm:text-[26px] font-black text-[#1A0C0F]">
                              {person.name}
                            </h3>
                            <p className="mt-3 text-[14px] font-black uppercase tracking-[0.16em] text-[#75162D]">
                              {person.designation}
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#75162D]/10 px-3 py-1 text-[12px] font-bold text-[#75162D]">
                                <Award className="h-3 w-3" />
                                Expert Certified
                              </span>
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold ${
                                  person.status === 'inactive'
                                    ? 'bg-slate-100 text-slate-600'
                                    : 'bg-emerald-50 text-emerald-700'
                                }`}
                              >
                                <ShieldCheck className="h-3 w-3" />
                                {person.status === 'inactive' ? 'Inactive' : 'Active'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* CTA */}
                        {/* <div className="mt-6 border-t border-[#e5ebf4] pt-6">
                        <button className="w-full rounded-[10px] border border-[#75162D] bg-white px-4 py-2.5 text-center text-[12px] font-black text-[#75162D] transition hover:bg-[#75162D] hover:text-white">
                          View Credentials
                        </button>
                      </div> */}
                      </div>
                    </article>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Members Section */}
          <div>
            <div className="mb-12 text-center">
              <Eyebrow>{content.teamEyebrow}</Eyebrow>
              <h2 className="mt-3 text-[42px] sm:text-[46px] font-black tracking-[-0.02em] leading-tight text-[#1A0C0F]">
                {content.teamTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-[15px] font-medium text-[#687487]">
                {content.teamSubtitle}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {people.length === 0 ? (
                <p className="col-span-full text-center text-[14px] font-medium text-[#687487]">
                  No laboratory members published yet.
                </p>
              ) : (
                people.map((person) => {
                  return (
                    <div key={person.id}>
                      <article className="group h-full overflow-hidden rounded-[18px] border border-[#e5ebf4] bg-gradient-to-b from-white to-[#FBF6EC] shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:shadow-[0_14px_32px_rgba(59,1,11,0.12)] hover:-translate-y-0.5">
                        {/* Top accent line */}
                        <div className="h-0.5 w-full bg-gradient-to-r from-[#75162D] via-[#F2D9A0] to-transparent" />

                        <div className="p-7 text-center">
                          {/* Photo */}
                          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[14px] border border-[#e5ebf4] bg-white overflow-hidden shadow-sm transition group-hover:shadow-md">
                            {person.photo ? (
                              <Image
                                src={person.photo}
                                alt={person.name}
                                width={88}
                                height={88}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#75162D]/10 to-[#F2D9A0]/10 text-lg font-black text-[#75162D]">
                                {person.initials}
                              </div>
                            )}
                          </div>

                          {/* Name */}
                          <h4 className="text-[14px] font-black text-[#1A0C0F] line-clamp-2">
                            {person.name}
                          </h4>

                          {/* Designation */}
                          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ba8ba] line-clamp-2">
                            {person.designation}
                          </p>

                          {/* Badge */}
                          <div
                            className={`mt-4 inline-block rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.08em] ${
                              person.status === 'inactive'
                                ? 'bg-slate-100 text-slate-500'
                                : 'bg-[#75162D]/10 text-[#75162D]'
                            }`}
                          >
                            {person.status === 'inactive' ? 'Inactive' : 'Active'}
                          </div>
                        </div>
                      </article>
                    </div>
                  )
                })
              )}
            </div>

            {/* Team Stats */}
            <div className="mt-12 grid gap-4 rounded-[18px] bg-gradient-to-r from-[#75162D]/5 to-[#F2D9A0]/5 border border-[#e5ebf4] p-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-[28px] font-black text-[#75162D]">{people.length}+</p>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#687487]">
                  Team Members
                </p>
              </div>
              <div className="text-center">
                <p className="text-[28px] font-black text-[#F2D9A0]">5+</p>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#687487]">
                  Years Experience
                </p>
              </div>
              <div className="text-center">
                <p className="text-[28px] font-black text-[#75162D]">200+</p>
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
              <Eyebrow>{content.catalogEyebrow}</Eyebrow>
              <h2 className="mt-2 text-[31px] font-black">{content.catalogTitle}</h2>
            </div>
            <div className="hidden items-center gap-5 text-[9px] font-black uppercase tracking-[0.16em] text-[#8c98aa] sm:flex">
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#75162D]" /> Analytical
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#c7d0dd]" /> Investigative
              </span>
            </div>
          </div>
          <div className="grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item, index) => (
              <Link
                key={item.id}
                href={`/services/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[#dce4ef] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                  <Image
                    src={item.banner}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0C0F]/85 via-[#1A0C0F]/12 to-transparent" />
                  <span className="absolute bottom-5 left-5 flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#75162D] text-white">
                    {index === 1 ? (
                      <Fingerprint className="h-4 w-4" />
                    ) : index === 2 ? (
                      <FileSearch className="h-4 w-4" />
                    ) : (
                      <Microscope className="h-4 w-4" />
                    )}
                  </span>
                  <h3 className="absolute bottom-5 left-16 right-5 line-clamp-2 text-[18px] font-black leading-snug text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="line-clamp-4 min-h-[96px] flex-1 text-[14px] font-medium leading-6 text-[#627086]">
                    {item.desc}
                  </p>
                  <span className="mt-5 flex h-10 items-center justify-center rounded-[5px] border border-[#75162D] text-[10px] font-black uppercase tracking-[0.12em] text-[#560B18]">
                    View Details +
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div>
            <div className="mt-8 grid gap-8 rounded-[20px] bg-[#3B010B] p-8 text-white lg:grid-cols-[1fr_2fr] lg:p-10">
              <div>
                <h3 className="text-[25px] font-black leading-tight">{content.legalTitle}</h3>
                <p className="mt-3 text-[14px] font-bold leading-6 text-white/90">
                  {content.legalSubtitle}
                </p>
                <p className="mt-4 max-w-[340px] text-[13px] font-medium leading-6 text-white/65">
                  {content.legalDescription}
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex rounded-[6px] bg-[#3B010B] px-7 py-3 text-[12px] font-extrabold"
                  >
                    {content.legalCtaLabel}
                  </Link>
                  <p className="mt-3 max-w-[280px] text-[11px] font-medium leading-5 text-white/50">
                    {content.legalCtaSubtext}
                  </p>
                </div>
              </div>
              <ul className="grid content-center gap-x-8 gap-y-6 sm:grid-cols-2">
                {content.legalLinks.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <Gavel className="mt-0.5 h-4 w-4 shrink-0 text-[#F2D9A0]" />
                    <div>
                      <p className="text-[12px] font-bold text-white/90">{item.title}</p>
                      <p className="mt-1 text-[11px] font-medium leading-5 text-white/55">
                        {item.desc}
                      </p>
                    </div>
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
                  className="group rounded-[16px] border border-[#dce4ef] bg-[#FBF6EC] p-7 shadow-sm transition hover:shadow-lg hover:-translate-y-1 text-left cursor-pointer hover:bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[10px] bg-[#75162D] text-white shadow-md">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <span className="rounded-full bg-[#75162D]/10 px-3 py-1 text-[11px] font-black text-[#75162D]">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[14px] font-black leading-snug text-[#1A0C0F] group-hover:text-[#75162D] transition">
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

      <section className="bg-brand-soft py-24">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-[740px] text-center">
            <Eyebrow>{content.kitsEyebrow}</Eyebrow>
            <h2 className="mt-2 text-[36px] font-black leading-tight text-[#1A0C0F]">
              {content.kitsTitle}
            </h2>
            <p className="mt-4 text-[14px] font-medium leading-6 text-[#687487]">
              {content.kitsDescription}
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {content.kitCards.map((kit) => {
              const Icon = KIT_ICONS[kit.icon] ?? Box
              return (
                <div key={kit.title}>
                  <article className="group h-full overflow-hidden rounded-[16px] border border-[#dfe7f2] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition hover:shadow-[0_16px_40px_rgba(59,1,11,0.12)] hover:-translate-y-1">
                    {/* Top gradient bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#75162D] to-[#F2D9A0]" />

                    {/* Content */}
                    <div className="flex h-full flex-col p-7">
                      {/* Icon */}
                      <div className="flex h-16 w-16 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#75162D]/10 to-[#F2D9A0]/10 text-[#75162D] shadow-sm transition group-hover:shadow-md">
                        <Icon className="h-7 w-7" strokeWidth={1.8} />
                      </div>

                      {/* Title */}
                      <h3 className="mt-6 flex-1 text-[14px] font-black leading-snug text-[#1A0C0F]">
                        {kit.title}
                      </h3>

                      {/* CTA */}
                      <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center justify-center rounded-[10px] border border-[#75162D] bg-white px-4 py-3 text-center text-[12px] font-black text-[#75162D] transition hover:bg-[#75162D] hover:text-white w-full"
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

      <section className="bg-[#3B010B] py-20 text-white">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1fr]`}>
          <div>
            <div className="space-y-6">
              <h2 className="text-[24px] font-black">{content.trainingTitle}</h2>
              {content.trainingCards.map((card, index) => (
                <article
                  key={card.title}
                  className={`rounded-[8px] bg-[#3B010B] p-7 ${index === 0 ? 'border-l-4 border-[#75162D]' : 'border-l-4 border-[#F2D9A0]'}`}
                >
                  <h3 className="text-[15px] font-black">{card.title}</h3>
                  <p className="mt-3 max-w-[430px] text-[12px] font-medium leading-6 text-white/58">
                    {card.desc}
                  </p>
                  <Link
                    href={card.href || '/courses'}
                    className="mt-5 inline-block text-[12px] font-black text-[#F2D9A0]"
                  >
                    {card.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <div>
            <article className="rounded-[10px] bg-[#560B18] p-9">
              <h2 className="text-[24px] font-black">{content.researchTitle}</h2>
              <ol className="mt-10 space-y-8">
                {content.researchItems.map((item) => (
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
              <Eyebrow>{content.inquiryEyebrow}</Eyebrow>
              <h2 className="mt-2 max-w-[460px] text-[34px] font-black leading-tight">
                {content.inquiryTitle}
              </h2>
              <p className="mt-6 max-w-[490px] text-[14px] font-medium leading-7 text-[#5f6d80]">
                {content.inquiryDescription}
              </p>
              <div className="mt-10 space-y-5">
                <a
                  href={`tel:${site.phone?.replace(/\s/g, '')}`}
                  className="flex max-w-[430px] items-center gap-5 rounded-[8px] bg-[#FBF6EC] px-6 py-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#75162D] text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#a1acba]">
                      {content.priorityHelplineLabel}
                    </span>
                    <span className="mt-1 block text-[16px] font-black">{site.phone}</span>
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex max-w-[430px] items-center gap-5 rounded-[8px] bg-[#FBF6EC] px-6 py-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#75162D] text-white">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#a1acba]">
                      {content.reportVerificationLabel}
                    </span>
                    <span className="mt-1 block text-[16px] font-black">{site.email}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-[18px] bg-[#FBF6EC] p-7 shadow-[0_18px_40px_rgba(18,31,47,0.14)]">
              <LabInquiryForm
                serviceOptions={
                  serviceOptions.length > 0 ? serviceOptions : ['General forensic inquiry']
                }
              />
            </div>
          </div>
        </div>
      </section>
      <AfslTestimonialsSection testimonials={testimonials} />
      <SiteGallerySection items={galleryItems} className="bg-brand-soft" />
      <section className="bg-brand-soft">
        <VisitorCounterBar totalVisitors={totalVisitors} icon="📈" />
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
                className="flex flex-col items-center gap-3 rounded-[12px] border border-[#e5ebf4] bg-[#FBF6EC] p-6 text-center transition hover:shadow-md"
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
                <p className="text-[12px] font-bold text-[#1A0C0F]">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal> */}
    </div>
  )
}
