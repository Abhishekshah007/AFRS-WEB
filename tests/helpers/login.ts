import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export interface LoginOptions {
  page: Page
  serverURL?: string
  user: {
    email: string
    password: string
  }
}

export async function waitForAdminShell(page: Page): Promise<void> {
  await expect(page.locator('span[title="Dashboard"]').first()).toBeVisible({ timeout: 30_000 })
}

/**
 * Logs the user into the admin panel via the login page.
 */
export async function login({
  page,
  serverURL = 'http://localhost:3000',
  user,
}: LoginOptions): Promise<void> {
  await page.goto(`${serverURL}/admin/login`, { waitUntil: 'domcontentloaded' })

  await page.locator('#field-email').fill(user.email)
  await page.locator('#field-password').fill(user.password)
  await page.locator('button[type="submit"]').click()

  await page.waitForURL(/\/admin(?!\/login)/, { timeout: 30_000 })
  await waitForAdminShell(page)
}
