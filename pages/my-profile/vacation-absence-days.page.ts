import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'
import { confirmationDialogTitles } from 'utils/test-data/my-profile/my-profile-data'

export class VacationAbsenceDaysPage {
  private page: Page

  // Absence modal Locators
  private newRequestLocator: Locator
  private paidVacationLocatorOptionLocator: Locator
  private sickLeaveLocatorOptionLocator: Locator
  private homeOfficeLocatorOptionLocator: Locator
  private otherAbsenceOptionLocator: Locator
  private selectAbsenceTypeHeadingLocator: Locator
  private pleaseChooseDescLocator: Locator
  private paidVacationLocator: Locator
  private sickLeaveLocator: Locator
  private homeOfficeLocator: Locator
  private createButtonLocator: Locator
  private enterMessageLocator: Locator
  private nextButtonLocator: Locator
  private sendButtonLocator: Locator
  private responsibleDropdownLocator: Locator
  private responsibleDropdownListLocator: Locator
  private closeResponsibleDropdownListLocator: Locator
  private vacationConfirmationDialogMessageLocator: Locator
  private sickConfirmationDialogMessageLocator: Locator
  private homeOfficeConfirmationDialogMessageLocator: Locator
  private vacationAppliedDateLocator: Locator
  private vacationConfirmationDialogDescLocator: Locator
  private vacationDialogCloseButtonLocator: Locator
  private totalDaysLocator: Locator
  private totalDaysInNumberLocator: Locator
  private daysAvailableLocator: Locator
  private daysAvailableInNumberLocator: Locator
  private daysUsedLocator: Locator
  private daysUsedInNumberLocator: Locator
  private sickDaysUsedLocator: Locator
  private sickDaysUsedInNumberLocator: Locator
  private daysSelectedLocator: Locator
  private selectFilterLocator: Locator
  private selectPendingStatusLocator: Locator
  private selectApprovedStatusLocator: Locator
  private selectDeclinedStatusLocator: Locator
  private halfDayCheckBoxLocator: Locator
  private closeAbsenceModal: Locator
  translations: Record<string, any>
  private cancellAbsenceModalLocator: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('my-profile', locale)

