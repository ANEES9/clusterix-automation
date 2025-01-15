import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import * as dotenv from 'dotenv'
import { closeTimerPopUp } from 'common/timer-helper'
import { EmailPage } from 'pages/email'
import { closeProductTour } from 'common/product-tour-helper'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'production'}` })

const currentDate = new Date()
const toEmailId = 'bhat@innoscripta.com'
const testEmailSubject = 'Testing purpose email via automation'
const testEmailBody = `Testing purpose email via automation. Sent at: ${currentDate.toString()}`

test.describe('Send Test Email', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await closeProductTour(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test('Send email', async ({ page }) => {
    const locators = new EmailPage(page)

    // Define API URLs
    const fetchAccIdProd =
      'https://email-controller.innoscripta.com/api/account'
    const fetchAccIdTest =
      'https://email-controller-testing.innoscripta.com/api/account'

    // Fetch account ID
    const fetchAccId = await ApiResponse(page, fetchAccIdProd, fetchAccIdTest)
    const { data: fetchAccData } = fetchAccId()
    if (!fetchAccData) {
      console.error('No data received from account API.')
      return
    }

    const matchingItem = fetchAccData.find(
      (item: { ee_email: string; id: string }) =>
        item.ee_email === process.env.CLUSTERIX_EMAIL
    )
    if (!matchingItem) {
      console.error(
        `No matching item found for email: ${process.env.CLUSTERIX_EMAIL}`
      )
      return
    }
    const accountId = matchingItem.id
    console.log('Matched Account ID:', accountId)

    // Construct Drafts API URL
    const fetchRemoteIdProd = `https://email-controller.innoscripta.com/api/account-data/${accountId}/email/drafts`
    const fetchRemoteIdTest = `https://email-controller-testing.innoscripta.com/api/account-data/${accountId}/email/drafts`

    const fetchRemoteId = await ApiResponse(
      page,
      fetchRemoteIdProd,
      fetchRemoteIdTest
    )
    const { data: fetchRemoteData } = fetchRemoteId()
    if (!fetchRemoteData?.remote_id) {
      console.error('No remote_id received from drafts API.')
      return
    }

    // Fill email details
    await locators.navigateToEmail()
    await locators.clickOnEmail()
    await locators.fillAndEnterToAddress(toEmailId)
    await locators.fillAndEnterSubject(testEmailSubject)
    await locators.clickOnBodyAndFill(testEmailBody)

    // Construct Submit API URL
    const sendURLProd = `${fetchRemoteIdProd}/${fetchRemoteData.remote_id}/submit`
    const sendURLTest = `${fetchRemoteIdTest}/${fetchRemoteData.remote_id}/submit`

    const sendURL = await ApiResponse(page, sendURLProd, sendURLTest)
    const { status: sendURLStatus } = sendURL()

    if (sendURLStatus === 200) {
      console.log('Email sent successfully.')
    } else {
      console.error(
        `Failed to send email. API returned status: ${sendURLStatus}`
      )
    }

    // Verify successful toast message
    await locators.clickOnSend()
    await locators.verifyEmailSuccessfulToastMessage()
  })
})
