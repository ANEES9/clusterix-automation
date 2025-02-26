import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { BrowserContext } from 'playwright'
import { getTranslations } from 'common/get-translations-helper'
import { APP_NAMES } from 'constants/app-names'

export class HomePage {
  private page: Page
  translations: Record<string, any>

  //Header Items
  public currentAppHeader: Locator
  public activeAppName: Locator

  private notificationsHeaderButton: Locator
  private calendarHeaderButton: Locator
  private timeTrackingHeaderButton: Locator
  private emailHeaderButton: Locator
  private liveChatHeaderButton: Locator
  private profileDropdownButton: Locator
  private profileDropdownMenu: Locator
  private dropdownUserNameElement: Locator
  private profileDropdownSearch: Locator
  private logOutButton: Locator

  //Sidebar Items
  private sidebarOpener: Locator
  private homeSidebarButton: Locator
  private filesSidebarButton: Locator
  private officeSidebarButton: Locator
  private pdfSidebarButton: Locator
  private hrSidebarButton: Locator
  private projectManagementSidebarButton: Locator
  private taskManagementSidebarButton: Locator
  private timeTrackingSideBarButton: Locator
  private accountingSidebarButton: Locator
  private subsidiesSidebarButton: Locator
  private bulkMailingSidebarButton: Locator
  private companySearcherSidebarButton: Locator
  private customersSidebarButton: Locator
  private externalFormsSidebarButton: Locator
  private byteBuilderSidebarButton: Locator
  private integrationSidebarButton: Locator
  private noCodeSidebarButton: Locator
  private templateManagerSidebarButton: Locator

  //Dashboard Items
  private filesDashboardElement: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('home', locale)
    //Header items
    this.currentAppHeader = page.locator(
      `//p[contains(text(), "${this.translations.navbar.hint}")]`
    )
    this.activeAppName = page.locator(
      `//p[contains(text(), "${this.translations.navbar.hint}")]/following-sibling::p`
    )
    this.notificationsHeaderButton = page.getByRole('button', {
      name: 'Notifications',
      exact: true,
    })
    this.calendarHeaderButton = page.getByRole('button', {
      name: 'Calendar',
      exact: true,
    })
    this.timeTrackingHeaderButton = page
      .getByRole('button', {
        name: 'Time Tracking',
        exact: true,
      })
      .first()
    this.emailHeaderButton = page.getByRole('button', {
      name: 'Email',
      exact: true,
    })
    this.liveChatHeaderButton = page.getByRole('button', {
      name: 'Live Chat',
      exact: true,
    })

    //Profile Items
    this.profileDropdownButton = page.locator(
      'button:has(div[style*="background-image"])'
    )
    this.profileDropdownMenu = page.getByText('Product TourSettings')
    this.dropdownUserNameElement = page.locator('#ca-portal-root')
    this.profileDropdownSearch = page.getByPlaceholder('Search')
    this.logOutButton = page.locator(
      `span:has-text("${this.translations.navbar.useMenu.logout}")`
    )

    //Sidebar items
    this.sidebarOpener = page.locator('button.container-app-sidebar-opener')
    this.homeSidebarButton = page.locator(
      `#container-app-sidebar button:has-text("${this.translations.sidebar.home}")`
    )
    this.filesSidebarButton = page.locator(
      'button[group="office-tools"]:has-text("Files")'
    )
    this.officeSidebarButton = page.locator(
      'button[group="office-tools"]:has-text("Office")'
    )
    this.pdfSidebarButton = page.locator(
      'button[group="office-tools"]:has-text("PDF")'
    )
    this.hrSidebarButton = page.locator(
      'button[group="workforce-management"]:has-text("HR")'
    )
    this.projectManagementSidebarButton = page.locator(
      'button[group="workforce-management"]:has-text("Project Management")'
    )
    this.taskManagementSidebarButton = page.locator(
      'button[group="workforce-management"]:has-text("Task Management")'
    )
    this.timeTrackingSideBarButton = page.locator(
      'button[group="workforce-management"]:has-text("Time Tracking")'
    )
    this.accountingSidebarButton = page.locator(
      'button[group="cash-management"]:has-text("Accounting")'
    )
    this.subsidiesSidebarButton = page.locator(
      'button[group="cash-management"]:has-text("Subsidies")'
    )
    this.bulkMailingSidebarButton = page.locator(
      'button[group="customer-management"]:has-text("Bulk Mailing")'
    )
    this.companySearcherSidebarButton = page.locator(
      'button[group="customer-management"]:has-text("Company Searcher")'
    )
    this.customersSidebarButton = page.locator(
      'button[group="customer-management"]:has-text("Customers")'
    )
    this.externalFormsSidebarButton = page.locator(
      'button[group="customer-management"]:has-text("External Forms")'
    )
    this.byteBuilderSidebarButton = page.locator(
      'button[group="configurator"]:has-text("Byte Builder")'
    )
    this.integrationSidebarButton = page.locator(
      'button[group="configurator"]:has-text("Integration")'
    )
    this.noCodeSidebarButton = page.locator(
      'button[group="configurator"]:has-text("No Code")'
    )
    this.templateManagerSidebarButton = page.locator(
      'button[group="configurator"]:has-text("Template Manager")'
    )

