import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'

export class FreelancerPaymentPage {
  private readonly pageHeading: Locator
  private readonly mainPageContainer: Locator

  constructor(
    private readonly page: Page,
    locale: string
  ) {
    const translations = getTranslations('my-profile', locale)
    this.pageHeading = page.getByRole('heading', {
      name: translations.freelancer_payment,
      exact: true,
    })
    this.mainPageContainer = page.locator('#root')
  }

  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('should navigate to freelancer payment', async () => {
      await this.page.goto(
        `${cleanBaseURL}${APP_URLS.myProfile.freelancerPayment}`
      )
    })
  }

  async verifyPageUrl() {
    await expect(this.page).toHaveURL(
      /\/profile\/freelancer-payments(?:[/?#]|$)/
    )
  }

  async verifyPageHeading() {
    await this.pageHeading.waitFor({ state: 'visible' })
    await expect(this.pageHeading).toBeVisible()
  }

}
