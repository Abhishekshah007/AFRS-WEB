'use client'

import { useMemo, useState } from 'react'
import type { SubmissionFormType } from '@/fields/submissionExport'
import type { FormSubmitState } from '@/domain/registration/types'

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
  mapFormData?: (formData: FormData) => ContactMessagePayload
}

const defaultMapFormData = (formData: FormData): ContactMessagePayload => ({
  fullName: String(formData.get('fullName') || '').trim(),
  mobile: String(formData.get('mobile') || '').trim(),
  email: String(formData.get('email') || '').trim(),
  subject: String(formData.get('subject') || '').trim(),
  message: String(formData.get('message') || '').trim(),
  formType: 'contact',
})

export function useContactFormSubmit({
  endpoint = '/api/contactMessages',
  successMessage = 'Message sent successfully. We will contact you soon.',
  mapFormData = defaultMapFormData,
}: Options = {}) {
  const [state, setState] = useState<FormSubmitState>({ status: 'idle' })
  const disabled = state.status === 'submitting'

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

    setState({ status: 'submitting' })
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          formType: payload.formType || 'contact',
        }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || 'Failed to send message')
      }

      setState({ status: 'success', message: successMessage })
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
      })
    }
  }

  return { state, disabled, buttonLabel, onSubmit }
}
