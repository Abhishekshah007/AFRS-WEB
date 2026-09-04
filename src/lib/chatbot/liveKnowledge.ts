import { getProgrammesCatalogData } from '@/components/programmes/catalog'
import { formatEventDate, richTextToPlain } from '@/lib/cms'
import { fetchActiveEvents } from '@/lib/queries/events'
import { getPayloadClient } from '@/lib/payload'
import type { Event as AfrsEvent } from '@/payload-types'

const CACHE_TTL_MS = 5 * 60 * 1000

let cached: { text: string; fetchedAt: number } | null = null

function registerUrl(params: {
  type: 'education' | 'training'
  categorySlug: string
  categoryTitle: string
  programmeId: string
  programmeTitle: string
  duration?: string
  mode?: string
}): string {
  const q = new URLSearchParams({
    type: params.type,
    categorySlug: params.categorySlug,
    categoryTitle: params.categoryTitle,
    programmeId: params.programmeId,
    programmeTitle: params.programmeTitle,
  })
  if (params.duration) q.set('duration', params.duration)
  if (params.mode) q.set('mode', params.mode)
  return `/courses/register?${q.toString()}`
}

async function buildLiveKnowledge(): Promise<string> {
  const payload = await getPayloadClient()
  const [eventsResult, catalog] = await Promise.all([
    fetchActiveEvents(payload, { limit: 12, depth: 0 }),
    getProgrammesCatalogData(),
  ])

  const eventLines = (eventsResult.docs as AfrsEvent[]).map((evt) => {
    const date = formatEventDate(evt.startDate)
    const type = evt.eventType || 'event'
    const venue = evt.venue ? ` · ${evt.venue}` : ''
    const reg = evt.registrationOpen === false ? 'Registration closed' : 'Registration open'
    const excerpt = evt.excerpt || richTextToPlain(evt.description, 100)
    return `- ${evt.title} (${type}, ${date}${venue}) — /events/${evt.slug} — ${reg}${excerpt ? ` — ${excerpt}` : ''}`
  })

  const educationLines = catalog.educationCategories.flatMap((cat) =>
    cat.programmes.map((p) => {
      const href = registerUrl({
        type: 'education',
        categorySlug: cat.slug,
        categoryTitle: cat.title,
        programmeId: p.id,
        programmeTitle: p.title,
        duration: p.duration,
        mode: p.mode,
      })
      return `- ${p.title} (${cat.title}) · ${p.duration || 'duration TBC'} · ${p.mode || 'mode TBC'} — ${href}`
    }),
  )

  const trainingLines = catalog.trainingCategories.flatMap((cat) =>
    cat.programmes.map((p) => {
      const href = registerUrl({
        type: 'training',
        categorySlug: cat.slug,
        categoryTitle: cat.title,
        programmeId: p.id,
        programmeTitle: p.title,
        duration: p.duration,
        mode: p.mode,
      })
      return `- ${p.title} (${cat.title}) · ${p.duration || 'duration TBC'} · ${p.mode || 'mode TBC'} — ${href}`
    }),
  )

  return `
LIVE DATA FROM CMS (updated automatically — prefer this over static lists)

UPCOMING & ONGOING EVENTS (${eventLines.length}):
${eventLines.length ? eventLines.join('\n') : '- No active events listed right now. Check /events or /contact.'}

EDUCATION PROGRAMMES (${educationLines.length}):
${educationLines.length ? educationLines.slice(0, 20).join('\n') : '- See /courses for education programmes.'}

TRAINING / INTERNSHIP PROGRAMMES (${trainingLines.length}):
${trainingLines.length ? trainingLines.slice(0, 20).join('\n') : '- See /courses for training and internships.'}
`.trim()
}

export async function getLiveChatKnowledge(): Promise<string> {
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.text
  }

  try {
    const text = await buildLiveKnowledge()
    cached = { text, fetchedAt: Date.now() }
    return text
  } catch (error) {
    console.error('[chatbot] live knowledge fetch failed', error)
    return cached?.text || 'LIVE CMS DATA: temporarily unavailable — use static URLs.'
  }
}

export function clearLiveChatKnowledgeCache(): void {
  cached = null
}
