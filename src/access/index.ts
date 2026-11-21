import type { Access, CollectionConfig, GlobalConfig } from 'payload'
import { isStaffUser } from '../config/adminRoles'
import { publishedRead } from './published'

export { publishedRead } from './published'

const getRole = (user: unknown) => (user as { role?: string } | null | undefined)?.role

export const isAdmin: Access = ({ req: { user } }) =>
    getRole(user) === 'superAdmin'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
    const role = getRole(user)
    return Boolean(role && ['superAdmin', 'contentEditor'].includes(role))
}

export const isAdminOrEventManager: Access = ({ req: { user } }) => {
    const role = getRole(user)
    return Boolean(role && ['superAdmin', 'eventManager'].includes(role))
}

export const isLoggedIn: Access = ({ req: { user } }) =>
    Boolean(user)

export const isPublic: Access = () => true

export const isSelfOrAdmin: Access = ({ req: { user } }) => {
    if (!user) return false
    if (getRole(user) === 'superAdmin') return true
    return { id: { equals: user.id } }
}

export const editorManagedPublishedAccess: CollectionConfig['access'] = {
    create: isAdminOrEditor,
    read: publishedRead,
    update: isAdminOrEditor,
    delete: isAdmin,
}

export const eventManagedPublishedAccess: CollectionConfig['access'] = {
    create: isAdminOrEventManager,
    read: publishedRead,
    update: isAdminOrEventManager,
    delete: isAdmin,
}

export const isAdminEditorOrEventManager: Access = ({ req: { user } }) => {
    const role = getRole(user)
    return Boolean(role && ['superAdmin', 'contentEditor', 'eventManager'].includes(role))
}

/** Staff roles that may sign in to the admin panel (students are excluded). */
export const canAccessAdmin = ({ req: { user } }: { req: { user?: unknown } }): boolean =>
    isStaffUser(user)

/**
 * Registrations are created only by the guarded `/api/*-registrations/*` routes,
 * which use the Local API with `overrideAccess: true`. Public REST create stays
 * closed so Turnstile, rate limits and server-side price checks cannot be skipped.
 */
export const eventRegistrationAccess: CollectionConfig['access'] = {
    create: isAdminOrEventManager,
    read: isAdminEditorOrEventManager,
    update: isAdminOrEventManager,
    delete: isAdmin,
}

/**
 * Media is public except files uploaded by participants (payment proofs, ID
 * documents), which are flagged `isPrivate` and visible to staff only.
 */
export const mediaRead: Access = ({ req: { user } }) => {
    if (isStaffUser(user)) return true
    return {
        or: [{ isPrivate: { equals: false } }, { isPrivate: { exists: false } }],
    }
}

export const editorManagedGlobalAccess: GlobalConfig['access'] = {
    read: isPublic,
    update: isAdminOrEditor,
}
