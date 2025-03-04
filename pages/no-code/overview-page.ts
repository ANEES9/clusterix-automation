import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { Allure } from 'common/allure-helper'
import { AccountingBillsPage } from 'pages/no-code/accounting-bills-page'
import { AccountingInvoicesPage } from 'pages/no-code/accounting-invoices-page'
import { CustomersPage } from 'pages/no-code/customers-page'
import { HumanResourcesPage } from 'pages/no-code/human-resources-page'
import { ProjectManagementPage } from 'pages/no-code/project-management-page'

export class OverviewPage {
  private page: Page
  private translations: Record<string, any>

  private accountingBillsPage: AccountingBillsPage
  private accountingInvoicesPage: AccountingInvoicesPage
  private customersPage: CustomersPage
  private humanResourcesPage: HumanResourcesPage
  private projectManagementPage: ProjectManagementPage

  //Overview Items
  public aboutNoCode: Locator
  public noCodeDescription: Locator
  public step1Title: Locator
  public step1Description: Locator
  public step2Title: Locator
  public step2Description: Locator
  public step3Title: Locator
  public step3Description: Locator
  public newNoCodeButton: Locator

  //Sidebar Items
  public sidebarCollapse: Locator
  public accountingBillsSidebarButton: Locator
  public accountingInvoicesSidebarButton: Locator
  public customersSidebarButton: Locator
  public humanResourcesSidebarButton: Locator
  public projectManagementSidebarButton: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('no-code', locale)

    this.accountingBillsPage = new AccountingBillsPage(page, locale)
    this.accountingInvoicesPage = new AccountingInvoicesPage(page, locale)
    this.customersPage = new CustomersPage(page, locale)
    this.humanResourcesPage = new HumanResourcesPage(page, locale)
    this.projectManagementPage = new ProjectManagementPage(page, locale)

    this.aboutNoCode = this.page.locator(
      `h1:has-text("${this.translations.workflows_introduction.title}")`
    )
    this.noCodeDescription = this.page.getByText(
      `${this.translations.workflows_introduction.description}`
    )
    this.step1Title = this.page.getByRole('heading', {
      name: this.translations.workflows_introduction.step1.title,
    })
    this.step1Description = this.page.locator(
      `p:has-text("${this.translations.workflows_introduction.step1.description}")`
    )
    this.step2Title = this.page.getByRole('heading', {
      name: this.translations.workflows_introduction.step2.title,
    })
    this.step2Description = this.page.locator(
      `p:has-text("${this.translations.workflows_introduction.step2.description}")`
    )
    this.step3Title = this.page.getByRole('heading', {
      name: this.translations.workflows_introduction.step3.title,
    })
    this.step3Description = this.page.locator(
      `p:has-text("${this.translations.workflows_introduction.step3.description}")`
    )
    this.newNoCodeButton = this.page.locator(
      `//div[contains(text(), "${this.translations.workflows_introduction.new}")]`
    )

