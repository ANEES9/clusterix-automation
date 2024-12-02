import { test, expect } from '@playwright/test'
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/timer-helper'
import { openNavigationMenu } from '../../helpers/navigation-helper'
import { addCursorStyleAndScript } from '../../helpers/cursor-helper'

test.describe('Clusterix Navigation Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL!)
    await addCursorStyleAndScript(page)
    await closeWelcomePopUp(page)
    await closeTimerPopUp(page)
    await openNavigationMenu(page)
    await page.waitForLoadState('networkidle')
  })
  test('Navigate to Files', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'Files', exact: true })
    await navButton.click()
    await expect(page).toHaveURL(/.*cluster-space/)
  })
  test('Navigate to Office', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'Office', exact: true })
    await navButton.click()
    await expect(page).toHaveURL(/.*cluster-office/)
  })
  test('Navigate to PDF', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'PDF' })
    await navButton.click()
    await expect(page).toHaveURL(/.*cluster-pdf/)
  })
  test('Navigate to HR', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'HR' })
    await navButton.click()
    await expect(page).toHaveURL(/.*hr\/dashboard/)
  })
  test('Navigate to Project Management', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'Project Management' })
    await navButton.click()
    await expect(page).toHaveURL(/.*project-management\/projects\/overview/)
  })
  test('Navigate to Task Management', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'Task Management' })
    await navButton.click()
    await expect(page).toHaveURL(/.*task-management/)
  })
  test('Navigate to Time Tracking', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'Time Tracking' })
    await navButton.click()
    await expect(page).toHaveURL(/.*time-tracking/)
  })
  test('Navigate to Company Searcher', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'Company Searcher' })
    await navButton.click()
    await expect(page).toHaveURL(/.*company-search\/company/)
  })
  test('Navigate to Customers', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'Customers' })
    await navButton.click()
    await expect(page).toHaveURL(/.*customers\/dashboard/)
  })
  test('Navigate to No Code', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'No Code' })
    await navButton.click()
    await expect(page).toHaveURL(/.*no-code\/dashboard\/overview/)
  })
  test('Navigate to Template Manager', async ({ page }) => {
    const navButton = page.getByRole('button', { name: 'Template Manager' })
    await navButton.click()
    await expect(page).toHaveURL(/.*template-manager/)
  })
})
