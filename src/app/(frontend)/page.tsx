import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'

const heroPanelImage = 'https://www.figma.com/api/mcp/asset/f687555a-eb14-43e7-bcb9-cd2446819882'

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [events, services, testimonials] = await Promise.all([
    payload.find({ collection: 'events', where: { published: { equals: true } }, limit: 3, sort: 'startDate' }),
    payload.find({ collection: 'services', where: { published: { equals: true } }, limit: 6, sort: 'order' }),
    payload.find({ collection: 'testimonials', where: { published: { equals: true } }, limit: 3 }),
  ])

  const notices = { docs: [] as Record<string, unknown>[] }
  const posts = { docs: [] as Record<string, unknown>[] }

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden text-white px-6 pt-16 pb-24" style={{ backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)' }}>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white" />
        <div className="max-w-[1280px] mx-auto relative px-5 md:px-20 grid gap-12 lg:grid-cols-[536px_500px] lg:justify-between items-center min-h-[500px]">
          <div className="max-w-[536px]">
            <h1 className="text-[48px] font-extrabold leading-[60px] tracking-[-0.02em]">
              Welcome to Applied Forensic Research Sciences
            </h1>
            <p className="mt-6 text-[18px] leading-[29px] text-white/80 max-w-[512px]">
              Your portal to advanced training, research-led education, and world-class forensic professional services.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap items-center">
              <Link href="/courses" className="inline-flex h-[54px] items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-full font-bold text-[14px] leading-5 shadow-lg shadow-black/20 transition">
                Explore Now
              </Link>
              <Link href="/about" className="inline-flex h-[54px] items-center justify-center bg-white/90 text-indigo-600 hover:bg-white px-8 rounded-full font-bold text-[14px] leading-5 shadow-lg shadow-black/15 transition">
                Learn More
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4 text-[14px] leading-5 text-white/90">
              <span className="inline-flex items-center gap-2">
                <span className="text-sm">◉</span>
                Global Standards
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-sm">◉</span>
                ISO Certified
              </span>
            </div>
          </div>

          <div className="relative w-[500px] max-w-full">
            <div className="rounded-[48px] border border-white/25 bg-white/10 p-[17px] shadow-2xl shadow-blue-950/40 backdrop-blur-sm">
              <div className="h-[466px] rounded-[40px] overflow-hidden relative">
                <img src={heroPanelImage} alt="AFRS facility preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/40 via-transparent to-transparent" />
              </div>
            </div>
            <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
              <span className="text-sm">◉</span>
            </div>
            <div className="absolute left-16 top-0 rounded-2xl bg-white border border-slate-100 px-4 py-3 w-64 shadow-2xl shadow-black/20 hidden md:block">
              <p className="text-[12px] font-bold text-indigo-500 leading-4">Our Advanced Facility</p>
              <p className="text-[12px] leading-4 text-slate-700 mt-1">
                Explore our world-class laboratories equipped with the latest forensic technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Our Key Services & Programs</h2>
          <p className="text-center text-gray-500 mb-10">Comprehensive forensic science services for professionals and students</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.docs.length === 0 && (
              <p className="col-span-3 text-center text-gray-400">No services yet — add them in the CMS.</p>
            )}
            {services.docs.map((service: any) => (
              <Link key={service.id} href={`/services/${service.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600">{service.title}</h3>
                {service.excerpt && <p className="text-gray-500 text-sm">{service.excerpt}</p>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Upcoming Events</h2>
          <p className="text-center text-gray-500 mb-10">Workshops, webinars, and training sessions</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.docs.length === 0 && (
              <p className="col-span-3 text-center text-gray-400">No events yet — add them in the CMS.</p>
            )}
            {events.docs.map((event: any) => (
              <div key={event.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                <div className="bg-indigo-50 px-6 py-4">
                  <span className="text-xs font-semibold text-indigo-600 uppercase">{event.eventType}</span>
                  <h3 className="font-bold text-lg mt-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {event.startDate ? new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                  </p>
                  <p className="text-sm text-gray-500">{event.venue}</p>
                </div>
                <div className="px-6 py-3">
                  <Link href={`/events/${event.slug}`}
                    className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                    Register Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICE BOARD + RECENT ARTICLES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Notice Board */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Notice Board</h2>
            <div className="space-y-3">
              {notices.docs.length === 0 && (
                <p className="text-gray-400">No notices yet — add them in the CMS.</p>
              )}
              {notices.docs.map((notice: any) => (
                <div key={notice.id} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-100">
                  {notice.isNew && (
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded mt-0.5 shrink-0">NEW</span>
                  )}
                  <div>
                    <p className="font-medium text-sm">{notice.title}</p>
                    {notice.publishedAt && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(notice.publishedAt).toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
            <div className="space-y-4">
              {posts.docs.length === 0 && (
                <p className="text-gray-400">No articles yet — add them in the CMS.</p>
              )}
              {posts.docs.map((post: any) => (
                <Link key={post.id} href={`/articles/${post.slug}`}
                  className="flex gap-4 bg-white rounded-lg p-4 border border-gray-100 hover:shadow-sm transition group">
                  <div>
                    {post.category && (
                      <span className="text-xs font-semibold text-indigo-500 uppercase">{post.category}</span>
                    )}
                    <h3 className="font-semibold text-sm mt-0.5 group-hover:text-indigo-600">{post.title}</h3>
                    {post.readTime && <p className="text-xs text-gray-400 mt-0.5">{post.readTime} read</p>}
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/articles" className="inline-block mt-4 text-indigo-600 text-sm font-semibold hover:underline">
              View all articles →
            </Link>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.docs.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.docs.map((t: any) => (
                <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <p className="text-gray-600 text-sm italic mb-4">"{t.content}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    {t.designation && <p className="text-xs text-gray-400">{t.designation}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
 
    </div>
  )
}