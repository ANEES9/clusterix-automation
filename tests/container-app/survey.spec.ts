import { test } from '@playwright/test'
import { SurveyPage } from '../../pages/container-app/survey-page'

test.describe('Survey Tests', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const locale = testInfo.project.use.locale || 'en'
    const surveyPage = new SurveyPage(page, locale)
    // Navigate to the login page and set the locale
    await surveyPage.goto(baseURL)
  })

  test('Should log in with invalid credentials', async ({ page }, testInfo) => {
    const locale = testInfo.project.use.locale
    const surveyPage = new SurveyPage(page, locale)
    await surveyPage.completeRoleQuestion('developerOption')
  })
})
