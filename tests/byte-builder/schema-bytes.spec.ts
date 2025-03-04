import { test, Browser, Page, TestInfo } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ByteBuilderPage } from 'pages/byte-builder/byte-builder-page'
import { SchemaBytesPage } from 'pages/byte-builder/schema-bytes-page'
import { schemaTestData } from 'utils/test-data/byte-builder/schema-data'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'


let byteBuilderPage: ByteBuilderPage
let schemaBytesPage: SchemaBytesPage
let locale: string
let browser: Browser
let context: BrowserContext
let page: Page


test.describe.parallel('Byte Builder > Schema bytes Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    Allure.addAppOwner('Byte Builder')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    schemaBytesPage = new SchemaBytesPage(page, locale)
    byteBuilderPage = new ByteBuilderPage(page, locale)
    await byteBuilderPage.goto(baseURL)
    await page.waitForLoadState('networkidle')
  })


  test('Verify add schema item page elements', async () => {
    Allure.addDescription('This test verifies that all essential elements are present on the add schema item page')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    await Allure.step('Create schema, Search and open schema, click add data manually, and verify elements', async () => {
      await byteBuilderPage.clickNewSchemaButton()
      await byteBuilderPage.addSchemaTitle(schemaTestData.schemaTitleForBytesTest)
      await byteBuilderPage.dragAndDropTextString()
      await byteBuilderPage.fillTextField()
      await byteBuilderPage.dragAndDropNumber()
      await byteBuilderPage.fillNumberMultipleField()
      await byteBuilderPage.saveSchema()

      await schemaBytesPage.addDataManually()
      await schemaBytesPage.verifyPageElements()
    })
  })

  test('Validate mandatory fields', async () => {
    Allure.addDescription('Validates error messages for mandatory fields when left empty')
    Allure.addSeverity('normal')
    Allure.addTag('regression')

    await Allure.step('Attempt to add a schema item without filling mandatory fields', async () => {
      await schemaBytesPage.addDataManually()
      await schemaBytesPage.addSchemaItem()
      await schemaBytesPage.validateMandatoryFields()
    })
  })

  test('Validate error appears for text field when length is out of range', async () => {
    Allure.addDescription('This test verifies that an error appears when the text length is out of the allowed range.')
    Allure.addSeverity('normal')
    Allure.addTag('validation')

    await Allure.step('Fill text field with invalid lengths and verify error message', async () => {
      await schemaBytesPage.addDataManually()

      await schemaBytesPage.fillTextFieldConditional(parseInt(schemaTestData.minLength) - 1)
      await schemaBytesPage.verifyTextFieldLengthError(true)

      await schemaBytesPage.addDataManually()
      await schemaBytesPage.fillTextFieldConditional(parseInt(schemaTestData.maxLength) + 1)
      await schemaBytesPage.verifyTextFieldLengthError(true)
    })
  })

  test('Validate no error for valid text field input', async () => {
    Allure.addDescription('This test verifies that no error appears when the text length is within the allowed range.')
    Allure.addSeverity('normal')
    Allure.addTag('validation')

    await Allure.step('Fill text field with valid lengths and verify no error appears', async () => {
      await schemaBytesPage.addDataManually()
      await schemaBytesPage.fillTextFieldConditional(parseInt(schemaTestData.minLength))
      await schemaBytesPage.verifyTextFieldLengthError(false)

      await schemaBytesPage.addDataManually()
      await schemaBytesPage.fillTextFieldConditional(parseInt(schemaTestData.maxLength))
      await schemaBytesPage.verifyTextFieldLengthError(false)
    })
  })


  test('Validate error appears for number field when value is out of range', async () => {
    Allure.addDescription('This test verifies that an error appears when the number value is out of the allowed range.')
    Allure.addSeverity('normal')
    Allure.addTag('validation')

    await Allure.step('Fill number field with invalid values and verify error message', async () => {
      await schemaBytesPage.addDataManually()
      await schemaBytesPage.fillNumberField(parseInt(schemaTestData.minValue) - 1)
      await schemaBytesPage.verifyNumberValueError(true)

      await schemaBytesPage.addDataManually()
      await schemaBytesPage.fillNumberField(parseInt(schemaTestData.maxValue) + 1)
      await schemaBytesPage.verifyNumberValueError(true)
    })
  })

  test('Validate no error for valid number field input', async () => {
    Allure.addDescription('This test verifies that no error appears when the number value is within the allowed range.')
    Allure.addSeverity('normal')
    Allure.addTag('validation')

    await Allure.step('Fill number field with valid values and verify no error appears', async () => {
      await schemaBytesPage.addDataManually()

      await schemaBytesPage.fillNumberField(parseInt(schemaTestData.minValue))
      await schemaBytesPage.verifyNumberValueError(false)

      await schemaBytesPage.addDataManually()
      await schemaBytesPage.fillNumberField(parseInt(schemaTestData.maxValue))
      await schemaBytesPage.verifyNumberValueError(false)
    })
  })

  test('Should fill and save schema bytes correctly', async () => {
    Allure.addDescription('This test verifies that schema items are filled and saved correctly.')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await schemaBytesPage.addDataManually()
    await schemaBytesPage.fillSchemaBytes()
    await schemaBytesPage.saveSchemaByte()
    // await schemaBytesPage.verifySaveByteSuccessMessage()  //Toaster issue uncomment later
  })

  test('Edit schema byte and verify modal visibility', async () => {
  
    Allure.addDescription('Validates that clicking the edit schema byte button opens the edit schema byte modal')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
  
    await schemaBytesPage.editSchemaByte()
    await schemaBytesPage.verifyByteEditModal()
  })

  test('Search schema bytes with valid data', async () => {
    Allure.addDescription('This test verifies schema bytes search with valid data')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')

    await Allure.step('Search and verify schema bytes with valid data', async () => {
      await schemaBytesPage.searchSchemaBytes(true)
      await schemaBytesPage.assertSearchResults(true)
    })
  })

  test('Search schema bytes with invalid data', async () => {
    Allure.addDescription('This test verifies schema bytes search with invalid data')
    Allure.addSeverity('minor')
    Allure.addTag('smoke')

    await Allure.step('Search and verify schema schema with invalid data', async () => {
      await schemaBytesPage.searchSchemaBytes(false)
      await schemaBytesPage.assertSearchResults(false)
    })
  })

  test('Click Bytes Table Setting Icon', async ({ }) => {
    Allure.addDescription('Verifies that clicking the Bytes Table Setting Icon displays the settings options')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await schemaBytesPage.clickBytesTableSettingIcon()
    await schemaBytesPage.verifySettingOptionsVisible()
  })

  test('Click Bytes Table Select Button', async ({ }) => {
    Allure.addDescription('Verifies that clicking the Bytes Table Select Button displays the select options')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await schemaBytesPage.clickBytesTableSelectButton()
    await schemaBytesPage.verifySelectOptionsVisible()
  })

  test('Select bytes and verify select action options visible', async ({ }) => {
    Allure.addDescription('Ensures that after selecting bytes, the relevant action options are visible')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await schemaBytesPage.clickBytesTableSelectButton()
    await schemaBytesPage.clickSelectAllButton()
    await schemaBytesPage.verifySelectOptionsVisible()
  })

  test('Verify cancel schema deletion from bytes page', async () => {
    Allure.addDescription(
      'Validates that the schema deletion is cancelled '
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    await Allure.step('Verify schema deletion cancel ', async () => {
      await schemaBytesPage.clickBytesTableSettingIcon()
      await schemaBytesPage.bytesPageDeleteSchema('cancel')
      await schemaBytesPage.verifySchemaDeletionMessage(false)
    })
  })

  test('Verify confirm schema deletion from bytes page', async () => {
    Allure.addDescription(
      'Validates that confirming the schema deleted message is displayed'
    )
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    await Allure.step(
      'Opend setting of bytes page ,use delete and confirm deletion',
      async () => {
        await schemaBytesPage.clickBytesTableSettingIcon()
        await schemaBytesPage.bytesPageDeleteSchema('confirm')
        await schemaBytesPage.verifySchemaDeletionMessage(true)
      }
    )
  })

})
