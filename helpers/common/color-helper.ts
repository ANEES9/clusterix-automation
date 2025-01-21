import { Page } from '@playwright/test'

export async function listAllColors(page: Page) {
  // Locator for color elements
  const colorElements = page.locator('span[class*="ColorItem-module_color"]')

  // Get all colors from the 'style' attribute
  const colors = await colorElements.evaluateAll((elements) =>
    elements.map((el) => el.getAttribute('style'))
  )

  // Filter to get only the `background-color` values
  const backgroundColors = colors
    .map((style) => {
      const match = style?.match(/background-color: (rgb\([\d, ]+\))/)
      return match ? match[1] : null
    })
    .filter(Boolean) // Remove null values

  console.log('Available Colors:', backgroundColors)

  // Return the colors for further use
  return backgroundColors
}
