import { Browser, Page, test } from '@playwright/test'
import { userData } from 'utils/test-data/auth/user-data'
import { LoginPage } from 'pages/login-register/login-page'
import { SurveyPage } from 'pages/home/survey-page'
import { HomePage } from 'pages/home/home-page'
import { ProductTourPage } from 'pages/home/product-tour-page'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'

let browser: Browser
let context: BrowserContext
let page: Page
let surveyPage: SurveyPage
let loginPage: LoginPage
let homePage: HomePage
let productTourPage: ProductTourPage
let locale: string

test.describe.parallel('Login Page Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    loginPage = new LoginPage(page, locale)
    surveyPage = new SurveyPage(page, locale)
    homePage = new HomePage(page, locale)
    productTourPage = new ProductTourPage(page, locale)
    await loginPage.goto(baseURL)
  })

  test('Should log in with valid env credentials', async () => {
    const { email, password } = userData.valid
    await loginPage.loginAndValidate(email, password, 200)
    await surveyPage.validateRoleTitleLocatorVisible()
  })

  test.fixme('Should log out when click on the log out button', async () => {
    await surveyPage.completeRoleQuestion('developerOption')
    await surveyPage.completeAppInterestQuestion(['calendar', 'email'])
    await surveyPage.completeOtherToolsQuestion('None')
    await productTourPage.skipProductTour()
    await homePage.logOutFromAccount()
    await loginPage.verifyLoginPageItems()
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

  test.fixme(
    'Should navigate from Forgot Password screen to login screen',
    async () => {
      await loginPage.verifyNavigateBackFromForgotPasswordPage()
    }
  )

  test.fixme('Should navigate to Register screen', async () => {
    await loginPage.verifyNavigateToRegisterPage()
  })

  test.fixme(
    'Should navigate from Register screen to Login screen',
    async () => {
      await loginPage.verifyNavigateBackFromRegisterPage()
    }
  )

  test.fixme('Should navigate to Google account screen', async () => {
    await loginPage.verifyNavigateToGooglePage()
  })

  test.fixme('Should navigate to Microsoft account screen', async () => {
    await loginPage.verifyNavigateToMicrosoftPage()
  })

  test.fixme('Should navigate to Apple account screen', async () => {
    await loginPage.verifyNavigateToApplePage()
  })

  test.fixme('Should navigate to SSO screen', async () => {
    await loginPage.verifyNavigateToSSOPage()
  })

  test('Should be able to check Remember me checkbox', async () => {
    await loginPage.verifyRememberMeClickable()
  })
})
