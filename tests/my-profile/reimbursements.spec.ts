import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ReimbursementsPage } from 'pages/my-profile/reimbursements.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let reimbursementsPage: ReimbursementsPage

test.describe('My Profile > Reimbursements', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    reimbursementsPage = new ReimbursementsPage(page, locale)
    await reimbursementsPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the Reimbursements page loads @smoke', async () => {
    Allure.addDescription('Verify that the Reimbursements page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Verify Reimbursements page URL', async () => {
      await reimbursementsPage.verifyPageUrl()
    })
    await Allure.step(
      'Step 2: Verify Reimbursements page heading',
      async () => {
        await reimbursementsPage.verifyPageHeading()
      }
    )
  })
})
