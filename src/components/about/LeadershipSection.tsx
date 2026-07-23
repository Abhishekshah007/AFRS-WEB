'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Quote, UserRound } from 'lucide-react'

import type { LeaderProfile } from '@/components/about/types'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { JSX } from 'react/jsx-dev-runtime'

type LeadershipSectionProps = {
  leaders: LeaderProfile[]
  committee: LeaderProfile[]
  leadershipTitle?: string
  leadershipSubtitle?: string
  committeeTitle?: string
  committeeSubtitle?: string
}

export function LeadershipSection({
  leaders,
  committee,
  leadershipTitle = 'Leadership Team',
  leadershipSubtitle = 'Meet the visionaries shaping forensic education, research, and professional excellence at AFRS.',
  committeeTitle = 'Executive Committee & Members',
  committeeSubtitle = 'The dedicated team driving operations, governance, and community initiatives.',
}: LeadershipSectionProps) {
  if (!leaders?.length && !committee?.length) return null

  return (
    <section className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt} section-glow-top`}>
      <div className={aboutTokens.container}>
        {leaders?.length > 0 && (
          <>
            <AnimateOnScroll>
              <SectionHeader title={leadershipTitle} subtitle={leadershipSubtitle} align="left" />
            </AnimateOnScroll>
            <AnimateOnScroll stagger className="mb-16 grid gap-6 lg:mb-20 lg:grid-cols-2">
              {leaders.slice(0, 2).map((leader) => (
                <LeaderCard key={leader.id} leader={leader} />
              ))}
            </AnimateOnScroll>
          </>
        )}

        {committee?.length > 0 && (
          <>
            <AnimateOnScroll>
              <SectionHeader title={committeeTitle} subtitle={committeeSubtitle} align="left" />
            </AnimateOnScroll>

            <AnimateOnScroll
              stagger
              className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {committee.slice(0, 5).map((leader) => (
                <article
                  key={leader.id}
                  className="about-committee-card card-pop relative flex min-h-[390px] h-full overflow-hidden rounded-[18px] border border-slate-200/80 px-8 py-10 shadow-[0_14px_32px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex h-full w-full flex-col items-center text-center">
                    <div className="relative">
                      <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 p-1.5 shadow-[0_10px_24px_rgba(79,70,229,0.12)] ring-1 ring-indigo-100">
                        {leader.photoUrl ? (
                          <Image
                            src={leader.photoUrl}
                            alt={leader.name}
                            width={108}
                            height={108}
                            className="h-[108px] w-[108px] rounded-full object-cover"
                          />
                        ) : (
                          <UserRound
                            aria-hidden
                            className="h-11 w-11 text-indigo-300"
                            strokeWidth={1.8}
                          />
                        )}
                      </div>
                    </div>
                    <h3 className="mt-8 text-xl font-extrabold leading-tight text-[var(--about-text)]">
                      {leader.name}
                    </h3>
                    <p className="mt-3 inline-flex rounded-full bg-[var(--about-primary-soft)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--about-primary)]">
                      {leader.designation}
                    </p>
                    {leader.bio && (
                      <p className="mt-6 flex-1 text-sm leading-relaxed text-slate-600">{leader.bio}</p>
                    )}
                  </div>
                </article>
              ))}
            </AnimateOnScroll>
          </>
        )}
      </div>
    </section>
  )
}

function LeaderCard({ leader }: { leader: LeaderProfile }) {
  type SocialLink = {
    href: string
    label: string
    icon: JSX.Element
  }

  const LinkedInIcon = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5 fill-current"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
  const InstagramIcon = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5 fill-current"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
  const FacebookIcon = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5 fill-current"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )

  const allSocialLinks: { href: string | undefined; label: string; icon: JSX.Element }[] = [
    { href: leader.socials?.linkedin, label: 'LinkedIn', icon: LinkedInIcon },
    { href: leader.socials?.instagram, label: 'Instagram', icon: InstagramIcon },
    { href: leader.socials?.facebook, label: 'Facebook', icon: FacebookIcon },
  ]

  const socialLinks: SocialLink[] = allSocialLinks.filter(
    (item): item is SocialLink => typeof item.href === 'string' && item.href !== '#',
  )

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(15,23,42,0.10)]">
      <div className="grid h-full md:grid-cols-[160px_1fr]">
        {/* ── Photo panel ── */}
        <div className="relative min-h-[260px] overflow-hidden bg-slate-900">
          {/* Brand accent bar */}
          <div className="absolute inset-y-0 left-0 z-10 w-[3px] bg-[#4F75F4]" />

          {leader.photoUrl ? (
            <Image
              src={leader.photoUrl}
              alt={leader.name}
              fill
              className="object-cover opacity-85"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-slate-500">
              {leader.initials}
            </div>
          )}

          {/* Bottom fade overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent" />

          {/* Category label pinned to bottom */}
        </div>

        {/* ── Content panel ── */}
        <div className="flex min-h-[280px] flex-col p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[1.25rem] font-extrabold leading-tight tracking-[-0.025em] text-slate-950">
                {leader.name}
              </h3>
              <span className="mt-2 inline-flex items-center rounded-full border border-[#4F75F4]/20 bg-[#4F75F4]/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#4F75F4]">
                {leader.designation}
              </span>
            </div>

            {/* Social buttons */}
            {socialLinks.length > 0 && (
              <div className="mt-0.5 flex shrink-0 gap-1.5">
                {socialLinks.map(({ href, label, icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${leader.name} on ${label}`}
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-150 hover:border-[#4F75F4]/30 hover:bg-[#4F75F4]/8 hover:text-[#4F75F4]"
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-slate-100" />

          {/* Quote block — left border rule, no bg card */}
          {leader.message && (
            <div className="border-l-2 border-[#4F75F4] pl-3.5">
              <Quote className="mb-2 h-4 w-4 text-[#4F75F4]/40" strokeWidth={2.5} />
              <p className="line-clamp-5 text-[12.5px] leading-[1.75] text-slate-600">
                {leader.message}
              </p>
            </div>
          )}

          {/* Bio — pinned to bottom */}
          {leader.bio && (
            <p className="mt-auto pt-4 text-[11.5px] font-medium leading-relaxed text-slate-400">
              {leader.bio}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
