import { test } from '@playwright/test'
import { HomePage } from 'pages/home/home-page'
import { Allure } from 'common/allure-helper'
import { NotificationsPanelPage } from 'pages/notifications/notifications-panel-page'
import { APP_NAMES } from 'constants/app-names'
import { setupTestContext } from 'utils/test-context'
test.describe('Container App Header Navigation Tests', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    Allure.addFeature('Navigation')
    Allure.addAppOwner('Home')
    const { locale } = await setupTestContext(page, testInfo)
    homePage = new HomePage(page, locale)
    await homePage.goto(baseURL)
  })

  test('Validate Notifications Panel Opens on Button Click', async ({
    page,
  }) => {
    Allure.addFeature('Notifications')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Validate the Notifications panel opens correctly when header button is clicked'
    )
    const notificationsPanelPage = new NotificationsPanelPage(page)
    await Allure.step('Open Notifications Panel', async () => {
      await homePage.openNotificationsPanel()
    })
    await Allure.step('Check Navigation Panel Header', async () => {
      await notificationsPanelPage.validateNotificationsPanelHeader()
    })
  })

  test('Validate Calendar Navigation on Button Click', async () => {
    Allure.addFeature('Calendar')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Calendar Page', async () => {
      await homePage.navigateToCalendarFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.calendar)
    })
  })

  test('Validate Time Tracking Navigation on Button Click', async () => {
    Allure.addFeature('Time Tracking')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Time Tracking Page', async () => {
      await homePage.navigateToTimeTrackingFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.timeTracking)
    })
  })

  test('Validate Email Navigation on Button Click', async () => {
    Allure.addFeature('Email')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Email Page', async () => {
      await homePage.navigateToEmailFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.email)
    })
  })

  test('Validate Live Chat Navigation on Button Click', async ({ context }) => {
    Allure.addFeature('Live Chat')
    Allure.addSeverity('minor')

    await Allure.step('Open Live Chat in New Tab and Validate', async () => {
      await homePage.openLiveChatAndValidate(context)
    })
  })

  test('Validate Profile Menu Opens on Avatar Click', async () => {
    Allure.addFeature('Profile')
    Allure.addSeverity('trivial')

    await Allure.step('Open Profile Dropdown Menu', async () => {
      await homePage.openProfileDropdown()
    })
  })

  test('Validate Profile Menu Username on Dropdown', async () => {
    Allure.addFeature('Profile')
    Allure.addSeverity('trivial')

    await Allure.step('Open Profile Dropdown Menu', async () => {
      await homePage.validateProfileDropdownUserName()
    })
  })
})
