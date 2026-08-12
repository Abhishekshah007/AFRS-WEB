import Link from 'next/link'
import { Landmark, LibraryBig, Rss } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CONTAINER, SECTION } from './constants'

export function MediaResourcesSection() {
  const items = [
    { label: 'Virtual Museum', href: 'https://nfsmuseums.com/s', icon: Landmark },

    {
      label: 'Youtube Channel',
      href: 'https://www.youtube.com/@afrs',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M10.34 15.64L15.27 12L10.34 8.36V15.64ZM21.8 12C21.8 12.78 21.72 13.56 21.56 14.32C21.4 15.08 21.16 15.8 20.84 16.48C20.52 17.16 20.12 17.8 19.64 18.4C19.16 19 18.6 19.56 17.96 20C17.32 20.44 16.62 20.76 15.88 21C15.14 21.24 14.38 21.4 13.62 21.48C12.86 21.56 12.1 21.6 11.34 21.6C10.58 21.6 9.82 21.56 9.08 21.48C8.34 21.4 7.58 21.24 6.84 21C6.1 20.76 5.4 20.44 4.76 20C4.12 19.56 3.56 19,3.08 18.4C2.6 17.8,2,17,1,16C0,15,0,14,1,13C2,12,2,11,3,10C4,9,4,8,5,7C6,6,6,5,7,4C8,3,8,2,9,1C10,0,11,-0,12,-0Z"/></svg>`,
    },
    { label: 'E-Library', href: '/articles', icon: LibraryBig },
    { label: 'Blog', href: 'https://appliedforensicresearchscience.blogspot.com/', icon: Rss },
  ]

  return (
    <section
      className={`${SECTION} text-white section-glow-top`}
      style={{ background: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)' }}
    >
      <div className={CONTAINER}>
        <SectionHeader
          light
          title="Quick Links"
          subtitle="Access our resources and stay updated."
        />
        <AnimateOnScroll stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center card-pop hover:bg-white/15 transition min-h-[120px] flex flex-col items-center justify-center gap-3"
            >
              <span className="text-2xl" aria-hidden>
                {typeof item.icon === 'string' ? (
                  <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                ) : (
                  <item.icon className="h-8 w-8" />
                )}
              </span>
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
