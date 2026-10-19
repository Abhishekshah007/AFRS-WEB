import { Logout } from '@payloadcms/ui'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { NavHamburger, NavWrapper } from '@payloadcms/next/client'
import type { ImportMap, Payload, PayloadRequest, SanitizedConfig, SanitizedPermissions } from 'payload'
import React from 'react'

import { ADMIN_ROLE_LABELS, getAdminRole } from '@/config/adminRoles'
import { buildAfrsNavGroups } from '@/lib/admin/buildAfrsNavGroups'
import { AfrsNavClient } from '@/components/admin/nav/AfrsNavClient'

const baseClass = 'nav'

type AdminNavProps = {
  payload: Payload
  permissions: SanitizedPermissions
  req: PayloadRequest
  user: unknown
  visibleEntities: { collections: string[]; globals: string[] }
  documentSubViewType?: string
  viewType?: string
  locale?: string
  params?: Record<string, string>
  searchParams?: Record<string, string>
  i18n: unknown
}

export default async function AdminNav(props: AdminNavProps) {
  const {
    documentSubViewType,
    locale,
    params,
    payload,
    permissions,
    req,
    searchParams,
    user,
    viewType,
    visibleEntities,
    i18n,
  } = props

  const config = payload.config as SanitizedConfig
  if (!config) return null

  const {
    admin: {
      components: { afterNav, afterNavLinks, beforeNav, beforeNavLinks, logout },
    },
    collections,
    globals,
    routes: { admin: adminRoute },
  } = config

  const role = getAdminRole(user)
  const roleLabel = role ? ADMIN_ROLE_LABELS[role] : null

  let policyRows: {
    role?: string | null
    hiddenCollections?: { slug?: string | null }[] | null
    hiddenGlobals?: { slug?: string | null }[] | null
  }[] | null = null

  if (role) {
    try {
      const adminAccess = await req.payload.findGlobal({
        slug: 'adminAccess',
        depth: 0,
        overrideAccess: true,
      })
      policyRows = (adminAccess as { roleMenus?: typeof policyRows })?.roleMenus ?? null
    } catch {
      policyRows = null
    }
  }

  const sections = buildAfrsNavGroups({
    adminRoute,
    collections,
    globals,
    permissions,
    role,
    policyRows,
    visibleCollectionSlugs: visibleEntities.collections,
    visibleGlobalSlugs: visibleEntities.globals,
  })

  const importMap = payload.importMap as ImportMap

  const serverProps = {
    i18n,
    locale,
    params,
    payload,
    permissions,
    searchParams,
    user,
  }

  const LogoutComponent = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: logout?.Button,
    Fallback: Logout,
    importMap,
    serverProps,
  })

  const RenderedBeforeNav = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: beforeNav,
    importMap,
    serverProps,
  })

  const RenderedBeforeNavLinks = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: beforeNavLinks,
    importMap,
    serverProps,
  })

  const RenderedAfterNavLinks = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: afterNavLinks,
    importMap,
    serverProps,
  })

  const RenderedAfterNav = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: afterNav,
    importMap,
    serverProps,
  })

  return (
    <NavWrapper baseClass={baseClass}>
      {RenderedBeforeNav}
      <nav className={`${baseClass}__wrap afrs-nav__wrap`}>
        {RenderedBeforeNavLinks}
        <AfrsNavClient adminRoute={adminRoute} sections={sections} roleLabel={roleLabel} />
        {RenderedAfterNavLinks}
        <div className={`${baseClass}__controls`}>{LogoutComponent}</div>
      </nav>
      {RenderedAfterNav}
      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-content`}>
          <NavHamburger baseClass={baseClass} />
        </div>
      </div>
    </NavWrapper>
  )
}
