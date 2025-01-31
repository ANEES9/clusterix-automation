import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
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

test.describe('send test email', () => {
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

  test('send email', async ({ page }) => {
    const emailPage = new EmailPage(page)
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Verifying the Send Email functionality, ensuring that all required UI elements are visible and interactive. This includes checking the email fields, recipient selection, subject input, message body, and the ability to send the email successfully.'
    )
    await Allure.step('Step 1: Verify and Click on New Mail', async () => {
      await emailPage.verifyNewEmail()
      await emailPage.clickOnNewEmail()
    })

    await Allure.step('Step 2: Verify and Fill To Address Field', async () => {
      await emailPage.verifyToAddressField()
      await emailPage.fillAndEnterToAddress(toEmailId)
    })
    const remoteId = await FetchRemoteData.fetchRemoteId(page, accountId)
    await Allure.step('Step 3: Verify and Fill Subject Field', async () => {
      await emailPage.verifySubjectField()
      await emailPage.fillAndEnterSubject(testEmailSubject)
    })

    await page.waitForTimeout(2000)
    await Allure.step('Step 4: Verify and Fill Email Body', async () => {
      await emailPage.verifyBodyofEmail()
      await emailPage.clickOnBodyAndFill(testEmailBody)
    })

    await Allure.step('Step 5: Verify and Click Send Button', async () => {
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
    await Allure.step('Step 6: Verify Email Send Status', async () => {
      if (emailSendStatus === 200) {
        console.log('Email has been sent successfully')
        await Allure.addAttachment(
          'Email Send Status',
          `Email has been sent successfully. Status is : ${emailSendStatus}.`
        )
      } else {
        const errorMessage = `Email has not been sent. API returned status: ${emailSendStatus}.`
        console.log(errorMessage)
        await Allure.addAttachment(
          'Email Send Status',
          `Email has not been sent. API returned status: ${emailSendStatus}.`
        )
      }
    })
  })
})
