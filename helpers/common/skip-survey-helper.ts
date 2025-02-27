import { Page, TestInfo } from '@playwright/test'
import { SurveyPage } from 'pages/home/survey-page'

export async function skipSurveyHelper(
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
      .waitFor({ state: 'attached', timeout: 1000 })
      .then(() => true)
      .catch(() => false)

    if (!isRoleQuestionAttached) {
      return
    }

    // Check if the survey is visible
    const isSurveyVisible = await surveyPage.roleQuestion.isVisible()

    if (isSurveyVisible) {
      // Complete the survey steps
      await surveyPage.completeRoleQuestion('developerOption')
      await surveyPage.completeAppInterestQuestion(['calendar', 'email'])
      await surveyPage.completeOtherToolsQuestion('None')
    }
  } catch {
    // Silently catch any errors without logging
  }
}
