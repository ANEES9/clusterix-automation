import { test, expect } from '@playwright/test'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { skipSurvey } from 'common/skip-survey'
import { closeProductTour } from 'common/product-tour-helper'


test.describe('CRUD Operations for meeting', () => {
    test.beforeEach(async ({ page, baseURL }, testInfo) => {
        test.setTimeout(60000);
        await page.goto(baseURL!)
        await addCursorStyleAndScript(page)
        await skipSurvey(page, testInfo)
        await closeProductTour(page)
        await closeTimerPopUp(page)
        await page.waitForLoadState('networkidle')

    })

    /************To View recently created meeting***********/
    test('View Event', async ({ page }) => {
        const calendarPage = new CalendarPage(page)
        const eventName = await calendarPage.generateEventName('Meeting');
        const calendarPageEventName = new CalendarPage(page, eventName);
        await page.pause();
        await calendarPage.navigateToCalendar()

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');

        // Wait for the Collapse button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay

        await calendarPage.navigateToCollapseButton() //To click on the << arrow so that Add event button will be visible

        await calendarPage.clickOnAddEvent()

        // Use the generated event name in subsequent steps
        await calendarPage.fillAndEnterEventName(eventName);
        await page.waitForTimeout(3000);  // Optional: Add a delay


        await calendarPage.clickOnParticipants()
        await calendarPage.clickOnSearchEmailParticipant()
        await calendarPage.selectParticipant()
        await calendarPage.clickOnSaveParticipant()
        await calendarPage.clickOnCreateEvent()
        await calendarPage.clickOnCloseEventCreatedModal()

        //To open the foldout
        await calendarPage.clickOnFoldOut()
        await calendarPageEventName.clickOnViewEvent()

    })
})
