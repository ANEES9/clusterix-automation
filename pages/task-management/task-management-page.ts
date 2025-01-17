import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { generateRandomFileName } from 'common/random-data-generator'

export class TaskManagementPage {
  private page: Page
  private taskManagement: Locator
  private foldera: Locator
  private addFolder: Locator
  private renamefolder: Locator
  private rename_fill: Locator
  private rename_enter: Locator

  private folder_click!: Locator
  private addboard: Locator
  private renameboard: Locator
  private board_fill: Locator
  private board_enter: Locator

  constructor(page: Page) {
    this.page = page
    this.taskManagement = page.getByRole('link', {
      name: 'Task Management Create and',
    })
    this.foldera = page.getByRole('button', { name: 'My Pinboards' })
    this.addFolder = page.getByText('Add folder')
    this.renamefolder = page.locator('#scroll-area').getByRole('textbox')
    this.rename_fill = page.locator('#scroll-area').getByRole('textbox')
    this.rename_enter = page.locator('#scroll-area').getByRole('textbox')
    this.addboard = page.getByText('Add pinboard')
    this.renameboard = page.locator('#scroll-area').getByRole('textbox')
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
        await this.foldera.click()
      }
    )
  }

  async navigateToaddfolder() {
    await Allure.step(
      'should Navigate to add folder  button is clicked',
      async () => {
        await this.addFolder.click()
      }
    )
  }

  async navigateTorenamefolder() {
    await Allure.step('to rename the folder', async () => {
      await this.renamefolder.press('ControlOrMeta+a')
    })
  }

  async navigateTofillfolder(randomFileName: string) {
    //const randomFileName = 'newFolderName';
    await Allure.step('to rename the folder', async () => {
      await this.rename_fill.fill(randomFileName)
    })
  }

  async renameFolderAndSubmit() {
    await Allure.step('foldername is renamed', async () => {
      await this.rename_enter.press('Enter')
    })
  }

  async clickonfolder() {
    await Allure.step('click on folder', async () => {
      await this.folder_click.dblclick()
    })
  }

  async navigateToaddpinboard() {
    await Allure.step(
      'should Navigate to add pinboard button is clicked',
      async () => {
        await this.addboard.click()
      }
    )
  }

  async navigateTorenameboard() {
    await Allure.step('to rename the board', async () => {
      await this.renameboard.press('ControlOrMeta+a')
    })
  }

  async navigateTofillboard(randomFileName: string) {
    //const randomFileName = 'newFolderName';
    await Allure.step('to rename the board', async () => {
      await this.board_fill.fill(randomFileName)
    })
  }

  async renameboardAndSubmit() {
    await Allure.step('board is renamed', async () => {
      await this.board_enter.press('Enter')
    })
  }
}
