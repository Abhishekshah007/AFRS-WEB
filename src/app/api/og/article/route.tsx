import { ImageResponse } from 'next/og'
import { getCategoryLabel } from '@/components/student-hub/articles/categoryStyles'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')?.trim().slice(0, 180) || 'Forensic Research & Insights'
  const category = getCategoryLabel(searchParams.get('category') || 'general')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 68px',
          color: '#f8faf8',
          background: 'linear-gradient(125deg, #08251d 0%, #124b39 58%, #1b5e20 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 10,
              height: 42,
              borderRadius: 8,
              background: '#c4a45b',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: 3 }}>AFRS</span>
            <span style={{ fontSize: 13, letterSpacing: 2, color: '#cbd5d1' }}>
              APPLIED FORENSIC RESEARCH SCIENCES
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 990, gap: 18 }}>
          <span
            style={{
              color: '#e5c779',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {category}
          </span>
          <span style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.12 }}>{title}</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.28)',
            paddingTop: 18,
            color: '#d8e2dd',
            fontSize: 18,
          }}
        >
          <span>Forensic science insights and articles</span>
          <span>appliedforensicresearchsciences.in</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
