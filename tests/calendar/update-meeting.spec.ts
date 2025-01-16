import { test, expect } from '@playwright/test'
//import { closeWelcomePopUp } from '../../helpers/common/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { faker } from '@faker-js/faker'
import { getGenderOptions } from '../../helpers/hr-settings-helper'
import { CalendarPage } from '../../helpers/calendar-page-helper';

// Function to generate a dynamic event name
function generateEventName(baseName: string): string {
    const timestamp = new Date().getTime();
    return `${baseName}_${timestamp}`;
}

// Use the function to generate an event name
const eventName = generateEventName('Meeting');
test.describe('Meeting', () => {
    test.beforeEach(async ({ page, baseURL }) => {

        await page.goto(`${baseURL}`)
        //await page.goto(`${baseURL}/calendar`)
        // await closeWelcomePopUp(page)
        await closeTimerPopUp(page)
        await addCursorStyleAndScript(page)
        //await page.waitForLoadState('networkidle')

    })
    test.setTimeout(6000);

    /************To Create new meeting ***********/
    test('New Event Creation', async ({ page }) => {

        await page.pause();

        // Open the calendar
        // await page.getByRole('button', { name: 'Calendar' }).click();

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');

        // Wait for the Collapse button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await page.locator('._collapseButton_16zcl_522').click(); //To click on the << arrow so that Add event button will be visible

        await page.getByRole('button', { name: 'Add Event' }).click(); // Press Add Event button

        // Create a new calendar event
        await page.getByPlaceholder('Untitled Event').fill(eventName);

        // Verify the event was created - FOR FURTHER USE
        //  const eventText = await page.textContent('.event-name');
        //  expect(eventText).toBe(eventName);

        //await page.getByPlaceholder('Untitled Event').fill('test#786');
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await page.getByText('Participant(s)').click();
        await page.getByPlaceholder('Search contact, email or').click();
        await page.locator('div:nth-child(8) > div > .ca-relative > svg').click();
        await page.getByRole('button', { name: 'Save' }).click();

        await page.getByText('Create Event').click();
        await page.getByRole('button', { name: 'Close' }).click();
        // console.log(`Event created: ${eventName}`);



        /****Checking for update event by adding another participant */


        //await page.waitForLoadState('networkidle');
        console.log(`FROM Update: ${eventName}`);

        // Check if the event is visible
        await page.locator('.calendar-event-details-chip-title-name', { hasText: eventName }).click();


        await page.getByPlaceholder('Search contact, email or').click();
        await page.locator('.participants-dropdown-dropdown-internal-checkbox > div > .ca-relative > svg').first().click();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByText('Save changes').click();
        await page.getByRole('button', { name: 'Close' }).click();


    })

})