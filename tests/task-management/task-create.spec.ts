import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import { closeTimerPopUp } from 'common/timer-helper'
import { TaskManagementPage } from 'pages/task-management'
import { closeProductTour } from 'common/product-tour-helper'
import { generateRandomFileName } from 'common/random-data-generator'
import { skipSurveyHelper } from 'common/skip-survey-helper'

test.describe('Task Management Board Tests', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipSurveyHelper(page, testInfo)
      await closeProductTour(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test('Status creation Tests', async ({ page }) => {
    const locators = new TaskManagementPage(page)

    const taskmanageprod =
      'https://task-management-backend.innoscripta.com/api/tasks'
    const taskmanagetest =
      'https://task-management-backend-testing.innoscripta.com/api/tasks'

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
    locators.savexpath = randomFileName
    locators.savexpathboard = board_click_name
    await page.waitForLoadState('networkidle')

    //Folder creation
    await locators.navigatetotaskmanagement()
    await locators.navigatetopinboardsection()
    await locators.navigatetoaddfolder()
    await page.waitForTimeout(7000)
    await locators.navigatetorenamefolder()
    await locators.navigatetofillfolder(randomFileName)
    await locators.renamefolderandsubmit()
    await page.waitForTimeout(7000)

    //board creation

    await locators.clickonfolder()
    await locators.navigatetoaddpinboard()
    await page.waitForTimeout(7000)
    await locators.navigatetorenameboard()
    await locators.navigatetofillboard(randomFileName)
    await locators.renameboardandsubmit()
    await page.waitForTimeout(7000)

    //status creation
    await locators.clickonboard()
    await locators.navigatetoaddstatus()
    await locators.navigatetofillstatus(randomFileName)
    await locators.statussubmit()
    await page.waitForTimeout(1000)

    // Task creation
    await locators.navigatetoaddtask()
    await locators.navigatetofilltask(randomFileName)
    await locators.tasksubmit()
    await page.waitForTimeout(3000)

    const { status: apiResponseStatus } = taskmanage()
    // Check the response and log messages accordingly
    if (apiResponseStatus === 201) {
      console.log('Success: API returned status 201.')
    } else if (apiResponseStatus !== 201) {
      console.log(
        `Error: API returned an unexpected status ${apiResponseStatus}.`
      )
    }
  })
})
