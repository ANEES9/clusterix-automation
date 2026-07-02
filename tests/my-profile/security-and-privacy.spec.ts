import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { SecurityAndPrivacyPage } from 'pages/my-profile/security-and-privacy.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let securityAndPrivacyPage: SecurityAndPrivacyPage

test.describe('My Profile > Security & Privacy', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    securityAndPrivacyPage = new SecurityAndPrivacyPage(page, locale)
    await securityAndPrivacyPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the Security & Privacy page loads @smoke', async () => {
    Allure.addDescription(
      'Verify that the Security & Privacy page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step(
      'Step 1: Verify Security & Privacy page URL',
      async () => {
        await securityAndPrivacyPage.verifyPageUrl()
      }
    )
    await Allure.step(
      'Step 2: Verify Security & Privacy page heading',
      async () => {
        await securityAndPrivacyPage.verifyPageHeading()
      }
    )
  })
})
