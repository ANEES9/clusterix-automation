import { BrowserContext, Locator, Page , expect} from '@playwright/test'
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
  private projectOverviewMainTitle:Locator
  

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('pm', locale)

    this.tableProject = page.locator('.BaseCellWrapper-module_wrapper__XCaQu').first()
    this.projectOverviewMain = page.locator('.project-management-projectoverview-main')
    this.editButton = page.getByText(this.translations.common.edit)
    this.projectWorkFlowForm = page.locator('.project-management-projectworkflow-form')
    this.projectShortTitle = page.getByLabel(this.translations.main["Project Short Title"])
    this.projectTitle = page.locator('textarea[data-qa="project-title"]')                                                                 
    this.projectStartCalendar = page.getByRole('button', { name: this.translations.main["Project start"] })
    this.projectStartDate = page.getByRole('button', { name: '9', exact: true }).first()                                                //("button.DatePickerView-module_viewItem__Frpjj:has-text('9')").first()                                 //page.getByRole('button', { name: '9', exact: true }).first()
    this.warningModal = page.getByText(this.translations.common.yes_continue)
    this.navigateToOverview = page.locator('._sidebarSubMenuButton_16zcl_191 ._sidebarSubMenuButton__collapsedIcon_16zcl_195').first()
    this.updatedDetails = page.locator("//div[@class='EventCards-module_eventCards__9h6Wc DV3jr0hIxEqK3Ba0vRcJ']")                                                   
    this.menuButton = page.locator('._button__icon_10jo6_18').nth(0)                               //vdgms
    this.deleteProject = page.getByText(this.translations.common.delete)
    this.deleteWarningModal = page.getByText(this.translations.common.delete , { exact: true })
    this.deleteToasterMessage = page.getByText(this.translations.main["projects deleted successfully"])
    this.recentProjects = page.locator('._sidebarGroup_16zcl_105 ._sidebarGroup__items_16zcl_109').nth(0)
    this.projectPlanPage = page.locator('._sidebarSubMenuButton_16zcl_191 ._sidebarSubMenuButton__collapsedIcon_16zcl_195').nth(2)
    //this.assignEmployee = page.locator('div').filter({ hasText: /^Assign employees in Employee Allocation Page$/ })
    this.assignEmployee = page.locator('div').filter({ hasText: this.translations.main.assign_employees_in }).first()
    //this.assignEmployee = page.locator('div').filter({hasText: /Assign employees in Employee Allocation Page|Weisen Sie Mitarbeiter auf der Seite „Mitarbeiterzuordnung“ zu/}).first()
    //this.pathLocator = this.assignEmployee.locator('[data-qa="no-employees-button"]')
    this.pathLocator = this.assignEmployee.locator('[data-qa="no-employees-button"], img').nth(1)
    //this.loadingIndicator = page.locator('has-text("The page is currently loading.")')
    this.loadingIndicator = page.locator(`has-text("${this.translations.main['The page is currently loading.']}")`)
    //this.allocationPageLoaded = page.locator('h1', { hasText: this.translations.crossProjectData.personnel_allocation })
    this.allocationPageLoaded = page.getByRole('heading', { name: this.translations.crossProjectData.personnel_allocation })
    this.hiddenProjectButton = page.getByText(this.translations.main["hide project"])
    this.hiddenToastermessage = page.getByText(this.translations.main["Project hided successfully."])
    this.revealProjectButton = page.getByText(this.translations.main["reveal project"])
    this.revealToasterMessage = page.getByText(this.translations.main["Project revealed successfully."])
    this.projectOverviewMainTitle = page.locator('.project-management-projectoverview-main-title')
} 



  /**
   * Navigate to the login page.
   * @param baseURL - The base URL of the application.
   */
async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to project management app', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.projectManagement.projects.overview}`)
    })
  }
  async projectOverviewMainVisible() {
    await Allure.step('validate project overview loaded & visible', async () => {
    expect(await this.projectOverviewMain.isVisible({timeout: 5000})).toBeTruthy()
    })
}

