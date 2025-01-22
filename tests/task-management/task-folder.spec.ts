import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import { closeTimerPopUp } from 'common/timer-helper'
import { TaskManagementPage } from 'pages/task-management'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { generateRandomFileName } from 'common/random-data-generator'
import { skipSurveyHelper } from 'common/skip-survey-helper'

test.describe('Task Management Folder Tests', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipSurveyHelper(page, testInfo)
      await skipProductTourHelper(page, testInfo)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test('Folder Create tests', async ({ page }) => {
    const locators = new TaskManagementPage(page)

    const taskmanageprod =
      'https://task-management-backend.innoscripta.com/api/folders'
    const taskmanagetest =
      'https://task-management-backend-testing.innoscripta.com/api/folders'

    
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
    const taskmanage = await ApiResponse(page, taskmanageprod, taskmanagetest)
    await page.waitForTimeout(2000)
    await locators.navigateToRenameFolder()
    await locators.navigateToFillFolder(randomFileName)
    await locators.renameFolderAndSubmit()
    await page.waitForTimeout(5000)

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



  test('Folder Update tests', async ({ page }) => {
    const locators = new TaskManagementPage(page)

    const taskmanageprod =
      'https://task-management-backend.innoscripta.com/api/folders'
    const taskmanagetest =
      'https://task-management-backend-testing.innoscripta.com/api/folders'

    
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
    locators.saveXPathRightClickFolder = randomFileName
    const new_name = generateRandomFileName()
    await page.waitForLoadState('networkidle')

    //Folder creation
    await locators.navigateToTaskManagement()
    await locators.navigateToPinboardSection()
    await locators.navigateToAddFolder()
    const taskmanage = await ApiResponse(page, taskmanageprod, taskmanagetest)
    await page.waitForTimeout(2000)
    await locators.navigateToRenameFolder()
    await locators.navigateToFillFolder(randomFileName)
    await locators.renameFolderAndSubmit()
    await page.waitForTimeout(5000)


    const { status: apiResponseStatus } = taskmanage()
    // Check the response and log messages accordingly
    if (apiResponseStatus === 201) {
      console.log('Success: API returned status 201.')
    } else if (apiResponseStatus !== 201) {
      console.log(
        `Error: API returned an unexpected status ${apiResponseStatus}.`
      )
    }


    // Renameing part starts here
    await locators.rightClickOnFolder()
    await page.waitForTimeout(2000)
    await locators.renameFolder()
    await locators.navigateToRenameFolder()
    await locators.navigateToFillFolder(new_name)
    await locators.renameFolderAndSubmit()
    await locators.clickOnFolder()
    console.log('Raname folder name:', new_name)

    

  })


  test('Folder Delete tests', async ({ page }) => {
    const locators = new TaskManagementPage(page)

    const taskmanageprod =
      'https://task-management-backend.innoscripta.com/api/folders'
    const taskmanagetest =
      'https://task-management-backend-testing.innoscripta.com/api/folders'

    
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
    locators.saveXPathRightClickFolder = randomFileName
    const new_name = generateRandomFileName()
    await page.waitForLoadState('networkidle')

    //Folder creation
    await locators.navigateToTaskManagement()
    await locators.navigateToPinboardSection()
    await locators.navigateToAddFolder()
    const taskmanage = await ApiResponse(page, taskmanageprod, taskmanagetest)
    await page.waitForTimeout(2000)
    await locators.navigateToRenameFolder()
    await locators.navigateToFillFolder(randomFileName)
    await locators.renameFolderAndSubmit()
    await page.waitForTimeout(5000)

    const { status: apiResponseStatus } = taskmanage()
    // Check the response and log messages accordingly
    if (apiResponseStatus === 201) {
      console.log('Success: API returned status 201.')
    } else if (apiResponseStatus !== 201) {
      console.log(
        `Error: API returned an unexpected status ${apiResponseStatus}.`
      )
    }

    // deletion part starts here
    await locators.rightClickOnFolder()
    await page.waitForTimeout(2000)
    await locators.deleteFolder()
    await locators.confirmDelete()
    console.log('Folder Deleted')

    

  })





})
