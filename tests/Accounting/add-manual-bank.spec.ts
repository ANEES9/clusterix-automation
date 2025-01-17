import { test, expect } from '@playwright/test';
import {PageLocators} from '../../pages/accounting/accounting-locaters-helpers';
import { generateRandomGermanIBAN } from '../../helpers/common/iban-generator';
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper';
import { skipSurvey } from '../../helpers/common/skip-survey';
import { closeProductTour } from '../../helpers/common/product-tour-helper';
import { closeTimerPopUp } from '../../helpers/common/timer-helper';
import { Allure } from '../../helpers/common/allure-helper';
import { ContainerPage } from '../../pages/container-app/container-page';


test.describe('Accounting Application API Tests', () => {
  let locators: PageLocators;
  
  test.beforeEach(async ({ page, baseURL }) => {
    // ...
    locators = new PageLocators(page);
    // ...
  });
  test.beforeEach(async ({ page, baseURL }) => {
    let locators: PageLocators;
    Allure.addFeature('Navigation')
     Allure.addAppOwner('ContainerApp')
     await Allure.step('Navigate to Base URL and Close Popups', async () => {
       await page.goto(baseURL!)
       await addCursorStyleAndScript(page)
       await skipSurvey(page)
       await closeProductTour(page)
       await closeTimerPopUp(page)
       await page.waitForLoadState('networkidle')
     })
   })
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
    await locators.clickAccountingListButton();
    console.log('Navigated to Accounting List.');

    await locators.clickPaymentsSidebarButton();
    console.log('Opened Payments Sidebar.');

    await locators.clickConnectBankButton();
    console.log('Initiated Connect Bank Process.');

    await locators.ibanfocusButton.click();

    // Generate a Random German IBAN
    const randomIBAN = generateRandomGermanIBAN();
    console.log(`Generated IBAN: ${randomIBAN}`);

    // Fill in the IBAN
    await locators.fillIBANField(randomIBAN);

    // Select currency
    await locators.selectCurrency('Euro');

    // Fill optional field
    await page.getByPlaceholder('Optional').fill('Auto-Test');

    // Connect account
    await page.getByRole('button', { name: 'Connect account' }).click();

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
    // Add any additional UI validations if required
    // await expect(page.locator('text=Account successfully added')).toBeVisible({ timeout: 5000 });
  });
});
