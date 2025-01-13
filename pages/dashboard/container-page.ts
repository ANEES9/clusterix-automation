import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { NotificationsPanelPage } from '../notifications/notifications-panel-page'
import { CalendarPage } from '../calendar/calendar-page'
import { TimeTrackingPage } from '../time-tracking/time-tracking-page'
import { EmailPage } from '../email/email-page'
import { LiveChatPage } from '../live-chat/live-chat-page'
import { BrowserContext } from 'playwright'

export class ContainerPage {
  private page: Page
  private notificationsButton: Locator
  private calendarButton: Locator
  private timeTrackingButton: Locator
  private emailButton: Locator
  private liveChatButton: Locator
  private profileDropdownButton: Locator
  private profileDropdownMenu: Locator
  private dropdownUserNameElement: Locator
  private profileDropdownSearch: Locator

  private notificationsPanel: NotificationsPanelPage
  private calendarPage: CalendarPage
  private timeTrackingPage: TimeTrackingPage
  private emailPage: EmailPage
  private liveChatPage: LiveChatPage

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
    this.profileDropdownButton = page.getByRole('button', { name: /avatar/i })
    this.profileDropdownMenu = page.getByText('Product TourSettings')
    this.dropdownUserNameElement = page.locator('#ca-portal-root')
    this.profileDropdownSearch = page.getByPlaceholder('Search')

    this.notificationsPanel = new NotificationsPanelPage(page)
    this.calendarPage = new CalendarPage(page)
    this.timeTrackingPage = new TimeTrackingPage(page)
    this.emailPage = new EmailPage(page)
    this.liveChatPage = new LiveChatPage(page)
  }

  async openNotificationsPanel() {
    await Allure.step(
      'Click Notifications Button and Validate Panel',
      async () => {
        await this.notificationsButton.click()
        await this.notificationsPanel.validateNotificationsPanelHeader()
      }
    )
  }

  async navigateToCalendar() {
    await Allure.step('Locate and click the Calendar button', async () => {
      await this.calendarButton.click()
    })
    await Allure.step('Validate Calendar URL and Title', async () => {
      await this.calendarPage.validateCurrentApp()
    })
  }

  async navigateToTimeTracking() {
    await Allure.step('Locate and click the Time Tracking button', async () => {
      await this.timeTrackingButton.click()
    })
    await Allure.step('Validate Time Tracking URL and Title', async () => {
      await this.timeTrackingPage.validateCurrentApp()
    })
  }

  async navigateToEmail() {
    await Allure.step('Locate and click the Email button', async () => {
      await this.emailButton.click()
    })

    await Allure.step('Validate Email URL and Title', async () => {
      await this.emailPage.validateCurrentApp()
    })
  }

  async openLiveChat(context: BrowserContext) {
    await Allure.step(
      'should open Live Chat in a new page when live chat button is clicked',
      async () => {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          this.liveChatButton.click(),
        ])
        await newPage.waitForLoadState()
        const liveChatPage = new LiveChatPage(newPage)
        await liveChatPage.validateCurrentApp()
      }
    )
  }

  async openProfileDropdown() {
    await Allure.step(
      'should display profile dropdown menu when profile button is clicked',
      async () => {
        await this.profileDropdownButton.click({ force: true })
        await expect(this.profileDropdownMenu).toBeVisible()
      }
    )
  }

  async validateProfileDropdownUserName() {
    await Allure.step(
      'should validate profile dropdown user name when profile button is clicked',
      async () => {
        const avatarName = await this.profileDropdownButton.textContent()
        const trimmedAvatarName = avatarName
          ?.trim()
          .split(/\s+/)
          .slice(0, 2)
          .join(' ')
        await this.profileDropdownButton.click()
        const dropdownUserName =
          await this.dropdownUserNameElement.textContent()
        const trimmedDropdownUserName = dropdownUserName
          ?.trim()
          .split(/\s+/)
          .slice(0, 2)
          .join(' ')
        expect(trimmedAvatarName).toEqual(trimmedDropdownUserName)
      }
    )
  }

  async selectCompanyFromDropdown() {
    await Allure.step('should select company from dropdown', async () => {
      await this.profileDropdownButton.click()
      const dropdownText = await this.profileDropdownButton.textContent()
      const lines = dropdownText
        ? dropdownText.split('\n').map((line) => line.trim())
        : []
      const ignoredKeywords = [
        'My Profile',
        'My Organization',
        'Logout',
        'Product Tour',
        'Deutsch',
        'English',
        'Settings',
      ]
      const companyName = lines.find(
        (line) => !ignoredKeywords.includes(line) && !line.includes('@')
      )
      if (!companyName) {
        throw new Error('Company name could not be found in the dropdown.')
      }

      const companyButton = this.page
        .getByRole('button', { name: companyName })
        .nth(1)
      await companyButton.click()

      await this.profileDropdownSearch.click()
      await this.profileDropdownSearch.fill(companyName)

      const searchResult = this.page
        .getByRole('button', { name: companyName })
        .nth(2)
      await searchResult.click()

      await this.page.waitForLoadState('networkidle')

      const updatedDropdownText = await this.profileDropdownButton.textContent()
      const updatedLines = updatedDropdownText
        ? updatedDropdownText.split('\n').map((line) => line.trim())
        : []
      const updatedCompanyName = updatedLines.find(
        (line) => !ignoredKeywords.includes(line) && !line.includes('@')
      )

      expect(updatedCompanyName).toEqual(companyName)
    })
  }
}
