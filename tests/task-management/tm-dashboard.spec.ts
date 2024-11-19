import { test, expect } from '@playwright/test';
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper';
import { closeTimerPopUp } from '../../helpers/timer-helper';

test.describe('Task Management Dashboard Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://clusterix.io/task-management');
        await page.waitForLoadState('networkidle');
        await closeWelcomePopUp(page);
        await closeTimerPopUp(page);
        const header = page.locator('h1:has-text("Dashboard")');
        await expect(header).toBeVisible();
    });

    test('Verify "My Tasks" section is displayed', async ({ page }) => {
        const myTasksSection = page.locator('p:has-text("My Tasks")');
        await expect(myTasksSection).toBeVisible();
    });

    test('Verify "Completed Tasks" section is displayed', async ({ page }) => {
        const completedTasksSection = page.locator('p:has-text("My Completed Tasks")');
        await expect(completedTasksSection).toBeVisible();
    });

    test('Verify "Recent Activities" section is displayed', async ({ page }) => {
        const recentActivitiesSection = page.locator('p:has-text("Recent Activities")');
        await expect(recentActivitiesSection).toBeVisible();
    });

    /* test('Drag and drop task to Completed Tassks', async ({page}) => {
        const sourceTask = page.locator('div[class*="vFBtNksxJoyvz2a22"]');
        const targetArea = page.locator('div[class*="m2l5iOKXAnAJs5dYeYqine"]');
        await sourceTask.hover();
        const dragHandle = sourceTask.locator('svg');
        await dragHandle.dragTo(targetArea);
        const movedTask = page.locator('div[class*="GADW7tf0IlUoJTbANJqU"]');
        await expect(movedTask).toBeVisible();
    }); */

});
