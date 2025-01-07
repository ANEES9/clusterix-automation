import { Page, Locator } from '@playwright/test'

export class AccountsPage {
  private page: Page
  private collapseButton: Locator
  private usersPermissionsButton: Locator
  private accountsButton: Locator
  private searchInput: Locator

  constructor(page: Page) {
    this.page = page
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
      'input[placeholder="Search person or email"]'
    )
  }

  async navigateToAccounts() {
    await this.collapseButton.click()
    await this.usersPermissionsButton.click()
    await this.accountsButton.click()
    await this.collapseButton.click()
    await this.page.waitForLoadState('networkidle')
  }

  async getFirstUserName(): Promise<string> {
    const userDiv = this.page.locator('div div.y98XZMsrV0BeV8r7YwnA')
    const userNameLocator = userDiv.locator('strong').nth(0)
    return (await userNameLocator.textContent())?.trim() || ''
  }

  async getFirstUserEmail(): Promise<string> {
    const emailLocator = this.page
      .locator('div.ICDtpnREcCsBMB_zoH3w span')
      .nth(0)
    return (await emailLocator.textContent())?.trim() || ''
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword)
  }

  async getFirstUserRoles() {
    const userDiv = this.page.locator('div div.y98XZMsrV0BeV8r7YwnA')
    const userNameLocator = userDiv.locator('strong').nth(0)
    const userName = (await userNameLocator.textContent())?.trim() || ''

    const roleDiv = this.page
      .locator('div.GNb15SjYFdtbvt5Ej2Mg.BaseCellWrapper-module_wrapper__XCaQu')
      .nth(0)
    const rolesLocator = roleDiv.locator('div.di3dCJGDLg2bRZkA7Vj6')
    const roles = await rolesLocator.allTextContents()

    return { userName, roles }
  }

  async filterByRole(role: string) {
    const dropdown = this.page.getByText('All Roles')
    await dropdown.click()
    const roleOption = this.page.getByText(role.trim(), { exact: true })
    await roleOption.click()
  }
}
