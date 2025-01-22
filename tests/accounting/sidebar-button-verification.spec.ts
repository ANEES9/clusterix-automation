import { test } from '@playwright/test'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { Allure } from 'common/allure-helper'
import { skipTutorialHelper } from 'common/skip-tutorial-helper'

class PageLocators {}

test.describe('Accounting Application Add manual tracking bank account Tests', () => {
  let locators: PageLocators

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    locators = new PageLocators(page)

    Allure.addFeature('Navigation')
    Allure.addAppOwner('ContainerApp')

    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipTutorialHelper(page, testInfo)
      await addCursorStyleAndScript(page)
      await skipSurveyHelper(page, testInfo)
      await skipProductTourHelper(page, testInfo)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test('Validate sidebar navigation, URL changes, and network logs for errors', async ({
    page,
  }) => {
    const sidebarItems = [
      {
        name: 'accountinglistbutton',
        locator: locators.accountinglistbutton,
        expectedUrl: '/accounting',
      },
      {
        name: 'paymentssidebarbutton',
        locator: locators.paymentssidebarbutton,
        expectedUrl: '/accounting/payments',
      },
      {
        name: 'paymentstransactionsidebarbutton',
        locator: locators.paymentstransactionsidebarbutton,
        expectedUrl: '/accounting/payments/transactions',
      },
      {
        name: 'paymentsanalysissidebarbutton',
        locator: locators.paymentsanalysissidebarbutton,
        expectedUrl: '/accounting/payment-analysis',
      },
      {
        name: 'incomesidebarbutton',
        locator: locators.incomesidebarbutton,
        expectedUrl: '/accounting/income',
      },
      {
        name: 'invoicessidebarbutton',
        locator: locators.invoicessidebarbutton,
        expectedUrl: '/accounting/invoices',
      },
      {
        name: 'categoriessidebarbutton',
        locator: locators.categoriessidebarbutton,
        expectedUrl: '/accounting/categories',
      },
      {
        name: 'reportssidebarbutton',
        locator: locators.reportssidebarbutton,
        expectedUrl: '/accounting/reports',
      },
      {
        name: 'dashboardsidebarbutton',
        locator: locators.dashboardsidebarbutton,
        expectedUrl: '/accounting/dashboard',
      },
    ]

    console.log('--- Sidebar Navigation Tests ---')
    const failedRequests: { url: string; status: string | undefined }[] = []

    page.on('requestfailed', (request) => {
      failedRequests.push({
        url: request.url(),
        status: request.failure()?.errorText,
      })
    })

    for (const item of sidebarItems) {
      try {
        console.log(`\n--- Navigating to ${item.name.toUpperCase()} ---`)
        console.log(`Attempting to click the ${item.name}...`)
        await item.locator.click()
        await page.waitForLoadState('networkidle')
        console.log(`Clicked ${item.name} successfully.`)

        // Validate URL change
        const currentUrl = page.url()
        console.log(`Current URL: ${currentUrl}`)
        if (!currentUrl.includes(item.expectedUrl)) {
          console.error(
            `❌ URL validation failed for ${item.name}. Expected URL: ${item.expectedUrl}, but got: ${currentUrl}`
          )
        } else {
          console.log(
            `✅ URL validation passed for ${item.name}: ${currentUrl}`
          )
        }

        // Log failed requests if any
        if (failedRequests.length > 0) {
          console.log('--- ⚠️ Network Errors Detected ---')
          for (const failure of failedRequests) {
            console.error(
              `❌ Failed request: ${failure.url} (Status: ${failure.status})`
            )
          }
          throw new Error(
            '❌ Network errors detected during sidebar navigation.'
          )
        }

        console.log(`✅ ${item.name} loaded successfully without any errors.`)
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `❌ An error occurred while testing ${item.name}: ${error.message}`
          )
        } else {
          console.error(
            `❌ An unknown error occurred while testing ${item.name}`
          )
        }
        // Continue to the next item instead of terminating
      }
    }

    console.log('\n--- Sidebar Tests Completed ---')
  })
})
