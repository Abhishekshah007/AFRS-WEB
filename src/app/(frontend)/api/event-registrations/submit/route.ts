import { submitEventRegistration } from '@/lib/api/submit-event-registration'

export async function POST(req: Request) {
  try {
    return await submitEventRegistration(req)
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unable to submit registration.' },
      { status: 500 },
    )
  }
}
