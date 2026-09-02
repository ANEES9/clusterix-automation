import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { waitForPageReady } from 'common/page-ready-helper'
import { APP_URLS } from 'constants/app-urls'

export class PersonalInfoPage {
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

    this.pageHeading = page
      .locator('h1, h2, h3, strong, [class*="title"], [class*="heading"]')
      .filter({ hasText: this.translations.personal_info })
      .first()
    this.mainPageContainer = page.locator('#root')
  }

  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('should navigate to personal info', async () => {
      await this.page.goto(
        `${cleanBaseURL}${APP_URLS.myProfile.personalInfo}`,
        {
          waitUntil: 'domcontentloaded',
        }
      )
      await waitForPageReady(this.page, this.pageHeading, 'Personal Info')
    })
  }

  async verifyPageUrl() {
    await expect(this.page).toHaveURL(/\/profile\/personal_info(?:[/?#]|$)/)
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
