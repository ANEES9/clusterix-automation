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

  test('Add manual bank account with random German IBAN', async ({ page }) => {
    let apiResponseStatus: number | null = null;

    // Intercept the API request and capture the response status
    await page.route('https://accounting-service-testing.innoscripta.com/api/v1/bank-accounts', async (route) => {
      route.continue();
      const response = await route.request().response();
      if (response) {
        apiResponseStatus = response.status();
        console.log('API Response Status:', apiResponseStatus);
      } else {
        console.log('No response received for the API call.');
      }
    });

    // Perform test steps
    await locators.accountinglistbutton.click();
    console.log('Navigated to Accounting List.');

    await locators.paymentssidebarbutton.click();
    console.log('Opened Payments Sidebar.');

    await locators.connectbankbutton.click();
    console.log('Initiated Connect Bank Process.');

    await locators.ibanfocusbutton.click();

    // Generate a Random German IBAN
    const randomIBAN = generateRandomIBAN('DE', '10000000').toUpperCase();
    console.log(`Generated IBAN: ${randomIBAN}`);

    // Fill in the IBAN
    await locators.ibanfocusbutton.fill(randomIBAN);

    // Click the dropdown to expand
    await locators.currencydropdown.click();

    // Wait for the options to appear
    await locators.currencyeditUSDoption.click();

    // Close the dropdown by clicking outside or triggering a close event
    await locators.body.click(); // Simulate clicking outside the dropdown to close it

    // Fill optional field
    await locators.optionalplaceholder.fill('Auto-Test');

    // Click on "Manual Tracking"
    await locators.manualtrackingbutton.click();

    // Connect account
    await locators.connectaccountbutton.click();

    // Wait to ensure response is captured
    await page.waitForTimeout(2000);

    // Validate API response
    if (apiResponseStatus === 503) {
      console.log('Error: API returned an unexpected status 503.');
    } else if (apiResponseStatus === 201) {
      console.log('Success: API returned status 201.');
    } else {
      console.log('Error: Unexpected API response status:', apiResponseStatus);
    }

    // Validate account creation on UI
    await expect(locators.successmessagelocator).toBeVisible({ timeout: 5000 });
  });
});
