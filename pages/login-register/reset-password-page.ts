import { expect, Locator, Page } from '@playwright/test'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'
import { Allure } from 'common/allure-helper'

export class ResetPasswordPage {
  private page: Page
  private translations: Record<string, any>

  public mainHeader: Locator
  public backToLoginLink: Locator
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('login-register', locale)

    this.mainHeader = page.locator(
      `//h1[contains(text(), "${this.translations.recovery.header1}")]`
    )
    this.backToLoginLink = this.page.getByRole('button', {
      name: this.translations.recovery.backToLogin,
    })
  }

  /**
   * Navigate to the Reset Password.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.resetPassword}`)
  }

  async backToLogin() {
    await Allure.step('Click on Back to Login link', async () => {
      await this.backToLoginLink.click()
    })
    await Allure.step('Verify navigation back to Login page', async () => {
      await this.page.waitForLoadState('networkidle')
      const currentUrl = this.page.url()
      expect(currentUrl).toContain(APP_URLS.login)
    })
  }
}
