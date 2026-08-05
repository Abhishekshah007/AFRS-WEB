import { FooterSettings } from '../globals/FooterSettings'
import { HeaderSettings } from '../globals/HeaderSettings'
import { HomePage } from '../globals/HomePage'
import { ProgrammesCatalog } from '../globals/ProgrammesCatalog'
import { RegistrationForm } from '../globals/RegistrationForm'
import { SiteSettings } from '../globals/SiteSettings'
import { StudentHubContent } from '../globals/StudentHubContent'

/** Globals registered in logical admin-nav order. */
export const globals = [
  // Site Settings
  SiteSettings,
  HeaderSettings,
  FooterSettings,
  // Pages
  HomePage,
  // Programmes
  ProgrammesCatalog,
  RegistrationForm,
  // Student Hub
  StudentHubContent,
]