    // Initialize locators
    this.newRequestLocator = this.page.locator('(//*[@class="ca-flex"])[1]')
    this.paidVacationLocatorOptionLocator = this.page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[1]'
    )
    this.sickLeaveLocatorOptionLocator = this.page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[2]'
    )
    this.homeOfficeLocatorOptionLocator = this.page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[3]'
    )
    this.otherAbsenceOptionLocator = this.page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[4]'
    )

    this.closeAbsenceModal = this.page.locator(
      '(//*[@class="styles-module_headerCloseButton__x2ELS"])'
    )
    this.createButtonLocator = this.page.locator(
      '(//*[@class="_button__name_vdgms_25"])[2]'
    )

    this.selectAbsenceTypeHeadingLocator = this.page.locator(
      '(//*[@class="styles-module_headerTitle__CcKBu"])'
    )

    this.pleaseChooseDescLocator = page.locator(
      '(//*[@class="unQyh6Fl2YHXgq0T6DEf"])'
    )

    this.paidVacationLocator = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[1]'
    )

    this.sickLeaveLocator = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[2]'
    )

    this.homeOfficeLocator = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[3]'
    )

    this.enterMessageLocator = page.locator('_textarea_1ba22_10')

    this.nextButtonLocator = page.locator(
      '(//*[@class="_button__name_vdgms_25"])[2]'
    )

    this.sendButtonLocator = page.locator(
      '(//*[@class="_button__name_vdgms_25"])[2]'
    )

    this.halfDayCheckBoxLocator = page.locator(
      ' (//*[@class="_field__checkbox_12ii0_7"])[2]'
    )

    this.responsibleDropdownLocator = page.locator('text-input-9178-9972')

    this.responsibleDropdownListLocator = page.locator(
      '((//*[@data-ui-element="dropdown-list"])/div)[2]'
    )
    this.closeResponsibleDropdownListLocator = page.locator('.ca-fixed')

    this.vacationConfirmationDialogMessageLocator = page.locator(
      'PzSsSvnn1uGaXb33f4jh'
    )
    this.sickConfirmationDialogMessageLocator = page.locator(
      '//*[@class="PzSsSvnn1uGaXb33f4jh"]'
    )

    this.homeOfficeConfirmationDialogMessageLocator = page.locator(
      '//*[@class="PzSsSvnn1uGaXb33f4jh"]'
    )

    this.vacationAppliedDateLocator = page.locator(
      '//*[@class="gWc1kJi6nF3s2lJE2JbJ"]/span[2]'
    )

    this.vacationConfirmationDialogDescLocator = page.locator(
      '//*[@class="P3XclPtF4XBYW7l57ez1"]'
    )

    this.vacationDialogCloseButtonLocator = page.locator(
      '//*[@class="bXHRhOC6dzaJ3cKoUbgE"]//button'
    )

    this.totalDaysLocator = this.page.locator(
      '//div[normalize-space()="Tage insgesamt" or normalize-space()="Total Days"]'
    )
    this.totalDaysInNumberLocator = this.page.locator(
      '(//*[@class="_PdginA0Sy0n5Nf9fRC7"])[1]//div[2]'
    )

    this.daysAvailableLocator = this.page.locator(
      '//div[normalize-space()="Days Available" or normalize-space()="Verfügbare Tage"]'
    )

    this.daysAvailableInNumberLocator = this.page.locator(
      '(//*[@class="_PdginA0Sy0n5Nf9fRC7"])[2]//div[2]'
    )

    this.daysUsedLocator = this.page.locator(
      '//div[normalize-space()="Days used" or normalize-space()="Verwendete Tage"]'
    )
    this.daysUsedInNumberLocator = this.page.locator(
      '(//*[@class="_PdginA0Sy0n5Nf9fRC7"])[3]//div[2]'
    )

    this.sickDaysUsedLocator = this.page.locator(
      '//*[@class="w2uGzw1dBCoMySa9e_cV"]'
    )
    this.sickDaysUsedInNumberLocator = this.page.locator(
      '(//*[@class="_PdginA0Sy0n5Nf9fRC7"])//div[2]'
    )
    this.daysSelectedLocator = this.page.locator(
      '(//*[@class="BbpnWLWrpKTyATntQiRg"])//div[2]'
    )
    this.selectFilterLocator = this.page.locator(
      '(//*[@class="PartWrapper-module_partWrapper__I8EIP"])[2]'
    )

    this.selectPendingStatusLocator = this.page.locator(
      '(//*[@class="_listItem__name_cx3fq_23"])[1]'
    )
    this.selectApprovedStatusLocator = this.page.locator(
      '(//*[@class="_listItem__name_cx3fq_23"])[2]'
    )
    this.selectDeclinedStatusLocator = this.page.locator(
      '(//*[@class="_listItem__name_cx3fq_23"])[3]'
    )

    this.cancellAbsenceModalLocator = this.page.locator(
      '(//*[@class="bXHRhOC6dzaJ3cKoUbgE"])//button[1]'
    )
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('should navigate to my profile', async () => {
      await this.page.goto(
        `${baseURL}${APP_URLS.myProfile.vacationAndAbsenceDays}`
      )
    })
  }

  async openNewRequest() {
    await Allure.step('should Click on New Request Button', async () => {
      await this.newRequestLocator.waitFor({ state: 'visible' })
      await this.newRequestLocator.click()
    })
  }

  async VerifyAvailableAbsenceTypes() {
    await Allure.step('should Choose paid vacation', async () => {
      await expect(this.selectAbsenceTypeHeadingLocator).toBeVisible()
      await expect(this.pleaseChooseDescLocator).toBeVisible()
      await expect(this.paidVacationLocator).toBeVisible()
      await expect(this.sickLeaveLocator).toBeVisible()
      await expect(this.homeOfficeLocator).toBeVisible()
      await expect(this.closeAbsenceModal).toBeVisible()
      await this.closeAbsenceModal.click()
    })
  }

  async selectPaidVacation() {
    await Allure.step('should Choose paid vacation', async () => {
      await this.paidVacationLocatorOptionLocator.waitFor({ state: 'visible' })
      await this.paidVacationLocatorOptionLocator.click()
    })
  }

  async selectSickLeave() {
    await Allure.step('should Choose sick leave', async () => {
      await this.sickLeaveLocatorOptionLocator.waitFor({ state: 'visible' })
      await this.sickLeaveLocatorOptionLocator.click()
    })
  }

  async selectHomeOffice() {
    await Allure.step('should Choose home office', async () => {
      await this.homeOfficeLocatorOptionLocator.waitFor({ state: 'visible' })
      await this.homeOfficeLocatorOptionLocator.click()
    })
  }

  async selectOtherAbsence() {
    await Allure.step('should Choose other absence', async () => {
      await this.otherAbsenceOptionLocator.waitFor({ state: 'visible' })
      await this.otherAbsenceOptionLocator.click()
    })
  }

  async clickCreateButton() {
    await Allure.step('Clicked on the create Button', async () => {
      await this.createButtonLocator.waitFor({ state: 'visible' })
      await this.createButtonLocator.click()
    })
  }

  async clickOnHalfDayCheckBox() {
    await Allure.step('Half day is selected', async () => {
      await this.halfDayCheckBoxLocator.waitFor({ state: 'visible' })
    })
  }

  async enterAMessage() {
    await Allure.step('Enter a message', async () => {
      await this.enterMessageLocator.waitFor({ state: 'visible' })
      await this.enterMessageLocator.fill('sick')
    })
  }

  async clickOnNextButton() {
    await Allure.step('Clicked on the Next Button', async () => {
      await this.nextButtonLocator.waitFor({ state: 'visible' })
      await this.nextButtonLocator.click()
    })
  }

  async selectACoWorker() {
    await Allure.step('Co-worker is selected', async () => {
      await this.responsibleDropdownLocator.waitFor({ state: 'visible' })
      await this.responsibleDropdownLocator.click()

      await this.responsibleDropdownListLocator.waitFor({ state: 'visible' })
      await this.responsibleDropdownListLocator.click()

      await this.closeResponsibleDropdownListLocator.waitFor({
        state: 'visible',
      })
      await this.closeResponsibleDropdownListLocator.click()
    })
  }

  async verifyConfirmationMessageForVacationDialog() {
    await Allure.step('vacation Confirmation Dialog is opened', async () => {
      await expect(this.vacationConfirmationDialogMessageLocator).toBeVisible()
      await expect(this.vacationConfirmationDialogMessageLocator).toHaveText(
        confirmationDialogTitles.vacation
      )
    })
  }
  async verifyConfirmationMessageForSickDialog() {
    await Allure.step('vacation Confirmation Dialog is opened ', async () => {
      await expect(this.sickConfirmationDialogMessageLocator).toBeVisible()
      await expect(this.sickConfirmationDialogMessageLocator).toHaveText(
        confirmationDialogTitles.sick
      )
    })
  }

  async verifyConfirmationMessageForHomeOfficeDialog() {
    await Allure.step('vacation Confirmation Dialog is opened ', async () => {
      await expect(
        this.homeOfficeConfirmationDialogMessageLocator
      ).toBeVisible()
      await expect(this.homeOfficeConfirmationDialogMessageLocator).toHaveText(
        confirmationDialogTitles.homeOffice
      )
    })
  }

  async verifyRemainingNumberOfPaidLeaves() {
    await this.totalDaysLocator.waitFor({ state: 'visible' })
    await this.totalDaysInNumberLocator.waitFor({ state: 'visible' })
    await this.daysAvailableLocator.waitFor({ state: 'visible' })
    await this.daysAvailableInNumberLocator.waitFor({ state: 'visible' })
    await this.daysUsedLocator.waitFor({ state: 'visible' })
    await this.daysUsedInNumberLocator.waitFor({ state: 'visible' })
    await this.closeAbsenceModal.click()
  }

  async verifyRemainingNumberOfSickLeaves() {
    await this.sickDaysUsedLocator.waitFor({ state: 'visible' })
    await this.sickDaysUsedInNumberLocator.waitFor({ state: 'visible' })
    await this.closeAbsenceModal.click()
  }

  async VerifySelectedDaysText() {
    await this.daysSelectedLocator.waitFor({ state: 'visible' })
    await this.closeAbsenceModal.waitFor({ state: 'visible' })
    await this.closeAbsenceModal.click()
  }

  async VerifyAllStatusesFilter() {
    await this.selectFilterLocator.waitFor({ state: 'visible' })
    await this.selectFilterLocator.click()

    const filters = [
      this.selectPendingStatusLocator,
      this.selectApprovedStatusLocator,
      this.selectDeclinedStatusLocator,
    ]

    for (const filter of filters) {
      await filter.waitFor({ state: 'visible' })
      await filter.click()
      await filter.click()
    }
  }

  async verifyVacationDialogCloseButton() {
    await Allure.step('Vacation Confirmation Dialog is closed', async () => {
      await expect(this.vacationDialogCloseButtonLocator).toBeVisible()
      await this.vacationDialogCloseButtonLocator.click() 
    })
  }

  async verifyCancellingOfAbsenceModal() {
    await this.clickCreateButton() 
    await this.cancellAbsenceModalLocator.click() 
  }
}
