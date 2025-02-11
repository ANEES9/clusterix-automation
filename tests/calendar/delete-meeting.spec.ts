import { test, expect } from '@playwright/test'
import { skipTimerHelper } from 'common/skip-timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { setupTestContext } from 'utils/test-context'

test.describe('CRUD Operations for meeting', () => {
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

  /************To Delete recently created meeting***********/
  test('Delete Event', async ({ page }) => {
    const eventName = await calendarPage.generateEventName('Meeting')
    const calendarPageEventName = new CalendarPage(page, eventName)
    await page.pause()
    await calendarPage.navigateToCalendar()

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')

    // Wait for the Collapse button and click it
    await page.waitForTimeout(3000) // Optional: Add a delay

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

    //To open the foldout
    await calendarPage.clickOnFoldOut()
    await calendarPageEventName.clickOnViewEvent() //To view the event

    //To delete the event
    console.log(`FROM Delete test: ${eventName}`)

    //Delete the event
    //await page.getByText('Delete').click();
    await calendarPage.clickOnDeleteEvent()
    //await page.getByRole('button', { name: 'Delete' }).click();
    await calendarPage.clickOnDeleteButton()
  })
})
