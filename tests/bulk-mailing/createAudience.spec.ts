import { test, expect } from '@playwright/test'
import { closeProductTour } from 'common/product-tour-helper.js'
import { closeTimerPopUp } from 'common/timer-helper.js'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper.js'
import { bulkMailingPage } from 'pages/bulk-mailing/bulk-mailing-page.js'
import { skipSurvey } from 'common/skip-survey.js'

//  import { Allure } from '../../helpers/common/allure-helper.js';
const campaignname = 'Demo Campaign'
const subject = 'Check Bulk Mailing'

let locators: bulkMailingPage
test.describe('Verify Bulk Mailing Functionalities', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    // await Allure.step('Navigate to Base URL and Close Popups', async () => {
    await page.goto(baseURL!)
    await skipSurvey(page, testInfo)
    locators = new bulkMailingPage(page)
    await closeProductTour(page)
    await page.waitForLoadState('networkidle')
    await closeTimerPopUp(page)
    await addCursorStyleAndScript(page)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Create Audience using File Upload', async ({ page }) => {
    await locators.bulkMailing.click()
    await locators.audienceButton.click()
    await locators.addNewAudience.click()
    await locators.fileUpload.click()
    await locators.nextButton.click()
    await locators.audienceTitle.click()
    await page.locator('input[name="name"]').fill('My Audience')
    await page.getByText('Drop file(s) hereorBrowse').click()
    const fileInput = page.locator('input[type="file"]')
    const filePath = 'C:/Users/Lenovo/Downloads/3emails.csv' // Replace with your file path
    await fileInput.setInputFiles(filePath)
    // Verify if file is uploaded (adjust based on your UI)
    const uploadedFileName = await page.getByText('3emails.csv').textContent()
    expect(uploadedFileName).toContain('3emails.csv')
    await console.log('Uploaded file:', filePath.split('/').pop())
    await locators.createAudienceButton.click()
    try {
      // Await the assertion
      await page.getByText('Audience created successfully')

      // Log success if the assertion passed
      console.log("Recieved toast message: 'Audience Created Successfully'.")
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Audience Created Text' element state did not meet expectations.",
        error
      )
    }
    try {
      // Await the assertion
      await page.locator('.NotificationCard_wrapper__1-myM')

      // Log success if the assertion passed
      console.log(
        "Recieved Notification message: 'Audience Created Successfully'."
      )
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Audience Created Notification' element state did not meet expectations.",
        error
      )
    }
  })

  test('Create Audience using Copy & Paste', async ({ page }) => {
    await locators.bulkMailing.click()
    await locators.audienceButton.click()
    await locators.addNewAudience.click()
    await locators.fileUpload.click()
    await locators.copyPaste.click();
    await locators.nextButton.click()
    await locators.audienceTitle.click()
    await page.locator('input[name="name"]').fill('My Audience Copy Pasted');
    await page.locator('span:nth-child(20)').click();
    await page.getByPlaceholder('Example: Email address, First').click();
    await page.getByPlaceholder('Example: Email address, First').fill('gowdadr@innoscripta.com, Ganganna, Gowda\nnarayanav@innoscripta.com, Karthik,Narayan\nraos@innoscripta.com, Shwetha, Rao\nbhat@innoscripta.com, Sharath, Bhat\n');
    await page.getByText('Preview').click();
    await page.locator('.Pmt4XLAw45QKoMAcH8cQ > .SmartTable-module_tableWrapper__O2vT5 > .SmartTable-module_smartTable__nylwu > thead > tr > th > .DraggableHeader-module_headerCellWrapper__nvR-Y > .DraggableHeader-module_headerCell__Y5Iwz > .HeaderCell-module_headerCell__4FmTJ > .HeaderCell-module_headerText__-eOWT').first().click();
    // await page.getByText('gowdadr@innoscripta.com', { exact: true }).click();
    // await page.getByText('narayanav@innoscripta.com', { exact: true }).click();
    // await page.getByText('raos@innoscripta.com', { exact: true }).click();
    // await page.getByText('bhat@innoscripta.com', { exact: true }).click();
    // await page.getByText('First name').click();
    // await page.getByText('Ganganna', { exact: true }).click();
    // await page.getByText('Karthik', { exact: true }).click();
    // await page.getByText('Shwetha', { exact: true }).click();
    // await page.getByText('Sharath', { exact: true }).click();
    // await page.getByText('Last name').click();
    // await page.getByText('Gowda', { exact: true }).click();
    // await page.getByText('Narayan', { exact: true }).click();
    // await page.getByText('Rao', { exact: true }).click();
    // await page.getByText('Bhat', { exact: true }).click();
    await page.getByText('Upload').click();

   try {
      // Await the assertion
      await page.getByText('Audience created successfully').click();

      // Log success if the assertion passed
      console.log(
        "Recieved Notification message: 'Audience Created Successfully'."
      )
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Audience Created Notification' element state did not meet expectations.",
        error
      )
    }
  
  })

  test.only('Create Audience using CLustrix Import Human Resources Employees ', async ({ page }) => {
    await locators.bulkMailing.click()
    await locators.audienceButton.click()
    await locators.addNewAudience.click()
    await locators.fileUpload.click()
    await locators.importFromClusterix.click();
    await locators.nextButton.click()
    await locators.audienceTitle.click()
  await page.locator('input[name="name"]').fill('My Audience CLustrix Import');
  await page.locator('.ColorItem-module_color__Lp-yV').first().click();
  await locators.appConnection.click();
  await locators.selectApp.click();
  await locators.hrEmployees.click();
  await locators.selectApp.click();

await page.pause();
  await page.locator('.vwGFw_vMUYEgvxeHK5oj').click();
  await page.locator('#ca-portal-root').getByText('HR', { exact: true }).click();
  await page.pause();
  await page.getByRole('button', { name: 'HR' }).nth(1).click()
  await page.waitForTimeout(5000)
  await page.locator('.ca-fixed').click();
  await locators.saveAppConnection.click();
  await locators.createAudienceButton.click()
  // await page.getByText('An unknown error occurred.').click();


   try {
      // Await the assertion
      await page.getByText('Audience created successfully');

      // Log success if the assertion passed
      console.log("Recieved toast message: 'Audience Created Successfully'.")
   
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Audience Created Notification' element state did not meet expectations.",
        error
      )
    }
    try {
      // Await the assertion
      await page.locator('.NotificationCard_wrapper__1-myM');

      // Log success if the assertion passed
      console.log(
        "Recieved Notification message: 'Audience Created Successfully'."
      )
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Audience Created Notification' element state did not meet expectations.",
        error
      )
    }

  
  })

  test('Create Audience using CLustrix Import Human Resources Candidates ', async ({ page }) => {
    await locators.bulkMailing.click()
    await locators.audienceButton.click()
    await locators.addNewAudience.click()
    await locators.fileUpload.click()
    await locators.importFromClusterix.click();
    await locators.nextButton.click()
    await locators.audienceTitle.click()
  await page.locator('input[name="name"]').fill('My Audience CLustrix Import');
  await page.locator('.ColorItem-module_color__Lp-yV').first().click();
  await locators.appConnection.click();
  await locators.selectApp.click();
  await page.getByText('Human Resources Candidates').click();
  await page.pause();
  await page.locator('.vwGFw_vMUYEgvxeHK5oj').click();
  await page.getByText('Bulk Mailing Demo - Dont Delete-Full Time').click();
  await page.pause();
  await locators.saveAppConnection.click();
  await locators.createAudienceButton.click()

   try {
      // Await the assertion
      await page.getByText('Audience created successfully');

      // Log success if the assertion passed
      console.log("Recieved toast message: 'Audience Created Successfully'.")
      
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Audience Created Notification' element state did not meet expectations.",
        error
      )
    }
    try {
      // Await the assertion
      await page.locator('.NotificationCard_wrapper__1-myM');

      // Log success if the assertion passed
      console.log(
        "Recieved Notification message: 'Audience Created Successfully'."
      )
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Audience Created Notification' element state did not meet expectations.",
        error
      )
    }

  
  })

})



