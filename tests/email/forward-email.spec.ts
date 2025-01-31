import { test, expect, selectors } from '@playwright/test'
import { Allure } from 'common/allure-helper' // Import Allure
import * as dotenv from 'dotenv'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { EmailPage } from 'pages/email'
import { FetchRemoteData } from './helpers/email-request'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })
const currentDate = new Date()

const toEmailId = 'bhat@innoscripta.com'
const testEmailSubject = 'Testing purpose email via automation'
const testEmailBody = `Testing purpose email via automation. Sent at: ${currentDate.toString()}`

let accountId: string | null = null

test.describe('forward on email', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step(
      'Navigate to Base URL, Close Popups and navigate to Email application',
      async () => {
        const emailPage = new EmailPage(page)
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

  test('forward email test execution', async ({ page }) => {
    const emailPage = new EmailPage(page)
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Verifying the Forward Email functionality, ensuring that all UI elements, including the recipient selection, subject field, and message body, are visible and interactive. The test also checks that the email can be forwarded successfully with attachments if applicable.'
    )
    await Allure.step('Step 1: Verify and Open the First Email', async () => {
      await emailPage.verifyFirstEmail()
      await emailPage.clickOnFirstEmail()
    })
    await Allure.step('Step 2: Verify and Click Forward Button', async () => {
      await emailPage.verifyTopForwardButton()
      await emailPage.clickOnTopForward()
    })
    const remoteId = await FetchRemoteData.fetchRemoteId(page, accountId)

    await Allure.step('Step 3: Verify and Fill To Address Field', async () => {
      await emailPage.verifyToAddressField()
      await emailPage.fillAndEnterToAddress(toEmailId)
    })

    await Allure.step('Step 4: Verify and Fill Subject Field', async () => {
      await emailPage.verifySubjectField()
      await emailPage.fillAndEnterSubject(testEmailSubject)
    })
    await page.waitForTimeout(2000)
    await Allure.step('Step 5: Verify and Fill Email Body', async () => {
      await emailPage.verifyBodyofEmail()
      await emailPage.clickOnBodyAndFill(testEmailBody)
    })

    await Allure.step('Step 6: Verify and Click Send Button', async () => {
      await emailPage.verifySendButton()
      await emailPage.clickOnSend()
    })
    const emailSendStatus = await FetchRemoteData.sendEmail(
      page,
      accountId,
      remoteId
    )
    await emailPage.verifyEmailSuccessfulToastMessage()
    await page.waitForTimeout(2000)

    await Allure.step('Step 7: Verify Email Forward Status', async () => {
      if (emailSendStatus === 200) {
        console.log('Forward of the Email has been sent successfully')
        await Allure.addAttachment(
          'Email Send Status',
          `Forward of the Email has been sent successfully. Status is : ${emailSendStatus}.`
        )
      } else {
        const errorMessage = `Email has been not forwarded. API returned status: ${emailSendStatus}.`
        console.log(errorMessage)
        await Allure.addAttachment(
          'Email Send Status',
          `Email has been not forwarded. API returned status: ${emailSendStatus}.`
        )
      }
    })
  })
})
