import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import * as dotenv from 'dotenv'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { EmailPage } from 'pages/email'
import { getEnvBasedUrl } from 'common/get-api-url'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })
const currentDate = new Date()

let fetchRemoteIdProd: string, fetchRemoteIdTest: string

test.describe('switch between email', () => {
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
        await page.waitForTimeout(4400)
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
        const url = getEnvBasedUrl(fetchRemoteIdProd, fetchRemoteIdTest)
        console.log(`API URL Before Switiching: ${url}`)
        await page.waitForTimeout(2000)
      }
    )
  })

  test('switch between email', async ({ page }) => {
    const locators = new EmailPage(page)
    locators.switchBetweenEmailLocator = 'raos@innoscripta.com'
    await page.waitForTimeout(2000)
    await locators.clickOnEmailNameDropdown()
    await locators.clickOnSwitchBetweenEmail()

    const fetchAccIdProd =
      'https://email-controller.innoscripta.com/api/account'
    const fetchAccIdTest =
      'https://email-controller-testing.innoscripta.com/api/account'

    await page.waitForLoadState('networkidle')
    const fetchAccId = await ApiResponse(page, fetchAccIdProd, fetchAccIdTest)
    await console.log(await page.title())
    let matchingItem: any,
      id: string | null = null

    const { status: fetchAccStatus, data: fetchAccData } = await fetchAccId()
    await page.waitForTimeout(3000)
    if (fetchAccData) {
      matchingItem = fetchAccData?.find(
        (item: any) => item.ee_email === 'raos@innoscripta.com'
      )
      if (matchingItem) {
        id = matchingItem.id
        console.log('Matched ID:', id)
      } else {
        console.log(
          `No matching item found for ee_email = "raos@innoscripta.com".`
        )
      }
    } else {
      console.log('No data received.')
    }

    // Construct URLs after processing the ID
    const fetchRemoteIdProdafterSwitch = `https://email-controller.innoscripta.com/api/account-data/${id}/email/drafts`
    const fetchRemoteIdTestafterSwitch = `https://email-controller-testing.innoscripta.com/api/account-data/${id}/email/drafts`
    const url = getEnvBasedUrl(
      fetchRemoteIdProdafterSwitch,
      fetchRemoteIdTestafterSwitch
    )
    console.log(`API URL After Switiching: ${url}`)

    //Switching back to orginal mail ID starts here.
    locators.switchBackToEmailLocator = 'bhat@innoscripta.com'
    await page.waitForTimeout(2000)
    await locators.clickOnEmailNameDropdown()
    await locators.clickOnSwitchBackToEmail()
    await page.waitForLoadState('networkidle')
    await console.log(await page.title())
    console.log('Switched back to original email ID')
    const urlAfterSwitchBack = getEnvBasedUrl(
      fetchRemoteIdProd,
      fetchRemoteIdTest
    )
    console.log(`API URL after switched to organial: ${urlAfterSwitchBack}`)
  })
})
