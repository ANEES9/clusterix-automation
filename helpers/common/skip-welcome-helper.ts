import { Page, TestInfo } from '@playwright/test'
import { getTranslations } from './get-translations-helper'

export async function skipWelcomeHelper(
  page: Page,
  testInfo: TestInfo
): Promise<void> {
  try {
    // Wait for the loading spinner screen to disappear first
    const loadingText = page.getByText(
      /The page is currently loading|Die Seite wird gerade geladen/i
    )
    await loadingText
      .waitFor({ state: 'hidden', timeout: 15000 })
      .catch(() => {})

    const locale = testInfo.project?.use.locale || 'en'
    const translations = getTranslations('hr', locale)

    const goStraightText =
      translations.additional.goStraightToWorkspace ||
      'Go straight to my workspace'
    const readyButtonText = translations.additional.ready || 'Ready ✓'

    // 1. Check if "Go straight to my workspace" or localized text is visible and click it
    const goStraightLink = page.getByText(goStraightText)

    const isGoStraightAttached = await goStraightLink
      .waitFor({ state: 'attached', timeout: 3000 })
      .then(() => true)
      .catch(() => false)

    if (isGoStraightAttached && (await goStraightLink.isVisible())) {
      await goStraightLink.click()
    }

    // 2. Check if the "Ready" or "Bereit" button is visible and click it
    // Using a case-insensitive regex to match "Ready" or "Bereit" (with or without checkmarks)
    const readyButton = page.getByRole('button', { name: /Ready|Bereit/i })

    const isReadyVisible = await readyButton
      .waitFor({ state: 'visible', timeout: 3000 })
      .then(() => true)
      .catch(() => false)

    if (isReadyVisible) {
      await readyButton.click()
    }
  } catch (e) {
    // Silently catch any errors to prevent test pollution
  }
}
