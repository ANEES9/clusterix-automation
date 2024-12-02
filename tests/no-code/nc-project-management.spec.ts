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

    //todo: table title locator fix
    test.skip('Check Title Consistency Between Table Row and Modal Header', async ({ page }) => {
        // Locate the title text inside the first row's second cell
        const tableTitleLocator = page.locator('tr:nth-child(1) td:nth-child(2) div.ca-flex.ca-items-center span');
        await expect(tableTitleLocator).toBeVisible(); // Ensure it's visible

        // Retrieve the text of the title in the table
        const tableTitle = await tableTitleLocator.innerText();
        console.log(`Table Title: ${tableTitle}`);

        // Click the "Edit" button for the first row
        const editButtonLocator = page.locator('tr:nth-child(1) td button[aria-label="Edit"]'); // Adjust if necessary
        await editButtonLocator.click();

        // Wait for the modal to open and verify the modal header
        const modalHeaderLocator = page.locator('div.modal-header span'); // Adjust based on modal header structure
        await expect(modalHeaderLocator).toBeVisible();

        // Retrieve the modal header text
        const modalHeader = await modalHeaderLocator.innerText();
        console.log(`Modal Header: ${modalHeader}`);

        // Compare the table title with the modal header
        expect(modalHeader.trim()).toBe(tableTitle.trim());
    });
    //todo: fix
    test.skip('Open edit modal, hover over and edit page name', async ({ page }) => {
        // Click the "Edit" button to open the modal
        await page.locator('.ca-gap-yellow').nth(0).click();
        const modal = page.locator('span', { hasText: 'Untitled Section' });
        await expect(modal).toBeVisible();

        // Hover over the "Untitled page" element
        const untitledPage = page.locator('div[data-bd-drag-handle-context-id]');
        await expect(untitledPage).toBeVisible(); // Ensure the element is visible before hovering
        await untitledPage.hover();

        // Optionally add a validation or screenshot
        await page.screenshot({ path: 'hover-effect.png', fullPage: false });
    });
    //todo: drag and drop fix
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
