import type { UgcNetPageContent } from '@/components/student-hub/ugc-net/types'
import { defaultUgcNetPageContent } from '@/data/defaults/student-hub/ugc-net'
import { buildExamPrepPageContent } from '@/lib/queries/exam-prep-page'

export function buildUgcNetPageContent(
  source?: Partial<UgcNetPageContent> | null,
): UgcNetPageContent {
  return buildExamPrepPageContent(defaultUgcNetPageContent, source)
}
