import { test } from '@playwright/test'
import { expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import { closeTimerPopUp } from 'common/timer-helper'
import { TaskManagementPage } from 'pages/task-management'
import { closeProductTour } from 'common/product-tour-helper'
import { generateRandomFileName } from 'common/random-data-generator'
import { skipSurveyHelper } from 'common/skip-survey-helper'

test.describe('Clusterix Project Managament', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipSurveyHelper(page, testInfo)
      await closeProductTour(page)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })

  test.setTimeout(60000)
  test('Click on Add Project Button', async ({ page }) => {
    // Scroll into view for project management
    await page
      .locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF')
      .scrollIntoViewIfNeeded()

    // Navigate to Project Management
    await page.click('a[href="/project-management"]')
    await page.waitForLoadState('networkidle')
    //await page.waitForSelector('._button__content_61s7l_12 ._button__name_61s7l_25:has-text("Add project")', { state: 'visible' });

    // Click on the Add project button
    const addProjectButton = page.getByText('Add project')
    await addProjectButton.click()
    // await page.click('._button__content_61s7l_12 ._button__name_61s7l_25:has-text("Add project")');
    await page.waitForTimeout(500)
    console.log('The Add Project Form is open.')

    // Wait for the input field to be visible
    await page.waitForSelector(
      'input[placeholder="Please select project type"]',
      { state: 'visible' }
    )

    // Click on the input field to open the dropdown
    await page.click('input[placeholder="Please select project type"]')

    // Select the 2nd Dropdown Option

    const option = await page.getByText('Agile Software Projects') //.nth(1);
    await option.click()
    await page.waitForTimeout(1000)

    // Locate the Short Title input field
    const shortTitleInput = page.locator(
      'input[placeholder="Please enter short title"]'
    )
    await shortTitleInput.click()

    // Test case 1: Enter a short title with less than 3 characters
    await shortTitleInput.fill('Automation')
    await page.waitForTimeout(1000)
    const redMarkVisibleForValid = await page
      .locator(
        'div:has(input[placeholder="Please enter short title"]) .characters-counter-danger'
      )
      .first()
      .isVisible()
    await expect(redMarkVisibleForValid).toBeTruthy()
    console.log('Validation passed for valid short title')

    // Locate the Project Title input field
    const projectTitleInput = page.locator(
      'input[placeholder="Please enter title"]'
    )
    await projectTitleInput.waitFor({ state: 'visible' })
    await projectTitleInput.click()

    // Test case 2: Enter a short project title with valid characters (between 50-178)
    await projectTitleInput.fill(
      'This is the new project I am creating to test the validation for Input field as well as for Automation test script'
    )
    await page.waitForTimeout(1000)
    const redMarkVisibleForShort2 = await page
      .locator(
        'input[placeholder="Please enter title"].characters-counter-danger'
      )
      .nth(1)
      .isVisible()
    expect(redMarkVisibleForShort2).toBeFalsy()
    console.log(
      'Validation passed for short project title with valid no. of characters'
    )

    // Locate the Project Start field
    await page.getByRole('button', { name: 'Project start' }).click()
    console.log('Project start field is visible')

    const calendar = page
      .locator('div[class*="DatePickerView-module_datePickerView"]')
      .first()
    await calendar.waitFor({ state: 'visible' })

    // Select a specific date
    await page.getByRole('button', { name: '7', exact: true }).first().click()
    console.log('Date 7 selected')

    // Locate the Project End field
    await page.getByRole('button', { name: 'Project end' }).click()
    console.log('Project end field is visible')

    // Locate the second "January" button
    const januaryButton = page.locator('button:has-text("January")').nth(1)

    // Wait for the Last "January" button to be visible
    await januaryButton.waitFor({ state: 'visible' })
    console.log('Project end month button is visible')

    // Click the last "January" button
    await januaryButton.click()
    console.log('End january button clicked')

    console.log('Month Button is clicked for project end')
    await page.waitForLoadState('networkidle')
    async function selectMonth(page: any, monthNumber: number) {
      // Dynamically construct the nth-of-type selector using the monthNumber
      const monthSelector = `div[class*="MonthPickerView-module_monthPickerView"] button:nth-of-type(${monthNumber})`
      await page.locator(monthSelector).click()
      console.log(`Month ${monthNumber} selected`)
    }

    await selectMonth(page, 2) // Example: Select February (2nd month)
    await page.waitForTimeout(500)

    const selectingDate = page
      .getByRole('button', { name: '9', exact: true })
      .nth(1)
    await selectingDate.waitFor({ state: 'visible' })
    await selectingDate.click()

    console.log('Date 9 selected')
    await page.waitForTimeout(500)

    // Click on Create Project
    const projectCreated = page.locator('.bmtRechoOWVA0GojVgT7')
    await projectCreated.click()
    const confirmationMessage = await page
      .getByText('Project created successfully.')
      .textContent()
    console.log(confirmationMessage)
    await expect(page.getByText('Project created successfully.')).toContainText(
      'Project cr'
    )
    await page.waitForTimeout(2000)
  })

  test('Validate the Title Input Field for Character counts', async ({
    page,
  }) => {
    // Scroll into view for project management
    await page
      .locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF')
      .scrollIntoViewIfNeeded()

    // Navigate to Project Management
    await page.click('a[href="/project-management"]')
    await page.waitForLoadState('networkidle')
    //await page.waitForSelector('._button__content_61s7l_12 ._button__name_61s7l_25:has-text("Add project")', { state: 'visible' });

    // Click on the Add project button
    const addProjectButton = page.getByText('Add project')
    await addProjectButton.click()
    await page.waitForTimeout(500)
    console.log('The Add Project Form is open.')

    // Locate the Short Title input field
    const shortTitleInput = page.locator(
      'input[placeholder="Please enter short title"]'
    )
    await shortTitleInput.click()

    // Test case 1: Enter a short title with less than 3 characters
    await shortTitleInput.fill('Hi')
    await page.waitForTimeout(1000)
    const redMarkVisibleForShort = await page
      .locator(
        'div:has(input[placeholder="Please enter short title"]) .characters-counter-danger'
      )
      .first()
      .isVisible()
    expect(redMarkVisibleForShort).toBeTruthy()
    console.log('Validation passed for short title less than 3 characters')

    // Test case 2: Enter a short title with more than 20 characters
    await shortTitleInput.fill('This title exceeds the limit')
    await page.waitForTimeout(1000)
    const redMarkVisibleForLong = await page
      .locator(
        'div:has(input[placeholder="Please enter short title"]) .characters-counter-danger'
      )
      .first()
      .isVisible()
    expect(redMarkVisibleForLong).toBeTruthy()
    console.log('Validation passed for short title exceeding 20 characters')

    // Test case 3: Enter a valid short title (3–20 characters)
    await shortTitleInput.fill('Automation')
    await page.waitForTimeout(1000)
    const redMarkVisibleForValid = await page
      .locator(
        'div:has(input[placeholder="Please enter short title"]) .characters-counter-danger'
      )
      .first()
      .isVisible()
    expect(redMarkVisibleForValid).toBeTruthy()
    console.log('Validation passed for valid short title')

    // Locate the Project Title input field
    const projectTitleInput = page.locator(
      'input[placeholder="Please enter title"]'
    )
    await projectTitleInput.waitFor({ state: 'visible' })
    await projectTitleInput.click()

    // Test case 1: Enter a short project title with less than 50 characters
    await projectTitleInput.fill('Hello Sania Farheen')
    await page.waitForTimeout(1000)
    const redMarkVisibleForShort1 = await page
      .locator(
        'input[placeholder="Please enter title"].characters-counter-danger'
      )
      .nth(1)
      .isVisible()
    expect(redMarkVisibleForShort1).toBeFalsy()
    console.log(
      'Validation passed for short project title less than 50 characters'
    )

    // Test case 2: Enter a long project title with more than 178 characters
    await projectTitleInput.fill(
      'Hello Sania Farheen Hello Sania Farheen Hello Sania Farheen Hello Sania Farheen Hello Sania Farheen Hello Sania Farheen Hello Sania Farheen Hello Sania Farheen Hello Sania Farheen'
    )
    await page.waitForTimeout(1000)
    const redMarkVisibleForShort2 = await page
      .locator(
        'input[placeholder="Please enter title"].characters-counter-danger'
      )
      .nth(1)
      .isVisible()
    expect(redMarkVisibleForShort1).toBeFalsy()
    console.log(
      'Validation passed for long project title less than 50 characters'
    )

    // Test case 2: Enter a short project title with valid characters (between 50-178)
    await projectTitleInput.fill(
      'This is the new project I am creating to test the validation for Input field as well as for Automation test script'
    )
    await page.waitForTimeout(1000)
    const redMarkVisibleForShort3 = await page
      .locator(
        'input[placeholder="Please enter title"].characters-counter-danger'
      )
      .nth(1)
      .isVisible()
    expect(redMarkVisibleForShort2).toBeFalsy()
    console.log(
      'Validation passed for project title with valid no. of characters'
    )
  })

  test('Edit the project details', async ({ page }) => {
    // Scroll into view for project management
    await page
      .locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF')
      .scrollIntoViewIfNeeded()

    // Navigate to Project Management
    await page.click('a[href="/project-management"]')
    await page.waitForLoadState('networkidle')

    // Click on the search icon of a project
    const searchIcon = page.locator(
      'tbody tr:nth-child(1) td:nth-child(12) svg.ca-fill-theme'
    )
    await searchIcon.click()
    await page.waitForTimeout(1000)

    // Click on the edit button
    const menu = page.getByText('Edit') //.nth(1)
    await menu.click()
    await page.waitForTimeout(1000)

    // Edit Project Short Title
    const projectShortTitle = page.getByLabel('Project Short Title')
    await projectShortTitle.waitFor({ state: 'visible' })
    await projectShortTitle.click()
    await projectShortTitle.fill(' Automated Pct')
    await page.waitForTimeout(500)
    await projectShortTitle.fill('')
    await projectShortTitle.fill('Automation new')
    await page.waitForTimeout(500)

    // Edit Project Title
    const projectTitle = page.getByText('This is the new project')
    await projectTitle.waitFor({ state: 'visible' })
    await projectTitle.click()
    await projectTitle.fill(
      'This is the new project created for automating the task using playwright'
    )
    await page.waitForTimeout(500)
    await projectTitle.fill('')
    await projectTitle.fill(
      'This is the new project I am creating to test the validation for Input field as well as for Automation test script and here I am adding few more words'
    )
    await page.waitForTimeout(500)

    // Update Project Start Date
    await page.getByRole('button', { name: 'Project start' }).click()
    await page.getByRole('button', { name: '1', exact: true }).first().click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)

    // Confirm changes
    await page.getByText('Yes, Continue').click()
    await page.waitForTimeout(900)

    // Navigate to Overview
    const navigateToOverview = page
      .locator(
        '._sidebarSubMenuButton_16zcl_191 ._sidebarSubMenuButton__collapsedIcon_16zcl_195'
      )
      .first()
    await navigateToOverview.click()
    console.log('Navigated to Overview')
    await page.waitForTimeout(500)

    // Validate Updated Project Title
    const updatedProjectTitle = page
      .locator('span[class*="uYBBBNKxgHFoikuU642J"]')
      .last()
    await updatedProjectTitle.waitFor({ state: 'visible' })
    await page.waitForTimeout(500)
    const updatedTitleText = await updatedProjectTitle.textContent()
    console.log(
      `The updated project title in the communication modal is: ${updatedTitleText}`
    )

    await page.waitForTimeout(500)

    if (updatedTitleText && updatedTitleText.includes('New')) {
      console.log(
        'Project title updated successfully and is visible in the communication modal.'
      ) // Validation step to check the updated title
    } else {
      console.error('Project title update validation failed.')
    }
  })

  test('Delete the project', async ({ page }) => {
    // Scroll into view for project management
    await page
      .locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF')
      .scrollIntoViewIfNeeded()

    // Navigate to Project Management
    await page.click('a[href="/project-management"]')
    await page.waitForLoadState('networkidle')

    // Click on the search icon of the first project
    const searchIcon = page.locator(
      'tbody tr:nth-child(1) td:nth-child(12) svg.ca-fill-theme'
    )
    await searchIcon.click()
    await page.waitForTimeout(1000)

    // Click on the three-dot menu
    const menu = page.locator('._button__icon_vdgms_18').nth(0)
    await menu.click()
    await page.waitForTimeout(1000)

    // Click "Delete Project" in the menu
    const deleteProject = page.getByText('Delete project')
    await deleteProject.click()

    // Confirm deletion by clicking "Delete" in the confirmation modal
    await page.getByText('Delete', { exact: true }).click()

    // Validate the toaster message for successful deletion
    const toasterMessage = page.locator('text=projects deleted successfully')
    await toasterMessage.waitFor({ state: 'visible' }) // Ensure toaster is visible
    await page.waitForTimeout(1000)
    await expect(toasterMessage).toContainText('Projects deleted successfully') // Validate toaster text
    console.log(await toasterMessage.textContent()) // Print the toaster message to console
  })
})
