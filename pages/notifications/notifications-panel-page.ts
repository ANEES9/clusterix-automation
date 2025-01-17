import { Page, Locator, expect } from '@playwright/test'

export class NotificationsPanelPage {
  private page: Page
  private notificationsPanelHeader: Locator

  constructor(page: Page) {
    this.page = page
    this.notificationsPanelHeader = page.locator('div.PanelHeader_title__RGLri')
  }

  async validateNotificationsPanelHeader() {
    await expect(this.notificationsPanelHeader).toBeVisible()
    await expect(this.notificationsPanelHeader).toContainText('Notifications')
  }
}
