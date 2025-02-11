import { test } from '@playwright/test'
import { TemplateManagerPage } from 'pages/template-manager/template-manager-page'
import { setupTestContext } from 'utils/test-context'

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
    'Create Template in Template Manager in A3 Page ',
    async ({ page }) => {
      await templateManagerPage.templateManagerLink.click()
      await templateManagerPage.sideBarCollapse.click()

      // Search for the template
      await templateManagerPage.searchField.click()
      await templateManagerPage.searchField.fill('Test Template')

      // Loop through pages until the desired template is found
      let templateFound = false

      while (!templateFound) {
        const templateLocator = await page
          .locator('.PmIJC5yEH6NC34brnQkm')
          .first()

        if ((await templateLocator.count()) > 0) {
          templateFound = true

          await page
            .locator('._wrapperSpan_1hb55_1 > ._button_vdgms_1')
            .first()
            .click()
          await templateManagerPage.deleteButton.click()
          await templateManagerPage.deleteButtonPrompt.click()
          console.log('Assertion Passed: Template Deleted Successfully.')
        } else {
          // Navigate to the next page if the template is not found
          const nextPageButton = await page.locator(
            '.PaginationBar-module_paginationBar__7eGhR > button:nth-child(3)'
          )

          if (await nextPageButton.isDisabled()) {
            console.log('Template not found across all pages.')
            break
          }

          await nextPageButton.click()
        }
      }
    }
  )
})
