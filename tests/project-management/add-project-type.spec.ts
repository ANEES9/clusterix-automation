import { test } from '@playwright/test'
import { expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { generateRandomFileName } from 'common/random-data-generator'
import { skipSurveyHelper } from 'common/skip-survey-helper'
const globalProjectTitle = 'Automated Project-' + generateRandomFileName()

test.describe('Clusterix Project Managament', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step('Navigate to Base URL and Close Popups', async () => {
      await page.goto(baseURL!)
      await skipSurveyHelper(page, testInfo)
      await skipProductTourHelper(page, testInfo)
      await closeTimerPopUp(page)
      await page.waitForLoadState('networkidle')
    })
  })
  test.setTimeout(150000)
  test('Add Project Type', async ({ page }) => {
    await page
      .locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF')
      .scrollIntoViewIfNeeded() // Scroll into view for project management

    // Wait for the project management link and click it
    await page.waitForSelector(
      'div.pkts8W8G1QydflaH1hBZ a[href="/project-management"]'
    )
    await page.click('div.pkts8W8G1QydflaH1hBZ a[href="/project-management"]')
    await page.waitForLoadState('domcontentloaded')
    //console.log('Navigated to Project Management.');

    // Wait for the project overview title to become visible
    await page.locator('.project-management-overview-title')
    await page.waitForLoadState('domcontentloaded')
    console.log('Navigated to Project Management.')

    // Navigate to the Project Types page
    //await page.goto('https://testing.clusterix.io/project-management/projects/types')
    const projectTypeNavigation = page.getByRole('button', {
      name: 'Project types',
    })
    await projectTypeNavigation.click()

    // Locate the button, click on it, and wait for the page to become idle
    const newProjectTypeButton = page.getByRole('button', {
      name: 'New project type',
    })
    await newProjectTypeButton.click()

    // Log a message in the terminal
    console.log('New Project Type button is clicked')

    // Wait for the network to become idle after clicking
    await page.waitForLoadState('networkidle')

    // Wait for the modal to load and become visible
    const modal = await page.locator('#project-type-modal-content')
    await modal.waitFor({ state: 'visible' })

    // Log confirmation that the modal is loaded
    console.log('New Project Type modal is loaded')

    // Click the icon to select a new project type

    //  const icon= await page.locator('.iWSqaetH8OaVD94CSY7w');
    //  await icon.click();
    //  await page.locator('svg:nth-child(14)').click();
    //  await page.waitForLoadState('networkidle');
    //  //await page.locator('svg:nth-child(14)').click();
    //  console.log('New Project Type icon is selected');

    //Click on the title field and enter the title of the project type
    const projectTypeTitle = await page.getByPlaceholder(
      'Title of the project type'
    )
    await projectTypeTitle.click()
    await page
      .getByPlaceholder('Title of the project type')
      .fill(globalProjectTitle)
    console.log('Title for new project type is given')

    //Click on the color field and select the color
    const color = await page.locator(
      '.Colors-module_colors__3SJ3e > span:nth-child(3)'
    )
    await color.click()
    console.log('Color is selected')

    //Click on the description field and enter the description of the project type
    const descriptionProjectType = await page.getByPlaceholder(
      'Description of the project'
    )
    await descriptionProjectType.click()
    await descriptionProjectType.fill('some words for description')
    console.log('Description is added In project type form')

    //Click on the category field and select the category of the project type
    const selectingWorkflow = await page.getByPlaceholder('Category')
    await selectingWorkflow.click()
    console.log('Category dropdown to select the workflow is clicked')

    //To scroll the dropdown
    const dropdown = await page.locator('.ca-max-h-64')
    await dropdown.scrollIntoViewIfNeeded()

    // This targets the second last option in the list
    const secondLastOption = await page.locator('div[data-value="224"]')
    await secondLastOption.click()
    console.log('Second last option is "Agile Flow" is selected')
    await page.locator('.ca-fixed').click()

    await page.locator('.ux_Muxucur8oxnBC7FOQ').scrollIntoViewIfNeeded() // Scroll to the bottom of the page

    // Targets the Manage Participants Button
    const manageParticipantsButton = await page.locator(
      'button:has-text("Manage participants")'
    )
    await manageParticipantsButton.click()

    // Wait for the participants modal to load and become visible
    const targetElement = await page.locator('.YorUFdmGYZRv4Eqdz23e')
    await targetElement.waitFor({ state: 'visible' })
    console.log('Element loaded. Moving to next step.')

    // const addPartcipants=await page.locator('#text-input-6578-7770');
    // await addPartcipants.click();
    // console.log('clicked');

    const searchParticipants = await page.locator(
      'input[placeholder="Search responsible"]'
    )
    await searchParticipants.click()
    await searchParticipants.fill('M')
    const suggestionsList = await page.locator('.phOxFPhI39fmHfRR6Upk')
    await suggestionsList.waitFor({ state: 'visible' })
    // Locate and click the second participant in the list
    const secondSuggestion = await page
      .locator('div.phOxFPhI39fmHfRR6Upk div')
      .nth(1) // This targets the second particioants in the list
    await secondSuggestion.click()
    console.log('Participants Selected')

    const closeButton = await page
      .locator('.styles-module_headerCloseButton__x2ELS')
      .nth(1) // This targets the close button
    await closeButton.click() // Click the close button

    // Locate the toggle button for R&D and click on it
    const toggleButton = await page.locator(
      '.m4k0JlnIppWFWs69kSNm ._toggle_1x4ea_13'
    )
    await toggleButton.scrollIntoViewIfNeeded()
    await toggleButton.click()
    // Verify if the toggle button is present and check its state (on/off)
    const isChecked = await toggleButton.isChecked()
    console.log('Is the toggle button checked?', isChecked)

    // If not checked, click to enable the toggle
    if (!isChecked) {
      await toggleButton.click()
      console.log('Toggle button has been clicked to enable.')
    } else {
      console.log('Toggle button is already enabled.')
    }

    // Locate the Save button by its text content and click on it
    const createButton = await page.locator('text=Create Project Type')
    await createButton.click()
    await page.waitForTimeout(1000)

    // Wait for the "Project type" header to be loaded completely
    const projectTypeHeader = await page.getByRole('button', {
      name: 'Project types',
    })
    await projectTypeHeader.waitFor({ state: 'visible' })

    // Wait for the project title to appear in the project types list on main page
    const projectTitle = await page.locator(
      `span:has-text("${globalProjectTitle}")`
    )
    console.log('Project Title is:', globalProjectTitle)
    await projectTitle.waitFor({ state: 'visible' })
    await expect(projectTitle).toBeVisible()

    // Get the text content of the created project title dynamically
    const createdProjectTitle = await projectTitle.textContent()
    console.log(
      `New Project Type: ${createdProjectTitle} is created successfully`
    )
  })

  test('Edit Project Type', async ({ page }) => {
    // Define locators with type safety
    // const email = page.locator("[name='email']");
    // const password = page.locator("[name='password']");
    // const login = page.getByRole('button', { name: 'Login' })   //("div.ca-bg-theme.ca-text-white.ca-fill-white");

    // // Navigate to the login page
    // await page.goto("https://testing.clusterix.io/login");
    // console.log(await page.title());
    // await expect(page).toHaveTitle("Clusterix");

    // // Fill login details
    // await email.fill("clusterixdemo@gmail.com");
    // await password.fill("1");
    // await login.click();
    // await page.waitForTimeout(10000);

    // // Skip the tour
    // await page.click('text="Skip tour"');

    // Scroll into view for project management
    await page
      .locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF')
      .scrollIntoViewIfNeeded()

    // Wait for the project management link and click it
    await page.waitForSelector(
      'div.pkts8W8G1QydflaH1hBZ a[href="/project-management"]'
    )
    await page.click('div.pkts8W8G1QydflaH1hBZ a[href="/project-management"]')
    await page.waitForLoadState('domcontentloaded')
    //console.log('Navigated to Project Management.');

    // Wait for the project overview title to become visible
    await page.locator('.project-management-overview-title') //.waitFor({ state: 'visible' });
    await page.waitForLoadState('domcontentloaded')
    console.log('Navigated to Project Management.')

    // Navigate to the Project Types page
    await page.goto(
      'https://testing.clusterix.io/project-management/projects/types'
    )
    // Navigate to Project Management
    //  await page.click('a[href="/project-management"]');
    await page.waitForLoadState('networkidle')

    const projectRow = page
      .locator(
        'td:nth-child(8) > .SmartTable-module_cellContentWrapper__ppYvz > .SmartTable-module_cellContent__fmjZa > .ca-gap-yellow'
      )
      .first() //await page.locator(`text=${createdProjectTitle}`).first(); // This looks for the project title text

    await page.waitForTimeout(1000)
    await projectRow.click()

    await page.waitForTimeout(1000)
    console.log('Edit button for created Project Type is clicked')
    await page.waitForTimeout(1000)
    await page.waitForLoadState('networkidle')

    const modal = await page.locator('#project-type-modal-content')
    await modal.waitFor({ state: 'visible' }) //Ensure that the form is visible

    // Log confirmation that the modal is loaded
    console.log('New Project Type modal is loaded')

    // Retrieve the title field in the modal
    const projectTitleField = await page.locator(
      'input[placeholder="Title of the project type"]'
    )

    // Get the value from the project title field
    const titleInForm = await projectTitleField.inputValue()

    // Validate that the title in the form matches the created project title
    expect(titleInForm).toBe(globalProjectTitle)

    console.log('Project Title in form matches the created project title')

    // Update the project title
    await projectTitleField.fill('New Type Automation')

    // Wait for the form to settle
    await page.waitForLoadState('networkidle')

    // Get the updated value of the project title field
    const updatedProjectTypeTitle = await projectTitleField.inputValue()

    // Validate that the updated title is now in the field
    expect(updatedProjectTypeTitle).toBe('New Type Automation')
    console.log('Project type title is updated')

    const updatedcolor = await page.locator(
      'span[style*="background-color: rgb(133, 10, 10);"]'
    )
    await updatedcolor.click()
    console.log('Updated color is selected')

    const updateDescriptionProjectType = await page.getByPlaceholder(
      'Description of the project'
    )
    await updateDescriptionProjectType.click()
    await updateDescriptionProjectType.fill('Now I updated the description')
    console.log('Updated description is added In project type form')

    const updatedSelectingWorkflow = await page.getByPlaceholder('Category')
    await updatedSelectingWorkflow.click()
    console.log('Workflow selected project type form')

    const dropdown = await page.locator('.ca-max-h-64')
    await dropdown.scrollIntoViewIfNeeded()

    const lastWorkflow = await page.locator('div[data-value="222"]') // Update data-value as needed for the second last option
    await lastWorkflow.click()
    console.log('Last option is "SFF" is selected')

    await page.locator('.ca-fixed').click()

    await page.locator('.ux_Muxucur8oxnBC7FOQ').scrollIntoViewIfNeeded()

    const manageParticipantsButton = await page.locator(
      'button:has-text("Manage participants")'
    ) // Targets the Maanage Participants Button
    await manageParticipantsButton.click()

    const targetElement = await page.locator('.YorUFdmGYZRv4Eqdz23e')
    await targetElement.waitFor({ state: 'visible' })
    console.log('Element loaded. Moving to next step.')

    const crossIcon = await page.locator('div.Pyc7cP_yKF9ypAX1_LCX svg').nth(1)
    await crossIcon.click()
    console.log('Deselected')

    const closeButton = await page
      .locator('.styles-module_headerCloseButton__x2ELS')
      .nth(1) // Alternatively use title or other attributes
    await closeButton.click() // Click the close button

    // Locate the toggle button
    const toggleButton = await page.locator(
      '.m4k0JlnIppWFWs69kSNm ._toggle_1x4ea_13'
    )
    await toggleButton.scrollIntoViewIfNeeded()
    await toggleButton.click()
    // Verify if the toggle button is present and check its state (on/off)
    const isChecked = await toggleButton.isChecked()
    console.log('Is the toggle button checked?', isChecked)

    // If not checked, click to enable the toggle
    if (!isChecked) {
      await toggleButton.click()
      console.log('Toggle button has been clicked to enable.')
    } else {
      console.log('Toggle button is already enabled.')
    }

    // Locate the Save button by its text content and click on it
    const saveButton = await page.locator('text=Save')
    await saveButton.click() // Click the Save button
    await page.waitForTimeout(1000)
    console.log('Project type is updated')
    await page.waitForTimeout(10000)
    await page.waitForLoadState('networkidle')

    // Wait for the element to be present on the page
    await page.waitForSelector('span:has-text("New Type Automation")', {
      timeout: 10000,
    })

    // Locate the element with the specific color
    //const updatedColorOnMainPage = await page.locator('span:has-text("New Type Automation") >> xpath=//span[contains(@style, "color: rgb(133, 10, 10);")]');

    // Validate that the element is visible
    //await expect(updatedColorOnMainPage).toBeVisible();
    //console.log('Updated Color is visible on the main page');

    // Validate that the updated description is visible on the main page
    const updatedDescriptionOnMainPage = await page.locator(
      'text="Now I updated the description"'
    ) // Check for the updated description text
    await expect(updatedDescriptionOnMainPage).toBeVisible()
    console.log('Updated Description is visible on the main page')

    const projectTypeRow = await page
      .locator('td:has-text("New Type Automation")')
      .locator('..')

    // Now, target the participants' cell in the same row (5th column in this case)
    const participantsCell = await projectTypeRow
      .locator('td:nth-child(5) .SmartTable-module_cellContent__fmjZa')
      .first()

    // Count the participants in this cell
    const participantCount = await participantsCell
      .locator(
        '.BaseCellWrapper-module_wrapper__XCaQu .UserCell-module_content__QhX53'
      )
      .nth(0)
      .count()
    console.log(participantCount)
    // Ensure that only one participant is left
    await expect(participantCount).toBe(1)
    console.log('Only the updated participant is visible on the main page')
  })

  test('Delete a  new project type', async ({ page }) => {
    const updatedProjectTypeTitle = 'New Type Automation' // Define the variable with the correct value

    // Scroll into view for project management
    await page
      .locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF')
      .scrollIntoViewIfNeeded()
    // Navigate to the Project Types page
    // await page.goto('https://testing.clusterix.io/project-management/projects/types');
    // Navigate to Project Management
    await page.click('a[href="/project-management"]')
    await page.waitForLoadState('networkidle')
    const projectTypeNavigation = page.getByRole('button', {
      name: 'Project types',
    })
    await projectTypeNavigation.click()

    // Locate the 4th delete button that is  the 4th element)
    const deleteButton = await page
      .locator('div.ca-flex svg[viewBox="0 0 14 14"]')
      .nth(3)

    // Click on the 4th delete button
    await deleteButton.click()
    await page.waitForTimeout(1000)

    // Wait for the "Delete Project type" button to be visible
    const clickdeleteButton = await page.locator(
      'button:has-text("Delete Project type")'
    )
    await deleteButton.waitFor({ state: 'visible' })

    // Once it's visible, click on the "Delete Project type" button
    await clickdeleteButton.click()
    await page.waitForTimeout(1000)

    const projectTypeLocator = page.locator(`text=${updatedProjectTypeTitle}`)
    const projectTypeExists = await projectTypeLocator.count()

    // Validation: Ensure the project is deleted and not visible on the main page
    expect(projectTypeExists).toBe(0)
    console.log('Project is deleted and no longer visible on the main page')
  })
})
