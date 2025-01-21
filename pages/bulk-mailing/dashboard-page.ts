import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'config/constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class DashboardPage {
  public page: Page
  public translations: Record<string, any>

  public dashboardButton: Locator
  public campaignButton: Locator
  public audienceButton: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('bulk-mailing', locale)

    this.dashboardButton = this.page.getByRole('button', {
      name: this.translations.dashboard_dashboard_dashboard,
    })
    this.campaignButton = this.page.getByRole('button', {
      name: this.translations.campaigns,
    })
    this.audienceButton = this.page.getByRole('button', {
      name: this.translations.campaigns_list.audience,
    })
  }

  /**
   * Navigate to the login page.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.bulkMailing.base}`)
  }
}
