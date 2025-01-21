import { Page, TestInfo } from '@playwright/test'
import { TutorialPage } from '../../pages/container-app/tutorial-page'

export async function skipTutorial(
  page: Page,
  testInfo: TestInfo
): Promise<void> {
  const locale = testInfo.project?.use.locale || 'en'
  const tutorialPage = new TutorialPage(page, locale)

  try {
    // Check if the tutorial modal is visible
    const isModalVisible = await tutorialPage.modalTitle.isVisible()
    console.log('Tutorial Modal Visible:', isModalVisible)

    if (isModalVisible) {
      console.log('Tutorial modal is visible, attempting to skip...')
      // Debugging close button visibility
      const isCloseIconVisible =
        await tutorialPage.closeTutorialCrossIcon.isVisible()
      console.log('Close Tutorial Icon Visible:', isCloseIconVisible)

      // Ensure close icon is visible and stable
      await tutorialPage.closeTutorialCrossIcon.waitFor({ state: 'visible' })

      // Force click the close icon
      await tutorialPage.closeTutorialCrossIcon.click({ force: true })
      console.log('Tutorial successfully skipped.')
    } else {
      console.log('Tutorial modal is not visible, no action needed.')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        'An error occurred while attempting to skip the tutorial:',
        error.message
      )
    }
  }
}
