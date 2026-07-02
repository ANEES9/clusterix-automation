import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { PayrollBonusesExtraPage } from 'pages/my-profile/payroll-bonuses-extra.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let payrollBonusesExtraPage: PayrollBonusesExtraPage

test.describe('My Profile > Payroll, Bonuses & Extra', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    payrollBonusesExtraPage = new PayrollBonusesExtraPage(page, locale)
    await payrollBonusesExtraPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the Payroll, Bonuses & Extra page loads @smoke', async () => {
    Allure.addDescription(
      'Verify that the Payroll, Bonuses & Extra page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step(
      'Step 1: Verify Payroll, Bonuses & Extra page URL',
      async () => {
        await payrollBonusesExtraPage.verifyPageUrl()
      }
    )
    /*await Allure.step('Step 2: Verify Payroll, Bonuses & Extra page heading', async () => {
      await payrollBonusesExtraPage.verifyPageHeading()
    })*/
  })
})
