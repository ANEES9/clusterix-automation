import { Page, TestInfo } from '@playwright/test'
import { ProductTourPage } from 'pages/container-app/product-tour-page'

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
      .waitFor({ state: 'attached', timeout: 5000 })
      .then(() => true)
      .catch(() => false)

    if (!isSkipTourAttached) {
      console.log('Skip tour button is not attached, skipping...')
      return
    }

    // Check if the Skip Tour button is visible
    const isSkipTourVisible = await productTourPage.skipTour.isVisible()
    console.log('Is Skip Tour button visible:', isSkipTourVisible)

    if (isSkipTourVisible) {
      console.log('Skip tour button is visible, clicking it...')
      await productTourPage.skipTour.click()
      console.log('Product tour skipped successfully.')
    } else {
      console.log('Skip tour button is not visible, skipping...')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'Error occurred while skipping the product tour:',
        error.message
      )
    }
  }
}
