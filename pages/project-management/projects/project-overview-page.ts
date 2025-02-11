import { Locator, Page, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { addProjectData } from 'utils/test-data/project-management/add-project-data'

export class ProjectOverview {
  private page: Page
  private translations: Record<string, any>

  private tableProject: Locator
  private projectOverviewMain: Locator
  private editButton: Locator
  private projectWorkFlowForm: Locator
  private projectShortTitle: Locator
  private projectTitle: Locator
  private projectStartCalendar: Locator
  private projectStartDate: Locator
  private warningModal: Locator
  private navigateToOverview: Locator
  private updatedDetails: Locator
  private menuButton: Locator
  private deleteProject: Locator
  private deleteWarningModal: Locator
  private deleteToasterMessage: Locator
  private recentProjects: Locator
  private projectPlanPage: Locator
  private assignEmployee: Locator
  private pathLocator: Locator
  private loadingIndicator: Locator
  private allocationPageLoaded: Locator
  private hiddenProjectButton: Locator
  private hiddenToastermessage: Locator
  private revealProjectButton: Locator
  private revealToasterMessage: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('pm', locale)

    this.tableProject = page
      .locator('.BaseCellWrapper-module_wrapper__XCaQu')
      .first()
    this.projectOverviewMain = page.locator(
      '.project-management-projectoverview-main'
    )
    this.editButton = page.getByText('Edit')
    this.projectWorkFlowForm = page.locator(
      '.project-management-projectworkflow-form'
    )
    this.projectShortTitle = page.getByLabel('Project Short Title')
    this.projectTitle = page.locator('textarea[data-qa="project-title"]')
    this.projectStartCalendar = page.getByRole('button', {
      name: 'Project start',
    })
    this.projectStartDate = page
      .getByRole('button', { name: '9', exact: true })
      .first() //("button.DatePickerView-module_viewItem__Frpjj:has-text('9')").first()                                 //page.getByRole('button', { name: '9', exact: true }).first()
    this.warningModal = page.getByText('Yes, Continue')
    this.navigateToOverview = page
      .locator(
        '._sidebarSubMenuButton_16zcl_191 ._sidebarSubMenuButton__collapsedIcon_16zcl_195'
      )
      .first()
    this.updatedDetails = page.locator(
      "//div[@class='EventCards-module_eventCards__9h6Wc DV3jr0hIxEqK3Ba0vRcJ']"
    )
    this.menuButton = page.locator('._button__icon_vdgms_18').nth(0)
    this.deleteProject = page.getByText('Delete')
    this.deleteWarningModal = page.getByText('Delete', { exact: true })
    this.deleteToasterMessage = page.locator(
      'text=projects deleted successfully'
    )
    this.recentProjects = page
      .locator('._sidebarGroup_16zcl_105 ._sidebarGroup__items_16zcl_109')
      .nth(0)
    this.projectPlanPage = page
      .locator(
        '._sidebarSubMenuButton_16zcl_191 ._sidebarSubMenuButton__collapsedIcon_16zcl_195'
      )
      .nth(2)
    this.assignEmployee = page
      .locator('div')
      .filter({ hasText: /^Assign employees in Employee Allocation Page$/ })
    this.pathLocator = this.assignEmployee.locator('path')
    this.loadingIndicator = page.locator(
      'has-text("The page is currently loading.")'
    )
    this.allocationPageLoaded = page.getByRole('heading', {
      name: 'Personnel Allocation',
    })
    this.hiddenProjectButton = page.getByText('Hide project')
    this.hiddenToastermessage = page.locator('text=Project hided successfully.')
    this.revealProjectButton = page.getByText('Reveal project')
    this.revealToasterMessage = page.locator(
      'text=Project revealed successfully.'
    )
  }

  /**
   * Navigate to the login page.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to project management app', async () => {
      await this.page.goto(
        `${baseURL}${APP_URLS.projectManagement.projects.overview}`
      )
    })
  }
  async projectOverviewMainVisible() {
    await Allure.step(
      'validate project overview loaded & visible',
      async () => {
        expect(await this.projectOverviewMain.isVisible()).toBeTruthy()
      }
    )
  }
  async clickEditButton() {
    await Allure.step(
      'Edit button is clicked and project workflow form is visible',
      async () => {
        expect(await this.editButton.isVisible())
        await this.editButton.click()
        expect(await this.projectWorkFlowForm.isVisible())
      }
    )
  }

  async editBasicDataOfForm() {
    await Allure.step('Project details are edited', async () => {
      await this.projectShortTitle.fill('')
      await this.page.waitForTimeout(1000)
      await this.projectShortTitle.fill(addProjectData.projectShortTitle)
      await this.projectTitle.fill('')
      await this.projectTitle.fill(addProjectData.projectTitle)
      // await this.projectStartCalendar.click()
      // await this.projectStartCalendar.scrollIntoViewIfNeeded()
      // await this.page.waitForTimeout(1000);
      // await this.projectStartDate.click()
      //await this.projectStartCalendar.waitFor({ state: 'visible' })
      //await this.page.waitForTimeout(3000);
      //await this.page.waitForLoadState('domcontentloaded')
      //await this.warningModal.waitFor({ state: 'visible' })
      //await expect(this.warningModal).toBeVisible()
      //await this.warningModal.click()
      await this.page.waitForLoadState('domcontentloaded')
    })
  }

  async validateUpdatedDetails() {
    await Allure.step(
      'Navigate to project overview to validate the updated project details in communication modal',
      async () => {
        await this.page.waitForTimeout(2000)
        await this.navigateToOverview.click()
        await this.page.reload()
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('networkidle')

        await expect(this.updatedDetails).toBeVisible()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.updatedDetails).toContainText(
          addProjectData.projectTitle
        )
      }
    )
  }
  async validateDeleteProject() {
    await Allure.step('Delete project', async () => {
      await this.menuButton.click()
      await this.deleteProject.click()
      await expect(this.deleteWarningModal).toBeVisible()
      await this.deleteWarningModal.click()
      await expect(this.deleteToasterMessage).toBeVisible()
    })
  }

  async searchForProject() {
    await Allure.step(
      'Search for the project in recent projects section',
      async () => {
        expect(this.recentProjects).toBeVisible()
        expect(this.recentProjects).toHaveValue(addProjectData.shortTitleInput)
        // await expect(this.projectShortTitle).toHaveValue(addProjectData.projectShortTitle)
        // await expect(this.projectShortTitle).toBeVisible()
        // await this.projectShortTitle.click()
      }
    )
  }

  async navigateToProjectPlan() {
    await Allure.step('Navigate to project plan of the project', async () => {
      await this.projectPlanPage.click()
      await expect(this.assignEmployee).toBeVisible()
      await expect(this.pathLocator).toBeVisible()

      const pathLocator = this.assignEmployee.locator('path')

      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.pathLocator.click(),
      ])

      await newPage.waitForLoadState('domcontentloaded')
    })

    return this.page.context().pages().pop()!
  }

  async verifyHeadingInNewPage(newPage: Page) {
    await Allure.step(
      'Verify the heading on the new page of personnel allocation',
      async () => {
        const allocationPageLoaded = newPage.locator('h1', {
          hasText: 'Personnel Allocation',
        })
        await expect(allocationPageLoaded).toBeVisible()
        await expect(allocationPageLoaded).toHaveText('Personnel Allocation')
      }
    )
  }

  async clickHideProject() {
    await Allure.step(
      'Navigate to project overview and select hide project from the menu',
      async () => {
        await this.menuButton.click()
        await this.hiddenProjectButton.click()
      }
    )
  }

  async validateHideProject() {
    await Allure.step(
      'Validate that the project is hidden successfully',
      async () => {
        expect(this.hiddenToastermessage).toBeVisible()
      }
    )
  }

  async clickRevealProject() {
    await Allure.step(
      'Navigate to project overview and select reveal project from the menu',
      async () => {
        await this.menuButton.click()
        await this.revealProjectButton.click()
      }
    )
  }

  async validateRevealProject() {
    await Allure.step(
      'Validate that the project is revealed successfully',
      async () => {
        await expect(this.revealToasterMessage).toBeVisible()
      }
    )
  }
}
