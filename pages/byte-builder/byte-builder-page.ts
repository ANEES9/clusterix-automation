import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { schemaTestData } from 'utils/test-data/byte-builder/schema-data'
import { getTranslations } from 'common/get-translations-helper'

export class BytebuilderPage {
  private page: Page
  private translations: Record<string, any>

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
  private fieldOptionsLocator: Locator
  private editor: Locator
  private saveButton: Locator
  private previewButton: Locator
  private sortAndFilter: Locator
  private saveSchemaItem: Locator
  private schemaSearchInput: Locator
  private schemaTable: Locator
  private openSchemaTitleInputField: Locator
  private schemaActionLocator: Locator
  private schemaHomeButton: Locator
  private schemasHomePageTitle: Locator
  private importSchemaButton: Locator
  private schemaCancelButton: Locator
  private schemaCloseButton: Locator
  private schemaCancelConfimModal: Locator
  private ConfirmationModalCancel: Locator
  private ConfirmationModalConfirm: Locator
  private schemaCancelConfimModalTitle: Locator
  private schemaCancelConfimModalMessage: Locator

  static readonly URL = '/byte-builder/schemas'

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('byte-builder', locale)

    this.newSchemaButton = page.getByText(
      this.translations.schemas_page.new_schema
    )
    this.schemaItemsText = page.getByText(
      this.translations.create_schema.side_panel.schema_items
    )
    this.newSchemaTitle = page.getByText(
      this.translations.create_schema.title_placeholder
    )
    this.blankEditorText = page.getByText(
      this.translations.create_schema.create_tab.drag_items
    )
    this.textStringButton = page.getByRole('button', { name: 'Text/String' })
    this.fieldNameInput = page.getByLabel(
      this.translations.create_schema.create_tab.field_name
    )
    this.markAsRequiredCheckbox = page.getByText(
      this.translations.create_schema.create_tab.mark_required
    )
    this.minLengthInput = page.getByLabel(
      this.translations.create_schema.create_tab.minimum_length
    )
    this.maxLengthInput = page.getByLabel(
      this.translations.create_schema.create_tab.maximum_length
    )
    this.minValueInput = page.getByLabel(
      this.translations.create_schema.create_tab.minimum_value
    )
    this.maxValueInput = page.getByLabel(
      this.translations.create_schema.create_tab.maximum_value
    )
    this.numberButton = page.getByRole('button', {
      name: 'Number',
      exact: true,
    })
    this.fieldOptionsLocator = page.getByText('Required, Sort, Filter, Search')
    this.editor = page.locator('.KmXML_gio2Llo12cbPnM')
    this.saveButton = page.getByRole('button', {
      name: this.translations.common.save,
    })
    this.previewButton = page.getByText(this.translations.create_schema.preview)
    this.sortAndFilter = page.locator('.DKlhwmQz8Dz6vg43LViW .ca-relative')
    this.saveSchemaItem = page.locator(
      '.eUdBdLui1tyOVzm_tNNv > button:nth-child(5)'
    )
    this.schemaSearchInput = page.getByPlaceholder(
      this.translations.schemas_page.search_placeholder
    )
    this.schemaTable = page.locator('.SmartTable-module_tableWrapper__O2vT5')
    this.openSchemaTitleInputField = page.locator(
      '[id="headlessui-control-\\:ri\\:"]'
    )
    this.schemaActionLocator = page.locator(
      `tr:has-text("${schemaTestData.schemaTitle}") div.DRwDheUAGb0GrsZrlegi.BaseCellWrapper-module_wrapper__XCaQu svg`
    )
    this.schemaHomeButton = page.getByRole('button', { name: 'Schemas' })
    this.schemasHomePageTitle = page
      .getByText(this.translations.pages.schemas)
      .nth(2)
    this.importSchemaButton = page.getByRole('button', {
      name: this.translations.schemas_page.import,
    })
    this.schemaCancelButton = page.getByRole('button', {
      name: this.translations.common.cancel,
    })
    this.schemaCloseButton = page.locator(
      '.styles-module_headerCloseButton__x2ELS'
    )
    this.schemaCancelConfimModal = page.locator('#confirm-modal')
    this.ConfirmationModalCancel = page
      .locator('#confirm-modal')
      .getByRole('button', { name: this.translations.common.cancel })
    this.ConfirmationModalConfirm = page.getByRole('button', {
      name: this.translations.common.confirm,
    })
    this.schemaCancelConfimModalTitle = page.getByText(
      this.translations.create_schema.delete.title
    )
    this.schemaCancelConfimModalMessage = page.getByText(
      this.translations.create_schema.delete.message
    )
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

    await Allure.step(
      'Verify new schema Untitled Schema text is visible',
      async () => {
        await expect(this.newSchemaTitle).toBeVisible()
      }
    )

