import type { ExamPrepCardData, ResourceCardData } from '@/components/student-hub/types'
import { defaultAcademicResources, defaultExamPrep, defaultUgcNetAchievers } from '@/components/student-hub/content.defaults'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl } from '@/lib/cms'
import type { Media } from '@/payload-types'

export { defaultAcademicResources, defaultExamPrep, defaultUgcNetAchievers }

type UgcAchiever = {
  name: string
  title?: string | null
  photo?: number | Media | null
}

type StudentHubContentGlobal = {
  academicResources?: ResourceCardData[]
  examPrep?: ExamPrepCardData[]
  ugcNetAchievers?: UgcAchiever[]
}

export async function getStudentHubContent() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({ slug: 'studentHubContent', depth: 0, overrideAccess: false })) as StudentHubContentGlobal

    return {
      resources: global.academicResources?.length ? global.academicResources : defaultAcademicResources,
      exams: global.examPrep?.length ? global.examPrep : defaultExamPrep,
    }
  } catch {
    return {
      resources: defaultAcademicResources,
      exams: defaultExamPrep,
    }
  }
}

export async function getUgcNetAchievers() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({ slug: 'studentHubContent', depth: 1, overrideAccess: false })) as StudentHubContentGlobal
    if (global.ugcNetAchievers?.length) {
      return global.ugcNetAchievers.map((a, i) => ({
        id: `a-${i + 1}`,
        name: a.name,
        title: a.title || '',
        photoUrl: resolveMediaUrl(a.photo as number | Media | null | undefined, ''),
      }))
    }
  } catch {}

  return defaultUgcNetAchievers.map((a, i) => ({
    id: `d-${i + 1}`,
    name: a.name,
    title: '',
    photoUrl: '',
  }))
}
