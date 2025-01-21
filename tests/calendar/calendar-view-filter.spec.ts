import { test } from '@playwright/test'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { skipSurvey } from 'common/skip-survey'
import { closeProductTour } from 'common/product-tour-helper'

test.describe('Testcases to view calendar using filters', () => {
    test.beforeEach(async ({ page, baseURL }, testInfo) => {
        await page.goto(baseURL!)
        await addCursorStyleAndScript(page)
        await skipSurvey(page, testInfo)
        await closeProductTour(page)
        await closeTimerPopUp(page)
        await page.waitForLoadState('networkidle')

    })

    test('change week view to month view', async ({ page }) => {

        const calendarPage = new CalendarPage(page)
       
        await calendarPage.navigateToCalendar()

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');
        // Wait for the Week button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await calendarPage.navigateToWeekView()
        // Click on the Month button
        await calendarPage.navigateToMonthView()

    })

    test('change week view to year view', async ({ page }) => {

        const calendarPage = new CalendarPage(page)
    
        await calendarPage.navigateToCalendar()

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');
        // Wait for the Week button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await calendarPage.navigateToWeekView()
        // Click on the Year button
        await calendarPage.navigateToYearView()

    })

    test('change week view to list view', async ({ page }) => {

        const calendarPage = new CalendarPage(page)
        await calendarPage.navigateToCalendar()

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');
        // Wait for the Week button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await calendarPage.navigateToWeekView()
        // Click on the List button
        await calendarPage.navigateToListView()

    })

    test('change week view to day view', async ({ page }) => {

        const calendarPage = new CalendarPage(page)
       
        await calendarPage.navigateToCalendar()

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');
        // Wait for the Week button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await calendarPage.navigateToWeekView()
        // Click on the day button
        await calendarPage.navigateToDayView()

    })

    test('change week view to 2 days view', async ({ page }) => {

        const calendarPage = new CalendarPage(page)
       
        await calendarPage.navigateToCalendar()

        // Wait for the page to fully load
        await page.waitForLoadState('networkidle');
        // Wait for the Week button and click it
        await page.waitForTimeout(3000);  // Optional: Add a delay
        await calendarPage.navigateToWeekView()
        // Click on the 2 days button
        await calendarPage.navigateToTwoDaysView()

    })
})
