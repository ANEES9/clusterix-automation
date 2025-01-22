import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import {
  confirmationDialogMessages,
  confirmationDialogTitles,
} from 'utils/test-data/my-profile/my-profile-data'

export class VacationAbsenceDaysPage {
  private page: Page

  // Locators
  private newRequest: Locator
  private paidVacationOption: Locator
  private sickLeaveOption: Locator
  private homeOfficeOption: Locator
  private otherAbsenceOption: Locator
  private selectAbsenceTypeHeading: Locator
  private pleaseChooseDesc: Locator
  private paidVacation: Locator
  private sickLeave: Locator
  private homeOffice: Locator
  private createButton: Locator
  private enterMessage: Locator
  private nextButton: Locator
  private sendButton: Locator
  private responsibleDropdown: Locator
  private responsibleDropdownList: Locator
  private closeResponsibleDropdownList: Locator
  private vacationConfirmationDialogMessage: Locator
  private sickConfirmationDialogMessage: Locator
  private homeOfficeConfirmationDialogMessage: Locator
  private vacationAppliedDate: Locator
  private vacationConfirmationDialogDesc: Locator
  private vacationDialogCloseButton: Locator
  private totalDays: Locator
  private totalDaysInNumber: Locator
  private daysAvailable: Locator
  private daysAvailableInNumber: Locator
  private daysUsed: Locator
  private daysUsedInNumber: Locator
  private sickDaysUsed: Locator
  private sickDaysUsedInNumber: Locator
  private daysSelected: Locator
  private selectFilter: Locator
  private selectFilterOptions: Locator
  private halfDayCheckBox: Locator

