import { test, Browser, Page, TestInfo } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ByteBuilderPage } from 'pages/byte-builder/byte-builder-page'
import { schemaTestData } from 'utils/test-data/byte-builder/schema-data'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'

let byteBuilderPage: ByteBuilderPage
let locale: string
let browser: Browser
let context: BrowserContext
let page: Page

test.describe.parallel('Byte Builder > Schema Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()
    Allure.addAppOwner('Byte Builder')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    byteBuilderPage = new ByteBuilderPage(page, locale)
    await byteBuilderPage.goto(baseURL)
    await page.waitForLoadState('networkidle')
  })

  test.afterEach(async ({ baseURL }) => {
    await byteBuilderPage.goto(baseURL)
  })

  test('Verify Byte Builder Schema page', async () => {
    Allure.addDescription(
      'Verifies the page elements of the Byte Builder Schema page.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step(
      'Open Byte Builder and verify the page elements',
      async () => {
        await byteBuilderPage.verifyHomePage()
      }
    )
  })

  test('Verify New Schema button functionality', async () => {
    Allure.addDescription(
      'Verifies the functionality of the New Schema button and ensures page elements are loaded correctly.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step(
      'Click New Schema button and verify the page elements',
      async () => {
        await byteBuilderPage.clickNewSchemaButton()
        await byteBuilderPage.verifyAddSchemaModal()
      }
    )
  })

  test('Verify Text Schema Item', async () => {
    Allure.addDescription(
      'Verifies the functionality of adding a Text schema item, filling in data, and previewing it.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step(
      'Create schema, add Text field, fill data, and verify preview',
      async () => {
        await byteBuilderPage.clickNewSchemaButton()
        await byteBuilderPage.dragAndDropTextString()
        await byteBuilderPage.fillTextField()
        await byteBuilderPage.verifyTextField()
      }
    )
  })

  test('Verify Number Schema Item', async () => {
    Allure.addDescription(
      'Verifies the functionality of adding a Number schema item, filling in data, and previewing it.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step(
      'Create schema, add Text field, fill data, and verify preview',
      async () => {
        await byteBuilderPage.clickNewSchemaButton()
        await byteBuilderPage.dragAndDropNumber()
        await byteBuilderPage.fillNumberField()
        await byteBuilderPage.verifyNumberField()
      }
    )
  })

  test('Create and Save Schema with Items', async () => {
    Allure.addDescription(
      'Verifies the functionality of creating a schema with multiple items, saving it, and checking if it is published.'
    )
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    await Allure.step(
      'Create schema, drag schema items, fill data, and verify preview',
      async () => {
        await byteBuilderPage.clickNewSchemaButton()
        await byteBuilderPage.addSchemaTitle(schemaTestData.schemaTitle)
        await byteBuilderPage.dragAndDropTextString()
        await byteBuilderPage.fillTextField()
        await byteBuilderPage.dragAndDropNumber()
        await byteBuilderPage.fillNumberMultipleField()
        await byteBuilderPage.saveSchema()
        await byteBuilderPage.verifySchemaPublished()
      }
    )
  })

  test('Verify schema cancel confirmation popup', async () => {
    Allure.addDescription(
      'This test checks if the schema cancel confirmation modal appears when clicking the Cancel or Close button without saving.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step(
      'Verify confirmation popup appears when user click on cancel and close button',
      async () => {
        await byteBuilderPage.clickNewSchemaButton()
        await byteBuilderPage.addSchemaTitle(schemaTestData.schemaTitle)
        await byteBuilderPage.clickSchemaCancelButton()
        await byteBuilderPage.verifySchemaCancelModal()
        await byteBuilderPage.clickCancel()
        await byteBuilderPage.clickSchemaCloseButton()
        await byteBuilderPage.verifySchemaCancelModal()
      }
    )
  })

  test('Verify schema confirmation buttons functionality', async () => {
    Allure.addDescription(
      'This test ensures that the schema cancel confirmation modal closes when clicking Cancel and proceeds when Confirm is clicked.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step(
      'Test the behavior of clicking Cancel and Confirm in the modal',
      async () => {
        await byteBuilderPage.clickNewSchemaButton()
        await byteBuilderPage.addSchemaTitle(schemaTestData.schemaTitle)
        await byteBuilderPage.clickSchemaCancelButton()
        await byteBuilderPage.clickCancel()
        await byteBuilderPage.verifyModalClosedAfterCancel()

        await byteBuilderPage.clickSchemaCloseButton()
        await byteBuilderPage.clickConfirm()
        await byteBuilderPage.verifyModalClosedAfterConfirm()
      }
    )
  })

  test('Verify valid schema search', async () => {
    Allure.addDescription(
      'Validates that a valid schema title appears in the table when searched.'
    )
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    Allure.addTag('search')
    await Allure.step(
      'Search for a valid schema and verify it is present',
      async () => {
        await byteBuilderPage.searchSchema(schemaTestData.schemaTitle)
        await byteBuilderPage.assertSchemaPresence(
          schemaTestData.schemaTitle,
          true
        )
      }
    )
  })

  test('Verify invalid schema search', async () => {
    Allure.addDescription(
      'Validates that a non-existent schema title does not appear in the table.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addTag('search')
    await Allure.step(
      'Search for an invalid schema and verify it is not present',
      async () => {
        await byteBuilderPage.searchSchema(schemaTestData.invalidSearchTitle)
        await byteBuilderPage.assertSchemaPresence(
          schemaTestData.invalidSearchTitle,
          false
        )
      }
    )
  })

  test('Verify schema edit', async () => {
    Allure.addDescription(
      'Validates opening a saved schema and verifying its title and items.'
    )
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    await Allure.step(
      'Perform steps to search, open, and verify the schema details.',
      async () => {
        await byteBuilderPage.searchSchema(schemaTestData.schemaTitle)
        await byteBuilderPage.editSchema()
        await byteBuilderPage.verifyEditSchema()
      }
    )
  })

  test('Verify schema open', async () => {
    Allure.addDescription(
      'Validates opening a newly created schema from the Smart Table and verifying its title and items.'
    )
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    await Allure.step(
      'Perform steps to search, open newly created schema from Smart Table, and verify the schema details.',
      async () => {
        await byteBuilderPage.searchSchema(schemaTestData.schemaTitle)
        await byteBuilderPage.openSavedSchema()
        await byteBuilderPage.verifyNewlyCreatedSchema()
      }
    )
  })

  test('Open schema and edit title', async () => {
    Allure.addDescription(
      'This test searches for an existing schema, opens it, edits the title, and verifies the update.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step('Open and edit schema title', async () => {
      await byteBuilderPage.searchSchema(schemaTestData.schemaTitle)
      await byteBuilderPage.openSavedSchema()
      await byteBuilderPage.editSchemaTitle(schemaTestData.updatedSchemaTitle)
      await byteBuilderPage.verifySchemaTitle(schemaTestData.updatedSchemaTitle)
    })
  })

  test('Verify schema home button functionality', async () => {
    Allure.addDescription(
      'This test opens a schema, clicks the schema button, and verifies navigation to the main schema page.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step(
      'Open schema and navigate back to schema main page',
      async () => {
        await byteBuilderPage.searchSchema(schemaTestData.updatedSchemaTitle)
        await byteBuilderPage.openSavedSchema()
        await byteBuilderPage.clickSchemaButton()
        await byteBuilderPage.verifyHomePage()
      }
    )
  })

  test('Verify cancel schema deletion', async () => {
    Allure.addDescription(
      'Validates that the schema deletion is cancelled and the schema is still present in the table.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step('Search for the schema and cancel deletion', async () => {
      await byteBuilderPage.searchSchema(schemaTestData.updatedSchemaTitle)
      await byteBuilderPage.deleteSchema('cancel')
      await byteBuilderPage.assertSchemaPresence(
        schemaTestData.updatedSchemaTitle,
        true
      )
      await byteBuilderPage.verifySchemaDeletionMessage(false)
    })
  })

  test('Verify confirm schema deletion', async () => {
    Allure.addDescription(
      'Validates that confirming the schema deletion removes the schema from the table.'
    )
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    await Allure.step(
      'Search for the schema and confirm deletion',
      async () => {
        await byteBuilderPage.searchSchema(schemaTestData.updatedSchemaTitle)
        await byteBuilderPage.deleteSchema('confirm')
        await byteBuilderPage.assertSchemaPresence(
          schemaTestData.updatedSchemaTitle,
          false
        )
        await byteBuilderPage.verifySchemaDeletionMessage(true)
      }
    )
  })
})
