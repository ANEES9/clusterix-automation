import { test } from '@playwright/test'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Testcases to view calendar using filters', () => {
  let calendarPage: CalendarPage
  let locale: string
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await calendarPage.goto(baseURL)
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    calendarPage = new CalendarPage(page, locale)
    await page.waitForLoadState('networkidle')
  })

  test('change week view to month view', async ({ page }) => {
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    // Wait for the Week button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay
    await calendarPage.navigateToWeekView()
    // Click on the Month button
    await calendarPage.navigateToMonthView()
  })

  test('change week view to year view', async ({ page }) => {
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    // Wait for the Week button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay
    await calendarPage.navigateToWeekView()
    // Click on the Year button
    await calendarPage.navigateToYearView()
  })

  test('change week view to list view', async ({ page }) => {
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    // Wait for the Week button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay
    await calendarPage.navigateToWeekView()
    // Click on the List button
    await calendarPage.navigateToListView()
  })

  test('change week view to day view', async ({ page }) => {
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    // Wait for the Week button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay
    await calendarPage.navigateToWeekView()
    // Click on the day button
    await calendarPage.navigateToDayView()
  })

  test('change week view to 2 days view', async ({ page }) => {
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    // Wait for the Week button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay
    await calendarPage.navigateToWeekView()
    // Click on the 2 days button
    await calendarPage.navigateToTwoDaysView()
  })
})
