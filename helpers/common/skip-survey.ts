import { Page, TestInfo } from '@playwright/test'
import { SurveyPage } from '../../pages/container-app/survey-page'

export async function skipSurvey(
  page: Page,
  testInfo: TestInfo
): Promise<void> {
  const locale = testInfo.project?.use.locale || 'en'
  const surveyPage = new SurveyPage(page, locale)

  try {
    // Ensure page is fully loaded
    await page.waitForLoadState('domcontentloaded')

    // Check if the role question is attached to the DOM
    const isRoleQuestionAttached = await surveyPage.roleQuestion
      .waitFor({ state: 'attached', timeout: 10000 })
      .then(() => true)
      .catch(() => false)

    if (!isRoleQuestionAttached) {
      console.log('Survey role question is not attached, skipping...')
      return
    }

    // Check if the survey is visible
    const isSurveyVisible = await surveyPage.roleQuestion.isVisible()
    console.log('Is survey visible:', isSurveyVisible)

    if (isSurveyVisible) {
      console.log('Survey is visible, proceeding with completion...')

      // Complete the survey steps
      await surveyPage.completeRoleQuestion('developerOption')
      await surveyPage.completeAppInterestQuestion(['calendar', 'email'])
      await surveyPage.completeOtherToolsQuestion('None')

      console.log('Survey completed successfully.')
    } else {
      console.log('Survey is not visible, skipping...')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred while skipping the survey:', error.message)
    }
  }
}
