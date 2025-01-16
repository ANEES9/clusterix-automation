import { test } from '@playwright/test'
import { LoginPage } from 'pages/auth/login-page'
import * as process from 'node:process'

test.describe('Login Page Tests', () => {
  const baseURL = process.env.CLUSTERIX_BASE_URL || ''

  test.beforeEach(async ({ page }, testInfo) => {
    const locale = testInfo.project.use.locale || 'en'
    const loginPage = new LoginPage(page, locale)

    // Navigate to the login page and set the locale
    await loginPage.navigateToLogin(baseURL)
    await loginPage.setLocale(locale)
  })

  test('Should log in with valid credentials', async ({ page }, testInfo) => {
    const locale = testInfo.project.use.locale
    const loginPage = new LoginPage(page, locale)
    const email = process.env.CLUSTERIX_EMAIL || ''
    const password = process.env.CLUSTERIX_PASSWORD || ''

    // Perform login
    await loginPage.login(email, password)
  })
})
