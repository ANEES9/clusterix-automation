import { Browser, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { DashboardPage } from 'pages/task-management/'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'

let browser: Browser
let context: BrowserContext
let page: Page
let dashboardPage: DashboardPage
let locale: string

test.describe.parallel('Task Management Dashboard Tab Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()
    Allure.addAppOwner('Task Management')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    dashboardPage = new DashboardPage(page, locale)
    await dashboardPage.goTo(baseURL)
  })

  test('Validate Task management Page is accessible', async () => {
    Allure.addDescription(
      'This test verifies that all default page in the task Management is accessible.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the default folders in the task management',
      async () => {
        await dashboardPage.navigateToDashboard()
        await dashboardPage.navigateToSprintoverview()
        await dashboardPage.navigateToPinboard()
        await dashboardPage.navigateToGlobalTask()
        await dashboardPage.navigateToPerformance()
        await dashboardPage.navigateToStatistics()
        await dashboardPage.navigateToPerformancesub()
      }
    )
  })

  test('Validate "My Tasks" section under Dashboard', async () => {
    Allure.addDescription(
      'This test verifies that the "My Tasks" section is visible on the Dashboard and that the user can switch between urgency and deadline filters successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Ensure the user can navigate to the Dashboard and  the "My Tasks" section is visible',
      async () => {
        await dashboardPage.navigateToDashboard()
        await dashboardPage.clickOnMyTask()
      }
    )
  })

  test('Validate "My Completed Tasks" section under Dashboard', async () => {
    Allure.addDescription(
      'This test verifies that the "My Completed Tasks" section is visible on the Dashboard'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Ensure the user can navigate to the Dashboard and the "My Completed Tasks" section is visible',
      async () => {
        await dashboardPage.navigateToDashboard()
        await dashboardPage.clickOnMyCompletedtask()
      }
    )
  })
})
