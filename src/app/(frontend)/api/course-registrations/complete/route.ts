import { completeCourseRegistration } from '@/lib/api/course-registration'

export async function POST(req: Request) {
  try {
    return await completeCourseRegistration(req)
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unable to submit payment details.' },
      { status: 500 },
    )
  }
}
