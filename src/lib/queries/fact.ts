import type { UgcNetPageContent } from '@/components/student-hub/ugc-net/types'
import { defaultFactPageContent } from '@/data/defaults/student-hub/fact'
import { buildExamPrepPageContent } from '@/lib/queries/exam-prep-page'

export function buildFactPageContent(source?: Partial<UgcNetPageContent> | null): UgcNetPageContent {
  return buildExamPrepPageContent(defaultFactPageContent, source)
}
