import { Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import * as dotenv from 'dotenv'
import { closeTimerPopUp } from 'common/timer-helper'
import { TaskManagementPage } from 'pages/task-management'
import { closeProductTour } from 'common/product-tour-helper'
import { generateRandomFileName } from 'common/randomDataGenerator'
import { skipSurvey } from 'common/skip-survey'

test.describe('task management Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipSurvey(page);
      await closeProductTour(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
 
    })
  })

  test('test case one', async ({
    page,
  }) => {
      const locators = new TaskManagementPage(page)
      // let apiResponseStatus: number | null = null;

      //   // Intercept the API request and capture the response status
      //   await page.route(whenProd('https://task-management-backend.innoscripta.com/api/tasks','https://task-management-backend-testing.innoscripta.com/api/tasks'), async (route) => {
      //       route.continue();
      //       const response = await route.request().response();
      //       if (response) {
      //       apiResponseStatus = response.status();
      //       console.log('API Response Status:', apiResponseStatus);
      //       } else {
      //       console.log('No response received for the API call.');
      //       }
      //   });
      const taskmanageprod = 'https://task-management-backend.innoscripta.com/api/tasks'
      const taskmanagetest = 'https://task-management-backend-testing.innoscripta.com/api/tasks'

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
      await locators.navigateToTaskManagement()
      await page.getByRole('button', { name: 'My Pinboards' }).click();
      await page.getByText('Add folder').click();
      await page.waitForTimeout(2000);
      await page.locator('#scroll-area').getByRole('textbox').press('ControlOrMeta+a');
      await page.locator('#scroll-area').getByRole('textbox').fill(randomFileName);
      await page.locator('#scroll-area').getByRole('textbox').press('Enter');
      await page.waitForTimeout(5000);
      await page.getByText(randomFileName).dblclick();
      await page.getByText('Add pinboard').click();
      await page.waitForTimeout(3000);
      await page.locator('#scroll-area').getByRole('textbox').press('ControlOrMeta+a');
      await page.locator('#scroll-area').getByRole('textbox').fill(randomFileName);
      await page.locator('#scroll-area').getByRole('textbox').press('Enter');
      await page.waitForTimeout(5000);    
      await page.getByText(board_click_name).dblclick();
      await page.getByRole('button', { name: 'New Status' }).click();
      await page.getByPlaceholder('Status Name').fill(randomFileName);
      await page.getByPlaceholder('Status Name').press('Enter');
      await page.getByRole('button', { name: 'Add Task' }).click();
      await page.getByPlaceholder('Task Name').fill(randomFileName);
      await page.getByPlaceholder('Task Name').press('Enter');
      await page.waitForTimeout(3000);

      const {status : apiResponseStatus } = taskmanage()
      // Check the response and log messages accordingly
      if (apiResponseStatus === 201) {
          console.log('Success: API returned status 201.');
      } else if (apiResponseStatus !== 201) {
          console.log('Error: API returned an unexpected status ${apiResponseStatus}.');
      }

              // Assert that the API returned 201
      //expect(apiResponseStatus).toBe(201);
  })

  

  

  

  

  
})


