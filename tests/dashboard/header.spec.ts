import { test } from '@playwright/test'
import { ContainerPage } from '../../pages/dashboard/container-page'
import { closeWelcomePopUp } from 'common/welcome-popup-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { Allure } from 'common/allure-helper'

test.describe('Dashboard Header Tests', () => {
  let dashboardPage: ContainerPage

  test.beforeEach(async ({ page, baseURL }) => {
    dashboardPage = new ContainerPage(page)
    Allure.addDefaultLabels()
    Allure.addAppOwner('Dashboard')

    await Allure.step(
      'Navigate to Base URL and Close Popups',
      async () => {
        await page.goto(baseURL!)
        await closeWelcomePopUp(page)
        await closeTimerPopUp(page)
        await page.waitForLoadState('networkidle')
      }
    )
  })

  test('Validate Notifications Panel Opens on Button Click', async ({
                                                                      page,
                                                                    }) => {
    Allure.addFeature('Notifications')
    Allure.addEpic('Dashboard')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Validate the Notifications panel opens correctly when button is clicked.'
    )

    await Allure.step('Open Notifications Panel', async () => {
      await dashboardPage.openNotificationsPanel()
    })
  })

  test('Validate Calendar Navigation on Button Click', async () => {
    Allure.addFeature('Calendar')
    Allure.addSeverity('normal')

    await Allure.step('Navigate to Calendar Page', async () => {
      await dashboardPage.navigateToCalendar()
    })
  })

  test('Validate Time Tracking Navigation on Button Click', async () => {
    Allure.addFeature('Time Tracking')
    Allure.addSeverity('normal')

    await Allure.step('Navigate to Time Tracking Page', async () => {
      await dashboardPage.navigateToTimeTracking()
    })
  })

  test('Validate Email Navigation on Button Click', async () => {
    Allure.addFeature('Email')
    Allure.addSeverity('normal')

    await Allure.step('Navigate to Email Page', async () => {
      await dashboardPage.navigateToEmail()
    })
  })

  test('Validate Live Chat Navigation on Button Click', async ({ context }) => {
    Allure.addFeature('Live Chat')
    Allure.addSeverity('minor')

    await Allure.step('Open Live Chat in New Tab', async () => {
      await dashboardPage.openLiveChat(context)
    })
  })

  test('Validate Profile Menu Opens on Avatar Click', async () => {
    Allure.addFeature('Profile')
    Allure.addSeverity('trivial')

    await Allure.step('Open Profile Dropdown Menu', async () => {
      await dashboardPage.openProfileDropdown()
    })
  })
})
