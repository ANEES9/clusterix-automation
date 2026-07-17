import { expect, Locator, Page } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'

export class LocationAndTeamsPage {
  readonly page: Page
  private readonly pageHeading: Locator
  private readonly teamsSubLink: Locator
  private readonly teamsPageHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.pageHeading = page.locator('h1').filter({ hasText: 'Locations' })
    this.teamsSubLink = page
      .locator('button[class*="sidebarSubMenu"]')
      .filter({ hasText: /^Teams$/ })
    this.teamsPageHeading = page.locator('h1').filter({ hasText: /^Teams$/ })
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
    const cleanPath = APP_URLS.hr.locationAndTeams.replace(/^\//, '')
    await Allure.step('should navigate to locations', async () => {
      await this.page.goto(`${cleanBaseURL}/${cleanPath}`, {
        waitUntil: 'domcontentloaded',
      })
      await this.waitForPageReady(this.pageHeading)
    })
  }

  async verifyPageLoads() {
    await expect(this.page).toHaveURL(/\/hr\/locations(?:[/?#]|$)/)
    await this.pageHeading.waitFor({ state: 'visible' })
    await expect(this.pageHeading).toBeVisible()
  }

  async navigateToTeams() {
    await this.teamsSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async verifyTeamsPageLoads() {
    await expect(this.page).toHaveURL(/\/hr\/teams(?:[/?#]|$)/)
    await this.teamsPageHeading.waitFor({ state: 'visible' })
    await expect(this.teamsPageHeading).toBeVisible()
  }
}