    await Allure.step('Verify Drag items here text is visible', async () => {
      await expect(this.blankEditorText).toBeVisible()
    })
  }

  async addSchemaTitle(title: string) {
    await Allure.step('Add schema title', async () => {
      await this.page.locator('.CeBLE50naCMj4ftRCI5O').click()
      await this.page.locator('#undefined').getByRole('textbox').fill(title)
      await this.page.locator('.styles-module_header__BJKu4').click()
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
    await Allure.step(
      'Verify the saved schema item for Text field',
      async () => {
        await Allure.step(
          `Verify the field name "${schemaTestData.fieldName}" is visible`,
          async () => {
            await expect(
              this.page.getByText(schemaTestData.fieldName)
            ).toBeVisible()
          }
        )

        // await Allure.step('Verify the field options "Required, Sort, Filter, Search" are visible', async () => {
        //   await expect(this.fieldOptionsLocator).toBeVisible()
        // })

        await Allure.step('Click on the Preview button', async () => {
          await this.previewButton.click()
        })

        await Allure.step(
          `Verify the label for "${schemaTestData.fieldName}" is visible in preview`,
          async () => {
            await expect(
              this.page.getByLabel(schemaTestData.fieldName)
            ).toBeVisible()
          }
        )
      }
    )
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
    await Allure.step(
      'Verify the saved schema item for Number field',
      async () => {
        await Allure.step(
          `Verify the field name "${schemaTestData.numberFieldName}" is visible`,
          async () => {
            await expect(
              this.page.getByText(schemaTestData.numberFieldName, {
                exact: true,
              })
            ).toBeVisible()
          }
        )

        // await Allure.step('Verify the field options "Required, Sort, Filter, Search" are visible', async () => {
        //   await expect(this.fieldOptionsLocator).toBeVisible()
        // })

        await Allure.step('Click on the Preview button', async () => {
          await this.previewButton.click()
        })

        await Allure.step(
          `Verify the label for "${schemaTestData.numberFieldName}" is visible in preview`,
          async () => {
            await expect(
              this.page.getByLabel(schemaTestData.numberFieldName)
            ).toBeVisible()
          }
        )
      }
    )
  }

  async saveSchema() {
    await Allure.step('Save schema', async () => {
      await this.saveButton.waitFor({ state: 'visible' })
      await expect(this.saveButton).toBeEnabled()
      await this.saveButton.click()
      await this.page.waitForLoadState('networkidle')
    })
  }

  async verifySchemaPublished() {
    await Allure.step('Verify schema is published', async () => {
      await Allure.step(
        'Check if the "Schema published" message is visible',
        async () => {
          const schemaPublishedMessage =
            this.translations.redux.success.publish_schema

          await this.page.waitForSelector(`text=${schemaPublishedMessage}`, {
            state: 'visible',
          })
          await expect(
            this.page.getByText(schemaPublishedMessage)
          ).toBeVisible()
        }
      )
    })
  }

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

  async editSchema() {
    await Allure.step('Edit schema', async () => {
      await this.schemaActionLocator.nth(0).click()
      await this.page.waitForLoadState('networkidle')
    })
  }

  async verifyEditSchema() {
    await Allure.step(
      'Verify the saved schema items for Text and Number fields',
      async () => {
        await Allure.step(
          `Verify the text field name "${schemaTestData.fieldName}" is visible`,
          async () => {
            await expect(
              this.page.getByText(schemaTestData.fieldName)
            ).toBeVisible()
          }
        )
        await Allure.step(
          `Verify the number field name "${schemaTestData.numberFieldName}" is visible`,
          async () => {
            await expect(
              this.page.getByText(schemaTestData.numberFieldName, {
                exact: true,
              })
            ).toBeVisible()
          }
        )
        // await Allure.step('Verify the field options "Required, Sort, Filter, Search" are visible for both fields', async () => {
        //   await expect(this.fieldOptionsLocator.first()).toBeVisible()
        //   await expect(this.fieldOptionsLocator.nth(1)).toBeVisible()
        // })
        await Allure.step('Click on the Preview button', async () => {
          await this.previewButton.click()
        })
        await Allure.step(
          `Verify the label for "${schemaTestData.fieldName}" is visible in preview`,
          async () => {
            await expect(
              this.page.getByLabel(schemaTestData.fieldName)
            ).toBeVisible()
          }
        )
        await Allure.step(
          `Verify the label for "${schemaTestData.numberFieldName}" is visible in preview`,
          async () => {
            await expect(
              this.page.getByLabel(schemaTestData.numberFieldName)
            ).toBeVisible()
          }
        )
      }
    )
  }

  async openSavedSchema() {
    await Allure.step('Open the schema for creation', async () => {
      await this.schemaActionLocator.nth(1).click()
      await this.page.reload()
      await this.page.waitForLoadState('networkidle')
    })
  }

  async verifyNewlyCreatedSchema() {
    await Allure.step('Verify the opened schema and its content', async () => {
      await Allure.step('Verify the schema title is visible', async () => {
        await expect(this.page.locator('#root')).toContainText(
          schemaTestData.schemaTitle
        )
      })

      await Allure.step(
        'Verify "Welcome to your schema" is visible',
        async () => {
          await expect(
            this.page.getByText(
              this.translations.schema_page.blank_page.welcome
            )
          ).toBeVisible()
        }
      )

      await Allure.step(
        'Verify "Import your data or add it" is visible',
        async () => {
          await expect(
            this.page.getByText(
              this.translations.schema_page.blank_page.import_your_data
            )
          ).toBeVisible()
        }
      )

      await Allure.step(
        'Verify "Add data manually" button is visible',
        async () => {
          await expect(
            this.page.getByRole('button', {
              name: this.translations.schema_page.blank_page.add_manually,
            })
          ).toBeVisible()
        }
      )

      await Allure.step(
        'Verify "Import from File" button is visible',
        async () => {
          await expect(
            this.page.getByRole('button', {
              name: this.translations.schema_page.blank_page.import_file,
            })
          ).toBeVisible()
        }
      )
    })
  }

  async editSchemaTitle(newTitle: string) {
    await Allure.step(`Edit schema title to: ${newTitle}`, async () => {
      await this.page
        .locator('span')
        .filter({ hasText: schemaTestData.schemaTitle })
        .click()
      await this.openSchemaTitleInputField.fill(newTitle)
      await this.openSchemaTitleInputField.press('Enter')
      await this.page.waitForLoadState('networkidle')
    })
  }

  async verifySchemaTitle(expectedTitle: string) {
    await Allure.step(
      `Verify schema title is updated to: ${expectedTitle}`,
      async () => {
        await expect(
          this.page.locator('span').filter({ hasText: expectedTitle })
        ).toBeVisible()
      }
    )
  }

  async clickSchemaButton() {
    await Allure.step('Click on the Schemas button', async () => {
      await this.schemaHomeButton.click()
      await this.page.waitForLoadState('networkidle')
    })
  }

  async verifyHomePage() {
    await Allure.step('Verify navigation to the home page', async () => {
      await expect(this.schemasHomePageTitle).toBeVisible()
      await expect(this.schemaSearchInput).toBeVisible()
      await expect(this.importSchemaButton).toBeVisible()
      await expect(this.newSchemaButton).toBeVisible()
    })
  }

  async clickSchemaCancelButton() {
    await Allure.step('Click Schema Cancel button', async () => {
      await this.schemaCancelButton.click()
    })
  }

  async clickSchemaCloseButton() {
    await Allure.step('Click Schema Close button', async () => {
      await this.schemaCloseButton.click()
    })
  }
  async verifySchemaCancelModal() {
    await Allure.step(
      'Verify schema cancel confirmation modal text and buttons',
      async () => {
        await expect(this.schemaCancelConfimModalTitle).toBeVisible()
        await expect(this.schemaCancelConfimModalMessage).toBeVisible()
        await expect(this.ConfirmationModalCancel).toBeVisible()
        await expect(this.ConfirmationModalConfirm).toBeVisible()
      }
    )
  }

  async clickCancel() {
    await Allure.step(
      'Click on the Cancel button in the schema cancel confirmation modal',
      async () => {
        await this.ConfirmationModalCancel.click()
      }
    )
  }

  async clickConfirm() {
    await Allure.step(
      'Click on the Confirm button in the schema cancel confirmation modal',
      async () => {
        await this.ConfirmationModalConfirm.click()
      }
    )
  }

  async verifyModalClosedAfterCancel() {
    await Allure.step(
      'Verify the schema cancel confirmation modal is closed and schema items list is visible after clicking Cancel',
      async () => {
        await expect(this.schemaCancelConfimModal).not.toBeVisible()
        await expect(this.schemaItemsText).toBeVisible()
      }
    )
  }

  async verifyModalClosedAfterConfirm() {
    await Allure.step(
      'Verify the schema cancel confirmation modal is closed and home page elements are visible after clicking Confirm',
      async () => {
        await expect(this.schemaCancelConfimModal).not.toBeVisible()
        await expect(this.schemasHomePageTitle).toBeVisible()
        await expect(this.schemaSearchInput).toBeVisible()
        await expect(this.importSchemaButton).toBeVisible()
        await expect(this.newSchemaButton).toBeVisible()
      }
    )
  }

  async deleteSchema(action: 'confirm' | 'cancel') {
    await Allure.step(
      `Delete schema: ${schemaTestData.schemaTitle}`,
      async () => {
        await this.schemaActionLocator.nth(2).click()

        const confirmButtonText = this.translations.common.confirm
        const cancelButtonText = this.translations.common.cancel

        if (action === 'confirm') {
          await this.page
            .getByRole('button', { name: confirmButtonText })
            .click()
        } else if (action === 'cancel') {
          await this.page
            .getByRole('button', { name: cancelButtonText })
            .click()
        }
      }
    )
  }

  async verifySchemaDeletionMessage(shouldExist: boolean) {
    await Allure.step('Verify schema deletion message', async () => {
      const deletionMessageLocator = this.page.locator(
        `text=${this.translations.redux.success.delete_schema}`
      )

      if (shouldExist) {
        await this.page.waitForLoadState('networkidle')
        await deletionMessageLocator.waitFor({ state: 'visible' })
        await expect(deletionMessageLocator).toBeVisible()
      } else {
        await expect(deletionMessageLocator).not.toBeVisible()
      }
    })
  }
}
