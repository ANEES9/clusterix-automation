import { Browser, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { employeeTable } from 'shared/utils/test-data/hr/employee-management-data'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { EmployeeManagementPage } from 'pages/hr/employee-management.page'
import { HrDashboardPage } from 'pages/hr/hr-dashboard.page'

let browser: Browser
let context: BrowserContext
let page: Page
let employeeManagementPage: EmployeeManagementPage
let hrDashboardPage: HrDashboardPage
let locale: string
let createdEmployee: { firstName: string; lastName: string } | null = null

test.describe('HR > Employee Management Test', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    test.setTimeout(300000)
    browser = testBrowser
    context = await browser.newContext({
      storageState: testInfo.project.use.storageState,
    })
    page = await context.newPage()
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    employeeManagementPage = new EmployeeManagementPage(page, locale)
    hrDashboardPage = new HrDashboardPage(page, locale)
    await employeeManagementPage.goto(baseURL!)
  })

  test('Verify Employees sub-page landing @smoke', async () => {
    //test.setTimeout(180000)
    Allure.addDescription('Verify Employees sub-page loads correctly')
    Allure.addSeverity('critical')
    /*await Allure.step('Step 1: Navigate to Employees sub-page', async () => {
      await employeeManagementPage.navigateToEmployees()
    })*/
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyEmployeesPageLoads()
    })
  })

  test('Verify Request Management landing @smoke', async () => {
    Allure.addDescription('Verify Request Management sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Request Management', async () => {
      await employeeManagementPage.navigateToRequestManagement()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyRequestManagementPageLoads()
    })
  })

  test('Verify Activity Type landing @smoke', async () => {
    Allure.addDescription('Verify Activity Type sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Activity Type', async () => {
      await employeeManagementPage.navigateToActivityType()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyActivityTypePageLoads()
    })
  })

  test('Verify Bonus Agreement landing @smoke', async () => {
    Allure.addDescription('Verify Bonus Agreement sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Bonus Agreement', async () => {
      await employeeManagementPage.navigateToBonusAgreement()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyBonusAgreementPageLoads()
    })
  })

  test('Verify Reassignments Overview landing @smoke', async () => {
    Allure.addDescription(
      'Verify Reassignments Overview sub-page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step(
      'Step 1: Navigate to Reassignments Overview',
      async () => {
        await employeeManagementPage.navigateToReassignmentsOverview()
      }
    )
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyReassignmentsOverviewPageLoads()
    })
  })

  test('Verify Vacation Report landing @smoke', async () => {
    Allure.addDescription('Verify Vacation Report sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Vacation Report', async () => {
      await employeeManagementPage.navigateToVacationReport()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyVacationReportPageLoads()
    })
  })

  test('Verify Change Board Owner landing @smoke', async () => {
    Allure.addDescription('Verify Change Board Owner sub-page loads correctly')
    Allure.addSeverity('critical')
    await Allure.step('Step 1: Navigate to Change Board Owner', async () => {
      await employeeManagementPage.navigateToChangeBoardOwner()
    })
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyChangeBoardOwnerPageLoads()
    })
  })

  test('Verify Change Ticket/Task Owner landing @smoke', async () => {
    Allure.addDescription(
      'Verify Change Ticket/Task Owner sub-page loads correctly'
    )
    Allure.addSeverity('critical')
    await Allure.step(
      'Step 1: Navigate to Change Ticket/Task Owner',
      async () => {
        await employeeManagementPage.navigateToChangeTicketTaskOwner()
      }
    )
    await Allure.step('Step 2: Verify page loads', async () => {
      await employeeManagementPage.verifyChangeTicketTaskOwnerPageLoads()
    })
  })

  test.afterAll(async () => {
    await context.close()
  })

  /*
  test('Verify Employee Management heading and total number of employees', async ({ }) => {
    Allure.addDescription(
      'Verify Employee Management heading and total number of employees.'
    )
    Allure.addSeverity('normal')

    await Allure.step(
      'Step 1: Navigate to Employee Management & Verify the Heading',
      async () => {
        await employeeManagementPage.verifyHeading()
      }
    )
    await Allure.step(
      'Step 2: Navigate to Employee Management & Verify the Total Number Of Employees',
      async () => {
        await employeeManagementPage.getTotalNumberOfEmployees()
      }
    )
  })

  test('Verify Searching for an employee by full name and verify results', async ({ }) => {
    Allure.addDescription(
      'Verify Searching for an employee by full name and verify results.'
    )
    Allure.addSeverity('critical')

    await Allure.step(
      'Step 1: Search an Employee with Full Name & Verify the Result',
      async () => {
        await employeeManagementPage.searchAndVerifyEmployee(
          employeeTable.fullName
        )
      }
    )
  })

  test('Verify Searching for an employee by First name and verify results', async ({ }) => {
    Allure.addDescription(
      'Verify Searching for an employee by First name and verify results.'
    )
    Allure.addSeverity('critical')

    await Allure.step(
      'Step 1: Search an Employee with First Name & Verify the Result',
      async () => {
        await employeeManagementPage.searchAndVerifyEmployee(
          employeeTable.firstName
        )
      }
    )
  })

  test('Verify Searching for an employee by Last name and verify results', async ({ }) => {
    Allure.addDescription(
      'Verify Searching for an employee by Last name and verify results.'
    )
    Allure.addSeverity('critical')


    await Allure.step(
      'Step 1: Search an Employee with Last Name & Verify the Result',
      async () => {
        await employeeManagementPage.searchAndVerifyEmployee(
          employeeTable.lastName
        )
      }
    )
  })

  test('Verify Searching for an employee by Non-exhisting name and verify results', async ({ }) => {
    Allure.addDescription(
      'Verify Searching for an employee by Non-exhisting name and verify results.'
    )
    Allure.addSeverity('critical')


    await Allure.step(
      'Step 1: Search an Employee with Non-exhisting Name & Verify the Result',
      async () => {
        await employeeManagementPage.searchAndVerifyEmployee(
          employeeTable.nonExhistingEmployee
        )
      }
    )
  })

  //------------------------ selecte All ----------------------
  test('Verify select all employees functionality', async ({ }) => {
    Allure.addDescription('Verify select all employees functionality.')
    Allure.addSeverity('normal') // Set severity level for the test


    await Allure.step(
      'Step 1: Verify select all employees functionality',
      async () => {
        await employeeManagementPage.verifySelectAllEmployee()
      }
    )
  })

  //------------------------ Export All ----------------------
  test('Verify Export All  functionality', async ({ }) => {
    Allure.addDescription('Verify Export All  functionality')
    Allure.addSeverity('normal')


    await Allure.step(
      'Step 1: Verify select all employees functionality',
      async () => {
        await employeeManagementPage.verifyExportAll()
      }
    )
  })

  //------------------------ Export Selected All----------------------
  test('Verify Export functionality for Selected records', async ({ }) => {
    Allure.addDescription('Verify Export Selected All  functionality')
    Allure.addSeverity('normal')


    await Allure.step(
      'Step 1:  employees functionality',
      async () => {
        await employeeManagementPage.verifyExportSelected()
      }
    )
  })

  //------------------------ Delete Selected ----------------------
  test('Verify Delete Selected All  functionality', async ({ }) => {
    Allure.addDescription('Verify Delete Selected All  functionality')
    Allure.addSeverity('normal')


    await Allure.step(
      'Step 1: Verify select all employees functionality',
      async () => {
        await employeeManagementPage.verifyDeleteSeleceted()
      }
    )
  })

  //------------------------ Filter ----------------------
  test(
    'Apply a single filter(Gender) and verify results update correctly',
    async ({ }) => {
      Allure.addDescription(
        'Apply a Gender filter and verify results update correctly.'
      )
      Allure.addSeverity('normal') // Set severity level for the test


      await Allure.step(
        'Step 1: Verify select all employees functionality',
        async () => {
          await employeeManagementPage.applyFilter({ gender: 'male' })
        }
      )

      await Allure.step('Step 2: Step 2: Verify applied filter', async () => {
        await employeeManagementPage.verifyAppliedFilter(
          'gender',
          employeeTable.gender
        )
      })
    }
  )

  test(
    'Apply a single filter(Location) and verify results update correctly',
    async ({ }) => {
      Allure.addDescription(
        'Apply a Location filter and verify results update correctly..'
      )
      Allure.addSeverity('normal') // Set severity level for the test

      await Allure.step(
        'Step 1: Verify Location filter and verify functionality',
        async () => {
          await employeeManagementPage.applyFilter({
            office: employeeTable.office,
          })
          // await employeeManagementPage.ClearAllFilters()
        }
      )
      await Allure.step('Step 2: Step 2: Verify applied filter', async () => {
        await employeeManagementPage.verifyAppliedFilter(
          'office',
          employeeTable.office
        )
      })
    }
  )

  test('Verify Clear All filters', async ({ }) => {
    Allure.addDescription('Verify Clear All filters')
    Allure.addSeverity('normal') // Set severity level for the test
    await employeeManagementPage.verifyClearAllFilters()
  })

  test('Apply a multiple filter (location and gender) and verify results update correctly', async ({ }) => {
    Allure.addDescription(
      'Apply a multiple filter (location and gender) filter and verify results update correctly.'
    )
    Allure.addSeverity('normal') // Set severity level for the test

    await employeeManagementPage.applyFilter({
      gender: employeeTable.gender,
      office: employeeTable.office,
    })
  })


  test('Filter persists upon navigating to other page or refereshing', async ({ }) => {
    Allure.addDescription(
      'Filter persists upon navigating to other page or refereshing.'
    )
    Allure.addSeverity('normal') // Set severity level for the test


    await employeeManagementPage.verifyFilterPersisted()
  })

  test('Verify Filter Behavior with No Matching Data', async ({ }) => {
    Allure.addDescription('Verify Filter Behavior with No Matching Data.')
    Allure.addSeverity('normal') // Set severity level for the test
    await employeeManagementPage.verifyFilterWhenNoMatcheFound()
  })

  test('Verify Unselecting a Filter Option', async ({ }) => {
    Allure.addDescription('Verify Unselecting a Filter Option.')
    Allure.addSeverity('normal') // Set severity level for the test
    await employeeManagementPage.verifyUnselectingAFilter()
  })

  test('Verify applying contract type filter', async ({ }) => {
    Allure.addDescription('Verify applying contract type filter.')
    Allure.addSeverity('normal') // Set severity level for the test
    await Allure.step('Step 1: Apply the filter', async () => {
      await employeeManagementPage.applyFilter({
        contractType: employeeTable.contractType,
      })
    })
    await Allure.step('Step 2: Step 2: Verify applied filter', async () => {
      await employeeManagementPage.verifyAppliedFilter(
        'contractType',
        employeeTable.contractType
      )
    })
  })

  test('Verify applying Recruiter filter', async ({ }) => {
    Allure.addDescription('Verify applying Recruiter  filter.')
    Allure.addSeverity('normal') // Set severity level for the test
    await Allure.step('Step 1: Apply the filter', async () => {
      await employeeManagementPage.applyFilter({
        recruiter: employeeTable.recruiter,
      })
    })
    await Allure.step('Step 2: Step 2: Verify applied filter', async () => {
      await employeeManagementPage.verifyAppliedFilter(
        'recruiter',
        employeeTable.recruiter
      )
    })
  })


  test('Verify applying Role filter', async ({ }) => {
    Allure.addDescription('Verify applying Role filter')
    Allure.addSeverity('normal') // Set severity level for the test
    await Allure.step('Step 1: Apply the filter', async () => {
      await employeeManagementPage.applyFilter({ role: employeeTable.role })
    })
    await Allure.step('Step 2: Step 2: Verify applied filter', async () => {
      await employeeManagementPage.verifyAppliedFilter(
        'role',
        employeeTable.role
      )
    })
  })

  test('Verify applying Department filter', async ({ }) => {
    Allure.addDescription('Verify applying Department filter.')
    Allure.addSeverity('normal') // Set severity level for the test
    await Allure.step('Step 1: Apply the filter', async () => {
      await employeeManagementPage.applyFilter({
        department: employeeTable.department,
      })
    })
    await Allure.step('Step 2: Step 2: Verify applied filter', async () => {
      await employeeManagementPage.verifyAppliedFilter(
        'department',
        employeeTable.department
      )
    })
  })


  test('Verify applying Contract status filter', async ({ }) => {
    Allure.addDescription('Verify applying Contract status filter.')
    Allure.addSeverity('normal') // Set severity level for the test
    await Allure.step(
      'Step 1: Apply the Contract status as "ALL" filter',
      async () => {
        await employeeManagementPage.applyContractStatusFilter()
      })
  })

  //creat an employee
  test('Create an employee', async ({ }) => {
    Allure.addDescription('Create an employee.')
    Allure.addSeverity('critical') // Set severity level for the test


    await Allure.step('Step 1: Open Create employee modal', async () => {
      await employeeManagementPage.openCreateEmployeeModal()
    })
    await Allure.step(
      'Step: Fill deatils and Verify created employee',
      async () => {
        createdEmployee = await employeeManagementPage.fillDetailsAndSave()
        const fullName = `${createdEmployee.firstName} ${createdEmployee.lastName}`
        await employeeManagementPage.verifyEmployeeInTable(fullName)
      }
    )
  })


  //Deleting an employee from Table
  test('Delete an employee', async ({ }) => {
    Allure.addDescription('Delete an employee')
    Allure.addSeverity('critical') // Set severity level for the test

    await Allure.step('Step 1: Open Create employee modal', async () => {
      await employeeManagementPage.openCreateEmployeeModal()
      createdEmployee = await employeeManagementPage.fillDetailsAndSave()
    })
    await Allure.step('Step 2: Search for an Employee & delete', async () => {
      if (!createdEmployee) {
        throw new Error('No employee created.')
      }
      const fullName = `${createdEmployee.firstName} ${createdEmployee.lastName}`
      await employeeManagementPage.deleteAnEmployee(fullName)
    })
  })


  //Deleting an employee in Employee Profile
  test('Delete Employee from Employee Profile model', async ({ }) => {
    Allure.addDescription('Delete Employee from Employee Profile model')
    Allure.addSeverity('critical') // Set severity level for the test

    await Allure.step('Step 1: Open Create employee modal', async () => {
      await employeeManagementPage.openCreateEmployeeModal()
      createdEmployee = await employeeManagementPage.fillDetailsAndSave()
    })
    await Allure.step(
      'Step 2: Search for an Employee & delete from employee profile model',
      async () => {
        if (!createdEmployee) {
          throw new Error('No employee created.')
        }
        const fullName = `${createdEmployee.firstName} ${createdEmployee.lastName}`
        await employeeManagementPage.deleteAnEmployeeFromEmployeeModel(fullName)
      }
    )
  })

  //Terminating an employee in Employee Profile
  test('Terminate Employee from Employee Profile model', async ({ }) => {
    Allure.addDescription('Terminate Employee from Employee Profile model.')
    Allure.addSeverity('critical') // Set severity level for the test

    await Allure.step('Step 1: Open Create employee modal', async () => {
      await employeeManagementPage.openCreateEmployeeModal()
      createdEmployee = await employeeManagementPage.fillDetailsAndSave()
    })
    await Allure.step(
      'Step 2: Search for an Employee & Terminate from employee profile model',
      async () => {
        if (!createdEmployee) {
          throw new Error('No employee created.')
        }
        const fullName = `${createdEmployee.firstName} ${createdEmployee.lastName}`
        await employeeManagementPage.terminateAnEmployee(fullName)
      }
    )
  })*/
})
