import { Locator, Page , expect} from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'
import { addProjectData } from 'utils/test-data/project-management/add-project-data'
import { newContractorDetails } from 'utils/test-data/project-management/allocation-data'
import {otherCostDetails } from 'utils/test-data/project-management/allocation-data'


export class ResourceAllocation {
    private page: Page
    private translations: Record<string, any>
    private textLocator : Locator
    private navigationButton: Locator
    private allProjectsFilter: Locator
    private validateDropdown: Locator
    private scrollableDivLocator: Locator
    private projectListVisible: Locator
    private selectProjectname: Locator
    private projectTitleVisiblePersonnelAllocation: Locator
    private assignFirstEmployee: Locator
    private assignSecondEmployee: Locator
    private deassignConfirmModal: Locator
    private deassignConfirmButton: Locator
    private searchForEmployeeFilter: Locator
    private contractorAllocationButton: Locator
    private contractorAllocationPageLoaded: Locator
    private expandSideBar: Locator
    private closeExpandBar: Locator
    private sideBarContentVisible: Locator
    private newContractorButton: Locator
    private newContractorModal: Locator
    private closeNewContractorModal: Locator
    private contractorNameInput: Locator
    private contractorCountryField: Locator
    private contractorCounntryDropdown: Locator
    private selectContractorCountry: Locator
    private contractorBussinessForm: Locator
    private contractorBusinessFormDropdown: Locator
    private selectBusinessForm: Locator
    private contractorTaxNumber: Locator
    private addContractorButton: Locator
    private validateContractorAdded: Locator
    private updatedContractorName: Locator
    private projectTitleVisibleContractorAllocation: Locator
    private otherCostAllocationButton: Locator
    private otherCostAllocationPageLoaded: Locator
    private newOtherCostButton: Locator
    private newOtherCostModal: Locator
    private otherCostTitle: Locator
    private saveOtherCostButton: Locator
    private validateOtherCostAdded: Locator
    private contractorMenuButton: Locator
    private contractorMenuOptions: Locator
    private updatedContractorMenuButton: Locator
    private contractorEditButton: Locator
    private contractorDeleteButton: Locator
    private deleteContractorModal: Locator
    private deleteContractor: Locator 
    private contractorEditModal: Locator
    private editContractorNameSection: Locator
    private updateContractor: Locator
    private searchForContractor: Locator
    private assignToProjectContractor: Locator
    private deassignContractorFromProject: Locator
    private deassignContractorConfirmModal: Locator
    private deassignConfirmButtonContractor: Locator



  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('pm', locale)
    this.textLocator = page.locator('//*[@class="pp25_iayy8XC2f7IU9mr"]//span')
    this.navigationButton = page.locator('span:nth-child(5)') 
    this.allProjectsFilter = page.getByPlaceholder(this.translations.common["all_projects"])
    this.validateDropdown = page.getByRole('textbox', { name: 'Search', exact: true })
    this.scrollableDivLocator = page.locator('div._list_nwlud_1._list_m_nwlud_31._list_withSearch_nwlud_47')
    this.selectProjectname = page.locator(`._list_nwlud_1._list_m_nwlud_31._list_withSearch_nwlud_47 button[type="button"] span:has-text("${addProjectData.projectShortTitle}")`)
    this.projectListVisible = page.getByText(this.translations.crossProjectData.assigned_employees)
    this.projectTitleVisiblePersonnelAllocation = page.locator(`.pp25_iayy8XC2f7IU9mr span:has-text("${addProjectData.projectShortTitle}")`)
    this.assignFirstEmployee = page.locator('.pZFG9RiP1t8mFP2wDBU1 > div > span').first()
    this.assignSecondEmployee = page.locator('.pZFG9RiP1t8mFP2wDBU1 > div > span').nth(2)
    this.deassignConfirmModal = page.locator(`div.confirm-modal-container-body-message:has-text("${this.translations.crossProjectData.confirm_remove_employee}")`);
    this.deassignConfirmButton = page.getByRole('button', { name: this.translations.crossProjectData["confirm"]})
    this.searchForEmployeeFilter = page.getByPlaceholder(this.translations.crossProjectData["search_for_employee"])
    this.contractorAllocationButton = page.locator('._sidebarSubMenuButton__content_16zcl_834').nth(1)
    this.contractorAllocationPageLoaded = page.getByText(this.translations.crossProjectData.assign_contractors_to_each_project)
    this.expandSideBar = page.locator('button._collapseButton_16zcl_522._collapseButton_collapsed_16zcl_552 svg._collapseButton__icon_16zcl_543')
    this.closeExpandBar = page.locator('._collapseButton_16zcl_522')
    this.sideBarContentVisible = page.locator('._sidebarGroup_16zcl_105').nth(0)
    this.newContractorButton = page.getByRole('button', { name: this.translations.crossProjectData.new_contractor})
    this.newContractorModal = page.locator(`div.styles-module_modal__f2oC3 :has-text("${this.translations.crossProjectData.new_contractor}")`).nth(2)
    this.closeNewContractorModal = page.locator('button.styles-module_headerCloseButton__x2ELS')
    this.contractorNameInput = page.locator('div.vkF5gGQNEeHQAep9w6QY input').first()
    this.contractorCountryField =page.locator('div.vkF5gGQNEeHQAep9w6QY input').nth(1)
    this.contractorCounntryDropdown = page.locator('._list_dd6fb_14')
    this.selectContractorCountry = page.getByRole('button' , {name: this.translations.crossProjectData.table.country_name_algeria})
    this.contractorBussinessForm = page.locator('div.vkF5gGQNEeHQAep9w6QY input').nth(2)
    this.contractorBusinessFormDropdown = page.locator('._list_dd6fb_14')
    this.selectBusinessForm = page.getByRole('button', { name: 'Société par actions simplifiée' })
    this.contractorTaxNumber = page.locator('div.vkF5gGQNEeHQAep9w6QY input').nth(3)
    this.addContractorButton = page.getByRole('button', { name: this.translations.crossProjectData.add_contractor})
    this.validateContractorAdded = page.locator(`.I_blm39yUhplbgqn5xcj .kqVJPJT2tzbyJTJHOztF span:has-text("${newContractorDetails.contractorName}")`)
    this.updatedContractorName = page.locator(`.I_blm39yUhplbgqn5xcj .kqVJPJT2tzbyJTJHOztF span:has-text("${newContractorDetails.updatedContractorName}")`)       
    this.projectTitleVisibleContractorAllocation = page.locator(`.fssMmTQFndvnV7bDxVzw span:has-text("${addProjectData.projectShortTitle}")`)
    this.otherCostAllocationButton = page.locator('._sidebarSubMenuButton__content_16zcl_834').nth(2)
    this.otherCostAllocationPageLoaded = page.getByText(this.translations.crossProjectData.assign_other_costs_to_each_project)
    this.newOtherCostButton = page.getByText(this.translations.crossProjectData.add_new_cost)
    this.newOtherCostModal =  page.getByText(this.translations.crossProjectData.new_other_cost)
    this.otherCostTitle = page.getByLabel(this.translations.crossProjectData.other_cost_input_field_label)
    this.saveOtherCostButton = page.getByRole('button', { name: this.translations.crossProjectData.save})
    this.validateOtherCostAdded = page.locator(`.NEJbX_BxyZbYVchhOd2L span:has-text("${otherCostDetails.otherCostTitle}")`).first()
    this.contractorMenuButton = this.validateContractorAdded.locator('xpath=ancestor::div[@class="pPEq4CoPbkKDQBAU3rpf"]//div[@class="FZxW22iN9001LKva5sgO"]')
    this.updatedContractorMenuButton = this.updatedContractorName.locator('xpath=ancestor::div[@class="pPEq4CoPbkKDQBAU3rpf"]//div[@class="FZxW22iN9001LKva5sgO"]')
    this.contractorMenuOptions = page.locator('._menu_1xinv_1')
    this.contractorEditButton = page.getByRole('button', { name: this.translations.crossProjectData.edit})
    this.contractorDeleteButton = page.getByRole('button', { name: this.translations.crossProjectData.delete})
    this.contractorEditModal = page.getByText(this.translations.crossProjectData.edit_contractor)
    this.editContractorNameSection = page.getByRole('heading', { name: newContractorDetails.contractorName })
    this.updateContractor = page.getByRole('button', { name: this.translations.main["Update contractor"]})
    this.deleteContractorModal = page.locator('.confirm-modal-container-body-title')
    this.deleteContractor = page.getByRole('button', { name: this.translations.crossProjectData.delete})
    this.searchForContractor = page.getByPlaceholder(this.translations.crossProjectData["search_for_contractor"])
    //this.assignToProjectContractor = this.updatedContractorName.locator('following-sibling::div//span[text()="Assign to Project"]')
    //this.assignToProjectContractor = this.assignToProjectContractor = this.updatedContractorName.locator('xpath=following-sibling::div//span[text()="Assign to Project"]')
    this.assignToProjectContractor = page.getByText(this.translations.crossProjectData.table.assign_to_project).nth(5)
    this.deassignContractorFromProject = page.getByText(this.translations.crossProjectData.table.assigned_to_project)
    this.deassignContractorConfirmModal = page.getByText(this.translations.crossProjectData.confirm_remove_employee)
    this.deassignConfirmButtonContractor = page.getByRole('button', { name: this.translations.common.confirm})
  }


