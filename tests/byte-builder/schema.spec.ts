import { test, expect, TestInfo } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { BytebuilderPage } from '../../pages/byte-builder/byte-builder-page'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { schemaTestData } from '../../utils/test-data/byte-builder/schema-data'  // Import test data

test.describe('Bytebuilder > Schema Tests', () => {
  let bytebuilderPage: BytebuilderPage

  test.beforeEach(async ({ page, baseURL }, testInfo: TestInfo) => {
    Allure.addEpic('Byte Builder Schema')
    Allure.addFeature('Schema Management')
    Allure.addAppOwner('Bytebuilder')

    bytebuilderPage = new BytebuilderPage(page)
    await Allure.step('Navigate to Builder page', async () => {
      await bytebuilderPage.goto(baseURL)
    })

    await Allure.step('Skip survey', async () => {
      await skipSurveyHelper(page, testInfo)
    })

    await Allure.step('Close welcome popup', async () => {
      await skipProductTourHelper(page, testInfo)
    })

    await Allure.step('Close timer popup', async () => {
      await closeTimerPopUp(page)
    })

    await Allure.step('Add cursor style and script', async () => {
      await addCursorStyleAndScript(page)
    })

    await Allure.step('Wait for network idle', async () => {
      await page.waitForLoadState('networkidle')
    })
  })

  test('Verify New Schema button functionality', async () => {
    Allure.addDescription('Verifies the functionality of the New Schema button and ensures page elements are loaded correctly.')
    // Allure.addTag('new-schema-button')
    await Allure.step('Click New Schema button and verify the page elements', async () => {
      await bytebuilderPage.clickNewSchemaButton()
      await bytebuilderPage.verifySchemaTexts()  // Verifying page state after the button click
    })
  })

  test('Verify Text Schema Item', async ({ page }) => {
    Allure.addDescription('Verifies the functionality of adding a Text schema item, filling in data, and previewing it.')
    // Allure.addTag('text-schema-item')
    await Allure.step('Create schema, add Text field, fill data, and verify preview', async () => {
      await bytebuilderPage.clickNewSchemaButton()
      await bytebuilderPage.dragAndDropTextString()
      await bytebuilderPage.fillTextField()
      await bytebuilderPage.verifyTextField()
    })
  })

  test('Verify Number Schema Item', async () => {
    Allure.addDescription('Verifies the functionality of adding a Number schema item, filling in data, and previewing it.')
    // Allure.addTag('number-schema-item')
    await Allure.step('Create schema, add Text field, fill data, and verify preview', async () => {
      await bytebuilderPage.clickNewSchemaButton()
      await bytebuilderPage.dragAndDropNumber()
      await bytebuilderPage.fillNumberField()
      await bytebuilderPage.verifyNumberField()
    })
  })

  test('Create and Save Schema with Items', async () => {
    Allure.addDescription('Verifies the functionality of creating a schema with multiple items, saving it, and checking if it is published.')
    // Allure.addTag('create-save-schema') 
    await Allure.step('Create schema, drag schema items, fill data, and verify preview', async () => {
      await bytebuilderPage.clickNewSchemaButton()
      await bytebuilderPage.addSchemaTitle(schemaTestData.schemaTitle)
      await bytebuilderPage.dragAndDropTextString()
      await bytebuilderPage.fillTextField()
      await bytebuilderPage.dragAndDropNumber()
      await bytebuilderPage.fillNumberMultipleField()
      await bytebuilderPage.saveSchema()
      await bytebuilderPage.verifySchemaPublished()
    })
  })

  test('Verify valid schema search', async () => {
    Allure.addDescription('Validates that a valid schema title appears in the table when searched.')
    Allure.addTag('search')
    await Allure.step('Search for a valid schema and verify it is present', async () => {
      await bytebuilderPage.searchSchema(schemaTestData.schemaTitle)
      await bytebuilderPage.assertSchemaPresence(schemaTestData.schemaTitle, true)
    })
  })

  test.only('Verify invalid schema search', async () => {
    Allure.addDescription('Validates that a non-existent schema title does not appear in the table.')
    Allure.addTag('search')
    await Allure.step('Search for an invalid schema and verify it is not present', async () => {
      await bytebuilderPage.searchSchema(schemaTestData.invalidSearchTitle)
      await bytebuilderPage.assertSchemaPresence(schemaTestData.invalidSearchTitle, false) // Assert it is not present
    })
  })
  
})
