import { Browser, Page, test, TestInfo} from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { BrowserContext } from 'playwright'
import { setupTestContext } from 'utils/test-context'
import { OverviewPage } from 'pages/project-management/projects/overview-page'
import { ProjectOverview } from 'pages/project-management/projects/project-overview-page'
import { ResourceAllocation } from 'pages/project-management/projects/resource-allocation-page'

  let browser: Browser
  let context: BrowserContext
  let page: Page
  let overviewPage: OverviewPage
  let projectOverview: ProjectOverview
  let resourceAllocation: ResourceAllocation
  let locale: string
  
  test.describe('Project management overview', () => {
    test.beforeAll(
      async ({ browser: testBrowser, baseURL }, testInfo: TestInfo) => {
        test.setTimeout(60000)
        browser = testBrowser
        context = await browser.newContext()
        page = await context.newPage()
  
        Allure.addAppOwner('Project Management')
        Allure.addSeverity('normal')
        Allure.addTag('smoke')
  
        const testContext = await setupTestContext(page, testInfo)
        locale = testContext.locale
        overviewPage = new OverviewPage(page, locale)
        projectOverview = new ProjectOverview(page, locale)
        resourceAllocation = new ResourceAllocation(page, locale)
        await page.waitForTimeout(5000)
        await resourceAllocation.goto(baseURL)
        await page.waitForLoadState('networkidle')
      }
    )


test('Verify "all project" filter functinality in personnel allocation', async () => {
  Allure.addSeverity('normal')
  Allure.addDescription(
    'Verifies the functionality of the all projects filter and ensures expected elements are loaded correctly.'
)
  await Allure.step(
    'Click all projcts filter button and verify the page elements',
    async () => {
      await resourceAllocation.clcikAllProjectsFilter()
      await resourceAllocation.validateAllProjectsFilter()

    }                                                
  )
})

test('Verify that the first employee is assigned to the project in personnel allocation', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifies the functionality of assign to project button and ensures that employee is assigned after click.'
)
  await Allure.step(
    'Click assign to proejct button and validate that it is assigned',
    async () => {
      await resourceAllocation.assignEmployeeToProject()
    }                                                
  )
})


test('Verify that the second employee is assigned & then deassigned from the project in personnel allocation', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifies the functionality of deassigning employee from project and ensures that employee is deassigned.'
)
  await Allure.step(
    'Click remove button and validate that employee is removed from the project',
    async () => {
      await resourceAllocation.deassignFirstEmployeeFromProject()
    }                                                
  )
})     

test('Verify  the search for employee filter in personnel allocation', async () => {
  Allure.addSeverity('normal')
  Allure.addDescription(
    'Verifies the functionality of search for employee filter in personnel allocation'
)
  await Allure.step(
    'Click the search for employee filter and fill the letter and check the name displayed have that letter in it or not',
    async () => {
      await resourceAllocation.searchForEmployeeFilterValidation()
      
    }                                                
  )
})    

test('Verify the navigation to contractor allocation page and the page is loaded', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifying the working of contractor allocation button and page is loaded'
)
  await Allure.step(
    'Click the contractor allocation navigation button and validate that page is properly navigated & loaded ',
    async () => {
      await resourceAllocation.expandSidebarContent()
      await resourceAllocation.validateSidebarContent()
      await resourceAllocation.clickContractorAllocation()
      await resourceAllocation.closeExpandSidebar()
      await resourceAllocation.validateContractorAllocationPage()
      
    }                                                
  )
}) 

test('Verify the new contractor button and validate the new contractor modal opens', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifying the working of new contractor button and new contractor modal opens'
)
  await Allure.step(
    'Click the new contractor allocation button and validate that new contractor modal opens',
    async () => {
      await resourceAllocation.clickNewContractorButton()
      await resourceAllocation.validateNewContractorModalAppears()
      }                                                
  )
}) 

test('Validating each filed of new contractor modal and add new contractor', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifying the each field of new contractor modal and add new contractor and validate new contractor added'
)
  await Allure.step(
    'Fill the each field of new contractor modal and add new contractor and validate new contractor added',
    async () => {
      await resourceAllocation.fillContractorName()
      await resourceAllocation.chooseContractorCountry()
      await resourceAllocation.chooseContractorBusineesForm()
      await resourceAllocation.fillContractorTaxNumber()
      await resourceAllocation.clickAddContractor()
      await resourceAllocation.validateNewContractorAdded()
      }                                                
  )
}) 


