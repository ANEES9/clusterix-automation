import { Page } from '@playwright/test';

export async function closeTimerPopUp(page: Page) {
        try {
                const continueWithoutTimerSelector = '//div[contains(text(), "Continue without timer")]';
                const continueWithoutChangingSelector = '//div[contains(text(), "Continue without changing")]';
                while (true) {
                        let handled = false;
                        const isAccessDeniedVisible = await page.locator(continueWithoutChangingSelector).isVisible();
                        if (isAccessDeniedVisible) {
                                const continueWithoutChangingButton = page.locator(continueWithoutChangingSelector);
                                await continueWithoutChangingButton.click();
                                console.log('Clicked "Continue without changing".');
                                handled = true;
                                await page.waitForTimeout(1500);
                        }
                        const isTimerPopUpVisible = await page.locator(continueWithoutTimerSelector).isVisible();
                        if (isTimerPopUpVisible) {
                                const continueWithoutTimerButton = page.locator(continueWithoutTimerSelector);
                                await continueWithoutTimerButton.click();
                                console.log('Clicked "Continue without timer".');
                                handled = true;
                                await page.waitForTimeout(1500);
                        }
                        if (!handled) {
                                console.log('No timer-related pop-ups are visible.');
                                break;
                        }
                }
        } catch (error) {
                console.error('Failed to handle timer pop-ups:', error);
        }
}
