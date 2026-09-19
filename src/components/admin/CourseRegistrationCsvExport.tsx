'use client'

import { RegistrationCsvExportPanel } from './RegistrationCsvExportPanel'

export default function CourseRegistrationCsvExport() {
  return (
    <RegistrationCsvExportPanel
      collectionSlug="courseRegistrations"
      title="Bulk CSV export — course & training registrations"
      primaryFilterKey="programmeTitle"
      primaryFilterLabel="Programme title contains"
      secondaryFilterKey="programmeId"
      secondaryFilterLabel="Programme ID (exact)"
    />
  )
}