    //Dashboard Locators
    this.filesDashboardElement = page.locator("//div[text()='Files']")
  }

  async goto(baseURL: string | undefined) {
    await Allure.step(
      'Role question should be visible when user navigate to base url',
      async () => {
        await this.page.goto(`${baseURL}`)
      }
    )
  }

  async getActiveAppText(): Promise<string> {
    return (await this.currentAppHeader.textContent())?.trim() || ''
  }

  async validateNoAppSelected() {
    await Allure.step(
      'should show no app selected when user does not select app',
      async () => {
        const activeAppText = await this.activeAppName.textContent()
        const activeApp = activeAppText?.trim() || ''
        expect(activeApp).toBe(this.translations.navbar.appPlaceholder)
      }
    )
  }

  async validateCurrentApp(expectedAppName: string) {
    await Allure.step(
      `should validate the current app as "${expectedAppName}" when the app header is visible`,
      async () => {
        const activeAppText = await this.activeAppName.textContent()
        const activeApp = activeAppText?.trim() || ''
        expect(activeApp).toBe(expectedAppName)
      }
    )
  }

  // Actions for Header
  async openNotificationsPanel() {
    await Allure.step(
      'should open the notifications panel when the Notifications button is clicked',
      async () => {
        await this.notificationsHeaderButton.click()
      }
    )
  }
  async navigateToCalendarFromHeader() {
    await Allure.step(
      'should navigate to the calendar page when the Calendar button is clicked',
      async () => {
        await this.calendarHeaderButton.click()
      }
    )
  }
  async navigateToTimeTrackingFromHeader() {
    await Allure.step(
      'should navigate to the time tracking page when the Time Tracking button is clicked',
      async () => {
        await this.timeTrackingHeaderButton.click()
      }
    )
  }
  async navigateToEmailFromHeader() {
    await Allure.step(
      'should navigate to the email page when the Email button is clicked',
      async () => {
        await this.emailHeaderButton.click()
      }
    )
  }
  async openLiveChatAndValidate(context: BrowserContext, locale: string) {
    await Allure.step(
      'should open live chat in a new page and validate the app when the live chat button is clicked',
      async () => {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          this.liveChatHeaderButton.click(),
        ])
        await newPage.waitForLoadState()
        const liveChatContainer = new HomePage(newPage, locale)
        await liveChatContainer.validateCurrentApp(APP_NAMES.liveChat)
        await newPage.close()
      }
    )
  }

  //Actions for Profile Dropdown
  async openProfileDropdown() {
    await Allure.step(
      'should display the profile dropdown menu when the profile button is clicked',
      async () => {
        await this.profileDropdownButton.click({ force: true })
        await expect(this.profileDropdownMenu).toBeVisible()
      }
    )
  }
  async validateProfileDropdownUserName() {
    await Allure.step(
      'should validate the username in the profile dropdown when the profile button is clicked',
      async () => {
        const avatarName = await this.profileDropdownButton.textContent()
        const trimmedAvatarName = avatarName
          ?.trim()
          .split(/\s+/)
          .slice(0, 2)
          .join(' ')
        await this.profileDropdownButton.click()
        const dropdownUserName =
          await this.dropdownUserNameElement.textContent()
        const trimmedDropdownUserName = dropdownUserName
          ?.trim()
          .split(/\s+/)
          .slice(0, 2)
          .join(' ')
        expect(trimmedAvatarName).toEqual(trimmedDropdownUserName)
      }
    )
  }
  async selectCompanyFromDropdown() {
    await Allure.step(
      'should select a company from the profile dropdown when the profile button is clicked',
      async () => {
        await this.profileDropdownButton.click()
        const dropdownText = await this.profileDropdownButton.textContent()
        const lines = dropdownText
          ? dropdownText.split('\n').map((line) => line.trim())
          : []
        const ignoredKeywords = [
          'My Profile',
          'My Organization',
          'Logout',
          'Product Tour',
          'Deutsch',
          'English',
          'Settings',
        ]
        const companyName = lines.find(
          (line) => !ignoredKeywords.includes(line) && !line.includes('@')
        )
        if (!companyName) {
          throw new Error('Company name could not be found in the dropdown.')
        }

        const companyButton = this.page
          .getByRole('button', { name: companyName })
          .nth(1)
        await companyButton.click()

        await this.profileDropdownSearch.click()
        await this.profileDropdownSearch.fill(companyName)

        const searchResult = this.page
          .getByRole('button', { name: companyName })
          .nth(2)
        await searchResult.click()

        await this.page.waitForLoadState('networkidle')

        const updatedDropdownText =
          await this.profileDropdownButton.textContent()
        const updatedLines = updatedDropdownText
          ? updatedDropdownText.split('\n').map((line) => line.trim())
          : []
        const updatedCompanyName = updatedLines.find(
          (line) => !ignoredKeywords.includes(line) && !line.includes('@')
        )
        expect(updatedCompanyName).toEqual(companyName)
      }
    )
  }
  async logOutFromAccount() {
    await Allure.step(
      'should log out from account when the log out button clicked from user dropdown',
      async () => {
        await this.profileDropdownButton.click()
        await this.logOutButton.click()
      }
    )
  }

  // Actions for Sidebar
  async navigateToHomeFromSideBar() {
    await Allure.step(
      'should navigate to the home page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.homeSidebarButton.click()
      }
    )
  }
  async navigateToFilesFromSideBar() {
    await Allure.step(
      'should navigate to the files page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.filesSidebarButton.first().click()
      }
    )
  }
  async navigateToOfficeFromSideBar() {
    await Allure.step(
      'should navigate to the office page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.officeSidebarButton.click()
      }
    )
  }
  async navigateToPdfFromSideBar() {
    await Allure.step(
      'should navigate to the pdf page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.pdfSidebarButton.click()
      }
    )
  }
  async navigateToHrFromSideBar() {
    await Allure.step(
      'should navigate to the hr page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.hrSidebarButton.click()
      }
    )
  }
  async navigateToProjectManagementFromSideBar() {
    await Allure.step(
      'should navigate to the project management page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.projectManagementSidebarButton.click()
      }
    )
  }
  async navigateToTaskManagementFromSideBar() {
    await Allure.step(
      'should navigate to the task management page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.taskManagementSidebarButton.click()
      }
    )
  }
  async navigateToTimeTrackingFromSideBar() {
    await Allure.step(
      'should navigate to the time tracking page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.timeTrackingSideBarButton.click()
      }
    )
  }
  async navigateToAccountingFromSideBar() {
    await Allure.step(
      'should navigate to the accounting page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.accountingSidebarButton.click()
      }
    )
  }
  async navigateToSubsidiesFromSideBar() {
    await Allure.step(
      'should navigate to the subsidies page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.subsidiesSidebarButton.click()
      }
    )
  }
  async navigateToBulkMailingFromSideBar() {
    await Allure.step(
      'should navigate to the bulk mailing page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.bulkMailingSidebarButton.click()
      }
    )
  }
  async navigateToCompanySearcherFromSideBar() {
    await Allure.step(
      'should navigate to the company searcher page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.companySearcherSidebarButton.click()
      }
    )
  }
  async navigateToCustomersFromSideBar() {
    await Allure.step(
      'should navigate to the customers page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.customersSidebarButton.click()
      }
    )
  }
  async navigateToExternalFormsFromSideBar() {
    await Allure.step(
      'should navigate to the external forms page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.externalFormsSidebarButton.click()
      }
    )
  }
  async navigateToByteBuilderFromSideBar() {
    await Allure.step(
      'should navigate to the byte builder page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.byteBuilderSidebarButton.click()
      }
    )
  }
  async navigateToIntegrationFromSideBar() {
    await Allure.step(
      'should navigate to the integration page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.integrationSidebarButton.click()
      }
    )
  }
  async navigateToNoCodeFromSideBar() {
    await Allure.step(
      'should navigate to the no code page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.noCodeSidebarButton.click()
      }
    )
  }
  async navigateToTemplateManagerFromSideBar() {
    await Allure.step(
      'should navigate to the template manager page when the button is clicked from sidebar',
      async () => {
        await this.sidebarOpener.click()
        await this.templateManagerSidebarButton.click()
      }
    )
  }

  //Actions for Dashboard
}
