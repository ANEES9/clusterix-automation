import { test, expect } from '@playwright/test'
import { AllureHelper } from '../../../helpers/allure-helper'
import { AccountsPage } from '../../../pages/settings/user-and-permissions/accounts-page'
import { closeWelcomePopUp } from '../../../helpers/common/welcome-popup-helper'
import { closeTimerPopUp } from '../../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../../helpers/common/cursor-helper'

test.describe('User and Permissions > Accounts Tests', () => {
  let accountsPage: AccountsPage

  test.beforeEach(async ({ page, baseURL }) => {
    // Setup steps
    AllureHelper.addEpic('User and Permissions')
    AllureHelper.addFeature('Accounts Management')
    // Add QA Owners dynamically based on app
    AllureHelper.addAppOwner('Settings')

    accountsPage = new AccountsPage(page)
    await AllureHelper.step('Navigate to Accounts page', async () => {
      await accountsPage.goto(baseURL)
    })

    await AllureHelper.step('Close welcome popup', async () => {
      await closeWelcomePopUp(page)
    })

    await AllureHelper.step('Close timer popup', async () => {
      await closeTimerPopUp(page)
    })

    await AllureHelper.step('Add cursor style and script', async () => {
      await addCursorStyleAndScript(page)
    })

    await AllureHelper.step('Wait for network idle', async () => {
      await page.waitForLoadState('networkidle')
    })
  })

  test('Accounts - Check Search Input With User Name', async () => {
    AllureHelper.addDescription('Verifies search functionality using username.')
    AllureHelper.addTag('search')

    await accountsPage.navigateToAccounts()

    const userName = (await accountsPage.getFirstUserDetails()).name
    AllureHelper.step('Search user by name', async () => {
      await accountsPage.search(userName)
    })

    const searchResult = (await accountsPage.getFirstUserDetails()).name
    expect(searchResult).toBe(userName)
  })

  test('Accounts - Check Role Filter Dropdown', async () => {
    AllureHelper.addDescription(
      'Validates filtering by user roles using dropdown.'
    )
    AllureHelper.addTag('filter')

    await accountsPage.navigateToAccounts()
    const { name: userName, roles } = await accountsPage.getFirstUserDetails()
    for (const role of roles) {
      await AllureHelper.step(`Filter users by role: ${role}`, async () => {
        await accountsPage.filterByRole(role)
      })
      const filteredUserName = await accountsPage.getFilteredUserName()
      expect(filteredUserName).toBe(userName)
    }
  })
})
