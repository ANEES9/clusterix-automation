import { test } from '@playwright/test'
import { generateRandomIBAN } from 'common/accounting/iban-generator'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { skipTutorialHelper } from 'common/skip-tutorial-helper'
import { Allure } from 'common/allure-helper'
import { BankAccountsPage } from 'pages/accounting/bank-accounts-page'

test.describe('Bank Accounts Tab Tests', () => {
  let bankAccountsPage: BankAccountsPage

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const locale: string = testInfo.project.use?.locale ?? 'en'
    bankAccountsPage = new BankAccountsPage(page, locale)
    Allure.addAppOwner('Accounting')
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await bankAccountsPage.goto(baseURL)
      await page.waitForLoadState('networkidle')
      await skipSurveyHelper(page, testInfo)
      await skipProductTourHelper(page, testInfo)
      await skipTutorialHelper(page, testInfo)
      await closeTimerPopUp(page)
    })
  })

  test('Add manual bank account with random German IBAN', async ({ page }) => {
    let apiResponseStatus: number | null = null

    // Intercept the API request and capture the response status
    await page.route(
      'https://accounting-service-testing.innoscripta.com/api/v1/bank-accounts',
      async (route) => {
        route.continue()
        const response = await route.request().response()
        if (response) {
          apiResponseStatus = response.status()
          console.log('API Response Status:', apiResponseStatus)
        } else {
          console.log('No response received for the API call.')
        }
      }
    )
    // Generate a Random German IBAN
    const randomIBAN = generateRandomIBAN('DE', '10000000').toUpperCase()
    console.log(`Generated IBAN: ${randomIBAN}`)
    await bankAccountsPage.clickConnectBankButton()
    await bankAccountsPage.fillIBANField(randomIBAN)
    await bankAccountsPage.selectCurrency('Euro')
    await bankAccountsPage.fillBankAccountTitle('Title')
    await bankAccountsPage.clickOnManualTracking()
    await bankAccountsPage.clickOnAutomaticTracking()
    await bankAccountsPage.clickOnConnectAccountButton()

    // Wait to ensure response is captured
    await page.waitForTimeout(2000)

    // Validate API response
    if (apiResponseStatus === 503) {
      console.log('Error: API returned an unexpected status 503.')
    } else if (apiResponseStatus === 201) {
      console.log('Success: API returned status 201.')
    } else {
      console.log('Error: Unexpected API response status:', apiResponseStatus)
    }
  })
})