async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to project management personnel allocation', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.projectManagement.projects.resourceAllocation}`)
    })
  }
  
  async clcikAllProjectsFilter() {
    await Allure.step('Click all projects filter in personnel allocation', async () => {
      await this.page.waitForLoadState('networkidle')
        this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForTimeout(1000)
        await this.allProjectsFilter.waitFor({ state: 'visible', timeout: 20000 })
      await this.allProjectsFilter.click({ force: true })
      expect (this.validateDropdown).toBeVisible()
    })
  }

  async validateAllProjectsFilter() {
    await Allure.step('Validate selected project is visible in the main page', async () => {
      await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      //await this.page.waitForTimeout(800)
      await (this.selectProjectname).scrollIntoViewIfNeeded()
      await expect(this.selectProjectname).toBeVisible()
      await this.selectProjectname.click()
      await this.allProjectsFilter.click()
      expect (this.projectTitleVisiblePersonnelAllocation).toBeVisible(({ timeout: 20000 }))
})
}

async assignEmployeeToProject() {
  await Allure.step('Click on Assign to Project for first employee', async () => {
      //await this.page.waitForTimeout(1000)
      await this.assignFirstEmployee.waitFor({ state: 'visible', timeout: 3000 })
      expect (this.assignFirstEmployee).toBeVisible()
      this.assignFirstEmployee.click({force: true})
      expect (this.assignFirstEmployee).toBeVisible(({ timeout: 10000 }))
      expect (this.assignFirstEmployee).toHaveText(this.translations.crossProjectData.table.assigned_to_project)
      await this.page.waitForTimeout(10000)
  })
}

