import { Browser, BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { OrganizationChartPage } from 'pages/hr/organization-chart.page'
import { setupTestContext } from 'utils/test-context'

let browser: Browser
let context: BrowserContext
let page: Page
let organizationChartPage: OrganizationChartPage

test.describe('HR > Organization Chart Test', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    //test.setTimeout(300000)
    browser = testBrowser
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    await setupTestContext(page, testInfo)
    organizationChartPage = new OrganizationChartPage(page)
    await organizationChartPage.goto(baseURL)
    await page.waitForLoadState('networkidle')
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify Organization Chart landing @smoke', async () => {
    Allure.addDescription('Verify Organization Chart page loads correctly')
    Allure.addSeverity('critical')

    await Allure.step('Step 2: Verify page loads', async () => {
      test.setTimeout(180000)
      await organizationChartPage.verifyOrganizationChartPageLoads()
    })
  })

  test.afterAll(async () => {
    await context.close()
  })
})
