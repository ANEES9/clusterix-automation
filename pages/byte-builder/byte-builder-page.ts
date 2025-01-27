import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { schemaTestData } from '../../utils/test-data/byte-builder/schema-data'  // Import test data

export class BytebuilderPage {
  private page: Page
  private newSchemaButton: Locator
  private schemaItemsText: Locator
  private newSchemaTitle: Locator
  private blankEditorText: Locator
  private textStringButton: Locator
  private fieldNameInput: Locator
  private markAsRequiredCheckbox: Locator
  private minLengthInput: Locator
  private maxLengthInput: Locator
  private minValueInput: Locator
  private maxValueInput: Locator
  private numberButton: Locator
  private editor: Locator
  private saveButton: Locator
  private previewButton: Locator
  private sortAndFilter: Locator
  private saveSchemaItem: Locator
  private schemaSearchInput: Locator
  private schemaTable: Locator
  

  static readonly URL = '/byte-builder/schemas'

  constructor(page: Page) {
    this.page = page
    this.newSchemaButton = page.getByText('New Schema')
    this.schemaItemsText = page.getByText('Schema Items')
    this.newSchemaTitle = page.getByText('Untitled Schema')
    this.blankEditorText = page.getByText('Drag items here to create a')
    this.textStringButton = page.getByRole('button', { name: 'Text/String' })
    this.fieldNameInput = page.getByLabel('Field Name')
    this.markAsRequiredCheckbox = page.getByText('Mark as required')
    this.minLengthInput = page.getByLabel('Minimum length')
    this.maxLengthInput = page.getByLabel('Maximum length')
    this.minValueInput = page.getByLabel(/Minimum value|Mindestwert/)
    this.maxValueInput = page.getByLabel(/Maximum value|Höchstwert/)
    this.numberButton = page.getByRole('button', { name: 'Number', exact: true })
    this.editor = page.locator('.KmXML_gio2Llo12cbPnM')
    this.saveButton = page.getByRole('button', { name: 'Save' })
    this.previewButton = page.getByText('Preview')
    this.sortAndFilter = page.locator(".DKlhwmQz8Dz6vg43LViW .ca-relative")
    this.saveSchemaItem = page.locator('.eUdBdLui1tyOVzm_tNNv > button:nth-child(5)')
    this.schemaSearchInput = page.getByPlaceholder(/Nach Schema-Namen suchen|Search by schema name/)
    this.schemaTable = page.locator('.SmartTable-module_tableWrapper__O2vT5')
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Bytebuilder Schemas URL', async () => {
      await this.page.goto(`${baseURL}${BytebuilderPage.URL}`)
    })
  }

  async clickNewSchemaButton() {
    await Allure.step('Click the New Schema button', async () => {
      await this.newSchemaButton.click()
    })
  }

  async verifySchemaTexts() {
    await Allure.step('Verify schema items text is visible', async () => {
      await expect(this.schemaItemsText).toBeVisible()
    })
  
    await Allure.step('Verify new schema Untitled Schema text is visible', async () => {
      await expect(this.newSchemaTitle).toBeVisible()
    })
  
    await Allure.step('Verify Drag items here text is visible', async () => {
      await expect(this.blankEditorText).toBeVisible()
    })
  }
  
  

  async addSchemaTitle(title: string) {
    await Allure.step('Add schema title', async () => {
      await this.page.locator('.CeBLE50naCMj4ftRCI5O').click() // Click on title input
      await this.page.locator('#undefined').getByRole('textbox').fill(title) // Fill title
      await this.page.locator('.styles-module_header__BJKu4').click() // Click header to confirm
    })
  }

  async dragAndDropTextString() {
    await Allure.step('Drag and drop Text/String button', async () => {
      await this.textStringButton.waitFor({ state: 'visible' })
      await this.textStringButton.dragTo(this.editor)
      await expect(this.editor).toContainText('Text/String')
    })
  }

  async fillTextField() {
    await Allure.step('Fill text field with test data and save', async () => {
      await this.fieldNameInput.fill(schemaTestData.fieldName)
      await this.markAsRequiredCheckbox.click()
      await this.minLengthInput.fill(schemaTestData.minLength)
      await this.maxLengthInput.fill(schemaTestData.maxLength)
      await this.sortAndFilter.nth(0).click()
      await this.sortAndFilter.nth(2).click()
      await this.sortAndFilter.nth(4).click()
      await this.saveSchemaItem.click()
    })
  }

  async verifyTextField() {
    await Allure.step('Verify the saved schema item for Text field', async () => {
      await Allure.step(`Verify the field name "${schemaTestData.fieldName}" is visible`, async () => {
        await expect(this.page.getByText(schemaTestData.fieldName)).toBeVisible()
      })
  
      await Allure.step('Verify the field options "Required, Sort, Filter, Search" are visible', async () => {
        await expect(this.page.getByText('Required, Sort, Filter, Search')).toBeVisible()
      })
  
      await Allure.step('Click on the Preview button', async () => {
        await this.previewButton.click()
      })
  
      await Allure.step(`Verify the label for "${schemaTestData.fieldName}" is visible in preview`, async () => {
        await expect(this.page.getByLabel(schemaTestData.fieldName)).toBeVisible()
      })
    })
  }
  

  async dragAndDropNumber() {
    await Allure.step('Drag and drop Number button', async () => {
      await this.numberButton.waitFor({ state: 'visible' })
      await this.numberButton.dragTo(this.editor)
      await expect(this.editor).toContainText('Number')
    })
  }

  async fillNumberField() {
    await Allure.step('Fill number field with test data and save', async () => {
      await this.fieldNameInput.fill(schemaTestData.numberFieldName)
      await this.markAsRequiredCheckbox.click()
      await this.minValueInput.fill(schemaTestData.minValue)
      await this.maxValueInput.fill(schemaTestData.maxValue)
      await this.sortAndFilter.nth(0).click()
      await this.sortAndFilter.nth(2).click()
      await this.sortAndFilter.nth(4).click()
      await this.saveSchemaItem.click()
    })
  }

  async fillNumberMultipleField() {
    await Allure.step('Fill number field with test data and save', async () => {
      await this.fieldNameInput.nth(1).fill(schemaTestData.numberFieldName)
      await this.markAsRequiredCheckbox.nth(1).click()
      await this.minValueInput.fill(schemaTestData.minValue)
      await this.maxValueInput.fill(schemaTestData.maxValue)
      await this.sortAndFilter.nth(6).click()
      await this.sortAndFilter.nth(8).click()
      await this.sortAndFilter.nth(10).click()
      await this.saveSchemaItem.nth(1).click()
    })
  }

  async verifyNumberField() {
    await Allure.step('Verify the saved schema item for Number field', async () => {
      await Allure.step(`Verify the field name "${schemaTestData.numberFieldName}" is visible`, async () => {
        await expect(this.page.getByText(schemaTestData.numberFieldName, { exact: true })).toBeVisible()
      })
  
      await Allure.step('Verify the field options "Required, Sort, Filter, Search" are visible', async () => {
        await expect(this.page.getByText('Required, Sort, Filter, Search')).toBeVisible()
      })
  
      await Allure.step('Click on the Preview button', async () => {
        await this.previewButton.click()
      })
  
      await Allure.step(`Verify the label for "${schemaTestData.numberFieldName}" is visible in preview`, async () => {
        await expect(this.page.getByLabel(schemaTestData.numberFieldName)).toBeVisible()
      })
    })
  }
  
  async saveSchema() {
    await Allure.step('Save schema', async () => {
      await this.saveButton.waitFor({ state: 'visible' }) // Ensure the button is visible
      await this.saveButton.click() // Click the Save button
    })
  }  

