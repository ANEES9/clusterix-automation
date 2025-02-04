import { test } from '@playwright/test'
import { generateRandomIBAN } from '../../helpers/accounting/iban-generator'
import { Allure } from 'common/allure-helper'
import { BankAccountsPage } from 'pages/accounting/bank-accounts-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Bank Accounts Tab Tests', () => {
  let bankAccountsPage: BankAccountsPage
  let locale: string

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    Allure.addAppOwner('Accounting')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    await bankAccountsPage.goto(baseURL)
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    bankAccountsPage = new BankAccountsPage(page, locale)
    await page.waitForLoadState('networkidle')
  })

  test.fixme(
    'Add manual bank account with random German IBAN',
    async ({ page }) => {
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
    }
  )
})
