import { AfRsEducationSection } from '@/components/programmes/AfRsEducationSection'
import { AfslTrainingSection } from '@/components/programmes/AfslTrainingSection'
import { OnlineEventsHub } from '@/components/programmes/OnlineEventsHub'
import { ProgrammesHero } from '@/components/programmes/ProgrammesHero'
import { ResourceArchiveGallery } from '@/components/programmes/ResourceArchiveGallery'
import type {
  ArchiveItem,
  EducationProgramme,
  GalleryThumb,
  HubEventCard,
  ResourcePerson,
  TrainingOption,
} from '@/components/programmes/types'
import { VisitorCounterBar } from '@/components/student-hub/VisitorCounterBar'

export type ProgrammesPageViewProps = {
  educationProgrammes: EducationProgramme[]
  trainingOptions: TrainingOption[]
  upcomingEvents: HubEventCard[]
  ongoingEvents: HubEventCard[]
  resourcePersons: ResourcePerson[]
  archive: ArchiveItem[]
  gallery: GalleryThumb[]
  totalVisitors: number
  trainingChecklist: string[]
}

/**
 * Forensic Programmes & Events page — full Figma layout composition.
 */
export function ProgrammesPageView({
  educationProgrammes,
  trainingOptions,
  upcomingEvents,
  ongoingEvents,
  resourcePersons,
  archive,
  gallery,
  totalVisitors,
  trainingChecklist,
}: ProgrammesPageViewProps) {
  return (
    <div className="programmes-page bg-white">
      <ProgrammesHero />
      <AfRsEducationSection programmes={educationProgrammes} />
      <AfslTrainingSection options={trainingOptions} checklist={trainingChecklist} />
      <OnlineEventsHub upcoming={upcomingEvents} ongoing={ongoingEvents} />
      <ResourceArchiveGallery
        resourcePersons={resourcePersons}
        archive={archive}
        gallery={gallery}
      />
      <VisitorCounterBar totalVisitors={totalVisitors} icon="👑" />
    </div>
  )
}
