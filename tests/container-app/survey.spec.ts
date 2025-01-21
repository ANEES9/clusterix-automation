import { test } from '@playwright/test'
import { SurveyPage } from 'pages/container-app/survey-page'

test.describe('Survey Tests', () => {
  let surveyPage: SurveyPage

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const locale = testInfo.project.use.locale || 'en'
    surveyPage = new SurveyPage(page, locale)
    // Navigate to the login page and set the locale
    await surveyPage.goto(baseURL)
  })

  test('Complete role question', async () => {
    await surveyPage.completeRoleQuestion('developerOption')
  })
})
