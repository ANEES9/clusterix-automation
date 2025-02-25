import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class NewNoCodeModalPage {
  private page: Page
  private translations: Record<string, any>

  public modal: Locator
  public newNoCodeTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('no-code', locale)

    this.modal = page.locator('div[role="dialog"]')
    this.newNoCodeTitle = this.page.locator('span.H31GCqWyYZxwsJB1ooD')
  }

  /**
   * Navigate to the No Code Workflow Creation Modal.
   * @param baseURL - The base URL of the application.
   */
  async gotoOverview(baseURL: string | undefined) {
    await this.page.goto(
      `${baseURL}${APP_URLS.noCode.overview.newWorkflow.appConnection}`
    )
    await this.page.waitForLoadState('networkidle')
    await expect(this.newNoCodeTitle).toBeVisible()
  }

  async validateModalOpened() {
    await expect(this.modal).toBeVisible()
    await this.newNoCodeTitle.isVisible()
  }
}