// async assignSecondEmployeeToProject() {
//   await Allure.step('Click on Assign to Project for second employee', async () => {
//       //await this.page.waitForTimeout(1000)
//       await this.assignSecondEmployee.waitFor({ state: 'visible', timeout: 3000 })
//       expect (this.assignSecondEmployee).toBeVisible()
//       this.assignSecondEmployee.click({force: true})
//       expect (this.assignSecondEmployee).toBeVisible(({ timeout: 10000 }))
//       expect (this.assignSecondEmployee).toHaveText(this.translations.crossProjectData.table.assigned_to_project)
//   })
// }

async deassignFirstEmployeeFromProject() {
  await Allure.step('Remove the second employee after assigning ', async () => {
    await this.assignFirstEmployee.waitFor({ state: 'visible' })
    expect (this.assignFirstEmployee).toBeVisible()
    this.assignFirstEmployee.click({force: true})
    expect (this.deassignConfirmModal).toBeVisible({ timeout: 30000 })
    await this.deassignConfirmButton.click()
    expect (this.assignFirstEmployee).toBeVisible(({ timeout: 30000 }))
    expect (this.assignFirstEmployee).toHaveText(this.translations.crossProjectData.table.assign_to_project)
  })
}

async searchForEmployeeFilterValidation() {
  await Allure.step('Click on search for employee filter and validate its functioning', async () => {
    await expect(this.searchForEmployeeFilter).toBeVisible()
      await this.searchForEmployeeFilter.click()
      await this.searchForEmployeeFilter.fill('m')
      await this.page.waitForTimeout(1000)
      const employeeNameLocator = this.page.locator('.nwp0o9zeqlMsx85zgDcb')
      const count = await employeeNameLocator.count();
  await Allure.step(`Total Visible Employees: ${count}`, async () => {
  })
  for (let i = 0; i < count; i++) {
    const name = await employeeNameLocator.nth(i).innerText()
    await Allure.step(`Employee Name: ${name}`, async () => {
      expect(name.toLowerCase()).toContain('m') 
    })
  }
})
}

