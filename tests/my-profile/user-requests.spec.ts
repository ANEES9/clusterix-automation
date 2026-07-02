import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { UserRequestsPage } from 'pages/my-profile/user-requests.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let userRequestsPage: UserRequestsPage

test.describe('My Profile > User Requests', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    userRequestsPage = new UserRequestsPage(page, locale)
    await userRequestsPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the User Requests page loads @smoke', async () => {
    Allure.addDescription('Verify that the User Requests page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Verify User Requests page URL', async () => {
      await userRequestsPage.verifyPageUrl()
    })
    await Allure.step('Step 2: Verify User Requests page heading', async () => {
      await userRequestsPage.verifyPageHeading()
    })
  })
})
