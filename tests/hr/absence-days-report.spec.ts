import { Browser, BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { AbsenceDaysReportPage } from 'pages/hr/absence-days-report.page'
import { setupTestContext } from 'utils/test-context'

let browser: Browser
let context: BrowserContext
let page: Page
let absenceDaysReportPage: AbsenceDaysReportPage

test.describe('HR > Absence Days Report Test', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    await setupTestContext(page, testInfo)
    absenceDaysReportPage = new AbsenceDaysReportPage(page)
    await absenceDaysReportPage.goto(baseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify Absence days report landing @smoke', async () => {
    Allure.addDescription('Verify Absence days report page loads correctly')
    Allure.addSeverity('critical')

    await Allure.step('Step 2: Verify page loads', async () => {
      await absenceDaysReportPage.verifyAbsenceDaysReportPageLoads()
    })
  })
})
