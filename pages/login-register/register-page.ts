import { Locator, Page } from '@playwright/test'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'

export class RegisterPage {
  private page: Page
  private translations: Record<string, any>

  public mainHeader: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('login-register', locale)

    this.mainHeader = page.locator(
      `//h1[contains(text(), "${this.translations.registerContainer.header}")]`
    )
  }

  /**
   * Navigate to the categories.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.register}`)
  }
}
