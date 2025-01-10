import { Page, Locator, expect } from '@playwright/test'
import { allure } from 'allure-playwright'
import { NotificationsPanelPage } from '../notifications/notifications-panel-page'
import { CalendarPage } from '../calendar/calendar-page'

export class ContainerPage {
  private page: Page
  private notificationsButton: Locator
  private calendarButton: Locator
  private timeTrackingButton: Locator
  private emailButton: Locator
  private liveChatButton: Locator
  private profileDropdownButton: Locator
  private profileDropdownMenu: Locator
  private notificationsPanel: NotificationsPanelPage
  private calendarPage: CalendarPage

  constructor(page: Page) {
    this.page = page
    this.notificationsButton = page.getByRole('button', {
      name: 'Notifications',
      exact: true,
    })
    this.calendarButton = page.getByRole('button', {
      name: 'Calendar',
      exact: true,
    })
    this.timeTrackingButton = page.locator(
      'button.AppBadge-module_wrapper__ctDKc[title="Time Tracking"]'
    )
    this.emailButton = page.getByRole('button', {
      name: 'Email',
      exact: true,
    })
    this.liveChatButton = page.getByRole('button', {
      name: 'Live Chat',
      exact: true,
    })
    this.profileDropdownButton = page.locator(
      'xpath=//*[@id="root"]/div/div[1]/button[2]/div[2]/p'
    )
    this.profileDropdownMenu = page.locator(
      'div.zRKnxOINWe9I7ZEklVSwa_MhoacEurGSZMOrrDSO'
    )
    this.notificationsPanel = new NotificationsPanelPage(page)
    this.calendarPage = new CalendarPage(page)
  }

  async openNotificationsPanel() {
    await allure.step(
      'Click Notifications Button and Validate Panel',
      async () => {
        await this.notificationsButton.click()
        await this.notificationsPanel.validateNotificationsPanelHeader()
      }
    )
  }

  async navigateToCalendar() {
    await allure.step('Locate and click the Calendar button', async () => {
      await this.calendarButton.click()
    })
    await allure.step('Validate Calendar URL and Title', async () => {
      await this.calendarPage.validateCurrentApp()
    })
  }

  async navigateToTimeTracking() {
    await allure.step('Locate and click the Time Tracking button', async () => {
      await this.timeTrackingButton.click()
    })
    await allure.step('Validate Time Tracking URL and Title', async () => {
      await expect(this.page).toHaveURL(/.*timetracking/)
      const currentApp = this.page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
      await expect(currentApp).toContainText('Time Tracking')
    })
  }

  async navigateToEmail() {
    await allure.step('Locate and click the Email button', async () => {
      await this.emailButton.click()
    })

    await allure.step('Validate Email URL and Title', async () => {
      await expect(this.page).toHaveURL(/.*email/)
      const currentApp = this.page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
      await expect(currentApp).toContainText('Email')
    })
  }

  async openLiveChat(context: any) {
    await allure.step(
      'Click the Live Chat button and open new page',
      async () => {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          this.liveChatButton.click(),
        ])
        await newPage.waitForLoadState()
        await expect(newPage).toHaveURL(/.*live-chat/)
        const header = newPage.locator('p.m5ZbRpDkQfW8BXDqdzmY')
        await expect(header).toContainText('Live Chat')
      }
    )
  }

  async openProfileDropdown() {
    await allure.step(
      'Click profile button and validate dropdown',
      async () => {
        await this.profileDropdownButton.click()
        await expect(this.profileDropdownMenu).toBeVisible()
      }
    )
  }
}
