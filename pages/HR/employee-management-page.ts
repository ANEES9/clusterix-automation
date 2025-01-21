import { Page, Locator, expect } from '@playwright/test'
import { VacationAbsenceDaysPage } from '../my-profile/vacation-absence-days.page'

export class EmployeeManagementPage {
  readonly page: Page
  // Locators
  private holidaysButton: Locator
  private calendarButton: Locator
  private deleteButton: Locator
  private saveButton: Locator

  constructor(page: Page) {
    this.page = page

    this.holidaysButton = this.page
      .locator('div')
      .filter({ hasText: /^Holidays$/ })
      .first()
    this.calendarButton = page.getByRole('button', { name: 'Calendar' }).nth(2)
    this.deleteButton = page.getByRole('button', { name: 'Delete' })
    this.saveButton = page.getByRole('button', { name: 'Save' })
  }

  async deleteAppliedLeave(employeeId: number): Promise<void> {
    const vacationAbsenceDaysPage = new VacationAbsenceDaysPage(this.page)
    await this.page.goto(
      `https://testing.clusterix.io/hr/employees/${employeeId}`
    )
    await this.page.waitForLoadState('networkidle')

    await this.page.waitForTimeout(3000)
    await this.holidaysButton.click()
    await this.calendarButton.click()
    await this.page.waitForTimeout(3000)
    const validDay = await vacationAbsenceDaysPage.getValidVacationDay() // Get the first valid day

    console.log(validDay)

    try {
      const vacationDay = this.page
        .locator(`[id^="headlessui-dialog-panel-\\:"] div.o8m2LEiBiHsAAiJXPeHm`)
        .filter({ hasText: new RegExp(`^${validDay}$`) })
        .nth(1)

      //console.log('Is Enabled:', await vacationDay.isEnabled())
      await vacationDay.scrollIntoViewIfNeeded()
      await vacationDay.waitFor({ state: 'visible' })
      console.log('Is Visible:', await vacationDay.isVisible())

      await vacationDay.click({ force: true })

      await this.deleteButton.click()
      await this.saveButton.click()

      console.log(`Successfully deleted vacation for the day ${validDay}`)
    } catch (error) {
      console.error(`Failed to delete vacation for day ${validDay}: ${error}`)
    }
  }
}
