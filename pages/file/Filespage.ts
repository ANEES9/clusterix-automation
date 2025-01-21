import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'config/constants/app-urls'

export class FilesPage {
  private page: Page

  // Locators
  private newButton: Locator
  private folderButton: Locator
  private cellButton: Locator
  private renameButton: Locator
  private trashButton: Locator
  private sharedWithMeButton: Locator
  private trashSectionButton: Locator
  private favoritesButton: Locator
  private themeIcon: Locator
  private firstElement: Locator
  private secondElement: Locator
  private notesInput: Locator
  private tagsSection: Locator
  private tagInput: Locator
  private tagByText: (tagName: string) => Locator
  //private skipTourButton: Locator;
  //private filesSectionLink: Locator;
  private uploadButton: Locator
  private fileInput: Locator

  constructor(page: Page) {
    this.page = page

    // Initialize locators
    this.newButton = this.page.getByRole('button', { name: 'New' })
    this.folderButton = this.page.getByRole('button', { name: 'Folder' })
    this.cellButton = this.page.getByRole('button', { name: 'Cell' })
    this.renameButton = this.page.getByRole('button', { name: 'Rename' })
    this.trashButton = this.page.locator(
      'tr:nth-child(2) > td:nth-child(6) > .fTrbfOFwnQNNmUXd5tm3'
    )
    this.sharedWithMeButton = this.page.getByRole('button', {
      name: 'Shared with me',
    })
    this.trashSectionButton = this.page.getByRole('button', { name: 'Trash' })
    this.favoritesButton = this.page.getByRole('button', { name: 'Favorites' })
    //this.skipTourButton = this.page.getByText('Skip tour');
    // this.filesSectionLink = this.page.getByRole('link', { name: 'Files All documents with easy' });

    this.themeIcon = page.locator('.ca-fill-theme > path').first()
    this.firstElement = page.locator('.fTrbfOFwnQNNmUXd5tm3').first()
    this.secondElement = page.locator('.d3nSvjOkwaugosP9qnnw').first()
    this.notesInput = page.getByPlaceholder('Enter notes here')
    this.tagsSection = page
      .locator('div')
      .filter({ hasText: /^TagsEnter tags$/ })
      .nth(1)
    this.tagInput = page.getByRole('textbox', {
      name: 'Enter tag and press enter',
    })
    this.tagByText = (tagName: string) => page.getByText(tagName)

    this.uploadButton = this.page
      .locator('div')
      .filter({ hasText: /^Upload file$/ })
      .nth(1)
    this.fileInput = this.page.locator('input[type="file"]')
  }

  private async waitAndClick(locator: Locator, timeout = 100000) {
    await locator.waitFor({ timeout })
    await locator.click()
  }

  // Methods

  //async skipTour() {
  //await this.waitAndClick(this.skipTourButton);
  // }

  //async navigateToFilesSection() {
  // await this.waitAndClick(this.filesSectionLink, 90000);
  //await expect(this.page).toHaveURL('https://clusterix.io/cluster-space');
  //await this.page.waitForTimeout(8000);
  //}

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Files URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.files.base}`)
    })
  }

  async clickNewButton() {
    await this.newButton.click()
  }

  async clickFolderButton() {
    await this.folderButton.click()
  }

  async clickCellButton() {
    await this.cellButton.click()
  }

  async renameItem(name: string) {
    await this.renameButton.click()
    const textBox = this.page.getByRole('textbox').nth(1)
    await textBox.fill(name)
    await textBox.press('Enter')
  }

  async deleteItem() {
    await this.trashButton.click()
  }

  async navigateToSharedWithMe() {
    await this.sharedWithMeButton.click()
  }

  async navigateToTrash() {
    await this.trashSectionButton.click()
  }

  async navigateToFavorites() {
    await this.favoritesButton.click()
  }

  async clickThemeIcon() {
    await this.themeIcon.click()
  }

  async clickFirstElement() {
    await this.firstElement.click()
  }

  async clickSecondElement() {
    await this.secondElement.click()
  }

  async enterNotes(note: string) {
    await this.notesInput.click()
    await this.notesInput.fill(note)
  }

  async addTag(tagName: string) {
    await this.tagsSection.click()
    await this.tagInput.click()
    await this.tagInput.fill(tagName)
    await this.tagInput.press('Enter')
  }

  // async selectTag(tagName: string) {
  // await this.tagByText(tagName).click();
  //}

  async clickUploadButton() {
    await this.uploadButton.click()
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath)
  }

  async verifyFileUploaded(fileName: string) {
    const uploadedFile = this.page.locator(`text=${fileName}`)
    await uploadedFile.waitFor({ state: 'visible' })
    return uploadedFile.isVisible()
  }
}
