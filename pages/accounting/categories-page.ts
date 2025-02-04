import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class CategoriesPage {
  private page: Page
  private translations: Record<string, any>

  public categoriesPageTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('accounting', locale)

    this.categoriesPageTitle = this.page.getByRole('heading', {
      name: this.translations.transactions.categories,
    })
  }

  /**
   * Navigate to the categories.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.accounting.income.products}`)
  }
  getCategoriesPageTitle(): Locator {
    return this.categoriesPageTitle
  }
}
