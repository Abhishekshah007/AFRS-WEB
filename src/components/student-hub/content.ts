import type { CareerGuidancePageContent } from '@/components/student-hub/career-guidance/types'
import type { ExamPrepCardData, ResourceCardData } from '@/components/student-hub/types'
import type { UgcNetPageContent } from '@/components/student-hub/ugc-net/types'
import {
  defaultAcademicResources,
  defaultExamPrep,
  defaultUgcNetAchievers,
} from '@/data/defaults/student-hub/content'
import { defaultCuetAchievers } from '@/data/defaults/student-hub/cuet'
import { defaultFactAchievers } from '@/data/defaults/student-hub/fact'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrlOptional } from '@/lib/cms'
import { buildCareerGuidancePageContent } from '@/lib/queries/career-guidance'
import { buildCuetPageContent } from '@/lib/queries/cuet'
import { buildFactPageContent } from '@/lib/queries/fact'
import { buildUgcNetPageContent } from '@/lib/queries/ugc-net'
import type { Media } from '@/payload-types'

export { defaultAcademicResources, defaultExamPrep, defaultUgcNetAchievers }

export type ExamPrepAchiever = {
  id: string
  name: string
  title: string
  photoUrl: string
}

type AchieverSource = {
  name: string
  title?: string | null
  photo?: number | Media | null
}

type StudentHubContentGlobal = {
  academicResources?: ResourceCardData[]
  examPrep?: ExamPrepCardData[]
  ugcNetAchievers?: AchieverSource[]
  factAchievers?: AchieverSource[]
  cuetAchievers?: AchieverSource[]
  ugcNetPage?: Partial<UgcNetPageContent> | null
  factPage?: Partial<UgcNetPageContent> | null
  cuetPage?: Partial<UgcNetPageContent> | null
  careerGuidancePage?: Partial<CareerGuidancePageContent> | null
}

const examAchieverDefaults = {
  'ugc-net': defaultUgcNetAchievers,
  fact: defaultFactAchievers,
  cuet: defaultCuetAchievers,
} as const

const examAchieverFields = {
  'ugc-net': 'ugcNetAchievers',
  fact: 'factAchievers',
  cuet: 'cuetAchievers',
} as const satisfies Record<keyof typeof examAchieverDefaults, keyof StudentHubContentGlobal>

export type ExamPrepSlug = keyof typeof examAchieverDefaults

function mapAchievers(
  items: AchieverSource[] | undefined,
  defaults: { name: string; title?: string }[],
  idPrefix: string,
): ExamPrepAchiever[] {
  if (items?.length) {
    return items.map((achiever, index) => ({
      id: `${idPrefix}-${index + 1}`,
      name: achiever.name,
      title: achiever.title || '',
      photoUrl: resolveMediaUrlOptional(achiever.photo) ?? '',
    }))
  }

  return defaults.map((achiever, index) => ({
    id: `${idPrefix}-d-${index + 1}`,
    name: achiever.name,
    title: achiever.title || '',
    photoUrl: '',
  }))
}

function withDefaultExams(cms?: ExamPrepCardData[]): ExamPrepCardData[] {
  if (!cms?.length) return defaultExamPrep
  const seen = new Set(cms.map((exam) => exam.id))
  return [...cms, ...defaultExamPrep.filter((exam) => !seen.has(exam.id))]
}

export async function getStudentHubContent() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({
      slug: 'studentHubContent',
      depth: 0,
      overrideAccess: false,
    })) as StudentHubContentGlobal

    return {
      resources: global.academicResources?.length
        ? global.academicResources
        : defaultAcademicResources,
      exams: withDefaultExams(global.examPrep),
    }
  } catch {
    return {
      resources: defaultAcademicResources,
      exams: defaultExamPrep,
    }
  }
}

async function loadStudentHubGlobal(depth = 0): Promise<StudentHubContentGlobal | null> {
  try {
    const payload = await getPayloadClient()
    return (await payload.findGlobal({
      slug: 'studentHubContent',
      depth,
      overrideAccess: false,
    })) as StudentHubContentGlobal
  } catch {
    return null
  }
}

export async function getExamPrepAchievers(exam: ExamPrepSlug): Promise<ExamPrepAchiever[]> {
  const global = await loadStudentHubGlobal(1)
  const field = examAchieverFields[exam]
  const cmsItems = global?.[field] as AchieverSource[] | undefined

  return mapAchievers(cmsItems, examAchieverDefaults[exam], exam)
}

export async function getUgcNetPageContent() {
  const global = await loadStudentHubGlobal(0)
  return buildUgcNetPageContent(global?.ugcNetPage)
}

export async function getFactPageContent() {
  const global = await loadStudentHubGlobal(0)
  return buildFactPageContent(global?.factPage)
}

export async function getCuetPageContent() {
  const global = await loadStudentHubGlobal(0)
  return buildCuetPageContent(global?.cuetPage)
}

export async function getCareerGuidancePageContent() {
  const global = await loadStudentHubGlobal(0)
  return buildCareerGuidancePageContent(global?.careerGuidancePage)
}
