import { test, expect } from '@playwright/test';
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper';
import { closeTimerPopUp } from '../../helpers/timer-helper';

test.describe('Dashboard Item Collapse Tests', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL!);
        await closeWelcomePopUp(page);
        await closeTimerPopUp(page);
        await page.waitForLoadState('networkidle');
    });
    test('Verify item collapse functionality', async ({ page }) => {
        const collapseButton = page.locator('button.XGTruqnD6viz2G4A5CH');
        await expect(collapseButton).toBeVisible();
        await collapseButton.click();
        const collapsedTitle = page.locator('div.collapsed-title-selector');
        await expect(collapsedTitle).toBeVisible();
    });
});
