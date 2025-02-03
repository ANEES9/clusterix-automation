import { expect, Locator, Page } from '@playwright/test'
import { APP_URLS } from 'config/constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { Allure } from 'common/allure-helper'
import { projectTypeTestData } from 'utils/test-data/project-management/project-types-data'


export class ProjectTypesPage {
  private page: Page
  private translations: Record<string, any>

  private newProjectTypeButton: Locator
  private projectTypeModal: Locator
  private titleInput: Locator
  private colorList: Locator
  private descriptionInput: Locator
  private workFlowCategory: Locator
  private workFlowDropdown: Locator
  private selectWorkflowDropdown: Locator
  private manageParticipantsButton: Locator
  private manageParticipantsModal: Locator
  private searchParticipantsInput: Locator
  private selectParticipant: Locator
  private closeManageParticipantsModal: Locator
  private toggleButton: Locator
  private createButton: Locator
  private projectTypeHeader: Locator
  private projectTypeEditButton: Locator
  private projectTypeEditModal: Locator
  private removeParticipants: Locator
  private saveProjectType: Locator
  private deleteIcon : Locator
  private deleteButton: Locator
  private projectTypeTitle

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('pm', locale)

    // this.newProjectTypeButton = page.getByRole('button', {
    //   name: this.translations.projectTypes.newProjectType,
    // })
    // this.titleInput = page.getByPlaceholder(
    //   this.translations.projectTypes.typeModal.titlePlaceholder
    // )
    
