import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'config/constants/app-urls'

export class CalendarPage {
  private page: Page
  private closeCurrentApp: Locator
  private weekview: Locator
  private monthview: Locator
  private calendarApp: Locator

  static readonly URL = '/calendar'

  constructor(page: Page) {
    this.page = page
    this.closeCurrentApp = page.locator('.t2NoaA5h7fzt0q0GapK3')
   // this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
    this.calendarApp = page.getByRole('button', { name: 'Calendar' })
    this.weekview = page.getByRole('button', { name: 'Week' })
    this.monthview = page.getByRole('button', { name: 'Month' })

  }

  async closeCurrentApplication() {
    await Allure.step(
      'should close the current application modal when cancel is clicked',
      async () => {
        await this.closeCurrentApp.click();
      }
    )
  }
  async navigateToCalendar() {
    await Allure.step(
      'should Navigate to Calendar application when calendar icon is clicked',
      async () => {
        await this.calendarApp.click()
      }
    )
  }

  async navigateToWeekView() {
    await Allure.step(
      'should Navigate to Calendar Week view when dropdown Week value is clicked',
      async () => {
        await this.weekview.click()
      }
    )
  }
  async navigateToMonthView() {
    await Allure.step(
      'should Navigate to Calendar Month view when dropdown Month value is clicked',
      async () => {
        await this.monthview.click()
      }
    )
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Calendar URL', async () => {
      await this.page.goto(`${baseURL}${CalendarPage.URL}`)
    })
  }

  // async validateCurrentApp() {
  //   await expect(this.page).toHaveURL(new RegExp(`${CalendarPage.URL}$`))
  //   await expect(this.currentApp).toContainText('Calendar')
  // }
}
