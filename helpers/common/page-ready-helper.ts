import { Locator, Page } from '@playwright/test'

export async function waitForPageReady(
  page: Page,
  locator: Locator,
  pageName: string
) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await locator.waitFor({ state: 'visible', timeout: 60000 })
      return
    } catch {
      if (attempt === 2) {
        throw new Error(`${pageName} did not stay ready after 2 attempts`)
      }
    }

    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(3000)
  }
}
