import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { CampaignsPage } from 'pages/bulk-mailing/campaigns-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Dashboard Tab Tests', () => {
  let campaignsPage: CampaignsPage
  let locale: string

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    Allure.addAppOwner('Bulk Mailing')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    campaignsPage = new CampaignsPage(page, locale)
    await campaignsPage.goto(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })
})
