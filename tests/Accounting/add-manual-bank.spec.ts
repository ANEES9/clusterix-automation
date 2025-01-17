import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion-helpers';
import { PageLocators } from '../../helpers/accounting-locaters-helpers';
import { generateRandomGermanIBAN } from '../../helpers/iban-generator';  // Import IBAN Generator

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto('https://testing.clusterix.io/');

  await page.getByRole('button', { name: 'Login' }).nth(1).click();
  await page.getByPlaceholder('Email').fill('cop@test.de');
  await page.getByPlaceholder('Password').fill('1');
  await page.locator('div').filter({ hasText: /^Login$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Skip tour$/ }).first().click();
  await page.waitForLoadState('domcontentloaded');
});

// Test - Add Manual Bank Account with IBAN
test('Add manual bank account with random German IBAN', async ({ page }) => {
  const locators = new PageLocators(page);
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
  await AssertionHelper.clickWithAssertion(locators.accountingListButton);
  await AssertionHelper.clickWithAssertion(locators.paymentsSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.connectBankButton);
  await AssertionHelper.clickWithAssertion(locators.ibanfocusButton);
  
  // Generate a Random German IBAN
  const randomIBAN = generateRandomGermanIBAN();
  console.log(`Generated IBAN: ${randomIBAN}`);

  // Fill in the IBAN
  await AssertionHelper.typeWithAssertion(locators.ibanfocusButton, randomIBAN);

  await page.getByPlaceholder('Bank Account Currency').click();
  await page.locator('div').filter({ hasText: /^Euro$/ }).first().click();
  await page.mouse.click(0, 0);

  await page.getByPlaceholder('Optional').click();
  await page.getByPlaceholder('Optional').fill('Auto-Test');
  await page.locator('section').nth(1).click();
  await page.getByRole('button', { name: 'Connect account' }).click();

  // Wait to ensure response is captured
  await page.waitForTimeout(2000);  // Add delay to allow response capture

  if (apiResponseStatus === 503) {
      console.log('Error: API returned an unexpected status 503.');
  } else if (apiResponseStatus !== 503) {      
      console.log('Success: API returned status 201.');
  }

  // Assert that the API returned 503
  expect(apiResponseStatus).toBe(503);

  // Validate account creation on UI
  //await expect(page.locator('text=Account successfully added')).toBeVisible({ timeout: 5000 });
  //await page.pause();
  //await page.pause();
});
