import type { Access, CollectionConfig, GlobalConfig } from 'payload'
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

export const eventRegistrationAccess: CollectionConfig['access'] = {
    create: isPublic,
    read: isAdminOrEventManager,
    update: isAdminOrEventManager,
    delete: isAdmin,
}

export const editorManagedGlobalAccess: GlobalConfig['access'] = {
    read: isPublic,
    update: isAdminOrEditor,
}
