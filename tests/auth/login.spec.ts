import { test } from '@playwright/test'
import { LoginPage } from 'pages/auth/login-page'
import { userData } from 'utils/test-data/auth/user-data'
import { SurveyPage } from 'pages/home/survey-page'
import { setupTestContext } from 'utils/test-context'

test.describe('Login Page Tests', () => {
  let surveyPage: SurveyPage
  let loginPage: LoginPage
  let locale: string
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    loginPage = new LoginPage(page, locale)
    surveyPage = new SurveyPage(page, locale)
    await loginPage.goto(baseURL)
  })

  test('Should log in with valid env credentials', async () => {
    const { email, password } = userData.valid
    await loginPage.loginAndValidate(email, password, 200)
    await surveyPage.validateRoleTitleLocatorVisible()
  })

  userData.invalid.emails.forEach((invalidEmail, index) => {
    test(`Should not log in with invalid email [${index + 1}]: ${invalidEmail}`, async () => {
      await loginPage.verifyInvalidEmailLogin(
        invalidEmail,
        userData.valid.password
      )
    })
  })

  userData.invalid.passwords.forEach((invalidPassword, index) => {
    test(`Should not log in with invalid password [${index + 1}]: ${invalidPassword}`, async () => {
      await loginPage.verifyInvalidPasswordLogin(
        userData.valid.email,
        invalidPassword
      )
    })
  })

  test('Should not log in with empty email', async () => {
    await loginPage.verifyEmptyEmailLogin(
      userData.empty.emptyEmail,
      userData.valid.password
    )
  })

  test('Should not log in with empty password', async () => {
    await loginPage.verifyEmptyPasswordLogin(
      userData.valid.email,
      userData.empty.emptyPassword
    )
  })

  test('Should not log in with only one space email', async () => {
    await loginPage.verifyEmptyEmailLogin(
      userData.empty.oneSpaceEmail,
      userData.valid.password
    )
  })

  test('Should not log in with only one space password', async () => {
    await loginPage.verifyEmptyPasswordLogin(
      userData.valid.email,
      userData.empty.oneSpacePassword
    )
  })

  test('Should not log in with only ten space email', async () => {
    await loginPage.verifyEmptyEmailLogin(
      userData.empty.tenSpaceEmail,
      userData.valid.password
    )
  })

  test('Should not log in with only ten space password', async () => {
    await loginPage.verifyEmptyPasswordLogin(
      userData.valid.email,
      userData.empty.tenSpacePassword
    )
  })

  test('Should navigate to forgot password screen', async () => {
    await loginPage.verifyNavigateToForgotPasswordPage()
  })

  test('Should navigate from Forgot Password screen to login screen', async () => {
    await loginPage.verifyNavigateBackFromForgotPasswordPage()
  })

  test('Should navigate to Register screen', async () => {
    await loginPage.verifyNavigateToRegisterPage()
  })

  test('Should navigate from Register screen to Login screen', async () => {
    await loginPage.verifyNavigateBackFromRegisterPage()
  })

  test('Should navigate to Google account screen', async () => {
    await loginPage.verifyNavigateToGooglePage()
  })

  test('Should navigate to Microsoft account screen', async () => {
    await loginPage.verifyNavigateToMicrosoftPage()
  })

  test('Should navigate to Apple account screen', async () => {
    await loginPage.verifyNavigateToApplePage()
  })

  test('Should navigate to SSO screen', async () => {
    await loginPage.verifyNavigateToSSOPage()
  })

  test('Should be able to check Remember me checkbox', async () => {
    await loginPage.verifyRememberMeClickable()
  })
})
