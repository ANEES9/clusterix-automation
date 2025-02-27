import { Page, TestInfo } from '@playwright/test'
import { ProductTourPage } from 'pages/home/product-tour-page'

export async function skipProductTourHelper(
  page: Page,
  testInfo: TestInfo
): Promise<void> {
  const locale = testInfo.project?.use.locale || 'en'
  const productTourPage = new ProductTourPage(page, locale)

  try {
    // Ensure page is fully loaded
    await page.waitForLoadState('domcontentloaded')

    // Check if the Skip Tour button is attached to the DOM
    const isSkipTourAttached = await productTourPage.skipTour
      .waitFor({ state: 'attached', timeout: 1000 })
      .then(() => true)
      .catch(() => false)

    if (!isSkipTourAttached) {
      return
    }

    // Check if the Skip Tour button is visible
    const isSkipTourVisible = await productTourPage.skipTour.isVisible()

    if (isSkipTourVisible) {
      await productTourPage.skipProductTour()
    }
  } catch {
    // Silently catch any errors without logging
  }
}
