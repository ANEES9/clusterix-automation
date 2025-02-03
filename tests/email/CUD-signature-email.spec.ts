import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper' // Import Allure
import * as dotenv from 'dotenv'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { EmailPage } from 'pages/email'
import { generateRandomFileName } from 'common/random-data-generator'
import { FetchRemoteData } from './helpers/email-request'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })
new Date()
let accountId: string | null = null

test.describe('Validation of create, update and delete opertaion signature in email application', () => {
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
        await closeTimerPopUp(page)
        await page.waitForLoadState('networkidle')

        //Navigateion to Email Application
        await emailPage.navigateToEmail()
        accountId = await FetchRemoteData.fetchAccountId(page)
        await console.log(await page.title())
        await page.waitForTimeout(2000)
      }
    )
  })

  test('create a new signature', async ({ page }) => {
    emailPage = new EmailPage(page)
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Verifying the Email Signature Creation functionality, ensuring that users can create a new signature successfully. This test checks the visibility and interactivity of the signature input field, formatting options, save button, and confirmation message upon successful creation.'
    )
    const random_text = generateRandomFileName()
    const new_text = generateRandomFileName()
    emailPage.dynamicXPath = random_text
    await console.log(await page.title())
    await Allure.step('Step 1: Verify and Click on Settings', async () => {
      await emailPage.verifySettingButton()
      await emailPage.clickOnSettings()
    })

    await Allure.step(
      'Step 2: Verify and Navigate to Compose and Reply',
      async () => {
        await emailPage.verifyComposeAndReply()
        await emailPage.navigateToComposeAndReply()
      }
    )

    await Allure.step('Step 3: Verify and Click Manage Signature', async () => {
      await emailPage.verifyManageSignatureButton()
      await emailPage.clickOnManageSignature()
    })

    await Allure.step('Step 4: Verify and Click Add Signature', async () => {
      await emailPage.verifyAddSignatureButton()
      await emailPage.clickOnAddSignature()
    })

    await Allure.step('Step 5: Verify and Add Title to Signature', async () => {
      await emailPage.verifyTitleFieldOfSignature()
      await emailPage.addTitleToSignature(random_text)
    })
    await page.waitForTimeout(2000)

    await Allure.step('Step 6: Verify and Add Body to Signature', async () => {
      await emailPage.verifyBodyFieldOfSignature()
      await emailPage.addBodyToSignature(random_text)
    })
    await page.waitForTimeout(4000)

    await Allure.step('Step 7: Verify and Save the Signature', async () => {
      await emailPage.verifySaveButtonOfSignature()
      await emailPage.saveTheSignature()
    })

    const signatureStatus = await FetchRemoteData.fetchSignatureSettings(
      page,
      accountId
    )
    await page.waitForTimeout(2000)
    await page.waitForLoadState('networkidle')

    await Allure.step('Step 8: Verify Email Forward Status', async () => {
      if (signatureStatus === 200) {
        console.log('Signature has been created sucessfully')
        await Allure.addAttachment(
          'Signature Create Status',
          `Signature has been created sucessfully. Status is : ${signatureStatus}.`
        )
      } else {
        const errorMessage = `Signature has been not created. API returned status: ${signatureStatus}.`
        console.log(errorMessage)
        await Allure.addAttachment(
          'Signature Create Status',
          `Signature has been not created. API returned status: ${signatureStatus}.`
        )
      }
    })
  })

  test('update a signature', async ({ page }) => {
    emailPage = new EmailPage(page)
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Ensuring that users can successfully update an existing email signature. This test verifies the ability to modify the signature text, apply formatting changes, save the updates, and confirm that the changes reflect correctly in the email signature settings.'
    )
    const random_text = generateRandomFileName()
    const new_text = generateRandomFileName()
    emailPage.dynamicXPath = random_text
    await console.log(await page.title())
    await Allure.step('Step 1: Verify and Click on Settings', async () => {
      await emailPage.verifySettingButton()
      await emailPage.clickOnSettings()
    })

    await Allure.step(
      'Step 2: Verify and Navigate to Compose and Reply',
      async () => {
        await emailPage.verifyComposeAndReply()
        await emailPage.navigateToComposeAndReply()
      }
    )

    await Allure.step('Step 3: Verify and Click Manage Signature', async () => {
      await emailPage.verifyManageSignatureButton()
      await emailPage.clickOnManageSignature()
    })

    await Allure.step('Step 4: Verify and Click Add Signature', async () => {
      await emailPage.verifyAddSignatureButton()
      await emailPage.clickOnAddSignature()
    })

    await Allure.step('Step 5: Verify and Add Title to Signature', async () => {
      await emailPage.verifyTitleFieldOfSignature()
      await emailPage.addTitleToSignature(random_text)
    })
    await page.waitForTimeout(2000)

    await Allure.step('Step 6: Verify and Add Body to Signature', async () => {
      await emailPage.verifyBodyFieldOfSignature()
      await emailPage.addBodyToSignature(random_text)
    })
    await page.waitForTimeout(4000)

    await Allure.step('Step 7: Verify and Save the Signature', async () => {
      await emailPage.verifySaveButtonOfSignature()
      await emailPage.saveTheSignature()
    })
    const signatureStatus = await FetchRemoteData.fetchSignatureSettings(
      page,
      accountId
    )
    await page.waitForTimeout(2000)
    await page.waitForLoadState('networkidle')
    await Allure.step('Step 8: Verify Signature has been created', async () => {
      if (signatureStatus === 200) {
        console.log('Signature has been created sucessfully')
        await Allure.addAttachment(
          'Signature Create Status',
          `Signature has been created sucessfully. Status is : ${signatureStatus}.`
        )
      } else {
        const errorMessage = `Signature has been not created. API returned status: ${signatureStatus}.`
        console.log(errorMessage)
        await Allure.addAttachment(
          'Signature Create Status',
          `Signature has been not created. API returned status: ${signatureStatus}.`
        )
      }
    })
    await Allure.step('Step 9: Verify and Edit the Signature', async () => {
      await emailPage.verifyEditSiganture()
      await emailPage.editTheSignature()
    })

    await Allure.step(
      'Step 10: Verify Newly added Signature Presence and Select It',
      async () => {
        await emailPage.verifyNewSignatureIsPresent()
        await emailPage.selectTheSignature()
      }
    )

    await Allure.step(
      'Step 11: Verify and Edit Title of the New Signature',
      async () => {
        await emailPage.verifyTitleFieldOfSignature()
        await emailPage.addTitleToSignature(new_text)
      }
    )
    await page.waitForTimeout(2000)

    await Allure.step(
      'Step 12: Verify and Edit Body of the New Signature',
      async () => {
        await emailPage.verifyBodyFieldOfSignature()
        await emailPage.addBodyToSignature(new_text)
      }
    )
    await page.waitForTimeout(4000)

    await Allure.step(
      'Step 13: Verify and Save the Edited Signature',
      async () => {
        await emailPage.verifySaveButtonOfSignature()
        await emailPage.saveTheSignature()
      }
    )

    const fetchupdatedSetting = await FetchRemoteData.fetchSignatureSettings(
      page,
      accountId
    )
    await page.waitForTimeout(2000)
    await page.waitForLoadState('networkidle')

    await Allure.step(
      'Step 14: Verify Signature has been updated',
      async () => {
        if (fetchupdatedSetting === 200) {
          console.log('Signature has been updated sucessfully')
          await Allure.addAttachment(
            'Signature Create Status',
            `Signature has been updated sucessfully. Status is : ${fetchupdatedSetting}.`
          )
        } else {
          const errorMessage = `Signature has been not updated. API returned status: ${fetchupdatedSetting}.`
          console.log(errorMessage)
          await Allure.addAttachment(
            'Signature Create Status',
            `Signature has been not updated. API returned status: ${fetchupdatedSetting}.`
          )
        }
      }
    )
  })

  test('delete a signature', async ({ page }) => {
    emailPage = new EmailPage(page)
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Verifying the Email Signature Deletion functionality, ensuring that users can remove an existing signature successfully. This test checks for the delete button’s visibility, confirmation prompt, and validation message confirming the signature removal.'
    )

    const random_text = generateRandomFileName()
    const new_text = generateRandomFileName()
    emailPage.dynamicXPath = random_text
    await console.log(await page.title())
    await Allure.step('Step 1: Verify and Click on Settings', async () => {
      await emailPage.verifySettingButton()
      await emailPage.clickOnSettings()
    })

    await Allure.step(
      'Step 2: Verify and Navigate to Compose and Reply',
      async () => {
        await emailPage.verifyComposeAndReply()
        await emailPage.navigateToComposeAndReply()
      }
    )

    await Allure.step('Step 3: Verify and Click Manage Signature', async () => {
      await emailPage.verifyManageSignatureButton()
      await emailPage.clickOnManageSignature()
    })

    await Allure.step('Step 4: Verify and Click Add Signature', async () => {
      await emailPage.verifyAddSignatureButton()
      await emailPage.clickOnAddSignature()
    })

    await Allure.step('Step 5: Verify and Add Title to Signature', async () => {
      await emailPage.verifyTitleFieldOfSignature()
      await emailPage.addTitleToSignature(random_text)
    })
    await page.waitForTimeout(2000)

    await Allure.step('Step 6: Verify and Add Body to Signature', async () => {
      await emailPage.verifyBodyFieldOfSignature()
      await emailPage.addBodyToSignature(random_text)
    })
    await page.waitForTimeout(4000)

    await Allure.step('Step 7: Verify and Save the Signature', async () => {
      await emailPage.verifySaveButtonOfSignature()
      await emailPage.saveTheSignature()
    })

    const signatureStatus = await FetchRemoteData.fetchSignatureSettings(
      page,
      accountId
    )
    await page.waitForTimeout(2000)
    await page.waitForLoadState('networkidle')

    await Allure.step('Step 8: Verify Email Forward Status', async () => {
      if (signatureStatus === 200) {
        console.log('Signature has been created sucessfully')
        await Allure.addAttachment(
          'Signature Create Status',
          `Signature has been created sucessfully. Status is : ${signatureStatus}.`
        )
      } else {
        const errorMessage = `Signature has been not created. API returned status: ${signatureStatus}.`
        console.log(errorMessage)
        await Allure.addAttachment(
          'Signature Create Status',
          `Signature has been not created. API returned status: ${signatureStatus}.`
        )
      }
    })
    await Allure.step('Step 9: Verify and Delete the Signature', async () => {
      await emailPage.verifyDeleteSignature()
      await emailPage.deleteTheSignature()
    })

    await Allure.step('Step 10: Verify and Confirm Deletion', async () => {
      await emailPage.verifyConfirmPopup()
      await emailPage.clickOnConfirm()
    })

    const fetchdeletedSettingStatus =
      await FetchRemoteData.fetchSignatureSettings(page, accountId)
    await page.waitForTimeout(2000)
    await page.waitForLoadState('networkidle')

    await Allure.step(
      'Step 11: Verify Signature has been deleted',
      async () => {
        if (fetchdeletedSettingStatus === 200) {
          console.log('Signature has been deleted sucessfully')
          await Allure.addAttachment(
            'Signature Delete Status',
            `Signature has been deleted sucessfully. Status is : ${fetchdeletedSettingStatus}.`
          )
        } else {
          const errorMessage = `Signature was not deleted. API returned status: ${fetchdeletedSettingStatus}.`
          console.log(errorMessage)
          await Allure.addAttachment(
            'Signature Delete Status',
            `Signature was not deleted. API returned status: ${fetchdeletedSettingStatus}.`
          )
        }
      }
    )
  })
})
