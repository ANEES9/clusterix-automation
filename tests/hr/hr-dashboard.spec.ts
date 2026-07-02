import { Browser, Page, test } from '@playwright/test'
import { Allure } from '../../helpers/common/allure-helper'
import { setupTestContext } from '../../shared/utils/test-context'
import { BrowserContext } from 'playwright'
import { HrDashboardPage } from '../../pages/hr/hr-dashboard.page'

let browser: Browser
let context: BrowserContext
let page: Page
let hrDashboardPage: HrDashboardPage
let locale: string

test.describe('HR > Dashboard', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    //test.setTimeout(300000)
    browser = testBrowser
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    hrDashboardPage = new HrDashboardPage(page, locale)
    await hrDashboardPage.goto(baseURL!)
  })

  test('Verify Dashboard page loads @smoke', async () => {
    //test.setTimeout(180000)
    Allure.addDescription(
      'Verify the Dashboard page loads with heading visible'
    )
    Allure.addSeverity('critical')

    await Allure.step(
      'Step 1: Verify Dashboard heading is visible',
      async () => {
        await hrDashboardPage.verifyHrDashboardPageLoads()
      }
    )
  })

  test('Verify all dashboard cards are visible @regression', async () => {
    Allure.addDescription('Verify all 5 cards are visible on the Dashboard')
    Allure.addSeverity('critical')

    await Allure.step('Step 1: Verify all cards visible', async () => {
      await hrDashboardPage.verifyAllCardsVisible()
    })
  })

  test('Verify Request/Report buttons are visible @regression', async () => {
    Allure.addDescription('Verify Request Now and Report Now buttons')
    Allure.addSeverity('normal')

    await Allure.step('Step 1: Verify buttons', async () => {
      await hrDashboardPage.verifyRequestButtons()
    })
  })

  test('Verify Violations section @regression', async () => {
    Allure.addDescription(
      'Verify Violations section with all 3 violation types'
    )
    Allure.addSeverity('normal')

    await Allure.step('Step 1: Verify violations section', async () => {
      await hrDashboardPage.verifyViolationsSection()
    })
  })
  test('Verify My Absence Days landing @smoke', async () => {
    Allure.addDescription('Verify My Absence Days sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to My Absence Days', async () => {
      await hrDashboardPage.navigateToMyAbsenceDays()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await hrDashboardPage.verifyMyAbsenceDaysPageLoads()
    })
  })

  test('Verify Recruitment Statistics landing @smoke', async () => {
    Allure.addDescription(
      'Verify Recruitment Statistics sub-page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step(
      'Step 1: Navigate to Recruitment Statistics',
      async () => {
        await hrDashboardPage.navigateToRecruitmentStatistics()
      }
    )
    await Allure.step('Step 2: Verify page loads', async () => {
      await hrDashboardPage.verifyRecruitmentStatisticsPageLoads()
    })
  })

  test('Verify Employee Retention landing @smoke', async () => {
    Allure.addDescription('Verify Employee Retention sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Employee Retention', async () => {
      await hrDashboardPage.navigateToEmployeeRetention()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await hrDashboardPage.verifyEmployeeRetentionPageLoads()
    })
  })

  test('Verify Company Growth landing @smoke', async () => {
    Allure.addDescription('Verify Company Growth sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Company Growth', async () => {
      await hrDashboardPage.navigateToCompanyGrowth()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await hrDashboardPage.verifyCompanyGrowthPageLoads()
    })
  })

  test('Verify Birthday Information landing @smoke', async () => {
    Allure.addDescription(
      'Verify Birthday Information sub-page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Birthday Information', async () => {
      await hrDashboardPage.navigateToBirthdayInformation()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await hrDashboardPage.verifyBirthdayInformationPageLoads()
    })
  })

  test.afterAll(async () => {
    await context.close()
  })
})
