import { test, expect } from '@playwright/test'

const gotoOptions = { waitUntil: 'domcontentloaded' as const }

test.describe('Public site', () => {
  test('homepage loads with hero headline', async ({ page }) => {
    await page.goto('/', gotoOptions)
    await expect(page.locator('h1').first()).toContainText(/Evidence|Forensic|Science/i)
  })

  test('about page loads', async ({ page }) => {
    await page.goto('/about', gotoOptions)
    await expect(page).toHaveURL(/\/about/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('contact page shows message form', async ({ page }) => {
    await page.goto('/contact', gotoOptions)
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible()
    await expect(page.getByPlaceholder('Your name')).toBeVisible()
  })

  test('search page loads', async ({ page }) => {
    await page.goto('/search?q=forensic', gotoOptions)
    await expect(page).toHaveURL(/\/search/)
    await expect(page.locator('body')).toContainText(/search|result/i)
  })

  test('student hub loads', async ({ page }) => {
    await page.goto('/student-hub', gotoOptions)
    await expect(page).toHaveURL(/\/student-hub/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('programmes page loads', async ({ page }) => {
    await page.goto('/courses', gotoOptions)
    await expect(page).toHaveURL(/\/courses/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('services page loads', async ({ page }) => {
    await page.goto('/services', gotoOptions)
    await expect(page).toHaveURL(/\/services/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('events listing loads', async ({ page }) => {
    await page.goto('/events', gotoOptions)
    await expect(page).toHaveURL(/\/events/)
    await expect(page.locator('h1').first()).toBeVisible()
  })
})

test.describe('Registration privacy', () => {
  test('confirmation without valid token hides registrant details', async ({ page }) => {
    await page.goto('/courses/register/confirmation/999999', gotoOptions)
    await expect(page.getByRole('heading', { name: 'Thank you for registering' })).toBeVisible()
    await expect(page.getByText('REGISTRATION RECEIVED')).toBeVisible()
    await expect(page.getByText('Registration ID:')).not.toBeVisible()
    await expect(page.getByText('Payment Reference:')).not.toBeVisible()
    await expect(page.locator('.rounded-2xl.border.border-slate-200.bg-slate-50')).not.toBeVisible()
  })

  test('invalid confirmation token still hides registrant details', async ({ page }) => {
    await page.goto('/courses/register/confirmation/999999?token=invalid-token-value', gotoOptions)
    await expect(page.getByRole('heading', { name: 'Thank you for registering' })).toBeVisible()
    await expect(page.getByText('Registration ID:')).not.toBeVisible()
    await expect(page.locator('.rounded-2xl.border.border-slate-200.bg-slate-50')).not.toBeVisible()
  })
})

test.describe('SEO and AdSense', () => {
  test('homepage exposes AdSense, language, JSON-LD and skip link', async ({ page }) => {
    await page.goto('/', gotoOptions)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-IN')
    await expect(page.locator('meta[name="google-adsense-account"]')).toHaveAttribute(
      'content',
      'ca-pub-8288475343941232',
    )
    await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached()
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content',
    )
    await expect(page.locator('#main-content')).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/$/)
  })

  test('search stays noindex', async ({ page }) => {
    await page.goto('/search', gotoOptions)
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', /noindex/i)
  })

  test('robots, sitemap and ads.txt are published', async ({ request }) => {
    const robots = await request.get('/robots.txt')
    expect(robots.ok()).toBeTruthy()
    const robotsBody = await robots.text()
    expect(robotsBody).toContain('Allow: /')
    expect(robotsBody).toContain('Disallow: /admin')
    expect(robotsBody).toContain('Sitemap:')

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.ok()).toBeTruthy()
    const sitemapBody = await sitemap.text()
    expect(sitemapBody).toContain('<urlset')
    expect(sitemapBody).toContain('/about')
    expect(sitemapBody).toContain('/services')

    const ads = await request.get('/ads.txt')
    expect(ads.ok()).toBeTruthy()
    expect(await ads.text()).toContain('google.com, pub-8288475343941232, DIRECT, f08c47fec0942fa0')
  })

  test('legacy article URL permanently redirects', async ({ request }) => {
    const response = await request.get('/articles', { maxRedirects: 0 })
    expect(response.status()).toBeGreaterThanOrEqual(300)
    expect(response.status()).toBeLessThan(400)
    const location = response.headers().location || ''
    expect(location).toContain('/student-hub/articles')
  })
})

test.describe('Public API guards', () => {
  test('rejects empty chat payload', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: { messages: [] },
    })
    expect(response.status()).toBe(400)
  })

  test('rate limits excessive chat requests', async ({ request }) => {
    let sawRateLimit = false

    for (let attempt = 0; attempt < 35; attempt += 1) {
      const response = await request.post('/api/chat', {
        data: { messages: [] },
      })

      if (response.status() === 429) {
        sawRateLimit = true
        break
      }

      expect(response.status()).toBe(400)
    }

    expect(sawRateLimit).toBe(true)
  })

  test('rejects incomplete contact submission', async ({ request }) => {
    const response = await request.post('/api/contact-messages/submit', {
      data: { fullName: 'Test', email: '', message: '' },
    })
    expect(response.status()).toBe(400)
  })
})
