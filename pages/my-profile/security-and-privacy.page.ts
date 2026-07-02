import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'

export class SecurityAndPrivacyPage {
  private readonly pageHeading: Locator
  private readonly mainPageContainer: Locator

  constructor(
    private readonly page: Page,
    locale: string
  ) {
    const translations = getTranslations('my-profile', locale)
    this.pageHeading = page
      .getByText(translations.security_and_privacy, { exact: true })
      .last()
    this.mainPageContainer = page.locator('#root')
  }

  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('should navigate to security and privacy', async () => {
      await this.page.goto(
        `${cleanBaseURL}${APP_URLS.myProfile.securityAndPrivacy}`
      )
    })
  }

  async verifyPageUrl() {
    await expect(this.page).toHaveURL(
      /\/profile\/security-and-privacy(?:[/?#]|$)/
    )
  }

  async verifyPageHeading() {
    await this.pageHeading.waitFor({ state: 'visible' })
    await expect(this.pageHeading).toBeVisible()
  }

}
