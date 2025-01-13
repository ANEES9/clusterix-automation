import { test } from '@playwright/test'
import { ContainerPage } from '../../pages/dashboard/container-page'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurvey } from 'common/skip-survey'
import { closeWelcomePopUp } from 'common/welcome-popup-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { Allure } from 'common/allure-helper'

test.describe('Dashboard Header Tests', () => {
  let containerPage: ContainerPage

  test.beforeEach(async ({ page, baseURL }) => {
    containerPage = new ContainerPage(page)
    Allure.addDefaultLabels()
    Allure.addAppOwner('Dashboard')

    await Allure.step('Add cursor style and script', async () => {
      await addCursorStyleAndScript(page)
    })

    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipSurvey(page)
      await closeWelcomePopUp(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test('Validate Notifications Panel Opens on Button Click', async () => {
    Allure.addFeature('Notifications')
    Allure.addEpic('Dashboard')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Validate the Notifications panel opens correctly when button is clicked.'
    )

    await Allure.step('Open Notifications Panel', async () => {
      await containerPage.openNotificationsPanel()
    })
  })

  test('Validate Calendar Navigation on Button Click', async () => {
    Allure.addFeature('Calendar')
    Allure.addSeverity('normal')

    await Allure.step('Navigate to Calendar Page', async () => {
      await containerPage.navigateToCalendar()
    })
  })

  test('Validate Time Tracking Navigation on Button Click', async () => {
    Allure.addFeature('Time Tracking')
    Allure.addSeverity('normal')

    await Allure.step('Navigate to Time Tracking Page', async () => {
      await containerPage.navigateToTimeTracking()
    })
  })

  test('Validate Email Navigation on Button Click', async () => {
    Allure.addFeature('Email')
    Allure.addSeverity('normal')

    await Allure.step('Navigate to Email Page', async () => {
      await containerPage.navigateToEmail()
    })
  })

  test('Validate Live Chat Navigation on Button Click', async ({ context }) => {
    Allure.addFeature('Live Chat')
    Allure.addSeverity('minor')

    await Allure.step('Open Live Chat in New Tab', async () => {
      await containerPage.openLiveChat(context)
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
