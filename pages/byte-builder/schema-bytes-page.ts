import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { schemaTestData } from 'utils/test-data/byte-builder/schema-data'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'
import { faker } from '@faker-js/faker'


export class SchemaBytesPage {
  private page: Page
  private translations: Record<string, any>

  private addDataManuallyButton: Locator
  private addSchemaItemButton: Locator
  private addSchemaItemPageTitle: Locator
  private cancelSchemaItemButton: Locator

  private textField: Locator
  private numberField: Locator
  private requiredText: Locator
  private textLengthError: Locator
  private numberRangeError: Locator
  private saveByteSuccessMessage: Locator
  private searchByte: Locator
  private bytesTable: Locator
  private bytesTableSettingIcon: Locator
  private bytesTableSelectButton: Locator
  private schemaEditButton: Locator
  private importFileButton: Locator
  private exportAllDataButton: Locator
  private schemaDeleteButton: Locator
  private selectAllButton: Locator
  private exportSelectionButton: Locator
  private deleteSelectionButton: Locator
  private selectedText: Locator
  private editSchemaByteButton: Locator
  private updateSchemaByteModalTitle: Locator
  private updateSchemaByteButton: Locator
  private confirmDeleteButton: Locator
  private cancelDeleteButton: Locator
  private schemaDeletionMessage: Locator
  private textFieldData: string[] = []
  private numberFieldData: string[] = []


  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('byte-builder', locale)

