import { Articles } from '../collections/Articles'
import { AboutCertifications } from '../collections/AboutCertifications'
import { ContactMessages } from '../collections/ContactMessages'
import { CourseRegistrations } from '../collections/CourseRegistrations'
import { EventRegistrations } from '../collections/EventRegistrations'
import { Events } from '../collections/Events'
import { GalleryItems } from '../collections/GalleryItems'
import { ImpactStats } from '../collections/ImpactStats'
import { Media } from '../collections/Media'
import { Scientists } from '../collections/Scientists'
import { Services } from '../collections/Services'
import { Testimonials } from '../collections/Testimonials'
import { Users } from '../collections/Users'
import { Notices } from '../collections/Notices'
import { PartnersLogo } from '../collections/PartnersLogo'

/** Collections registered in logical admin-nav order. */
export const collections = [
  // Content
  Articles,
  AboutCertifications,
  Services,
  GalleryItems,
  Testimonials,
  Scientists,
  ImpactStats,
  Notices,
  PartnersLogo,
  // Events & Programmes
  Events,
  EventRegistrations,
  CourseRegistrations,
  // Inbox
  ContactMessages,
  // System
  Users,
  Media,
]
