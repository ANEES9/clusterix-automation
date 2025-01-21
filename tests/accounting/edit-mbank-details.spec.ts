import { test, expect } from '@playwright/test';
import { PageLocators } from '../../pages/accounting/accounting-locaters-helpers';
import { generateRandomIBAN } from '../../helpers/common/accounting/iban-generator';
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper';
import { skipSurvey } from '../../helpers/common/skip-survey';
import { closeProductTour } from '../../helpers/common/product-tour-helper';
import { closeTimerPopUp } from '../../helpers/common/timer-helper';
import { Allure } from '../../helpers/common/allure-helper';
import { skipTutorial } from '../../helpers/common/skip-tutorial-helper';

test.describe('Accounting Application Add manual tracking bank account Tests', () => {
  let locators: PageLocators;

  test.beforeEach(async ({ page, baseURL },testInfo) => {
    locators = new PageLocators(page);

    Allure.addFeature('Navigation');
    Allure.addAppOwner('ContainerApp');

    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!);
      skipTutorial(page, testInfo)
      await addCursorStyleAndScript(page);
      await skipSurvey(page, testInfo);
      await closeProductTour(page);
      await closeTimerPopUp(page);
      await page.waitForLoadState('networkidle');
    });
  });

  test('Edit manual tracking bank account details', async ({ page }) => {
    locators = new PageLocators(page);

    // Navigate to Accounting List and open the Payments section
    await locators.accountinglistbutton.click();
    await locators.paymentssidebarbutton.click();

    // Search for the bank account to edit
    await locators.searchibanplaceholder.click();
    await locators.searchibanplaceholder.fill('Auto-Test');

    // Open edit bank account modal
    await locators.editbankbutton.click();

    // Update bank account details
    await locators.bankcurrencyplaceholder.click();
    await locators.currencyeditUSDoption.click();
    await page.locator('.ca-fixed').click();
  

    await locators.optionalplaceholder.click();
    await locators.optionalplaceholder.fill('Auto-Test Edit');

    // Save changes
    await locators.editbanksavebutton.click();

    // Validate success message
    await expect(locators.successmessagelocator).toBeVisible({ timeout: 5000 });
  });
});
