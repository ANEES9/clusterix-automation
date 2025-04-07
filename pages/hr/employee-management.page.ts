import { Page, Locator, expect } from '@playwright/test'
import { getTranslations } from 'common/get-translations-helper'
import { employeeTable } from 'shared/utils/test-data/hr/employee-management-data'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'

export class EmployeeManagementPage {
  readonly page: Page
  private translations: Record<string, any>

  //employee management Locators
  private employeeManagement: Locator
  private employeeRecruitment: Locator
  private searchBoxLocator: Locator
  private fullTableLocator: Locator
  private searchResultNameLocator: Locator
  private noMatchingFoundTextLoacor: Locator
  private headingTextLocator: Locator
  private totalNumberOfEmployeeLocator: Locator
  private expandBardWrapperLocator: Locator
  private countBeforeSelectingAllEmployeesLocator: Locator
  private SelectAllCheckBoxForEmployeeTableLocator: Locator
  private countAfterSelectingAllEmployeesLocator: Locator
  private exportAllLocator: Locator
  private magnifierButtonLocator: Locator
  private appliedChipLocator: Locator
  private deleteEmployeeInTableLocator: Locator
  private exportSelectedAllLocator: Locator
  private deleteSelectedAll: Locator
  private hideBradWrapperLocator: Locator

  // Filter Locators
  private collapseButtonLocator: Locator
  private filterToggleButtonLocator: Locator
  private locationFilterCategoryLocator: Locator
  private dropdownLocator: Locator
  private apNorthLocationOptionLocator: Locator
  private unselectLocationLocator: Locator

  private moscowLocationOptionLocator: Locator
  private genderFilterCategoryLocator: Locator
  private maleGenderOptionLocator: Locator
  private getFilterOptionLocator: (filterValue: string) => Locator
  private initialFilterCountLocator: Locator
  private resetAllFilters: Locator
  private filterCount: Locator
  private contractTypeFilterCategoryLocator: Locator
  private recruiterFilterCategoryLocator: Locator
  private roleFilterCategoryLocator: Locator
  private roleSelectionDropdownLocator: Locator
  private departmentFilterCategoryLocator: Locator
  private contractStatusFilterCategoryLocator: Locator
  private contractStatusIn2MonthsOptionLocator: Locator
  private contractStatusAllOptionLocator: Locator

  //Employee Create Modal
  private readonly createEmployeeButton: Locator
  private readonly firstNameInput: Locator
  private readonly lastNameInput: Locator
  private readonly datePickerInput: Locator
  private selectToday: Locator
  private readonly saveButton: Locator

  // employee Profile modal Locators
  private deleteButtonLocator: Locator
  private saveButtonLocator: Locator
  private closeEmployeeModel: Locator
  private editEmployeeLocator: Locator
  private employeeProfileOptionLocator: Locator
  private deleteEmployeeOptionLocator: Locator
  private terminateEmployeeOptionLocator: Locator
  private confirmTerminationLocator: Locator

  //Toast message locator
  private deleteToastMessage: Locator
  private terminateToastMessage: Locator

