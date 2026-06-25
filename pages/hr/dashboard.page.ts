import { Page, Locator, expect } from '@playwright/test'
import { getTranslations } from '../../helpers/common/get-translations-helper'
import { Allure } from '../../helpers/common/allure-helper'
import { APP_URLS } from '../../shared/constants/app-urls'
import { APP_NAMES } from '../../shared/constants/app-names'

export class DashboardPage {
  readonly page: Page
  private translations: Record<string, any>

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
  private otherRequestNowButton: Locator

  // Violations
  private violationsSection: Locator
  private maxHoursViolation: Locator
  private minRestViolation: Locator
  private minBreakViolation: Locator

  // Sidebar navigation
  private myAbsenceDaysLink: Locator
  private recruitmentStatisticsLink: Locator
  private employeeRetentionLink: Locator
  private companyGrowthLink: Locator
  private birthdayInformationLink: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)


    // Heading
    this.dashboardHeading = page.locator("//strong[contains(text(),'Dashboard')]")

    // Cards — locate by card title text
    this.vacationDaysCard = page.getByText(this.translations.dashboard.vacationDays).first()
    this.sickLeaveCard = page.getByText(this.translations.dashboard.sickLeave).first()
    this.employeeRequestsCard = page.getByText(this.translations.dashboard.employeeRequests).first()
    this.homeOfficeCard = page.getByText(this.translations.dashboard.homeOffice).first()
    this.otherCard = page.getByText(this.translations.dashboard.other).first()

    // Buttons
    this.vacationRequestNowButton = page.getByRole('button', { name: this.translations.dashboard.requestNow }).first()
    this.sickLeaveReportNowButton = page.getByRole('button', { name: this.translations.dashboard.reportNow })
    this.homeOfficeRequestNowButton = page.getByRole('button', { name: this.translations.dashboard.requestNow }).nth(1)
    this.otherRequestNowButton = page.getByRole('button', { name: this.translations.dashboard.requestNow }).nth(2)

    // Violations
    this.violationsSection = page.getByText(this.translations.dashboard.violations).first()
    this.maxHoursViolation = page.getByText(this.translations.dashboard.maxHoursViolation)
    this.minRestViolation = page.getByText(this.translations.dashboard.minRestViolation)
    this.minBreakViolation = page.getByText(this.translations.dashboard.minBreakViolation)

    // Sidebar links
    this.myAbsenceDaysLink = page.getByRole('button').filter({ hasText: this.translations.dashboard.myAbsenceDays })
    this.recruitmentStatisticsLink = page.getByRole('button').filter({ hasText: this.translations.dashboard.recruitmentStatistics })
    this.employeeRetentionLink = page.getByRole('button').filter({ hasText: this.translations.dashboard.employeeRetention })
    this.companyGrowthLink = page.getByRole('button').filter({ hasText: this.translations.dashboard.companyGrowth })
    this.birthdayInformationLink = page.getByRole('button').filter({ hasText: this.translations.dashboard.birthdateInformation })
  }

  // --- Navigation ---
  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    await Allure.step('Navigate to HR Dashboard', async () => {
      await this.page.goto(`${cleanBaseURL}/${APP_URLS.hr.dashboard}`)
    })
  }

  // --- Verification Methods ---
  async verifyDashboardPageLoads() {
    await this.dashboardHeading.waitFor({ state: 'visible', timeout: 180000 })
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

  async verifyMyAbsenceDaysPageLoads() {
    await expect(this.page).toHaveURL(/.*dashboard/)
    const headingText = this.translations.dashboard.myAbsenceDays
    const heading = this.page.locator('strong, h1, h2, h3, div').filter({ hasText: headingText }).first()
    await heading.waitFor({ state: 'visible', timeout: 30000 })
    await expect(heading).toBeVisible()
  }

  async verifyRecruitmentStatisticsPageLoads() {
    await expect(this.page).toHaveURL(/.*recruitment-statistics/)
    const headingText = this.translations.dashboard.recruitmentStatistics
    const heading = this.page.locator('strong, h1, h2, h3, div').filter({ hasText: headingText }).first()
    await heading.waitFor({ state: 'visible', timeout: 30000 })
    await expect(heading).toBeVisible()
  }

  async verifyEmployeeRetentionPageLoads() {
    await expect(this.page).toHaveURL(/.*employee-retention/)
    const headingText = this.translations.dashboard.employeeRetention
    const heading = this.page.locator('strong, h1, h2, h3, div').filter({ hasText: headingText }).first()
    await heading.waitFor({ state: 'visible', timeout: 30000 })
    await expect(heading).toBeVisible()
  }

  async verifyCompanyGrowthPageLoads() {
    await expect(this.page).toHaveURL(/.*company-growth/)
    const headingText = this.translations.dashboard.companyGrowth
    const heading = this.page.locator('strong, h1, h2, h3, div').filter({ hasText: headingText }).first()
    await heading.waitFor({ state: 'visible', timeout: 30000 })
    await expect(heading).toBeVisible()
  }

  async verifyBirthdayInformationPageLoads() {
    await expect(this.page).toHaveURL(/.*birthdate-information/)
    const headingText = this.translations.dashboard.birthdateInformation
    const heading = this.page.locator('strong, h1, h2, h3, div').filter({ hasText: headingText }).first()
    await heading.waitFor({ state: 'visible', timeout: 30000 })
    await expect(heading).toBeVisible()
  }

  // --- Sidebar Navigation ---
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

  async navigateToCompanyGrowth() {
    await this.companyGrowthLink.click()
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
    await expect(this.companyGrowthLink).toBeVisible()
    await expect(this.birthdayInformationLink).toBeVisible()
  }

  // --- Actions ---
  async clickVacationRequestNow() {
    await this.vacationRequestNowButton.click()
    await this.page.waitForLoadState('networkidle')
  }

  async clickSickLeaveReportNow() {
    await this.sickLeaveReportNowButton.click()
    await this.page.waitForLoadState('networkidle')
  }
}
