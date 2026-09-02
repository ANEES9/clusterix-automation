import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { waitForPageReady } from 'common/page-ready-helper'
import { APP_URLS } from 'constants/app-urls'

export class FreelancerPaymentPage {
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
      name: this.translations.freelancer_payment,
      exact: true,
    })
    this.mainPageContainer = page.locator('#root')
  }

  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('should navigate to freelancer payment', async () => {
      await this.page.goto(
        `${cleanBaseURL}${APP_URLS.myProfile.freelancerPayment}`,
        { waitUntil: 'domcontentloaded' }
      )
      await waitForPageReady(this.page, this.pageHeading, 'Freelancer Payment')
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
