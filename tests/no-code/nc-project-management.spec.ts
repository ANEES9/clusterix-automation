import { test, expect } from '@playwright/test';
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper';
import { closeTimerPopUp } from '../../helpers/timer-helper';
import { addCursorStyleAndScript } from '../../helpers/cursor-helper';

test.describe('No Code Overview Tests', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        // Navigate to the page
        await page.goto(`${baseURL}/workflows/workflows-apps/3`);
        await page.waitForLoadState('networkidle');

        // Run helpers
        await addCursorStyleAndScript(page);
        await closeWelcomePopUp(page);
        await closeTimerPopUp(page);

        // Verify page header
        const header = page.locator('span', { hasText: 'Project Management' });
        await expect(header).toBeVisible();
    });

    test.skip('Drag and drop text field for pm workflow', async ({ page }) => {
        // Click the "Edit" button
        await page.locator('.ca-gap-yellow').nth(0).click();

        // Define source and target elements
        const source = page.locator('div.DraggableTextItem-module_draggableTextItem__8lRSW');
        const target = page.locator('div.InputDropPlaceholder-module_sectionDropZoneWrapper__ur1HB');

        // Ensure both source and target elements are visible
        await expect(source).toBeVisible({ timeout: 10000 });
        await expect(target).toBeVisible();

        // Perform drag-and-drop operation using JavaScript evaluation
        await page.evaluate(
            ({ sourceSelector, targetSelector }) => {
                const sourceElement = document.querySelector(sourceSelector);
                const targetElement = document.querySelector(targetSelector);

                if (!sourceElement || !targetElement) {
                    throw new Error('Source or target element not found!');
                }

                const dataTransfer = new DataTransfer();

                // DragStart event
                const dragStartEvent = new DragEvent('dragstart', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer,
                });
                sourceElement.dispatchEvent(dragStartEvent);

                // Drop event
                const dropEvent = new DragEvent('drop', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer,
                });
                targetElement.dispatchEvent(dropEvent);

                // DragEnd event
                const dragEndEvent = new DragEvent('dragend', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer,
                });
                sourceElement.dispatchEvent(dragEndEvent);
            },
            {
                sourceSelector: 'span:has-text("Text")',
                targetSelector: 'div.InputDropPlaceholder-module_sectionDropZoneWrapper__ur1HB',
            }
        );

        // Verify that the drop was successful
        const updatedTarget = page.locator('div.InputDropPlaceholder-module_sectionDropZoneWrapper__ur1HB');
        await expect(updatedTarget).toContainText('placeholder');
    });
});
