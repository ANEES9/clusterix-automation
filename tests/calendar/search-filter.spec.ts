import { test } from '@playwright/test'
import { skipTimerHelper } from 'common/skip-timer-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'

test.describe('Search Filter', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await page.goto(baseURL!)
    await addCursorStyleAndScript(page)
    await skipSurveyHelper(page, testInfo)
    await skipProductTourHelper(page, testInfo)
    await skipTimerHelper(page)
    await page.waitForLoadState('networkidle')
  })

  test('To filter by guest and filter by creator ', async ({ page }) => {
    const calendarPage = new CalendarPage(page)
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
