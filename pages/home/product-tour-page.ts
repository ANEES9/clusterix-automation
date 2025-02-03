import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
export class ProductTourPage {
  private page: Page
  translations: Record<string, any>

  private titleText: Locator
  public skipTour: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('container', locale)

    this.titleText = page.locator(
      `span:has-text("${this.translations.product_tour.homepage.title_personal}")`
    )
    this.skipTour = page.locator(
      `button:has-text("${this.translations.product_tour.homepage.skip_tour}")`
    )
  }

  async validateProductTourTitle() {
    await expect(this.titleText).toBeVisible()
  }

  async skipProductTour() {
    await Allure.step(
      'should skip product tour when click skip tour',
      async () => {
        await this.skipTour.click({ force: true })
      }
    )
  }
}
