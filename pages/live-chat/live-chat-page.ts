import { Page, Locator, expect } from '@playwright/test'
import { Allure } from '../../helpers/common/allure-helper'

export class LiveChatPage {
  private page: Page
  private currentApp: Locator

  static readonly URL = '/live-chat'

  constructor(page: Page) {
    this.page = page
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Live Chat URL', async () => {
      await this.page.goto(`${baseURL}${LiveChatPage.URL}`)
    })
  }
  async validateCurrentApp() {
    await expect(this.page).toHaveURL(new RegExp(`${LiveChatPage.URL}$`))
    await expect(this.currentApp).toContainText('Live Chat')
  }
}
