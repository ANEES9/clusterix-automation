import { Locator, Page, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { addProjectData } from 'utils/test-data/project-management/add-project-data'

export class OverviewPage {
  private page: Page
  private translations: Record<string, any>

  private overviewButton: Locator
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
  private viewButton2: Locator
  private kanbanViewButton: Locator
  private kanbanViewCardHeader: Locator
  private addProjectButton: Locator
  private addProjectModal: Locator
  private closeAddProjectModal: Locator
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
  private settingIcon: Locator
  private makeGroupingButtonOn: Locator
  private makeGroupingButtonOff: Locator
  private projectTypeGrouping: Locator
  private searchIconForProject1: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('pm', locale)
    this.overviewButton = page.getByRole('button', {
      name: this.translations.main.sidebar.projects,
    })
    this.tableProject = page
      .locator('.BaseCellWrapper-module_wrapper__XCaQu')
      .first()
    this.allTypesFilter = page.getByPlaceholder(
      this.translations.main['All Types']
    )
    this.allTypesFilterDropdownList = page.locator('._list_dd6fb_14')
    this.firstDropdownOption = page.getByRole('button', {
      name: 'SFF',
      exact: true,
    })
    this.sffHeader = page.locator('div.project-management-overview-title b')
    this.secondDropdownOption = page.getByRole('button', {
      name: 'Agile Software Projects',
    })
    this.viewButton = page.getByRole('button', {
      name: this.translations.main.overviewMode['list'],
    })
    this.tileViewButton = page.getByText(
      this.translations.main.overviewMode['tile']
    )
    this.tileViewCardHeader = page.locator(
      '.project-management-overview-tilesview'
    )
    this.viewButton2 = page.getByRole('button', {
      name: this.translations.main.overviewMode['tile'],
    })
    this.kanbanViewButton = page.getByText(
      this.translations.main.overviewMode['kanban']
    )
    this.kanbanViewCardHeader = page.locator(
      '.project-management-overview-kanbanview'
    )
    this.filteredProjectsHeader = page.getByText(
      this.translations.main['filtered_projects']
    )
    this.addProjectButton = page.getByText(
      this.translations.main['Add project']
    )
    this.addProjectModal = page.locator('._modal_lyue6_22')
    this.closeAddProjectModal = page.getByRole('button', {
      name: this.translations.common.cancel,
    })
    this.selectProjectTypePlaceholder = page.locator(
      `input[placeholder="${this.translations.main['Please select project type']}"]`
    )
    this.selectProjectType = page.getByRole('button', {
      name: 'SFF',
      exact: true,
    })
    this.shortTitleInput = page.locator(
      `input[placeholder="${this.translations.main['Please enter short title']}"]`
    )
    this.shortTitleInputCharacterCount = page
      .locator(
        'div:has(input[placeholder="' +
          this.translations.main['Please enter short title'] +
          '"]) .characters-counter-danger'
      )
      .first()
    this.projectTitleInput = page.locator(
      `input[placeholder="${this.translations.main['Please enter title']}"]`
    )
    this.projectStart = page.getByLabel(this.translations.main['Project start'])
    this.selectingStartDate = page
      .getByRole('button', { name: '1', exact: true })
      .first()
    this.projectEnd = page.getByLabel(this.translations.main['Project end'])
    this.selectingEndDate = page.getByRole('button', { name: '27' }).nth(1)
    this.createProjectButton = page.getByRole('button', {
      name: this.translations.main['Create project'],
    })
    this.projectCreatedSuccessMessage = page.getByText(
      this.translations.main['projects created successfully']
    )
    this.projectTitleInputCharacterCount = page
      .locator(
        'input[placeholder="' +
          this.translations.main['Please enter title'] +
          '"].characters-counter-danger'
      )
      .nth(1)
    this.searchIconForProject = page.locator(
      'tbody tr:nth-child(1) td:nth-child(12) svg.ca-fill-theme'
    )
    this.searchIconForProject1 = page.locator('.ca-fill-theme').first()
    this.filterButtonOverview = page.getByRole('button', { name: 'Filters' })
    this.selectShowProjectsOption = page.getByRole('button', {
      name: this.translations.main.show_projects,
    })
    this.hidden = page.getByText(this.translations.main['Hidden Projects'])
    this.projectListBody = page
      .getByRole('table')
      .locator('div')
      .filter({ hasText: 'Automation' })
      .nth(2)
    this.settingIcon = page.locator('.Bar-module_part__CpFuS').nth(2)
    this.makeGroupingButtonOn = page.getByRole('button', {
      name: this.translations.main['turn_on_grouping'],
    })
    this.makeGroupingButtonOff = page.getByRole('button', {
      name: this.translations.main['turn_off_grouping'],
    })
    this.projectTypeGrouping = page.locator(
      '.project-management-overview-listview b'
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
      //await expect(this.filteredProjectsHeader).toHaveText('Filtered Projects')
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
      await this.page.waitForTimeout(7000)
      expect(this.tileViewCardHeader).toBeVisible({ timeout: 6000 })
    })
  }

  async tileButtonClick() {
    await Allure.step('Tile View is visible', async () => {
      await this.viewButton2.waitFor({ state: 'visible' })
      await this.viewButton2.click()
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

  async validateAddProjectModal() {
    await Allure.step('Validate that add project modal appears', async () => {
      await expect(this.addProjectModal).toBeVisible({ timeout: 3000 })
    })
  }

  async validateClosingProjectModal() {
    await Allure.step('Validate that add project modal appears', async () => {
      await this.closeAddProjectModal.click()
    })
  }

  async selectProjectTypeVisible() {
    await Allure.step('Select project type is visible', async () => {
      await expect(this.selectProjectTypePlaceholder).toBeVisible()
      await this.selectProjectTypePlaceholder.click()
    })
  }
  async selectProjectTypeSff() {
    await Allure.step('Select SFF project type', async () => {
      await this.selectProjectType.waitFor({ state: 'visible', timeout: 3000 })
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
      //console.log('Date 1 selected')
    })
  }
  async projectEndDateSelected() {
    await Allure.step('Select project start date', async () => {
      await this.projectEnd.waitFor({ state: 'visible' })
      await this.projectEnd.click()
      await this.selectingEndDate.waitFor({ state: 'visible' })
      await this.selectingEndDate.click()
      //console.log('End Date  selected')
    })
  }
  async clickCreateProjectButton() {
    await Allure.step('Click on create project button', async () => {
      await this.createProjectButton.click()
      await this.projectCreatedSuccessMessage.waitFor({ state: 'visible' })
      await expect(this.projectCreatedSuccessMessage).toBeVisible({
        timeout: 3000,
      })
      //await this.page.waitForTimeout(3000)
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
      await this.searchIconForProject1.waitFor({
        state: 'visible',
        timeout: 10000,
      })
      await expect(this.searchIconForProject1).toBeVisible()
      await this.searchIconForProject1.click()
      await this.page.waitForTimeout(5000)
    })
  }

  async navigateToOverview() {
    await Allure.step(
      'Expand the side bar and navigate to ovevriew',
      async () => {
        await expect(this.overviewButton).toBeVisible()
        await this.overviewButton.click()
        await this.page.waitForLoadState('networkidle')
      }
    )
  }

  async clickFilterInOverview() {
    await Allure.step('Click filter in overview', async () => {
      await this.page.waitForLoadState('networkidle')
      //this.page.waitForTimeout(6000)
      await this.tableProject.waitFor({ state: 'visible', timeout: 6000 })
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
        await this.page.waitForLoadState('networkidle')
        await expect(this.projectListBody).toBeVisible({ timeout: 5000 })
      }
    )
  }

  async makeGroupingOn() {
    await Allure.step(
      'Make the grouping on and validate that all project type title is visible',
      async () => {
        await expect(this.settingIcon).toBeVisible()
        await this.settingIcon.click()
        await expect(this.makeGroupingButtonOn).toBeVisible()
        await this.makeGroupingButtonOn.click()
        await this.page.waitForSelector(
          '.project-management-overview-listview b',
          { state: 'visible' }
        )
        const projectTypesFound = await this.projectTypeGrouping.allInnerTexts()
        //console.log('Project Types Found:', projectTypesFound)
        const expectedProjectTypes = ['SFF']
        expectedProjectTypes.forEach(async (type) => {
          expect(projectTypesFound).toContain(type)
          await this.page.waitForLoadState('networkidle')
        })
      }
    )
  }
  async makeGroupingOff() {
    await Allure.step(
      'Make the grouping on and validate that all project type title is visible',
      async () => {
        expect(this.makeGroupingButtonOff).toBeVisible()
        await this.makeGroupingButtonOff.click({ force: true })
      }
    )
  }
}
