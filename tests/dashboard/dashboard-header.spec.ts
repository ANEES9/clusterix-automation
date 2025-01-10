import { test, expect } from '@playwright/test'
import { allure } from 'allure-playwright'
import { ContainerPage } from '../../pages/dashboard/container-page'
import { closeWelcomePopUp } from '../../helpers/common/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { AllureHelper } from '../../helpers/allure-helper'

test.describe('Dashboard Header Tests', () => {
  let dashboardPage: ContainerPage

  test.beforeEach(async ({ page, baseURL }) => {
    dashboardPage = new ContainerPage(page)
    AllureHelper.addDefaultLabels()
    AllureHelper.addAppOwner('Dashboard')

    await AllureHelper.step(
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
    AllureHelper.addFeature('Notifications')
    AllureHelper.addEpic('Dashboard')
    AllureHelper.addSeverity('critical')
    AllureHelper.addTag('smoke')
    AllureHelper.addDescription(
      'Validate the Notifications panel opens correctly when button is clicked.'
    )

    await AllureHelper.step('Open Notifications Panel', async () => {
      await dashboardPage.openNotificationsPanel()
    })
  })

  test('Validate Calendar Navigation on Button Click', async () => {
    AllureHelper.addFeature('Calendar')
    AllureHelper.addSeverity('normal')

    await AllureHelper.step('Navigate to Calendar Page', async () => {
      await dashboardPage.navigateToCalendar()
    })
  })

  test('Validate Time Tracking Navigation on Button Click', async () => {
    AllureHelper.addFeature('Time Tracking')
    AllureHelper.addSeverity('normal')

    await AllureHelper.step('Navigate to Time Tracking Page', async () => {
      await dashboardPage.navigateToTimeTracking()
    })
  })

  test('Validate Email Navigation on Button Click', async () => {
    AllureHelper.addFeature('Email')
    AllureHelper.addSeverity('normal')

    await AllureHelper.step('Navigate to Email Page', async () => {
      await dashboardPage.navigateToEmail()
    })
  })

  test('Validate Live Chat Navigation on Button Click', async ({ context }) => {
    AllureHelper.addFeature('Live Chat')
    AllureHelper.addSeverity('minor')

    await AllureHelper.step('Open Live Chat in New Tab', async () => {
      await dashboardPage.openLiveChat(context)
    })
  })

  test('Validate Profile Menu Opens on Avatar Click', async () => {
    AllureHelper.addFeature('Profile')
    AllureHelper.addSeverity('low')

    await AllureHelper.step('Open Profile Dropdown Menu', async () => {
      await dashboardPage.openProfileDropdown()
    })
  })
})
