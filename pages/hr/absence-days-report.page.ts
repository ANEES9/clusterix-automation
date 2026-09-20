import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { waitForPageReady } from 'common/page-ready-helper'

export class AbsenceDaysReportPage {
  readonly page: Page
  private readonly pageHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.pageHeading = page
      .locator('strong')
      .filter({ hasText: 'Absence days report' })
      .first()
  }

  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('should navigate to absence days report', async () => {
      await this.page.goto(
        `${cleanBaseURL}/hr/people-analytics/absence-days-report`,
        { waitUntil: 'domcontentloaded' }
      )
      await waitForPageReady(this.page, this.pageHeading, 'Absence days report')
    })
  }

  async verifyAbsenceDaysReportPageLoads() {
    await expect(this.page).toHaveURL(
      /\/hr\/people-analytics\/absence-days-report(?:[/?#]|$)/
    )
    await this.pageHeading.waitFor({ state: 'visible' })
    await expect(this.pageHeading).toBeVisible()
  }
}
