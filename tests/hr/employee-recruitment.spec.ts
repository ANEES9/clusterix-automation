import { Browser, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { openPositionTable } from 'shared/utils/test-data/hr/open-position-data'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { EmployeeManagementPage } from 'pages/hr/employee-management.page'
import { EmployeeRecruitmentPage } from '../../pages/hr/employee-recruitment.page'

let browser: Browser
let context: BrowserContext
let page: Page
let employeeManagementPage: EmployeeManagementPage
let employeeRecruitmentPage: EmployeeRecruitmentPage
let locale: string
let createdEmployee: { firstName: string; lastName: string } | null = null

test.describe('HR > Employee Recruitment Test', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    test.setTimeout(300000)
    browser = testBrowser
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    employeeRecruitmentPage = new EmployeeRecruitmentPage(page, locale)
    await employeeRecruitmentPage.goto(baseURL!)
    await page.waitForLoadState('networkidle')
  })

  test('Verify Open Positions landing @smoke', async () => {
    //test.setTimeout(300000)
    Allure.addDescription('Verify Open Positions sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyOpenPositionsPageLoads()
    })
  })

  test('Verify LinkedIn Search landing @smoke', async () => {
    Allure.addDescription('Verify LinkedIn Search sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to LinkedIn Search', async () => {
      await employeeRecruitmentPage.navigateToLinkedInSearch()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyLinkedInSearchPageLoads()
    })
  })

  test('Verify Lusha Search landing @smoke', async () => {
    Allure.addDescription('Verify Lusha Search sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Lusha Search', async () => {
      await employeeRecruitmentPage.navigateToLushaSearch()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyLushaSearchPageLoads()
    })
  })

  test('Verify Candidate List landing @smoke', async () => {
    Allure.addDescription('Verify Candidate List sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Candidate List', async () => {
      await employeeRecruitmentPage.navigateToCandidateList()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeRecruitmentPage.verifyCandidateListPageLoads()
    })
  })

  test.afterAll(async () => {
    await context.close()
  })

  /*
  test('Navigate to Employee Recruitment & Search for an Any Open Position', async ({ }) => {
    Allure.addDescription(
      'Navigate to Employee Recruitment & Search for an Any Open Position.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Navigate to Employee Recruitment & Search for an Any Open Position',
      async () => {
        await employeeRecruitmentPage.searchAndVerifyOpenPosition(
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
        await employeeRecruitmentPage.verifyArchivingOpenPosition()
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
        await employeeRecruitmentPage.applyArchivefilter()
      }
    )

    await Allure.step(
      'Step 2: Verify archived items',
      async () => {
        await employeeRecruitmentPage.verifyOpenPositionTable()
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
        //await employeeRecruitmentPage.applyArchivefilter()
        await employeeRecruitmentPage.applyUnArchivefilter()
      }
    )

    await Allure.step(
      'Step 2: Verify archived items',
      async () => {
        await employeeRecruitmentPage.verifyOpenPositionTable()
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
        await employeeRecruitmentPage.verifyArchivingOpenPosition()
      }
    )

    await Allure.step(
      'Step 2: apply Archive filter',
      async () => {
        await employeeRecruitmentPage.applyArchivefilter()
      }
    )

    await Allure.step(
      'Step 3: Unarchive an open position',
      async () => {
        await employeeRecruitmentPage.verifyUnarchivingOpenPosition()
        await employeeRecruitmentPage.resetAllFilters()
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
        await employeeRecruitmentPage.openPositionDetailsPage()
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
        await employeeRecruitmentPage.verifyEditOpenPosition()
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
        await employeeRecruitmentPage.verifySorting("startDate")
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
        await employeeRecruitmentPage.verifySorting("contract")
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
        await employeeRecruitmentPage.verifySorting("location")
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
        await employeeRecruitmentPage.verifySorting("vacancy")
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
        await employeeRecruitmentPage.verifySorting("candidate")
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
        await employeeRecruitmentPage.verifySorting("listactivity")
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
        await employeeRecruitmentPage.verifyTableItems()
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
        await employeeRecruitmentPage.verifyJobTitle()
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
        await employeeRecruitmentPage.verifyfilterPersistence()
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
        await employeeRecruitmentPage.openLinkedInSearch()
      }
    )
    await Allure.step(
      'Step 2: provide all details & search for any role',
      async () => {
        await employeeRecruitmentPage.searchForAnyRole()
      }
    )
    await Allure.step(
      'Step 3:add candidate from the search',
      async () => {
        await employeeRecruitmentPage.addCandidateFromLinkedInSearch()
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
        await employeeRecruitmentPage.openLinkedInSearch()
        await employeeRecruitmentPage.searchForAnyRole()
      }
    )

    await Allure.step(
      'Step 1: Add candidates',
      async () => {
        await employeeRecruitmentPage.addCandidateFromLinkedInSearchProfile()
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

        await employeeRecruitmentPage.verifyLinkedCandidateProfile()
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
        await employeeRecruitmentPage.stopLinkedInSearch()
      }
    )
  })*/
})
