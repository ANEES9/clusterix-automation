import { Page, Locator } from '@playwright/test'
import { Allure } from 'common/allure-helper'

export class TaskManagementPage {
  private page: Page
  private taskManagement: Locator
  private folders: Locator
  private addFolder: Locator
  private renameFolder: Locator
  private rename_fill: Locator
  private rename_enter: Locator
  private folder_click!: Locator
  private addBoard: Locator
  private renameBoard: Locator
  private board_fill: Locator
  private board_enter: Locator

  constructor(page: Page) {
    this.page = page
    this.taskManagement = page.getByRole('link', {
      name: 'Task Management Create and',
    })
    this.folders = page.getByRole('button', { name: 'My Pinboards' })
    this.addFolder = page.getByText('Add folder')
    this.renameFolder = page.locator('#scroll-area').getByRole('textbox')
    this.rename_fill = page.locator('#scroll-area').getByRole('textbox')
    this.rename_enter = page.locator('#scroll-area').getByRole('textbox')
    this.addBoard = page.getByText('Add pinboard')
    this.renameBoard = page.locator('#scroll-area').getByRole('textbox')
    this.board_fill = page.locator('#scroll-area').getByRole('textbox')
    this.board_enter = page.locator('#scroll-area').getByRole('textbox')
  }

  set saveXPath(path: string) {
    this.folder_click = this.page.getByText(path)
  }

  async navigateToTaskManagement() {
    await Allure.step(
      'should Navigate to Task Management when Task management button is clicked',
      async () => {
        await this.taskManagement.click()
      }
    )
  }

  async navigateToPinboardSection() {
    await Allure.step(
      'should navigate to the pinboard section after clicking the pinboard button',
      async () => {
        await this.folders.click()
      }
    )
  }

  async navigateToAddFolder() {
    await Allure.step(
      'should Navigate to add folder  button is clicked',
      async () => {
        await this.addFolder.click()
      }
    )
  }

  async navigateToRenameFolder() {
    await Allure.step('to rename the folder', async () => {
      await this.renameFolder.press('ControlOrMeta+a')
    })
  }

  async navigateToFillFolder(randomFileName: string) {
    //const randomFileName = 'newFolderName';
    await Allure.step('to rename the folder', async () => {
      await this.rename_fill.fill(randomFileName)
    })
  }

  async renameFolderAndSubmit() {
    await Allure.step('Folder name is renamed', async () => {
      await this.rename_enter.press('Enter')
    })
  }

  async clickOnFolder() {
    await Allure.step('click on folder', async () => {
      await this.folder_click.dblclick()
    })
  }

  async navigateToAddPinboard() {
    await Allure.step(
      'should navigate to add pinboard button is clicked',
      async () => {
        await this.addBoard.click()
      }
    )
  }

  async navigateToRenameBoard() {
    await Allure.step('to rename the board', async () => {
      await this.renameBoard.press('ControlOrMeta+a')
    })
  }

  async navigateToFillBoard(randomFileName: string) {
    await Allure.step('to rename the board', async () => {
      await this.board_fill.fill(randomFileName)
    })
  }

  async renameBoardAndSubmit() {
    await Allure.step('board is renamed', async () => {
      await this.board_enter.press('Enter')
    })
  }
}
