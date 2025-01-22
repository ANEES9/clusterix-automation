import { test, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { AccountsPage } from 'pages/settings/user-and-permissions/accounts-page'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'

test.describe('User and Permissions > Accounts Tests', () => {
  let accountsPage: AccountsPage

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const locale: string = testInfo.project.use?.locale ?? 'en'
    Allure.addAppOwner('Settings')
    accountsPage = new AccountsPage(page, locale)
    await accountsPage.goto(baseURL)
    await skipSurveyHelper(page, testInfo)
    await skipProductTourHelper(page, testInfo)
    await closeTimerPopUp(page)
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
