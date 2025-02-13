import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class CampaignsPage {
  private page: Page
  private translations: Record<string, any>

  public campaignsPageTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('bulk-mailing', locale)

    this.campaignsPageTitle = page
      .locator(`div:has-text("${this.translations.campaigns}")`)
      .first()
  }

  /**
   * Navigate to the campaigns.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.bulkMailing.campaigns}`)
  }
  getCampaignsPageTitle(): Locator {
    return this.campaignsPageTitle
  }
}
