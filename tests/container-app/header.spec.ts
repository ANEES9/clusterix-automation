import { test } from '@playwright/test'
import { ContainerPage } from '../../pages/container-app/container-page'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurvey } from 'common/skip-survey'
import { closeProductTour } from 'common/product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { Allure } from 'common/allure-helper'
import { NotificationsPanelPage } from 'pages/notifications/notifications-panel-page'
import { APP_NAMES } from 'config/constants/app-names'

test.describe('Container App Header Navigation Tests', () => {
  let containerPage: ContainerPage

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const locale = testInfo.project.use.locale || 'en'
    containerPage = new ContainerPage(page)
    Allure.addFeature('Navigation')
    Allure.addAppOwner('ContainerApp')
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await addCursorStyleAndScript(page)
      await skipSurvey(page, testInfo)
      await closeProductTour(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
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
      await containerPage.openNotificationsPanel()
    })
    await Allure.step('Check Navigation Panel Header', async () => {
      await notificationsPanelPage.validateNotificationsPanelHeader()
    })
  })

  test('Validate Calendar Navigation on Button Click', async () => {
    Allure.addFeature('Calendar')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Calendar Page', async () => {
      await containerPage.navigateToCalendarFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.calendar)
    })
  })

  test('Validate Time Tracking Navigation on Button Click', async () => {
    Allure.addFeature('Time Tracking')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Time Tracking Page', async () => {
      await containerPage.navigateToTimeTrackingFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.timeTracking)
    })
  })

  test('Validate Email Navigation on Button Click', async () => {
    Allure.addFeature('Email')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Email Page', async () => {
      await containerPage.navigateToEmailFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.email)
    })
  })

  test('Validate Live Chat Navigation on Button Click', async ({ context }) => {
    Allure.addFeature('Live Chat')
    Allure.addSeverity('minor')

    await Allure.step('Open Live Chat in New Tab and Validate', async () => {
      await containerPage.openLiveChatAndValidate(context)
    })
  })

  test('Validate Profile Menu Opens on Avatar Click', async () => {
    Allure.addFeature('Profile')
    Allure.addSeverity('trivial')

    await Allure.step('Open Profile Dropdown Menu', async () => {
      await containerPage.openProfileDropdown()
    })
  })

  test('Validate Profile Menu Username on Dropdown', async () => {
    Allure.addFeature('Profile')
    Allure.addSeverity('trivial')

    await Allure.step('Open Profile Dropdown Menu', async () => {
      await containerPage.validateProfileDropdownUserName()
    })
  })
})
