import type { MetadataRoute } from 'next'
import { BRAND_LEGAL, getSiteUrl } from '@/lib/seo/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_LEGAL,
    short_name: 'AFRS',
    description:
      'Forensic science education, training, internships, research and laboratory services from AFRS and AFSL.',
    start_url: '/',
    display: 'browser',
    background_color: '#FBF6EC',
    theme_color: '#3B010B',
    icons: [
      { src: '/assets/logo.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    id: getSiteUrl(),
  }
}
