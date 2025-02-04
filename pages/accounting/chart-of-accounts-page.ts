import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class ChartOfAccountsPage {
  private page: Page
  private translations: Record<string, any>

  public chartOfAccountsPageTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('accounting', locale)

    this.chartOfAccountsPageTitle = this.page.getByRole('heading', {
      name: this.translations.chartOfAccounts.title,
    })
  }

  /**
   * Navigate to the chart of accounts.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(
      `${baseURL}${APP_URLS.accounting.payments.chartOfAccounts}`
    )
  }
  getChartOfAccountsPageTitle(): Locator {
    return this.chartOfAccountsPageTitle
  }
}
