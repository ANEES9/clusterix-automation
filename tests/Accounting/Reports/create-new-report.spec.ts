import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../../helpers/assertion-helpers';
import { PageLocators } from '../../../helpers/accounting-locaters-helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('https://testing.clusterix.io/');

  await page.getByRole('button', { name: 'Login' }).nth(1).click();
  await page.getByPlaceholder('Email').fill('cop@test.de');
  await page.getByPlaceholder('Password').fill('1');
  await page.locator('div').filter({ hasText: /^Login$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Skip tour$/ }).first().click();
  await page.waitForLoadState('domcontentloaded');
});

// Test - Add Financial Report
test('Add Financial report', async ({ page }) => {
  const locators = new PageLocators(page);

  // Add test steps for navigating and creating the report
  await AssertionHelper.clickWithAssertion(locators.accountingListButton);
  await AssertionHelper.clickWithAssertion(locators.reportsSidebarButton);
  await page.getByRole('button', { name: 'New Report' }).click();
  await page.getByRole('button', { name: 'Untitled' }).click();
  await page.getByText('Untitled', { exact: true }).press('ControlOrMeta+a');
  await page.getByText('Untitled', { exact: true }).fill('Test 1');
  await page.getByRole('button', { name: 'Add point' }).click();

  // Fix for Add Column button - select the first one
  const addColumnButton = page.getByRole('button', { name: 'Add column' }).nth(0);
  await addColumnButton.waitFor({ state: 'visible' });
  await addColumnButton.scrollIntoViewIfNeeded();
  await addColumnButton.click();

  // Select Month and Jan
  await page.getByRole('button', { name: 'Months' }).click();
  await page.getByRole('button', { name: 'Jan', exact: true }).click();
  await page.getByLabel('Add total').click();

  // Select Company
  await page.getByPlaceholder('Select a company').click();
  await page.getByRole('button', { name: 'Schaeffler AG' }).first().click();







  
 // Filling descriptions dynamically per row
const descriptions = ['Desc 1', 'Desc 2', 'Desc 3'];
for (let i = 0; i < descriptions.length; i++) {
  const row = page.locator('tr').nth(i + 1);  // Target specific row dynamically

  // Scroll the row into view and wait for visibility
  await row.scrollIntoViewIfNeeded();
  await row.waitFor({ state: 'visible', timeout: 2000 });

  // Attempt to use the provided locators in sequence
  let descriptionFilled = false;
  const locators = [
    row.getByText('Add description'),
    page.getByText('Add description').first(),
    page.locator('td:nth-child(3) > .FBgnEJocClp3FW0Q6gGx > .I_AYGSY_cCfPmhKt60K7 > .qbslhCzDn2yxLqTCAfBP > .IHk8i8QMhbXxNn3agTxb > .e9hboVSvByEVqJLwWGcg > .Qt0BcFdhZ0gnWLG3t5q2'),
    page.locator('.IHk8i8QMhbXxNn3agTxb').first()
  ];

  for (const locator of locators) {
    if (await locator.isVisible()) {
      await locator.click();
      await page.getByPlaceholder('Add description').fill(descriptions[i]);
      descriptionFilled = true;
      console.log(`Row ${i + 1}: Description added successfully.`);
      break;
    }
  }

  if (!descriptionFilled) {
    console.log(`Row ${i + 1}: Failed to add description. Button not visible.`);
  }

  // Slight delay for stability
  await page.waitForTimeout(500);
}







  // Filling values dynamically per row
  const values = ['200', '400', '600'];
  for (let i = 0; i < values.length; i++) {
    const row = page.locator('tr').nth(i + 1);  // Target the row
    await row.getByText('0.00', { exact: true }).click();
    await page.locator('input[type="text"]').fill(values[i]);
    await page.locator('input[type="text"]').press('Enter');
  }

  // Formula calculations for specific cells
  await page.locator('tr').nth(1).locator('input[type="text"]').fill('=A1+B2*B1');
  await page.locator('input[type="text"]').press('Enter');

  await page.locator('tr').nth(2).locator('input[type="text"]').fill('=A2*A1');
  await page.locator('input[type="text"]').press('Enter');

  // Save Report
  await page.pause();
  await page.getByRole('button', { name: 'Save' }).click();

  // Assert report is created
  await expect(page.locator('text=Report created successfully!')).toBeVisible();
});
