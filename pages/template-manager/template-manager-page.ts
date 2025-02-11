import { Page, Locator } from '@playwright/test'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'

export class TemplateManagerPage {
  private page: Page
  translations: Record<string, any>

  // Define locators for different elements in the page
  public templateManagerLink: Locator
  public newTemplateButton: Locator
  public templateSizeButtonA3: Locator
  public templateSizeButtonA4: Locator
  public templateSizeButtonA5: Locator
  public editor: Locator
  public createTemplate: Locator
  public successToast: Locator
  public templateTitleFieldButton: Locator
  public templateDescriptionField: Locator
  public templateTagField: Locator
  public tagSelection: Locator
  public selectPageSizeDropdown: Locator
  public templateTitleField: Locator
  public saveButton: Locator
  public deleteButton: Locator
  public deleteButtonPrompt: Locator
  public sideBarCollapse: Locator
  public searchField: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('template-manager', locale)

    this.saveButton = this.page.getByRole('button', { name: 'Save' }).first()
    this.selectPageSizeDropdown = this.page.getByRole('button', {
      name: 'A4 (8.3x11.7 inch)',
    })
    // Initialize locators for various buttons, fields, and sections
    this.templateManagerLink = this.page.getByRole('link', {
      name: 'Template Manager Easily',
    })
    this.newTemplateButton = this.page.getByRole('button', {
      name: 'New Template',
    })
    this.templateSizeButtonA3 = this.page
      .locator('div')
      .filter({ hasText: /^A3 \(11\.7x16\.5 inch\)$/ })
    this.templateSizeButtonA4 = this.page
      .locator('div')
      .filter({ hasText: /^A4 \(8\.3x11\.7 inch\)$/ })
    this.templateSizeButtonA5 = this.page
      .locator('div')
      .filter({ hasText: /^A5 \(5\.8x8\.3 inch\)$/ })
    this.editor = this.page.locator('#root section div').first()
    this.createTemplate = this.page.getByRole('button', {
      name: 'Create Template',
    })
    this.successToast = this.page.getByText('Template successfully updated')
    this.templateTitleFieldButton = this.page.getByText('Untitled Template')
    this.templateTitleField = this.page.getByPlaceholder('Untitled Template')
    this.templateDescriptionField =
      this.page.getByPlaceholder('Add description...')
    this.templateTagField = this.page.getByPlaceholder(
      'Enter tag and press Enter'
    )
    this.tagSelection = this.page.locator(
      '.CSy9VRnimbLS3JrnWJq7 > .ca-max-h-64 > div:nth-child(6)'
    )
    this.deleteButton = this.page.getByRole('button', { name: 'Delete' })
    this.deleteButtonPrompt = this.page.getByText('Delete')
    this.sideBarCollapse = this.page.locator(
      '.Sidebar-module_collapseButton__1NSyf'
    )
    this.searchField = this.page.getByPlaceholder('Search by template')
  }

  /**
   * Navigate to the invoices.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}${APP_URLS.templateManager.base}`)
  }
}
