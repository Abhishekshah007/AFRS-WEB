import Link from 'next/link'
import type { ResourceCardData } from '@/components/student-hub/types'
import { ResourceCard } from '@/components/student-hub/ResourceCard'
import { studentHubTokens } from '@/components/student-hub/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type AcademicResourcesSectionProps = {
  resources: ResourceCardData[]
}

/**
 * Academic resources grid: 4-column row + mixed second row (featured spans 2 cols).
 */
export function AcademicResourcesSection({ resources }: AcademicResourcesSectionProps) {
  return (
    <section className={`${studentHubTokens.sectionY} bg-white`} aria-labelledby="academic-resources-heading">
      <div className={studentHubTokens.container}>
        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 id="academic-resources-heading" className={`${studentHubTokens.heading} text-2xl sm:text-[28px]`}>
                Academic Resources
              </h2>
              <p className={`mt-2 text-sm ${studentHubTokens.body}`}>Curated materials for forensic scholars</p>
            </div>
            <Link href="/search" className={`${studentHubTokens.linkCta} shrink-0 normal-case tracking-normal text-sm`}>
              View All <span aria-hidden>→</span>
            </Link>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resources.map((resource) => (
              <li key={resource.id} className={resource.featured ? 'sm:col-span-2 lg:col-span-2' : undefined}>
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
