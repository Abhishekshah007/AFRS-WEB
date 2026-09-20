import { test, expect, Page } from '@playwright/test'
import { login, waitForAdminShell } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

test.describe.configure({ mode: 'serial', timeout: 180_000 })

test.describe('Admin Panel', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    await seedTestUser()

    const context = await browser.newContext({ baseURL: 'http://localhost:3000' })
    page = await context.newPage()

    await login({ page, user: testUser })
  }, { timeout: 180_000 })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto('/admin', { waitUntil: 'load' })
    await expect(page).toHaveURL(/\/admin(?!\/login)/)
    await waitForAdminShell(page)
  })

  test('can navigate to list view', async () => {
    await page.goto('/admin/collections/users', { waitUntil: 'load' })
    await expect(page).toHaveURL(/\/admin\/collections\/users/)
    await waitForAdminShell(page)
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible({ timeout: 30_000 })
  })

  test('can navigate to edit view', async () => {
    await page.goto('/admin/collections/users/create', { waitUntil: 'load' })
    await expect(page).toHaveURL(/\/admin\/collections\/users\/create/)
    await waitForAdminShell(page)
    await expect(page.locator('#field-email')).toBeVisible({ timeout: 30_000 })
  })
})
