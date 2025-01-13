import { Page } from '@playwright/test'

export async function closeProductTour(page: Page) {
  await page.waitForSelector('button:has-text("Skip tour")', {
    state: 'visible',
    timeout: 2000,
  })
  const skipTourButton = page.locator('button:has-text("Skip tour")')
  await skipTourButton.click()
  await page.waitForTimeout(2000)
}
