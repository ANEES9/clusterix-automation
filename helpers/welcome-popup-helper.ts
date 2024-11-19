import { Page } from '@playwright/test'

export async function closeWelcomePopUp(page: Page) {
  await page.waitForSelector(
    'div.ReactModalPortal > div > div > div.ca-text-theme',
    { state: 'visible', timeout: 5000 }
  )
  const closeButton = page.locator(
    'div.ReactModalPortal > div > div > div.ca-text-theme'
  )
  await closeButton.click()
  await page.waitForTimeout(2000)
}
