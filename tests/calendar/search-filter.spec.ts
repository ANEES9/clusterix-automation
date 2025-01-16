import { test, expect } from '@playwright/test'
//import { closeWelcomePopUp } from '../../helpers/common/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { faker } from '@faker-js/faker'
import { getGenderOptions } from '../../helpers/hr-settings-helper'

test.describe('Search Filter', () => {
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
        await page.locator('.FiltersGroups_filtersLabel__PHj7j').click();
        await page.getByText('Filter by creator').click();
        await page.getByRole('textbox', { name: 'Please start typing' }).click();
        await page.getByText('Me', { exact: true }).first().click();
        await page.getByText('Filter by guest').click();
        await page.getByPlaceholder('Please start typing').nth(2).click();
        await page.getByText('Me', { exact: true }).nth(1).click();
        
        console.log("Test passed: Search by Me filter *****");
    })
})
