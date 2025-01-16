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


        // Use the function to generate an event name
        // const eventName = generateEventName('Meeting');

        // Create a new calendar event
        await page.getByPlaceholder('Untitled Event').fill(eventName);

        // Verify the event was created - FOR FURTHER USE
        //  const eventText = await page.textContent('.event-name');
        //  expect(eventText).toBe(eventName);

        //await page.getByPlaceholder('Untitled Event').fill('test#786');
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await page.getByText('Participant(s)').click();
        await page.getByPlaceholder('Search contact, email or').click();
        await page.locator('div:nth-child(7) > div > .ca-relative > svg').click();
        await page.getByRole('button', { name: 'Save' }).click();
        //await page.locator('#rounded-modal-event-form').getByText('Sonstige Termine').click();
        //await page.locator('#rounded-modal-event-form div').filter({ hasText: /^Sonstige Termine$/ }).click();
        // await page.locator('#ca-portal-root').getByText('Vertriebsgespräch').click();
        await page.getByText('Create Event').click();
        await page.getByRole('button', { name: 'Close' }).click();
        console.log(`Event created: ${eventName}`);
    })

    test.setTimeout(6000);
    /************To View recently created meeting ***********/
    test('View Created Meeting', async ({ page }) => {
       // const eventName = generateEventName('Meeting');
        await page.pause();

        await page.waitForLoadState('networkidle');
        console.log(`FROM VIEW: ${eventName}`);

        // Create an instance of the CalendarPage
        const calendarPage = new CalendarPage(page);

        // Navigate to the calendar
        await calendarPage.navigateToCalendar();

        // Check if the event is visible
        await page.locator('.calendar-event-details-chip-title-name', { hasText: eventName }).click();

        //const isEventVisible = await calendarPage.viewEvent(eventName);
        //expect(isEventVisible).toBeTruthy();

    })
    test.setTimeout(6000);

    /***********************Update Meeting *****************/
    /*test('Update Meeting', async ({ page }) => {
        // const eventName = generateEventName('Meeting');
         await page.pause();
 
         await page.waitForLoadState('networkidle');
         console.log(`FROM VIEW: ${eventName}`);
 
         // Create an instance of the CalendarPage
         const calendarPage = new CalendarPage(page);
 
         // Navigate to the calendar
         await calendarPage.navigateToCalendar();
 
         // Check if the event is visible
         await page.locator('.calendar-event-details-chip-title-name', { hasText: eventName }).click();
         await page.locator('input[placeholder="All"][class*="ca-cursor-pointer"]').click();

         //await page.getByText('20:45').nth(1).click();
         //const isEventVisible = await calendarPage.viewEvent(eventName);
         //expect(isEventVisible).toBeTruthy();
 
     })*/
     
         /**Delete the meeting */
        test('Delete Meeting', async ({ page }) => {
        // const eventName = generateEventName('Meeting');
         await page.pause();
 
         await page.waitForLoadState('networkidle');
         console.log(`FROM Delete test: ${eventName}`);
 
         // Check if the event is visible
         await page.locator('.calendar-event-details-chip-title-name', { hasText: eventName }).click();
         
         //Delete the event
         await page.getByText('Delete').click();
         await page.getByRole('button', { name: 'Delete' }).click();
         
     })

})
