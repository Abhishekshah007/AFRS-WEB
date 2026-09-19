'use client'

import { RegistrationCsvExportPanel } from './RegistrationCsvExportPanel'

export default function EventRegistrationCsvExport() {
  return (
    <RegistrationCsvExportPanel
      collectionSlug="eventRegistrations"
      title="Bulk CSV export — event registrations"
      primaryFilterKey="eventTitle"
      primaryFilterLabel="Event title contains"
      secondaryFilterKey="eventSlug"
      secondaryFilterLabel="Event slug (exact)"
    />
  )
}
