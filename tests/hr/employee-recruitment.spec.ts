import { Browser, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { openPositionTable } from 'shared/utils/test-data/hr/open-position-data'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { EmployeeManagementPage } from 'pages/hr/employee-management.page'
import { EmployeeRecruitmentPage } from '../../pages/hr/employee-recruitment.page'

let browser: Browser
let context: BrowserContext
let page: Page
let employeeManagementPage: EmployeeManagementPage
let employeeRecruitmentPage: EmployeeRecruitmentPage
let locale: string
let createdEmployee: { firstName: string; lastName: string } | null = null

test.describe('HR > Employee Recruitment Test', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    test.setTimeout(300000)
    browser = testBrowser
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    employeeRecruitmentPage = new EmployeeRecruitmentPage(page, locale)
    await employeeRecruitmentPage.goto(baseURL!)
  })

  test('Verify Open Positions landing @smoke', async () => {
    //test.setTimeout(300000)
    Allure.addDescription('Verify Open Positions sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyOpenPositionsPageLoads()
    })
  })

  test('Verify LinkedIn Search landing @smoke', async () => {
    Allure.addDescription('Verify LinkedIn Search sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to LinkedIn Search', async () => {
      await employeeRecruitmentPage.navigateToLinkedInSearch()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyLinkedInSearchPageLoads()
    })
  })

  test('Verify Apollo Search landing @smoke', async () => {
    Allure.addDescription('Verify Apollo Search sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Apollo Search', async () => {
      await employeeRecruitmentPage.navigateToApolloSearch()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyApolloSearchPageLoads()
    })
  })

  test('Verify Lusha Search landing @smoke', async () => {
    Allure.addDescription('Verify Lusha Search sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Lusha Search', async () => {
      await employeeRecruitmentPage.navigateToLushaSearch()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyLushaSearchPageLoads()
    })
  })

  test('Verify Candidate List landing @smoke', async () => {
    Allure.addDescription('Verify Candidate List sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Candidate List', async () => {
      await employeeRecruitmentPage.navigateToCandidateList()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyCandidateListPageLoads()
    })
  })

  test.afterAll(async () => {
    await context.close()
  })
})
