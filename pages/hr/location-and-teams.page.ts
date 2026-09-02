import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { waitForPageReady } from 'common/page-ready-helper'
import { APP_URLS } from 'constants/app-urls'

export class LocationAndTeamsPage {
  readonly page: Page
  private translations: Record<string, any>

  // Locator declarations
  // Page headings
  private readonly pageHeading: Locator
  private readonly teamsPageHeading: Locator

  // Sidebar links
  private readonly teamsSubLink: Locator

  // Constructor
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)

    // Page headings
    this.pageHeading = page
      .locator('h1')
      .filter({ hasText: this.translations.locationsPage.heading })
    this.teamsPageHeading = page
      .locator('h1')
      .filter({ hasText: this.translations.modules.teams })

    // Sidebar links
    this.teamsSubLink = page
      .locator('button[class*="sidebarSubMenu"]')
      .filter({ hasText: this.translations.modules.teams })
  }

  // Navigation methods
  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    const cleanPath = APP_URLS.hr.locationAndTeams.replace(/^\//, '')
    await Allure.step('should navigate to locations', async () => {
      await this.page.goto(`${cleanBaseURL}/${cleanPath}`, {
        waitUntil: 'domcontentloaded',
      })
      await waitForPageReady(this.page, this.pageHeading, 'Location and Teams')
    })
  }

  // Verification methods
  async verifyPageLoads() {
    await expect(this.page).toHaveURL(/\/hr\/locations(?:[/?#]|$)/)
    await this.pageHeading.waitFor({ state: 'visible' })
    await expect(this.pageHeading).toBeVisible()
  }

  async navigateToTeams() {
    await this.teamsSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Subpage verification methods
  async verifyTeamsPageLoads() {
    await expect(this.page).toHaveURL(/\/hr\/teams(?:[/?#]|$)/)
    await this.teamsPageHeading.waitFor({ state: 'visible' })
    await expect(this.teamsPageHeading).toBeVisible()
  }
}
