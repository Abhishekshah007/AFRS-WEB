import { StoryBlock } from '@/components/about/StoryBlock'
import { ABOUT_IMAGES, aboutTokens } from '@/components/about/tokens'

export type VisionMissionPurposeProps = {
  missionBody?: string
}

/**
 * Three alternating story sections: Vision, Mission, Purpose.
 */
export function VisionMissionPurpose({ missionBody }: VisionMissionPurposeProps) {
  const defaultMission =
    missionBody ||
    'We bridge the gap between academic theory and practical application, providing students and professionals with the tools they need to excel in forensic investigation, evidence handling, and court-ready reporting.'

  return (
    <div className={aboutTokens.sectionAlt}>
      <div className={aboutTokens.container}>
        <StoryBlock
          id="vision"
          badge="Vision"
          badgeVariant="violet"
          title="Our Vision"
          body="To be India's most trusted forensic science institute — advancing research, education, and laboratory services that set benchmarks for evidence integrity and scientific accuracy."
          highlight={{ icon: '🔭', text: 'Science-led justice through rigorous forensic methodology.' }}
          imageSrc={ABOUT_IMAGES.vision}
          imageAlt="Digital forensic analysis concept"
          imageRight
        />
        <StoryBlock
          id="mission"
          badge="Mission"
          badgeVariant="blue"
          title="Our Mission"
          body={defaultMission}
          highlight={{ icon: '🎯', text: 'Practical training aligned with real investigation workflows.' }}
          imageSrc={ABOUT_IMAGES.mission}
          imageAlt="Forensic investigators at a crime scene"
          imageRight={false}
        />
        <StoryBlock
          id="purpose"
          badge="Purpose"
          badgeVariant="violet"
          title="Our Purpose"
          body="We exist to empower investigators, students, and institutions with accessible forensic expertise — reducing case backlogs and strengthening public trust in scientific evidence."
          highlight={{ icon: '⚖️', text: 'Ethical practice and transparency in every examination.' }}
          imageSrc={ABOUT_IMAGES.purpose}
          imageAlt="Forensic laboratory precision"
          imageRight
        />
      </div>
    </div>
  )
}
