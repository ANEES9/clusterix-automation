import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class ProductsPage {
  private page: Page
  private translations: Record<string, any>

  public productsPageTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('accounting', locale)

    this.productsPageTitle = this.page.getByRole('heading', {
      name: this.translations.transactions.products,
    })
  }

  /**
   * Navigate to the products.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.accounting.income.products}`)
  }
  getProductsPageTitle(): Locator {
    return this.productsPageTitle
  }
}
