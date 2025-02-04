import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { DashboardPage } from 'pages/accounting/dashboard-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Dashboard Tab Tests', () => {
  let dashboardPage: DashboardPage
  let locale: string

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    Allure.addFeature(' Sidebar navigation')
    Allure.addAppOwner('Accounting')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    dashboardPage = new DashboardPage(page, locale)
    await dashboardPage.goto(baseURL)
    await page.waitForLoadState('networkidle')
  })

  test('Validate Dashboard navigation from sidebar', async () => {
    await dashboardPage.validateDashboardNavigation()
  })

  test('Validate Bank Accounts navigation from sidebar', async () => {
    await dashboardPage.validateBankAccountNavigation()
  })

  test('Validate Payment Transactions navigation from sidebar', async () => {
    await dashboardPage.validatePaymentTransactionsNavigation()
  })

  test('Validate Chart Of Accounts navigation from sidebar', async () => {
    await dashboardPage.validateChartOfAccountsNavigation()
  })

  test('Validate Customers navigation from sidebar', async () => {
    await dashboardPage.validateCustomersNavigation()
  })

  test('Validate Invoices navigation from sidebar', async () => {
    await dashboardPage.validateInvoicesNavigation()
  })

  test('Validate Products navigation from sidebar', async () => {
    await dashboardPage.validateProductsNavigation()
  })

  test('Validate Categories navigation from sidebar', async () => {
    await dashboardPage.validateCategoriesNavigation()
  })

  test('Validate Reports navigation from sidebar', async () => {
    await dashboardPage.validateReportsNavigation()
  })
})
