import { test } from '@playwright/test'
import { HomePage } from 'pages/home/home-page'
import { Allure } from 'common/allure-helper'
import { NotificationsPanelPage } from 'pages/notifications/notifications-panel-page'
import { APP_NAMES } from 'constants/app-names'
import { setupTestContext } from 'utils/test-context'
test.describe('Home Header Navigation Tests', () => {
  let homePage: HomePage
  let locale: string

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    Allure.addFeature(' Header navigation')
    Allure.addAppOwner('Home')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    await homePage.goto(baseURL)
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    homePage = new HomePage(page, locale)
    await page.waitForLoadState('networkidle')
  })

  test('Validate Notifications Panel Opens on Button Click', async ({
    page,
  }) => {
    const notificationsPanelPage = new NotificationsPanelPage(page, locale)
    await Allure.step('Open Notifications Panel', async () => {
      await homePage.openNotificationsPanel()
    })
    await Allure.step('Check Navigation Panel Header', async () => {
      await notificationsPanelPage.validateNotificationsPanelHeader()
    })
  })

  test('Validate Calendar Navigation on Button Click', async () => {
    await Allure.step('Navigate to Calendar Page', async () => {
      await homePage.navigateToCalendarFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.calendar)
    })
  })

  test('Validate Time Tracking Navigation on Button Click', async () => {
    await Allure.step('Navigate to Time Tracking Page', async () => {
      await homePage.navigateToTimeTrackingFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.timeTracking)
    })
  })

  test('Validate Email Navigation on Button Click', async () => {
    await Allure.step('Navigate to Email Page', async () => {
      await homePage.navigateToEmailFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.email)
    })
  })

  test('Validate Live Chat Navigation on Button Click', async ({ context }) => {
    await Allure.step('Open Live Chat in New Tab and Validate', async () => {
      await homePage.openLiveChatAndValidate(context, locale)
    })
  })

  test('Validate Profile Menu Opens on Avatar Click', async () => {
    await Allure.step('Open Profile Dropdown Menu', async () => {
      await homePage.openProfileDropdown()
    })
  })

  test('Validate Profile Menu Username on Dropdown', async () => {
    await Allure.step('Open Profile Dropdown Menu', async () => {
      await homePage.validateProfileDropdownUserName()
    })
  })
})
