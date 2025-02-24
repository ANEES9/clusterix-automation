import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class InvoicesPage {
  private page: Page
  private translations: Record<string, any>

  public invoicesPageTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('accounting', locale)

    this.invoicesPageTitle = this.page
      .getByText(this.translations.fulfillment.title)
      .first()
  }

  /**
   * Navigate to the invoices.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.accounting.income.invoices}`)
  }
  getInvoicesPageTitle(): Locator {
    return this.invoicesPageTitle
  }
}