async verifySchemaPublished() {
  await Allure.step('Verify schema is published', async () => {
    await this.page.waitForLoadState('networkidle') // Wait for the network to be idle
    await this.page.waitForLoadState('domcontentloaded') // Wait for DOM content to load
    await Allure.step('Check if the "Schema published" message is visible', async () => {
      await expect(this.page.getByText('Schema published')).toBeVisible()
    })
  })
}

// async searchSchemaByTitle() {
//   await Allure.step(`Search for schema by title: ${schemaTestData.schemaTitle}`, async () => {
//     await this.page.waitForLoadState('networkidle')
//     await this.schemaSearchInput.fill(schemaTestData.schemaTitle)
//     await this.page.waitForLoadState('networkidle')
//   })
// }

// async verifySchemaInTable() {
//   await Allure.step('Verify the schema appears in the table', async () => {
//     await this.schemaTable.waitFor({ state: 'visible' })
//     await expect(this.schemaTable).toContainText(schemaTestData.schemaTitle)
//   })
// }

async searchSchema(title: string) {
  await Allure.step(`Search for schema: ${title}`, async () => {
    await this.page.waitForLoadState('networkidle')
    await this.schemaSearchInput.isVisible()
    await this.schemaSearchInput.fill(title)
    await this.page.waitForLoadState('networkidle')
  })
}

async assertSchemaPresence(title: string, shouldExist: boolean) {
  await Allure.step(
    `Verify schema "${title}" ${shouldExist ? 'is present' : 'is not present'} in the table`,
    async () => {
      await this.schemaTable.waitFor({ state: 'visible' })
      if (shouldExist) {
        await expect(this.schemaTable).toContainText(title)
      } else {
        await expect(this.schemaTable).not.toContainText(title)
      }
    }
  )
}
  
  // getPage() {
  //   return this.page
  // }
}
