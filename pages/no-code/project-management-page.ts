import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class ProjectManagementPage {
  private page: Page
  private translations: Record<string, any>

  public projectManagementTitle: Locator

  private searchInput: Locator
  private firstItemName: string = ''

  //Table Items
  private firstItemLocator: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('no-code', locale)

    this.projectManagementTitle = this.page.locator(
      `span:has-text('${this.translations.workflow_apps['3'].label}')`
    )

    //Table Items
    this.firstItemLocator = page.locator(
      'tbody tr:first-child span._text_1cq82_100._bold_1cq82_124'
    )

    //Table Items
    this.firstItemLocator = page.locator(
      'tbody tr:first-child span._text_1cq82_100._bold_1cq82_124'
    )

    //Search
    this.searchInput = page.locator(
      `input[placeholder="${this.translations.search_for_workflows}"]`
    )
  }

  /**
   * Navigate to the No Code Project Management.
   * @param baseURL - The base URL of the application.
   */
  async gotoProjectManagement(baseURL: string | undefined) {
    await this.page.goto(`${baseURL}${APP_URLS.noCode.projectManagement.base}`)
    await this.page.waitForLoadState('networkidle')
    await expect(this.projectManagementTitle).toBeVisible()
  }

  getNoCodeProjectManagementTitle(): Locator {
    return this.projectManagementTitle
  }

  getSearchResult(): Locator {
    return this.page.locator(`tbody tr:has-text("${this.firstItemName}")`)
  }

  async validatePageTitle() {
    await expect(this.projectManagementTitle).toBeVisible()
  }

  async searchFirstItem() {
    this.firstItemName = await this.firstItemLocator.innerText()
    await this.searchInput.fill(this.firstItemName)
    const searchResults = this.getSearchResult()
    const resultCount = await searchResults.count()
    expect(resultCount).toBeGreaterThan(0)
  }
}
