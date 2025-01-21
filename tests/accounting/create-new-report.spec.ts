import { test, expect } from '@playwright/test'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { Allure } from 'common/allure-helper'
import { skipTutorialHelper } from 'common/skip-tutorial-helper'

test.describe('Accounting Application Add manual tracking bank account Tests', () => {
  let locators: PageLocators

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    locators = new PageLocators(page)

    Allure.addFeature('Navigation')
    Allure.addAppOwner('ContainerApp')

    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      skipTutorialHelper(page, testInfo)
      await addCursorStyleAndScript(page)
      await skipSurveyHelper(page, testInfo)
      await skipProductTourHelper(page, testInfo)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  // Test case: Add Financial Report
  test('Add Financial report', async ({ page }) => {
    locators = new PageLocators(page)

    // Navigate to Accounting List and open the Reports section
    await locators.accountinglistbutton.click()
    await locators.reportssidebarbutton.click()

    // Create a new report and set a title
    await locators.createnewreportbutton.click()
    await locators.reporttitlebutton.click()
    await page.getByRole('strong').fill('Test 1')

    // Add a point to the report
    await locators.addpointbutton.click()

    // Add a column to the report
    console.log(
      'Checking visibility and interactability of Add Column button...'
    )
    if (await locators.addcolumnbutton.isVisible()) {
      console.log('Add Column button is visible. Clicking it...')
      await locators.addcolumnbutton.scrollIntoViewIfNeeded() // Ensure it's in view
      await locators.addcolumnbutton.click()
      console.log('Clicked Add Column button successfully.')
    } else {
      console.error('Add Column button is not visible or not found.')
      throw new Error('Failed to locate Add Column button.')
    }

    // Select a time period (Month: May)
    console.log('Opening the Months dropdown...')
    await locators.monthsbutton.click()
    console.log('Selecting May from the dropdown...')
    await locators.maybutton.click()
    console.log('Selected May from the dropdown.')

    // Fill descriptions dynamically for rows
    await locators.adddescriptionbutton.first().click()
    await locators.descriptionfield.fill('Desc 1')
    await locators.adddescriptionbutton.click()
    await locators.descriptionfield.fill('Desc 2')

    // Fill values dynamically for rows
    await locators.valuefield.first().click()
    await locators.valueinputfield.fill('100')
    await locators.valuefield.first().click()
    await locators.valueinputfield.fill('200')
    await locators.valuefield.nth(1).click()
    await locators.valueinputfield.fill('500')
    await locators.valuefield.nth(1).click()
    await locators.valueinputfield.fill('600')

    // Add a KPI to the report
    await locators.kpirow.click()
    await locators.addkpibutton.click()
    await locators.adddescriptionbutton.click()
    await locators.descriptionfield.fill('KPI Desc 1')

    // Fill KPI formulas
    await locators.valuefield.first().click()
    await locators.valueinputfield.fill('=A1*B1')
    await locators.valueinputfield.press('Enter')
    await locators.valuefield.first().click()
    await locators.valueinputfield.fill('=B2-A2')
    await locators.valueinputfield.press('Enter')

    // Assign a company and users
    await locators.companydropdown.click()
    await locators.selectcompanyplaceholder.click()
    await locators.companyoption.first().click()
    await locators.assignusersdiv
      .filter({ hasText: /^Assign users$/ })
      .locator('div')
      .nth(1)
      .click()
    await locators.useroption.filter({ hasText: 'Anton Pravdin IT' }).click()
    await locators.useroption.filter({ hasText: '111' }).first().click()
    await locators.finalassignusersbutton.click()

    // Save the report
    console.log('Attempting to save the report...')
    await locators.reportsavebutton.click()
    console.log('Save button clicked.')

    // Verify the success message
    const successMessage = locators.successtoast
    try {
      console.log('Waiting for success toast...')
      await expect(successMessage).toBeVisible({ timeout: 15000 })
      console.log('Success toast is visible: Report created successfully.')
    } catch (error) {
      // Log additional details if the toast is not visible
      if ((await successMessage.count()) === 0) {
        console.error('Success toast element is not present in the DOM.')
      } else {
        console.error('Success toast element exists but is not visible.')
      }
      throw error // Re-throw the error to fail the test
    }
  })
})