    //Sidebar Items
    this.sidebarCollapse = page.locator('button[class*="collapseButton"]')
    this.accountingBillsSidebarButton = page.locator(
      `div._sidebarGroup__items_xikp8_109 >> div:has-text('${this.translations.workflow_apps['4'].label}')`
    )
    this.accountingInvoicesSidebarButton = page.locator(
      `div._sidebarGroup__items_xikp8_109 >> div:has-text('${this.translations.workflow_apps['5'].label}')`
    )
    this.customersSidebarButton = page.locator(
      `div._sidebarGroup__items_xikp8_109 >> div:has-text('${this.translations.workflow_apps['1'].label}')`
    )
    this.humanResourcesSidebarButton = page.locator(
      `div._sidebarGroup__items_xikp8_109 >> div:has-text('${this.translations.workflow_apps['2'].label}')`
    )
    this.projectManagementSidebarButton = page.locator(
      `div._sidebarGroup__items_xikp8_109 >> div:has-text('${this.translations.workflow_apps['3'].label}')`
    )
  }

  /**
   * Navigate to the No Code Overview.
   * @param baseURL - The base URL of the application.
   */
  async gotoOverview(baseURL: string | undefined) {
    await this.page.goto(`${baseURL}${APP_URLS.noCode.overview.base}`)
    await this.page.waitForLoadState('networkidle')
    await expect(this.aboutNoCode).toBeVisible()
  }
  getNoCodeOverviewTitle(): Locator {
    return this.aboutNoCode
  }
  async validatePageTitle() {
    await expect(this.aboutNoCode).toBeVisible()
  }
  async validatePageDescription() {
    await expect(this.noCodeDescription).toBeVisible()
  }
  async validateStep1Title() {
    await expect(this.step1Title).toBeVisible()
  }
  async validateStep1Description() {
    await expect(this.step1Description).toBeVisible()
  }
  async validateStep2Title() {
    await expect(this.step2Title).toBeVisible()
  }
  async validateStep2Description() {
    await expect(this.step2Description).toBeVisible()
  }
  async validateStep3Title() {
    await expect(this.step3Title).toBeVisible()
  }
  async validateStep3Description() {
    await expect(this.step3Description).toBeVisible()
  }
  async clickOnTheNewNoCodeButton() {
    await this.newNoCodeButton.click()
  }

  async navigateToAccountingBillsSidebar() {
    await Allure.step('Click on the Accounting Bills Button', async () => {
      await this.sidebarCollapse.click()
      await this.accountingBillsSidebarButton.first().click()
      await this.sidebarCollapse.click()
    })
    await Allure.step(
      'Validate that Accounting Page Title is Visible',
      async () => {
        const accountingBillTitle =
          this.accountingBillsPage.getNoCodeAccountingBillsPageTitle()
        await expect(accountingBillTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.noCode.accountingBills.base)
    })
  }
  async navigateToAccountingInvoicesSidebar() {
    await Allure.step('Click on the Accounting Invoices Button', async () => {
      await this.sidebarCollapse.click()
      await this.accountingInvoicesSidebarButton.first().click({ force: true })
      await this.sidebarCollapse.click()
    })
    await Allure.step(
      'Validate that Accounting Invoices Title is Visible',
      async () => {
        const accountingInvoicesTitle =
          this.accountingInvoicesPage.getNoCodeAccountingInvoicesPageTitle()
        await expect(accountingInvoicesTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.noCode.accountingInvoices.base)
    })
  }
  async navigateToCustomersSidebar() {
    await Allure.step('Click on the Customers Button', async () => {
      await this.sidebarCollapse.click()
      await this.customersSidebarButton.first().click()
      await this.sidebarCollapse.click()
    })
    await Allure.step('Validate that Customers Title is Visible', async () => {
      const customersTitle = this.customersPage.getNoCodeCustomersTitle()
      await expect(customersTitle).toBeVisible()
    })
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.noCode.customers.base)
    })
  }
  async navigateToHumanResourcesSidebar() {
    await Allure.step('Click on the Human Resources Button', async () => {
      await this.sidebarCollapse.click()
      await this.humanResourcesSidebarButton.first().click()
      await this.sidebarCollapse.click()
    })
    await Allure.step(
      'Validate that Human Resources Title is Visible',
      async () => {
        const humanResourcesTitle =
          this.humanResourcesPage.getNoCodeHumanResourcesTitle()
        await expect(humanResourcesTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.noCode.humanResources.base)
    })
  }
  async navigateToProjectManagementSidebar() {
    await Allure.step('Click on the Project Management Button', async () => {
      await this.sidebarCollapse.click()
      await this.projectManagementSidebarButton.first().click()
      await this.sidebarCollapse.click()
    })
    await Allure.step(
      'Validate that Project Management Title is Visible',
      async () => {
        const projectManagementTitle =
          this.projectManagementPage.getNoCodeProjectManagementTitle()
        await expect(projectManagementTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.noCode.projectManagement.base)
    })
  }
}
