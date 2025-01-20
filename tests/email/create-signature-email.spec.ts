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
import { generateRandomFileName } from 'common/randomDataGenerator'
import { getEnvBasedUrl } from 'common/get-api-url'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })
const currentDate = new Date()

let fetchIdProd: string, fetchIdTest: string

test.describe('Send Test Email', () => {
  test.beforeEach(async ({ page, baseURL },testInfo) => {
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
        await locators.navigatetoemail()
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
        fetchIdProd = `https://email-controller.innoscripta.com/api/account-data/${id}/settings`
        fetchIdTest = `https://email-controller-testing.innoscripta.com/api/account-data/${id}/settings`
        await page.waitForTimeout(2000)
      }
    )
  })

  test('Send email', async ({ page }) => {
    const locators = new EmailPage(page)
    const random_text = generateRandomFileName()
    await console.log(await page.title())
    await locators.clickonsettings()
    await locators.navigatetocomposeandreply()
    await locators.clickonmanagesignature()
    await locators.clickonaddsignature()
    await locators.addtitosignature(random_text)
    await page.waitForTimeout(2000)
    await locators.addbodytosignature(random_text)
    await page.waitForTimeout(5000)
    await locators.savethesignature()
    const fetchSetting = await ApiResponse(page, fetchIdProd, fetchIdTest)

    await page.waitForTimeout(4000)
    await page.waitForLoadState('networkidle')
    const { status: fetchSettingStatus, data: fetchSettingData } =
      fetchSetting()
    console.log(fetchSettingStatus)
    if (fetchSettingStatus === 200) {
      console.log('Signature has been created sucessfully')
    } else {
      console.log(`Signature has been not created : ${fetchSettingStatus}.`)
    }
  })
})
