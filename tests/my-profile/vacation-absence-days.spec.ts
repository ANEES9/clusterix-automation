import { test, expect } from '@playwright/test';
import { closeTimerPopUp } from '../../helpers/common/timer-helper';
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper';
import { EmployeeManagementPage } from '../../pages/HR/employee-management-page';
import { Allure } from '../../helpers/common/allure-helper';
import fs from 'fs';
import { VacationAbsenceDaysPage } from '../../pages/my-profile/vacation-absence-days.page';
import { skipSurvey } from 'common/skip-survey';
import { closeProductTour } from 'common/product-tour-helper';
let employeeId: number | null = null;
let selectedDay: number | null = null;


test.describe('Regression Test', () => {

  test.beforeEach(async ({ page, baseURL }) => {
    Allure.addDefaultLabels(); // Add default labels for Allure reporting.

    console.log('Base URL:', baseURL); // Log base URL for debugging.
    console.log('Navigating to:', `${baseURL}/profile/vacation-and-absence-days`); // Log navigation URL for debugging.

    await page.goto(`${baseURL}/profile/vacation-and-absence-days`); // Navigate to the HR Dashboard page.
    await page.waitForLoadState('networkidle'); // Ensure all network requests have completed.

    await skipSurvey(page)
    await closeProductTour(page)
    await closeTimerPopUp(page)
    await addCursorStyleAndScript(page)
    await page.waitForLoadState('networkidle')

  });

  test('Test_Case-1: Verify all available Absence types"', async ({ page }) => {
    Allure.addDescription('Verify all available Absence types');
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.

    const vacationAbsenceDaysPage = new VacationAbsenceDaysPage(page);

    // Verify the texts of available absence sections.
    await Allure.step('step-1 : Click on New Request sections', async () => {

      await vacationAbsenceDaysPage.clickOnNewRequest();
    });

    await Allure.step('Verification steps', async () => {

      await vacationAbsenceDaysPage.VerifyAvailableAbsenceTypes();
    });
  });

  test.only('Test_Case-2: Apply Vacation days days', async ({ page }) => {
    Allure.addDescription('Applies vacation days.'); // Add test description for reports.
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('critical'); // Set severity level for the test.

    const vacationAbsenceDaysPage = new VacationAbsenceDaysPage(page);
    const employeeManagementPage = new EmployeeManagementPage(page);

    await Allure.step('step-1 : Click on New Request sections', async () => {

      await vacationAbsenceDaysPage.clickOnNewRequest();
    });

    // Step 2: Add vacation days.
    await Allure.step('2 - Add vacation', async () => {

      await vacationAbsenceDaysPage.choosePaidVacation();
      await vacationAbsenceDaysPage.clickCreateButton();
    });

    // Step 3: Select a Dynamic vacation date and click Next.
    await Allure.step('3 - Select a vacation date and half day checkbox', async () => {
      await vacationAbsenceDaysPage.selectADay();
      await vacationAbsenceDaysPage.clickOnNextButton();
    });

    // Step 4: Select a co-worker.
    await Allure.step('4 - Select a co-worker', async () => {

      await vacationAbsenceDaysPage.selectACoWorker();
      await vacationAbsenceDaysPage.clickOnNextButton();
    });

    // Step 5: Submit vacation request and Verification.
    await Allure.step('5 - Submit vacation request', async () => {
       employeeId = await vacationAbsenceDaysPage.getEmployeeIdFromResponse(); // Get the employee ID from the API response.
      console.log("absence request is sent");
    });

    await Allure.step('6 - Verifiaction', async () => {
      if (employeeId) {
        await vacationAbsenceDaysPage.verifyVacationConfirmationDialogMessage();
        await vacationAbsenceDaysPage.verifyVacationAppliedDate();
        await vacationAbsenceDaysPage.verifyVacationConfirmationDialogMessageDesc();
        await vacationAbsenceDaysPage.verifyVacationDialogCloseButton();

        // Clean up by deleting the applied leave for the ease of next T.C
        await employeeManagementPage.deleteAppliedLeave(employeeId);
      } else {
        throw new Error('Missing Employee ID or Selected Day.'); // Handle missing data.
      }
    });
  });

 


});
