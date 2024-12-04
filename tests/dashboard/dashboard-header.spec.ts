import { test, expect } from '@playwright/test'
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/timer-helper'

test.describe('Dashboard Header Items', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL!)
    await closeWelcomePopUp(page)
    await closeTimerPopUp(page)
    await page.waitForLoadState('networkidle')
  })

  test('Validate Notifications Panel Opens on Button Click', async ({
    page,
  }) => {
    // Step 1: Locate the notifications button
    const notificationsButton = page.getByRole('button', {
      name: 'Notifications',
      exact: true,
    })
    // Step 2: Ensure the notifications button is visible
    await expect(notificationsButton).toBeVisible()
    // Step 3: Click the notifications button
    await notificationsButton.click()
    // Step 4: Verify the notifications panel is visible
    const notificationsPanel = page.locator('div.PanelHeader_title__RGLri')
    await expect(notificationsPanel).toBeVisible()
    // Step 5: Validate the title of the notifications panel
    await expect(notificationsPanel).toContainText('Notifications')
  })

  test('Validate Calendar Navigation on Button Click', async ({ page }) => {
    // Step 1: Locate the calendar button
    const calendarButton = page.getByRole('button', {
      name: 'Calendar',
      exact: true,
    })
    // Step 2: Ensure the calendar button is visible
    await expect(calendarButton).toBeVisible()
    // Step 3: Click the calendar button
    await calendarButton.click()
    // Step 4: Verify the calendar navigation URL
    await expect(page).toHaveURL(/.*calendar/)
    // Step 5: Validate the title of the notifications panel
    const currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
    await expect(currentApp).toContainText('Calendar')
  })

  test('Validate Time Tracking Navigation on Button Click', async ({
    page,
  }) => {
    // Step 1: Locate the time tracking button
    const timeTrackingButton = page.locator(
      'button.AppBadge-module_wrapper__ctDKc[title="Time Tracking"]'
    )
    // Step 2: Ensure the time tracking button is visible
    await expect(timeTrackingButton).toBeVisible()
    // Step 3: Click the time tracking button
    await timeTrackingButton.click()
    // Step 4: Verify the time tracking navigation URL
    await expect(page).toHaveURL(/.*timetracking/)
    // Step 5: Validate the title of the notifications page
    const currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
    await expect(currentApp).toContainText('Time Tracking')
  })

  test('Validate Email Navigation on Button Click', async ({ page }) => {
    // Step 1: Locate the email button
    const emailButton = page.getByRole('button', { name: 'Email', exact: true })
    // Step 2: Ensure the email button is visible
    await expect(emailButton).toBeVisible()
    // Step 3: Click the email button
    await emailButton.click()
    // Step 4: Verify the email navigation URL
    await expect(page).toHaveURL(/.*email/)
    // Step 5: Validate the title of the email page
    const currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
    await expect(currentApp).toContainText('Email')
  })

  test('Validate Live Chat Navigation on Button Click', async ({
    page,
    context,
  }) => {
    // Step 1: Listen for the new page event when clicking the Live Chat button
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Wait for a new page to open
      page.getByRole('button', { name: 'Live Chat', exact: true }).click(), // Trigger the button click
    ])
    // Step 2: Wait for the new page to load completely
    await newPage.waitForLoadState()
    // Step 3: Verify the URL of the new page
    await expect(newPage).toHaveURL(/.*live-chat#contacts/)
    // Step 4: Validate the title or content of the Live Chat page
    const header = newPage.locator('p.m5ZbRpDkQfW8BXDqdzmY') // Replace this with the correct selector for the title
    await expect(header).toContainText('Live Chat')
  })

  //todo: cannot click on the profile
  test('Validate Profile Menu Opens on Avatar Click', async ({ page }) => {
    // Remove any overlay
    await page.evaluate(() => {
      const overlays = document.querySelectorAll('div.overlay-class')
      overlays.forEach((overlay) => overlay.remove())
    })
    // Step 1: Locate the dropdown button
    const dropdownButton = page.locator(
      'xpath=//*[@id="root"]/div/div[1]/button[2]/div[2]/p'
    )
    // Step 2: Ensure the dropdown button is visible
    await expect(dropdownButton).toBeVisible()
    // Step 3: Click the dropdown button
    await dropdownButton.click()
    // Step 4: Validate that the dropdown menu appears
    const dropdownMenu = page.locator(
      'div.zRKnxOINWe9I7ZEklVSwa_MhoacEurGSZMOrrDSO'
    )
    await expect(dropdownMenu).toBeVisible()
  })
})
