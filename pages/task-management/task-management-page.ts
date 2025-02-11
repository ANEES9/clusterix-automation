import { Page, Locator } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'

export class TaskManagementPage {
  private page: Page
  translations: Record<string, any>

  private taskManagement: Locator
  private pinboardFolders: Locator
  private addFolderButton: Locator
  private renameFolderInput: Locator
  private renameFolderFill: Locator
  private renameFolderSubmit: Locator
  private folderDoubleClick!: Locator
  private folderRightClick!: Locator
  private renameOption: Locator
  private deleteFolderOption: Locator
  private confirmDeletePopup: Locator
  private addPinboardButton: Locator
  private renamePinboardInput: Locator
  private pinboardRenameFill: Locator
  private pinboardRenameSubmit: Locator
  private pinboardDoubleClick!: Locator
  private pinboardRightClick: Locator
  private renamePinboardOption: Locator
  private deletePinboardOption: Locator
  private addStatusButton: Locator
  private statusNameInput: Locator
  private statusNameSubmit: Locator
  private addTaskButton: Locator
  private taskNameInput: Locator
  private taskNameSubmit: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('task-management', locale)
    this.taskManagement = page.getByRole('link', {
      name: 'Task Management Create and',
    })
    this.pinboardFolders = page.getByRole('button', { name: 'My Pinboards' })
    this.addFolderButton = page.getByText('Add folder')
    this.renameFolderInput = page.locator('#scroll-area').getByRole('textbox')
    this.renameFolderFill = page.locator('#scroll-area').getByRole('textbox')
    this.renameFolderSubmit = page.locator('#scroll-area').getByRole('textbox')
    this.renameOption = page.getByText('Rename', { exact: true })
    this.deleteFolderOption = page.getByText('Delete')
    this.confirmDeletePopup = page.getByRole('button', { name: 'Delete' })
    this.addPinboardButton = page.getByText('Add pinboard')
    this.renamePinboardInput = page.locator('#scroll-area').getByRole('textbox')
    this.pinboardRenameFill = page.locator('#scroll-area').getByRole('textbox')
    this.pinboardRenameSubmit = page
      .locator('#scroll-area')
      .getByRole('textbox')
    this.pinboardRightClick = page.locator('#scroll-area').getByRole('img')
    this.renamePinboardOption = page.getByText('Rename', { exact: true })
    this.deletePinboardOption = page.getByText('Delete')
    this.addStatusButton = page.getByRole('button', { name: 'New Status' })
    this.statusNameInput = page.getByPlaceholder('Status Name')
    this.statusNameSubmit = page.getByPlaceholder('Status Name')
    this.addTaskButton = page.getByRole('button', { name: 'Add Task' })
    this.taskNameInput = page.getByPlaceholder('Task Name')
    this.taskNameSubmit = page.getByPlaceholder('Task Name')
  }

  set saveXPath(path: string) {
    this.folderDoubleClick = this.page.getByText(path)
  }

  set saveXPathPinboard(path: string) {
    this.pinboardDoubleClick = this.page.getByText(path)
  }

  set saveXPathRightClickFolder(path: string) {
    this.folderRightClick = this.page.getByText(path)
  }

  async navigateToTaskManagement() {
    await Allure.step(
      'should navigate to task management when task management button is clicked',
      async () => {
        await this.taskManagement.click()
      }
    )
  }

  async navigateToPinboardSection() {
    await Allure.step(
      'should navigate to the pinboard section after clicking the pinboard button',
      async () => {
        await this.pinboardFolders.click()
      }
    )
  }

  async navigateToAddFolder() {
    await Allure.step(
      'should navigate to add folder button is clicked',
      async () => {
        await this.addFolderButton.click()
      }
    )
  }

  async navigateToRenameFolder() {
    await Allure.step('to rename the folder', async () => {
      await this.renameFolderInput.press('ControlOrMeta+a')
    })
  }

  async navigateToFillFolder(randomFileName: string) {
    await Allure.step('to rename the folder', async () => {
      await this.renameFolderFill.fill(randomFileName)
    })
  }

  async renameFolderAndSubmit() {
    await Allure.step('folder name is renamed', async () => {
      await this.renameFolderSubmit.press('Enter')
    })
  }

  async clickOnFolder() {
    await Allure.step('click on folder', async () => {
      await this.folderDoubleClick.dblclick()
    })
  }

  async rightClickOnFolder() {
    await Allure.step('right click on folder', async () => {
      await this.folderRightClick.click({ button: 'right' })
    })
  }

  async renameFolder() {
    await Allure.step('rename folder', async () => {
      await this.renameOption.click()
    })
  }

  async deleteFolder() {
    await Allure.step('delete folder', async () => {
      await this.deleteFolderOption.click()
    })
  }

  async confirmDelete() {
    await Allure.step('confirm deletion', async () => {
      await this.confirmDeletePopup.click()
    })
  }

  async navigateToAddPinboard() {
    await Allure.step(
      'should navigate to add pinboard button is clicked',
      async () => {
        await this.addPinboardButton.click()
      }
    )
  }

  async navigateToRenameBoard() {
    await Allure.step('to rename the board', async () => {
      await this.renamePinboardInput.press('ControlOrMeta+a')
    })
  }

  async navigateToFillBoard(randomFileName: string) {
    await Allure.step('to rename the board', async () => {
      await this.pinboardRenameFill.fill(randomFileName)
    })
  }

  async renameBoardAndSubmit() {
    await Allure.step('board is renamed', async () => {
      await this.pinboardRenameSubmit.press('Enter')
    })
  }

  async clickOnBoard() {
    await Allure.step('click on board', async () => {
      await this.pinboardDoubleClick.dblclick()
    })
  }

  async rightClickOnBoard() {
    await Allure.step('right click on board', async () => {
      await this.pinboardRightClick.first().click({ button: 'right' })
    })
  }

  async renameBoard() {
    await Allure.step('rename board', async () => {
      await this.renamePinboardOption.click()
    })
  }

  async deleteBoard() {
    await Allure.step('delete pinboard', async () => {
      await this.deletePinboardOption.click()
    })
  }

  async navigateToAddStatus() {
    await Allure.step(
      'should navigate to add status button is clicked',
      async () => {
        await this.addStatusButton.click()
      }
    )
  }

  async navigateToFillStatus(randomFileName: string) {
    await Allure.step('to name the status', async () => {
      await this.statusNameInput.fill(randomFileName)
    })
  }

  async statusSubmit() {
    await Allure.step('status is named', async () => {
      await this.statusNameSubmit.press('Enter')
    })
  }

  async navigateToAddTask() {
    await Allure.step(
      'should navigate to add task button is clicked',
      async () => {
        await this.addTaskButton.click()
      }
    )
  }

  async navigateToFillTask(randomFileName: string) {
    await Allure.step('to name the task', async () => {
      await this.taskNameInput.fill(randomFileName)
    })
  }

  async taskSubmit() {
    await Allure.step('task is named', async () => {
      await this.taskNameSubmit.press('Enter')
    })
  }
}
