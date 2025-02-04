import { Page, TestInfo } from '@playwright/test'
import { TutorialPage } from 'pages/home/tutorial-page'

export async function skipTutorialHelper(
  page: Page,
  testInfo: TestInfo
): Promise<void> {
  const locale = testInfo.project?.use.locale || 'en'
  const tutorialPage = new TutorialPage(page, locale)

  try {
    // Check if the tutorial modal is visible
    await tutorialPage.getStartedButton.waitFor({
      state: 'visible',
      timeout: 3000,
    })

    const isModalVisible = await tutorialPage.modalTitle.isVisible()

    if (isModalVisible) {
      // Ensure close icon is visible and stable
      await tutorialPage.closeTutorialCrossIcon.waitFor({ state: 'visible' })

      // Force click the close icon
      await tutorialPage.closeTutorialCrossIcon.click({ force: true })
    }
  } catch {
    // Silently catch errors to prevent logging in test output
  }
}
