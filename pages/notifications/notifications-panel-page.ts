import { Page, Locator, expect } from '@playwright/test'
import { getTranslations } from 'common/get-translations-helper'

export class NotificationsPanelPage {
  private page: Page
  translations: Record<string, any>
  private notificationsPanelHeader: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('notifications', locale)
    this.notificationsPanelHeader = page.locator('div.PanelHeader_title__RGLri')
  }

  async validateNotificationsPanelHeader() {
    await expect(this.notificationsPanelHeader).toBeVisible()
    await expect(this.notificationsPanelHeader).toContainText(
      this.translations.notifications
    )
  }
}
