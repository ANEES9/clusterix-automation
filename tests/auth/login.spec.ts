import { test, expect } from '@playwright/test'
import { LoginPage } from 'pages/auth/login-page'
import * as process from 'node:process'

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const locale: string = testInfo.project.use?.locale ?? 'en'
    //const locale = testInfo.project.use.locale || 'en'
    const loginPage = new LoginPage(page, locale)

    // Navigate to the login page and set the locale
    await loginPage.goto(baseURL)
  })

  test('Should log in with valid credentials', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    const email = process.env.CLUSTERIX_EMAIL || ''
    const password = process.env.CLUSTERIX_PASSWORD || ''
    await loginPage.login(email, password)
  })

  test('Should log in with valid login credentials', async ({ page }, testInfo) => {
    // const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    const email = process.env.CLUSTERIX_EMAIL || ''
    const password = process.env.CLUSTERIX_PASSWORD || ''
    const profilename=process.env.PROFILE_NAME || ''
    await loginPage.verifyValidLogin(email, password, profilename, testInfo)

  })

  test('Should not log in with invalid login credentials', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    const email = process.env.CLUSTERIX_EMAIL || ''
    const password = process.env.INVALID_CLUSTERIX_PASSWORD || ''
    await loginPage.verifyInvalidlogin(email, password)

  })

  test('Should get error for invalid email address', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
   const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    const email = process.env.INVALID_CLUSTERIX_EMAIL || ''
    const password = process.env.CLUSTERIX_PASSWORD || ''
    await loginPage.verifyInvalidEmaillogin(email, password)
  })

  test('Should not log in with no credentials', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNoCredlogin()
  })

  test('Should navigate to forgot password screen', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNavigateToForgotPasswordPage()
  })

  test('Should navigate from Forgot Password screen to login screen', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNavigateBackFromForgotPasswordPage()
  })

  test('Should navigate to Register screen', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNavigateToRegisterPage()
  })

  test('Should navigate from Register screen to Login screen', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNavigateBackFromRegisterPage()
  })

  test('Should navigate to Google account screen', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNavigateToGooglePage()
  })

  test('Should navigate to Microsoft account screen', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNavigateToMicrosoftPage()
  })

  test('Should navigate to Apple account screen', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNavigateToApplePage()
  })

  test('Should navigate to SSO screen', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyNavigateToSSOPage()
  })

  test('Should be able to check Remember me checkbox', async ({ page }, testInfo) => {
    //const locale = testInfo.project.use.locale
    const locale: string = testInfo.project.use?.locale ?? 'en'
    const loginPage = new LoginPage(page, locale)
    await loginPage.verifyRememberMeClickable()
  })


})