  constructor(page: Page) {
    this.page = page

    // Initialize locators
    this.newRequest = page
      .locator('div')
      .filter({ hasText: /^New Request$/ })
      .nth(1)

    this.paidVacationOption = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[1]'
    )
    this.sickLeaveOption = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[2]'
    )
    this.homeOfficeOption = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[3]'
    )
    this.otherAbsenceOption = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[4]'
    )

    this.createButton = page.getByRole('button', { name: 'Create a request' })

    this.selectAbsenceTypeHeading = page.getByText('Select absence type')
    this.pleaseChooseDesc = page.getByText('Please choose the type of')
    this.paidVacation = page.getByText('Paid Vacation', { exact: true })
    this.sickLeave = page.getByText('Sick Leave')
    this.homeOffice = page.getByText('Home Office', { exact: true })

    this.enterMessage = page.getByPlaceholder('Message to your teamlead')

    this.nextButton = page.getByRole('button', { name: 'Next' })
    this.sendButton = page.getByRole('button', { name: 'Send' })
    this.halfDayCheckBox = page.locator(
      ' (//*[@class="_field__checkbox_12ii0_7"])[2]'
    )

    this.responsibleDropdown = page.getByPlaceholder('Please select')
    this.responsibleDropdownList = page.locator(
      '(//*[@data-ui-element="dropdown-list"])[4]//div[1]/div[1]/div'
    )
    this.closeResponsibleDropdownList = page.locator('.ca-fixed')

    this.vacationConfirmationDialogMessage = page.getByText(
      'Your vacation request is sent!'
    )
    this.sickConfirmationDialogMessage = page.getByText(
      'Your sick days are added!'
    )
    this.homeOfficeConfirmationDialogMessage = page.getByText(
      'Your home office request is sent'
    )

    this.vacationAppliedDate = page.locator(
      '//*[@class="gWc1kJi6nF3s2lJE2JbJ"]/span[2]'
    )
    this.vacationConfirmationDialogDesc = page.locator(
      '//*[@class="P3XclPtF4XBYW7l57ez1"]'
    )
    this.vacationDialogCloseButton = page.getByRole('button', { name: 'Close' })

    this.totalDays = this.page.locator('//div[normalize-space()="Total Days"]')
    this.totalDaysInNumber = this.page.locator('//div[text()="Total Days"]/following-sibling::div')

    this.daysAvailable = this.page.locator('//div[normalize-space()="Days Available"]')
    this.daysAvailableInNumber = this.page.locator('//div[text()="Days Available"]/following-sibling::div')
    this.daysUsed = this.page.locator('//div[normalize-space()="Days used"]')
    this.daysUsedInNumber = this.page.locator('//div[text()="Days used"]/following-sibling::div')

    this.sickDaysUsed = this.page.getByText('Sick days used')
    this.sickDaysUsedInNumber = this.page.locator('//div[text()="Sick days used"]/following-sibling::div')

    this.daysSelected = this.page.getByText('Day selected')

    this.selectFilter = this.page.locator('(//*[@class="PartWrapper-module_partWrapper__I8EIP"])[2]')

    this.selectFilterOptions = this.page.locator('((//div[@data-ui-element="dropdown-list"])[3])/div/div')




  }

  async openNewRequest() {
    await Allure.step('should Click on New Request Button', async () => {
      await this.page.waitForTimeout(2000)
      await this.newRequest.click()
    })
  }

  async VerifyAvailableAbsenceTypes() {
    await Allure.step('should Choose paid vacation', async () => {
      await expect(this.selectAbsenceTypeHeading).toBeVisible()
      console.log('select Absence Type Heading is displayed')

      await expect(this.pleaseChooseDesc).toBeVisible()
      console.log('please choose descrption is visible')

      await expect(this.paidVacation).toBeVisible()
      console.log('Paid vacation is visible')

      await expect(this.sickLeave).toBeVisible()
      console.log('sick Leave is visible')

      await expect(this.homeOffice).toBeVisible()
      console.log('home Office is visible')
    })
  }

  async selectPaidVacation() {
    await Allure.step('should Choose paid vacation', async () => {
      expect(this.paidVacationOption).toBeVisible()
      await this.page.waitForTimeout(2000)
      await this.paidVacationOption.click()
      console.log('Choosed paid vacation option')
    })
  }

  async selectSickLeave() {
    await Allure.step('should Choose sick leave', async () => {
      expect(this.sickLeaveOption).toBeVisible()
      await this.page.waitForTimeout(2000)
      await this.sickLeaveOption.click()
      console.log('Choosed sick leave option')
    })
  }

  async selectHomeOffice() {
    await Allure.step('should Choose home office', async () => {
      expect(this.homeOfficeOption).toBeVisible()
      await this.homeOfficeOption.click()
      console.log('Choosed home office option')
    })
  }

  async selectOtherAbsence() {
    await Allure.step('should Choose other absence', async () => {
      expect(this.otherAbsenceOption).toBeVisible()
      await this.otherAbsenceOption.click()
      console.log('Choosed other absence option')
    })
  }

  async clickCreateButton() {
    await Allure.step('Clicked on the create Button', async () => {
      expect(this.createButton).toBeVisible()
      await this.createButton.click()
      console.log('Clicked on the create Button')
    })
  }

  async selectADay() {
    await Allure.step('select a day', async () => {
      await this.page.waitForTimeout(2000)
      await this.findAndApplyVacation()
      console.log('Day is selected')
    })
  }

  async clickOnHalfDayCheckBox() {
    await Allure.step('Half day is selected', async () => {
      await this.halfDayCheckBox.click();
      console.log('Half Day is selected')
    })
  }

  async enterAMessage() {
    await Allure.step('Enter a message', async () => {
      expect(this.enterMessage).toBeVisible()
      await this.enterMessage.fill('sick')
      console.log('Message entered')
    })
  }

  async clickOnNextButton() {
    await Allure.step(
      'Clicked on the Next Button',
      async () => {
        expect(this.nextButton).toBeVisible()
        await this.page.waitForTimeout(2000)
        await this.nextButton.click()
        console.log("Clicked on the Next Button")

      }
    )
  }

  async clickOnSendButton() {
    await Allure.step('Clicked on the Send Button', async () => {
      expect(this.sendButton).toBeVisible()
      await this.page.waitForTimeout(2000)
      await this.sendButton.click()
      console.log('Clicked on the Send Button')
    })
  }

  async selectACoWorker() {
    await Allure.step('Co-worker is selected', async () => {
      await expect(this.responsibleDropdown).toBeVisible()
      await this.responsibleDropdown.click()
      console.log('Opened responsible dropdown')

      await expect(this.responsibleDropdownList).toBeVisible()
      await this.responsibleDropdownList.click()
      console.log('Choosed 1-st Person from dropdown')

      await expect(this.closeResponsibleDropdownList).toBeVisible()
      await this.closeResponsibleDropdownList.click()
      console.log('Closed responsible dropdown')
    })
  }

  async verifyConfirmationMessageForVacationDialog() {
    await Allure.step('vacation Confirmation Dialog is opened', async () => {
      await expect(this.vacationConfirmationDialogMessage).toBeVisible()
      await expect(this.vacationConfirmationDialogMessage).toHaveText(
        confirmationDialogTitles.vacation
      )
      console.log('Vacation Confirmation Dialog is opened')
    })
  }
  async verifyConfirmationMessageForSickDialog() {
    await Allure.step('vacation Confirmation Dialog is opened ', async () => {
      await expect(this.sickConfirmationDialogMessage).toBeVisible()
      await expect(this.sickConfirmationDialogMessage).toHaveText(
        confirmationDialogTitles.sick
      )
      console.log('Sick Confirmation Dialog is opened')
    })
  }

  async verifyConfirmationMessageForHomeOfficeDialog() {
    await Allure.step(
      'vacation Confirmation Dialog is opened ',
      async () => {
        await expect(this.homeOfficeConfirmationDialogMessage).toBeVisible()
        await expect(this.homeOfficeConfirmationDialogMessage).toHaveText(confirmationDialogTitles.homeOffice)
        console.log("Sick Confirmation Dialog is opened")
      }
    )
  }

  async verifyRemainingNumberOfPaidLeaves() {

    this.totalDays.isVisible
    this.totalDaysInNumber.isVisible
    console.log(await this.totalDays.textContent(), ':', await this.totalDaysInNumber.textContent());

    this.daysAvailable.isVisible
    this.daysAvailableInNumber.isVisible
    console.log(await this.daysAvailable.textContent(), ':', await this.daysAvailableInNumber.textContent());

    this.daysUsed.isVisible
    this.daysUsedInNumber.isVisible
    console.log(await this.daysUsed.textContent(), ':', await this.daysUsedInNumber.textContent());

    /*await Allure.step('should Choose paid vacation', async () => {
      await expect(this.selectAbsenceTypeHeading).toBeVisible()
      console.log('select Absence Type Heading is displayed')*/

  }

  async verifyRemainingNumberOfSickLeaves() {

    this.sickDaysUsed.isVisible
    this.sickDaysUsedInNumber.isVisible
    console.log(await this.sickDaysUsed.textContent(), ':', await this.sickDaysUsedInNumber.textContent());

  }

  async VerifySelectedDaysText() {

    this.daysSelected.isVisible()
    console.log(await this.daysSelected.textContent());
    await this.page.waitForTimeout(2000)

  }

  async VerifyAllStatusesFilter() {
    this.selectFilter.isVisible()
    this.selectFilter.click()

    // Get the count of items in the list
    const itemCount = await this.selectFilterOptions.count();
    console.log('item count :', itemCount)

    for (let i = 0; i < itemCount; i++) {
      // Select the item at index `i`
      await this.selectFilterOptions.nth(i).click();
      // Add a small delay to observe each selection
      await this.page.waitForTimeout(2000);
      console.log(`Selected item ${i + 1}`);
    }

  }

  async verifyVacationAppliedDate() {
    await Allure.step('Able to see the date format', async () => {
      const currentDate = new Date() // Get the current date
      const day = await this.getValidVacationDay() // Get the day (your custom method)
      const month = currentDate.toLocaleString('default', { month: 'short' }) // Get the short month name, e.g., "Jan"
      const year = currentDate.getFullYear() // Get the full year, e.g., 2025

      const formattedDate = `${day} ${month}. ${year} - ${day} ${month}. ${year}`
      await expect(this.vacationAppliedDate).toHaveText(formattedDate) // Validate the displayed date.
      console.log('Able to see the date format')
    })
  }

  async verifyDescriptionForVacationConfirmationDialog() {
    await Allure.step(
      'Vacation confirmation description message is displayed',
      async () => {
        await expect(this.vacationConfirmationDialogDesc).toHaveText(
          confirmationDialogMessages.vacation
        )
        console.log('Vacation confirmation description message is displayed')
      }
    )
  }

  async verifyDescriptionOtherVacationConfirmationDialog() {
    await Allure.step(
      'Other Vacation confirmation description message is displayed',
      async () => {
        await expect(this.vacationConfirmationDialogDesc).toHaveText(
          confirmationDialogMessages.otherVacation
        )
        console.log(
          'Other Vacation confirmation description message is displayed'
        )
      }
    )
  }

  async verifyDescriptionForSickConfirmationDialog() {
    await Allure.step(
      'Vacation confirmation description message is displayed',
      async () => {
        await expect(this.vacationConfirmationDialogDesc).toHaveText(
          confirmationDialogMessages.sick
        )
        console.log('sick confirmation description message is displayed')
      }
    )
  }

  async verifyDescriptionForHomeOfficeConfirmationDialog() {
    await Allure.step(
      'Vacation confirmation description message is displayed',
      async () => {
        await expect(this.vacationConfirmationDialogDesc).toHaveText(
          confirmationDialogMessages.homeOffice
        )
        console.log('Home Office confirmation description message is displayed')
      }
    )
  }

  async verifyVacationDialogCloseButton() {
    await Allure.step('vacation Confirmation Dialog is closed', async () => {
      await expect(this.vacationDialogCloseButton).toBeVisible()
      await this.vacationDialogCloseButton.click() // Close the confirmation dialog.
      console.log('vacation Confirmation Dialog is closed')
    })
  }

  async getGermanPublicHolidays(): Promise<string[]> {
    return [
      '2025-01-01', // New Year's Day
      '2025-04-18', // Good Friday
      '2025-04-21', // Easter Monday
      '2025-05-01', // Labour Day
      '2025-05-29', // Ascension Day
      '2025-06-09', // Whit Monday
      '2025-10-03', // Day of German Unity
      '2025-12-25', // Christmas Day
      '2025-12-26', // Boxing Day
    ]
  }

  async getValidVacationDay(): Promise<number | null> {
    const publicHolidays = await this.getGermanPublicHolidays() // Fetch public holidays
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const totalDaysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate()

    for (let day = today.getDate(); day <= totalDaysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      if (
        dayOfWeek >= 1 &&
        dayOfWeek <= 5 &&
        !publicHolidays.includes(date.toISOString().split('T')[0])
      ) {
        console.log(`Valid day found: ${day}`)
        return day
      }
    }
    return null
  }

  async selectDynamicVacationDay(day: number): Promise<Locator | null> {
    const vacationDay = this.page
      .getByText(`${day}`, { exact: true })

    // await vacationDay.scrollIntoViewIfNeeded()
    await vacationDay.waitFor({ state: 'visible' })

    if (await vacationDay.isEnabled()) {
      await vacationDay.click();
      console.log(`Successfully clicked on day: ${day}`)
    } else {
      console.error(`Day ${day} is not enabled or clickable.`)
    }
    return null

  }

  async findAndApplyVacation(): Promise<number | null> {
    const validDay = await this.getValidVacationDay()

    if (validDay !== null) {
      console.log(`Attempting to apply vacation for day: ${validDay}`)
      const success = await this.selectDynamicVacationDay(validDay)

      if (success) {
        console.log(`Vacation successfully applied for day: ${validDay}`)
        return validDay
      } else {
        console.log(`Failed to apply vacation for day: ${validDay}`)
        return null
      }
    } else {
      console.log('No valid days available for vacation this month.')
      return null
    }
  }

  async getEmployeeIdFromResponse(): Promise<number | null> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('api/days_off/requests') &&
          response.status() === 200
      ),
      this.clickOnSendButton(),
    ])

    const responseBody = await response.json()
    console.log('Employee ID from response:', responseBody?.employee_id)
    return responseBody?.employee_id ?? null
  }

  async closeFeedbackForm(): Promise<void | any> {

    await this.page.waitForLoadState();
    await this.page.getByRole('button', { name: 'CEO / CFO / COO' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('main').getByRole('button', { name: 'Calendar' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Complete' }).click();
    await this.page.getByLabel('Product Tour').getByRole('button').first().click();
    await this.page.waitForLoadState();




  }

}
