import { Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import * as dotenv from 'dotenv'
import { closeTimerPopUp } from 'common/timer-helper'
import { TaskManagementPage } from 'pages/task-management'
import { closeProductTour } from 'common/product-tour-helper'
import { generateRandomFileName } from 'common/randomDataGenerator'
import { skipSurvey } from 'common/skip-survey'
import { couldStartTrivia } from 'typescript'

test.describe('task management Test', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipSurvey(page);
      await closeProductTour(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
 
    })
  })

  test('test case two', async ({
    page,
  }) => {

    //Test data set-up
      const locators = new TaskManagementPage(page)
      
      const taskmanageprod = 'https://task-management-backend.innoscripta.com/api/folders'
      const taskmanagetest = 'https://task-management-backend-testing.innoscripta.com/api/folders'

      const taskmanage = await ApiResponse(page, taskmanageprod, taskmanagetest)
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB'); // This will give you the format DD/MM/YYYY

          // For DD.MM.YYYY format, replace the slashes with dots
      const customFormattedDate = formattedDate.replace(/\//g, '.');

      console.log(customFormattedDate);
      const randomFileName = generateRandomFileName();
      const board_click_name = randomFileName + customFormattedDate;
      console.log(board_click_name);
      console.log('Randomly Generated File Name:', randomFileName);
      await page.waitForLoadState('networkidle');
      await locators.navigateToTaskManagement();
      await locators.navigateToPinboardSection();
      await locators.navigateToaddfolder();
      await page.waitForTimeout(2000);
      await locators.navigateTorenamefolder();
      await locators.navigateTofillfolder(randomFileName);
      await locators.navigateTorenameenter();
      await page.waitForTimeout(5000);


//Switch to Agile
  await page.getByText(randomFileName).dblclick();
  await page.getByText('Folder Settings').click();
  await page.getByLabel('Switch to Agile').click();
  await page.locator('div').filter({ hasText: /^CancelSave$/ }).first().click();
  await page.locator('#scroll-area').click();
  await page.getByText('Folder Settings').click();
  await page.getByLabel('Switch to Agile').click();
  await page.getByText('Save').click()
     

  //Status creation
     // await page.getByText(board_click_name).dblclick();
     // await page.getByRole('button', { name: 'New Status' }).click();
     // await page.getByPlaceholder('Status Name').fill(randomFileName);
     // await page.getByPlaceholder('Status Name').press('Enter');

      //task creation
      //await page.getByRole('button', { name: 'Add Task' }).click();
      //await page.getByPlaceholder('Task Name').fill(randomFileName);
      //await page.getByPlaceholder('Task Name').press('Enter');
      //await page.waitForTimeout(3000);

      const {status : apiResponseStatus } = taskmanage()
      // Check the response and log messages accordingly
      if (apiResponseStatus === 200) {
          console.log('Success: API returned status 200.');
      } else if (apiResponseStatus !== 200) {
          console.log(`Error: API returned an unexpected status ${apiResponseStatus}.`);
      }

              // Assert that the API returned 201
      //expect(apiResponseStatus).toBe(201);
  })

  

  

  

  

  
})













