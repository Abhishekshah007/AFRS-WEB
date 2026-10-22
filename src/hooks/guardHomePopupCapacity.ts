import { APIError, type CollectionBeforeChangeHook } from 'payload'

import {
  HOME_POPUP_LIMIT,
  countHomePopupSlots,
  isEligibleHomePopupEvent,
} from '@/lib/popups/homePopupQueue'
import type { Event as AfrsEvent, SitePopup } from '@/payload-types'

const LIMIT_MESSAGE = `Homepage popups are limited to ${HOME_POPUP_LIMIT}. Unpublish a poster or turn off “Show in homepage popup” on an upcoming or ongoing event before adding another.`

async function assertCapacity(
  req: Parameters<CollectionBeforeChangeHook>[0]['req'],
  posters: { id?: number | null; published?: boolean | null }[],
  events: Parameters<typeof isEligibleHomePopupEvent>[0][],
): Promise<void> {
  if (countHomePopupSlots(posters, events) > HOME_POPUP_LIMIT) {
    throw new APIError(LIMIT_MESSAGE, 400)
  }
}

export const guardSitePopupCapacity: CollectionBeforeChangeHook<SitePopup> = async ({
  data,
  originalDoc,
  req,
}) => {
  const next = { ...originalDoc, ...data }
  if (!next.published) return data

  const [popupResult, eventResult] = await Promise.all([
    req.payload.find({
      collection: 'sitePopups',
      where: { published: { equals: true } },
      limit: 20,
      depth: 0,
      pagination: false,
      req,
    }),
    req.payload.find({
      collection: 'events',
      where: {
        and: [{ published: { equals: true } }, { showInHomePopup: { equals: true } }],
      },
      limit: 50,
      depth: 0,
      pagination: false,
      req,
    }),
  ])

  const posters = [
    ...popupResult.docs
      .filter((doc) => doc.id !== originalDoc?.id)
      .map((doc) => ({ id: doc.id, published: doc.published })),
    { id: originalDoc?.id, published: true },
  ]

  await assertCapacity(req, posters, eventResult.docs as AfrsEvent[])
  return data
}

export const guardEventPopupCapacity: CollectionBeforeChangeHook<AfrsEvent> = async ({
  data,
  originalDoc,
  req,
}) => {
  const next = { ...originalDoc, ...data }
  if (!isEligibleHomePopupEvent(next)) return data

  const [popupResult, eventResult] = await Promise.all([
    req.payload.find({
      collection: 'sitePopups',
      where: { published: { equals: true } },
      limit: 20,
      depth: 0,
      pagination: false,
      req,
    }),
    req.payload.find({
      collection: 'events',
      where: {
        and: [{ published: { equals: true } }, { showInHomePopup: { equals: true } }],
      },
      limit: 50,
      depth: 0,
      pagination: false,
      req,
    }),
  ])

  const events = (eventResult.docs as AfrsEvent[]).filter((doc) => doc.id !== originalDoc?.id)
  events.push(next as AfrsEvent)

  await assertCapacity(req, popupResult.docs, events)
  return data
}
