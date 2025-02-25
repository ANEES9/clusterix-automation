import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class OverviewPage {
  private page: Page
  private translations: Record<string, any>

  public aboutNoCode: Locator
  public noCodeDescription: Locator
  public step1Title: Locator
  public step1Description: Locator
  public step2Title: Locator
  public step2Description: Locator
  public step3Title: Locator
  public step3Description: Locator
  public newNoCodeButton: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('no-code', locale)

    this.aboutNoCode = this.page.locator(
      `h1:has-text("${this.translations.workflows_introduction.title}")`
    )
    this.noCodeDescription = this.page.getByText(
      `${this.translations.workflows_introduction.description}`
    )
    this.step1Title = this.page.getByRole('heading', {
      name: this.translations.workflows_introduction.step1.title,
    })
    this.step1Description = this.page.locator(
      `p:has-text("${this.translations.workflows_introduction.step1.description}")`
    )
    this.step2Title = this.page.getByRole('heading', {
      name: this.translations.workflows_introduction.step2.title,
    })
    this.step2Description = this.page.locator(
      `p:has-text("${this.translations.workflows_introduction.step2.description}")`
    )
    this.step3Title = this.page.getByRole('heading', {
      name: this.translations.workflows_introduction.step3.title,
    })
    this.step3Description = this.page.locator(
      `p:has-text("${this.translations.workflows_introduction.step3.description}")`
    )
    this.newNoCodeButton = this.page.locator(
      `//div[contains(text(), "${this.translations.workflows_introduction.new}")]`
    )
  }

  /**
   * Navigate to the No Code Overview.
   * @param baseURL - The base URL of the application.
   */
  async gotoOverview(baseURL: string | undefined) {
    await this.page.goto(`${baseURL}${APP_URLS.noCode.overview.base}`)
    await this.page.waitForLoadState('networkidle')
    await expect(this.aboutNoCode).toBeVisible()
  }

  getNoCodeOverviewTitle(): Locator {
    return this.aboutNoCode
  }

  async validatePageTitle() {
    await expect(this.aboutNoCode).toBeVisible()
  }

  async validatePageDescription() {
    await expect(this.noCodeDescription).toBeVisible()
  }

  async validateStep1Title() {
    await expect(this.step1Title).toBeVisible()
  }
  async validateStep1Description() {
    await expect(this.step1Description).toBeVisible()
  }

  async validateStep2Title() {
    await expect(this.step2Title).toBeVisible()
  }
  async validateStep2Description() {
    await expect(this.step2Description).toBeVisible()
  }

  async validateStep3Title() {
    await expect(this.step3Title).toBeVisible()
  }

  async validateStep3Description() {
    await expect(this.step3Description).toBeVisible()
  }

  async clickOnTheNewNoCodeButton() {
    await this.newNoCodeButton.click()
  }
}
