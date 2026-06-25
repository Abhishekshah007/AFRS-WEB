import type { ResourceCardData } from '@/components/student-hub/types'
import { ResourceCard } from '@/components/student-hub/ResourceCard'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export function AcademicResourcesSection({ resources }: { resources: ResourceCardData[] }) {
  const topRow = resources.slice(0, 4)
  const bottomRow = resources.slice(4)

  return (
    <section className="py-12 md:py-16 bg-[#F5F7FB]" aria-labelledby="academic-resources-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mb-8">
            <h2
              id="academic-resources-heading"
              className="text-[28px] sm:text-[32px] font-extrabold text-slate-900 tracking-tight"
            >
              Academic Resources
            </h2>
            <p className="mt-1.5 text-[14px] text-slate-500">
              Curated materials for forensic scholars
            </p>
          </div>
        </AnimateOnScroll>

        {/* Top row — 4 equal cards */}
        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {topRow.map((resource) => (
              <li key={resource.id}>
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        </AnimateOnScroll>

        {/* Bottom row — 2 normal + 1 wide */}
        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bottomRow.map((resource) => (
              <li
                key={resource.id}
                className={resource.featured ? 'sm:col-span-2 lg:col-span-1' : undefined}
              >
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
