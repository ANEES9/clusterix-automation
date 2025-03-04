import { test, Browser, Page, TestInfo } from '@playwright/test'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { Allure } from '../../helpers/common/allure-helper'
import { setupTestContext } from 'utils/test-context'
import { calendarTestData } from 'utils/test-data/calendar/calendar-data'
import { BrowserContext } from 'playwright'

let calendarPage: CalendarPage
let locale: string
let browser: Browser
let context: BrowserContext
let page: Page
let eventName: string
const shouldNavigateBack = false
test.describe('testcases to view calendar using filters', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()
    Allure.addAppOwner('Calendar')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    calendarPage = new CalendarPage(page, locale)
    await calendarPage.goto(baseURL)
    await page.waitForLoadState('networkidle')
  })
  test('change week view to month view', async () => {
    Allure.addDescription('change week view to month view')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.navigateToWeekView()
    await calendarPage.navigateToMonthView()
  })

  test('change week view to year view', async () => {
    Allure.addDescription('change week view to year view')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.navigateToMonthView()
    await calendarPage.navigateToYearView()
  })

  test('change week view to list view', async () => {
    Allure.addDescription('change week view to list view')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.navigateToYearView()
    await calendarPage.navigateToListView()
  })

  test('change week view to day view', async () => {
    Allure.addDescription('change week view to day view')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.navigateToListView()
    await calendarPage.navigateToDayView()
  })

  test('change week view to 2 days view', async () => {
    Allure.addDescription('change week view to 2days view')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.navigateToDayView()
    await calendarPage.navigateToTwoDaysView()
  })
  test('to view the calendar event of the previous month', async () => {
    Allure.addDescription(
      'to click on the < icon to view the events of the previous month'
    )
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.navigateToCollapseButton()
    await calendarPage.selectPreviousMonth()
  })
  test('to view the calendar event of the upcoming month', async () => {
    Allure.addDescription(
      'to click on the > icon to view the events of the upcoming month'
    )
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.selectNextMonth()
  })

  test('to change the timezone', async () => {
    Allure.addDescription(
      'to check if the user is able to change the timezone to a different timezone'
    )
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.clickOnTimeZone()
    await calendarPage.selectTimeZone()
  })
})
