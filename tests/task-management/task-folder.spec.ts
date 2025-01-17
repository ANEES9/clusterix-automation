import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import { closeTimerPopUp } from 'common/timer-helper'
import { TaskManagementPage } from 'pages/task-management'
import { closeProductTour } from 'common/product-tour-helper'
import { generateRandomFileName } from 'common/random-data-generator'
import { skipSurvey } from 'common/skip-survey'

test.describe('Task Management Folder Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipSurvey(page)
      await closeProductTour(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test('Folder CRUD tests', async ({ page }) => {
    const locators = new TaskManagementPage(page)

    const taskmanageprod =
      'https://task-management-backend.innoscripta.com/api/folders'
    const taskmanagetest =
      'https://task-management-backend-testing.innoscripta.com/api/folders'

    const taskmanage = await ApiResponse(page, taskmanageprod, taskmanagetest)
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString('en-GB') // This will give you the format DD/MM/YYYY

    // For DD.MM.YYYY format, replace the slashes with dots
    const customFormattedDate = formattedDate.replace(/\//g, '.')

    console.log(customFormattedDate)
    const randomFileName = generateRandomFileName()
    const board_click_name = randomFileName + customFormattedDate
    console.log(board_click_name)
    console.log('Randomly Generated File Name:', randomFileName)
    locators.saveXPath = randomFileName
    await page.waitForLoadState('networkidle')

    //Folder creation
    await locators.navigateToTaskManagement()
    await locators.navigateToPinboardSection()
    await locators.navigateToAddFolder()
    await page.waitForTimeout(2000)
    await locators.navigateToRenameFolder()
    await locators.navigateToFillFolder(randomFileName)
    await locators.renameFolderAndSubmit()
    await page.waitForTimeout(5000)

    const { status: apiResponseStatus } = taskmanage()
    // Check the response and log messages accordingly
    if (apiResponseStatus === 200) {
      console.log('Success: API returned status 200.')
    } else if (apiResponseStatus !== 200) {
      console.log(
        `Error: API returned an unexpected status ${apiResponseStatus}.`
      )
    }

    // Assert that the API returned 201
    //expect(apiResponseStatus).toBe(201);
  })
})
