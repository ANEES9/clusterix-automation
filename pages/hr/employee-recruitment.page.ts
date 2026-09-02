import { expect, Locator, Page } from '@playwright/test'
import { Allure } from '../../helpers/common/allure-helper'
import { getTranslations } from '../../helpers/common/get-translations-helper'
import { waitForPageReady } from '../../helpers/common/page-ready-helper'
import { APP_URLS } from '../../shared/constants/app-urls'

export class EmployeeRecruitmentPage {
  readonly page: Page
  private translations: Record<string, any>

  // Locator declarations
  // Page headings
  private openPositionHeadingText: Locator
  private candidateListHeadingText: Locator

  // Sidebar links
  private openPositionsSubLink: Locator
  private linkedInSearchSubLink: Locator
  private apolloSearchSubLink: Locator
  private lushaSearchSubLink: Locator
  private candidateListSubLink: Locator

  // Sidebar menu
  private recruitmentMenuButton: Locator

  // Sub-page headings
  private linkedInSearchHeading: Locator
  private apolloSearchHeading: Locator
  private lushaSearchHeading: Locator

  // Constructor
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)

    // Page headings
    this.openPositionHeadingText = page.getByRole('heading', {
      name: this.translations.modules.openPositions,
    })
    this.candidateListHeadingText = page.getByText(
      this.translations.modules.candidates,
      {
        exact: true,
      }
    )

    // Sidebar links
    this.openPositionsSubLink = page
      .locator('button[class*="sidebarSubMenu"]')
      .filter({ hasText: this.translations.modules.openPositions })
    this.linkedInSearchSubLink = page
      .locator('button[class*="sidebarSubMenu"]')
      .filter({ hasText: this.translations.modules.linkedInSearch })
    this.apolloSearchSubLink = page
      .locator('button[class*="sidebarSubMenu"]')
      .filter({ hasText: this.translations.modules.apolloSearch })
    this.lushaSearchSubLink = page
      .locator('button[class*="sidebarSubMenu"]')
      .filter({ hasText: this.translations.modules.lushaSearch })
    this.candidateListSubLink = page
      .locator('button[class*="sidebarSubMenu"]')
      .filter({ hasText: this.translations.modules.candidateList })

    // Sidebar menu
    this.recruitmentMenuButton = page
      .getByRole('button')
      .filter({ hasText: this.translations.modules.employeeRecruitment })
      .first()

    // Sub-page headings
    this.linkedInSearchHeading = page
      .locator('h1, h2, h3, strong')
      .filter({ hasText: this.translations.modules.linkedInSearch })
      .first()
    this.apolloSearchHeading = page
      .locator('h1, h2, h3, strong')
      .filter({ hasText: this.translations.modules.apolloSearch })
      .first()
    this.lushaSearchHeading = page
      .locator('h1, h2, h3, strong')
      .filter({ hasText: this.translations.modules.lushaSearch })
      .first()
  }

  // Navigation methods
  async goto(baseURL: string | undefined) {
    const cleanBaseURL = (baseURL || '').replace(/\/$/, '')
    const cleanPath = APP_URLS.hr.openPosition.replace(/^\//, '')
    await Allure.step('should navigate to open positions', async () => {
      await this.page.goto(`${cleanBaseURL}/${cleanPath}`, {
        waitUntil: 'domcontentloaded',
      })

      if (!/\/hr\/candidates\/open-positions/.test(this.page.url())) {
        await this.page.goto(`${cleanBaseURL}/${cleanPath}`, {
          waitUntil: 'domcontentloaded',
        })
      }
      await waitForPageReady(
        this.page,
        this.openPositionHeadingText,
        'Employee Recruitment'
      )
    })
  }

  async expandEmployeeRecruitmentMenu() {
    await this.openPositionsSubLink.waitFor({
      state: 'visible',
      timeout: 300000,
    })
    const isVisible = await this.openPositionsSubLink.isVisible()
    if (!isVisible) {
      await this.recruitmentMenuButton.click()
      await this.page.waitForTimeout(500)
    }
  }

  async navigateToOpenPositions() {
    await this.expandEmployeeRecruitmentMenu()
    await this.openPositionsSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async navigateToLinkedInSearch() {
    await this.expandEmployeeRecruitmentMenu()
    await this.linkedInSearchSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async navigateToApolloSearch() {
    await this.expandEmployeeRecruitmentMenu()
    await this.apolloSearchSubLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async navigateToLushaSearch() {
    await this.expandEmployeeRecruitmentMenu()
    await this.lushaSearchSubLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async navigateToCandidateList() {
    await this.expandEmployeeRecruitmentMenu()
    await this.candidateListSubLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Verification methods
  async verifyOpenPositionsPageLoads() {
    await expect(this.page).toHaveURL(/.*\/open-positions(?!\/search)/)
    await this.openPositionHeadingText.waitFor({
      state: 'visible',
      timeout: 300000,
    })
    await expect(this.openPositionHeadingText).toBeVisible()
  }

  async verifyLinkedInSearchPageLoads() {
    await expect(this.page).toHaveURL(/.*\/open-positions\/search/)
    await this.linkedInSearchHeading.waitFor({ state: 'visible' })
    await expect(this.linkedInSearchHeading).toBeVisible()
  }

  async verifyApolloSearchPageLoads() {
    await expect(this.page).toHaveURL(/.*\/apollo\/search/)
    await this.apolloSearchHeading.waitFor({ state: 'visible' })
    await expect(this.apolloSearchHeading).toBeVisible()
  }

  async verifyLushaSearchPageLoads() {
    await expect(this.page).toHaveURL(/.*\/lusha\/search/)
    await this.lushaSearchHeading.waitFor({ state: 'visible' })
    await expect(this.lushaSearchHeading).toBeVisible()
  }

  async verifyCandidateListPageLoads() {
    await expect(this.page).toHaveURL(/.*\/candidate-list/)
    await expect(this.candidateListHeadingText).toBeVisible()
  }
}
