import { test, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { AccountsPage } from '../../../pages/settings/user-and-permissions/accounts-page'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { closeProductTour } from 'common/product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'

test.describe('User and Permissions > Accounts Tests', () => {
  let accountsPage: AccountsPage

  test.beforeEach(async ({ page, baseURL }) => {
    // Setup steps
    Allure.addEpic('User and Permissions')
    Allure.addFeature('Accounts Management')
    // Add QA Owners dynamically based on app
    Allure.addAppOwner('Settings')

    accountsPage = new AccountsPage(page)
    await Allure.step('Navigate to Accounts page', async () => {
      await accountsPage.goto(baseURL)
    })

    await Allure.step('Skip survey', async () => {
      await skipSurveyHelper(page)
    })

    await Allure.step('Close welcome popup', async () => {
      await closeProductTour(page)
    })

    await Allure.step('Close timer popup', async () => {
      await closeTimerPopUp(page)
    })

    await Allure.step('Add cursor style and script', async () => {
      await addCursorStyleAndScript(page)
    })

    await Allure.step('Wait for network idle', async () => {
      await page.waitForLoadState('networkidle')
    })
  })

  test('Accounts - Check Search Input With User Name', async () => {
    Allure.addDescription('Verifies search functionality using username.')
    Allure.addTag('search')

    await accountsPage.navigateToAccounts()

    const userName = (await accountsPage.getFirstUserDetails()).name
    Allure.step('Search user by name', async () => {
      await accountsPage.search(userName)
    })

    const searchResult = (await accountsPage.getFirstUserDetails()).name
    expect(searchResult).toBe(userName)
  })

  test('Accounts - Check Role Filter Dropdown', async () => {
    Allure.addDescription('Validates filtering by user roles using dropdown.')
    Allure.addTag('filter')

    await accountsPage.navigateToAccounts()
    const { name: userName, roles } = await accountsPage.getFirstUserDetails()
    for (const role of roles) {
      await Allure.step(`Filter users by role: ${role}`, async () => {
        await accountsPage.filterByRole(role)
      })
      const filteredUserName = await accountsPage.getFilteredUserName()
      expect(filteredUserName).toBe(userName)
    }
  })
})
