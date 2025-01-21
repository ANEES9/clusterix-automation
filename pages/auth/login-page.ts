import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'config/constants/app-urls'
import { LANGUAGES } from 'config/language-config'
import { getTranslations } from 'common/get-translations-helper'
import { skipSurvey } from 'common/skip-survey'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { closeProductTour } from 'common/product-tour-helper'
import { skipTutorial } from 'common/skip-tutorial-helper'
import { closeTimerPopUp } from 'common/timer-helper'

export class LoginPage {
  private page: Page
  private translations: Record<string, any>

  private emailField: Locator
  private passwordField: Locator
  private loginButton: Locator
  private forgotPasswordLink: Locator
  private registerLink: Locator
  private googleLink: Locator
  private microsoftLink: Locator
  private appleLink: Locator
  private ssoLink: Locator
  private rememberMeCheckbox: Locator
  private backFromForgotPasswordLink: Locator
  private loginFromRegisterLink: Locator

  constructor(page: Page, locale: string) {
    this.page = page

    // Fetch the 'login' namespace translations based on the provided locale
    this.translations = getTranslations('login', locale)

    // Initialize locators using nested translations
    this.emailField = this.page.getByPlaceholder(this.translations.login.email)
    this.passwordField = this.page.getByPlaceholder(this.translations.login.password)
    this.loginButton = this.page
      .locator('div')
      .filter({
        hasText: new RegExp(`^${this.translations.login.login}$`, 'i'),
      }) // Adjust key based on JSON
      .first()
    this.forgotPasswordLink = this.page.getByRole('button', { name: 'Forgot Password?' })
    this.registerLink = this.page.getByRole('button', { name: 'Register' })
    this.googleLink = this.page.getByRole('button', { name: 'Google' })
    this.microsoftLink = this.page.getByRole('button', { name: 'Microsoft' })
    this.appleLink = this.page.getByRole('button', { name: 'Apple' })
    this.ssoLink = this.page.getByRole('button', { name: 'SSO' })
    this.rememberMeCheckbox = this.page.getByLabel('Remember me')
    this.backFromForgotPasswordLink = this.page.getByRole('button', { name: 'Back to Login' })
    this.loginFromRegisterLink = this.page.getByRole('button', { name: 'Login now' })
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

  async verifyValidLogin(email: string, password: string, profilename: string, testInfo: any) {

    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')

    await addCursorStyleAndScript(this.page)
    await skipSurvey(this.page, testInfo)
    await closeProductTour(this.page)
    await closeTimerPopUp(this.page)
    await skipTutorial(this.page, testInfo)

    //to clears popup and other stuffs
    // await this.page.getByRole('button', { name: 'Developer / Designer' }).click();
    // await this.page.getByRole('button', { name: 'Next' }).click();
    // await this.page.getByRole('main').getByRole('button', { name: 'Live Chat' }).click();
    // await this.page.getByRole('button', { name: 'Next' }).click();
    // await this.page.getByRole('button', { name: 'Complete' }).click();
    // await this.page.getByRole('button', { name: 'Skip tour' }).click();

    await this.page.getByRole('button', { name: profilename }).click();
    await this.page.waitForLoadState('networkidle')
    await expect(this.page.locator(`text=${email}`)).toBeVisible();

  }

  async verifyInvalidlogin(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email and password must be provided')
    }
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
    expect(this.page.getByText('Invalid email or password. Please verify your information and try again.'));
  }

  async verifyInvalidEmaillogin(email: string, password: string) {

    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
    await expect(this.page.getByText('Email is invalid')).toBeVisible();
  }

  async verifyNoCredlogin() {
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
    await expect(this.page.getByText('Email is invalid')).toBeVisible();
  }

  async verifyNavigateToForgotPasswordPage() {
    await this.forgotPasswordLink.click();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('reset-password');
  }

  async verifyNavigateBackFromForgotPasswordPage() {
    await this.forgotPasswordLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.backFromForgotPasswordLink.click();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('testing.clusterix.io/login');
  }
  async verifyNavigateToRegisterPage() {
    await this.registerLink.click();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('register');
  }

  async verifyNavigateBackFromRegisterPage() {
    await this.registerLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.loginFromRegisterLink.click();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('testing.clusterix.io/login');
  }

  async verifyNavigateToGooglePage() {
    await this.googleLink.click();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('accounts.google.com');
  }

  async verifyNavigateToMicrosoftPage() {
    await this.microsoftLink.click();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('login.microsoftonline.com');
  }

  async verifyNavigateToApplePage() {
    await this.appleLink.click();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('appleid.apple.com');
  }

  async verifyNavigateToSSOPage() {
    await this.ssoLink.click();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('sso');
  }

  async verifyRememberMeClickable() {
    await this.rememberMeCheckbox.click();
    await this.page.waitForLoadState('networkidle');
    const isUnChecked = await this.rememberMeCheckbox.isChecked();
    expect(isUnChecked).toBe(false);

    await this.rememberMeCheckbox.click();
     const isChecked = await this.rememberMeCheckbox.isChecked();
    expect(isChecked).toBe(true);
  }


}
