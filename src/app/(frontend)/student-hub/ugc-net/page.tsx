import { getUgcNetAchievers, getUgcNetPageContent } from '@/components/student-hub/content'
import { UgcNetPageView } from '@/components/student-hub/UgcNetPageView'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'UGC NET Forensic Science Preparation',
  description:
    'UGC NET and JRF Forensic Science coaching with live classes, previous-year questions, mock tests and revision for Paper I and Paper II.',
  path: '/student-hub/ugc-net',
})
export default async function UgcNetPage() {
  const [content, achievers] = await Promise.all([getUgcNetPageContent(), getUgcNetAchievers()])

  return (
    <div className="student-hub-page min-h-screen hub-surface">
      <UgcNetPageView content={content} achievers={achievers} />
    </div>
  )
}
