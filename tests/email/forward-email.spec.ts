import { test, expect, selectors } from '@playwright/test'
import { Allure } from 'common/allure-helper' // Import Allure
import { time } from 'console'
import { ApiResponse } from 'common/api-response'
import * as dotenv from 'dotenv'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurvey } from 'common/skip-survey'
import { closeProductTour } from 'common/product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { EmailPage } from 'pages/email'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })
const currentDate = new Date()

const toEmailId = 'bhat@innoscripta.com'
const testEmailSubject = 'Testing purpose email via automation'
const testEmailBody = `Testing purpose email via automation. Sent at: ${currentDate.toString()}`

let fetchRemoteIdProd: string, fetchRemoteIdTest: string

test.describe('forward on email', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step(
      'Navigate to Base URL, Close Popups and navigate to Email application',
      async () => {
        const locators = new EmailPage(page)

        await page.goto(baseURL!)
        await addCursorStyleAndScript(page)
        await skipSurvey(page, testInfo)
        await closeProductTour(page)
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
        await page.waitForTimeout(5000)
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
        fetchRemoteIdProd = `https://email-controller.innoscripta.com/api/account-data/${id}/email/drafts`
        fetchRemoteIdTest = `https://email-controller-testing.innoscripta.com/api/account-data/${id}/email/drafts`
        await page.waitForTimeout(2000)
      }
    )
  })

  test('forward email test execution', async ({ page }) => {
    const locators = new EmailPage(page)
    await locators.clickOnFirstEmail()
    await locators.clickOnForward()
    const fetchRemoteId = await ApiResponse(
      page,
      fetchRemoteIdProd,
      fetchRemoteIdTest
    )
    await locators.fillAndEnterToAddress(toEmailId)
    await locators.fillAndEnterSubject(testEmailSubject)
    await page.waitForTimeout(2000)
    await locators.clickOnBodyAndFill(testEmailBody)
    const { status: fetchRemoteStatus, data: fetchRemoteData } = fetchRemoteId()
    const sendURLProd =
      fetchRemoteIdProd + '/' + fetchRemoteData.remote_id + '/submit'
    const sendURLtest =
      fetchRemoteIdTest + '/' + fetchRemoteData.remote_id + '/submit'

    await locators.clickOnSend()
    const sendURL = await ApiResponse(page, sendURLProd, sendURLtest)
    await locators.verifyEmailSuccessfulToastMessage()
    await page.waitForTimeout(2000)

    const { status: sendURLStatus, data: sendURLData } = sendURL()
    if (sendURLStatus === 200) {
      console.log('Forward of the Email has been sent successfully')
    } else {
      console.log(
        `Email has been not forwarded. API has returned status : ${sendURLStatus}.`
      )
    }
  })
})