test('Click on edit button of an added contractor and edit the contractor details', async () => {
  Allure.addSeverity('normal')
  Allure.addDescription(
    'Verifies the context menu optios appear when clicked on 3 dot menu and select edit option and update the contractor name.'
)
  await Allure.step(
    'Click on 3 dot menu and select edit option and update the contractor name.',
    async () => {
      await resourceAllocation.clickContractorMenuButton()
      await resourceAllocation.clickEditContractor() 
      await resourceAllocation.editContractorName()
      await resourceAllocation.updateContractorName()
      await resourceAllocation.validateupdatedContractorName()
      }                                                
  )
})

test('Click on search for contractor filter and validate that the searched contractor visible', async () => {
  Allure.addSeverity('normal')
  Allure.addDescription(
    'Verifies the functionality of the search for contractor filter and ensures searched contractor visible.'
)
  await Allure.step(
    'Click on search for contractor filter and validate that the searched contractor visible.',
    async () => {
      await resourceAllocation.validatingSearchForContractorFilter()
      

    }                                                
  )
})



test('Verify "all project" filter functinality in contractor allocation ', async () => {
  Allure.addSeverity('normal')
  Allure.addDescription(
    'Verifies the functionality of the all projects filter and ensure that selected project appears on the page.'
)
  await Allure.step(
    'Click all projcts filter button and verify that only selected project appears on the page',
    async () => {
       await resourceAllocation.expandSidebarContent()
      await resourceAllocation.clickContractorAllocation()
      await resourceAllocation.closeExpandSidebar()
      await resourceAllocation.clcikAllProjectsFilter()
      await resourceAllocation.validateAllProjectsFilterForContractorAllocation()

    }                                                
  )
})

test('Assigning new contractor to the project', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifying the working of assign to project button and ensures that contractor is assigned to the project'
)
  await Allure.step(
    'Click assign to project button and validate that contractor is assigned to the project',
    async () => {
      await resourceAllocation.assignContractorToProject() 
      }                                                
  )
}) 

test.skip('Deasssigning contractor from the project', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifying the working of removing contractor from project and ensures that contractor is removed from the project'
)
  await Allure.step(
    'Click remove button and validate that contractor is removed from the project',
    async () => {
      await resourceAllocation.removingContractorFromProject()
      }                                                
  )
})

test('Verify the working of delete contractor button and validate that contractor is deleted', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifying the working of delete contractor button and ensures that contractor is deleted'
)
  await Allure.step(
    'Click delete contractor button and validate that contractor is deleted',
    async () => {
      await resourceAllocation.clickDeleteContractor()
      await resourceAllocation.validateContractorDeleted()

      }                                                
  )
})



test('Verify the navigation to other cost allocation page the page is loaded', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifying the working of other cost allocation button and page is loaded'
)
  await Allure.step(
    'Click the other cost allocation navigation button and validate that page is properly loaded ',
    async () => {
      await resourceAllocation.expandSidebarContent()
      await resourceAllocation.validateSidebarContent()
      await resourceAllocation.clickOtheCostAllocation()
      await resourceAllocation.closeExpandSidebar()
      await resourceAllocation.validateOtherCostAllocationPage()
      
    }                                                
  )
}) 

test('Verify the new other cost button and validate the new other cost modal opens', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Verifying the working of new other cost button and ensures new other cost modal opens'
)
  await Allure.step(
    'Click the contractor allocation navigation button and validate that page is properly loaded ',
    async () => {
      await resourceAllocation.clickNewOtherCostButton()
      await resourceAllocation.validateNewOtherCostModalAppears()
      }                                                
  )
}) 

test('Add new other cost and validate that it is successfully added', async () => {
  Allure.addSeverity('critical')
  Allure.addDescription(
    'Add the new other cost and ensures it is successfully added to the page '
)
  await Allure.step(
    'Creating the new other cost and validates it is successfully added to the page',
    async () => {
      await resourceAllocation.addNewOtherCost()
      await resourceAllocation.validateAddedNewOtherCost()
      
    }                                                
  )
})  



})
