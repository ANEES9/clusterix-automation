import { Page } from '@playwright/test'
import { error } from 'console'

/**
 * Closes the "Currently Active" pop-up in the Company Searcher page.
 * @param page - The Playwright Page object.
 */
export async function closeCurrentlyActivePopup(page: Page) {
  try {
    // Selector for the close button or pop-up element
    await page.waitForSelector('.styles-module_headerCloseButton__x2ELS', {
      timeout: 3000,
    })
    const popupCloseButton = page.locator(
      '.styles-module_headerCloseButton__x2ELS'
    )

    const popupVisible = await popupCloseButton.isVisible()

    if (popupVisible) {
      await popupCloseButton.click()
    } else {
      console.error('Close button is not visible.')
    }
  } catch (error) {
    console.error('Error closing the pop-up:', error)
  }
}