    // this.descriptionInput = page.getByPlaceholder(
    //   this.translations.projectTypes.typeModal.descriptionPlaceholder
    // )
    // this.selectWorkflowDropdown = page.getByPlaceholder(
    //   this.translations.projectTypes.typeModal.category
    // )
    this.newProjectTypeButton = page.getByRole('button', {name: 'New project type',})
    this.projectTypeModal = page.locator('#project-type-modal-content')
    this.titleInput = page.getByPlaceholder('Title of the project type')
    this.colorList = page.locator('span[class*="ColorItem-module_color"]')
    this.descriptionInput = page.getByPlaceholder('Description of the project')
    this.workFlowCategory = page.getByPlaceholder('Category')
    this.workFlowDropdown = page.locator('.ca-max-h-64')
    this.selectWorkflowDropdown = page.getByRole('button', { name: 'Agile Flow' })                                                        
    this.manageParticipantsButton = page.locator('button:has-text("Manage participants")')
    this.manageParticipantsModal = page.locator('.YorUFdmGYZRv4Eqdz23e')
    this.searchParticipantsInput = page.locator('input[placeholder="Search responsible"]')
    this.selectParticipant = page.locator('#responsibles-input').getByText('Mohamed AlFarsi')                                           
    this.closeManageParticipantsModal = page.locator('#undefined').getByRole('button').first()                                 
    this.toggleButton = page.locator('.m4k0JlnIppWFWs69kSNm ._toggle_1x4ea_13')
    this.createButton = page.locator('text=Create Project Type')
    this.projectTypeHeader = page.getByRole('button', {name: 'Project types'})
    this.projectTypeEditButton = page.locator('td:nth-child(8) > .SmartTable-module_cellContentWrapper__ppYvz > .SmartTable-module_cellContent__fmjZa > .ca-gap-yellow').first()
    this.projectTypeEditModal = page.locator('#project-type-modal-content')
    this.removeParticipants = page.locator('div.Pyc7cP_yKF9ypAX1_LCX svg').nth(1)
    this.saveProjectType =  page.locator('text=Save')
    this.deleteIcon = page.locator('div.ca-flex svg[viewBox="0 0 14 14"]').nth(3)
    this.deleteButton = page.locator('button:has-text("Delete Project type")')
    this.projectTypeTitle = page.locator(`span:has-text("${projectTypeTestData[0].title}")`)



  }

  /**
   * Navigate to the login page.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to project management project type URL', async () => {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(
      `${baseURL}${APP_URLS.projectManagement.projects.projectTypes}`
    )
  })
}

  
  async clickNewProjectTypeButton() {
    await Allure.step('Click on new project type button', async () =>  {
    await this.newProjectTypeButton.click()
  })
}

  /**
   * Fill the title input with a given title.
   * @param title - The title to enter.
   */
  async fillTitleInput() {  
    await Allure.step('Fill title of the project type', async () =>  {                
    await this.titleInput.fill(projectTypeTestData[0].title)
  })
}

  /**
   * Select a color from the color list by index.
   * @param index - The index of the color to select.
   */
  async selectColorByIndex(index: number) {
    await Allure.step('Select color by index', async () =>  {
    const colorCount = await this.colorList.count()
    if (index >= colorCount) {
      throw new Error(
        `Invalid index: ${index}. There are only ${colorCount} colors available.`
      )
    }
    await this.colorList.nth(index).click()
  })
}

  /**
   * Select a color by RGB value.
   * @param rgbValue - The RGB value of the color to select (e.g., 'rgb(113, 208, 242)').
   */
  async selectColorByRGB(rgbValue: string) {
    await Allure.step('Select color by rgb values', async () =>  {
    const colorElement = this.page.locator(
      `span[class*="ColorItem-module_color"][style*="background-color: ${rgbValue}"]`
    )
    if (!(await colorElement.isVisible())) {
      throw new Error(
        `Color with RGB value ${rgbValue} is not visible or does not exist.`
      )
    }
    await colorElement.click()
  })
}

  /**
   * Fill the description input with a given description.
   * @param description - The description to enter.
   */
  async fillDescriptionInput() {      
    await Allure.step('Fill description of the project type', async () => {               
    await this.descriptionInput.fill(projectTypeTestData[0].description)
    })
}

  /**
   * Select a workflow category from the dropdown.
   * @param category - The category to select.
   */
  async selectWorkflowCategory() {   
    await Allure.step('Select workflow category', async () =>  {       
    await this.workFlowCategory.click()
    await this.workFlowDropdown.isVisible()
    await this.selectWorkflowDropdown.click()
  })

  }

  /**
   * Click the Manage Participants button.
   * @param participants - The participants to search for.
   */
  async clickManageParticipantsButton() {   
    await Allure.step('Click on manage participants button and add participants', async () =>  {                  //participants: string
    await this.manageParticipantsButton.click()
    expect(await this.manageParticipantsModal.isVisible()).toBeTruthy()
    await this.searchParticipantsInput.fill(projectTypeTestData[0].participants[0])
    await this.selectParticipant.click()
    await this.closeManageParticipantsModal.click()
  })
}

  
  async rdtoggleProjectType() {
    await Allure.step('Enable R&D toggle button and validate the enabling', async () =>  {
    await this.toggleButton.scrollIntoViewIfNeeded()
    const isChecked = await this.toggleButton.isChecked()
    console.log('Is the toggle button checked?', isChecked)

    if (!isChecked) {
      await this.toggleButton.click()
      console.log('Toggle button has been clicked to enable.')
    } else {
      console.log('Toggle button is already enabled.')
    }
  })
}

  
  async clickCreateButton() {
    await Allure.step('Click on create button to creata a project type', async () =>  {
    await this.createButton.click()
  })
}

  
  async verifyProjectTypeVisible() {
    await Allure.step('Validate the newly created project type is visible on the project type page', async () =>  {
    await expect(this.projectTypeHeader).toBeVisible()
    await expect(this.projectTypeTitle).toBeVisible()
        
      })
      await Allure.step('New project type creation step', async () => {
      console.log(`New Project Type: ${projectTypeTestData} is created successfully`);
    })
  }
  async clickOnEditButton() {
    await Allure.step('Click on the edit button of a project type' , async () => {
      await this.projectTypeEditButton.click()
      expect(await this.projectTypeEditModal.isVisible()).toBeTruthy()
    })
  }
  async editProjectType() {
    await Allure.step('Edit the project title of a project type' , async () => {
      await this.titleInput.fill("")
      await this.titleInput.fill(projectTypeTestData[1].title)
      await this.descriptionInput.fill("")
      await this.descriptionInput.fill(projectTypeTestData[1].description)
      await this.manageParticipantsButton.click()
      expect(await this.manageParticipantsModal.isVisible()).toBeTruthy()
      await this.removeParticipants.click()
      await this.closeManageParticipantsModal.click()
      await this.saveProjectType.click()
    })
  }
  async updatedProjectType() {
    await Allure.step('Validate that updated details of project type is visible on the page' , async () => {
      const updatedProjectTitle = this.page.locator(`span:has-text("${projectTypeTestData[1].title}")`)
      await expect(updatedProjectTitle).toBeVisible()
      const updatedProjectDescription = this.page.locator(`span:has-text("${projectTypeTestData[1].description}")`)
      await expect(updatedProjectDescription).toBeVisible()
      const projectTypeRow = this.page.locator(`span:has-text("${projectTypeTestData[1].title}")`).locator('..')
      const participantsCell = await projectTypeRow.locator('td:nth-child(5) .SmartTable-module_cellContent__fmjZa').first()
      const participantCount = await participantsCell.locator('.BaseCellWrapper-module_wrapper__XCaQu .UserCell-module_content__QhX53').nth(0).count()
      expect(participantCount).toBe(0)
    })

  }

  async deleteProjectType() {
    await Allure.step('Click delete icon on project type page to delete the project' , async () => {
      await this.deleteIcon.click()
      await this.deleteButton.click()
  })
  }

  async validateDeleteProjectType() {
    await Allure.step('Validate that selected project type is deleted successfully' , async () => {
      const updatedProjectTitle = this.page.locator(`span:has-text("${projectTypeTestData[1].title}")`).count()
      expect(updatedProjectTitle).toBe(0)

    })
  }

}
function validateProjectType() {
  throw new Error('Function not implemented.')
}

