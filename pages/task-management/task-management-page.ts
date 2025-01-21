import { Page, Locator } from '@playwright/test'
import { Allure } from 'common/allure-helper'

export class TaskManagementPage {
  private page: Page
  private taskmanagement: Locator
  private folders: Locator
  private addfolder: Locator
  private renamefolder: Locator
  private renamefill: Locator
  private renameenter: Locator
  private folderclick!: Locator
  private addboard: Locator
  private renameboard: Locator
  private boardfill: Locator
  private boardenter: Locator
  private boardclick!: Locator
  private addstatus: Locator
  private statusfill: Locator
  private statusenter: Locator
  private addtask: Locator
  private taskfill: Locator
  private taskenter: Locator

  constructor(page: Page) {
    this.page = page
    this.taskmanagement = page.getByRole('link', {
      name: 'Task Management Create and',
    })
    this.folders = page.getByRole('button', { name: 'My Pinboards' })
    this.addfolder = page.getByText('Add folder')
    this.renamefolder = page.locator('#scroll-area').getByRole('textbox')
    this.renamefill = page.locator('#scroll-area').getByRole('textbox')
    this.renameenter = page.locator('#scroll-area').getByRole('textbox')
    this.addboard = page.getByText('Add pinboard')
    this.renameboard = page.locator('#scroll-area').getByRole('textbox')
    this.boardfill = page.locator('#scroll-area').getByRole('textbox')
    this.boardenter = page.locator('#scroll-area').getByRole('textbox')
    this.addstatus = page.getByRole('button', { name: 'New Status' })
    this.statusfill = page.getByPlaceholder('Status Name')
    this.statusenter = page.getByPlaceholder('Status Name')
    this.addtask = page.getByRole('button', { name: 'Add Task' })
    this.taskfill = page.getByPlaceholder('Task Name')
    this.taskenter = page.getByPlaceholder('Task Name')
  }

  set savexpath(path: string) {
    this.folderclick = this.page.getByText(path)
  }

  set savexpathboard(path: string) {
    this.boardclick = this.page.getByText(path)
  }

  async navigatetotaskmanagement() {
    await Allure.step(
      'should navigate to task management when task management button is clicked',
      async () => {
        await this.taskmanagement.click()
      }
    )
  }

  async navigatetopinboardsection() {
    await Allure.step(
      'should navigate to the pinboard section after clicking the pinboard button',
      async () => {
        await this.folders.click()
      }
    )
  }

  async navigatetoaddfolder() {
    await Allure.step(
      'should navigate to add folder button is clicked',
      async () => {
        await this.addfolder.click()
      }
    )
  }

  async navigatetorenamefolder() {
    await Allure.step('to rename the folder', async () => {
      await this.renamefolder.press('ControlOrMeta+a')
    })
  }

  async navigatetofillfolder(randomfilename: string) {
    await Allure.step('to rename the folder', async () => {
      await this.renamefill.fill(randomfilename)
    })
  }

  async renamefolderandsubmit() {
    await Allure.step('folder name is renamed', async () => {
      await this.renameenter.press('Enter')
    })
  }

  async clickonfolder() {
    await Allure.step('click on folder', async () => {
      await this.folderclick.dblclick()
    })
  }

  async navigatetoaddpinboard() {
    await Allure.step(
      'should navigate to add pinboard button is clicked',
      async () => {
        await this.addboard.click()
      }
    )
  }

  async navigatetorenameboard() {
    await Allure.step('to rename the board', async () => {
      await this.renameboard.press('ControlOrMeta+a')
    })
  }

  async navigatetofillboard(randomfilename: string) {
    await Allure.step('to rename the board', async () => {
      await this.boardfill.fill(randomfilename)
    })
  }

  async renameboardandsubmit() {
    await Allure.step('board is renamed', async () => {
      await this.boardenter.press('Enter')
    })
  }

  async clickonboard() {
    await Allure.step('click on board', async () => {
      await this.boardclick.dblclick()
    })
  }

  async navigatetoaddstatus() {
    await Allure.step(
      'should navigate to add status button is clicked',
      async () => {
        await this.addstatus.click()
      }
    )
  }

  async navigatetofillstatus(randomfilename: string) {
    await Allure.step('to name the status', async () => {
      await this.statusfill.fill(randomfilename)
    })
  }

  async statussubmit() {
    await Allure.step('status is named', async () => {
      await this.statusenter.press('Enter')
    })
  }

  async navigatetoaddtask() {
    await Allure.step(
      'should navigate to add task button is clicked',
      async () => {
        await this.addtask.click()
      }
    )
  }

  async navigatetofilltask(randomfilename: string) {
    await Allure.step('to name the task', async () => {
      await this.taskfill.fill(randomfilename)
    })
  }

  async tasksubmit() {
    await Allure.step('task is named', async () => {
      await this.taskenter.press('Enter')
    })
  }
}
