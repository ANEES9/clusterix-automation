import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import * as dotenv from 'dotenv'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { EmailPage } from 'pages/email'
import { generateRandomFileName } from 'common/random-data-generator'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })
const currentDate = new Date()

const toEmailId = 'bhat@innoscripta.com'
const testEmailSubject = 'Testing purpose email via automation'
const testEmailBody = `Testing purpose email via automation. Sent at: ${currentDate.toString()}`

let fetchMailBoxIdProd: string, fetchMailBoxIdTest: string

test.describe('verify create folder and duplicate folder creation in Email', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step(
      'Navigate to Base URL, Close Popups and navigate to Email application',
      async () => {
        const locators = new EmailPage(page)
        await page.goto(baseURL!)
        await addCursorStyleAndScript(page)
        await skipSurveyHelper(page, testInfo)
        await skipProductTourHelper(page, testInfo)
        await page.waitForTimeout(4000)
        await closeTimerPopUp(page)
        await page.waitForLoadState('networkidle')
        const fetchAccIdProd =
          'https://email-controller.innoscripta.com/api/account'
        const fetchAccIdTest =
          'https://email-controller-testing.innoscripta.com/api/account'

        await page.waitForLoadState('networkidle')
        await locators.navigateToEmail()
        await page.waitForTimeout(5000)
        const fetchAccId = await ApiResponse(
          page,
          fetchAccIdProd,
          fetchAccIdTest
        )
        await console.log(await page.title())
        let matchingItem: any,
          id: string | null = null

        const { status: fetchAccStatus, data: fetchAccData } =
          await fetchAccId()
        await page.waitForTimeout(4000)
        if (fetchAccData) {
          matchingItem = fetchAccData?.find(
            (item: any) => item.ee_email === process.env.CLUSTERIX_EMAIL
          )
          if (matchingItem) {
            id = matchingItem.id
            console.log('Matched ID:', id)
          } else {
            console.log(
              `No matching item found for ee_email = "${process.env.CLUSTERIX_EMAIL}".`
            )
          }
        } else {
          console.log('No data received.')
        }

        // Construct URLs after processing the ID
        fetchMailBoxIdProd = `https://email-controller.innoscripta.com/api/account-data/${id}/mailbox`
        fetchMailBoxIdTest = `https://email-controller-testing.innoscripta.com/api/account-data/${id}/mailbox`
        await page.waitForTimeout(2000)
      }
    )
  })

  test('creation of folder in email', async ({ page }) => {
    const locators = new EmailPage(page)
    const folder_name = generateRandomFileName()
    await locators.clickOnCreateFolder()
    await locators.fillFolderName(folder_name)
    await locators.clickOnSaveFolder()
    const fetchMailBox = await ApiResponse(
      page,
      fetchMailBoxIdProd,
      fetchMailBoxIdTest
    )

    const { status: fetchMailBoxStatus, data: fetchMailBoxData } =
      fetchMailBox()
    await locators.verifyFolderSuccessfulToastMessage()
    if (fetchMailBoxStatus === 200) {
      console.log('Folder has been created successfully')
    } else {
      console.log(
        `Folder has not been created. API has returned status : ${fetchMailBoxStatus}.`
      )
    }
  })

  test('creation of duplicate folder in email', async ({ page }) => {
    const locators = new EmailPage(page)
    const folder_name = generateRandomFileName()
    await locators.clickOnCreateFolder()
    await locators.fillFolderName(folder_name)
    await locators.clickOnSaveFolder()
    const fetchMailBox = await ApiResponse(
      page,
      fetchMailBoxIdProd,
      fetchMailBoxIdTest
    )

    const { status: fetchMailBoxStatus, data: fetchMailBoxData } =
      fetchMailBox()
    await locators.verifyFolderSuccessfulToastMessage()
    if (fetchMailBoxStatus === 200) {
      console.log('Folder has been created successfully')
    } else {
      console.log(
        `Folder has not been created. API has returned status : ${fetchMailBoxStatus}.`
      )
    }
    await page.waitForTimeout(4000)

    await locators.clickOnCreateFolder()
    await locators.fillFolderName(folder_name)
    await locators.clickOnSaveFolder()
    const fetchDuplicateMailBox = await ApiResponse(
      page,
      fetchMailBoxIdProd,
      fetchMailBoxIdTest
    )
    console.log('API has returned status: ', fetchDuplicateMailBox().status)
    await locators.verifyDuplicateFolderErrorToastMessage()
    if (fetchDuplicateMailBox().status === 409) {
      console.log(
        'Email application successfully prevented the creation of duplicate folder'
      )
    } else {
      console.log(
        `Folder has been created. API has returned status : ${fetchDuplicateMailBox().status}.`
      )
    }
  })
})
