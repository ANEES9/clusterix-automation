import { test, expect } from '@playwright/test'
import { TemplateManagerPage } from 'pages/template-manager/template-manager-page'
import { setupTestContext } from 'utils/test-context'

const campaignname = 'Demo Campaign'
const subject = 'Check Bulk Mailing'

test.describe('Verify Bulk Mailing Functionalities', () => {
  let templateManagerPage: TemplateManagerPage
  let locale: string
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await templateManagerPage.goto(baseURL)
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    templateManagerPage = new TemplateManagerPage(page, locale)
    await page.waitForLoadState('networkidle')
  })

  test.fixme(
    'Create Template in Template Manager in A3 Page',
    async ({ page }) => {
      await templateManagerPage.templateManagerLink.click()
      await templateManagerPage.newTemplateButton.click()
      await templateManagerPage.selectPageSizeDropdown.click()
      await templateManagerPage.templateSizeButtonA3.click()
      await page.waitForTimeout(5000)
      await templateManagerPage.sideBarCollapse.click()
      await templateManagerPage.templateTitleFieldButton.click()
      await templateManagerPage.templateTitleField.fill('Test Template')
      await templateManagerPage.templateDescriptionField.fill('Automation')
      await templateManagerPage.templateTagField.click()
      await templateManagerPage.tagSelection.click()
      await templateManagerPage.createTemplate.click()

      const editor = templateManagerPage.editor
      await editor.fill('fullText')

      // Assertion: Verify the text exists in the editor and log results
      try {
        await expect(editor).toHaveText('fullText')
        console.log('Assertion Passed: The text is available in the editor.')
      } catch (error) {
        console.error(
          'Assertion Failed: The text is not available in the editor.',
          error
        )
      }

      // Additional assertions
      await expect(templateManagerPage.saveButton).toBeEnabled() // Verify save button is enabled
      await expect(templateManagerPage.editor).toHaveValue('fullText') // Verify the editor contains the full text

      // Add standard assertion sentence
      await expect(editor).toHaveText('fullText', { timeout: 5000 })
      console.log(
        'Assertion Statement: The text is successfully rendered in the editor.'
      )

      await templateManagerPage.saveButton.click()

      try {
        await expect(templateManagerPage.successToast).toBeVisible()
        console.log("Received toast message: 'Template successfully updated'.")
      } catch (error) {
        console.error(
          "Assertion failed: 'Template successfully updated' element state did not meet expectations.",
          error
        )
      }

      // Additional verification for the toast notification
      await expect(templateManagerPage.successToast).toHaveText(
        'Template successfully updated'
      )
      await expect(templateManagerPage.successToast).toHaveAttribute(
        'class',
        /show/
      ) // Ensure toast has 'show' class indicating visibility
    }
  )

  test.fixme(
    'Create Template in Template Manager in A4 Page',
    async ({ page }) => {
      await templateManagerPage.templateManagerLink.click()
      await templateManagerPage.newTemplateButton.click()
      await templateManagerPage.templateSizeButtonA4.click()
      await templateManagerPage.templateTitleFieldButton.click()

      await templateManagerPage.templateTitleField.fill('Test Template')
      await templateManagerPage.templateDescriptionField.fill('Automation')
      await templateManagerPage.templateTagField.click()
      await templateManagerPage.tagSelection.click()
      await templateManagerPage.createTemplate.click()

      const editor = templateManagerPage.editor
      await editor.fill('fullText')

      // Assertion: Verify the text exists in the editor and log results
      try {
        await expect(editor).toHaveText('fullText')
        console.log('Assertion Passed: The text is available in the editor.')
      } catch (error) {
        console.error(
          'Assertion Failed: The text is not available in the editor.',
          error
        )
      }

      // Add standard assertion sentence
      await expect(editor).toHaveText('fullText', { timeout: 5000 })
      console.log(
        'Assertion Statement: The text is successfully rendered in the editor.'
      )

      await templateManagerPage.saveButton.click()

      try {
        await expect(templateManagerPage.successToast).toBeVisible()
        console.log("Received toast message: 'Template successfully updated'.")
      } catch (error) {
        console.error(
          "Assertion failed: 'Template successfully updated' element state did not meet expectations.",
          error
        )
      }

      // Additional verification for the toast notification
      await expect(templateManagerPage.successToast).toHaveText(
        'Template successfully updated'
      )
      await expect(templateManagerPage.successToast).toHaveAttribute(
        'class',
        /show/
      ) // Ensure toast has 'show' class indicating visibility
    }
  )

  test.fixme(
    'Create Template in Template Manager in A5 Page',
    async ({ page }) => {
      await templateManagerPage.templateManagerLink.click()
      await templateManagerPage.newTemplateButton.click()
      await templateManagerPage.selectPageSizeDropdown.click()
      await templateManagerPage.templateSizeButtonA5.click()
      await page.waitForTimeout(5000)
      await templateManagerPage.sideBarCollapse.click()
      await templateManagerPage.templateTitleFieldButton.click()
      await templateManagerPage.templateTitleField.fill('Test Template')
      await templateManagerPage.templateDescriptionField.fill('Automation')
      await templateManagerPage.templateTagField.click()
      await templateManagerPage.tagSelection.click()
      await templateManagerPage.createTemplate.click()
      const editor = templateManagerPage.editor
      await editor.fill('fullText')

      // Assertion: Verify the text exists in the editor and log results
      try {
        await expect(editor).toHaveText('fullText')
        console.log('Assertion Passed: The text is available in the editor.')
      } catch (error) {
        console.error(
          'Assertion Failed: The text is not available in the editor.',
          error
        )
      }

      // Additional assertions
      await expect(templateManagerPage.saveButton).toBeEnabled() // Verify save button is enabled
      await expect(templateManagerPage.editor).toHaveValue('fullText') // Verify the editor contains the full text

      // Add standard assertion sentence
      await expect(editor).toHaveText('fullText', { timeout: 5000 })
      console.log(
        'Assertion Statement: The text is successfully rendered in the editor.'
      )

      await templateManagerPage.saveButton.click()

      try {
        await expect(templateManagerPage.successToast).toBeVisible()
        console.log("Received toast message: 'Template successfully updated'.")
      } catch (error) {
        console.error(
          "Assertion failed: 'Template successfully updated' element state did not meet expectations.",
          error
        )
      }

      // Additional verification for the toast notification
      await expect(templateManagerPage.successToast).toHaveText(
        'Template successfully updated'
      )
      await expect(templateManagerPage.successToast).toHaveAttribute(
        'class',
        /show/
      ) // Ensure toast has 'show' class indicating visibility
    }
  )
})
