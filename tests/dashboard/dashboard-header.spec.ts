import { test, expect } from '@playwright/test'
import { allure } from 'allure-playwright' // Import Allure
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/timer-helper'

test.describe('Dashboard Header Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await closeWelcomePopUp(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test('Validate Notifications Panel Opens on Button Click', async ({
    page,
  }) => {
    allure.label('app', 'dashboard')
    allure.epic('Dashboard') // Group tests under an epic
    allure.feature('Notifications') // Mark feature
    allure.story('Open Notifications Panel') // Add story
    allure.severity('critical') // Define severity
    allure.label('owner', 'QA Team') // Add custom label
    allure.tag('smoke') // Add tags for filtering

    await allure.step('Locate the Notifications button', async () => {
      const notificationsButton = page.getByRole('button', {
        name: 'Notifications',
        exact: true,
      })
      await expect(notificationsButton).toBeVisible()
    })

    await allure.step(
      'Click Notifications Button and Validate Panel',
      async () => {
        await page.getByRole('button', { name: 'Notifications' }).click()
        const notificationsPanel = page.locator('div.PanelHeader_title__RGLri')
        await expect(notificationsPanel).toBeVisible()
        await expect(notificationsPanel).toContainText('Notifications')
      }
    )
  })

  test('Validate Calendar Navigation on Button Click', async ({ page }) => {
    allure.feature('Calendar')
    allure.story('Navigate to Calendar')
    allure.severity('normal')

    await allure.step('Locate and click the Calendar button', async () => {
      const calendarButton = page.getByRole('button', {
        name: 'Calendar',
        exact: true,
      })
      await expect(calendarButton).toBeVisible()
      await calendarButton.click()
    })

    await allure.step('Validate Calendar URL and Title', async () => {
      await expect(page).toHaveURL(/.*calendar/)
      const currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
      await expect(currentApp).toContainText('Calendar')
    })
  })

  test('Validate Time Tracking Navigation on Button Click', async ({
    page,
  }) => {
    allure.feature('Time Tracking')
    allure.story('Navigate to Time Tracking')
    allure.severity('normal')

    await allure.step('Locate and click the Time Tracking button', async () => {
      const timeTrackingButton = page.locator(
        'button.AppBadge-module_wrapper__ctDKc[title="Time Tracking"]'
      )
      await expect(timeTrackingButton).toBeVisible()
      await timeTrackingButton.click()
    })

    await allure.step('Validate Time Tracking URL and Title', async () => {
      await expect(page).toHaveURL(/.*timetracking/)
      const currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
      await expect(currentApp).toContainText('Time Tracking')
    })
  })

  test('Validate Email Navigation on Button Click', async ({ page }) => {
    allure.feature('Email')
    allure.story('Navigate to Email')
    allure.severity('normal')

    await allure.step('Locate and click the Email button', async () => {
      const emailButton = page.getByRole('button', {
        name: 'Email',
        exact: true,
      })
      await expect(emailButton).toBeVisible()
      await emailButton.click()
    })

    await allure.step('Validate Email URL and Title', async () => {
      await expect(page).toHaveURL(/.*email/)
      const currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
      await expect(currentApp).toContainText('Email')
    })
  })

  test('Validate Live Chat Navigation on Button Click', async ({
    page,
    context,
  }) => {
    allure.feature('Live Chat')
    allure.story('Open Live Chat in New Tab')
    allure.severity('minor')

    await allure.step(
      'Click the Live Chat button and open new page',
      async () => {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          page.getByRole('button', { name: 'Live Chat', exact: true }).click(),
        ])
        await newPage.waitForLoadState()

        await expect(newPage).toHaveURL(/.*live-chat/)
        const header = newPage.locator('p.m5ZbRpDkQfW8BXDqdzmY')
        await expect(header).toContainText('Live Chat')
      }
    )
  })

  test('Validate Profile Menu Opens on Avatar Click', async ({ page }) => {
    allure.feature('Profile')
    allure.story('Open Profile Dropdown Menu')
    allure.severity('low')

    await allure.step(
      'Remove overlays and locate profile dropdown',
      async () => {
        await page.evaluate(() => {
          const overlays = document.querySelectorAll('div.overlay-class')
          overlays.forEach((overlay) => overlay.remove())
        })
        const dropdownButton = page.locator(
          'xpath=//*[@id="root"]/div/div[1]/button[2]/div[2]/p'
        )
        await expect(dropdownButton).toBeVisible()
      }
    )

    await allure.step(
      'Click profile button and validate dropdown',
      async () => {
        const dropdownButton = page.locator(
          'xpath=//*[@id="root"]/div/div[1]/button[2]/div[2]/p'
        )
        await dropdownButton.click()
        const dropdownMenu = page.locator(
          'div.zRKnxOINWe9I7ZEklVSwa_MhoacEurGSZMOrrDSO'
        )
        await expect(dropdownMenu).toBeVisible()
      }
    )
  })
})
