import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import * as dotenv from 'dotenv'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { skipTimerHelper } from 'common/skip-timer-helper'
import { EmailPage } from 'pages/email'
import { generateRandomFileName } from 'common/random-data-generator'
import { FetchRemoteData } from './helpers/email-request'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

let accountId: string | null = null

test.describe('verify create folder and prevention of duplicate folder creation in Email', () => {
  let emailPage: EmailPage
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step(
      'Navigate to Base URL, Close Popups and navigate to Email application',
      async () => {
        emailPage = new EmailPage(page)
        await page.goto(baseURL!)
        await addCursorStyleAndScript(page)
        await skipSurveyHelper(page, testInfo)
        await skipProductTourHelper(page, testInfo)
        await page.waitForTimeout(4000)
        await skipTimerHelper(page)
        await page.waitForLoadState('networkidle')

        //Navigateion to Email Application
        await emailPage.navigateToEmail()
        accountId = await FetchRemoteData.fetchAccountId(page)
        await console.log(await page.title())
        await page.waitForTimeout(2000)
      }
    )
  })

  test('creation of folder in email', async ({ page }) => {
    emailPage = new EmailPage(page)
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Verifying the Folder Creation functionality, ensuring that users can create a new folder successfully. This test checks for the visibility and interactivity of the folder input field, confirmation button, and validation messages upon successful folder creation.'
    )
    const folder_name = generateRandomFileName()
    await Allure.step(
      'Step 1: Verify and Click Create Folder Button',
      async () => {
        await emailPage.verifyCreateFolderButton()
        await emailPage.clickOnCreateFolder()
      }
    )

    await Allure.step('Step 2: Verify and Fill Folder Name', async () => {
      await emailPage.verifyFolderNameField()
      await emailPage.fillFolderName(folder_name)
    })

    await Allure.step('Step 3: Verify and Save Folder', async () => {
      await emailPage.verifySaveFolderButton()
      await emailPage.clickOnSaveFolder()
    })

    const mailboxStatus = await FetchRemoteData.fetchMailboxStatus(
      page,
      accountId
    )

    await emailPage.verifyFolderSuccessfulToastMessage()
    await Allure.step('Step 4: Verify Folder Creation Status', async () => {
      if (mailboxStatus === 200) {
        console.log('Folder has been created successfully')
        Allure.addAttachment(
          'Folder Creation Status',
          'Folder has been created successfully.'
        )
      } else {
        const errorMessage = `Folder has not been created. API has returned status: ${mailboxStatus}.`
        console.log(errorMessage)
        Allure.addAttachment('Folder Creation Status', errorMessage)
      }
    })
  })

  test('prevention creation of duplicate folder in email', async ({ page }) => {
    emailPage = new EmailPage(page)
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Ensuring that the system prevents the creation of duplicate folders. This test verifies that an error message or validation warning is displayed when attempting to create a folder with an existing name, preventing redundant folder entries.'
    )
    const folder_name = generateRandomFileName()
    await Allure.step(
      'Step 1: Verify and Click Create Folder Button',
      async () => {
        await emailPage.verifyCreateFolderButton()
        await emailPage.clickOnCreateFolder()
      }
    )

    await Allure.step('Step 2: Verify and Fill Folder Name', async () => {
      await emailPage.verifyFolderNameField()
      await emailPage.fillFolderName(folder_name)
    })

    await Allure.step('Step 3: Verify and Save Folder', async () => {
      await emailPage.verifySaveFolderButton()
      await emailPage.clickOnSaveFolder()
    })
    const mailboxStatus = await FetchRemoteData.fetchMailboxStatus(
      page,
      accountId
    )
    await emailPage.verifyFolderSuccessfulToastMessage()
    await Allure.step('Step 4: Verify Folder Creation Status', async () => {
      if (mailboxStatus === 200) {
        console.log('Folder has been created successfully')
        Allure.addAttachment(
          'Folder Creation Status',
          'Folder has been created successfully.'
        )
      } else {
        const errorMessage = `Folder has not been created. API has returned status: ${mailboxStatus}.`
        console.log(errorMessage)
        Allure.addAttachment('Folder Creation Status', errorMessage)
      }
    })
    await page.waitForTimeout(4000)

    await Allure.step(
      'Step 5: Verify and Click Create Folder Button once again',
      async () => {
        await emailPage.verifyCreateFolderButton()
        await emailPage.clickOnCreateFolder()
      }
    )

    await Allure.step(
      'Step 6: Verify and Fill Folder with the same Name',
      async () => {
        await emailPage.verifyFolderNameField()
        await emailPage.fillFolderName(folder_name)
      }
    )

    await Allure.step('Step 7: Verify and Click on Save Folder', async () => {
      await emailPage.verifySaveFolderButton()
      await emailPage.clickOnSaveFolder()
    })
    const fetchDuplicateMailBox = await FetchRemoteData.fetchMailboxStatus(
      page,
      accountId
    )
    console.log('API has returned status: ', fetchDuplicateMailBox)
    await emailPage.verifyDuplicateFolderErrorToastMessage()
    await Allure.step(
      'Step 8: Verify Duplicate Folder Prevention',
      async () => {
        const duplicateStatus = fetchDuplicateMailBox

        if (duplicateStatus === 409) {
          console.log(
            'Email application successfully prevented the creation of duplicate folder'
          )
          Allure.addAttachment(
            'Duplicate Folder Prevention',
            'Email application successfully prevented the creation of duplicate folder.'
          )
        } else {
          const errorMessage = `Folder has been created. API has returned status: ${duplicateStatus}.`
          console.log(errorMessage)
          Allure.addAttachment('Duplicate Folder Prevention', errorMessage)
        }
      }
    )
  })
})
