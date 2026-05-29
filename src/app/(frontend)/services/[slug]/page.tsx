import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import type { Media, Service } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import type { Metadata } from 'next'

const fallbackBanner = 'https://www.figma.com/api/mcp/asset/4c42ae20-cfcd-4d2a-96e1-bc17321dcca2'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  })
  const srv = result.docs[0] as Service | undefined
  if (!srv) return { title: 'Service not found' }
  return {
    title: srv.title,
    description: srv.excerpt || richTextToPlain(srv.content, 160),
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })

  const srv = result.docs[0] as Service | undefined
  if (!srv) notFound()

  const banner = resolveMediaUrl(srv.banner as number | Media | null | undefined, fallbackBanner)
  const icon = resolveMediaUrl(srv.icon as number | Media | null | undefined, '')

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-3 text-xs text-slate-500 flex gap-2 items-center">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-indigo-600">Services</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{srv.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative overflow-hidden py-14 lg:py-20 text-white"
        style={{ background: 'linear-gradient(135deg,#0f0c2e 0%,#1a103c 50%,#2d1a5e 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 grid gap-10 lg:grid-cols-2 items-center">
          <div className="reveal-up">
            {srv.category && (
              <span className="inline-flex rounded-full bg-violet-500/20 border border-violet-400/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-violet-200">
                {srv.category}
              </span>
            )}
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">{srv.title}</h1>
            {srv.excerpt && <p className="mt-5 text-white/80 leading-relaxed max-w-lg">{srv.excerpt}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 px-7 text-sm font-bold transition">
                Enquire About This Service →
              </Link>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl reveal-up-d1">
            <div className="relative h-64 sm:h-80">
              <Image src={banner} alt={srv.title} fill sizes="(max-width: 1024px) 100vw, 50vw" priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent" />
            </div>
            {icon && (
              <div className="absolute bottom-4 right-4 h-12 w-12 rounded-xl overflow-hidden border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                <Image src={icon} alt="" width={48} height={48} className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-14 grid gap-10 lg:grid-cols-[1fr_300px] items-start">
        <div>
          {srv.content && (
            <AnimateOnScroll>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                <p>{richTextToPlain(srv.content, 2000)}</p>
              </div>
            </AnimateOnScroll>
          )}

          {srv.features && srv.features.length > 0 && (
            <AnimateOnScroll className="mt-12">
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {srv.features.map((f, i) => (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 card-pop">
                    <p className="font-bold text-slate-900">{f.featureTitle}</p>
                    {f.featureDescription && <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.featureDescription}</p>}
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          )}
        </div>

        {/* Sidebar */}
        <AnimateOnScroll direction="right" className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-slate-100 bg-white shadow-sm p-7">
            <h3 className="font-extrabold text-slate-900 mb-4">Enquire About This Service</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Our forensic team will respond to your enquiry within 24 hours.
            </p>
            <Link href="/contact" className="block w-full text-center h-12 leading-[48px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition">
              Send Enquiry →
            </Link>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
            <p className="text-sm font-bold text-indigo-900 mb-2">Looking for training?</p>
            <p className="text-xs text-indigo-700 leading-relaxed mb-4">
              We offer structured internship and training programs in all major forensic areas.
            </p>
            <Link href="/courses" className="text-sm font-bold text-indigo-700 hover:text-indigo-900">
              Explore Courses →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
