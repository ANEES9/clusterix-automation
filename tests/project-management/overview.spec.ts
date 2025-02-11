import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { skipTimerHelper } from 'common/skip-timer-helper'
import { OverviewPage } from 'pages/project-management/projects/overview-page'
import { ProjectOverview } from 'pages/project-management/projects/project-overview-page'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'

test.describe('Project management overview', () => {
  let overviewPage: OverviewPage
  let projectOverview: ProjectOverview
  test.setTimeout(150000)
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    overviewPage = new OverviewPage(page, 'en')
    projectOverview = new ProjectOverview(page, 'en')
    await Allure.step('Navigate to project management overview', async () => {
      await overviewPage.goto(baseURL)
    })

    await Allure.step('Skip survey', async () => {
      await skipSurveyHelper(page, testInfo)
    })

    await Allure.step('Close welcome popup', async () => {
      await skipProductTourHelper(page, testInfo)
    })

    await Allure.step('Close timer popup', async () => {
      await skipTimerHelper(page, testInfo)
    })

    await Allure.step('Add cursor style and script', async () => {
      await addCursorStyleAndScript(page)
    })

    await Allure.step('Wait for network idle', async () => {
      await page.waitForLoadState('networkidle')
    })
  })
  test.setTimeout(180000)

  test('Verify "all filters" functinality in overview', async () => {
    Allure.addDescription(
      'Verifies the functionality of the all projects filter and ensures expected elements are loaded correctly.'
    )
    await Allure.step(
      'Click all projcts filter button and verify the page elements',
      async () => {
        await overviewPage.TableProjectloaded()
        await overviewPage.clickAllTypesFilter()
        await overviewPage.allTypesFilterDropdownListVisible
        await overviewPage.clickFirstDropdownOption()
        await overviewPage.sffHeaderVisible()
        await overviewPage.clickSecondDropdownOption()
        await overviewPage.filteredProjectsHeaderVisible()
      }
    )
  })

  test('Verify all view types in overview', async ({ page }) => {
    Allure.addDescription(
      'Verifies the different view types and ensures expected elements are loaded correctly.'
    )
    await Allure.step(
      'Click view button and verify different view with there page elements',
      async () => {
        await overviewPage.clickViewButton()
        await overviewPage.clickTileViewButton()
        await page.waitForTimeout(1000)
        await overviewPage.tileViewVisible()
        await page.waitForTimeout(1000)
        await overviewPage.clickViewButton()
        await overviewPage.clickKanbanViewButton()
        await overviewPage.kanbanViewVisible()
      }
    )
  })

  test('Verfify the add project button and create project button', async ({
    page,
  }) => {
    Allure.addDescription(
      'Verifies the working of add project button by modal elements and validate that project is created.'
    )
    await Allure.step(
      'Click add project and verify modal elements and create project',
      async () => {
        await overviewPage.clickAddProjectButton()
        await overviewPage.selectProjectTypeVisible()
        await overviewPage.selectProjectTypeAgile()
        await page.waitForTimeout(2000)
        await overviewPage.fillShortTitleInput()
        await overviewPage.fillProjectTitleInput()
        await overviewPage.projectStartDateSelected()
        await overviewPage.projectEndDateSelected()
        await overviewPage.clickCreateProjectButton()
        await page.waitForLoadState('networkidle')
        await page.waitForLoadState('domcontentloaded')
        await page.waitForTimeout(3000)
      }
    )
  })

  test('Validate the title input field for character counts in add projct modal', async ({
    page,
  }) => {
    Allure.addDescription(
      'Verifies the character count of the short title and project title input fields for add project modal.'
    )
    await Allure.step(
      'Validate the character count of the short title and project title input fields',
      async () => {
        await overviewPage.clickAddProjectButton()
        await page.waitForTimeout(2000)
        await overviewPage.fillShortTitleInputCharaterCount()
        await overviewPage.fillProjectTitleInputCharaterCount()
      }
    )
  })

  test('Validate the navigation to selected project overview through cicking on search icon and edit the project details', async ({
    page,
  }) => {
    Allure.addDescription(
      'Verifies the navigation to project overview and edit the project details.'
    )
    await Allure.step(
      'Validate the working of search icon that navigation to project overview and validate the changes',
      async () => {
        await page.waitForTimeout(3000)
        await overviewPage.searchIconForProjectVisible()
        await projectOverview.projectOverviewMainVisible()
        await projectOverview.clickEditButton()
        await projectOverview.editBasicDataOfForm()
        await projectOverview.validateUpdatedDetails()
      }
    )
  })

  test('Validate the hide project functionality', async ({ page }) => {
    Allure.addDescription('Verifies that project is hidden succssesfully.')
    await Allure.step(
      'Validate the working of hide project button and its function',
      async () => {
        await overviewPage.searchIconForProjectVisible()
        await projectOverview.projectOverviewMainVisible()
        await projectOverview.clickHideProject()
        await page.waitForTimeout(3000)
        await projectOverview.validateHideProject()
      }
    )
  })

  test('Validate the hidden filter functionality in overview', async ({
    page,
  }) => {
    Allure.addDescription('Verifies that project is hidden succssesfully.')
    await Allure.step(
      'Validate the working of hidden filter and its function',
      async () => {
        await overviewPage.clickFilterInOverview()
        await overviewPage.validateHiddenFilter()
      }
    )
  })

  test('Validate the reveal project functionality', async ({ page }) => {
    Allure.addDescription('Verifies that project is revealed succssesfully.')
    await Allure.step(
      'Validate the working of reveal project button and its function',
      async () => {
        await overviewPage.clickFilterInOverview()
        await overviewPage.validateHiddenFilter()
        await overviewPage.searchIconForProjectVisible()
        await projectOverview.projectOverviewMainVisible()
        await projectOverview.clickRevealProject()
        await page.waitForLoadState('networkidle')
        await projectOverview.validateRevealProject()
      }
    )
  })

  test('Validate the deletion of project', async ({ page }) => {
    Allure.addDescription('Verifies that project is deleted succssesfully.')
    await Allure.step('Validate the deletion of project', async () => {
      await page.waitForTimeout(3000)
      await overviewPage.searchIconForProjectVisible()
      await projectOverview.projectOverviewMainVisible()
      await projectOverview.validateDeleteProject()
    })
  })

  test('Verify the navigation to personnel allocation page when clicked on arrow icon', async ({
    page,
  }) => {
    const projectOverview = new ProjectOverview(page, 'en')

    Allure.addDescription(
      'Verifies that when clicked on the allocate employee arrow icon, it is navigating to the new page that is personnel allocation'
    )
    await Allure.step(
      'Click on the arrow icon and verify the page elements',
      async () => {
        await overviewPage.searchIconForProjectVisible()
        const newPage = await projectOverview.navigateToProjectPlan()
        await projectOverview.verifyHeadingInNewPage(newPage!)
      }
    )
  })
})
