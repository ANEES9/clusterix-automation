import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'config/constants/app-urls'
import { LANGUAGES } from 'config/language-config'
import { getTranslations } from 'common/get-translations-helper'

export class LoginPage {
  private page: Page
  private translations: Record<string, any>

  private emailField: Locator
  private passwordField: Locator
  private loginButton: Locator

  constructor(page: Page, locale: string) {
    this.page = page

    // Fetch the 'login' namespace translations based on the provided locale
    this.translations = getTranslations('login', locale)

    // Initialize locators using nested translations
    this.emailField = this.page.getByPlaceholder(this.translations.login.email)
    this.passwordField = this.page.getByPlaceholder(
      this.translations.login.password
    )
    this.loginButton = this.page
      .locator('div')
      .filter({
        hasText: new RegExp(`^${this.translations.login.login}$`, 'i'),
      }) // Adjust key based on JSON
      .first()
  }

  /**
   * Navigate to the login page.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.login}`)
  }

  /**
   * Set the locale for the application by updating localStorage.
   * @param locale - The locale to set (e.g., 'en', 'de').
   */
  async setLocale(locale: string) {
    if (!LANGUAGES.includes(locale as any)) {
      throw new Error(`Locale "${locale}" is not supported`)
    }
    await this.page.evaluate((locale) => {
      localStorage.setItem('i18nextLng', locale)
    }, locale)
    await this.page.reload()
  }

  /**
   * Log in with the provided credentials.
   * @param email - User's email address.
   * @param password - User's password.
   */
  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email and password must be provided')
    }
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
  }
}
