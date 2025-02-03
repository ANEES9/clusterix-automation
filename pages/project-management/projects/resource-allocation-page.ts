import { Locator, Page, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class ResourceAllocation {
  private page: Page
  private translations: Record<string, any>
  private textLocator: Locator
  private navigationButton: Locator
  private allProjectsFilter: Locator
  private validateDropdown: Locator
  private firstProject: Locator
  private projectListVisible: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('pm', locale)
    this.textLocator = page.locator('//*[@class="pp25_iayy8XC2f7IU9mr"]//span')
    this.navigationButton = page.locator('span:nth-child(5)')
    this.allProjectsFilter = page.getByPlaceholder('All projects')
    this.validateDropdown = page.getByRole('textbox', {
      name: 'Search',
      exact: true,
    })
    this.firstProject = page.locator('._listItem__name_cx3fq_23').nth(0)
    this.projectListVisible = page.getByText('Assigned employees')
  }
  async goto(baseURL: string | undefined) {
    await Allure.step(
      'Navigate to project management personnel allocation',
      async () => {
        await this.page.goto(
          `${baseURL}${APP_URLS.projectManagement.projects.resourceAllocation}`
        )
      }
    )
  }

  async clcikAllProjectsFilter() {
    await Allure.step(
      'Click all projects filter in personnel allocation',
      async () => {
        await this.page.waitForLoadState('networkidle')
        this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForTimeout(1000)
        await this.allProjectsFilter.click({ force: true })
        expect(this.validateDropdown).toBeVisible()
      }
    )
  }

  async validateAllProjectsFilter() {
    await Allure.step(
      'Validate selected project is visible in the main page',
      async () => {
        await this.firstProject.click()
        expect(this.projectListVisible).toBeVisible()
      }
    )
  }
}
