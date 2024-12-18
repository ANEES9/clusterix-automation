import { test, expect } from '@playwright/test'
import { closeWelcomePopUp } from '../../../helpers/welcome-popup-helper'
import { closeTimerPopUp } from '../../../helpers/timer-helper'
import { addCursorStyleAndScript } from '../../../helpers/cursor-helper'

test.describe('User and Permissions > Accounts Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/settings/users-and-permissions`)
    await closeWelcomePopUp(page)
    await closeTimerPopUp(page)
    await addCursorStyleAndScript(page)
    await page.waitForLoadState('networkidle')
  })

  //Test mo:
  test('Accounts - Check Search Input With User Name', async ({ page }) => {
    // Step 1: Navigate to the User Permissions > Accounts
    const collapseButton = page.locator('button._collapseButton_1clxr_519')
    await expect(collapseButton).toBeVisible()
    await collapseButton.click()
    const usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    await expect(usersPermissionsButton).toBeVisible()
    await usersPermissionsButton.click()
    const accountsButton = page.getByRole('button', {
      name: 'Accounts',
      exact: true,
    })
    await expect(accountsButton).toBeVisible()
    await accountsButton.click()
    await collapseButton.click()
    await page.waitForLoadState('networkidle')
    // Step 2: Fill in the First Name with first user data
    const userDiv = page.locator('div div.y98XZMsrV0BeV8r7YwnA')
    const userNameLocator = userDiv.locator('strong').nth(0)
    const userName = (await userNameLocator.textContent())?.trim()
    console.log('Search Result:', userName)
    const searchInput = page.locator(
      'input[placeholder="Search person or email"]'
    )
    await expect(searchInput).toBeVisible()
    await searchInput.fill(userName || '')
    // Step 3: Check the search result
    const firstSearchResult = userDiv.locator('strong').nth(0)
    await expect(firstSearchResult).toBeVisible()
    const searchResultText = (await firstSearchResult.textContent())?.trim()
    console.log('Search Result:', searchResultText)
    expect(searchResultText).toBe(userName)
  })

  test('Accounts - Check Search Input With Email', async ({ page }) => {
    // Step 1: Navigate to the User Permissions > Accounts
    const collapseButton = page.locator('button._collapseButton_1clxr_519')
    await expect(collapseButton).toBeVisible()
    await collapseButton.click()
    const usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    await expect(usersPermissionsButton).toBeVisible()
    await usersPermissionsButton.click()
    const accountsButton = page.getByRole('button', {
      name: 'Accounts',
      exact: true,
    })
    await expect(accountsButton).toBeVisible()
    await accountsButton.click()
    await collapseButton.click()
    await page.waitForLoadState('networkidle')

    // Step 2: Fill in the Email field with first user data
    const emailLocator = page.locator('div.ICDtpnREcCsBMB_zoH3w span').nth(0)
    const email = (await emailLocator.textContent())?.trim()
    console.log('Email for Search:', email)
    const searchInput = page.locator(
      'input[placeholder="Search person or email"]'
    )
    await expect(searchInput).toBeVisible()
    await searchInput.fill(email || '')

    // Step 3: Verify search result
    const firstSearchResult = page
      .locator('div.ICDtpnREcCsBMB_zoH3w span')
      .nth(0)
    await expect(firstSearchResult).toBeVisible()
    const searchResultEmail = (await firstSearchResult.textContent())?.trim()
    console.log('Search Result Email:', searchResultEmail)
    expect(searchResultEmail).toBe(email)
  })

  test('Accounts - Check Role Filter Dropdown', async ({ page }) => {
    // Step 1: Navigate to the User Permissions > Accounts
    const collapseButton = page.locator('button._collapseButton_1clxr_519')
    await expect(collapseButton).toBeVisible()
    await collapseButton.click()
    const usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    await expect(usersPermissionsButton).toBeVisible()
    await usersPermissionsButton.click()
    const accountsButton = page.getByRole('button', {
      name: 'Accounts',
      exact: true,
    })
    await expect(accountsButton).toBeVisible()
    await accountsButton.click()
    await collapseButton.click()
    await page.waitForLoadState('networkidle')
    //Step 2: Get roles of the first user
    const userDiv = page.locator('div div.y98XZMsrV0BeV8r7YwnA')
    const userNameLocator = userDiv.locator('strong').nth(0)
    const userName = (await userNameLocator.textContent())?.trim()
    const roleDiv = page
      .locator('div.GNb15SjYFdtbvt5Ej2Mg.BaseCellWrapper-module_wrapper__XCaQu')
      .nth(0)
    const rolesLocator = roleDiv.locator('div.di3dCJGDLg2bRZkA7Vj6')
    const roles = await rolesLocator.allTextContents()
    console.log('Roles:', roles)
    // Step 3: Select roles from the dropdown and verify results
    for (const role of roles) {
      const dropdown = page.locator(
        'div.ca-text-grey-dark.ca-w-full.ca-text-left.ca-whitespace-nowrap.ca-text-ellipsis'
      )
      await dropdown.click()
      const roleOption = page.getByText(role.trim(), { exact: true })
      await expect(roleOption).toBeVisible()
      await roleOption.click()
      // Verify the filtered result
      const userDiv = page.locator('div div.y98XZMsrV0BeV8r7YwnA')
      const filteredUser = userDiv.locator('strong').nth(0) // First user after filtering
      const filteredUserName = (await filteredUser.textContent())?.trim()
      console.log(`Filtered User for Role "${role}":`, userName)
      // Ensure the filtered user matches the initial user
      expect(filteredUserName).toBe(userName)
    }
  })
})
