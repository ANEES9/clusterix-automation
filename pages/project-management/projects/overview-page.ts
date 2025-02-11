import { Locator, Page, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { addProjectData } from 'utils/test-data/project-management/add-project-data'

export class OverviewPage {
  private page: Page
  private translations: Record<string, any>
  private tableProject: Locator
  private allTypesFilter: Locator
  private allTypesFilterDropdownList: Locator
  private firstDropdownOption: Locator
  private sffHeader: Locator
  private secondDropdownOption: Locator
  private filteredProjectsHeader: Locator
  private viewButton: Locator
  private tileViewButton: Locator
  private tileViewCardHeader: Locator
  private kanbanViewButton: Locator
  private kanbanViewCardHeader: Locator
  private addProjectButton: Locator
  private selectProjectTypePlaceholder: Locator
  private selectProjectType: Locator
  private shortTitleInput: Locator
  private shortTitleInputCharacterCount: Locator
  private projectTitleInput: Locator
  private projectTitleInputCharacterCount: Locator
  private projectStart: Locator
  private selectingStartDate: Locator
  private projectEnd: Locator
  private selectingEndDate: Locator
  private createProjectButton: Locator
  private projectCreatedSuccessMessage: Locator
  private searchIconForProject: Locator
  private filterButtonOverview: Locator
  private selectShowProjectsOption: Locator
  private hidden: Locator
  private projectListBody: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('pm', locale)

    this.tableProject = page
      .locator('.BaseCellWrapper-module_wrapper__XCaQu')
      .first()
    this.allTypesFilter = page.getByPlaceholder('All Types')
    this.allTypesFilterDropdownList = page.locator('._list_dd6fb_14')
    this.firstDropdownOption = page.getByRole('button', { name: 'SFF' })
    this.sffHeader = page.locator('div.project-management-overview-title b')
    this.secondDropdownOption = page.getByRole('button', {
      name: 'Agile Software Projects',
    })
    this.viewButton = page.locator(
      'button.Bar-module_part__CpFuS:nth-of-type(1)'
    )
    this.tileViewButton = page.locator('button:has(span:has-text("Tile view"))')
    this.tileViewCardHeader = page.locator(
      '.project-management-overview-tilesview'
    ) //('div.project-management-overview-tilesview-status-cards-card-header')
    this.kanbanViewButton = page.locator('button:has(span:has-text("Kanban"))')
    this.kanbanViewCardHeader = page.locator(
      '.project-management-overview-kanbanview'
    )
    this.filteredProjectsHeader = page.locator(
      'div.project-management-overview-title b'
    )
    this.addProjectButton = page.getByText('Add project')
    this.selectProjectTypePlaceholder = page.locator(
      'input[placeholder="Please select project type"]'
    )
    this.selectProjectType = page.getByText('Agile Software Projects')
    this.shortTitleInput = page.locator(
      'input[placeholder="Please enter short title"]'
    )
    this.shortTitleInputCharacterCount = page
      .locator(
        'div:has(input[placeholder="Please enter short title"]) .characters-counter-danger'
      )
      .first()
    this.projectTitleInput = page.locator(
      'input[placeholder="Please enter title"]'
    )
    this.projectStart = page.getByLabel('Project start')
    this.selectingStartDate = page
      .getByRole('button', { name: '1', exact: true })
      .first()
    this.projectEnd = page.getByLabel('Project end')
    this.selectingEndDate = page.getByRole('button', { name: '31' }).nth(1)
    this.createProjectButton = page.locator('button:has-text("Create project")')
    this.projectCreatedSuccessMessage = page.getByText(
      'Project created successfully.'
    )
    this.projectTitleInputCharacterCount = page
      .locator(
        'input[placeholder="Please enter title"].characters-counter-danger'
      )
      .nth(1)
    this.searchIconForProject = page.locator(
      'tbody tr:nth-child(1) td:nth-child(12) svg.ca-fill-theme'
    )
    this.filterButtonOverview = page.getByRole('button', { name: 'Filters' })
    this.selectShowProjectsOption = page.getByRole('button', {
      name: 'Show projects',
    })
    this.hidden = page.getByText('Hidden')
    this.projectListBody = page
      .getByRole('table')
      .locator('div')
      .filter({ hasText: 'Automation' })
      .nth(2)
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

  async TableProjectloaded() {
    await Allure.step('Project table is loaded & visible', async () => {
      await this.tableProject.isVisible()
    })
  }

  async clickAllTypesFilter() {
    await Allure.step('Click on "all types" filter', async () => {
      await this.allTypesFilter.waitFor({ state: 'visible' })
      await this.allTypesFilter.click()
    })
  }
  async allTypesFilterDropdownListVisible() {
    await Allure.step('All types filter dropdown list is visible', async () => {
      await expect(this.allTypesFilterDropdownList).toBeVisible()
    })
  }
  async clickFirstDropdownOption() {
    await Allure.step('Click on first dropdown option', async () => {
      await this.firstDropdownOption.click()
    })
  }
  async sffHeaderVisible() {
    await Allure.step('SFF Header is visible', async () => {
      await expect(this.sffHeader).toBeVisible()
      await expect(this.sffHeader).toHaveText('SFF')
    })
  }
  async clickSecondDropdownOption() {
    await Allure.step('Click on second dropdown option', async () => {
      await this.secondDropdownOption.click()
    })
  }
  async filteredProjectsHeaderVisible() {
    await Allure.step('Filtered projects header is visible', async () => {
      await expect(this.filteredProjectsHeader).toBeVisible()
      await expect(this.filteredProjectsHeader).toHaveText('Filtered Projects')
    })
  }
  async clickViewButton() {
    await Allure.step('Click on list view button', async () => {
      await this.viewButton.click()
    })
  }

  async clickTileViewButton() {
    await Allure.step('Click on tile view button', async () => {
      await this.tileViewButton.click()
    })
  }

  async tileViewVisible() {
    await Allure.step('Tile View is visible', async () => {
      expect(this.tileViewCardHeader).toBeVisible()
    })
  }

  async clickKanbanViewButton() {
    await Allure.step('Click on kanban view button', async () => {
      await this.kanbanViewButton.click()
    })
  }
  async kanbanViewVisible() {
    await Allure.step('Kanban view is visible', async () => {
      await expect(this.kanbanViewCardHeader).toBeVisible()
    })
  }
  async clickAddProjectButton() {
    await Allure.step('Click on Add Project Button', async () => {
      await this.addProjectButton.click()
    })
  }

  async selectProjectTypeVisible() {
    await Allure.step('Select project type is visible', async () => {
      await expect(this.selectProjectTypePlaceholder).toBeVisible()
      await this.selectProjectTypePlaceholder.click()
    })
  }
  async selectProjectTypeAgile() {
    await Allure.step('Select agile software projects', async () => {
      await this.selectProjectType.click()
    })
  }
  async fillShortTitleInput() {
    await Allure.step('Fill short title input', async () => {
      await this.shortTitleInput.waitFor({ state: 'visible' })
      await this.shortTitleInput.click()
      await this.shortTitleInput.fill(addProjectData.shortTitleInput)
    })
  }
  async fillProjectTitleInput() {
    await Allure.step('Fill project Title Input', async () => {
      await this.projectTitleInput.waitFor({ state: 'visible' })
      await this.projectTitleInput.click()
      await this.projectTitleInput.fill(addProjectData.projectTitleInput)
    })
  }
  async projectStartDateSelected() {
    await Allure.step('Select project start date', async () => {
      await this.projectStart.waitFor({ state: 'visible' })
      await this.projectStart.click()
      await this.selectingStartDate.waitFor({ state: 'visible' })
      await this.selectingStartDate.click()
      console.log('Date 1 selected')
    })
  }
  async projectEndDateSelected() {
    await Allure.step('Select project start date', async () => {
      await this.projectEnd.waitFor({ state: 'visible' })
      await this.projectEnd.click()
      await this.selectingEndDate.waitFor({ state: 'visible' })
      await this.selectingEndDate.click()
      console.log('Date 31 selected')
    })
  }
  async clickCreateProjectButton() {
    await Allure.step('Click on create project button', async () => {
      await this.createProjectButton.click()
      await expect(this.projectCreatedSuccessMessage).toHaveText(
        'Project created successfully.'
      )
      await expect(this.projectCreatedSuccessMessage).toBeVisible()
    })
  }
  async fillShortTitleInputCharaterCount() {
    await Allure.step('Fill short title input', async () => {
      await this.shortTitleInput.fill(addProjectData.lessthanMinShortTitleInput)
      expect(this.shortTitleInputCharacterCount)
      await this.shortTitleInput.fill(addProjectData.morethanMaxShortTitleInput)
      expect(this.shortTitleInputCharacterCount)
      await this.shortTitleInput.fill(addProjectData.shortTitleInput)
    })
  }
  async fillProjectTitleInputCharaterCount() {
    await Allure.step('Fill project title input', async () => {
      await this.projectTitleInput.fill(
        addProjectData.lessThanMinProjectTitleInput
      )
      expect(this.projectTitleInputCharacterCount)
      await this.projectTitleInput.fill(
        addProjectData.moreThanMaxProjectTitleInput
      )
      expect(this.shortTitleInputCharacterCount)
      await this.projectTitleInput.fill(addProjectData.projectTitleInput)
    })
  }
  async searchIconForProjectVisible() {
    await Allure.step('Search icon for project is visible', async () => {
      await this.searchIconForProject.waitFor({ state: 'visible' })
      await expect(this.searchIconForProject).toBeVisible()
      await this.searchIconForProject.click()
    })
  }

  async clickFilterInOverview() {
    await Allure.step('Click filter in overview', async () => {
      await this.filterButtonOverview.click()
      await this.selectShowProjectsOption.waitFor({ state: 'visible' })
      await expect(this.selectShowProjectsOption).toBeVisible()
      await this.selectShowProjectsOption.click()
    })
  }
  async validateHiddenFilter() {
    await Allure.step(
      'Select hidden in the filter and validate that hidden project visible',
      async () => {
        await this.hidden.click()
        await this.filterButtonOverview.click()
        await expect(this.projectListBody).toBeVisible()
      }
    )
  }
}
