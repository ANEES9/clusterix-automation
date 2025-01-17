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

  test('Launch Clusterix and navigate to Accounting and verify if all sidebar buttons are working as per the expectations', async ({ page }) => {
    // Test with dashboard collapse
    await locators.clickAccountingListButton();
    await locators.clickPaymentsSidebarButton();
    await locators.paymentsTransactionSidebarButton.click();
    await locators.paymentsAnalysisSidebarButton.click();
    await locators.incomeSidebarButton.click();
    await locators.invoicesSidebarButton.click();
    await locators.categoriesSidebarButton.click();

    // Test with dashboard expand
    await locators.dashboardExpandButton.click();
    await locators.dashboardSidebarButton.click();
    await locators.paymentsSidebarButton.click();
    await locators.paymentsTransactionSidebarButton.click();
    await locators.paymentsAnalysisSidebarButton.click();
    await locators.incomeSidebarButton.click();
    await locators.invoicesSidebarButton.click();
    await locators.categoriesSidebarButton.click();
    await locators.reportsSidebarButton.click();
    await locators.dashboardCollapseButton.click();
    await locators.dashboardSidebarButton.click();

    // ***********Test will be futher continuied*******
  });
});
