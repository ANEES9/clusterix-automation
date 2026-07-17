import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'

export class PayrollBonusesExtraPage {
  private readonly pageHeading: Locator
  private readonly mainPageContainer: Locator

  constructor(
    private readonly page: Page,
    locale: string
  ) {
    this.pageHeading = page
      .getByRole('button', { name: /Payrolls|Gehaltsabrechnungen/i })
      .first()
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
    await Allure.step(
      'should navigate to payroll, bonuses and extra',
      async () => {
        await this.page.goto(
          `${cleanBaseURL}${APP_URLS.myProfile.payrollBonusesAndExtra}`,
          { waitUntil: 'domcontentloaded' }
        )
        await this.waitForPageReady(this.pageHeading)
      }
    )
  }

  async verifyPageUrl() {
    await expect(this.page).toHaveURL(/\/profile\/payroll(?:[/?#]|$)/)
  }

  async verifyPageHeading() {
    await this.pageHeading.waitFor({ state: 'visible' })
    await expect(this.pageHeading).toBeVisible()
  }
}
