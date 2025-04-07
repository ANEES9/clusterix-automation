import { Page, Locator, expect } from '@playwright/test'
import { getTranslations } from '../../helpers/common/get-translations-helper'
import { Allure } from '../../helpers/common/allure-helper'
import { APP_URLS } from '../../shared/constants/app-urls'
import { EmployeeManagementPage } from '../../pages/hr/employee-management.page'

export class OpenPositionsPage {
  readonly page: Page
  private translations: Record<string, any>

  //employee management Locators
  private employeeManagement: Locator
  private employeeRecruitment: Locator
  private employeeManagementPage: EmployeeManagementPage
  private openPositiontableItems: Locator
  private openPositionNames: Locator
  private candidatePage: Locator
  private dailyPoolCardLocator: Locator

  private searchBoxLocator: Locator
  private openPositiontableLocator: Locator
  private searchResultNameLocator!: Locator
  private noMatchingFoundTextLoacor: Locator
  private openPositionMagnifierLocator: Locator
  private openPositionArchiveLocator: Locator
  private archiveConfirmationDescriptionLocator: Locator
  private moveToArchiveConfirmButtonLocator: Locator
  private restoreButtonLocator: Locator
  private confirmRestoreButtonLocator: Locator
  private successfullyArchivedToastMeassgeLocator: Locator
  private restoredToastMessageLocator: Locator

  private linkedInButtonLocator: Locator
  private roleSearchBoxLocator: Locator
  private graduationYearFromLocator: Locator
  private graduationYearToLocator: Locator
  private minYearsOfExperienceLocator: Locator
  private maxYearsOfExperienceLocator: Locator
  private applyButtonLocator: Locator
  private linkedInSearchTableLocator: Locator
  private firstRowInLinkedInTableLocator: Locator
  private addButtonLocator: Locator
  private searchButtonlocator: Locator
  private openPositionDropdownLocator: Locator
  private getOpenPositionLocator: Locator
  private addCandidatesLocator: Locator
  private addCandidateLocator: Locator
  private stopSearchLocator: Locator

  private startDatecolumnHeader: Locator
  private startDateSortButton: Locator
  private startDatecolumnValues: Locator

  private contractColumnHeader: Locator
  private contractSortButton: Locator
  private contractColumnValues: Locator

  private locationColumnHeader: Locator
  private locationSortButton: Locator
  private locationColumnValues: Locator

  private vacancyColumnHeader: Locator
  private vacancySortButton: Locator
  private vacancyColumnValues: Locator

  private candidatesColumnHeader: Locator
  private candidatesSortButton: Locator
  private candidatesColumnValues: Locator

  private listActivityColumnHeader: Locator
  private listActivitySortButton: Locator
  private listActivityColumnValues: Locator

  // Inside LinkedIn Profile page
  private addCandidateButtonLocator: Locator
  private nameLocator: Locator
  private expierenceLocator: Locator
  private educationLocator: Locator
  private languagesLocator: Locator
  private closeProfileModalLocator: Locator

  //filters
  private filterToggleButtonLocator: Locator
  private resetAllFilter: Locator
  private archivedFilterCategoryLocator: Locator
  private showArchivedLocator: Locator
  private collapseIconLocator: Locator

  //open position details page:
  private totalCandidatesTextLocator: Locator
  private createdByTextLocator: Locator
  private createdOnTextLocator: Locator
  private positionTitleLocator: Locator
  private skillsHeadingLocator: Locator
  private addSkillButtonLocator: Locator
  private openPositionsLinkLocator: Locator
  private editPositionButtonLocator: Locator
  private openPositionTextLocator: Locator
  private saveButtonLocator: Locator


