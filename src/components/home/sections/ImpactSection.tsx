import type { ImpactStat } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import {
  OurAchievementsSection,
  type AchievementDisplayItem,
} from '@/components/shared/OurAchievementsSection'
import { UI } from '../design'
import { defaultImpactStats, SECTION } from './constants'

function toDisplayItems(docs: ImpactStat[]): AchievementDisplayItem[] {
  return docs.map((stat) => ({
    value: stat.value ?? '',
    label: stat.label ?? '',
    tone: stat.tone,
  }))
}

export function ImpactSection({ impactStats }: { impactStats: PaginatedDocs<ImpactStat> }) {
  const items: AchievementDisplayItem[] = impactStats.docs.length
    ? toDisplayItems(impactStats.docs as ImpactStat[])
    : defaultImpactStats.map((stat) => ({
        value: stat.value,
        label: stat.label,
        tone: stat.tone,
      }))

  return (
    <OurAchievementsSection
      items={items}
      className={`${SECTION} ${UI.sectionSurface} section-glow-top`}
    />
  )
}
