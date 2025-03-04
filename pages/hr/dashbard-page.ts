import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'
import { APP_NAMES } from 'constants/app-names'

export class HumanResourcePage {
  private page: Page
  private currentApp: Locator

  constructor(page: Page) {
    this.page = page
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Time Tracking URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.hr.base}`)
    })
  }
  async validateCurrentApp() {
    await expect(this.page).toHaveURL(new RegExp(`${APP_URLS.hr.base}$`))
    await expect(this.currentApp).toContainText(APP_NAMES.hr)
  }
}
