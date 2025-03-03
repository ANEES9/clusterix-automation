import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class CustomersPage {
  private page: Page
  private translations: Record<string, any>

  public customersPageTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('accounting', locale)

    this.customersPageTitle = page
      .locator('div', {
        hasText: this.translations.customers,
      })
      .first()
  }

  /**
   * Navigate to the customers.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.accounting.income.customers}`)
  }
  getCustomersPageTitle(): Locator {
    return this.customersPageTitle
  }
}
