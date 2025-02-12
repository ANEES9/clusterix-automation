import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import {
  confirmationDialogMessages,
  confirmationDialogTitles,
} from 'utils/test-data/my-profile/my-profile-data'
import { APP_URLS } from 'constants/app-urls'
import { getTranslations } from 'common/get-translations-helper'

export class VacationAbsenceDaysPage {
  private page: Page
  translations: Record<string, any>

  // Locators
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
  private selectFilterOptionsLocator: Locator
  private halfDayCheckBoxLocator: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('my-profile', locale)

    // Initialize locators
    this.newRequestLocator = page
      .locator('div')
      .filter({ hasText: /^New Request$/ })
      .nth(1)

    this.paidVacationLocatorOptionLocator = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[1]'
    )
    this.sickLeaveLocatorOptionLocator = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[2]'
    )
    this.homeOfficeLocatorOptionLocator = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[3]'
    )
    this.otherAbsenceOptionLocator = page.locator(
      '(//*[@class="Tbns5pyn_LdzU09XB_0r"])[4]'
    )

    this.createButtonLocator = page.getByRole('button', {
      name: 'Create a request',
    })

    this.selectAbsenceTypeHeadingLocator = page.getByText('Select absence type')
    this.pleaseChooseDescLocator = page.getByText('Please choose the type of')
    this.paidVacationLocator = page.getByText('Paid Vacation', { exact: true })
    this.sickLeaveLocator = page.getByText('Sick Leave')
    this.homeOfficeLocator = page.getByText('Home Office', { exact: true })

    this.enterMessageLocator = page.getByPlaceholder('Message to your teamlead')

    this.nextButtonLocator = page.getByRole('button', { name: 'Next' })
    this.sendButtonLocator = page.getByRole('button', { name: 'Send' })
    this.halfDayCheckBoxLocator = page.locator(
      ' (//*[@class="_field__checkbox_12ii0_7"])[2]'
    )

    this.responsibleDropdownLocator = page.getByPlaceholder('Please select')
    this.responsibleDropdownListLocator = page.locator(
      '(//*[@data-ui-element="dropdown-list"])[4]//div[1]/div[1]/div'
    )
    this.closeResponsibleDropdownListLocator = page.locator('.ca-fixed')

    this.vacationConfirmationDialogMessageLocator = page.getByText(
      'Your vacation request is sent!'
    )
    this.sickConfirmationDialogMessageLocator = page.getByText(
      'Your sick days are added!'
    )
    this.homeOfficeConfirmationDialogMessageLocator = page.getByText(
      'Your home office request is sent'
    )

    this.vacationAppliedDateLocator = page.locator(
      '//*[@class="gWc1kJi6nF3s2lJE2JbJ"]/span[2]'
    )
    this.vacationConfirmationDialogDescLocator = page.locator(
      '//*[@class="P3XclPtF4XBYW7l57ez1"]'
    )
    this.vacationDialogCloseButtonLocator = page.getByRole('button', {
      name: 'Close',
    })
    this.totalDaysLocator = this.page.locator(
      '//div[normalize-space()="Total Days"]'
    )
    this.totalDaysInNumberLocator = this.page.locator(
      '//div[text()="Total Days"]/following-sibling::div'
    )
    this.daysAvailableLocator = this.page.locator(
      '//div[normalize-space()="Days Available"]'
    )
    this.daysAvailableInNumberLocator = this.page.locator(
      '//div[text()="Days Available"]/following-sibling::div'
    )
    this.daysUsedLocator = this.page.locator(
      '//div[normalize-space()="Days used"]'
    )
    this.daysUsedInNumberLocator = this.page.locator(
      '//div[text()="Days used"]/following-sibling::div'
    )
    this.sickDaysUsedLocator = this.page.getByText('Sick days used')
    this.sickDaysUsedInNumberLocator = this.page.locator(
      '//div[text()="Sick days used"]/following-sibling::div'
    )
    this.daysSelectedLocator = this.page.getByText('Day selected')
    this.selectFilterLocator = this.page.locator(
      '(//*[@class="PartWrapper-module_partWrapper__I8EIP"])[2]'
    )
    this.selectFilterOptionsLocator = this.page.locator(
      '((//div[@data-ui-element="dropdown-list"])[3])/div/div'
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
      await this.page.waitForTimeout(2000)
      await this.newRequestLocator.click()
    })
  }

  async VerifyAvailableAbsenceTypes() {
    await Allure.step('should Choose paid vacation', async () => {
      await expect(this.selectAbsenceTypeHeadingLocator).toBeVisible()
      console.log('select Absence Type Heading is displayed')

      await expect(this.pleaseChooseDescLocator).toBeVisible()
      console.log('please choose descrption is visible')

      await expect(this.paidVacationLocator).toBeVisible()
      console.log('Paid vacation is visible')

      await expect(this.sickLeaveLocator).toBeVisible()
      console.log('sick Leave is visible')

      await expect(this.homeOfficeLocator).toBeVisible()
      console.log('home Office is visible')
    })
  }

  async selectPaidVacation() {
    await Allure.step('should Choose paid vacation', async () => {
      expect(this.paidVacationLocatorOptionLocator).toBeVisible()
      await this.page.waitForTimeout(2000)
      await this.paidVacationLocatorOptionLocator.click()
      console.log('Choosed paid vacation option')
    })
  }

  async selectSickLeave() {
    await Allure.step('should Choose sick leave', async () => {
      expect(this.sickLeaveLocatorOptionLocator).toBeVisible()
      await this.page.waitForTimeout(2000)
      await this.sickLeaveLocatorOptionLocator.click()
      console.log('Choosed sick leave option')
    })
  }

  async selectHomeOffice() {
    await Allure.step('should Choose home office', async () => {
      expect(this.homeOfficeLocatorOptionLocator).toBeVisible()
      await this.homeOfficeLocatorOptionLocator.click()
      console.log('Choosed home office option')
    })
  }

  async selectOtherAbsence() {
    await Allure.step('should Choose other absence', async () => {
      expect(this.otherAbsenceOptionLocator).toBeVisible()
      await this.otherAbsenceOptionLocator.click()
      console.log('Choosed other absence option')
    })
  }

  async clickCreateButton() {
    await Allure.step('Clicked on the create Button', async () => {
      expect(this.createButtonLocator).toBeVisible()
      await this.createButtonLocator.click()
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
      await this.halfDayCheckBoxLocator.click()
      console.log('Half Day is selected')
    })
  }

  async enterAMessage() {
    await Allure.step('Enter a message', async () => {
      expect(this.enterMessageLocator).toBeVisible()
      await this.enterMessageLocator.fill('sick')
      console.log('Message entered')
    })
  }

  async clickOnNextButton() {
    await Allure.step('Clicked on the Next Button', async () => {
      expect(this.nextButtonLocator).toBeVisible()
      await this.page.waitForTimeout(2000)
      await this.nextButtonLocator.click()
      console.log('Clicked on the Next Button')
    })
  }

  async clickOnsendButton() {
    await Allure.step('Clicked on the Send Button', async () => {
      expect(this.sendButtonLocator).toBeVisible()
      await this.page.waitForTimeout(2000)
      await this.sendButtonLocator.click()
      console.log('Clicked on the Send Button')
    })
  }

  async selectACoWorker() {
    await Allure.step('Co-worker is selected', async () => {
      await expect(this.responsibleDropdownLocator).toBeVisible()
      await this.responsibleDropdownLocator.click()
      console.log('Opened responsible dropdown')

      await expect(this.responsibleDropdownListLocator).toBeVisible()
      await this.responsibleDropdownListLocator.click()
      console.log('Choosed 1-st Person from dropdown')

      await expect(this.closeResponsibleDropdownListLocator).toBeVisible()
      await this.closeResponsibleDropdownListLocator.click()
      console.log('Closed responsible dropdown')
    })
  }

  async verifyConfirmationMessageForVacationDialog() {
    await Allure.step('vacation Confirmation Dialog is opened', async () => {
      await expect(this.vacationConfirmationDialogMessageLocator).toBeVisible()
      await expect(this.vacationConfirmationDialogMessageLocator).toHaveText(
        confirmationDialogTitles.vacation
      )
      console.log('Vacation Confirmation Dialog is opened')
    })
  }
  async verifyConfirmationMessageForSickDialog() {
    await Allure.step('vacation Confirmation Dialog is opened ', async () => {
      await expect(this.sickConfirmationDialogMessageLocator).toBeVisible()
      await expect(this.sickConfirmationDialogMessageLocator).toHaveText(
        confirmationDialogTitles.sick
      )
      console.log('Sick Confirmation Dialog is opened')
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
      console.log('Sick Confirmation Dialog is opened')
    })
  }

  async verifyRemainingNumberOfPaidLeaves() {
    await this.totalDaysLocator.isVisible()
    await this.totalDaysInNumberLocator.isVisible()

    await this.daysAvailableLocator.isVisible()
    await this.daysAvailableInNumberLocator.isVisible()

    await this.daysUsedLocator.isVisible()
    await this.daysUsedInNumberLocator.isVisible()
  }

  async verifyRemainingNumberOfSickLeaves() {
    await this.sickDaysUsedLocator.isVisible()
    await this.sickDaysUsedInNumberLocator.isVisible()
  }

  async VerifySelectedDaysText() {
    await this.daysSelectedLocator.isVisible()
    console.log(await this.daysSelectedLocator.textContent())
    await this.page.waitForTimeout(2000)
  }

  async VerifyAllStatusesFilter() {
    await this.selectFilterLocator.isVisible()
    await this.selectFilterLocator.click()

    // Get the count of items in the list
    const itemCount = await this.selectFilterOptionsLocator.count()
    console.log('item count :', itemCount)

    for (let i = 0; i < itemCount; i++) {
      // Select the item at index `i`
      await this.selectFilterOptionsLocator.nth(i).click()
      // Add a small delay to observe each selection
      await this.page.waitForTimeout(2000)
      console.log(`Selected item ${i + 1}`)
    }
  }

  async verifyVacationAppliedDate() {
    await Allure.step('Able to see the date format', async () => {
      const currentDate = new Date() // Get the current date
      const day = await this.getValidVacationDay() // Get the day (your custom method)
      const month = currentDate.toLocaleString('default', { month: 'short' }) // Get the short month name, e.g., "Jan"
      const year = currentDate.getFullYear() // Get the full year, e.g., 2025

      const formattedDate = `${day} ${month}. ${year} - ${day} ${month}. ${year}`
      await expect(this.vacationAppliedDateLocator).toHaveText(formattedDate) // Validate the displayed date.
      console.log('Able to see the date format')
    })
  }

  async verifyDescriptionForVacationConfirmationDialog() {
    await Allure.step(
      'Vacation confirmation description message is displayed',
      async () => {
        await expect(this.vacationConfirmationDialogDescLocator).toHaveText(
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
        await expect(this.vacationConfirmationDialogDescLocator).toHaveText(
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
        await expect(this.vacationConfirmationDialogDescLocator).toHaveText(
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
        await expect(this.vacationConfirmationDialogDescLocator).toHaveText(
          confirmationDialogMessages.homeOffice
        )
        console.log('Home Office confirmation description message is displayed')
      }
    )
  }

  async verifyVacationDialogCloseButton() {
    await Allure.step('vacation Confirmation Dialog is closed', async () => {
      await expect(this.vacationDialogCloseButtonLocator).toBeVisible()
      await this.vacationDialogCloseButtonLocator.click() // Close the confirmation dialog.
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
    const vacationDay = this.page.getByText(`${day}`, { exact: true })

    // await vacationDay.scrollIntoViewIfNeeded()
    await vacationDay.waitFor({ state: 'visible' })

    if (await vacationDay.isEnabled()) {
      await vacationDay.click()
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
      this.clickOnsendButton(),
    ])

    const responseBody = await response.json()
    console.log('Employee ID from response:', responseBody?.employee_id)
    return responseBody?.employee_id ?? null
  }
}