  //constructor
  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)
    this.employeeManagementPage = new EmployeeManagementPage(page, locale)

    //Empoyee Management Home Page
    this.employeeManagement = page.locator(
      '(//div[@class="_wrapper_qiky4_1"])[8]')
    this.employeeRecruitment = page.locator(
      '(//div[@class="_wrapper_qiky4_1"])[9]'
    )

    this.openPositiontableItems = page.locator('//*[@class="Bar-module_group__GLzMA"][2]//div')
    this.openPositionNames = page.locator('(//*[starts-with(@class, "_texts_is")]//span)[1]')
    this.candidatePage = page.locator('//*[starts-with(@class, "_sidebarSubMenu")]//button[2]')
    this.dailyPoolCardLocator = page.locator('//*[starts-with(@class, "_actualWrapper_")][1]')
    this.searchBoxLocator = page.locator('(//*[starts-with(@class, "_field__input_")])[1]')
    this.openPositiontableLocator = page.locator('//*[@class="open_positions_table"]')
    this.noMatchingFoundTextLoacor = page.locator(
      '.EmptyState-module_title__-piqa'
    )
    this.openPositionMagnifierLocator = page.locator('(//*[@class="_wrapper_1fq5u_1"])[1]')
    this.openPositionArchiveLocator = page.locator('(//*[@class="_wrapper_1fq5u_1"])[2]')
    this.archiveConfirmationDescriptionLocator = page.locator('(//*[@class="ConfirmationModal-module_description__LmVcR"])')
    this.moveToArchiveConfirmButtonLocator = page.locator('//*[@class="ConfirmationModal-module_footer__kUjDB"]/div[2]')

    //General Filter Locators
    this.filterToggleButtonLocator = this.page.locator('//*[@class="PartWrapper-module_partWrapper__I8EIP"][2]')
    this.resetAllFilter = this.page.locator('//*[@class="FiltersDropdown-module_clearFiltersWrapper__pHxJf"]')
    this.archivedFilterCategoryLocator = this.page.locator('((//*[@class="styles-module_filtersGroupItem__3vDjs"])/div/div)[1]')
    this.showArchivedLocator = this.page.locator('(//*[@class="styles-module_content__ZLDHe"])//label')
    this.collapseIconLocator = this.page.locator('((//*[@class="styles-module_statusAndArrow__Ynops"])//div)[8]')

    this.restoreButtonLocator = this.page.locator('._wrapper_1fq5u_1').first()
    this.confirmRestoreButtonLocator = this.page.locator('div').filter({ hasText: /^(Restore|Wiederherstellen)$/ }).first()
    this.successfullyArchivedToastMeassgeLocator = this.page.getByText(/The position has been archived|Die Position wurde archiviert/i)
    this.restoredToastMessageLocator = this.page.locator('//*[@class="_text_1tnwx_24"]')

    this.linkedInButtonLocator = this.page.locator('(//*[starts-with(@class, "_button__name_")])[2]')
    this.roleSearchBoxLocator = this.page.locator('(//*[starts-with(@class, "_field__input_")])[1]')
    this.graduationYearFromLocator = this.page.locator('(//*[starts-with(@class, "_field__input_")])[2]')
    this.graduationYearToLocator = this.page.locator('(//*[starts-with(@class, "_field__input_")])[3]')
    this.minYearsOfExperienceLocator = this.page.locator('(//*[starts-with(@class, "_field__input_")])[4]')
    this.maxYearsOfExperienceLocator = this.page.locator('(//*[starts-with(@class, "_field__input_")])[5]')
    this.applyButtonLocator = this.page.locator('//*[starts-with(@class,"_button__name_")')
    this.linkedInSearchTableLocator = this.page.locator('//*[@class="_table_1savp_1"]')
    this.firstRowInLinkedInTableLocator = page.locator('._wrapper_12gcv_1').first()
    this.addButtonLocator = this.page.locator('(//*[contains(@class, "_wrapper_")])[93]')
    this.searchButtonlocator = this.page.locator('(//*[contains(@class, "_wrapper_")])[96]')
    this.openPositionDropdownLocator = this.page.locator('(//*[@class="_field__input_dlunb_11"])[18]')
    this.getOpenPositionLocator = this.page.locator('(//*[@class="_listItem__name_cx3fq_23"])[9]')
    this.addCandidatesLocator = this.page.getByRole('button', { name: 'Add Candidate' }).nth(1)
    this.addCandidateLocator = this.page.getByRole('button', {
      name: /Add Candidate|Kandidat hinzufügen/}) 
    this.stopSearchLocator = this.page.locator('(//*[contains(@class, "_button__name_")])[2]')

    this.startDatecolumnHeader = page.locator('(//*[starts-with(@class, "_tableHeaderCell__content_scsew_11")])[3]')
    this.startDateSortButton = page.locator('(//*[starts-with(@class, "_wrapper_qiky4_1") and contains(@class, "_headerButtonIcon_51qq3_18")])[4]')
    this.startDatecolumnValues = page.locator('(//td[contains(@class, "_tableBodyCell")][3]//span)[1]')

    this.contractColumnHeader = page.locator('(//*[starts-with(@class, "_tableHeaderCell__content_scsew_11")])[4]')
    this.contractSortButton = page.locator('(//*[starts-with(@class, "_wrapper_qiky4_1") and contains(@class, "_headerButtonIcon_51qq3_18")])[6]')
    this.contractColumnValues = page.locator('(//td[contains(@class, "_tableBodyCell")][4]//span)[1]')

    this.locationColumnHeader = page.locator('(//*[starts-with(@class, "_tableHeaderCell__content_scsew_11")])[5]')
    this.locationSortButton = page.locator('(//*[starts-with(@class, "_wrapper_qiky4_1") and contains(@class, "_headerButtonIcon_51qq3_18")])[8]')
    this.locationColumnValues = page.locator('(//td[contains(@class, "_tableBodyCell")][5]//span)[2]')

    this.vacancyColumnHeader = page.locator('(//*[starts-with(@class, "_tableHeaderCell__content_scsew_11")])[6]')
    this.vacancySortButton = page.locator('(//*[starts-with(@class, "_wrapper_qiky4_1") and contains(@class, "_headerButtonIcon_51qq3_18")])[10]')
    this.vacancyColumnValues = page.locator('(//td[contains(@class, "_tableBodyCell")][6])[1]')

    this.candidatesColumnHeader = page.locator('(//*[starts-with(@class, "_tableHeaderCell__content_scsew_11")])[7]')
    this.candidatesSortButton = page.locator("(//*[starts-with(@class, '_texts_isl')])[6]")
    this.candidatesColumnValues = page.locator('(//td[contains(@class, "_tableBodyCell")][7])[1]//span')

    this.listActivityColumnHeader = page.locator('(//*[starts-with(@class, "_tableHeaderCell__content_scsew_11")])[9]')
    this.listActivitySortButton = page.locator("(//*[starts-with(@class, '_texts_isl')])[7]")
    this.listActivityColumnValues = page.locator('(//*[starts-with(@class, "_texts_isl9j_61")])[7]')



    // Inside LinkedIn Profile page
    this.addCandidateButtonLocator = this.page.locator("//button[contains(text(), 'Add to candidates') or contains(text(), 'Zu Kandidaten hinzufügen')]")
    this.nameLocator = this.page.locator('//*[@class="_mainLeft_1ojzh_52"]//h2')
    this.expierenceLocator = this.page.locator("//h3[contains(text(), 'Experience') or contains(text(), 'Erfahrung')]")
    this.educationLocator = this.page.locator("//h3[contains(text(), 'Education') or contains(text(), 'Bildung')]")
    this.languagesLocator = this.languagesLocator = this.page.locator("//h3[contains(text(), 'Languages') or contains(text(), 'Sprachen')]")
    this.closeProfileModalLocator = this.page.locator(`(//*[contains(@class, "_wrapper_qiky4_")])[23]`)

    //open position details page
    this.totalCandidatesTextLocator = page.getByText('Total candidates')
    this.createdByTextLocator = page.getByText('Created by')
    this.createdOnTextLocator = page.getByText('Created On')
    this.positionTitleLocator = page.locator('(//*[@class="w-4/5"])//h2')
    this.skillsHeadingLocator = page.getByRole('heading', {
      name: /Skills|Fähigkeiten/})
    this.addSkillButtonLocator = page.getByRole('button', {
        name: /Add skill|Skill hinzufügen/
    })  
    this.openPositionsLinkLocator = page.locator('(//*[@class="flex"])//a')
    this.editPositionButtonLocator = page.getByRole('button', { name: /Edit Position|Stelle bearbeiten/i })
    this.openPositionTextLocator = page.getByRole('strong').first()
    this.saveButtonLocator = page.getByText(/Save|Speichern/i)
  }
  private setSearchResultLocator(searchValue: string) {
    this.searchResultNameLocator = this.page.getByRole('button', { name: new RegExp(searchValue, 'i') })
  }

  //GoTo Method
  async goto(baseURL: string | undefined) {
    await Allure.step('should navigate to my profile', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.hr.openPosition}`)
    })
  }

  async searchAndVerifyOpenPosition(searchValue: string) {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.searchBoxLocator.fill('')
    await this.searchBoxLocator.fill(searchValue)
    this.setSearchResultLocator(searchValue)
    await this.page.waitForLoadState('networkidle')
    await this.openPositiontableLocator.waitFor({ state: 'visible'})

    if (await this.openPositiontableLocator.isVisible()) {
      await expect(this.searchResultNameLocator).toBeVisible() // Ensure button appears
    } else {
      await this.noMatchingFoundTextLoacor.waitFor({ state: 'visible'})
    }
    await this.searchBoxLocator.fill('') 
  }

  async verifyArchivingOpenPosition() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.openPositionArchiveLocator.isVisible()
    await this.openPositionArchiveLocator.click({ force: true })
    await this.archiveConfirmationDescriptionLocator.isVisible()
    await this.moveToArchiveConfirmButtonLocator.click()
    await this.successfullyArchivedToastMeassgeLocator.isVisible()
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
  }

  async applyArchivefilter() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.filterToggleButtonLocator.click()
    await this.archivedFilterCategoryLocator.waitFor({ state: 'visible' })
    await this.archivedFilterCategoryLocator.click()
    await this.showArchivedLocator.click()
    await this.collapseIconLocator.click()
    await this.filterToggleButtonLocator.click({ force: true })

  }
  async resetAllFilters() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.filterToggleButtonLocator.click()
    await this.resetAllFilter.click()
    await this.filterToggleButtonLocator.click({ force: true })
    await this.employeeManagementPage.verfyEmployeeRecruitment()
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
  }

  async applyUnArchivefilter() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.filterToggleButtonLocator.click()
    await this.archivedFilterCategoryLocator.waitFor({ state: 'visible' })
    await this.archivedFilterCategoryLocator.click()
    await this.showArchivedLocator.click()
    await this.collapseIconLocator.click()
    await this.filterToggleButtonLocator.click({ force: true })
  }

  async verifyOpenPositionTable() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
  }

  async verifyUnarchivingOpenPosition() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.restoreButtonLocator.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(100)
    await this.restoreButtonLocator.scrollIntoViewIfNeeded()
    await this.restoreButtonLocator.click()
    await this.confirmRestoreButtonLocator.click()
    await this.restoredToastMessageLocator.isVisible()
  }

  async openLinkedInSearch() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.linkedInButtonLocator.click()
  }
  async searchForAnyRole() {
    await this.roleSearchBoxLocator.click()
    await this.roleSearchBoxLocator.fill('QA')
    await this.graduationYearFromLocator.click()
    await this.graduationYearFromLocator.fill('2022')
    await this.graduationYearToLocator.click()
    await this.graduationYearToLocator.fill('2023')
    await this.minYearsOfExperienceLocator.click()
    await this.minYearsOfExperienceLocator.fill('2')
    await this.maxYearsOfExperienceLocator.click()
    await this.maxYearsOfExperienceLocator.fill('2')
    await this.applyButtonLocator.click()
    await this.firstRowInLinkedInTableLocator.waitFor({ state: 'visible' })
  }

  async addCandidateFromLinkedInSearch() {
    await this.firstRowInLinkedInTableLocator.waitFor({ state: 'visible' })
    await this.addButtonLocator.click()
    await this.openPositionDropdownLocator.click()
    await this.getOpenPositionLocator.waitFor({ state: 'visible' })
    await this.getOpenPositionLocator.click()
    await this.addCandidatesLocator.click()
  }

  async addCandidateFromLinkedInSearchProfile() {
    await this.firstRowInLinkedInTableLocator.waitFor({ state: 'visible' })
    await this.searchButtonlocator.click()
    await this.addCandidateButtonLocator.click()
    await this.openPositionDropdownLocator.click()
    await this.getOpenPositionLocator.waitFor({ state: 'visible' })
    await this.getOpenPositionLocator.click()
    await this.addCandidateLocator.click()
    await this.closeProfileModalLocator.click()
  }

  async verifyLinkedCandidateProfile() {
    await this.firstRowInLinkedInTableLocator.waitFor({ state: 'visible' })
    await this.searchButtonlocator.click()
    await this.nameLocator.waitFor({ state: 'visible' })
    await this.nameLocator.isVisible()
    await this.expierenceLocator.isVisible()
    await this.educationLocator.isVisible()
    await this.languagesLocator.isVisible()
    await this.closeProfileModalLocator.click()
  }

  async stopLinkedInSearch() {
    await this.stopSearchLocator.click()
  }

  async closeProfileModal() {
    await this.closeProfileModalLocator.click()
  }

  async openPositionDetailsPage() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.openPositionMagnifierLocator.click()
    await this.totalCandidatesTextLocator.isVisible()
    await this.createdByTextLocator.isVisible()
    await this.createdOnTextLocator.isVisible()
    await this.positionTitleLocator.isVisible()
    await this.skillsHeadingLocator.click()
    await this.addSkillButtonLocator.click()
    await this.openPositionsLinkLocator.click()
  }

  async verifyEditOpenPosition() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    await this.openPositionMagnifierLocator.click()
    await this.editPositionButtonLocator.waitFor({ state: 'visible' })
    await this.editPositionButtonLocator.click()
    await this.openPositionTextLocator.isVisible()
    await this.saveButtonLocator.click()
    await this.openPositionsLinkLocator.click()
  }

  async clickSort(name: string | number): Promise<void> {
    if (name === "startDate") {
      await this.startDatecolumnHeader.hover()
      await this.startDateSortButton.waitFor({ state: "visible" })
      await this.startDateSortButton.click()
    } else if (name === "contract") {
      await this.contractColumnHeader.hover()
      await this.contractSortButton.waitFor({ state: "visible" })
      await this.contractSortButton.click();
    } else if (name === "location") {
      await this.locationColumnHeader.hover()
      await this.locationSortButton.waitFor({ state: "visible" })
      await this.locationSortButton.click()
    }
    else if (name === "vacancy") {
      await this.vacancyColumnHeader.hover()
      await this.vacancySortButton.waitFor({ state: "visible" })
      await this.vacancySortButton.click()
    }
    else if (name === "candidate") {
      await this.candidatesColumnHeader.hover()
      await this.candidatesSortButton.waitFor({ state: "visible" })
      await this.candidatesSortButton.click()
    }
    else if (name === "listactivity") {
      await this.listActivityColumnHeader.hover()
      await this.listActivitySortButton.waitFor({ state: "visible" })
      await this.listActivitySortButton.click()
    }
    else {
      throw new Error(`Invalid sort type: ${name}`)
    }
  }

  async getColumnValues(name: string | number): Promise<string[]> {
    if (name === "startDate") {
      return await this.startDatecolumnValues.allTextContents();
    } else if (name === "contract") {
      return await this.contractColumnValues.allTextContents();
    }
    else if (name === "location") {
      return await this.locationColumnValues.allTextContents();
    }
    else if (name === "vacancy") {
      return await this.vacancyColumnValues.allTextContents();
    }
    else if (name === "candidate") {
      return await this.candidatesColumnValues.allTextContents();
    }
    else if (name === "listactivity") {
      return await this.listActivityColumnValues.allTextContents();
    }
    throw new Error(`Invalid column name: ${name}`);
  }

  async verifySorting(name: string) {
    await this.openPositiontableLocator.waitFor({ state: 'visible' })
    const beforeSort = await this.getColumnValues(name)
    await this.clickSort(name)
    const afterSort = await this.getColumnValues(name)
    await this.getColumnValues(name)
    const sorted = [...beforeSort].sort()
  }

  async verifyTableItems() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' });
    await this.openPositiontableItems.isVisible();
  }

  async verifyJobTitle() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' });
    await this.openPositionNames.click()
    await this.dailyPoolCardLocator.waitFor({ state: 'visible' })
    await this.employeeRecruitment.waitFor({ state: 'visible' })
    await this.employeeRecruitment.click()
  }

  async verifyfilterPersistence() {
    await this.openPositiontableLocator.waitFor({ state: 'visible' });
    await this.applyArchivefilter()
    await this.candidatePage.click()
    await this.dailyPoolCardLocator.waitFor({ state: 'visible', timeout: 3000 })
    await this.employeeRecruitment.waitFor({ state: 'visible' })
    await this.employeeRecruitment.click()
    await this.page.waitForTimeout(3000); // slight buffer
    await this.restoreButtonLocator.scrollIntoViewIfNeeded()
    await this.restoreButtonLocator.isVisible()
    await this.applyArchivefilter()
  }



}