async expandSidebarContent() {
  await Allure.step('Click on expand button and validate that sidebar content is loaded', async () => {
    await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      await this.expandSideBar.waitFor({ state: 'visible', timeout: 10000 })
      await this.expandSideBar.click()    
  })
}

async closeExpandSidebar() {
  await Allure.step('Close the sidebar', async () => {
    await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      await this.closeExpandBar.waitFor({ state: 'visible', timeout: 10000 })
      await this.closeExpandBar.click()    
  })
}

async validateSidebarContent() {
  await Allure.step('Validate that sidebar content is loaded', async () => {
    await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      //await this.page.waitForTimeout(1000)
      expect (this.sideBarContentVisible).toBeVisible({timeout: 1000})
      
      
  })
}

async clickContractorAllocation() {
await Allure.step('Click on contractor allocation button', async () => {
  await this.page.waitForLoadState('networkidle')
    await this.page.waitForLoadState('domcontentloaded')
    await this.contractorAllocationButton.click()
})
}

async validateContractorAllocationPage() {
  await Allure.step('Click on contractor allocation button and validate that page is loaded', async () => {
    await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      await this.contractorAllocationPageLoaded.waitFor({ state: 'visible', timeout: 10000 })
      expect (this.contractorAllocationPageLoaded).toBeVisible()
      await this.page.waitForLoadState('domcontentloaded')
      //await this.page.waitForTimeout(1000)
  })
}

async clickNewContractorButton() {
  await Allure.step('Click on new contractor button and validate that modal is loaded', async () => {
    await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      await this.newContractorButton.waitFor({ state: 'visible', timeout: 5000 })
      await this.newContractorButton.click()
  })
}

async validateNewContractorModalAppears() {
  await Allure.step('After clciking on add contractor button ensures modal apear', async () => {
      await expect (this.newContractorModal).toBeVisible({ timeout: 10000 })
      await this.page.waitForLoadState('domcontentloaded')
  })
}

async closingNewContractorModal() {
  await Allure.step('Click on cross icon to close the new contractor modal', async () => {
      await this.page.waitForLoadState('domcontentloaded')
      await this.closeNewContractorModal.click()
  })
}

async fillContractorName() {  
    await Allure.step('Fill the contractor name', async () =>  {     
      await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      await this.page.waitForTimeout(2000)
      await this.contractorNameInput.click()       
    await this.contractorNameInput.fill(newContractorDetails.contractorName)
  })
}

async chooseContractorCountry() {  
  await Allure.step('Select country for contractor', async () =>  { 
    await this.contractorCountryField.click()      
    await expect (this.contractorCounntryDropdown).toBeVisible()         
    await this.selectContractorCountry.click()
  })
}

async chooseContractorBusineesForm() {  
  await Allure.step('Select business form for contractor', async () =>  { 
    await this.contractorBussinessForm.click()      
    await expect (this.contractorBusinessFormDropdown).toBeVisible()         
    await this.selectBusinessForm.click()
  })
}

