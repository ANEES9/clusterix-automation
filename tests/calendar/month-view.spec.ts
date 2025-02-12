import { test } from '@playwright/test'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Calendar Testcases', () => {
  let calendarPage: CalendarPage
  let locale: string
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await calendarPage.goto(baseURL)
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    calendarPage = new CalendarPage(page, locale)
    await page.goto(baseURL!)
    await page.waitForLoadState('networkidle')
  })

  test('Change week view to month view', async ({ page }) => {
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    // Wait for the Week button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay
    await calendarPage.navigateToWeekView()
    // Click on the Month button
    await calendarPage.navigateToMonthView()
  })
})
