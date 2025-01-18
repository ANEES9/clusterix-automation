import { test } from '@playwright/test'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { skipSurvey } from 'common/skip-survey'
import { closeProductTour } from 'common/product-tour-helper'

test.describe('Calendar Meeting', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL!)
        await addCursorStyleAndScript(page)
        await skipSurvey(page)
        await closeProductTour(page)
        await closeTimerPopUp(page)
        await page.waitForLoadState('networkidle')
    })

    test('test', async ({ page }) => {

        const locators = new CalendarPage(page)
        await locators.navigateToCalendar()

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');
        // Wait for the Week button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await locators.navigateToWeekView()
        // Click on the Month button
        await locators.navigateToMonthView()
        
    })
})
