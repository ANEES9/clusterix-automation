import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { DashboardPage } from 'pages/bulk-mailing/dashboard-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Dashboard Tab Tests', () => {
  let dashboardPage: DashboardPage
  let locale: string

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
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
