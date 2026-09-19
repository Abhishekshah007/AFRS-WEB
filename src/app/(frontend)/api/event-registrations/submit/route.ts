import { submitEventRegistration, submitEventRegistrationErrorResponse } from '@/lib/api/submit-event-registration'

export async function POST(req: Request) {
  try {
    return await submitEventRegistration(req)
  } catch (error) {
    return submitEventRegistrationErrorResponse(error)
  }
}
