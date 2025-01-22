import { test, expect } from '@playwright/test'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'

// Function to generate a dynamic event name
function generateEventName(baseName: string): string {
  const timestamp = new Date().getTime()
  return `${baseName}_${timestamp}`
}

test.describe('CRUD Operations for meeting', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    test.setTimeout(60000)
    await page.goto(baseURL!)
    await addCursorStyleAndScript(page)
    await skipSurveyHelper(page, testInfo)
    await skipProductTourHelper(page, testInfo)
    await closeTimerPopUp(page)
    await page.waitForLoadState('networkidle')
  })

  /************To Create new meeting ***********/
  test('New Event Creation', async ({ page }) => {
    const calendarPage = new CalendarPage(page)
    const eventName = await calendarPage.generateEventName('Meeting')
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')

    // Wait for the Collapse button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay
    test.setTimeout(60000)
    await calendarPage.navigateToCollapseButton() //To click on the << arrow so that Add event button will be visible

    await calendarPage.clickOnAddEvent()

    // Use the generated event name in subsequent steps
    await calendarPage.fillAndEnterEventName(eventName)
    await page.waitForTimeout(3000) // Optional: Add a delay

    await calendarPage.clickOnParticipants()
    await calendarPage.clickOnSearchEmailParticipant()
    await calendarPage.selectParticipant()
    await calendarPage.clickOnSaveParticipant()
    await calendarPage.clickOnCreateEvent()
    await calendarPage.clickOnCloseEventCreatedModal()
  })
})
