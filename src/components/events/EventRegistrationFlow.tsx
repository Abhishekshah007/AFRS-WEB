'use client'

import Image from 'next/image'
import Link from 'next/link'
import { UnifiedRegistrationFlow } from '@/components/registration/UnifiedRegistrationFlow'
import type { FeeTier, ResolvedRegistrationConfig } from '@/domain/registration/types'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'

type EventCategory = FeeTier

type EventRegistrationData = {
  slug: string
  title: string
  banner: string
  eventType: string
  mode: string
  dateLabel: string
  timeLabel: string
  locationLabel: string
  description: string
  includeKitOption: boolean
  kitPrice: number
  categories: EventCategory[]
}

type Props = {
  event: EventRegistrationData
  config: ResolvedRegistrationConfig
  customSections?: DynamicFormSection[]
}

export function EventRegistrationFlow({ event, config, customSections = [] }: Props) {
  const sidebar = (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="relative h-40">
          <Image src={event.banner} alt={event.title} fill className="object-cover" />
        </div>
        <div className="p-4 space-y-3">
          <p className="text-[10px] font-bold uppercase text-brand-600">{event.eventType}</p>
          <h2 className="text-[30px] leading-tight font-extrabold text-slate-900">{event.title}</h2>
          <p className="text-sm text-slate-600">📅 {event.dateLabel}</p>
          <p className="text-sm text-slate-600">🕐 {event.timeLabel}</p>
          <p className="text-sm text-slate-600">📍 {event.locationLabel}</p>
          <p className="text-xs text-slate-500 leading-relaxed">{event.description}</p>
        </div>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
        <p className="font-bold">Need Help?</p>
        <p className="text-xs mt-2 text-brand-100">
          Facing issues with registration? Contact support.
        </p>
        <Link href="/contact" className="inline-block mt-3 text-sm font-semibold">
          Contact Support
        </Link>
      </div>
    </>
  )

  return (
    <div className="bg-[#F4F6FB] min-h-screen">
      <UnifiedRegistrationFlow
        variant="event"
        cmsFormOnly
        config={config}
        feeTiers={event.categories}
        customSections={customSections}
        includeKitOption={event.includeKitOption}
        kitPrice={event.kitPrice}
        sidebar={sidebar}
        backLink={{ href: '/events', label: 'Back to Events' }}
        eventSlug={event.slug}
        submitEndpoint="/api/event-registrations/submit"
        confirmationPath={(id) => `/events/${event.slug}/register/confirmation/${id}`}
      />
    </div>
  )
}
