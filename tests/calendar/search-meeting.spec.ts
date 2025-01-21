import { test, expect } from '@playwright/test'
//import { closeWelcomePopUp } from '../../helpers/common/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { faker } from '@faker-js/faker'
import { getGenderOptions } from '../../helpers/hr-settings-helper'

test.describe('Search Meeting', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(`${baseURL}/calendar`)
        //await closeWelcomePopUp(page)
        await closeTimerPopUp(page)
        await addCursorStyleAndScript(page)
        //await page.waitForLoadState('networkidle')
    })

    test.only('test', async ({ page }) => {
        await page.pause();

        // Open the calendar
        // await page.getByRole('button', { name: 'Calendar' }).click();

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');

        // Wait for the Filter button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay

        // Locate the search input field (replace with your specific locator)
       // await page.getByPlaceholder('Search').click();
        //const searchInput = page.locator('input[placeholder="Search"]'); // Update the placeholder if necessary
        const searchInput = page.locator('input[class*="_field__input_1mnea_"][placeholder="Search"]');
        // Enter the meeting name into the search field
        const meetingName = 'test674'; // Replace with the meeting name to search
        await searchInput.fill(meetingName);

        // Press Enter or wait for results (if automatic search)
        await page.keyboard.press('Enter');

        // Validate that the meeting appears in the results
        const meetingResult = page.locator(`text=${meetingName}`);
        await expect(meetingResult).toBeVisible();

        console.log("Test passed: Search by Me filter *****");
    })
})
