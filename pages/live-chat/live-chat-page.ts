import { Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class LiveChatPage {
  private page: Page
  translations: Record<string, any>

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('live-chat', locale)
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Live Chat URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.liveChat}`)
    })
  }
}
