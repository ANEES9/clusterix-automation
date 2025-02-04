import { test } from '@playwright/test'
import { SurveyPage } from 'pages/home/survey-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Survey Tests', () => {
  let surveyPage: SurveyPage

  test.beforeEach(async ({ page }, testInfo) => {
    const { locale } = await setupTestContext(page, testInfo)
    surveyPage = new SurveyPage(page, locale)
  })

  test('Complete role question', async () => {
    await surveyPage.completeRoleQuestion('developerOption')
  })
})
