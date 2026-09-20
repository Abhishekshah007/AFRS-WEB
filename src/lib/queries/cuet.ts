import type { UgcNetPageContent } from '@/components/student-hub/ugc-net/types'
import { defaultCuetPageContent } from '@/data/defaults/student-hub/cuet'
import { buildExamPrepPageContent } from '@/lib/queries/exam-prep-page'

export function buildCuetPageContent(source?: Partial<UgcNetPageContent> | null): UgcNetPageContent {
  return buildExamPrepPageContent(defaultCuetPageContent, source)
}
