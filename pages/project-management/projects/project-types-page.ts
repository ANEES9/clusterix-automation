import { Locator, Page } from '@playwright/test'
import { APP_URLS } from 'config/constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class ProjectTypesPage {
  private page: Page
  private translations: Record<string, any>

  private newProjectTypeButton: Locator
  private titleInput: Locator
  private colorList: Locator
  private descriptionInput: Locator
  private selectWorkflowDropdown: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('pm', locale)

    this.newProjectTypeButton = page.getByRole('button', {
      name: this.translations.projectTypes.newProjectType,
    })
    this.titleInput = page.getByPlaceholder(
      this.translations.projectTypes.typeModal.titlePlaceholder
    )
    this.colorList = page.locator('span[class*="ColorItem-module_color"]')
    this.descriptionInput = page.getByPlaceholder(
      this.translations.projectTypes.typeModal.descriptionPlaceholder
    )
    this.selectWorkflowDropdown = page.getByPlaceholder(
      this.translations.projectTypes.typeModal.category
    )
  }

  /**
   * Navigate to the login page.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(
      `${baseURL}${APP_URLS.projectManagement.projects.projectTypes}`
    )
  }

  /**
   * Click the New Project Type button.
   */
  async clickNewProjectTypeButton() {
    await this.newProjectTypeButton.click()
  }

  /**
   * Fill the title input with a given title.
   * @param title - The title to enter.
   */
  async fillTitleInput(title: string) {
    await this.titleInput.fill(title)
  }

  /**
   * Select a color from the color list by index.
   * @param index - The index of the color to select.
   */
  async selectColorByIndex(index: number) {
    const colorCount = await this.colorList.count()
    if (index >= colorCount) {
      throw new Error(
        `Invalid index: ${index}. There are only ${colorCount} colors available.`
      )
    }
    await this.colorList.nth(index).click()
  }

  /**
   * Select a color by RGB value.
   * @param rgbValue - The RGB value of the color to select (e.g., 'rgb(113, 208, 242)').
   */
  async selectColorByRGB(rgbValue: string) {
    const colorElement = this.page.locator(
      `span[class*="ColorItem-module_color"][style*="background-color: ${rgbValue}"]`
    )
    if (!(await colorElement.isVisible())) {
      throw new Error(
        `Color with RGB value ${rgbValue} is not visible or does not exist.`
      )
    }
    await colorElement.click()
  }
}
