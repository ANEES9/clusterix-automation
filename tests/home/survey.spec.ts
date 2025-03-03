import { Browser, expect, Page, test } from '@playwright/test'
import { SurveyPage } from 'pages/home/survey-page'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { Allure } from 'common/allure-helper'

let browser: Browser
let context: BrowserContext
let page: Page
let surveyPage: SurveyPage
let locale: string

test.describe.parallel('Survey Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    surveyPage = new SurveyPage(page, locale)
    await surveyPage.goto(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })

  test("Should select the 'CEO / CFO / COO' role", async () => {
    await Allure.step("Selecting the role 'CEO / CFO / COO'", async () => {
      await surveyPage.selectRole('ceoOption')
    })
  })

  test("Should select the 'Director / Manager' role", async () => {
    await Allure.step("Selecting the role 'Director / Manager'", async () => {
      await surveyPage.selectRole('directorOption')
    })
  })

  test("Should select the 'Developer / Designer' role", async () => {
    await Allure.step("Selecting the role 'Developer / Designer'", async () => {
      await surveyPage.selectRole('developerOption')
    })
  })

  test("Should select the 'Human Resources' role", async () => {
    await Allure.step("Selecting the role 'Human Resources'", async () => {
      await surveyPage.selectRole('hrOption')
    })
  })

  test("Should select the 'Sales Marketing' role", async () => {
    await Allure.step("Selecting the role 'Sales Marketing'", async () => {
      await surveyPage.selectRole('salesOption')
    })
  })

  test("Should select 'Other' role and enter input", async () => {
    await Allure.step(
      "Selecting 'Other' role and entering custom input",
      async () => {
        await surveyPage.selectRole('otherOption', 'QA Engineer')
      }
    )
  })

  test('Should click Next button and navigate to App Interests', async () => {
    await Allure.step(
      'Clicking Next button and verifying navigation',
      async () => {
        await surveyPage.clickNext()
      }
    )
  })

  test("Should select 'Calendar' app", async () => {
    await Allure.step("Selecting 'Calendar' apps", async () => {
      await surveyPage.selectApps(['calendar'])
    })
  })

  test("Should select 'Email' app", async () => {
    await Allure.step("Selecting 'Email' apps", async () => {
      await surveyPage.selectApps(['email'])
    })
  })

  test("Should select 'Live Chat' app", async () => {
    await Allure.step("Selecting 'Live Chat' apps", async () => {
      await surveyPage.selectApps(['liveChat'])
    })
  })

  test("Should select 'Files' app", async () => {
    await Allure.step("Selecting 'Files' apps", async () => {
      await surveyPage.selectApps(['files'])
    })
  })

  test("Should select 'Office' app", async () => {
    await Allure.step("Selecting 'Office' apps", async () => {
      await surveyPage.selectApps(['office'])
    })
  })

  test("Should select 'Task Management' app", async () => {
    await Allure.step("Selecting 'Task Management' apps", async () => {
      await surveyPage.selectApps(['taskManagement'])
    })
  })

  test("Should select 'Time Tracking' app", async () => {
    await Allure.step("Selecting 'Time Tracking' apps", async () => {
      await surveyPage.selectApps(['timeTracking'])
    })
  })

  test("Should select 'Customers' app", async () => {
    await Allure.step("Selecting 'Customers' apps", async () => {
      await surveyPage.selectApps(['customers'])
    })
  })

  test("Should select 'Company Searcher' app", async () => {
    await Allure.step("Selecting 'Company Searcher' apps", async () => {
      await surveyPage.selectApps(['companySearcher'])
    })
  })

  test('Should click Next button and navigate to Other Tools', async () => {
    await Allure.step(
      'Clicking Next button and verifying navigation',
      async () => {
        await surveyPage.clickNext()
      }
    )
  })

  test('Should validate the "Other Tools" section', async () => {
    await Allure.step('Validating the "Other Tools" section', async () => {
      await expect(surveyPage.otherToolsQuestion).toBeVisible()
    })
  })

  test("Should add 'Jira, Trello' to the other tools section", async () => {
    await Allure.step("Adding 'Jira, Trello' as other tools", async () => {
      await surveyPage.enterOtherTools('Jira, Trello')
    })
  })

  test('Should click Back button twice and return to Role Selections', async () => {
    await Allure.step(
      'Clicking Back button twice to return to App Interests',
      async () => {
        await surveyPage.clickBack()
        await surveyPage.validateAppInterestsTitleVisible()
        await surveyPage.clickBack()
        await surveyPage.validateRoleTitleLocatorVisible()
      }
    )
  })

  test('Should click Next button twice and return to Other Tools', async () => {
    await Allure.step(
      'Clicking Next button twice to return to Other Tools',
      async () => {
        await surveyPage.clickNext()
        await surveyPage.validateAppInterestsTitleVisible()
        await surveyPage.clickNext()
        await surveyPage.validateOtherToolsTitleVisible()
      }
    )
  })

  test('Should click Complete button and finish the survey', async () => {
    await Allure.step(
      'Clicking Complete button to finalize the survey',
      async () => {
        await surveyPage.clickComplete()
      }
    )
  })
})
