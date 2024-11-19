import { Page } from '@playwright/test'

export async function openNavigationMenu(page: Page): Promise<void> {
  await page.waitForSelector('button.QRZeZW94tzeKMYPIcZBL', {
    state: 'visible',
    timeout: 5000,
  })
  const continueButton = page.locator('button.QRZeZW94tzeKMYPIcZBL')
  await continueButton.click()
  await page.waitForTimeout(1500)
}
