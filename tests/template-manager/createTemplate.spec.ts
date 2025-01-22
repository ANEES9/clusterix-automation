import { test, expect } from '@playwright/test'
import { closeProductTour } from 'common/product-tour-helper.js'
import { closeTimerPopUp } from 'common/timer-helper.js'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper.js'
import { templateManagerPage } from 'pages/template-manager/template-manager.js'
import { skipSurvey } from 'common/skip-survey.js'

// import { Allure } from '../../helpers/common/allure-helper.js';

const campaignname = 'Demo Campaign'
const subject = 'Check Bulk Mailing'
const title = "## The Role of Playwright in Automation Testing";
const introduction = `
  Automation testing has become a cornerstone in software development, enabling faster releases and higher-quality products. 
  Among the many tools available, **Playwright** has emerged as a robust and reliable framework for automating web applications.
`;
const features = `
  ### Key Features
  - **Cross-Browser Testing**: Supports major browsers like Chromium, Firefox, and WebKit.
  - **Multi-Language Support**: Compatible with JavaScript, Python, Java, and more.
  - **Debugging Tools**: Built-in tools like trace viewer and screenshots.
  - **Auto-Wait Mechanism**: Reduces flakiness by waiting for elements automatically.
`;
const conclusion = `
  ### Conclusion
  Playwright is an essential tool for modern software testing, enabling faster cycles, better test coverage, and improved product quality.
`;

// Combine the text
const fullText = `${title}\n\n${introduction}\n\n${features}\n\n${conclusion}`;

let locators: templateManagerPage

test.describe('Verify Bulk Mailing Functionalities', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await page.goto(baseURL!)
    await skipSurvey(page, testInfo)
    locators = new templateManagerPage(page)
    await closeProductTour(page)
    await page.waitForLoadState('networkidle')
    await closeTimerPopUp(page)
    await addCursorStyleAndScript(page)
    await page.waitForLoadState('domcontentloaded')
  })

  test('Create Template in Template Manager in A3 Page', async ({ page }) => {
    await locators.templateManagerLink.click()
    await locators.newTemplateButton.click()
    await locators.selectPageSizeDropdown.click()
    await locators.templateSizeButtonA3.click()
    await page.waitForTimeout(5000)
    await locators.sideBarCollapse.click()
    await locators.templateTitleFieldButton.click()
    await locators.templateTitleField.fill('Test Template')
    await locators.templateDescriptionField.fill('Automation')
    await locators.templateTagField.click()
    await locators.tagSelection.click()

    await locators.createTemplate.click()

    const editor = locators.editor
    await editor.fill(fullText)

    // Assertion: Verify the text exists in the editor and log results
    try {
      await expect(editor).toHaveText(fullText)
      console.log("Assertion Passed: The text is available in the editor.")
    } catch (error) {
      console.error("Assertion Failed: The text is not available in the editor.", error)
    }

    // Additional assertions
    await expect(locators.saveButton).toBeEnabled() // Verify save button is enabled
    await expect(locators.editor).toHaveValue(fullText) // Verify the editor contains the full text
    
    // Add standard assertion sentence
    await expect(editor).toHaveText(fullText, { timeout: 5000 })
    console.log("Assertion Statement: The text is successfully rendered in the editor.")

    await locators.saveButton.click()
   
    try {
      await expect(locators.successToast).toBeVisible()
      console.log("Received toast message: 'Template successfully updated'.")
    } catch (error) {
      console.error("Assertion failed: 'Template successfully updated' element state did not meet expectations.", error)
    }

    // Additional verification for the toast notification
    await expect(locators.successToast).toHaveText('Template successfully updated')
    await expect(locators.successToast).toHaveAttribute('class', /show/) // Ensure toast has 'show' class indicating visibility
  })

  test('Create Template in Template Manager in A4 Page', async ({ page }) => {
    await locators.templateManagerLink.click()
    await locators.newTemplateButton.click()
    await locators.templateSizeButtonA4.click()
    await locators.templateTitleFieldButton.click()

    await locators.templateTitleField.fill('Test Template')
    await locators.templateDescriptionField.fill('Automation')
    await locators.templateTagField.click()
    await locators.tagSelection.click()
    await locators.createTemplate.click()

    const editor = locators.editor
    await editor.fill(fullText)

    // Assertion: Verify the text exists in the editor and log results
    try {
      await expect(editor).toHaveText(fullText)
      console.log("Assertion Passed: The text is available in the editor.")
    } catch (error) {
      console.error("Assertion Failed: The text is not available in the editor.", error)
    }


    // Add standard assertion sentence
    await expect(editor).toHaveText(fullText, { timeout: 5000 })
    console.log("Assertion Statement: The text is successfully rendered in the editor.")

    await locators.saveButton.click()
    

    try {
      await expect(locators.successToast).toBeVisible()
      console.log("Received toast message: 'Template successfully updated'.")
    } catch (error) {
      console.error("Assertion failed: 'Template successfully updated' element state did not meet expectations.", error)
    }

    // Additional verification for the toast notification
    await expect(locators.successToast).toHaveText('Template successfully updated')
    await expect(locators.successToast).toHaveAttribute('class', /show/) // Ensure toast has 'show' class indicating visibility
  })

  test('Create Template in Template Manager in A5 Page', async ({ page }) => {
    await locators.templateManagerLink.click()
    await locators.newTemplateButton.click()
    await locators.selectPageSizeDropdown.click()
    await locators.templateSizeButtonA5.click()
    await page.waitForTimeout(5000)
    await locators.sideBarCollapse.click()
    await locators.templateTitleFieldButton.click()
    await locators.templateTitleField.fill('Test Template')
    await locators.templateDescriptionField.fill('Automation')
    await locators.templateTagField.click()
    await locators.tagSelection.click()
    await locators.createTemplate.click()
    const editor = locators.editor
    await editor.fill(fullText)

    // Assertion: Verify the text exists in the editor and log results
    try {
      await expect(editor).toHaveText(fullText)
      console.log("Assertion Passed: The text is available in the editor.")
    } catch (error) {
      console.error("Assertion Failed: The text is not available in the editor.", error)
    }

    // Additional assertions
    await expect(locators.saveButton).toBeEnabled() // Verify save button is enabled
    await expect(locators.editor).toHaveValue(fullText) // Verify the editor contains the full text

    // Add standard assertion sentence
    await expect(editor).toHaveText(fullText, { timeout: 5000 })
    console.log("Assertion Statement: The text is successfully rendered in the editor.")

    await locators.saveButton.click()
    

    try {
      await expect(locators.successToast).toBeVisible()
      console.log("Received toast message: 'Template successfully updated'.")
    } catch (error) {
      console.error("Assertion failed: 'Template successfully updated' element state did not meet expectations.", error)
    }

    // Additional verification for the toast notification
    await expect(locators.successToast).toHaveText('Template successfully updated')
    await expect(locators.successToast).toHaveAttribute('class', /show/) // Ensure toast has 'show' class indicating visibility
  })
})
