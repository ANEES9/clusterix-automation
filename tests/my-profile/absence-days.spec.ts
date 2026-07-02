import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { AbsenceDaysPage } from 'pages/my-profile/absence-days.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let absenceDaysPage: AbsenceDaysPage

test.describe('My Profile > Absence Days', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    absenceDaysPage = new AbsenceDaysPage(page, locale)
    await absenceDaysPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the Absence Days page loads @smoke', async () => {
    Allure.addDescription('Verify that the Absence Days page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Verify Absence Days page URL', async () => {
      await absenceDaysPage.verifyPageUrl()
    })
    await Allure.step('Step 2: Verify Absence Days page heading', async () => {
      await absenceDaysPage.verifyPageHeading()
    })
  })
})
