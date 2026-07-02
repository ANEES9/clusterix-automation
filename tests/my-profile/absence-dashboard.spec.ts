import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { AbsenceDashboardPage } from 'pages/my-profile/absence-dashboard.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let absenceDashboardPage: AbsenceDashboardPage

test.describe('My Profile > Absence Dashboard', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    absenceDashboardPage = new AbsenceDashboardPage(page, locale)
    await absenceDashboardPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the Absence Dashboard page loads @smoke', async () => {
    Allure.addDescription(
      'Verify that the Absence Dashboard page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Verify Absence Dashboard page URL', async () => {
      await absenceDashboardPage.verifyPageUrl()
    })
    await Allure.step(
      'Step 2: Verify Absence Dashboard page heading',
      async () => {
        await absenceDashboardPage.verifyPageHeading()
      }
    )
  })
})
