
import { test, expect } from '@playwright/test'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { skipSurvey } from 'common/skip-survey'
import { closeProductTour } from 'common/product-tour-helper'


// Function to generate a dynamic event name
function generateEventName(baseName: string): string {
    const timestamp = new Date().getTime();
    return `${baseName}_${timestamp}`;
}


test.describe('CRUD Operations for meeting', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        test.setTimeout(60000);
        await page.goto(baseURL!)
        await addCursorStyleAndScript(page)
        await skipSurvey(page)
        await closeProductTour(page)
        await closeTimerPopUp(page)
        await page.waitForLoadState('networkidle')

    })


    /************To Create new meeting ***********/
    test.only('New Event Creation', async ({ page }) => {
        const locators = new CalendarPage(page)
        const eventName = await locators.generateEventName('Meeting');
        await locators.navigateToCalendar()

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');

        // Wait for the Collapse button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay

        await locators.navigateToCollapseButton() //To click on the << arrow so that Add event button will be visible

        await locators.clickOnAddEvent()

        // Use the generated event name in subsequent steps
        await locators.fillAndEnterEventName(eventName);
        await page.waitForTimeout(3000);  // Optional: Add a delay


        await locators.clickOnParticipants()
        await locators.clickOnSearchEmailParticipant()
        await locators.selectParticipant()
        await locators.clickOnSaveParticipant()
        await locators.clickOnCreateEvent()
        await locators.clickOnCloseEventCreatedModal()
    })
})
