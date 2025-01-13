import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'

export class EmailPage {
  private page: Page
  private currentApp: Locator

  static readonly URL = '/email'

  constructor(page: Page) {
    this.page = page
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Email URL', async () => {
      await this.page.goto(`${baseURL}${EmailPage.URL}`)
    })
  }
  async validateCurrentApp() {
    await expect(this.page).toHaveURL(new RegExp(`${EmailPage.URL}$`))
    await expect(this.currentApp).toContainText('Email')
  }
}
