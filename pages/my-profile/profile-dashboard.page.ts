import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'

export class ProfileDashboardPage {
  private readonly pageHeading: Locator
  private readonly mainPageContainer: Locator

  constructor(
    private readonly page: Page,
    locale: string
  ) {
    const translations = getTranslations('my-profile', locale)
    this.pageHeading = page.getByRole('button', {
      name: translations.dashboard,
      exact: true,
    })
    this.mainPageContainer = page.locator('#root')
  }

  private async waitForPageReady(locator: Locator, timeout = 15000) {
    try {
      await locator.waitFor({ state: 'visible', timeout })
    } catch {
      await this.page.reload({ waitUntil: 'domcontentloaded' })
      try {
        await locator.waitFor({ state: 'visible', timeout: 60000 })
      } catch {
        await this.page.reload({ waitUntil: 'domcontentloaded' })
        await locator.waitFor({ state: 'visible', timeout: 60000 })
      }
    }
  }

  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('should navigate to profile dashboard', async () => {
      await this.page.goto(`${cleanBaseURL}${APP_URLS.myProfile.dashboard}`, {
        waitUntil: 'domcontentloaded',
      })
      await this.waitForPageReady(this.pageHeading)
    })
  }

  async verifyPageUrl() {
    await expect(this.page).toHaveURL(/\/profile\/dashboard(?:[/?#]|$)/)
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