    this.addDataManuallyButton = page.getByRole('button', { name: this.translations.schema_page.blank_page.add_manually })
    this.addSchemaItemButton = page.getByRole('button', { name: this.translations.schema_page.add_data })
    this.addSchemaItemPageTitle = page.getByText(this.translations.schema_page.edit_panel.add_data, { exact: true })
    this.cancelSchemaItemButton = page.getByRole('button', { name: this.translations.common.cancel })
    this.textField = page.getByLabel(schemaTestData.textFieldName)
    this.numberField = page.getByLabel(schemaTestData.numberFieldName)
    this.requiredText = page.getByText(this.translations.create_schema.create_tab.required)
    this.textLengthError = page.getByText(
      this.translations.validations.between_length.replace('{{min}}', schemaTestData.minLength).replace('{{max}}', schemaTestData.maxLength)
    )
    this.numberRangeError = page.getByText(
      this.translations.validations.between_value.replace('{{min}}', schemaTestData.minValue).replace('{{max}}', schemaTestData.maxValue)
    )
    this.saveByteSuccessMessage = page.getByText(this.translations.redux.success.add_byte)
    this.searchByte =  page.getByRole('textbox', { name: this.translations.schema_page.search_data_placeholder, })
    this.bytesTable = page.locator('.SmartTable-module_tableWrapper__O2vT5')
    this.bytesTableSettingIcon =  page.locator('button.Bar-module_part__CpFuS').nth(1)
    this.bytesTableSelectButton = page.locator('button.Bar-module_part__CpFuS').first()
    this.schemaEditButton = page.getByRole('button', { name: this.translations.schema_page.edit_schema, })
    this.schemaDeleteButton = page.getByRole('button', { name: this.translations.schema_page.delete_schema.label, })
    this.importFileButton = page.getByRole('button', { name: this.translations.schema_page.import_from_file, })
    this.exportAllDataButton = page.getByRole('button', { name: this.translations.schema_page.export_all, })
    this.selectAllButton = page.getByText(this.translations.additional.select_all)
    this.exportSelectionButton = page.getByText(this.translations.additional.export_selected)
    this.deleteSelectionButton = page.getByText(this.translations.additional.delete_selected)
    this.selectedText = page.getByText(this.translations.additional.selected)
    this.editSchemaByteButton = page.locator('.DRwDheUAGb0GrsZrlegi').first()
    this.updateSchemaByteModalTitle = page.getByText(this.translations.schema_page.edit_panel.update_data).first()
    this.updateSchemaByteButton = page.getByRole('button', { name: this.translations.schema_page.edit_panel.update_data, })
    this.confirmDeleteButton = this.page.getByRole('button', { name: this.translations.common.confirm, })
    this.cancelDeleteButton = this.page.getByRole('button', { name: this.translations.common.cancel, })
    this.schemaDeletionMessage = this.page.locator(`text=${this.translations.redux.success.delete_schema}`)
    this.textFieldData = []
    this.numberFieldData = []
  }


  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Bytebuilder URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.byteBuilder.base}`)
    })
  }

  async addDataManually() {
    await Allure.step('Click Add Data Manually button', async () => {
      await this.addDataManuallyButton.click()
    })
  }

  async addSchemaItem() {
    await Allure.step('Click Add Schema Item button', async () => {
      await this.addSchemaItemButton.click()
    })
  }

  async verifyPageElements() {
    await Allure.step('Verify Schema item creation page elements are visible', async () => {
      await Allure.step('Verify Add Schema Item Page Title is visible', async () => {
        await expect(this.addSchemaItemPageTitle).toBeVisible()
      })
      await Allure.step('Verify Text/string Field is visible', async () => {
        await expect(this.textField).toBeVisible()
      })
      await Allure.step('Verify Number Field is visible', async () => {
        await expect(this.numberField).toBeVisible()
      })
      await this.cancelSchemaItemAddPage()
    })
  }

  async cancelSchemaItemAddPage() {
    await Allure.step('Cancel/Close Schema Item Add Page', async () => {
      await this.cancelSchemaItemButton.click()
    })
  }

  async validateMandatoryFields() {
    await Allure.step('Verify Required Text is visible', async () => {
      await expect(this.requiredText.first()).toBeVisible()
      // await expect(this.requiredText.nth(1)).toBeVisible()
      await this.cancelSchemaItemAddPage()
    })
  }

  async fillTextFieldConditional(length: number) {
    await Allure.step(`Fill text field with ${length} characters`, async () => {
      await this.textField.fill('a'.repeat(length))
    })
  }


async verifyTextFieldLengthError(shouldBeVisible: boolean) {
  await Allure.step(`Verify text length error should ${shouldBeVisible ? 'appear' : 'not appear'}`, async () => {
    if (shouldBeVisible) {
      await expect(this.textLengthError).toBeVisible()
    } else {
      await expect(this.textLengthError).not.toBeVisible()
    }
    await this.cancelSchemaItemAddPage()
  })
}

  async fillNumberField(value: number) {
    await Allure.step(`Fill number field with value ${value}`, async () => {
      await this.numberField.fill(value.toString())
    })
  }

  async verifyNumberValueError(shouldBeVisible: boolean) {
    await Allure.step(`Verify number value error ${shouldBeVisible ? 'is' : 'is not'} visible`, async () => {
      if (shouldBeVisible) {
        await expect(this.numberRangeError).toBeVisible()
      } else {
        await expect(this.numberRangeError).not.toBeVisible()
      }
      await this.cancelSchemaItemAddPage()
    })
  }

  async fillSchemaBytes() {
    await Allure.step(`Fill schema items with random data`, async () => {
      const textData = faker.person.fullName()
        .trim() 
        .padEnd(parseInt(schemaTestData.minLength), 'X')
        .slice(0, parseInt(schemaTestData.maxLength))

      const numberData = faker.number.int({
        min: parseInt(schemaTestData.minValue),
        max: parseInt(schemaTestData.maxValue)
      }).toString()
      // Store data for later use in search test cases
      this.textFieldData.push(textData)
      this.numberFieldData.push(numberData)

      await this.textField.waitFor({ state: 'visible' })
      await this.textField.fill(textData)

      // Uncomment if using number field
      // await this.numberField.waitFor({ state: 'visible' })
      // await this.numberField.fill(numberFieldName)
    })
  }


  async saveSchemaByte() {
    await Allure.step('Save schema item', async () => {
      await this.addSchemaItemButton.waitFor({ state: 'visible' })
      await this.addSchemaItemButton.click()
      await this.page.waitForLoadState('networkidle')
    })
  }

  async verifySaveByteSuccessMessage() {
    await Allure.step('Save schema item', async () => {
      await this.page.waitForLoadState('networkidle')
      await expect(this.saveByteSuccessMessage).toBeVisible()

    })
  }

  async searchSchemaBytes(isValid: boolean) {
    await Allure.step(`Search schema using ${isValid ? 'valid' : 'invalid'} data`, async () => {
      const searchQuery = isValid 
        ? this.textFieldData[0]  // Use stored valid data
        : `${this.textFieldData[0]}XYZ` // Make it invalid by appending extra characters
  
      // Ensure search input is visible before interacting
      await this.searchByte.waitFor({ state: 'visible' })
      await this.searchByte.fill(searchQuery)
      await this.page.keyboard.press('Enter')
    })
  }

  async assertSearchResults(isValid: boolean) {
    await Allure.step(`Verify search results for ${isValid ? 'valid' : 'invalid'} data`, async () => {
      if (isValid) {
        await expect(this.bytesTable).toContainText(this.textFieldData[0]) // ✅ Expect valid result
      } else {
        await expect(this.bytesTable).toBeVisible() // ❌ Expect no results for invalid search
      }
    })
  }

  async clickBytesTableSettingIcon() {
    await Allure.step('Click Bytes Table Setting Icon', async () => {
      await this.bytesTableSettingIcon.click()
    })
  }

  async clickBytesTableSelectButton() {
    await Allure.step('Click Bytes Table Select Button', async () => {
      await this.bytesTableSelectButton.click()
    })
  }

  async verifySettingOptionsVisible() {
    await Allure.step('Verify "Edit Schema" button is visible', async () => {
      await expect(this.schemaEditButton).toBeVisible()
    })

    await Allure.step('Verify "Delete Schema" button is visible', async () => {
      await expect(this.schemaDeleteButton).toBeVisible()
    })

    await Allure.step('Verify "Import from File" button is visible', async () => {
      await expect(this.importFileButton).toBeVisible()
    })

    await Allure.step('Verify "Export All Data" button is visible', async () => {
      await expect(this.exportAllDataButton).toBeVisible()
    })
  }

  async verifySelectOptionsVisible() {
    await Allure.step('Verify "Select All" button is visible', async () => {
      await expect(this.selectAllButton).toBeVisible()
    })
  
    await Allure.step('Verify "Selected" text is visible', async () => {
      await expect(this.selectedText).toBeVisible()
      this.clickBytesTableSelectButton()
    })
  }
  
  async clickSelectAllButton() {
    await Allure.step('Click Select All Button', async () => {
      await this.selectAllButton.click()
    })
  }

  async verifySelectionActionsVisible() {
    await Allure.step('Verify "Export Selection" button is visible', async () => {
      await expect(this.exportSelectionButton).toBeVisible()
    })
  
    await Allure.step('Verify "Delete Selection" button is visible', async () => {
      await expect(this.deleteSelectionButton).toBeVisible()
    })
  }

  async editSchemaByte() {
    await Allure.step('Click on the first schema byte edit button', async () => {
      await this.editSchemaByteButton.click()
    })
  }

  async verifyByteEditModal() {
    await Allure.step('Verify that the "Update Data" modal title is visible', async () => {
      await this.updateSchemaByteModalTitle.waitFor({ state: 'visible' })
      await expect(this.updateSchemaByteModalTitle).toBeVisible()
    })
  
    await Allure.step('Verify Text/string Field is visible', async () => {
      await expect(this.textField).toBeVisible()
    })
    await Allure.step('Verify Number Field is visible', async () => {
      await expect(this.numberField).toBeVisible()
    })
  
    await Allure.step('Verify that the "Update Data" button is visible', async () => {
      await expect(this.updateSchemaByteButton).toBeVisible()
      await this.cancelSchemaItemAddPage()
    })
  }
  
  // async bytesPageDeleteSchema() {
  //   await Allure.step('Click on the "Delete Schema" button', async () => {
  //     await this.schemaDeleteButton.click()
  //   })
  // }

  async bytesPageDeleteSchema(action: 'confirm' | 'cancel') {
    await Allure.step(
      `Delete schema: ${schemaTestData.schemaTitleForBytesTest}`,
      async () => {
        await this.schemaDeleteButton.click()

        if (action === 'confirm') {
          await this.confirmDeleteButton.click()
        } else {
          await this.cancelDeleteButton.click()
        }
      }
    )
  }

  async verifySchemaDeletionMessage(shouldExist: boolean) {
    await Allure.step('Verify schema deletion message', async () => {

      if (shouldExist) {
        await this.page.waitForLoadState('networkidle')
        await this.schemaDeletionMessage.waitFor({ state: 'visible' })
        await expect(this.schemaDeletionMessage).toBeVisible()
      } else {
        await expect(this.schemaDeletionMessage).not.toBeVisible()
      }
    })
  }

}
