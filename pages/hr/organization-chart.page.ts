import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { waitForPageReady } from 'common/page-ready-helper'
import { APP_URLS } from 'constants/app-urls'

export class OrganizationChartPage {
  readonly page: Page
  private translations: Record<string, any>

  // Locator declarations
  // Page headings
  private readonly organizationStructureHeading: Locator

  // Constructor
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)

    // Page headings
    this.organizationStructureHeading = page
      .locator('strong')
      .filter({ hasText: this.translations.organizationStructure.heading })
      .first()
  }

  // Navigation methods
  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    const cleanPath = APP_URLS.hr.organizationStructure.replace(/^\//, '')
    await Allure.step('should navigate to organization structure', async () => {
      await this.page.goto(`${cleanBaseURL}/${cleanPath}`, {
        waitUntil: 'domcontentloaded',
      })
      await waitForPageReady(
        this.page,
        this.organizationStructureHeading,
        'Organization Chart'
      )
    })
  }

  // Verification methods
  async verifyOrganizationChartPageLoads() {
    await expect(this.page).toHaveURL(/.*\/organizational-structure/)
    await this.organizationStructureHeading.waitFor({ state: 'visible' })
    await expect(this.organizationStructureHeading).toBeVisible()
  }
}
