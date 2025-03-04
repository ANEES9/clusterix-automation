import { Browser, expect, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { AccountingInvoicesPage } from 'pages/no-code/accounting-invoices-page'

let browser: Browser
let context: BrowserContext
let page: Page
let accountingInvoicesPage: AccountingInvoicesPage
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
    accountingInvoicesPage = new AccountingInvoicesPage(page, locale)
    await accountingInvoicesPage.gotoAccountingInvoices(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Validate Accounting Invoices Table Search Functionality', async () => {
    await accountingInvoicesPage.searchFirstItem()
  })
})
