import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ProfileDashboardPage } from 'pages/my-profile/profile-dashboard.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let profileDashboardPage: ProfileDashboardPage

test.describe('My Profile > Dashboard', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    profileDashboardPage = new ProfileDashboardPage(page, locale)
    await profileDashboardPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the Profile Dashboard page loads @smoke', async () => {
    Allure.addDescription(
      'Verify that the Profile Dashboard page loads correctly'
    )
    Allure.addSeverity('critical')

    await Allure.step('Step 1: Verify Profile Dashboard page URL', async () => {
      await profileDashboardPage.verifyPageUrl()
    })
    await Allure.step(
      'Step 2: Verify Profile Dashboard page heading',
      async () => {
        await profileDashboardPage.verifyPageHeading()
      }
    )
  })
})
