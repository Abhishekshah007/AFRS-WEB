import { completeEventRegistration } from '@/lib/api/event-registration'

export async function POST(req: Request) {
  try {
    return await completeEventRegistration(req)
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unable to submit payment details.' },
      { status: 500 },
    )
  }
}
