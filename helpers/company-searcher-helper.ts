import { Page } from '@playwright/test'

/**
 * Closes the "Currently Active" pop-up in the Company Searcher page.
 * @param page - The Playwright Page object.
 */
export async function closeCurrentlyActivePopup(page: Page) {
  try {
    // Selector for the close button or pop-up element
    const popupCloseButton = page.locator(
      'footer.WOQiXubfyGkD9ZjtqjUx:has-text("Skip")'
    )
    const popupVisible = await popupCloseButton.isVisible()

    if (popupVisible) {
      await popupCloseButton.click()
      console.log('Currently Active pop-up closed successfully.')
    } else {
      console.log('Currently Active pop-up is not visible.')
    }
  } catch (error) {
    console.error('Error closing the Currently Active pop-up:', error)
  }
}
