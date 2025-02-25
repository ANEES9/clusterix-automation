import { expect, Page } from '@playwright/test'

/**
 * Collapses the sidebar on the page.
 * @param page - The Playwright Page object.
 */
export async function collapseSidebar(page: Page) {
  try {
    // Selector for the collapse button
    const collapseButton = page.locator('button._collapseButton_1gqqn_481')

    const buttonVisible = await collapseButton.isVisible()

    if (buttonVisible) {
      await collapseButton.click()
    } else {
      console.error('Collapse button is not visible.')
    }
  } catch (error) {
    console.error('Error collapsing the sidebar:', error)
  }
}
