import { test, expect, selectors } from '@playwright/test'
import { allure } from 'allure-playwright' // Import Allure
import { time } from 'console'
import { ApiResponse } from 'common/api-response'
import * as dotenv from 'dotenv'
import { closeWelcomePopUp } from 'common/welcome-popup-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { EmailPageLocators } from 'pages/email'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })
const currentDate = new Date();

const toEmailId = 'bhat@innoscripta.com'
const testEmailSubject = 'Testing purpose email via automation'
const testEmailBody = `Testing purpose email via automation. Sent at: ${currentDate.toString()}`

test.describe('Send Test Email', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await closeWelcomePopUp(page)
      await page.waitForTimeout(4000)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test('Send email', async ({ page }) => {
    const locators = new EmailPageLocators(page)
    const fetchAccIdProd =
      'https://email-controller.innoscripta.com/api/account'
    const fetchAccIdTest =
      'https://email-controller-testing.innoscripta.com/api/account'

    const fetchAccId = await ApiResponse(page, fetchAccIdProd, fetchAccIdTest)

    await page.waitForLoadState('networkidle')
    await locators.navigateToEmail()
    await test.setTimeout(60000)
    await console.log(await page.title())

    await locators.clickOnEmail()
    let matchingItem: any, id: string | null = null
    const {status:fetchAccStatus, data:fetchAccData} = await fetchAccId()
    if (fetchAccData) {
      matchingItem = fetchAccData?.find(
        (item: any) => item.ee_email === process.env.EMAIL
      )
      if (matchingItem) {
        id = matchingItem.id
        console.log('Matched ID:', id)
      } else {
        console.log(
          `No matching item found for ee_email = "${process.env.EMAIL}".`
        )
      }
    } else {
      console.log('No data received.')
    }

    // Construct URLs after processing the ID
    const fetchRemoteIdProd = `https://email-controller.innoscripta.com/api/account-data/${id}/email/drafts`
    const fetchRemoteIdTest = `https://email-controller-testing.innoscripta.com/api/account-data/${id}/email/drafts`

    const fetchRemoteId = await ApiResponse(page, fetchRemoteIdProd, fetchRemoteIdTest)

    await locators.fillAndEnterToAddress(toEmailId)
    await locators.fillAndEnterSubject(testEmailSubject)
    await page.waitForTimeout(2000)
    await locators.clickOnBodyAndFill(testEmailBody)

    const { status:fetchRemoteStatus, data:fetchRemoteData } = fetchRemoteId()
    const sendURLProd = fetchRemoteIdProd + '/' + fetchRemoteData.remote_id + '/submit'
    const sendURLtest = fetchRemoteIdTest + '/' + fetchRemoteData.remote_id + '/submit'
    //console.log(send_url_prod)

    const sendURL = await ApiResponse(page, sendURLProd, sendURLtest)

    await locators.clickOnSend()
    await locators.verifyEmailSuccessfulToastMessage()
    const {status:sendURLStatus, data:sendURLData} = sendURL()
    if (sendURLStatus === 200) {
      console.log('Email has been sent successfully')
    } else {
      console.log(
        `Email has been not sent. API has returned status : ${sendURLStatus}.`
      )
    }
  })
})