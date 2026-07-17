import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'

export class OrganizationChartPage {
  readonly page: Page
  private readonly organizationStructureHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.organizationStructureHeading = page
      .locator('strong')
      .filter({ hasText: /^Organization Structure$/ })
      .first()
  }

  private async waitForPageReady(locator: Locator, timeout = 15000) {
    try {
      await locator.waitFor({ state: 'visible', timeout })
    } catch {
      await this.page.reload({ waitUntil: 'domcontentloaded' })
      await locator.waitFor({ state: 'visible', timeout: 60000 })
    }
  }

  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    const cleanPath = APP_URLS.hr.organizationStructure.replace(/^\//, '')
    await Allure.step('should navigate to organization structure', async () => {
      await this.page.goto(`${cleanBaseURL}/${cleanPath}`, {
        waitUntil: 'domcontentloaded',
      })
      await this.waitForPageReady(this.organizationStructureHeading)
    })
  }

  async verifyOrganizationChartPageLoads() {
    await expect(this.page).toHaveURL(/.*\/organizational-structure/)
    await this.organizationStructureHeading.waitFor({ state: 'visible' })
    await expect(this.organizationStructureHeading).toBeVisible()
  }
}
