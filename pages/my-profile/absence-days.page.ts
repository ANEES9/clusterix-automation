import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { waitForPageReady } from 'common/page-ready-helper'
import { APP_URLS } from 'constants/app-urls'

export class AbsenceDaysPage {
  readonly page: Page
  private translations: Record<string, any>

  // ========================
  // Locator declarations
  // ========================
  private readonly pageHeading: Locator
  private readonly mainPageContainer: Locator

  // ========================
  // Constructor
  // ========================
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('my-profile', locale)

    this.pageHeading = page.getByRole('button', {
      name: this.translations.absence_days,
      exact: true,
    })
    this.mainPageContainer = page.locator('#root')
  }

  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('should navigate to absence days', async () => {
      await this.page.goto(`${cleanBaseURL}${APP_URLS.myProfile.absenceDays}`, {
        waitUntil: 'domcontentloaded',
      })
      await waitForPageReady(this.page, this.pageHeading, 'Absence Days')
    })
  }

  async verifyPageUrl() {
    await expect(this.page).toHaveURL(/\/profile\/absence\/team(?:[/?#]|$)/)
  }

  async verifyPageHeading() {
    await this.pageHeading.waitFor({ state: 'visible' })
    await expect(this.pageHeading).toBeVisible()
  }

  async verifyPageLoads() {
    await this.verifyPageUrl()
    await this.verifyPageHeading()
    await expect(this.mainPageContainer).toBeVisible()
  }
}
