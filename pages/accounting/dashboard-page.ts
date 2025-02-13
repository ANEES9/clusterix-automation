import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { BankAccountsPage } from 'pages/accounting/bank-accounts-page'
import { PaymentTransactionsPage } from 'pages/accounting/payment-transactions-page'
import { ChartOfAccountsPage } from 'pages/accounting/chart-of-accounts-page'
import { CustomersPage } from 'pages/accounting/customers-page'
import { InvoicesPage } from 'pages/accounting/invoices-page'
import { ProductsPage } from 'pages/accounting/products-page'
import { ReportsPage } from 'pages/accounting/reports-page'
import { Allure } from 'common/allure-helper'

export class DashboardPage {
  private page: Page
  private translations: Record<string, any>

  private bankAccountsPage: BankAccountsPage
  private paymentTransactionsPage: PaymentTransactionsPage
  private chartOfAccountsPage: ChartOfAccountsPage
  private customersPage: CustomersPage
  private invoicesPage: InvoicesPage
  private productsPage: ProductsPage
  private reportsPage: ReportsPage

  //Sidebar Items
  private dashboardButton: Locator
  private paymentsButton: Locator
  private bankAccountsButton: Locator
  private paymentTransactionsButton: Locator
  private chartOfAccountsButton: Locator
  private incomeButton: Locator
  private customersButton: Locator
  private invoicesButton: Locator
  private productsButton: Locator
  private reportsButton: Locator

  //Dashboard Page Items
  private dashboardPageTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('accounting', locale)

    this.bankAccountsPage = new BankAccountsPage(page, locale)
    this.paymentTransactionsPage = new PaymentTransactionsPage(page, locale)
    this.chartOfAccountsPage = new ChartOfAccountsPage(page, locale)
    this.customersPage = new CustomersPage(page, locale)
    this.invoicesPage = new InvoicesPage(page, locale)
    this.productsPage = new ProductsPage(page, locale)
    this.reportsPage = new ReportsPage(page, locale)

    //Sidebar Locators
    this.dashboardButton = this.page.getByRole('button', {
      name: this.translations.dashboard,
    })
    this.paymentsButton = this.page.getByRole('button', {
      name: this.translations.payments,
    })
    this.bankAccountsButton = this.page.getByRole('button', {
      name: this.translations.bank_account,
    })
    this.paymentTransactionsButton = this.page.getByRole('button', {
      name: this.translations.payment_transactions,
    })
    this.chartOfAccountsButton = this.page.getByRole('button', {
      name: this.translations.chart_of_accounts,
    })
    this.incomeButton = this.page.getByRole('button', {
      name: this.translations.income,
    })
    this.customersButton = this.page.getByRole('button', {
      name: this.translations.customers,
    })
    this.invoicesButton = this.page.getByRole('button', {
      name: this.translations.invoices,
    })
    this.productsButton = this.page.getByRole('button', {
      name: this.translations.products,
    })
    this.reportsButton = this.page.getByRole('button', {
      name: this.translations.reports,
    })

    //Dashboard Page Locators
    this.dashboardPageTitle = this.page.getByRole('heading', {
      name: this.translations.dashboard,
    })
  }

  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.accounting.base}`)
  }

  async validateDashboardNavigation(): Promise<void> {
    await Allure.step('Click on the Dashboard Button', async () => {
      await this.dashboardButton.click({ force: true })
    })
    await Allure.step(
      'Validate that Dashboard Page Title is Visible',
      async () => {
        await expect(this.dashboardPageTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.accounting.base)
    })
  }

  async validateBankAccountNavigation(): Promise<void> {
    await Allure.step('Click on the Payments Button', async () => {
      await this.paymentsButton.click()
    })
    await Allure.step('Click on the Bank Accounts Button', async () => {
      await this.bankAccountsButton.click({ force: true })
    })
    await Allure.step(
      'Validate that Bank Accounts Page Title is Visible',
      async () => {
        const bankAccountsTitle =
          this.bankAccountsPage.getBankAccountsPageTitle()
        await expect(bankAccountsTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(
        APP_URLS.accounting.payments.bankAccounts
      )
    })
  }

  async validatePaymentTransactionsNavigation(): Promise<void> {
    await Allure.step('Click on the Payments Button', async () => {
      await this.paymentsButton.click()
    })
    await Allure.step('Click on the Payment Transactions Button', async () => {
      await this.paymentTransactionsButton.click({ force: true })
    })
    await Allure.step(
      'Validate that Payment Transactions Page Title is Visible',
      async () => {
        const paymentTransactionsTitle =
          this.paymentTransactionsPage.getPaymentTransactionsPageTitle()
        await expect(paymentTransactionsTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(
        APP_URLS.accounting.payments.paymentTransactions
      )
    })
  }

  async validateChartOfAccountsNavigation(): Promise<void> {
    await Allure.step('Click on the Payments Button', async () => {
      await this.paymentsButton.click()
    })
    await Allure.step('Click on the Chart of Accounts Button', async () => {
      await this.chartOfAccountsButton.click()
    })
    await Allure.step(
      'Validate that Chart of Accounts Page Title is Visible',
      async () => {
        const chartOfAccountsPageTitle =
          this.chartOfAccountsPage.getChartOfAccountsPageTitle()
        await expect(chartOfAccountsPageTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(
        APP_URLS.accounting.payments.chartOfAccounts
      )
    })
  }

  async validateCustomersNavigation(): Promise<void> {
    await Allure.step('Click on the Income Button', async () => {
      await this.incomeButton.click()
    })
    await Allure.step('Click on the Customers Button', async () => {
      await this.customersButton.nth(1).click({ force: true })
    })
    await Allure.step(
      'Validate that Customers Page Title is Visible',
      async () => {
        const customersPageTitle = this.customersPage.getCustomersPageTitle()
        await expect(customersPageTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.accounting.income.customers)
    })
  }

  async validateInvoicesNavigation(): Promise<void> {
    await Allure.step('Click on the Income Button', async () => {
      await this.incomeButton.click()
    })
    await Allure.step('Click on the Invoices Button', async () => {
      await this.invoicesButton.click()
    })
    await Allure.step(
      'Validate that Invoices Page Title is Visible',
      async () => {
        const getInvoicesPageTitle = this.invoicesPage.getInvoicesPageTitle()
        await expect(getInvoicesPageTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.accounting.income.invoices)
    })
  }

  async validateProductsNavigation(): Promise<void> {
    await Allure.step('Click on the Income Button', async () => {
      await this.incomeButton.click()
    })
    await Allure.step('Click on the Products Button', async () => {
      await this.productsButton.click()
    })
    await Allure.step(
      'Validate that Products Page Title is Visible',
      async () => {
        const getProductsPageTitle = this.productsPage.getProductsPageTitle()
        await expect(getProductsPageTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.accounting.income.products)
    })
  }

  async validateReportsNavigation(): Promise<void> {
    await Allure.step('Click on the Reports Button', async () => {
      await this.reportsButton.click()
    })
    await Allure.step(
      'Validate that Reports Page Title is Visible',
      async () => {
        const getReportsPageTitle = this.reportsPage.getReportsPageTitle()
        await expect(getReportsPageTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.accounting.reports)
    })
  }
}
