import { Page, Locator, expect } from '@playwright/test'
import { Allure } from '../../helpers/common/allure-helper'

export class TimeTrackingPage {
  private page: Page
  private currentApp: Locator

  static readonly URL = '/timetracking'

  constructor(page: Page) {
    this.page = page
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Time Tracking URL', async () => {
      await this.page.goto(`${baseURL}${TimeTrackingPage.URL}`)
    })
  }
  async validateCurrentApp() {
    await expect(this.page).toHaveURL(new RegExp(`${TimeTrackingPage.URL}$`))
    await expect(this.currentApp).toContainText('Time Tracking')
  }
}
