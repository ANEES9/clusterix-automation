import {
  Browser,
  Page,
  Request,
  Response,
  expect,
  test,
} from '@playwright/test'
import * as fs from 'node:fs'
import { Allure } from 'common/allure-helper'
import { employeeTable } from 'shared/utils/test-data/hr/employee-management-data'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { EmployeeManagementPage } from 'pages/hr/employee-management.page'
import { HrDashboardPage } from 'pages/hr/hr-dashboard.page'

let browser: Browser
let context: BrowserContext
let page: Page
let employeeManagementPage: EmployeeManagementPage
let hrDashboardPage: HrDashboardPage
let locale: string
let createdEmployee: { firstName: string; lastName: string } | null = null

test.describe('HR > Employee Management Test', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    test.setTimeout(300000)
    browser = testBrowser
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    employeeManagementPage = new EmployeeManagementPage(page, locale)
    hrDashboardPage = new HrDashboardPage(page, locale)
    await employeeManagementPage.goto(baseURL!)
  })

  test('Verify Employees sub-page landing @smoke', async () => {
    //test.setTimeout(180000)
    Allure.addDescription('Verify Employees sub-page loads correctly')
    Allure.addSeverity('critical')
    /*await Allure.step('Step 1: Navigate to Employees sub-page', async () => {
      await employeeManagementPage.navigateToEmployees()
    })*/
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyEmployeesPageLoads()
    })
  })

  test('Verify Request Management landing @smoke', async () => {
    Allure.addDescription('Verify Request Management sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Request Management', async () => {
      await employeeManagementPage.navigateToRequestManagement()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyRequestManagementPageLoads()
    })
  })

  test('Verify Activity Type landing @smoke', async () => {
    Allure.addDescription('Verify Activity Type sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Activity Type', async () => {
      await employeeManagementPage.navigateToActivityType()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyActivityTypePageLoads()
    })
  })

  test('Verify Bonus Agreement landing @smoke', async () => {
    Allure.addDescription('Verify Bonus Agreement sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Bonus Agreement', async () => {
      await employeeManagementPage.navigateToBonusAgreement()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyBonusAgreementPageLoads()
    })
  })

  test('Verify Reassignments Overview landing @smoke', async () => {
    Allure.addDescription(
      'Verify Reassignments Overview sub-page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step(
      'Step 1: Navigate to Reassignments Overview',
      async () => {
        await employeeManagementPage.navigateToReassignmentsOverview()
      }
    )
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyReassignmentsOverviewPageLoads()
    })
  })

  test('Verify Vacation Report landing @smoke', async () => {
    Allure.addDescription('Verify Vacation Report sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Vacation Report', async () => {
      await employeeManagementPage.navigateToVacationReport()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyVacationReportPageLoads()
    })
  })

  test('Verify Change Owner landing @smoke', async () => {
    Allure.addDescription('Verify Change Owner sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Change Owner', async () => {
      await employeeManagementPage.navigateToChangeOwner()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyChangeOwnerPageLoads()
    })
  })

  test.afterAll(async () => {
    await context?.close()
  })

})
