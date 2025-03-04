import { Browser, expect, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { CustomersPage } from 'pages/no-code/customers-page'

let browser: Browser
let context: BrowserContext
let page: Page
let customersPage: CustomersPage
let locale: string

test.describe.parallel('Accounting Bills Tab Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    Allure.addAppOwner('No Code')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')

    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    customersPage = new CustomersPage(page, locale)
    await customersPage.gotoCustomers(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Validate Customers Table Search Functionality', async () => {
    await customersPage.searchFirstItem()
  })
})
