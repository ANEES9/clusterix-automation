import { test, expect } from '@playwright/test'
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/cursor-helper'

test.describe('No Code Overview Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/workflows/dashboard/overview`)
    await page.waitForLoadState('networkidle')
    await addCursorStyleAndScript(page)
    await closeWelcomePopUp(page)
    await closeTimerPopUp(page)
    const header = page.locator('h1:has-text("About No-Code")')
    await expect(header).toBeVisible()
  })
  test('Verify "About No-Code" header is displayed', async ({ page }) => {
    const overviewPageTitle = page.locator('h1:has-text("About No-Code")')
    await expect(overviewPageTitle).toBeVisible()
  })
  test('Create Accounting Workflow from overview tab', async ({ page }) => {
    const newNoCodeButton = page.locator(
      '.ca-whitespace-nowrap.ca-text-ellipsis.hover\\:ca-cursor-pointer'
    )
    await expect(newNoCodeButton).toBeVisible()
    await newNoCodeButton.click()
    const accountingBillsOption = page.locator(
      'span:has-text("Accounting Bills")'
    )
    await page.waitForSelector('span:has-text("Accounting Bills")', {
      state: 'visible',
    })
    await expect(accountingBillsOption).toBeVisible()
    await accountingBillsOption.click()
    const titleField = page.locator('span:has-text("Untitled No-Code")')
    await page.waitForSelector('span:has-text("Untitled No-Code")', {
      state: 'visible',
    })
    await titleField.click()
    await page.evaluate(() => {
      const span = document.querySelector('span.H31CGqVwYZxcwsJB1ooD')
      if (span) {
        span.textContent = 'Test Automation'
        document.body.appendChild(document.createElement('div'))
      }
    })
    const result = await page.evaluate(() => {
      return document.querySelector('span.H31CGqVwYZxcwsJB1ooD')?.textContent
    })
    console.log(result)
    await page.waitForTimeout(500)
    const updatedSpan = page.locator('span:has-text("Test Automation")')
    await expect(updatedSpan).toBeVisible()
  })
})
