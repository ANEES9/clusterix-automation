import { Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'config/constants'

export class EmailPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Email URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.files}`)
    })
  }
}
