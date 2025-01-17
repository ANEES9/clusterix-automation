import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion-helpers';
import { PageLocators } from '../../helpers/accounting-locaters-helpers';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto('https://testing.clusterix.io/');

  await page.getByRole('button', { name: 'Login' }).nth(1).click();
  await page.getByPlaceholder('Email').fill('cop@test.de');
  await page.getByPlaceholder('Password').fill('1');
  await page
    .locator('div')
    .filter({ hasText: /^Login$/ })
    .first()
    .click();

  await page.locator('div').filter({ hasText: /^Skip tour$/ }).first().click();
  const locators = new PageLocators(page);
  await page.waitForLoadState('domcontentloaded');
});

// Test1 - Navigation UI Tests
test('Launch Clusterix and navigate to Accounting and verify if all sidebar buttons are working as per the expectations', async ({ page }) => {
  const locators = new PageLocators(page);

  // Test with dashboard collapse
  await AssertionHelper.clickWithAssertion(locators.accountingListButton);
  await AssertionHelper.clickWithAssertion(locators.paymentsSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.paymentsTransactionSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.paymentsAnalysisSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.incomeSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.invoicesSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.categoriesSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.reportsSidebarButton);

  // Test with dashboard expand
  await AssertionHelper.clickWithAssertion(locators.dashboardExpandButton);
  await AssertionHelper.clickWithAssertion(locators.dashboardSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.paymentsSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.paymentsTransactionSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.paymentsAnalysisSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.incomeSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.invoicesSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.categoriesSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.reportsSidebarButton);
  await AssertionHelper.clickWithAssertion(locators.dashboardCollapseButton);
  await AssertionHelper.clickWithAssertion(locators.dashboardSidebarButton);
});



