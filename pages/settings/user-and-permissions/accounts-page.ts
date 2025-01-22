import { Page, Locator } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'config/constants/app-urls'

export class AccountsPage {
  readonly page: Page
  private translations: Record<string, any>

  private collapseButton: Locator
  private usersPermissionsButton: Locator
  private accountsButton: Locator
  private searchInput: Locator
  private userDiv: Locator
  private userNameLocator: Locator
  private roleDiv: Locator
  private rolesLocator: Locator
  private roleDropdown: Locator
  private roleOption: (role: string) => Locator
  private filteredUserDiv: Locator
  private filteredUserNameLocator: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('settings', locale)

    this.collapseButton = page.locator('button._collapseButton_16zcl_522')
    this.usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    this.accountsButton = page.getByRole('button', {
      name: 'Accounts',
      exact: true,
    })
    this.searchInput = page.locator(
      `input[placeholder="${this.translations.accounts.filter1_placeholder}"]`
    )
    this.userDiv = page.locator('div div.y98XZMsrV0BeV8r7YwnA')
    this.userNameLocator = this.userDiv.locator('strong').nth(0)
    this.roleDiv = page
      .locator('div.GNb15SjYFdtbvt5Ej2Mg.BaseCellWrapper-module_wrapper__XCaQu')
      .nth(0)
    this.rolesLocator = this.roleDiv.locator('div.di3dCJGDLg2bRZkA7Vj6')
    this.roleDropdown = page.locator('div[data-element="dropdownList"]')
    this.filteredUserDiv = page.locator('div div.y98XZMsrV0BeV8r7YwnA')
    this.filteredUserNameLocator = this.filteredUserDiv.locator('strong').nth(0)

    this.roleOption = (role: string) =>
      this.roleDropdown.locator(
        'div.ca-font-sans.ca-text-sm.ca-tracking-wide.ca-cursor-pointer',
        { hasText: role }
      )
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Accounts URL', async () => {
      await this.page.goto(
        `${baseURL}${APP_URLS.settings.usersAndPermissions.accounts}`
      )
    })
  }

  async navigateToAccounts() {
    await Allure.step('Navigate to Accounts section', async () => {
      await this.collapseButton.click()
      await this.usersPermissionsButton.click()
      await this.accountsButton.click()
      await this.collapseButton.click()
      await this.page.waitForLoadState('networkidle')
    })
  }

  async getFirstUserDetails(): Promise<{ name: string; roles: string[] }> {
    const userName = (await this.userNameLocator.textContent())?.trim() || ''
    const roles = await this.rolesLocator.allTextContents()
    return { name: userName, roles }
  }

  async filterByRole(role: string) {
    await this.roleDropdown.scrollIntoViewIfNeeded()
    await this.roleDropdown.waitFor({ state: 'visible' })
    await this.roleDropdown.click()
    const roleOption = this.roleOption(role.trim())
    await roleOption.scrollIntoViewIfNeeded()
    await roleOption.waitFor({ state: 'visible' })
    await roleOption.click()
  }

  async getFilteredUserName(): Promise<string> {
    return (await this.filteredUserNameLocator.textContent())?.trim() || ''
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword)
    await this.page.waitForLoadState('networkidle')
  }
}
