'use client'

import { useMemo, useState } from 'react'
import { Button } from '@payloadcms/ui'

type CollectionSlug = 'courseRegistrations' | 'eventRegistrations'

type Props = {
  collectionSlug: CollectionSlug
  title: string
  primaryFilterKey: 'programmeTitle' | 'eventTitle'
  primaryFilterLabel: string
  secondaryFilterKey?: 'programmeId' | 'eventSlug'
  secondaryFilterLabel?: string
}

const paymentStatusOptions = [
  { label: 'All payment statuses', value: '' },
  { label: 'Pending verification', value: 'pending' },
  { label: 'Verified', value: 'paid' },
  { label: 'Not required', value: 'notRequired' },
  { label: 'Failed / rejected', value: 'failed' },
]

const registrationStatusOptions = [
  { label: 'All registration statuses', value: '' },
  { label: 'Submitted', value: 'initiated' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Cancelled', value: 'cancelled' },
]

export function RegistrationCsvExportPanel({
  collectionSlug,
  title,
  primaryFilterKey,
  primaryFilterLabel,
  secondaryFilterKey,
  secondaryFilterLabel,
}: Props) {
  const [primaryFilter, setPrimaryFilter] = useState('')
  const [secondaryFilter, setSecondaryFilter] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [registrationStatus, setRegistrationStatus] = useState('')

  const exportUrl = useMemo(() => {
    const params = new URLSearchParams()
    if (primaryFilter.trim()) params.set(primaryFilterKey, primaryFilter.trim())
    if (secondaryFilterKey && secondaryFilter.trim()) {
      params.set(secondaryFilterKey, secondaryFilter.trim())
    }
    if (paymentStatus) params.set('paymentStatus', paymentStatus)
    if (registrationStatus) params.set('registrationStatus', registrationStatus)
    const query = params.toString()
    return `/api/${collectionSlug}/export-csv${query ? `?${query}` : ''}`
  }, [
    collectionSlug,
    primaryFilter,
    primaryFilterKey,
    secondaryFilter,
    secondaryFilterKey,
    paymentStatus,
    registrationStatus,
  ])

  return (
    <div
      style={{
        marginBottom: 'var(--base)',
        padding: 'var(--base)',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 'var(--border-radius-m)',
        background: 'var(--theme-elevation-50)',
      }}
    >
      <p style={{ margin: 0, fontWeight: 700 }}>{title}</p>
      <p style={{ margin: '8px 0 16px', color: 'var(--theme-text)', fontSize: '13px' }}>
        Download all matching registrations as one CSV file for certificates or record keeping.
        Leave filters empty to export everything in this list.
      </p>

      <div
        style={{
          display: 'grid',
          gap: '12px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          marginBottom: '16px',
        }}
      >
        <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
          {primaryFilterLabel}
          <input
            value={primaryFilter}
            onChange={(e) => setPrimaryFilter(e.target.value)}
            placeholder="Optional filter"
            style={{
              height: '36px',
              borderRadius: 'var(--border-radius-s)',
              border: '1px solid var(--theme-elevation-150)',
              padding: '0 10px',
            }}
          />
        </label>

        {secondaryFilterKey && secondaryFilterLabel ? (
          <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
            {secondaryFilterLabel}
            <input
              value={secondaryFilter}
              onChange={(e) => setSecondaryFilter(e.target.value)}
              placeholder="Optional exact match"
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius-s)',
                border: '1px solid var(--theme-elevation-150)',
                padding: '0 10px',
              }}
            />
          </label>
        ) : null}

        <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
          Payment status
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            style={{
              height: '36px',
              borderRadius: 'var(--border-radius-s)',
              border: '1px solid var(--theme-elevation-150)',
              padding: '0 10px',
            }}
          >
            {paymentStatusOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
          Registration status
          <select
            value={registrationStatus}
            onChange={(e) => setRegistrationStatus(e.target.value)}
            style={{
              height: '36px',
              borderRadius: 'var(--border-radius-s)',
              border: '1px solid var(--theme-elevation-150)',
              padding: '0 10px',
            }}
          >
            {registrationStatusOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Button buttonStyle="secondary" onClick={() => window.open(exportUrl, '_blank')}>
        Download CSV
      </Button>
    </div>
  )
}
