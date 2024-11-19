import { Page } from '@playwright/test';

export async function closeTimerPopUp(page: Page) {
        try {
                // Selector for "Continue without timer"
                const continueWithoutTimerSelector = '//div[contains(text(), "Continue without timer")]';

                // Selector for "Continue without changing" (Access Denied pop-up)
                const continueWithoutChangingSelector = '//div[contains(text(), "Continue without changing")]';

                // Loop to handle multiple pop-ups in sequence
                while (true) {
                        let handled = false;

                        // Check if "Access Denied" (Continue without changing) pop-up is visible
                        const isAccessDeniedVisible = await page.locator(continueWithoutChangingSelector).isVisible();
                        if (isAccessDeniedVisible) {
                                const continueWithoutChangingButton = page.locator(continueWithoutChangingSelector);
                                await continueWithoutChangingButton.click();
                                console.log('Clicked "Continue without changing".');
                                handled = true;
                                await page.waitForTimeout(1500); // Optional: Small delay after interaction
                        }

                        // Check if "Continue without timer" pop-up is visible
                        const isTimerPopUpVisible = await page.locator(continueWithoutTimerSelector).isVisible();
                        if (isTimerPopUpVisible) {
                                const continueWithoutTimerButton = page.locator(continueWithoutTimerSelector);
                                await continueWithoutTimerButton.click();
                                console.log('Clicked "Continue without timer".');
                                handled = true;
                                await page.waitForTimeout(1500); // Optional: Small delay after interaction
                        }

                        // Break the loop if no pop-ups are visible
                        if (!handled) {
                                console.log('No timer-related pop-ups are visible.');
                                break;
                        }
                }
        } catch (error) {
                console.error('Failed to handle timer pop-ups:', error);
        }
}
