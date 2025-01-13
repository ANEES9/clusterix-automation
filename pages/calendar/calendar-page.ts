import { Page, Locator, expect } from '@playwright/test'
import { allure } from 'allure-playwright'

export class CalendarPage {
  private page: Page
  private currentApp: Locator

  static readonly URL = '/calendar'

  constructor(page: Page) {
    this.page = page
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
  }

  async goto(baseURL: string | undefined) {
    await allure.step('Navigate to Calendar URL', async () => {
      await this.page.goto(`${baseURL}${CalendarPage.URL}`)
    })
  }
  async validateCurrentApp() {
    await expect(this.page).toHaveURL(new RegExp(`${CalendarPage.URL}$`))
    await expect(this.currentApp).toContainText('Calendar')
  }
}
