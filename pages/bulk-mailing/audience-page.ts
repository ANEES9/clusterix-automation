import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { AUDIENCE_APP_CONNECTIONS } from 'types/bulk-mailing/audience-app-connections'
import { th } from '@faker-js/faker'

export class AudiencePage {
  private page: Page
  private translations: Record<string, any>

  // Audience Page Items
  private audiencePageTitle: Locator

  // Add Audience Modal Items
  private addNewAudienceButton: Locator
  private importFromClusterix: Locator
  private uploadFromFiles: Locator
  private copyAndPaste: Locator
  private audienceTitleInput: Locator
  private appConnection: Locator
  private selectAppDropdown: Locator

  // Customers Selections
  private processTypeDropdown: Locator
  private processDropdown: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('bulk-mailing', locale)

    // Audience Page Locators
    this.audiencePageTitle = this.page
      .locator(`div:has-text("${this.translations.campaigns_list.audience}")`)
      .first()

    // Add Audience Modal Locators
    this.addNewAudienceButton = this.page.getByRole('button', {
      name: this.translations.add_audience_modal.add_audience,
    })
    this.importFromClusterix = this.page.locator(
      `div:has-text("${this.translations.add_audience_modal.add_audience}")`
    )
    this.uploadFromFiles = this.page.locator(
      `div:has-text("${this.translations.add_audience_modal.upload_from_files}")`
    )
    this.copyAndPaste = this.page.locator(
      `div:has-text("${this.translations.add_audience_modal.copy_paste}")`
    )
    this.audienceTitleInput = this.page.locator('input[name="name"]')
    this.appConnection = this.page.getByText(
      this.translations.add_audience_modal.app_connection
    )
    this.selectAppDropdown = this.page.locator('#text-input-9537-2834')
    this.processTypeDropdown = this.page.locator('#text-input-7362-8760')
    this.processDropdown = this.page.locator('#text-input-5277-3147')
  }

  /**
   * Navigate to the invoices.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.bulkMailing.audience}`)
  }
  getAudiencePageTitle(): Locator {
    return this.audiencePageTitle
  }
}
