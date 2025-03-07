import { Browser, Page, test } from '@playwright/test'
import { EmployeeManagementPage } from 'pages/hr/employee-management.page'
import { Allure } from 'common/allure-helper'
import { VacationAbsenceDaysPage } from 'pages/my-profile/vacation-absence-days.page'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'

let browser: Browser
let context: BrowserContext
let page: Page
let vacationAbsenceDaysPage: VacationAbsenceDaysPage
let employeeManagementPage: EmployeeManagementPage
let locale: string

test.describe('Regression Test Suite', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    vacationAbsenceDaysPage = new VacationAbsenceDaysPage(page, locale)
    employeeManagementPage = new EmployeeManagementPage(page, locale)
    await vacationAbsenceDaysPage.goto(baseURL)
    await page.waitForLoadState('networkidle')
  })

  test('Verify selecting available filter', async () => {
    Allure.addDescription('Verify remaining number of Leaves')
    Allure.addTag('regression')
    Allure.addSeverity('normal')

    await Allure.step('Step 1: Choose all the filters', async () => {
      await vacationAbsenceDaysPage.VerifyAllStatusesFilter()
    })
  })

  test('Verify All Available Absence Types', async ({}) => {
    Allure.addDescription('Verify all available absence types in the system')
    Allure.addTag('regression')
    Allure.addSeverity('normal')

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Verify available absence types', async () => {
      await vacationAbsenceDaysPage.VerifyAvailableAbsenceTypes()
    })
  })

  test('Verify remaining number of Leaves in Vacation Days section', async ({}) => {
    Allure.addDescription('Verify remaining number of Leaves')
    Allure.addTag('regression') // Tag the test for categorization in reports
    Allure.addSeverity('normal') // Set severity level for the test

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectPaidVacation()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step('Step 3: Verify remaining number of leaves', async () => {
      await vacationAbsenceDaysPage.verifyRemainingNumberOfPaidLeaves()
    })
  })

  test('Verify remaining number of Leaves in Sick Days section', async () => {
    Allure.addDescription('Verify remaining number of Leaves')
    Allure.addTag('regression')
    Allure.addSeverity('normal')

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectSickLeave()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step(
      'Step 3: Verify remaining number of sick leaves',
      async () => {
        await vacationAbsenceDaysPage.verifyRemainingNumberOfSickLeaves()
      }
    )
  })

  test('Verify cancelling of absence modal', async ({}) => {
    Allure.addDescription('Verify remaining number of Leaves')
    Allure.addTag('regression')
    Allure.addSeverity('normal')

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: click cancel button', async () => {
      await vacationAbsenceDaysPage.verifyCancellingOfAbsenceModal()
    })
  })
})
