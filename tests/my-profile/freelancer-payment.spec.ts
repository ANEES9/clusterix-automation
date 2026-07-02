import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { FreelancerPaymentPage } from 'pages/my-profile/freelancer-payment.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let freelancerPaymentPage: FreelancerPaymentPage

test.describe('My Profile > Freelancer Payment', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    freelancerPaymentPage = new FreelancerPaymentPage(page, locale)
    await freelancerPaymentPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the Freelancer Payment page loads @smoke', async () => {
    Allure.addDescription(
      'Verify that the Freelancer Payment page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step(
      'Step 1: Verify Freelancer Payment page URL',
      async () => {
        await freelancerPaymentPage.verifyPageUrl()
      }
    )
    await Allure.step(
      'Step 2: Verify Freelancer Payment page heading',
      async () => {
        await freelancerPaymentPage.verifyPageHeading()
      }
    )
  })
})