async fillContractorTaxNumber() {  
  await Allure.step('Fill contractor tax number', async () =>  { 
    await this.contractorTaxNumber.click()               
    await this.contractorTaxNumber.fill(newContractorDetails.taxNumber)
  })
}

async clickAddContractor() {
  await Allure.step('Click on add contractor button after filling all the details of contractor', async () => {
    await this.addContractorButton.click()
    await this.page.waitForLoadState('domcontentloaded')
  })
}

async validateNewContractorAdded() {
  await Allure.step('Validate that new contractor is added', async () => {
    await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      await this.page.waitForTimeout(2000)
    expect (this.validateContractorAdded).toContainText(newContractorDetails.contractorName)
  })
}

async clickContractorMenuButton() {
  await Allure.step('Click on the menu option of newly added contractor', async () => {
    expect (this.validateContractorAdded).toHaveCount(1, {timeout: 20000})
    await this.validateContractorAdded.scrollIntoViewIfNeeded()
    await this.contractorMenuButton.click()
    await expect (this.contractorMenuOptions).toBeVisible({ timeout: 10000 })
  })
}

async clickEditContractor() {
  await Allure.step('Validate clicking on eidt conractor button and ensure modal appears', async () => {
    await this.contractorEditButton.click()
   this.contractorEditModal.waitFor({ state: 'visible', timeout: 3000 })
  })
}

async editContractorName() {
  await Allure.step('Editing the contrctor details', async () => {
    await expect (this.editContractorNameSection).toBeVisible()
    await this.editContractorNameSection.click()
    await this.contractorNameInput.fill(newContractorDetails.updatedContractorName)
  })
}

async validateupdatedContractorName() {
  await Allure.step('Validating the contractor updated name', async () => {
    await this.page.waitForLoadState('networkidle')
      this.page.waitForLoadState('domcontentloaded')
      await this.updatedContractorName.waitFor({ state: 'visible', timeout: 5000 })
      //await this.page.waitForTimeout(2000)
    expect (this.updatedContractorName).toContainText(newContractorDetails.updatedContractorName )
    //expect (this.updatedContractorName).toBeVisible({timeout: 10000})
  })
}

async updateContractorName() {
  await Allure.step('Saving the updated details by clicking on update contractor button', async () => {
    await this.updateContractor.click()
  })
}

async validatingSearchForContractorFilter() {
  await Allure.step('Validating the search for contractor filter in contractor allocation', async () => {
    await this.searchForContractor.click()
    await this.searchForContractor.fill(newContractorDetails.updatedContractorName)
    
    const contractorNameLocator = this.page.locator('.nwp0o9zeqlMsx85zgDcb')
    const count = await contractorNameLocator.count();
  await Allure.step(`Total Visible contractor: ${count}`, async () => {
  })
    for (let i = 0; i < count; i++) {
       const name = await contractorNameLocator.nth(i).innerText()
       await Allure.step(`Contractor Name: ${name}`, async () => {
       expect(name.toLowerCase()).toContain(newContractorDetails.updatedContractorName) 
  })
  }
  await this.searchForContractor.fill('')
})
}

async validateAllProjectsFilterForContractorAllocation() {
  await Allure.step('Validate selected project is visible in the contractor allocation page', async () => {
    await this.page.waitForLoadState('networkidle')
    this.page.waitForLoadState('domcontentloaded')
    //await this.page.waitForTimeout(800)
    await (this.selectProjectname).scrollIntoViewIfNeeded()
    await expect(this.selectProjectname).toBeVisible()
    await this.selectProjectname.click()
    await this.allProjectsFilter.click()
    expect (this.projectTitleVisibleContractorAllocation).toBeVisible(({ timeout: 20000 }))
})
}

async assignContractorToProject() {
  await Allure.step('Assigning the contractor to project', async () => {
    await this.page.waitForLoadState('networkidle')
    this.page.waitForLoadState('domcontentloaded')
    await this.updatedContractorName.scrollIntoViewIfNeeded()
    await this.assignToProjectContractor.waitFor({ state: 'visible', timeout: 5000 })
    await this.assignToProjectContractor.click()
    expect (this.deassignContractorFromProject).toBeVisible({timeout: 10000})
  }) 
}

