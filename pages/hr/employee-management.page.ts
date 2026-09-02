import { expect, Locator, Page, Request, Response } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { waitForPageReady } from 'common/page-ready-helper'
import { APP_URLS } from 'constants/app-urls'

export class EmployeeManagementPage {
  readonly page: Page
  private translations: Record<string, any>

  // ========================
  // Locator declarations
  // ========================

  // Page heading locators
  private headingTextLocator: Locator

  // Sidebar link locators
  private employeesSubLink: Locator
  private requestManagementSubLink: Locator
  private activityTypeSubLink: Locator
  private bonusAgreementSubLink: Locator
  private reassignmentsOverviewSubLink: Locator
  private vacationReportSubLink: Locator
  private changeOwnerSubLink: Locator

  // Sub-page heading locators
  private requestManagementHeading: Locator
  private activityTypeHeading: Locator
  private bonusAgreementHeading: Locator
  private reassignmentsOverviewHeading: Locator
  private vacationReportHeading: Locator
  private changeOwnerHeading: Locator
  private ticketOwnerTab: Locator
  private taskOwnerTab: Locator
  private boardOwnerTab: Locator

  // Employee profile locators
  private saveButtonLocator: Locator
  private editEmployeeLocator: Locator

  // ========================
  // Constructor
  // ========================
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)

    // Page heading locators
    this.headingTextLocator = page.getByRole('heading', {
      name: this.translations.additional.headingText,
    })

    // Sidebar link locators
    this.employeesSubLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.modules.employees })
    this.requestManagementSubLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.modules.requestManagement })
    this.activityTypeSubLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.modules.activityType })
    this.bonusAgreementSubLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.modules.bonusAgreement })
    this.reassignmentsOverviewSubLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.modules.reassignmentsOverview })
    this.vacationReportSubLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.modules.vacationReport })
    this.changeOwnerSubLink = page
      .getByRole('button')
      .filter({ hasText: this.translations.modules.changeOwner })

    // Sub-page heading locators
    this.requestManagementHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.modules.requestManagement })
      .first()
    this.activityTypeHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.modules.activityType })
      .first()
    this.bonusAgreementHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.modules.bonusAgreement })
      .first()
    this.reassignmentsOverviewHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.modules.reassignmentsOverview })
      .first()
    this.vacationReportHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.modules.vacationReport })
      .first()
    this.changeOwnerHeading = page
      .locator('strong, h1, h2, h3, div')
      .filter({ hasText: this.translations.modules.changeOwner })
      .first()
    this.ticketOwnerTab = page.getByRole('button', {
      name: this.translations.modules.ticketOwner,
    })
    this.taskOwnerTab = page.getByRole('button', {
      name: this.translations.modules.taskOwner,
    })
    this.boardOwnerTab = page.getByRole('button', {
      name: this.translations.modules.boardOwner,
    })

    // Employee profile locators
    this.saveButtonLocator = page
      .locator('div[class*="_footerRight_"]')
      .getByRole('button', {
        name: this.translations.literals.save,
        exact: true,
      })
    this.editEmployeeLocator = page.getByText(
      this.translations.additional.editEmployee
    )
  }

  // ========================
  // Navigation methods
  // ========================
  // Navigate directly to the Employee Management page.
  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    const cleanPath = APP_URLS.hr.employeeManagement.replace(/^\//, '')
    await Allure.step('should navigate to HR App', async () => {
      await this.page.goto(`${cleanBaseURL}/${cleanPath}`, {
        waitUntil: 'domcontentloaded',
      })
      await waitForPageReady(
        this.page,
        this.headingTextLocator,
        'Employee Management'
      )
    })
  }

  // Expand the Employee Management sidebar menu when it is collapsed.
  async expandEmployeeManagementMenu() {
    const isVisible = await this.employeesSubLink.isVisible()
    if (!isVisible) {
      const menuButton = this.page
        .getByRole('button')
        .filter({ hasText: this.translations.additional.headingText })
        .first()
      await menuButton.click()
      await this.page.waitForTimeout(500)
    }
  }

  // Navigate to the Employees sub-page.
  async navigateToEmployees() {
    await this.expandEmployeeManagementMenu()
    await this.employeesSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Navigate to the Request Management sub-page.
  async navigateToRequestManagement() {
    await this.expandEmployeeManagementMenu()
    await this.requestManagementSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Navigate to the Activity Type sub-page.
  async navigateToActivityType() {
    await this.expandEmployeeManagementMenu()
    await this.activityTypeSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Navigate to the Bonus Agreement sub-page.
  async navigateToBonusAgreement() {
    await this.expandEmployeeManagementMenu()
    await this.bonusAgreementSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Navigate to the Reassignments Overview sub-page.
  async navigateToReassignmentsOverview() {
    await this.expandEmployeeManagementMenu()
    await this.reassignmentsOverviewSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Navigate to the Vacation Report sub-page.
  async navigateToVacationReport() {
    await this.expandEmployeeManagementMenu()
    await this.vacationReportSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Navigate to the Change Owner sub-page.
  async navigateToChangeOwner() {
    await this.expandEmployeeManagementMenu()
    await this.changeOwnerSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // ========================
  // Verification methods
  // ========================
  // Verify the Employees sub-page is loaded.
  async verifyEmployeesPageLoads() {
    await this.headingTextLocator.waitFor({ state: 'visible', timeout: 300000 })
    await expect(this.page).toHaveURL(/.*\/employees(?!\/)/)
  }

  // Verify the Request Management sub-page is loaded.
  async verifyRequestManagementPageLoads() {
    await expect(this.page).toHaveURL(/.*request-management/)
    await this.requestManagementHeading.waitFor({ state: 'visible' })
    await expect(this.requestManagementHeading).toBeVisible()
  }

  // Verify the Activity Type sub-page is loaded.
  async verifyActivityTypePageLoads() {
    await expect(this.page).toHaveURL(/.*activity-type/)
    await this.activityTypeHeading.waitFor({ state: 'visible' })
    await expect(this.activityTypeHeading).toBeVisible()
  }

  // Verify the Bonus Agreement sub-page is loaded.
  async verifyBonusAgreementPageLoads() {
    await expect(this.page).toHaveURL(/.*bonus-agreement/)
    await this.bonusAgreementHeading.waitFor({ state: 'visible' })
    await expect(this.bonusAgreementHeading).toBeVisible()
  }

  // Verify the Reassignments Overview sub-page is loaded.
  async verifyReassignmentsOverviewPageLoads() {
    await expect(this.page).toHaveURL(/.*reassignments-overview/)
    await this.reassignmentsOverviewHeading.waitFor({ state: 'visible' })
    await expect(this.reassignmentsOverviewHeading).toBeVisible()
  }

  // Verify the Vacation Report sub-page is loaded.
  async verifyVacationReportPageLoads() {
    await expect(this.page).toHaveURL(/.*vacation-report/)
    await this.vacationReportHeading.waitFor({ state: 'visible' })
    await expect(this.vacationReportHeading).toBeVisible()
  }

  // Verify the Change Owner sub-page is loaded.
  async verifyChangeOwnerPageLoads() {
    await expect(this.page).toHaveURL(/.*\/hr\/employees\/change-owner/)
    await this.changeOwnerHeading.waitFor({ state: 'visible' })
    await expect(this.changeOwnerHeading).toBeVisible()
    await expect(this.ticketOwnerTab).toBeVisible()
    await expect(this.taskOwnerTab).toBeVisible()
    await expect(this.boardOwnerTab).toBeVisible()
  }
}
