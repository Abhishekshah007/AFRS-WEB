'use client'

import { MotionProvider } from '@/components/motion/MotionProvider'
import { PageTransition } from '@/components/motion/PageTransition'
import { AmbientSiteGlow } from '@/components/motion/AmbientSiteGlow'
import { ScrollProgress } from '@/components/motion/ScrollProgress'

type AppProvidersProps = {
  children: React.ReactNode
}

/**
 * Global client providers: smooth scroll, ambient visuals, page transitions.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionProvider>
      <ScrollProgress />
      <AmbientSiteGlow />
      <PageTransition>{children}</PageTransition>
    </MotionProvider>
  )
}
