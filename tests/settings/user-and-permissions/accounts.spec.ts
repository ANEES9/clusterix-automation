import { test, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { AccountsPage } from 'pages/settings/user-and-permissions/accounts-page'
import { setupTestContext } from 'utils/test-context'

test.describe('User and Permissions > Accounts Tests', () => {
  let accountsPage: AccountsPage
  let locale: string

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    Allure.addAppOwner('Settings')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    accountsPage = new AccountsPage(page, locale)
    await accountsPage.goto(baseURL)
    await page.waitForLoadState('networkidle')
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
