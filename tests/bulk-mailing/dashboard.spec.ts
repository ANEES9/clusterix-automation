import { Browser, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { DashboardPage } from 'pages/bulk-mailing/dashboard-page'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'

let browser: Browser
let context: BrowserContext
let page: Page
let dashboardPage: DashboardPage
let locale: string

test.describe.parallel('Dashboard Tab Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    Allure.addAppOwner('Bulk Mailing')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    dashboardPage = new DashboardPage(page, locale)
    await dashboardPage.goto(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Validate Dashboard navigation from sidebar', async () => {
    await dashboardPage.validateDashboardNavigation()
  })

  test('Validate Campaigns navigation from sidebar', async () => {
    await dashboardPage.validateCampaignsNavigation()
  })

  test('Validate Audience navigation from sidebar', async () => {
    await dashboardPage.validateAudienceNavigation()
  })
})
