import { test } from '@playwright/test'
import { SurveyPage } from 'pages/container-app/survey-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Survey Tests', () => {
  let surveyPage: SurveyPage

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const { locale } = await setupTestContext(page, testInfo)
    surveyPage = new SurveyPage(page, locale)
    await surveyPage.goto(baseURL)
  })

  test('Complete role question', async () => {
    await surveyPage.completeRoleQuestion('developerOption')
  })
})
