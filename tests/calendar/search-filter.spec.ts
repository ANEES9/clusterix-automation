import { test } from '@playwright/test'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Search Filter', () => {
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

  test('To filter by guest and filter by creator ', async ({ page }) => {
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')

    // Wait for the Filter button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay

    await calendarPage.clickOnFilterLocator()
    await calendarPage.clickOnFilterByCreator()
    await calendarPage.clickOnStartTypingInFilterCreator()
    await calendarPage.clickOnFilterByCreatorMe()
    await calendarPage.clickOnFilterByGuest()
    await calendarPage.clickOnStartTypingInFilterGuest()
    await calendarPage.clickOnFilterByGuestMe()
  })
})
