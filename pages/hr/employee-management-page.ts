import { Page, Locator } from '@playwright/test'
import { VacationAbsenceDaysPage } from '../my-profile/vacation-absence-days.page'
import { getTranslations } from 'common/get-translations-helper'

export class EmployeeManagementPage {
  readonly page: Page
  private translations: Record<string, any>
  // Locators
  private holidaysButtonLocator: Locator
  private calendarButtonLocator: Locator
  private deleteButtonLocator: Locator
  private saveButtonLocator: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('hr', locale)

    this.holidaysButtonLocator = this.page
      .locator('div')
      .filter({ hasText: /^Holidays$/ })
      .first()
    this.calendarButtonLocator = page
      .getByRole('button', { name: 'Calendar' })
      .nth(2)
    this.deleteButtonLocator = page.getByRole('button', { name: 'Delete' })
    this.saveButtonLocator = page.getByRole('button', { name: 'Save' })
  }

  async deleteAppliedLeave(employeeId: number): Promise<void> {
    const vacationAbsenceDaysPage = new VacationAbsenceDaysPage(this.page)
    await this.page.goto(
      `https://testing.clusterix.io/hr/employees/${employeeId}`
    )
    await this.page.waitForLoadState('networkidle')

    await this.page.waitForTimeout(3000)
    await this.holidaysButtonLocator.click()
    await this.calendarButtonLocator.click()
    await this.page.waitForTimeout(3000)
    const validDay = await vacationAbsenceDaysPage.getValidVacationDay() // Get the first valid day

    console.log(validDay)

    try {
      const vacationDay = this.page
        .locator('div')
        .filter({ hasText: new RegExp(`^${validDay}$`) })
        .nth(1)

      /*this.page.locator(
        `[id^="headlessui-dialog-panel-\\:"] div.o8m2LEiBiHsAAiJXPeHm`
      ).filter({ hasText: new RegExp(`^${9}$`) }).nth(3) */

      console.log('Is Enabled:', await vacationDay.isEnabled())
      await vacationDay.scrollIntoViewIfNeeded()
      await vacationDay.waitFor({ state: 'visible' })
      console.log('Is Visible:', await vacationDay.isVisible())

      await vacationDay.click({ force: true })
      await this.page.waitForTimeout(2000)
      await this.deleteButtonLocator.click()
      await this.page.waitForTimeout(2000)
      await this.saveButtonLocator.click()

      console.log(`Successfully deleted vacation for the day ${validDay}`)
    } catch (error) {
      console.error(`Failed to delete vacation for day ${validDay}: ${error}`)
    }
  }
}
