import { Page, Locator, expect } from '@playwright/test'
import { getTranslations } from '../../helpers/common/get-translations-helper'
import { waitForPageReady } from '../../helpers/common/page-ready-helper'
import { Allure } from '../../helpers/common/allure-helper'
import { APP_URLS } from '../../shared/constants/app-urls'
import { APP_NAMES } from '../../shared/constants/app-names'

export class HrDashboardPage {
  readonly page: Page
  private translations: Record<string, any>

  // Locator declarations
  // Heading
  private dashboardHeading: Locator

  // Cards
  private vacationDaysCard: Locator
  private sickLeaveCard: Locator
  private employeeRequestsCard: Locator
  private homeOfficeCard: Locator
  private otherCard: Locator

  // Buttons
  private vacationRequestNowButton: Locator
  private sickLeaveReportNowButton: Locator
  private homeOfficeRequestNowButton: Locator

  // Violations
  private violationsSection: Locator
  private maxHoursViolation: Locator
  private minRestViolation: Locator
  private minBreakViolation: Locator

  // Sidebar links
  private myAbsenceDaysLink: Locator
  private recruitmentStatisticsLink: Locator
  private employeeRetentionLink: Locator
  private headcountDevelopmentLink: Locator
  private birthdayInformationLink: Locator

  // Sub-page headings
  private myAbsenceDaysHeading: Locator
  private recruitmentStatisticsHeading: Locator
  private employeeRetentionHeading: Locator
  private headcountDevelopmentHeading: Locator
  private birthdayInformationHeading: Locator

