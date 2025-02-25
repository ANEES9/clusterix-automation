import { Browser, expect, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { OverviewPage } from 'pages/no-code/overview-page'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { NewNoCodeModalPage } from 'pages/no-code/new-no-code-modal-page'

let browser: Browser
let context: BrowserContext
let page: Page
let overviewPage: OverviewPage
let newNoCodeModalPage: NewNoCodeModalPage
let locale: string

test.describe.parallel('Overview Tab Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    Allure.addAppOwner('No Code')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')

    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    overviewPage = new OverviewPage(page, locale)
    newNoCodeModalPage = new NewNoCodeModalPage(page, locale)
    await overviewPage.gotoOverview(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Validate Overview Title and Description', async () => {
    Allure.step('Validate page title', async () => {
      await overviewPage.validatePageTitle()
    })
    Allure.step('Validate page title', async () => {
      await overviewPage.validatePageDescription()
    })
  })
  test('Validate Overview Step Content ', async () => {
    Allure.step('Validate first step title and description', async () => {
      await overviewPage.validateStep1Title()
      await overviewPage.validateStep1Description()
    })
    Allure.step('Validate second step title and description', async () => {
      await overviewPage.validateStep2Title()
      await overviewPage.validateStep2Description()
    })
    Allure.step('Validate third step title and description', async () => {
      await overviewPage.validateStep3Title()
      await overviewPage.validateStep3Description()
    })
  })
  test('Check if the New No Code Button works', async () => {
    Allure.step('Click on the "New No Code" button', async () => {
      await overviewPage.clickOnTheNewNoCodeButton()
      await page.waitForLoadState('domcontentloaded')
    })
    Allure.step('Check if the new no code modal is opened ', async () => {
      await page.evaluate(() => {
        const modal = document.querySelector(
          'div[role="dialog"]'
        ) as HTMLElement
        if (modal) {
          modal.style.zIndex = '9999'
        }
      })
      await newNoCodeModalPage.validateModalOpened()
    })
  })
})
