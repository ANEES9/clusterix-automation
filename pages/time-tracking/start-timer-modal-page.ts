import { Page, Locator } from '@playwright/test'
import { getTranslations } from 'common/get-translations-helper'

export class StartTimerModalPage {
  private page: Page
  translations: Record<string, any>
  continueWithoutTimerButton: Locator
  continueWithoutChangingButton: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('time-tracking', locale)

    this.continueWithoutTimerButton = page.getByRole('button', {
      name: this.translations.main.timerModalCancel,
    })
    this.continueWithoutChangingButton = page.getByRole('button', {
      name: this.translations.main.continueWithoutChanging,
    })
  }
}
