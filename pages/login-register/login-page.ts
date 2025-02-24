import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { LANGUAGES } from 'config/language-config'
import { getTranslations } from 'common/get-translations-helper'
import { getEndpoint } from 'helpers/api/get-endpoint-helper'
import { UIResponseValidator } from 'common/ui-response-validator'
import { ResetPasswordPage } from 'pages/login-register/reset-password-page'

export class LoginPage {
  private page: Page
  private translations: Record<string, any>

  private emailField: Locator
  private passwordField: Locator
  private loginButton: Locator
  private login401: Locator
  private emailError: Locator
  private passwordErrorLabel: Locator
  private forgotPasswordLink: Locator
  private registerLink: Locator
  private googleLink: Locator
  private microsoftLink: Locator
  private appleLink: Locator
  private ssoLink: Locator
  private rememberMeCheckbox: Locator
  private backFromForgotPasswordLink: Locator
  private loginFromRegisterLink: Locator

  public resetPasswordPage: ResetPasswordPage

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('login-register', locale)

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
    this.login401 = this.page.getByText(this.translations.login.login401)
    this.emailError = this.page.getByText(this.translations.login.emailError)
    this.passwordErrorLabel = this.page.locator(
      'div._label_zut04_8._hasError_zut04_29'
    )
    this.forgotPasswordLink = this.page.getByRole('button', {
      name: this.translations.login.forgotPassword,
    })
    this.registerLink = this.page.getByRole('button', {
      name: this.translations.login.footer2,
    })
    this.googleLink = this.page.getByRole('button', { name: 'Google' })
    this.microsoftLink = this.page.getByRole('button', { name: 'Microsoft' })
    this.appleLink = this.page.getByRole('button', { name: 'Apple' })
    this.ssoLink = this.page.getByRole('button', { name: 'SSO' })
    this.rememberMeCheckbox = this.page.getByLabel(
      this.translations.login.remember
    )

    this.loginFromRegisterLink = this.page.getByRole('button', {
      name: this.translations.registerContainer.fromFooter2,
    })
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
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
  }

  async verifyLoginPageItems() {
    await this.emailField.isVisible()
    await this.loginButton.isVisible()
  }

  /**
   * Log in and validate the API response.
   * @param email - User's email address.
   * @param password - User's password.
   * @param expectedStatus - The expected HTTP status code(s).
   * @param validateDataFn - Optional function to validate the response data.
   */
  async loginAndValidate(
    email: string,
    password: string,
    expectedStatus: number | number[],
    validateDataFn?: (data: any) => void
  ) {
    const loginUrl = getEndpoint('authService', 'login')
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await UIResponseValidator.validate(
      this.page,
      this.loginButton,
      loginUrl,
      expectedStatus,
      validateDataFn
    )
  }

  async verifyInvalidPasswordLogin(email: string, password: string) {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
    await expect(this.login401).toBeVisible()
  }

  async verifyInvalidEmailLogin(email: string, password: string) {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
    await expect(this.emailError).toBeVisible()
  }

  async verifyEmptyEmailLogin(email: string, password: string) {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
    await expect(this.emailError).toBeVisible()
  }

  async verifyEmptyPasswordLogin(email: string, password: string) {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
    await expect(this.passwordErrorLabel).toBeVisible()
  }

  async navigateToPasswordResetPage() {
    await this.forgotPasswordLink.click()
    await this.page.waitForLoadState('networkidle')
    const currentUrl = this.page.url()
    expect(currentUrl).toContain(APP_URLS.resetPassword)
  }

  async verifyNavigateToRegisterPage() {
    await this.registerLink.click()
    await this.page.waitForLoadState('networkidle')
    const currentUrl = this.page.url()
    expect(currentUrl).toContain(APP_URLS.register)
  }

  async verifyNavigateBackFromRegisterPage() {
    await this.registerLink.click()
    await this.page.waitForLoadState('networkidle')
    await this.loginFromRegisterLink.click()
    await this.page.waitForLoadState('networkidle')
    const currentUrl = this.page.url()
    expect(currentUrl).toContain(APP_URLS.login)
  }

  async verifyNavigateToGooglePage() {
    await this.googleLink.click()
    await this.page.waitForLoadState('networkidle')
    const currentUrl = this.page.url()
    expect(currentUrl).toContain('accounts.google.com')
  }

  async verifyNavigateToMicrosoftPage() {
    await this.microsoftLink.click()
    await this.page.waitForLoadState('networkidle')
    const currentUrl = this.page.url()
    expect(currentUrl).toContain('login.microsoftonline.com')
  }

  async verifyNavigateToApplePage() {
    await this.appleLink.click()
    await this.page.waitForLoadState('networkidle')
    const currentUrl = this.page.url()
    expect(currentUrl).toContain('appleid.apple.com')
  }

  async verifyNavigateToSSOPage() {
    await this.ssoLink.click()
    await this.page.waitForLoadState('networkidle')
    const currentUrl = this.page.url()
    expect(currentUrl).toContain(APP_URLS.sso)
  }

  async verifyRememberMeClickable() {
    await this.rememberMeCheckbox.click()
    await this.page.waitForLoadState('networkidle')
    const isUnChecked = await this.rememberMeCheckbox.isChecked()
    expect(isUnChecked).toBe(false)

    await this.rememberMeCheckbox.click()
    const isChecked = await this.rememberMeCheckbox.isChecked()
    expect(isChecked).toBe(true)
  }
}
