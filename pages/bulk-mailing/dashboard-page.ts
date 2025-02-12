import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { CampaignsPage } from 'pages/bulk-mailing/campaigns-page'
import { Allure } from 'common/allure-helper'
import { AudiencePage } from 'pages/bulk-mailing/audience-page'

export class DashboardPage {
  private page: Page
  private translations: Record<string, any>

  private campaignsPage: CampaignsPage
  private audiencePage: AudiencePage

  // Sidebar Items
  private dashboardButton: Locator
  private campaignsButton: Locator
  private audienceButton: Locator
  private sideBarCollapseIcon: Locator

  // Dashboard Items
  private upcomingMailDatesTitle: Locator
  private campaignPerformanceTitle: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('bulk-mailing', locale)

    // Pages
    this.campaignsPage = new CampaignsPage(page, locale)
    this.audiencePage = new AudiencePage(page, locale)

    // Sidebar Locators
    this.dashboardButton = this.page.getByRole('button', {
      name: this.translations.dashboard,
    })
    this.campaignsButton = this.page.getByRole('button', {
      name: this.translations.campaigns,
    })
    this.audienceButton = this.page.getByRole('button', {
      name: this.translations.campaigns_list.audience,
    })
    this.sideBarCollapseIcon = this.page.locator(
      "//button[contains(@class, 'Sidebar-module_collapseButton')]"
    )

    // Dashboard Locators
    this.upcomingMailDatesTitle = page
      .locator(
        `div:has-text("${this.translations.dashboard_page.upcoming_mail_dates}")`
      )
      .first()
    this.campaignPerformanceTitle = page
      .locator(
        `div:has-text("${this.translations.dashboard_page.campaign_performance}")`
      )
      .first()
  }

  /**
   * Navigate to the login page.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.bulkMailing.base}`)
  }

  async validateDashboardNavigation(): Promise<void> {
    await Allure.step('Click on the Dashboard Button', async () => {
      await this.dashboardButton.click()
    })
    await Allure.step('Collapse sidebar', async () => {
      await this.sideBarCollapseIcon.click()
    })
    await Allure.step(
      'Validate that Upcoming Mail Dates Title is Visible',
      async () => {
        await expect(this.upcomingMailDatesTitle).toBeVisible()
      }
    )
    await Allure.step(
      'Validate that Campaign Performance Title is Visible',
      async () => {
        await expect(this.campaignPerformanceTitle).toBeVisible()
      }
    )
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.bulkMailing.dashboard)
    })
  }

  async validateCampaignsNavigation(): Promise<void> {
    await Allure.step('Click on the Campaigns Button', async () => {
      await this.campaignsButton.click()
    })
    await Allure.step('Collapse sidebar', async () => {
      await this.sideBarCollapseIcon.click()
    })
    await Allure.step('Validate that Campaigns Title is Visible', async () => {
      const campaignsPageTitle = this.campaignsPage.getCampaignsPageTitle()
      await expect(campaignsPageTitle).toBeVisible()
    })
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.bulkMailing.campaigns.base)
    })
  }

  async validateAudienceNavigation(): Promise<void> {
    await Allure.step('Click on the Audience Button', async () => {
      await this.audienceButton.click()
    })
    await Allure.step('Collapse sidebar', async () => {
      await this.sideBarCollapseIcon.click()
    })
    await Allure.step('Validate that Audience Title is Visible', async () => {
      const audiencePageTitle = this.audiencePage.getAudiencePageTitle()
      await expect(audiencePageTitle).toBeVisible()
    })
    await Allure.step('Validate that URL is correct', async () => {
      await expect(this.page).toHaveURL(APP_URLS.bulkMailing.audience)
    })
  }
}
