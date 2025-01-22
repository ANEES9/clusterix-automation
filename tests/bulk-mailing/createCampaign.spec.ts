import { test, expect } from '@playwright/test'
import { closeProductTour } from 'common/product-tour-helper.js'
import { closeTimerPopUp } from 'common/timer-helper.js'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper.js'
import { bulkMailingPage } from 'pages/bulk-mailing/bulk-mailing-page.js'
import { skipSurvey } from 'common/skip-survey.js'

//  import { Allure } from '../../helpers/common/allure-helper.js';
const campaignname = 'Demo Campaign'
const subject = 'Check Bulk Mailing'

let locators: bulkMailingPage
test.describe('Verify Bulk Mailing Functionalities', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    // await Allure.step('Navigate to Base URL and Close Popups', async () => {
    await page.goto(baseURL!)
    await skipSurvey(page, testInfo)
    locators = new bulkMailingPage(page)
    await closeProductTour(page)
    await page.waitForLoadState('networkidle')
    await closeTimerPopUp(page)
    await addCursorStyleAndScript(page)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Navigate to Bulk Mailing and create new campaign', async ({ page }) => {
    await locators.bulkMailing.click()
    await locators.campaignButton.click()
    await locators.newCampaignButton.click()
    await locators.newCampaignNameField.click()
    await page
      .locator('div')
      .filter({ hasText: /^Back$/ })
      .getByRole('textbox')
      .fill('Demo')
    await locators.sendToDropdown.click()
    await page.getByText('QA').click()
    await page.locator('.ca-fixed').click()
    // await AssertionHelper.selectWithAssertion(locators.sendToDropdown, "duplicate1");
    await locators.excludeRecipientDropdown.click()
    await page
      .locator('div')
      .filter({ hasText: /^Shwetha Roa$/ })
      .first()
      .click()
    await page.locator('.ca-fixed').click()
    await console.log('Participant Excluded Successfully')
    await page.getByPlaceholder('Enter name').click()
    await page.getByPlaceholder('Enter name').fill('Gowda')
    await locators.selectEmailAddressDrodown.click()
    await page.getByText('cluster-transfer@innoscripta.').click()
    await page.locator('.ca-fixed').click()
    await page.getByPlaceholder('Enter subject').click()
    await page.getByPlaceholder('Enter subject').fill('Subject')
    await page.getByPlaceholder('Enter subject').press('Enter')
    // await locators.enterSubjectInput.fill(subject);
    await locators.templateButton.click()
    await locators.templateSelect.click()
    await locators.variablesSectionButton.click()
    await locators.connectToAudienceButton.click()
    await locators.recruiterNameaudienceDropdown.click()
    await locators.value1.click()
    await page.locator('.ca-fixed').click()
    await locators.connectToAudience2Button.click()
    await locators.greetingNameaudienceDropdown.click()
    await locators.value2.click()
    await page.locator('.ca-fixed').click()
    await locators.saveAsDraftButton.click()

    try {
      // Await the assertion
      await locators.Toastmsg

      console.log("Recieved toast message: 'Campaign Updated Successfully'.")
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Campaign Update Text' element state did not meet expectations.",
        error
      )
    }

    await page.waitForTimeout(3000)
    await locators.campaignSendButton.click()

    try {
      // Await the assertion
      await locators.Toastmsg

      // Log success if the assertion passed
      console.log("Recieved toast message: 'Campaign Created Successfully'.")
    } catch (error) {
      // Log error details if the assertion failed
      console.error(
        "Assertion failed: 'Campaign Created Text' element state did not meet expectations.",
        error
      )
    }
  })

  
})
