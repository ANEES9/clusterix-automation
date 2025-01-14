import { Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ContainerPage } from '../container-app/container-page'
import { APP_NAMES, APP_URLS } from 'config/constants'

export class CalendarPage {
  private page: Page
  private containerPage: ContainerPage

  constructor(page: Page) {
    this.page = page
    this.containerPage = new ContainerPage(page)
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Calendar URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.calendar}`)
    })
  }

  async validateCurrentApp() {
    await Allure.step('Check current app', async () => {
      await this.containerPage.validateCurrentApp(APP_NAMES.calendar)
    })
  }
}
