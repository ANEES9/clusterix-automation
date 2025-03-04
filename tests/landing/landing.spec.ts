import { LandingPage } from 'pages/landing/landing-page'
import { Browser, Page, test } from '@playwright/test'
import { BrowserContext } from 'playwright'
import { setupTestContext } from 'utils/test-context'
import { Allure } from 'common/allure-helper'

let browser: Browser
let context: BrowserContext
let page: Page
let landingPage: LandingPage
let locale: string

test.describe.parallel('Landing Page Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    Allure.addFeature('NAVIGATION')
    Allure.addAppOwner('Landing')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')

    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    landingPage = new LandingPage(page, locale)
    await landingPage.goto(baseURL)
  })

  test('should visible main title when navigating to landing page', async () => {
    await landingPage.mainTitle.isVisible()
  })

  test('should visible main description when navigating to landing page', async () => {
    await landingPage.mainDescription.isVisible()
  })

  test('should navigate to the register page when user click on the "Start now - Free for 1 month" button', async () => {
    await landingPage.clickStartFreeButtonAndValidate()
  })

  test('should navigate to the appointly page when user click on the "Schedule Demo" button', async () => {
    await landingPage.clickScheduleDemoButtonAndValidate()
  })

  test('should visible main content when user scroll down', async () => {
    await landingPage.validateContentHeaderText()
  })

  test('should visible main boxes when user scroll down', async () => {
    await landingPage.validateMainBoxes()
  })

  test('should visible human resources app context when user scroll down and click on the button', async () => {
    await landingPage.validateHumanResourcesAppContent()
    //await landingPage.validateAppNavigation(APP_URLS.landing.hrApp, 0)
  })
  test('should visible time tracking app context when user scroll down and click on the button', async () => {
    await landingPage.validateTimeTrackingAppContent()
    //await landingPage.validateAppNavigation(APP_URLS.landing.timeTrackingApp, 1)
  })
  test('should visible document management app context when user scroll down and click on the button', async () => {
    await landingPage.validateDocumentManagementAppContent()
    //await landingPage.validateAppNavigation(APP_URLS.landing.documentsApp, 2)
  })
  test('should visible chat app context when user scroll down and click on the button', async () => {
    await landingPage.validateChatAppContent()
    //await landingPage.validateAppNavigation(APP_URLS.landing.liveChatApp, 3)
  })
  test('should visible calendar app context when user scroll down and click on the button', async () => {
    await landingPage.validateCalendarAppContent()
    //await landingPage.validateAppNavigation(APP_URLS.landing.calendarApp, 4)
  })
  test('should visible email app context when user scroll down and click on the button', async () => {
    await landingPage.validateEmailAppContent()
    //await landingPage.validateAppNavigation(APP_URLS.landing.emailApp, 5)
  })
})
