import { Page, Locator, expect } from '@playwright/test'

export class CalendarPage {
  private page: Page
  private currentApp: Locator

  constructor(page: Page) {
    this.page = page
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
  }

  async validateCurrentApp() {
    await expect(this.currentApp).toContainText('Calendar')
  }
}