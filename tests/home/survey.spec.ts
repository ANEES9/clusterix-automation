import { Browser, Page, test } from '@playwright/test'
import { SurveyPage } from 'pages/home/survey-page'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'

let browser: Browser
let context: BrowserContext
let page: Page
let surveyPage: SurveyPage
let locale: string

test.describe.serial('Survey Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    surveyPage = new SurveyPage(page, locale)
    await surveyPage.goto(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Complete role question', async () => {
    await surveyPage.completeRoleQuestion('developerOption')
  })
})
