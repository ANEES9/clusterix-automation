import { test, expect } from '@playwright/test';
import { closeWelcomePopUp } from '../../helpers/common/welcome-popup-helper';
import { closeTimerPopUp } from '../../helpers/common/timer-helper';
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper';
import { HRDashboardPage } from '../../pages/HR/hr-dashboard-page';
import { Allure } from '../../helpers/common/allure-helper';
import fs from 'fs';
let selectedDay: number | null = null;




test.describe('Regression Test', () => {


  test.beforeEach(async ({ page, baseURL }) => {
    Allure.addDefaultLabels(); // Add default labels for Allure reporting.


    console.log('Base URL:', baseURL); // Log base URL for debugging.
    console.log('Navigating to:', `${baseURL}/hr/dashboard`); // Log navigation URL for debugging.


    await page.goto(`${baseURL}/hr/dashboard`); // Navigate to the HR Dashboard page.
    await page.waitForLoadState('networkidle'); // Ensure all network requests have completed.


    const hrDashboard = new HRDashboardPage(page);
    await hrDashboard.closeFeedbackForm();
    //await closeWelcomePopUp(page); // Close any welcome pop-ups if present.
    await closeTimerPopUp(page); // Close any timer-related pop-ups if present.
    await addCursorStyleAndScript(page); // Add custom cursor styling and scripts.
  });


  test('Test_Case-1: Verify available vacation types in the "My Absence Section"', async ({ page }) => {
    Allure.addDescription('Validates that all absence types are displayed correctly in "My Absence Section".');
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.


    const hrDashboard = new HRDashboardPage(page); // Initialize the HRDashboardPage object.


    // Verify the texts of absence sections.
    await Allure.step('1 - Verify absence sections', async () => {
      const sections = await hrDashboard.getAbsenceSectionsTexts();
      expect(sections.vacation).toBe('Vacation Days 2025'); // Validate vacation section text.
      expect(sections.sick).toBe('Sick Day'); // Validate sick day section text.
      expect(sections.homeOffice).toBe('Home Office'); // Validate home office section text.
      expect(sections.other).toBe('Other'); // Validate other section text.
    });
  });


  test('Test_Case-2: Apply vacation days', async ({ page }) => {
    Allure.addDescription('Applies vacation days.'); // Add test description for reports.
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.


    const hrDashboard = new HRDashboardPage(page); // Initialize the HRDashboardPage object.


    // Step 1: Verify vacation type and days left.
    await Allure.step('1 - Verify vacation type and days left', async () => {
      const vacationTypeText = await hrDashboard.vacationType.textContent(); // Get vacation type text.
      const vacationDaysLeft = await hrDashboard.vacationDays.textContent(); // Get vacation days left text.
      console.log(`${vacationTypeText} ${vacationDaysLeft}`); // Log both values for debugging.
    });


    // Step 2: Add vacation days.
    await Allure.step('2 - Add vacation', async () => {


      const addVacation = hrDashboard.addVacationButton;
      await expect(addVacation).toBeVisible(); // Assertion to ensure visibility
      await hrDashboard.addVacationButton.click(); // Click on the "+" button to add vacation.
    });


    // Step 3: Select a Dynamic vacation date and click Next.
    //let selectedDay: number | null = null; // Variable to store selected day.
    await Allure.step('3 - Select a vacation date', async () => {
      selectedDay = await hrDashboard.findAndApplyVacation(); // Find and select an available day for vacation.
      if (selectedDay === null) throw new Error('No valid days available for vacation.'); // Handle case where no day is selected.
      await hrDashboard.nextButton.click();
    });


    // Step 4: Select a co-worker.
    await Allure.step('4 - Select a co-worker', async () => {
      await hrDashboard.responsibleDropdown.click(); // Open the dropdown to select a co-worker.
      await hrDashboard.responsibleDropdownList.click(); // Select the first co-worker from the list.
      await page.locator('.ca-fixed').click(); // Confirm the selection.
      await hrDashboard.nextButton.click(); // Proceed to the next step.
    });


    // Step 5: Submit vacation request and Verification.
    await Allure.step('5 - Submit vacation request', async () => {
      const employeeId = await hrDashboard.getEmployeeIdFromResponse(); // Get the employee ID from the API response.


      if (employeeId && selectedDay) {
        const formattedDate = `${selectedDay} Jan. 2025 - ${selectedDay} Jan. 2025`; // Format the selected date.
        await expect(hrDashboard.vacationAppliedDate).toHaveText(formattedDate); // Validate the displayed date.
        await expect(hrDashboard.vacationConfirmationDialogDesc).toHaveText(
          'You will get notified when your teamlead, CEO and HR approves your vacation request.'
        ); // Validate the confirmation message.


        await expect(hrDashboard.closeBttnSickConfirmationDialog).toBeVisible();
        await hrDashboard.closeBttnSickConfirmationDialog.click(); // Close the confirmation dialog.


        // Clean up by deleting the applied leave for the ease of next T.C
        await hrDashboard.deleteAppliedLeave(employeeId);
      } else {
        throw new Error('Missing Employee ID or Selected Day.'); // Handle missing data.
      }
    });
  });


  test('Test_Case-3: Apply Half-Day Absence', async ({ page }) => {


    Allure.addDescription('Apply Half-Day Absence.');
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.


    const hrDashboard = new HRDashboardPage(page); // Initialize the HRDashboardPage object.


    // Step 1: Add absence.
    await Allure.step('1 - Add absence', async () => {
      await hrDashboard.addVacationButton.click(); // Click "+" to add an absence.
    });


    // Step 2: Select a Dynamic vacation date and click Next.
    //let selectedDay: number | null = null; // Variable to store selected day.
    await Allure.step('2 - Select a Half Day vacation date', async () => {
      selectedDay = await hrDashboard.findAndApplyVacation(); // Find and select an available day for vacation.
      if (selectedDay === null) throw new Error('No valid days available for vacation.'); // Handle case where no day is selected.
      await hrDashboard.halfDayCheckBox.click();
      await hrDashboard.nextButton.click();
    });


    // Step 3: Select a co-worker.
    await Allure.step('3 - Select a co-worker', async () => {
      await hrDashboard.responsibleDropdown.click(); // Open the dropdown to select a co-worker.
      await hrDashboard.responsibleDropdownList.click(); // Select the first co-worker from the list.
      await page.locator('.ca-fixed').click(); // Confirm the selection.
      await hrDashboard.nextButton.click(); // Proceed to the next step.
    });


    // Step 4: Submit vacation request and Verification.
    await Allure.step('4 - Submit vacation request', async () => {
      const employeeId = await hrDashboard.getEmployeeIdFromResponse(); // Get the employee ID from the API response.


      if (employeeId && selectedDay) {
        const formattedDate = `${selectedDay} Jan. 2025 - ${selectedDay} Jan. 2025`; // Format the selected date.
        await expect(hrDashboard.vacationAppliedDate).toHaveText(formattedDate); // Validate the displayed date.
        await expect(hrDashboard.vacationConfirmationDialogMessage).toHaveText(
          'You will get notified when your teamlead, CEO and HR approves your vacation request.'
        ); // Validate the confirmation message.
        await hrDashboard.vacationDialogCloseButton.click(); // Close the confirmation dialog.


        // Clean up by deleting the applied leave for the ease of next T.C
        await hrDashboard.deleteAppliedLeave(employeeId);
      } else {
        throw new Error('Missing Employee ID or Selected Day.'); // Handle missing data.
      }
    });
  });


  test('Test_Case-4: Submit Sick Day Request', async ({ page }) => {


    Allure.addDescription('Apply sick Absence.');
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.


    const hrDashboard = new HRDashboardPage(page); // Initialize the HRDashboardPage object.
    const filePath = 'C:/Users/Lenovo/Downloads/filename.png'; // Define the path to the sick leave report file.


    // Step 1: Add sick day request.
    await Allure.step('1 - Add sick day request', async () => {
      await hrDashboard.addSickDayButton.click(); // Click "+" to add a sick day request.
    });


    // Step 2: Select a sick day date.
    await Allure.step('2 - Select a sick day date', async () => {
      selectedDay = await hrDashboard.findAndApplyVacation(); // Find and select an available day for vacation.
      if (selectedDay === null) throw new Error('No valid days available for vacation.'); // Handle case where no day is selected.
    });


    // Step 3: Upload sick leave report.
    await Allure.step('3 - Upload sick leave report', async () => {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`); // Throw error if file doesn't exist.
      }
      await hrDashboard.fileInput.setInputFiles(filePath); // Upload the sick leave report.
    });


    // Step 4: Enter a message for the team lead.
    await Allure.step('4 - Enter message for the team lead', async () => {
      await hrDashboard.messageInput.fill('sick'); // Enter a custom message for the team lead.
    });




    // Step 5: Submit vacation request and Verification.
    await Allure.step('5 - Submit a Sick request', async () => {
      const employeeId = await hrDashboard.getEmployeeIdFromResponse(); // Get the employee ID from the API response.


      if (employeeId && selectedDay) {
        const formattedDate = `${selectedDay} Jan. 2025 - ${selectedDay} Jan. 2025`; // Format the selected date.
        await expect(hrDashboard.vacationAppliedDate).toHaveText(formattedDate); // Validate the displayed date.


        // Validate the confirmation message.
        await expect(hrDashboard.sickVacationConfirmationMessage).toHaveText('Get better soon!');


        await hrDashboard.closeBttnSickConfirmationDialog.click();


        // Clean up by deleting the applied leave for the ease of next T.C
        await hrDashboard.deleteAppliedLeave(employeeId);
      } else {
        throw new Error('Missing Employee ID or Selected Day.'); // Handle missing data.
      }
    });
  });


  test('Test_Case-5: Apply Home Office Absence', async ({ page }) => {


    Allure.addDescription('Home Office.');
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.


    const hrDashboard = new HRDashboardPage(page); // Initialize the HRDashboardPage object.


    // Step 1: Add absence.
    await Allure.step('1 - Add absence', async () => {
      await hrDashboard.addHomeOfficeButton.click(); // Click "+" to add an absence.
    });


    // Step 2: Select a Dynamic vacation date and click Next.
    //let selectedDay: number | null = null; // Variable to store selected day.
    await Allure.step('2 - Select a Half Day vacation date', async () => {
      selectedDay = await hrDashboard.findAndApplyVacation(); // Find and select an available day for vacation.
      if (selectedDay === null) throw new Error('No valid days available for vacation.'); // Handle case where no day is selected.
      await hrDashboard.nextButton.click();
    });


    // Step 3: Submit vacation request and Verification.
    await Allure.step('3 - Submit vacation request', async () => {
      const employeeId = await hrDashboard.getEmployeeIdFromResponse(); // Get the employee ID from the API response.


      if (employeeId && selectedDay) {
        const formattedDate = `${selectedDay} Jan. 2025 - ${selectedDay} Jan. 2025`; // Format the selected date.
        await expect(hrDashboard.vacationAppliedDate).toHaveText(formattedDate); // Validate the displayed date.
        await expect(hrDashboard.vacationConfirmationMessage).toHaveText(
          'You will get notified when your teamlead, CEO and HR approves your request.'
        ); // Validate the confirmation message.
        await hrDashboard.HomeofficeConfirmationDialog.click(); // Close the confirmation dialog.


        // Clean up by deleting the applied leave for the ease of next T.C
        await hrDashboard.deleteAppliedLeave(employeeId);
      } else {
        throw new Error('Missing Employee ID or Selected Day.'); // Handle missing data.
      }
    });
  });


  test('Test_Case-6: Apply Other Absence', async ({ page }) => {


    Allure.addDescription('other leaves.');
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.


    const hrDashboard = new HRDashboardPage(page); // Initialize the HRDashboardPage object.


    // Step 1: Add absence.
    await Allure.step('1 - Add other types of absence', async () => {
      await hrDashboard.addOtherVacation.click(); // Click "+" to add an absence.
    });


    // Step 2: Select a Dynamic vacation date and click Next.
    //let selectedDay: number | null = null; // Variable to store selected day.
    await Allure.step('2 - Select a Half Day vacation date', async () => {
      selectedDay = await hrDashboard.findAndApplyVacation(); // Find and select an available day for vacation.
      if (selectedDay === null) throw new Error('No valid days available for vacation.'); // Handle case where no day is selected.
      await hrDashboard.nextButton.click();
    });


    // Step 3: Select a co-worker.
    await Allure.step('3 - Select a co-worker', async () => {
      await hrDashboard.responsibleDropdown.click(); // Open the dropdown to select a co-worker.
      await hrDashboard.responsibleDropdownList2.click(); // Select the first co-worker from the list.
      await page.locator('.ca-fixed').click(); // Confirm the selection.
      await hrDashboard.nextButton.click(); // Proceed to the next step.


    });


    // Step 4: Submit vacation request and Verification.
    await Allure.step('4 - Submit vacation request', async () => {
      const employeeId = await hrDashboard.getEmployeeIdFromResponse(); // Get the employee ID from the API response.


      if (employeeId && selectedDay) {
        const formattedDate = `${selectedDay} Jan. 2025 - ${selectedDay} Jan. 2025`; // Format the selected date.
        await expect(hrDashboard.vacationAppliedDate).toHaveText(formattedDate); // Validate the displayed date.
        await expect(hrDashboard.vacationConfirmationMessage).toHaveText(
          'You will get notified when your teamlead, CEO and HR approves your request.'
        ); // Validate the confirmation message.
        await hrDashboard.otherAbsenceConfirmationDialog.click(); // Close the confirmation dialog.


        // Clean up by deleting the applied leave for the ease of next T.C
        await hrDashboard.deleteAppliedLeave(employeeId);
      } else {
        throw new Error('Missing Employee ID or Selected Day.'); // Handle missing data.
      }
    });
  });


  test('Test_Case-7: Verify remaining number of Leaves in Vacation Days section', async ({ page }) => {




    Allure.addDescription('Verify remaining number of Leaves.');
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.


    const hrDashboard = new HRDashboardPage(page); // Initialize the HRDashboardPage object.
    await hrDashboard.addVacationButton.click();


    await page.waitForTimeout(5000);
    // Using CSS selectors for better performance and fewer issues with class order
    const text1 = await page.locator("(//div[@class='text-xl font-bold leading-none text-app-light'])[1]").allTextContents();
    console.log('Total Days:', text1);


    const text2 = await page.locator('div.text-xl.font-bold.leading-none.text-green-light').allTextContents();
    console.log('Days Available:', text2);


    const text3 = await page.locator('div.text-xl.font-bold.leading-none.text-contrast-grey').allTextContents();
    console.log('Days Used:', text3);


  });


  test('Test_Case-8: Verify remaining number of Leaves in Vacation Days section', async ({ page }) => {


    Allure.addDescription('Verify remaining number of Leaves.');
    Allure.addTag('Vacation'); // Tag the test for categorization in reports.
    Allure.addSeverity('normal'); // Set severity level for the test.


    const hrDashboard = new HRDashboardPage(page); // Initialize the HRDashboardPage object.
    await hrDashboard.addSickDayButton.click();


    await page.waitForTimeout(5000);
    // Using CSS selectors for better performance and fewer issues with class order
    const text1 = await page.locator("(//div[@class='text-xl font-bold leading-none text-app-light'])[1]").allTextContents();
    console.log('Sick Days Used:', text1);
  });


});



