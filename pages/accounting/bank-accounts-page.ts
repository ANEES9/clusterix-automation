import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'config/constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class BankAccountsPage {
  private page: Page
  private translations: Record<string, any>

  // Locators
  private connectBankButton: Locator
  private ibanInput: Locator
  private currencyDropdown: Locator
  private bankAccountTitleInput: Locator
  private manualTrackingButton: Locator
  private automaticTrackingButton: Locator
  private connectAccountButton: Locator
  private successMessage: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('accounting', locale)

    this.connectBankButton = this.page.getByRole('button', {
      name: this.translations.bank_accounts.connect,
    })
    this.ibanInput = this.page.getByPlaceholder('TR34-0000-0000-0000-0000-00')
    this.currencyDropdown = this.page.getByPlaceholder(
      this.translations.bank_accounts.bank_account_currency
    )
    this.bankAccountTitleInput = this.page.getByPlaceholder(
      this.translations.optional
    )
    this.manualTrackingButton = this.page
      .locator('h3', {
        hasText: this.translations.bank_accounts.manual_tracking,
      })
      .nth(1)
    this.automaticTrackingButton = this.page
      .locator('h3', {
        hasText: this.translations.bank_accounts.automatic_tracking,
      })
      .nth(1)
    this.connectAccountButton = this.page.locator(
      `text=${this.translations.bank_accounts.connect_account}`
    )
    this.successMessage = this.page.locator('text=Account successfully added')
  }

  /**
   * Navigate to the bank accounts page.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(
      `${baseURL}${APP_URLS.accounting.payments.bankAccounts}`
    )
  }

  /**
   * Click on the connect bank button.
   */
  async clickConnectBankButton(): Promise<void> {
    await this.connectBankButton.click()
  }

  /**
   * Fill the IBAN field.
   * @param iban - The IBAN to fill.
   */
  async fillIBANField(iban: string): Promise<void> {
    await this.ibanInput.fill(iban)
  }

  /**
   * Select a currency from the dropdown.
   * @param currency - The currency to select.
   */
  async selectCurrency(currency: string): Promise<void> {
    await this.currencyDropdown.click()
    await this.page.locator(`text=${currency}`).click()
  }

  /**
   * Select a currency from the dropdown.
   * @param title - The currency to select.
   */
  async fillBankAccountTitle(title: string): Promise<void> {
    await this.bankAccountTitleInput.fill(title)
  }

  async clickOnManualTracking() {
    await this.manualTrackingButton.scrollIntoViewIfNeeded()
    await this.manualTrackingButton.click()
  }

  async clickOnAutomaticTracking() {
    await this.automaticTrackingButton.scrollIntoViewIfNeeded()
    await this.automaticTrackingButton.click()
  }

  async clickOnConnectAccountButton() {
    await this.connectAccountButton.click()
  }

  async validateSuccessMessage() {
    await expect(this.successMessage).toBeVisible()
  }
}