async removingContractorFromProject() {
  await Allure.step('Removing the contractor from project', async () => {
    // await this.page.waitForLoadState('networkidle')
    // this.page.waitForLoadState('domcontentloaded')
    //await this.updatedContractorName.scrollIntoViewIfNeeded()
    //expect (this.deassignContractorFromProject).toBeVisible({timeout: 10000})
    await this.page.waitForTimeout(5000)
    await this.deassignContractorFromProject.click()
    expect (this.deassignContractorConfirmModal).toBeVisible({timeout: 20000})
    await this.deassignConfirmButtonContractor.click()
    await this.assignToProjectContractor.waitFor({ state: 'visible', timeout: 5000 })
    expect (this.assignToProjectContractor).toBeVisible()
  })
}

async clickDeleteContractor() {
  await Allure.step('Click on delete contractor button and validate that modal is appeared', async () => {
    await this.page.waitForLoadState('networkidle')
    this.page.waitForLoadState('domcontentloaded')
    await this.updatedContractorName.scrollIntoViewIfNeeded()
    await this.updatedContractorMenuButton.click()
    await expect (this.contractorMenuOptions).toBeVisible({ timeout: 10000 })
    await this.contractorDeleteButton.click()
    await this.deleteContractorModal.waitFor({ state: 'visible', timeout: 50000 }) 
    await this.deleteContractor.click()
  })
}

async validateContractorDeleted() {
  await Allure.step('Validate that contractor is deleted', async () => {  
    await this.page.waitForLoadState('networkidle')
    this.page.waitForLoadState('domcontentloaded')
    await this.updatedContractorName.waitFor({ state: 'hidden', timeout: 5000 })
    const count = await this.updatedContractorName.count()
    expect(count).toBe(0)

  })
}


async clickOtheCostAllocation() {
  await Allure.step('Click on other cost allocation button', async () => {
    await this.page.waitForLoadState('networkidle')
      await this.page.waitForLoadState('domcontentloaded')
      await this.otherCostAllocationButton.click()
  })
  }

  async validateOtherCostAllocationPage() {
    await Allure.step('After clicking on other cost allocation button and validate that page is loaded', async () => {
      await this.page.waitForLoadState('networkidle')
        this.page.waitForLoadState('domcontentloaded')
        expect (this.otherCostAllocationPageLoaded).toBeVisible({timeout: 30000})
        // await this.page.waitForLoadState('domcontentloaded')
        // await this.page.waitForTimeout(1000)
  
  
    })
  }

  async clickNewOtherCostButton() {
    await Allure.step('Click on new other cost button and validate that modal is appeared', async () => {
      await this.page.waitForLoadState('networkidle')
        this.page.waitForLoadState('domcontentloaded')
        // await this.page.waitForTimeout(1000)
        await this.newOtherCostButton.waitFor({ state: 'visible', timeout: 5000 })
        await this.newOtherCostButton.click()
    })
  }
  
  async validateNewOtherCostModalAppears() {
    await Allure.step('After clicking on new other cost button ensures modal should appear', async () => {
        await expect (this.newOtherCostModal).toBeVisible({ timeout: 10000 })
        await this.page.waitForLoadState('domcontentloaded')

    })
  }

  async addNewOtherCost() {
    await Allure.step('Click on New Cost button and add other cost', async () => {
        await this.otherCostTitle.click()
        await this.otherCostTitle.fill(otherCostDetails.otherCostTitle)
        await this.saveOtherCostButton.click()
        await this.page.waitForLoadState('domcontentloaded')
    })
  }

  async validateAddedNewOtherCost() {
    await Allure.step('Validate the newly added other cost', async () => {
        this.page.waitForLoadState('domcontentloaded')
        //await this.page.waitForTimeout(1000)
        await this.validateOtherCostAdded.waitFor({ state: 'visible', timeout: 10000 })
        const count = await this.validateOtherCostAdded.count()
        expect(count).toBeGreaterThan(0)
   })
  }

}