import { Locator, Page } from '@playwright/test'

export class PageLocators {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Header Items
  public get accountingListButton(): Locator {
    return this.page.getByRole('link', { name: 'Accounting Account overview,' })
  }
  public get paymentsSidebarButton(): Locator {
    return this.page.getByRole('button', { name: 'Payments' })
  }
  public get paymentsTransactionSidebarButton(): Locator {
    return this.page.getByRole('button', { name: 'Payment Transactions' })
  }
  public get paymentsAnalysisSidebarButton(): Locator {
    return this.page.getByRole('button', { name: 'Payment Analysis' })
  }
  public get incomeSidebarButton(): Locator {
    return this.page.getByRole('button', { name: 'Income' })
  }
  public get invoicesSidebarButton(): Locator {
    return this.page.getByRole('button', { name: 'Invoices' })
  }
  public get categoriesSidebarButton(): Locator {
    return this.page.getByRole('button', { name: 'Categories' })
  }
  public get reportsSidebarButton(): Locator {
    return this.page.getByRole('button', { name: 'Reports' })
  }
  public get dashboardSidebarButton(): Locator {
    return this.page.getByRole('button', { name: 'Dashboard' })
  }
  public get dashboardExpandButton(): Locator {
    return this.page.locator('._collapseButton_16zcl_522')
  }
  public get dashboardCollapseButton(): Locator {
    return this.page.locator('._collapseButton_16zcl_522')
  }
  public get searchIbanFilter(): Locator {
    return this.page.getByPlaceholder('Search for Title, Name or IBAN')
  }
  public get connectBankButton(): Locator {
    return this.page.getByRole('button', { name: 'Connect bank account' })
  }
  public get ibanfocusButton(): Locator {
    return this.page.getByPlaceholder('TR34-0000-0000-0000-0000-')
  }
  public get currencyDropdown(): Locator {
    return this.page.getByPlaceholder('Bank Account Currency')
  }

  // Example Action Methods
  public async clickAccountingListButton(): Promise<void> {
    await this.accountingListButton.click()
  }

  public async clickPaymentsSidebarButton(): Promise<void> {
    await this.paymentsSidebarButton.click()
  }

  public async clickConnectBankButton(): Promise<void> {
    await this.connectBankButton.click()
  }

  public async fillIBANField(iban: string): Promise<void> {
    await this.ibanfocusButton.fill(iban)
  }

  public async selectCurrency(currency: string): Promise<void> {
    await this.currencyDropdown.click()
    await this.page.locator(`text=${currency}`).click()
  }
}
