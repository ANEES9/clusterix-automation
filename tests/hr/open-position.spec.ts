import { Browser, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { VacationAbsenceDaysPage } from 'pages/my-profile/vacation-absence-days.page'
import { openPositionTable } from 'shared/utils/test-data/hr/open-position-data'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { EmployeeManagementPage } from 'pages/hr/employee-management.page'
import { OpenPositionsPage } from '../../pages/hr/open-position.page'


let browser: Browser
let context: BrowserContext
let page: Page
let employeeManagementPage: EmployeeManagementPage
let openPositionPage: OpenPositionsPage
let locale: string
let createdEmployee: { firstName: string; lastName: string } | null = null


test.describe('HR > Open Position Test', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    openPositionPage = new OpenPositionsPage(page, locale)
    await openPositionPage.goto(baseURL!)
    await page.waitForLoadState('networkidle')
  })

  test('Navigate to Employee Recruitment & Search for an Any Open Position', async ({ }) => {
    Allure.addDescription(
      'Navigate to Employee Recruitment & Search for an Any Open Position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Navigate to Employee Recruitment & Search for an Any Open Position',
      async () => {
        await openPositionPage.searchAndVerifyOpenPosition(
          openPositionTable.openPosition
        )
      }
    )
  })

  test('Archive Open Position', async ({ }) => {
    Allure.addDescription(
      'Archive Open Position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Archive Open Position',
      async () => {
        await openPositionPage.verifyArchivingOpenPosition()
      }
    )
  })

  test('Apply Archive filter and verify the items', async ({ }) => {
    Allure.addDescription(
      'Archive Open Position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Apply unarchive Filter',
      async () => {
        await openPositionPage.applyArchivefilter()
      }
    )

    await Allure.step(
      'Step 2: Verify archived items',
      async () => {
        await openPositionPage.verifyOpenPositionTable()
      }
    )
  })

  test('Apply UnArchive filter and verify the items', async ({ }) => {
    Allure.addDescription(
      'Archive Open Position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Apply unarchive Filter',
      async () => {
        //await openPositionPage.applyArchivefilter()
        await openPositionPage.applyUnArchivefilter()
      }
    )

    await Allure.step(
      'Step 2: Verify archived items',
      async () => {
        await openPositionPage.verifyOpenPositionTable()
      }
    )
  })

  test('Verify Un-Archiving an Open Position', async ({ }) => {
    Allure.addDescription(
      'Archive Open Position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Archive an Open Position',
      async () => {
        await openPositionPage.verifyArchivingOpenPosition()
      }
    )

    await Allure.step(
      'Step 2: apply Archive filter',
      async () => {
        await openPositionPage.applyArchivefilter()
      }
    )

    await Allure.step(
      'Step 3: Unarchive an open position',
      async () => {
        await openPositionPage.verifyUnarchivingOpenPosition()
        await openPositionPage.resetAllFilters()
      }
    )
  })

  test('Verify openPositionDetailsPage', async ({ }) => {
    Allure.addDescription(
      'Verify openPositionDetailsPage.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify openPositionDetailsPage',
      async () => {
        await openPositionPage.openPositionDetailsPage()
      }
    )
  })

  test('Verify editing of open position', async ({ }) => {
    Allure.addDescription(
      'Verify editing of open position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: editing of open position',
      async () => {
        await openPositionPage.verifyEditOpenPosition()
      }
    )
  })

  test('Verify Sorting of Start date Column ', async ({ }) => {
    Allure.addDescription(
      'Verify Sorting of Start date Column.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify Sorting of Start date Column',
      async () => {
        await openPositionPage.verifySorting("startDate")
      }
    )
  })

  test('Verify Sorting of Contract Column ', async ({ }) => {
    Allure.addDescription(
      'Verify Sorting of Contract Column.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify Sorting of Contract Column',
      async () => {
        await openPositionPage.verifySorting("contract")
      }
    )
  })

  test('Verify Sorting of Location Column', async ({ }) => {
    Allure.addDescription(
      'Verify Sorting of Location Column.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify Sorting of Location Column',
      async () => {
        await openPositionPage.verifySorting("location")
      }
    )
  })

  test('Verify Sorting of Vacancy Column ', async ({ }) => {
    Allure.addDescription(
      'Verify Sorting of Vacancy Column .'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify Sorting of Vacancy Column',
      async () => {
        await openPositionPage.verifySorting("vacancy")
      }
    )
  })

  test('Verify Sorting of candidate Column ', async ({ }) => {
    Allure.addDescription(
      'Verify Sorting of candidate Column .'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify Sorting of candidate Column',
      async () => {
        await openPositionPage.verifySorting("candidate")
      }
    )
  })

  test('Verify Sorting of listactivity Column ', async ({ }) => {
    Allure.addDescription(
      'Verify Sorting of listactivity Column .'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify Sorting of listactivity Column',
      async () => {
        await openPositionPage.verifySorting("listactivity")
      }
    )
  })


  test('Verify Table Items', async ({ }) => {
    Allure.addDescription(
      'Verify Table Items.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify Table Items',
      async () => {
        await openPositionPage.verifyTableItems()
      }
    )
  })

  test('Verify Job Title', async ({ }) => {
    Allure.addDescription(
      'Verify Job Title.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Verify Job Title',
      async () => {
        await openPositionPage.verifyJobTitle()
      }
    )
  })

  test('Verify Persistanse of Open Position filter', async ({ }) => {
    Allure.addDescription(
      'Verify Open osition filter persistence.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1:Verify Open osition filter persistence',
      async () => {
        await openPositionPage.verifyfilterPersistence()
      }
    )
  })

  test('add candidate from LinkedIn Search', async ({ }) => {
    Allure.addDescription(
      'Archive Open Position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: click on LinkedIn search button',
      async () => {
        await openPositionPage.openLinkedInSearch()
      }
    )
    await Allure.step(
      'Step 2: provide all details & search for any role',
      async () => {
        await openPositionPage.searchForAnyRole()
      }
    )
    await Allure.step(
      'Step 3:add candidate from the search',
      async () => {
        await openPositionPage.addCandidateFromLinkedInSearch()
      }
    )
  })

  test('add candidate from LinkedIn Profile Search', async ({ }) => {
    Allure.addDescription(
      'add candidate from LinkedIn Profile Search.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: goto linkedIn search and click on any cadidate profile',
      async () => {
        await openPositionPage.openLinkedInSearch()
        await openPositionPage.searchForAnyRole()
      }
    )

    await Allure.step(
      'Step 1: Add candidates',
      async () => {
        await openPositionPage.addCandidateFromLinkedInSearchProfile()
      }
    )
  })

  test('Verify LinkedIn Candidate Profile page', async ({ }) => {
    Allure.addDescription(
      'Verify LinkedIn Candidate Profile.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: goto linkedIn Candidate Profile page',
      async () => {

        await openPositionPage.verifyLinkedCandidateProfile()
      }
    )
  })

  test('Verify Linked stop search functionalities', async ({ }) => {
    Allure.addDescription(
      'Archive Open Position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: stop linked serach',
      async () => {
        await openPositionPage.stopLinkedInSearch()
      }
    )
  })

})


