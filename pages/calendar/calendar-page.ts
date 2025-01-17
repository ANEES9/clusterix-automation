import { Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'config/constants/app-urls'

export class CalendarPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Calendar URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.calendar.base}`)
    })
  }
}
