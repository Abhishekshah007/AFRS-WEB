'use client'

import { useMemo, useState } from 'react'
import type { SubmissionFormType } from '@/fields/submissionExport'
import type { FormSubmitState } from '@/domain/registration/types'
import { isTurnstileConfiguredClient } from '@/lib/security/turnstileClient'

export type ContactMessagePayload = {
  fullName: string
  mobile?: string
  email: string
  subject?: string
  message: string
  formType?: SubmissionFormType
  caseType?: string
  serviceSlug?: string
}

type Options = {
  endpoint?: string
  successMessage?: string
  mapFormData?: (_formData: FormData) => ContactMessagePayload
  turnstileToken?: string | null
}

const defaultMapFormData = (_formData: FormData): ContactMessagePayload => ({
  fullName: String(_formData.get('fullName') || '').trim(),
  mobile: String(_formData.get('mobile') || '').trim(),
  email: String(_formData.get('email') || '').trim(),
  subject: String(_formData.get('subject') || '').trim(),
  message: String(_formData.get('message') || '').trim(),
  formType: 'contact',
})

export function useContactFormSubmit({
  endpoint = '/api/contact-messages/submit',
  successMessage = 'Message sent successfully. We will contact you soon.',
  mapFormData = defaultMapFormData,
  turnstileToken = null,
}: Options = {}) {
  const [state, setState] = useState<FormSubmitState>({ status: 'idle' })
  const disabled = state.status === 'submitting'
  const turnstileRequired = isTurnstileConfiguredClient()
  const captchaPending = turnstileRequired && !turnstileToken

  const buttonLabel = useMemo(() => {
    if (state.status === 'submitting') return 'Sending...'
    if (state.status === 'success') return 'Sent'
    return 'Send Message'
  }, [state.status])

  async function onSubmit(formData: FormData) {
    const payload = mapFormData(formData)

    if (!payload.fullName || !payload.email || !payload.message) {
      setState({ status: 'error', message: 'Please fill Full Name, Email, and Message.' })
      return
    }

    if (captchaPending) {
      setState({ status: 'error', message: 'Please complete the security check.' })
      return
    }

    setState({ status: 'submitting' })
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          formType: payload.formType || 'contact',
          turnstileToken: turnstileToken || undefined,
        }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error || 'Failed to send message')
      }

      setState({ status: 'success', message: successMessage })
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
      })
    }
  }

  return {
    state,
    disabled: disabled || captchaPending,
    buttonLabel,
    onSubmit,
    turnstileRequired,
  }
}
