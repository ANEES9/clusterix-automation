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

  async goto(baseURL: string | undefined) {
    await Allure.step('should navigate to organization structure', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.hr.organizationStructure}`)
    })
  }

  async verifyOrganizationChartPageLoads() {
    await expect(this.page).toHaveURL(/.*\/organizational-structure/)
    await this.organizationStructureHeading.waitFor({ state: 'visible' })
    await expect(this.organizationStructureHeading).toBeVisible()
  }
}
