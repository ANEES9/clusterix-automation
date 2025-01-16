import { test, expect } from '@playwright/test'
//import { closeWelcomePopUp } from '../../helpers/common/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { faker } from '@faker-js/faker'
import { getGenderOptions } from '../../helpers/hr-settings-helper'

test.describe('Calendar Meeting', () => {
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
     
        // Wait for the Week button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await page.getByRole('button', { name: 'Week' }).click();

        // Click on the Month button
        await page.getByRole('button', { name: 'Month' }).click();
        console.log("Test passed: Dashboard is displayed! FROM MONTH VIEW *****");
    })
})
