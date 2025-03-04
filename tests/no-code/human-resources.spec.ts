import { Browser, expect, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { HumanResourcesPage } from 'pages/no-code/human-resources-page'

let browser: Browser
let context: BrowserContext
let page: Page
let humanResourcesPage: HumanResourcesPage
let locale: string

test.describe.parallel('Human Resources Tab Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    Allure.addAppOwner('No Code')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')

    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    humanResourcesPage = new HumanResourcesPage(page, locale)
    await humanResourcesPage.gotoHumanResources(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Validate Human Resources Table Search Functionality', async () => {
    await humanResourcesPage.searchFirstItem()
  })
})
