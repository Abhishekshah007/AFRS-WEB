import { StoryBlock } from '@/components/about/StoryBlock'
import { ABOUT_IMAGES, aboutTokens } from '@/components/about/tokens'

export type VisionMissionPurposeProps = {
  visionBadge?: string
  visionTitle?: string
  visionBody?: string
  visionHighlight?: string
  visionImageAlt?: string
  missionBadge?: string
  missionTitle?: string
  missionBody?: string
  missionHighlight?: string
  missionImageAlt?: string
  purposeBadge?: string
  purposeTitle?: string
  purposeBody?: string
  purposeHighlight?: string
  purposeImageAlt?: string
}

/**
 * Three alternating story sections: Vision, Mission, Purpose.
 */
export function VisionMissionPurpose({
  visionBadge = 'Vision',
  visionTitle = 'Our Vision',
  visionBody,
  visionHighlight = 'Science-led justice through rigorous forensic methodology.',
  visionImageAlt = 'Digital forensic analysis concept',
  missionBadge = 'Mission',
  missionTitle = 'Our Mission',
  missionBody,
  missionHighlight = 'Practical training aligned with real investigation workflows.',
  missionImageAlt = 'Forensic investigators at a crime scene',
  purposeBadge = 'Purpose',
  purposeTitle = 'Our Purpose',
  purposeBody,
  purposeHighlight = 'Ethical practice and transparency in every examination.',
  purposeImageAlt = 'Forensic laboratory precision',
}: VisionMissionPurposeProps) {
  const defaultVision =
    visionBody ||
    "To be India's most trusted forensic science institute — advancing research, education, and laboratory services that set benchmarks for evidence integrity and scientific accuracy."

  const defaultMission =
    missionBody ||
    'We bridge the gap between academic theory and practical application, providing students and professionals with the tools they need to excel in forensic investigation, evidence handling, and court-ready reporting.'

  const defaultPurpose =
    purposeBody ||
    'We exist to empower investigators, students, and institutions with accessible forensic expertise — reducing case backlogs and strengthening public trust in scientific evidence.'

  return (
    <div className={aboutTokens.sectionAlt}>
      <div className={aboutTokens.container}>
        <StoryBlock
          id="vision"
          badge={visionBadge}
          badgeVariant="violet"
          title={visionTitle}
          body={defaultVision}
          highlight={{
            icon: '🔭',
            text: visionHighlight,
          }}
          imageSrc={ABOUT_IMAGES.vision}
          imageAlt={visionImageAlt}
          imageRight
        />
        <StoryBlock
          id="mission"
          badge={missionBadge}
          badgeVariant="blue"
          title={missionTitle}
          body={defaultMission}
          highlight={{
            icon: '🎯',
            text: missionHighlight,
          }}
          imageSrc={ABOUT_IMAGES.mission}
          imageAlt={missionImageAlt}
          imageRight={false}
        />
        <StoryBlock
          id="purpose"
          badge={purposeBadge}
          badgeVariant="violet"
          title={purposeTitle}
          body={defaultPurpose}
          highlight={{
            icon: '⚖️',
            text: purposeHighlight,
          }}
          imageSrc={ABOUT_IMAGES.purpose}
          imageAlt={purposeImageAlt}
          imageRight
        />
      </div>
    </div>
  )
}
