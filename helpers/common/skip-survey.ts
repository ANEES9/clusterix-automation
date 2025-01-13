import { Page } from '@playwright/test'
import { SurveyPage } from '../../pages/container/survey-page'

export async function skipSurvey(page: Page): Promise<void> {
  const surveyPage = new SurveyPage(page)

  try {
    // 1. Role selection
    await surveyPage.completeRoleQuestion('developerOption')

    // 2. App interest selection (selecting first 3 options as an example)
    await surveyPage.completeAppInterestQuestion([
      'calendar',
      'email',
      'liveChat',
    ])

    // 3. Other tools
    await surveyPage.completeOtherToolsQuestion('None')
  } catch (error: unknown) {
    // If survey is already completed
    if (error instanceof Error) {
      console.log(
        'Survey might be already completed or not visible:',
        error.message
      )
    }
  }
}

export async function skipSurveyWithDom(page: Page): Promise<void> {
  try {
    await page.evaluate(() => {
      localStorage.setItem('survey_completed', 'true')
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error while skipping survey:', error.message)
    }
  }
}
