import { Browser, BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { LocationAndTeamsPage } from 'pages/hr/location-and-teams.page'
import { setupTestContext } from 'utils/test-context'

let browser: Browser
let context: BrowserContext
let page: Page
let locationAndTeamsPage: LocationAndTeamsPage

test.describe('HR > Location and Teams Test', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    test.setTimeout(300000)
    browser = testBrowser
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    await setupTestContext(page, testInfo)
    locationAndTeamsPage = new LocationAndTeamsPage(page)
    await locationAndTeamsPage.goto(baseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify Location and Teams landing @smoke', async () => {
    //test.setTimeout(180000)
    Allure.addDescription('Verify Location and Teams page loads correctly')
    Allure.addSeverity('critical')

    await Allure.step('Step 2: Verify page loads', async () => {
      await locationAndTeamsPage.verifyPageLoads()
    })
  })

  test.afterAll(async () => {
    await context.close()
  })
})