  //constructor
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)

    //Empoyee Management Home Page
    this.employeeManagement = page.locator(
      '(//div[@class="_wrapper_qiky4_1"])[6]'
    )
    this.employeeRecruitment = page.getByRole('button', {
      name: /Employee recruitment|Mitarbeitergewinnung/
    })

    this.searchBoxLocator = page.getByRole('textbox', { name: 'Search' })
    this.magnifierButtonLocator = page.locator(
      '(//*[@class="_wrapper_1p4sk_1"])[14]'
    )
    this.fullTableLocator = page.locator('//*[@class="_table_1savp_1"]')
    this.searchResultNameLocator = page.locator(
      '(//div[@class="_text_lmxgk_25 _bold_lmxgk_46"])[1]'
    )
    this.noMatchingFoundTextLoacor = page.locator(
      '.EmptyState-module_title__-piqa'
    )
    this.headingTextLocator = page.getByRole('heading', {
      name: this.translations.additional.headingText,
    })
    this.totalNumberOfEmployeeLocator = page.locator(
      '(//*[@class="_label_1ey6o_19"])[1]'
    )
    this.expandBardWrapperLocator = page.locator(
      '(//*[@class="_wrapper_9tzoo_1"])[2]'
    )
    this.hideBradWrapperLocator = this.page.locator('//*[@class="_wrapper_9tzoo_1 _active_9tzoo_31"]')

    this.countBeforeSelectingAllEmployeesLocator = page.locator(
      '((//*[@class="_wrapper_e9gl4_1"])[2])//div/div'
    )
    this.SelectAllCheckBoxForEmployeeTableLocator = page.locator(
      '((//*[@class="_lSide_702r4_52"])[2])//div/div'
    )
    this.countAfterSelectingAllEmployeesLocator = page.locator(
      '((//*[@class="_wrapper_e9gl4_1"])[2])//div/div'
    )
    this.exportAllLocator = page.getByText(
      this.translations.additional.exportAll
    )
    this.exportSelectedAllLocator = page.locator(
      '(//*[@class="_button__name_61s7l_25"])[3]'
    )
    this.deleteSelectedAll = page.locator(
      '(//*[@class="_button__name_61s7l_25"])[4]'
    )
    this.appliedChipLocator = this.page.locator(
      '(//*[@class="_chipTitle_1kw18_14"])[1]'
    )
    this.deleteEmployeeInTableLocator = page.locator(
      '(//*[@class="_wrapper_15srw_1"])[2]'
    )


    //General Filter Locators
    this.filterToggleButtonLocator = this.page.getByText('Filters', {
      exact: true,
    })
    this.resetAllFilters = this.page.locator(
      '(//*[@class="_filtersHeader_gpc1h_19"])//button'
    )
    this.getFilterOptionLocator = (filterValue: string) =>
      this.page.getByRole('button', { name: filterValue, exact: true })
    this.collapseButtonLocator = page.locator(
      '//*[@class="_button__toggle_l7kvi_50"]'
    )


    //Location Filters Locators
    this.locationFilterCategoryLocator = this.page.locator(
      '(//*[@class="_button__name_l7kvi_19"])[1]'
    )
    this.dropdownLocator = this.page.locator(
      '(//*[@class="_dropdown_1ew5s_1"])'
    )
    this.apNorthLocationOptionLocator = page.getByRole('button', {
      name: 'AP North2214',
    })
    this.unselectLocationLocator = this.page.getByRole('button', { name: 'AP North2214', exact: true })
    this.moscowLocationOptionLocator = page.getByRole('button', {
      name: 'Moscow',
    })

    //Gender Filters Locators
    this.genderFilterCategoryLocator = this.page.locator(
      '(//*[@class="_button__name_l7kvi_19"])[4]'
    )
    this.maleGenderOptionLocator = this.page.getByRole('button', {
      name: 'male',
      exact: true,
    })
    this.contractTypeFilterCategoryLocator = this.page.locator(
      '(//*[@class="_button__name_l7kvi_19"])[5]'
    )
    this.recruiterFilterCategoryLocator = this.page.locator(
      '(//*[@class="_button__name_l7kvi_19"])[6]'
    )
    this.roleFilterCategoryLocator = this.page.locator(
      '(//*[@class="_button__name_l7kvi_19"])[7]'
    )
    this.roleSelectionDropdownLocator = this.page.locator(
      '(//*[@class="_dropdown_1ew5s_1"])[5]'
    )

    this.departmentFilterCategoryLocator = this.page.locator(
      '(//*[@class="_button__name_l7kvi_19"])[11]'
    )
    this.contractStatusFilterCategoryLocator = page.locator('(//*[@class="_button__name_l7kvi_19"])[14]')
    this.contractStatusIn2MonthsOptionLocator = page.locator(
      '(//*[@class="_listItem__name_cx3fq_23"])[3]'
    )
    this.contractStatusAllOptionLocator = page.locator(
      '(//*[@class="_listItem__name_cx3fq_23"])[1]'
    )
    this.filterCount = this.page.getByText('2', { exact: true }).first()
    this.initialFilterCountLocator = this.page
      .getByText('1', { exact: true })
      .first()

    //Employee create modal
    this.createEmployeeButton = page.locator(
      '(//*[@class="_button__name_61s7l_25"])[1]'
    )
    this.firstNameInput = this.page.locator('input[name="firstName"]')
    this.lastNameInput = this.page.locator('input[name="lastName"]')
    this.datePickerInput = this.page.locator(
      '(//*[@class="_field__inputWrapper_dlunb_52"])[4]'
    )
    this.selectToday = page.locator('(//*[@class="_button__name_61s7l_25"])[6]')
    this.saveButton = this.page.getByText(this.translations.literals.save)


    //EMployee Profile Modal
    this.deleteButtonLocator = page.getByRole('button', {
      name: this.translations.literals.delete,
    })
    this.saveButtonLocator = page.getByRole('button', {
      name: this.translations.literals.save,
    })
    this.closeEmployeeModel = page.locator(
      '(//*[@class="_header_1ojzh_76"])//button'
    )
    this.editEmployeeLocator = page.getByText(
      /Edit Employee|Mitarbeiter bearbeiten/
    )

    this.employeeProfileOptionLocator = page.locator(
      '(//*[@class="_button__icon_61s7l_18"])[3]'
    )
    this.deleteEmployeeOptionLocator = page
      .locator('button')
      .filter({ hasText: /^(Delete Employee|Mitarbeiter löschen)$/ })
    this.terminateEmployeeOptionLocator = page
      .locator('button')
      .filter({ hasText: /^(Terminate employment|Mitarbeiter entlassen)$/ })
    this.confirmTerminationLocator = page
      .locator('div')
      .filter({ hasText: /^(Terminate|Beenden)$/ })
      .first()

    //Toast message Locator
    this.deleteToastMessage = page.getByText(
      this.translations.additional.employeeDeleted
    )
    this.terminateToastMessage = page.getByText(
      this.translations.additional.employeeTerminated
    )
  }

  //GoTo Method
  async goto(baseURL: string | undefined) {
    await Allure.step('should navigate to my profile', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.hr.employeeManagement}`)
    })
  }

  //Other methods
  async verifyHeading() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
    await expect(this.headingTextLocator).toBeVisible()
  }

  async getTotalNumberOfEmployees() {
    await this.fullTableLocator.waitFor({ state: 'visible' })
    expect(this.totalNumberOfEmployeeLocator).toBeVisible()
  }

  async searchAndVerifyEmployee(searchValue: string) {
    await this.fullTableLocator.waitFor({ state: 'visible' })

    // Clear and enter the search value
    await this.searchBoxLocator.fill('')
    await this.searchBoxLocator.fill(searchValue)
    await this.page.waitForTimeout(2000)

    if (await this.fullTableLocator.isVisible()) {
      await expect(this.searchResultNameLocator).toHaveText(
        new RegExp(searchValue, 'i')
      )
    } else {
      await this.noMatchingFoundTextLoacor.waitFor({
        state: 'visible',
        timeout: 5000,
      })
      await expect(this.noMatchingFoundTextLoacor).toHaveText(
        new RegExp(employeeTable.NoItemFoundText.join('|'), 'i')
      )
    }


    await this.searchBoxLocator.fill('') //
  }

  async verifySelectAllEmployee() {
    await this.fullTableLocator.waitFor({ state: 'visible' })
    await this.expandBardWrapperLocator.waitFor({
      state: 'visible',
      timeout: 2000,
    })
    await this.expandBardWrapperLocator.click()
    const initialCountElement = this.countBeforeSelectingAllEmployeesLocator
    await expect(initialCountElement).toBeVisible()
    await this.SelectAllCheckBoxForEmployeeTableLocator.click()
    await this.countAfterSelectingAllEmployeesLocator.waitFor({
      state: 'visible',
    })
    const updatedCountElement = this.countAfterSelectingAllEmployeesLocator
    const updatedCountText = await updatedCountElement.textContent()
    const selectedCount = parseInt(updatedCountText || '0', 10)
    expect(selectedCount).toBeGreaterThan(0)
    await this.SelectAllCheckBoxForEmployeeTableLocator.click()
    await this.hideBradWrapperLocator.click()
  }
  async verfyEmployeeRecruitment() {
    await this.employeeRecruitment.click()
  }


  async verifyExportAll() {
    await this.fullTableLocator.waitFor({ state: 'visible' })
    await this.expandBardWrapperLocator.waitFor({
      state: 'visible',
      timeout: 1000,
    })
    await this.expandBardWrapperLocator.click()
    await this.SelectAllCheckBoxForEmployeeTableLocator.waitFor({
      state: 'visible',
      timeout: 1000,
    })
    await this.SelectAllCheckBoxForEmployeeTableLocator.click()

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.exportAllLocator.click(),
    ])

    expect(download).toBeDefined()
    await this.SelectAllCheckBoxForEmployeeTableLocator.click()
    await this.hideBradWrapperLocator.click()
  }


  async verifyExportSelected() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 2000 })
    this.page.locator('//*[@class="_wrapper_9tzoo_1"][2]').click()

    await this.SelectAllCheckBoxForEmployeeTableLocator.waitFor({
      state: 'visible',
    })
    await this.SelectAllCheckBoxForEmployeeTableLocator.click()

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.exportSelectedAllLocator.click(),
    ])

    expect(download).toBeDefined()

    await this.SelectAllCheckBoxForEmployeeTableLocator.click()
    await this.hideBradWrapperLocator.click()
  }

  async verifyDeleteSeleceted() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 2000 })
    await this.expandBardWrapperLocator.waitFor({ state: 'visible' })
    await this.expandBardWrapperLocator.click()
    await this.SelectAllCheckBoxForEmployeeTableLocator.waitFor({
      state: 'visible',
    })
    await this.SelectAllCheckBoxForEmployeeTableLocator.click()
    await expect(this.deleteSelectedAll).toBeVisible()
    await this.SelectAllCheckBoxForEmployeeTableLocator.click()
    await this.hideBradWrapperLocator.click()
  }

  //Filter methods
  async slecetGenderFilter() {
    await this.filterToggleButtonLocator.waitFor({
      state: 'visible',
      timeout: 2000,
    })
    await this.filterToggleButtonLocator.click()
    await this.genderFilterCategoryLocator.waitFor({
      state: 'visible',
      timeout: 2000,
    })
    await this.genderFilterCategoryLocator.click()
    await this.dropdownLocator.waitFor({
      state: 'visible',
      timeout: 2000,
    })
    await this.dropdownLocator.click()
    await this.maleGenderOptionLocator.click()
    await this.collapseButtonLocator.click()
    await this.filterToggleButtonLocator.click()

  }

  async selectLocationFilter() {
    await this.filterToggleButtonLocator.waitFor({
      state: 'visible',
    })
    await this.filterToggleButtonLocator.click()
    await this.locationFilterCategoryLocator.waitFor({
      state: 'visible',
      timeout: 2000,
    })
    await this.locationFilterCategoryLocator.click()
    await this.dropdownLocator.waitFor({ state: 'visible', timeout: 2000 })
    await this.dropdownLocator.click()
    await this.apNorthLocationOptionLocator.click()
    await this.collapseButtonLocator.click()
    await this.filterToggleButtonLocator.click()
  }

  async applyFilter(filters: { [key: string]: string }) {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 2000 })

    let appliedFilterCountText =
      await this.initialFilterCountLocator.textContent()
    let appliedFilterCount = parseInt(appliedFilterCountText?.trim() || '0', 10)

    for (const [filterType, filterValue] of Object.entries(filters)) {
      await this.filterToggleButtonLocator.click()

      let filterOptionLocator: any
      switch (filterType) {
        case 'gender':
          await this.genderFilterCategoryLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.genderFilterCategoryLocator.click()
          await this.dropdownLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.dropdownLocator.click()
          break

        case 'office':
          await this.locationFilterCategoryLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.locationFilterCategoryLocator.click()
          await this.dropdownLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.dropdownLocator.click()
          break

        case 'contractType':
          await this.contractTypeFilterCategoryLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.contractTypeFilterCategoryLocator.click()
          await this.dropdownLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.dropdownLocator.click()
          break

        case 'recruiter':
          await this.recruiterFilterCategoryLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.recruiterFilterCategoryLocator.click()
          await this.dropdownLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.dropdownLocator.click()
          filterOptionLocator = this.getFilterOptionLocator(filterValue)
          await filterOptionLocator.click()
          await this.filterToggleButtonLocator.click()
          await this.collapseButton()
          return

        case 'role':
          await this.roleFilterCategoryLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.roleFilterCategoryLocator.click()
          await this.dropdownLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.dropdownLocator.click()
          filterOptionLocator = this.getFilterOptionLocator(filterValue)
          await filterOptionLocator.click()
          await this.dropdownLocator.click()
          await this.filterToggleButtonLocator.click()
          await this.collapseButton()
          return

        case 'department':
          await this.departmentFilterCategoryLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.departmentFilterCategoryLocator.click()
          await this.dropdownLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.dropdownLocator.click()
          filterOptionLocator = this.getFilterOptionLocator(filterValue)
          await filterOptionLocator.click()
          await this.dropdownLocator.click()
          await this.filterToggleButtonLocator.click()
          await this.collapseButton()
          return

        case 'contractStatus':
          await this.contractStatusFilterCategoryLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.contractStatusFilterCategoryLocator.click()
          await this.dropdownLocator.waitFor({
            state: 'visible',
            timeout: 2000,
          })
          await this.dropdownLocator.click()
          await this.filterToggleButtonLocator.click()
          await this.collapseButton()
          return

        default:
          console.warn(`Unknown filter type: ${filterType}`)
      }

      await this.page.waitForTimeout(1000)
      filterOptionLocator = this.getFilterOptionLocator(filterValue)
      await filterOptionLocator.click()
      await this.collapseButtonLocator.waitFor({
        state: 'visible',
        timeout: 1000,
      })
      await this.collapseButtonLocator.click({ force: true })
      await this.filterToggleButtonLocator.click()
      appliedFilterCount++
    }
    await this.page.waitForLoadState('networkidle')

    if (appliedFilterCount > 1) {
      await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
    } else {
      await this.noMatchingFoundTextLoacor.waitFor({
        state: 'attached',
        timeout: 5000,
      })
      await expect(this.noMatchingFoundTextLoacor).toBeVisible()
    }
  }

  async verifyAppliedFilter(filterType: string, expectedValue: string) {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
    const isTableVisible = await this.fullTableLocator.isVisible()

    if (!isTableVisible) {
      throw new Error(
        `No employees found for applied filter: ${filterType} = ${expectedValue}`
      )
    }

    switch (filterType) {
      case 'gender':
      case 'office':
      case 'contractType':
      case 'recruiter':
      case 'role':
      case 'department':
        await this.verifyChipText(expectedValue)
        break

      case 'contractStatus':
        await this.resetAllFilters.click()
        await this.filterToggleButtonLocator.click()

      default:
        throw new Error(`Unknown filter type: ${filterType}`)
    }
  }

  async collapseButton() {
    await this.filterToggleButtonLocator.click()
    await this.collapseButtonLocator.click()
    await this.filterToggleButtonLocator.click()
  }

  async verifyChipText(expectedValue: string) {
    await this.filterToggleButtonLocator.click()
    await this.appliedChipLocator.waitFor({ state: 'visible', timeout: 1000 })
    const appliedChipText = await this.appliedChipLocator.innerText()
    expect(appliedChipText).toContain(expectedValue)
    await this.resetAllFilters.click()
    await this.filterToggleButtonLocator.click()
  }

  async ClearAllFilters() {
    await this.filterToggleButtonLocator.waitFor({ state: 'visible' })
    await this.filterToggleButtonLocator.click()
    await this.resetAllFilters.waitFor({ state: 'visible' })
    await this.resetAllFilters.click()
    await this.filterToggleButtonLocator.click()
  }

  async verifyClearAllFilters() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 2000 })
    const initialFilterCount =
      await this.initialFilterCountLocator.textContent()
    expect(initialFilterCount).toBe('1')
    await this.selectLocationFilter()
    this.ClearAllFilters()
    const afterClearingFilterCount =
      await this.initialFilterCountLocator.textContent()
    expect(afterClearingFilterCount).toBe('1')
  }

  async verifyFilterPersisted() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 2000 })
    await this.ClearAllFilters()
    const initialFilterCount =
      await this.initialFilterCountLocator.textContent()
    expect(initialFilterCount).toBe('1')
    await this.selectLocationFilter()

    this.filterCount.waitFor({ state: 'visible' })
    const updatedFilterCountText = await this.filterCount.textContent()
    expect(updatedFilterCountText).toBe('2')

    await this.refreshFilter()
    await this.page.waitForLoadState('networkidle')
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 2000 })

    await this.page.waitForSelector('text="2"')
    const persistedFilterCountText = await this.filterCount.textContent()
    expect(persistedFilterCountText).toBe('2')
    await this.ClearAllFilters()
  }

  async verifyFilterWhenNoMatcheFound() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
    await this.filterToggleButtonLocator.click()
    await this.locationFilterCategoryLocator.click()
    await this.dropdownLocator.waitFor({ state: 'visible' })
    await this.dropdownLocator.click()
    await this.moscowLocationOptionLocator.click()
    await this.filterToggleButtonLocator.click()
    await this.noMatchingFoundTextLoacor.waitFor({
      state: 'attached',
      timeout: 5000,

    })
    await expect(this.noMatchingFoundTextLoacor).toBeVisible()
    await this.filterToggleButtonLocator.click()
    await this.collapseButtonLocator.click()
    await this.resetAllFilters.click()
    await this.filterToggleButtonLocator.click()
  }

  async verifyUnselectingAFilter() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
    const countBeforeApplyingFilter =
      await this.initialFilterCountLocator.textContent()
    await this.selectLocationFilter()
    await this.filterToggleButtonLocator.click()
    await this.locationFilterCategoryLocator.click()
    await this.dropdownLocator.waitFor({ state: 'visible' })
    await this.dropdownLocator.click()
    await this.unselectLocationLocator.click()
    await this.collapseButtonLocator.click()
    await this.resetAllFilters.click()
    await this.filterToggleButtonLocator.click()
    await this.fullTableLocator.waitFor({ state: 'visible' })
    const countAfterRemovingAllFilters =
      await this.initialFilterCountLocator.textContent()
    expect(countBeforeApplyingFilter).toBe(countAfterRemovingAllFilters)
  }

  async applyContractStatusFilter() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
    await this.filterToggleButtonLocator.click()
    await this.contractStatusFilterCategoryLocator.waitFor({
      state: 'visible'
    })
    await this.contractStatusFilterCategoryLocator.click()
    await this.dropdownLocator.waitFor({
      state: 'visible'
    })
    await this.dropdownLocator.click({ force: true })
    await this.contractStatusAllOptionLocator.click({ force: true })
    await this.collapseButtonLocator.click({ force: true })
    await this.filterToggleButtonLocator.click()
  }

  async openCreateEmployeeModal() {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
    await this.createEmployeeButton.click()
    await this.firstNameInput.waitFor({ state: 'visible' })
  }

  async removeSidebar() {
    await this.page.evaluate(() => {
      const sidebar = document.querySelector(
        '._sidebarWrapper_1650e_1'
      ) as HTMLElement
      if (sidebar) {
        sidebar.remove()
      }
    })
  }

  async fillDetailsAndSave() {
    const firstName = this.generateRandomString()
    const lastName = this.generateRandomString()

    await this.firstNameInput.waitFor({ state: 'visible', timeout: 2000 })
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.waitFor({ state: 'visible', timeout: 2000 })
    await this.lastNameInput.fill(lastName)
    await this.datePickerInput.waitFor({ state: 'visible', timeout: 2000 })
    await this.datePickerInput.click()
    await this.selectToday.click()
    await this.saveButton.click()
    await this.editEmployeeLocator.waitFor({ state: 'visible', timeout: 3000 })
    await expect(this.editEmployeeLocator).toBeVisible()
    await this.page.waitForTimeout(2000)
    await this.closeEmployeeModel.click()
    return { firstName, lastName }
  }

  async verifyEmployeeInTable(employeeName: string) {
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 5000 })
    await this.applyContractStatusFilter()
    await this.searchBoxLocator.fill('')
    await this.searchBoxLocator.fill(employeeName)
    await this.searchResultNameLocator.waitFor({
      state: 'visible',
      timeout: 5000,
    })
    await expect(this.searchResultNameLocator).toHaveText(
      new RegExp(employeeName, 'i')
    )
    await this.searchBoxLocator.fill('')
  }

  async deleteAnEmployee(employeeName: string) {
    await this.applyContractStatusFilter()
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 5000 })
    await this.searchBoxLocator.fill('')
    await this.searchBoxLocator.fill(employeeName)
    await this.searchResultNameLocator.waitFor({
      state: 'visible',
      timeout: 5000,
    })
    await expect(this.searchResultNameLocator).toHaveText(
      new RegExp(employeeName, 'i')
    )
    await this.deleteEmployeeInTableLocator.click()
    await this.deleteButtonLocator.waitFor({ state: 'visible' })
    await this.deleteButtonLocator.click()
    await this.deleteToastMessage.waitFor({ state: 'visible' })
    await this.deleteToastMessage.isVisible()
    await this.searchBoxLocator.fill('')
  }

  async deleteAnEmployeeFromEmployeeModel(employeeName: string) {
    await this.applyContractStatusFilter()
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 5000 })
    await this.searchBoxLocator.fill('')
    await this.searchBoxLocator.fill(employeeName)
    await this.searchResultNameLocator.waitFor({
      state: 'visible',
      timeout: 5000,
    })
    await expect(this.searchResultNameLocator).toContainText(
      new RegExp(employeeName, 'i')
    )
    await this.magnifierButtonLocator.waitFor({
      state: 'visible',
    })
    await this.magnifierButtonLocator.click()
    await this.removeSidebar()
    await this.employeeProfileOptionLocator.waitFor({
      state: 'visible',
      timeout: 2000,
    })
    await this.employeeProfileOptionLocator.click({ force: true })
    await this.deleteEmployeeOptionLocator.click()
    await this.deleteButtonLocator.click()
    await this.deleteToastMessage.isVisible()
    await this.searchBoxLocator.fill('')
  }

  async terminateAnEmployee(employeeName: string) {
    await this.applyContractStatusFilter()
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
    await this.searchBoxLocator.fill('')
    await this.searchBoxLocator.fill(employeeName)
    await this.searchResultNameLocator.waitFor({
      state: 'visible',
      timeout: 5000,
    })
    await expect(this.searchResultNameLocator).toContainText(
      new RegExp(employeeName, 'i')
    )
    await this.magnifierButtonLocator.waitFor({
      state: 'visible',
    })
    await this.magnifierButtonLocator.click()
    await this.removeSidebar()
    await this.employeeProfileOptionLocator.waitFor({
      state: 'visible',
      timeout: 2000,
    })
    await this.employeeProfileOptionLocator.click({ force: true })
    await this.employeeProfileOptionLocator.scrollIntoViewIfNeeded()
    await this.terminateEmployeeOptionLocator.click()
    await this.confirmTerminationLocator.click({ force: true })
    await this.terminateToastMessage.isVisible()
    await this.searchBoxLocator.fill('')
  }

  //General method
  generateRandomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''

    const nameLength = Math.floor(Math.random() * (6 - 5 + 1)) + 5 // 5 to 6
    for (let i = 0; i < nameLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(randomIndex)
    }
    return result
  }

  async refreshFilter() {
    await this.employeeRecruitment.click()
    await this.employeeManagement.click()
    await this.fullTableLocator.waitFor({ state: 'visible', timeout: 3000 })
  }
}