  // Constructor
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)

    // Heading
    this.dashboardHeading = page
      .locator('strong, h1, h2, h3')
      .filter({ hasText: this.translations.dashboard.heading })
      .first()

    // Cards — locate by card title text
    this.vacationDaysCard = page
      .getByText(this.translations.dashboard.vacationDays)
      .first()
    this.sickLeaveCard = page
      .getByText(this.translations.dashboard.sickLeave)
      .first()
    this.employeeRequestsCard = page
      .getByText(this.translations.dashboard.employeeRequests)
      .first()
    this.homeOfficeCard = page
      .getByText(this.translations.dashboard.homeOffice)
      .first()
    this.otherCard = page.getByText(this.translations.dashboard.other).first()

    // Buttons
    this.vacationRequestNowButton = page
      .getByRole('button', { name: this.translations.dashboard.requestNow })
      .first()
    this.sickLeaveReportNowButton = page.getByRole('button', {
      name: this.translations.dashboard.reportNow,
    })
    this.homeOfficeRequestNowButton = page
      .getByRole('button', { name: this.translations.dashboard.requestNow })
      .nth(1)

    // Violations
    this.violationsSection = page
      .getByText(this.translations.dashboard.violations)
      .first()
    this.maxHoursViolation = page.getByText(
      this.translations.dashboard.maxHoursViolation
    )
    this.minRestViolation = page.getByText(
      this.translations.dashboard.minRestViolation
    )
    this.minBreakViolation = page.getByText(
      this.translations.dashboard.minBreakViolation
    )

    // Sidebar links
    this.myAbsenceDaysLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.dashboard.myAbsenceDays })
    this.recruitmentStatisticsLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.dashboard.recruitmentStatistics })
    this.employeeRetentionLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.dashboard.employeeRetention })
    this.headcountDevelopmentLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.dashboard.companyGrowth })
    this.birthdayInformationLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.dashboard.birthdateInformation })

    // Subpage Headings
    this.myAbsenceDaysHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.dashboard.myAbsenceDays })
      .first()
    this.recruitmentStatisticsHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.dashboard.recruitmentStatistics })
      .first()
    this.employeeRetentionHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.dashboard.employeeRetention })
      .first()
    this.headcountDevelopmentHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.dashboard.companyGrowth })
      .first()
    this.birthdayInformationHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.dashboard.birthdateInformation })
      .first()
  }

  // Navigation methods
  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('Navigate to HR Dashboard', async () => {
      await this.page.goto(`${cleanBaseURL}/${APP_URLS.hr.dashboard}`, {
        waitUntil: 'domcontentloaded',
      })
      await waitForPageReady(this.page, this.dashboardHeading, 'HR Dashboard')
    })
  }

  // Verification methods
  async verifyHrDashboardPageLoads() {
    await this.dashboardHeading.waitFor({ state: 'visible', timeout: 300000 })
    await expect(this.dashboardHeading).toBeVisible()
  }

  async verifyAllCardsVisible() {
    await expect(this.vacationDaysCard).toBeVisible()
    await expect(this.sickLeaveCard).toBeVisible()
    await expect(this.employeeRequestsCard).toBeVisible()
    await expect(this.homeOfficeCard).toBeVisible()
    await expect(this.otherCard).toBeVisible()
  }

  async verifyViolationsSection() {
    await expect(this.violationsSection).toBeVisible()
    await expect(this.maxHoursViolation).toBeVisible()
    await expect(this.minRestViolation).toBeVisible()
    await expect(this.minBreakViolation).toBeVisible()
  }

  async verifyRequestButtons() {
    await expect(this.vacationRequestNowButton).toBeVisible()
    await expect(this.sickLeaveReportNowButton).toBeVisible()
    await expect(this.homeOfficeRequestNowButton).toBeVisible()
  }

  // Subpage verification methods
  async verifyMyAbsenceDaysPageLoads() {
    await expect(this.page).toHaveURL(/.*dashboard/)
    await this.myAbsenceDaysHeading.waitFor({
      state: 'visible',
      timeout: 30000,
    })
    await expect(this.myAbsenceDaysHeading).toBeVisible()
  }

  async verifyRecruitmentStatisticsPageLoads() {
    await expect(this.page).toHaveURL(/.*recruitment-statistics/)
    await this.recruitmentStatisticsHeading.waitFor({
      state: 'visible',
      timeout: 30000,
    })
    await expect(this.recruitmentStatisticsHeading).toBeVisible()
  }

  async verifyEmployeeRetentionPageLoads() {
    await expect(this.page).toHaveURL(/.*employee-retention/)
    await this.employeeRetentionHeading.waitFor({
      state: 'visible',
      timeout: 30000,
    })
    await expect(this.employeeRetentionHeading).toBeVisible()
  }

  async verifyHeadcountDevelopmentPageLoads() {
    await expect(this.page).toHaveURL(
      /.*(company-growth|headcount-development)/
    )
    await this.headcountDevelopmentHeading.waitFor({
      state: 'visible',
      timeout: 30000,
    })
    await expect(this.headcountDevelopmentHeading).toBeVisible()
  }

  async verifyBirthdayInformationPageLoads() {
    await expect(this.page).toHaveURL(/.*birthdate-information/)
    await this.birthdayInformationHeading.waitFor({
      state: 'visible',
      timeout: 30000,
    })
    await expect(this.birthdayInformationHeading).toBeVisible()
  }

  // Sidebar navigation methods
  async navigateToMyAbsenceDays() {
    await this.myAbsenceDaysLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async navigateToRecruitmentStatistics() {
    await this.recruitmentStatisticsLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async navigateToEmployeeRetention() {
    await this.employeeRetentionLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async navigateToHeadcountDevelopment() {
    await this.headcountDevelopmentLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async navigateToBirthdayInformation() {
    await this.birthdayInformationLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async verifySidebarLinksVisible() {
    await expect(this.myAbsenceDaysLink).toBeVisible()
    await expect(this.recruitmentStatisticsLink).toBeVisible()
    await expect(this.employeeRetentionLink).toBeVisible()
    await expect(this.headcountDevelopmentLink).toBeVisible()
    await expect(this.birthdayInformationLink).toBeVisible()
  }

  // Action methods
  async clickVacationRequestNow() {
    await this.vacationRequestNowButton.click()
    await this.page.waitForLoadState('networkidle')
  }

  async clickSickLeaveReportNow() {
    await this.sickLeaveReportNowButton.click()
    await this.page.waitForLoadState('networkidle')
  }
}