async projectOverviewMainTitleVisible() {
  await Allure.step('validate project overview titel loaded & visible', async () => {
  expect(await this.projectOverviewMainTitle.isVisible()).toBeTruthy()
  })
}

async clickEditButton() {
    await Allure.step('Edit button is clicked and project workflow form is visible', async () => {
    expect(await this.editButton.isVisible())
    await this.editButton.click()
    expect(await this.projectWorkFlowForm.isVisible())
    })
}

async editBasicDataOfForm()
{
    await Allure.step('Project details are edited', async () => {
    await this.projectShortTitle.fill("")
    await this.page.waitForTimeout(1000);
    await this.projectShortTitle.fill(addProjectData.projectShortTitle)
    await this.projectTitle.fill("")
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
    await Allure.step('Navigate to project overview to validate the updated project details in communication modal', async () => {
    await this.page.waitForTimeout(2000);
    await this.navigateToOverview.click()
    //await this.page.reload()
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForLoadState('networkidle')

    await expect(this.updatedDetails).toBeVisible()
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.updatedDetails).toContainText(addProjectData.projectTitle)
    })
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
  await Allure.step('Search for the project in recent projects section' , async () =>{
  expect (this.recentProjects).toBeVisible()
  expect(this.recentProjects).toHaveValue(addProjectData.shortTitleInput)
  // await expect(this.projectShortTitle).toHaveValue(addProjectData.projectShortTitle)
  // await expect(this.projectShortTitle).toBeVisible()
  // await this.projectShortTitle.click()
})
}


async navigateToProjectPlan() {
  await Allure.step('Navigate to project plan of the project', async () => {
    await this.projectPlanPage.click()
    await expect(this.assignEmployee).toBeVisible({timeout: 50000})
    
    await expect(this.pathLocator).toBeVisible()

    const pathLocator = this.assignEmployee.locator('[data-qa="no-employees-button"]')
    //const pathLocator = this.assignEmployee.locator('[data-qa="no-employees-button"], img').nth(1)
    
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.pathLocator.click()  
    ]);

    await newPage.waitForLoadState('domcontentloaded')
  })

  return this.page.context().pages().pop()!
}


async verifyHeadingInNewPage(newPage: Page) {
  await Allure.step('Verify the heading on the new page of personnel allocation', async () => {
    const allocationPageLoaded = newPage.locator('h1', { hasText: /Personnel Allocation|Personalzuteilung/ })
    //const allocationPageLoaded = newPage.getByText(this.translations.crossProjectData.personnel_allocation)
    await this.page.waitForLoadState('networkidle')
        this.page.waitForLoadState('domcontentloaded')
        //await this.page.waitForTimeout(10000)
        //await this.page.getByRole('heading', { name: this.translations.crossProjectData.personnel_allocation }).waitFor()
    await expect(allocationPageLoaded).toBeVisible({timeout: 50000})
    //await expect(allocationPageLoaded).toHaveText('Personnel Allocation')
  });
}

async clickHideProject() {
   await Allure.step('Navigate to project overview and select hide project from the menu', async () => {
    await this.menuButton.click()
    await this.hiddenProjectButton.click()
   })
}

async validateHideProject() {
  await Allure.step('Validate that the project is hidden successfully', async () => {
    await this.page.waitForLoadState('domcontentloaded')
   expect(this.hiddenToastermessage).toBeVisible({timeout: 5000})
  })
}

async clickRevealProject() {
  await Allure.step('Navigate to project overview and select reveal project from the menu' , async () => {
  await this.menuButton.click({ force: true })
  await this.revealProjectButton.click()

})
}

async validateRevealProject() {
  await Allure.step('Validate that the project is revealed successfully', async () => {
    await expect(this.revealToasterMessage).toBeVisible()
  })
}


}
