import { BrowserContext, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { PersonalInfoPage } from 'pages/my-profile/personal-info.page'
import { setupTestContext } from 'utils/test-context'

let context: BrowserContext
let page: Page
let personalInfoPage: PersonalInfoPage

test.describe('My Profile > Personal Info', () => {
  test.beforeAll(async ({ browser, baseURL: projectBaseURL }, testInfo) => {
    test.setTimeout(300000)
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const { locale } = await setupTestContext(page, testInfo)
    personalInfoPage = new PersonalInfoPage(page, locale)
    await personalInfoPage.goto(projectBaseURL)
  })

  test.afterAll(async () => {
    await context.close()
  })

  test('Verify that the Personal Info page loads @smoke', async () => {
    Allure.addDescription('Verify that the Personal Info page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Verify Personal Info page URL', async () => {
      await personalInfoPage.verifyPageUrl()
    })
    await Allure.step('Step 2: Verify Personal Info page heading', async () => {
      await personalInfoPage.verifyPageHeading()
    })
  })
})
