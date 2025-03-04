import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class AccountingInvoicesPage {
  private page: Page
  private translations: Record<string, any>

  public accountingInvoicesPageTitle: Locator

  private searchInput: Locator
  private firstItemName: string = ''

  //Table Items
  private firstItemLocator: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('no-code', locale)

    this.accountingInvoicesPageTitle = this.page.locator(
      `span:has-text('${this.translations.workflow_apps['5'].label}')`
    )

    //Table Items
    this.firstItemLocator = page.locator(
      'tbody tr:first-child span._text_1cq82_100._bold_1cq82_124'
    )

    //Table Items
    this.firstItemLocator = page.locator(
      'tbody tr:first-child span._text_1cq82_100._bold_1cq82_124'
    )

    //Search
    this.searchInput = page.locator(
      `input[placeholder="${this.translations.search_for_workflows}"]`
    )
  }

  /**
   * Navigate to the No Code Accounting Invoices.
   * @param baseURL - The base URL of the application.
   */
  async gotoAccountingInvoices(baseURL: string | undefined) {
    await this.page.goto(`${baseURL}${APP_URLS.noCode.accountingInvoices.base}`)
    await this.page.waitForLoadState('networkidle')
    await expect(this.accountingInvoicesPageTitle).toBeVisible()
  }

  getNoCodeAccountingInvoicesPageTitle(): Locator {
    return this.accountingInvoicesPageTitle
  }

  getSearchResult(): Locator {
    return this.page.locator(`tbody tr:has-text("${this.firstItemName}")`)
  }

  async validatePageTitle() {
    await expect(this.accountingInvoicesPageTitle).toBeVisible()
  }

  async searchFirstItem() {
    this.firstItemName = await this.firstItemLocator.innerText()
    await this.searchInput.fill(this.firstItemName)
    const searchResults = this.getSearchResult()
    const resultCount = await searchResults.count()
    expect(resultCount).toBeGreaterThan(0)
  }
}
