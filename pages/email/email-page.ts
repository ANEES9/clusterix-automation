import { Page, Locator, expect, TestInfo } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'

export class EmailPage {
  private page: Page
  private translations: Record<string, any>

  private currentApp: Locator
  private email: Locator
  private newEmail: Locator
  private toAddress: Locator
  private emailSubject: Locator
  private emailBody: Locator
  private sendEmail: Locator
  private emailSuccessfulToastMessage: Locator
  private firstEmail: Locator
  private topForwardEmail: Locator
  private settings: Locator
  private composeAndReply: Locator
  private manageSignature: Locator
  private addSignature: Locator
  private addSignatureTitle: Locator
  private addSignatureBody: Locator
  private saveSignature: Locator
  private editSignature!: Locator
  private selectSignature!: Locator
  private deleteSignature!: Locator
  private topReplyEmail: Locator
  private confirmPopup: Locator
  private createFolder: Locator
  private createFolderConfirmation: Locator
  private folderName: Locator
  private saveFolder: Locator
  private folderSuccessfulToastMessage: Locator
  private duplicateFolderErrorToastMessage: Locator
  private emailNameDropdown: Locator
  private switchBetweenEmail!: Locator
  private switchBackToEmail!: Locator

  private inboxFolder: Locator
  private sentItemsFolder: Locator
  private junkEmailFolder: Locator
  private archiveFolder: Locator
  private deletedItemsFolder: Locator
  private draftsFolder: Locator
  private secheduledEmailsFolder: Locator

  private closeEditor: Locator
  private cancelFolderModal: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('email', locale)
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
    this.email = page.locator("//button[@title='Email']").first()
    this.newEmail = page.getByText(this.translations.mailbox.controls.newEmail)
    this.toAddress = page.getByLabel('To:')
    this.emailSubject = page.getByLabel('Subject:')
    this.emailBody = page.getByRole('textbox').nth(2)
    this.sendEmail = page.getByText('Send', { exact: true })
    this.emailSuccessfulToastMessage = page.getByText('Message has been sent')
    this.firstEmail = page.getByTestId('innomail-today-1')
    this.topForwardEmail = page
      .locator('#thread-action-bar')
      .getByText('Forward')
    this.settings = page.locator('.ca-flex > button').first()
    this.composeAndReply = page.getByRole('button', {
      name: 'Compose and Reply',
    })
    this.manageSignature = page.getByText('Manage signatures')
    this.addSignature = page.getByRole('button', { name: 'Add signature' })
    this.addSignatureTitle = page.getByLabel('Signature title')
    this.addSignatureBody = page
      .locator('#signature-editor-body')
      .getByRole('textbox')
    this.saveSignature = page.getByText('Save')
    this.topReplyEmail = page.locator('#thread-action-bar').getByText('Reply')
    this.confirmPopup = page.getByRole('button', { name: 'Confirm' })
    this.createFolder = page.getByRole('button', {
      name: this.translations.mailbox.controls.create_new_folder,
    })
    this.folderName = page.getByPlaceholder('Enter a name for the folder')
    this.saveFolder = page.getByText('Create folder')
    this.folderSuccessfulToastMessage = page.getByText(
      'The folder has been created'
    )
    this.duplicateFolderErrorToastMessage = page.getByText(
      "The Mailbox couldn't be"
    )
    this.emailNameDropdown = page.locator('.DropDownSelect_a1__DpNtD')
    this.inboxFolder = page
      .locator('#navigation_sidebar')
      .getByText(this.translations.main.folders.inbox)
    this.sentItemsFolder = page.getByText(
      this.translations.main.folders.sent_items
    )
    this.junkEmailFolder = page.getByText(
      this.translations.main.folders.junk_email
    )
    this.archiveFolder = page.getByText(this.translations.main.folders.archive)
    this.deletedItemsFolder = page.getByText(
      this.translations.main.folders.deleted_items
    )
    this.draftsFolder = page.getByText(this.translations.main.folders.drafts)
    this.secheduledEmailsFolder = page
      .getByText(this.translations.main.folders.scheduled)
      .first()

    this.closeEditor = page.getByTestId('innomail-close-editor')
    this.createFolderConfirmation = page.getByText(
      this.translations.main.newFolder
    )
    this.cancelFolderModal = page.getByText(this.translations.common.cancel)
  }

  set dynamicXPath(signName: string) {
    this.editSignature = this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${signName}$`) })
      .getByRole('button')
      .first()
    this.selectSignature = this.page
      .locator('#portal__root')
      .getByText(signName)
      .first()
    this.deleteSignature = this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${signName}$`) })
      .getByRole('button')
      .nth(1)
  }

  set switchBetweenEmailLocator(emailID: string) {
    this.switchBetweenEmail = this.page.getByText(emailID)
  }

  set switchBackToEmailLocator(emailID: string) {
    this.switchBackToEmail = this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${emailID}$`) })
      .first()
  }

  async goTo(baseURL: string | undefined) {
    await Allure.step('navigate to Email URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.email.base}`)
    })
  }

  async validateCurrentApp() {
    await expect(this.page).toHaveURL(new RegExp(`${APP_URLS.email.base}$`))
    await expect(this.currentApp).toContainText('Email')
  }

  async verifyNewEmail() {
    await Allure.step('Verify New Email button is visible', async () => {
      await expect(this.newEmail).toBeVisible()
    })
  }

  async clickOnNewEmail() {
    await Allure.step('should click on new email', async () => {
      await this.newEmail.click()
    })
  }

  async verifyCloseEditor() {
    await Allure.step('Verify Close Editor button is visible', async () => {
      await expect(this.closeEditor).toBeVisible()
    })
  }

  async clickOnCloseEditor() {
    await Allure.step('should click on close editor', async () => {
      await this.closeEditor.click()
    })
  }

  async verifyToAddressField() {
    await Allure.step('Verify To Address field is visible', async () => {
      await expect(this.toAddress).toBeVisible()
    })
  }

  async fillAndEnterToAddress(toAddress: string) {
    await Allure.step('should fill to address and press enter', async () => {
      await this.toAddress.fill(toAddress)
      await this.toAddress.press('Enter')
    })
  }

  async verifySubjectField() {
    await Allure.step('Verify Subject field is visible', async () => {
      await expect(this.emailSubject).toBeVisible()
    })
  }

  async fillAndEnterSubject(subject: string) {
    await Allure.step('should fill subject', async () => {
      await this.emailSubject.fill(subject)
    })
  }

  async verifyBodyofEmail() {
    await Allure.step('Verify Body field is visible', async () => {
      await expect(this.emailBody).toBeVisible()
    })
  }
  async clickOnBodyAndFill(body: string) {
    await Allure.step('should click on body', async () => {
      await this.emailBody.click()
      await this.page.waitForTimeout(5000)
      await this.emailBody.fill(body)
      await this.page.waitForTimeout(5000)
    })
  }

  async verifySendButton() {
    await Allure.step('Verify Send Email Button is visible', async () => {
      await expect(this.sendEmail).toBeVisible()
    })
  }
  async clickOnSend() {
    await Allure.step('should click on send', async () => {
      await this.sendEmail.click()
    })
  }

  async verifyEmailSuccessfulToastMessage() {
    await Allure.step(
      'should verify email successful toast message',
      async () => {
        await expect(this.emailSuccessfulToastMessage).toBeVisible()
      }
    )
  }

  async verifyFirstEmail() {
    await Allure.step('Verify first email is visible', async () => {
      await expect(this.firstEmail).toBeVisible()
    })
  }
  async clickOnFirstEmail() {
    await Allure.step('should click on first email', async () => {
      await this.firstEmail.click()
    })
  }

  async verifyTopForwardButton() {
    await Allure.step('Verify Top Forward button is visible', async () => {
      await expect(this.topForwardEmail).toBeVisible()
    })
  }

  async clickOnTopForward() {
    await Allure.step('should click on forward', async () => {
      await this.topForwardEmail.click()
    })
  }

  async verifySettingButton() {
    await Allure.step('Verify Setting Button is visible', async () => {
      await expect(this.settings).toBeVisible()
    })
  }

  async clickOnSettings() {
    await Allure.step('should click on setting', async () => {
      await this.settings.click()
      let pageName = await this.page.getByText('Email Settings').textContent()
      if (pageName === 'Email Settings') {
        await Allure.addAttachment(
          'Page name should be matching',
          `${pageName} : Page name is matching as expected`
        )
      } else {
        await Allure.addAttachment(
          'Page name should be matching',
          `${pageName} : Page name is not matching as expected`
        )
      }
    })
  }

  async verifyComposeAndReply() {
    await Allure.step(
      'Verify Compose and Reply section is visible',
      async () => {
        await expect(this.composeAndReply).toBeVisible()
      }
    )
  }

  async navigateToComposeAndReply() {
    await Allure.step('should navigate to compose and reply', async () => {
      await this.composeAndReply.click()
    })
  }

  async verifyManageSignatureButton() {
    await Allure.step('Verify Manage Signature Button is visible', async () => {
      await expect(this.manageSignature).toBeVisible()
    })
  }

  async clickOnManageSignature() {
    await Allure.step('should click on manage signature', async () => {
      await this.manageSignature.click()
    })
  }

  async verifyAddSignatureButton() {
    await Allure.step('Verify Add Signature Field is visible', async () => {
      await expect(this.addSignature).toBeVisible()
    })
  }

  async clickOnAddSignature() {
    await Allure.step('should click on add signature', async () => {
      await this.addSignature.click()
    })
  }

  async verifyTitleFieldOfSignature() {
    await Allure.step(
      'Verify Title field is visible in Manage Signature Modal',
      async () => {
        await expect(this.addSignatureTitle).toBeVisible()
      }
    )
  }
  async addTitleToSignature(title: string) {
    await Allure.step('should click and add title', async () => {
      await this.addSignatureTitle.click()
      await this.addSignatureTitle.fill(title)
    })
  }

  async verifyBodyFieldOfSignature() {
    await Allure.step(
      'Verify Body field is visible in Manage Signature Modal',
      async () => {
        await expect(this.addSignatureBody).toBeVisible()
      }
    )
  }

  async addBodyToSignature(body: string) {
    await Allure.step('should click and add body', async () => {
      await this.addSignatureBody.click()
      await this.addSignatureBody.fill(body)
    })
  }

  async verifySaveButtonOfSignature() {
    await Allure.step(
      'Verify Save Button is visible in Manage Signature Modal',
      async () => {
        await expect(this.saveSignature).toBeVisible()
      }
    )
  }

  async saveTheSignature() {
    await Allure.step('click on save button on manage signature', async () => {
      await this.saveSignature.click()
    })
  }

  async verifyEditSiganture() {
    await Allure.step('Verify Edit Signature Button is visible', async () => {
      await expect(this.editSignature).toBeVisible()
    })
  }
  async editTheSignature() {
    await Allure.step('click on edit the signature', async () => {
      await this.editSignature.click()
    })
  }

  async verifyNewSignatureIsPresent() {
    await Allure.step('Verify New Signature is visible', async () => {
      await expect(this.selectSignature).toBeVisible()
    })
  }
  async selectTheSignature() {
    await Allure.step('click to select the signature', async () => {
      await this.selectSignature.click()
    })
  }

  async verifyDeleteSignature() {
    await Allure.step('Verify Delete Siganture Button is visible', async () => {
      await expect(this.deleteSignature).toBeVisible()
    })
  }
  async deleteTheSignature() {
    await Allure.step('click to delete the signature', async () => {
      await this.deleteSignature.click()
    })
  }

  async verifyTopReplyButton() {
    await Allure.step(
      'Verify Top Reply To Email button is visible',
      async () => {
        await expect(this.topReplyEmail).toBeVisible()
      }
    )
  }

  async clickOnTopReplyButton() {
    await Allure.step('click on reply button', async () => {
      await this.topReplyEmail.click()
    })
  }

  async verifyConfirmPopup() {
    await Allure.step('Verify Confirmation Popup is visible', async () => {
      await expect(this.confirmPopup).toBeVisible()
    })
  }

  async clickOnConfirm() {
    await Allure.step('click on confirm button', async () => {
      await this.confirmPopup.click()
    })
  }

  async verifyCreateFolderButton() {
    await Allure.step('Verify Create Folder Button is visible', async () => {
      await expect(this.createFolder).toBeVisible()
    })
  }

  async clickOnCreateFolder() {
    await Allure.step('click on create folder button', async () => {
      await this.createFolder.click()
    })
  }

  async verifyCreateFolderModal() {
    await Allure.step('Verify Create Folder Modal is visible', async () => {
      await expect(this.createFolderConfirmation).toBeVisible
      let folderModal = this.createFolderConfirmation.textContent()
      if (folderModal === this.translations.mailbox.controls.newFolder) {
        await Allure.addAttachment(
          'Folder Modal name should be matching',
          `${folderModal} : Folder Modal name is matching as expected`
        )
      } else {
        await Allure.addAttachment(
          'Folder Modal name should be matching',
          `${folderModal} : Folder Modal name is not matching as expected`
        )
      }
    })
  }

  async verifyCancelFolderModal() {
    await Allure.step('Verify Cancel Folder Modal is visible', async () => {
      await expect(this.cancelFolderModal).toBeVisible()
    })
  }

  async clickOnCancelFolderModal() {
    await Allure.step('click on cancel folder modal', async () => {
      await this.cancelFolderModal.click()
    })
  }

  async verifyFolderNameField() {
    await Allure.step('Verify Folder Name field is visible', async () => {
      await expect(this.folderName).toBeVisible()
    })
  }

  async fillFolderName(folderName: string) {
    await Allure.step('fill folder name', async () => {
      await this.folderName.fill(folderName)
    })
  }

  async verifySaveFolderButton() {
    await Allure.step('Verify Save Folder Button is visible', async () => {
      await expect(this.saveFolder).toBeVisible()
    })
  }

  async clickOnSaveFolder() {
    await Allure.step('click on save folder button', async () => {
      await this.saveFolder.click()
    })
  }

  async verifyFolderSuccessfulToastMessage() {
    await Allure.step(
      'should verify folder creation successful toast message',
      async () => {
        await expect(this.folderSuccessfulToastMessage).toBeVisible()
      }
    )
  }

  async verifyDuplicateFolderErrorToastMessage() {
    await Allure.step(
      'should verify duplicate folder error toast message',
      async () => {
        await expect(this.duplicateFolderErrorToastMessage).toBeVisible()
      }
    )
  }

  async verifySelectEmailDropdown() {
    await Allure.step('Verify Select Email Dropdown is visible', async () => {
      await expect(this.emailNameDropdown).toBeVisible()
    })
  }
  async clickOnEmailNameDropdown() {
    await Allure.step('click on email name dropdown', async () => {
      await this.emailNameDropdown.click()
    })
  }

  async verifyEmailIDIsPresent() {
    await Allure.step(
      'Verify Selected Email ID in dropdown is visible',
      async () => {
        await expect(this.switchBetweenEmail).toBeVisible()
      }
    )
  }

  async clickOnSwitchBetweenEmail() {
    await Allure.step('click on switch between email', async () => {
      await this.switchBetweenEmail.click()
    })
  }

  async verifyOrginalEmailIDIsPresent() {
    await Allure.step(
      'Verify Original Email ID in dropdown is visible',
      async () => {
        await expect(this.switchBackToEmail).toBeVisible()
      }
    )
  }
  async clickOnSwitchBackToEmail() {
    await Allure.step('click on switch back to email', async () => {
      await this.switchBackToEmail.click()
    })
  }

  async verifyInboxFolder() {
    await Allure.step('Verify Inbox Folder is visible', async () => {
      await this.inboxFolder.waitFor({ state: 'visible', timeout: 40000 })
      await expect(this.inboxFolder).toBeVisible()
    })
  }

  async clickInboxFolder() {
    await Allure.step('Click on Inbox Folder is visible', async () => {
      await this.inboxFolder.click()
      let folderName = await this.page
        .locator('.messages-list__box-title')
        .textContent()
      if (folderName === this.translations.main.folders.inbox) {
        await Allure.addAttachment(
          'Folder name should be matching',
          `${folderName} : Folder name is matching as expected`
        )
      } else {
        await Allure.addAttachment(
          'Folder name should be matching',
          `${folderName} : Folder name is not matching as expected`
        )
      }
    })
  }

  async verifySentItemsFolder() {
    await Allure.step('Verify Sent Items Folder is visible', async () => {
      //await this.sentItemsFolder.waitFor({ state: 'visible', timeout: 40000 })
      await expect(this.sentItemsFolder).toBeVisible()
    })
  }

  async clickSentItemsFolder() {
    await Allure.step(
      'Click on Sent Items Folder and able to navigate to Sent Items folder',
      async () => {
        await this.sentItemsFolder.click()
        let folderName = await this.page
          .locator('.messages-list__box-title')
          .textContent()
        if (folderName === this.translations.main.folders.sent_items) {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is matching as expected`
          )
        } else {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is not matching as expected`
          )
        }
      }
    )
  }

  async verifyJunkEmailFolder() {
    await Allure.step('Verify Junk Email Folder is visible', async () => {
      await expect(this.junkEmailFolder).toBeVisible()
    })
  }

  async clickJunkEmailFolder() {
    await Allure.step(
      'Click on Junk Email Folder and able to navigate to Junk Email folder',
      async () => {
        await this.junkEmailFolder.click()
        let folderName = await this.page
          .locator('.messages-list__box-title')
          .textContent()
        if (folderName === this.translations.main.folders.junk_email) {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is matching as expected`
          )
        } else {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is not matching as expected`
          )
        }
      }
    )
  }

  async verifyArchiveFolder() {
    await Allure.step('Verify Archive Folder is visible', async () => {
      await expect(this.archiveFolder).toBeVisible()
    })
  }

  async clickArchiveFolder() {
    await Allure.step(
      'Click on Archive Folder and able to navigate to Archive folder',
      async () => {
        await this.archiveFolder.click()
        let folderName = await this.page
          .locator('.messages-list__box-title')
          .textContent()
        if (folderName === this.translations.main.folders.archive) {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is matching as expected`
          )
        } else {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is not matching as expected`
          )
        }
      }
    )
  }

  async verifyDeletedItemsFolder() {
    await Allure.step('Verify Deleted Items Folder is visible', async () => {
      await expect(this.deletedItemsFolder).toBeVisible()
    })
  }

  async clickDeletedItemsFolder() {
    await Allure.step(
      'Click on Deleted Items Folder and able to navigate to Deleted Items folder',
      async () => {
        await this.deletedItemsFolder.click()
        let folderName = await this.page
          .locator('.messages-list__box-title')
          .textContent()
        if (folderName === this.translations.main.folders.deleted_items) {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is matching as expected`
          )
        } else {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is not matching as expected`
          )
        }
      }
    )
  }

  async verifyDraftsFolder() {
    await Allure.step('Verify Drafts Folder is visible', async () => {
      await expect(this.draftsFolder).toBeVisible()
    })
  }

  async clickDraftsFolder() {
    await Allure.step(
      'Click on Drafts Folder and able to navigate to Drafts folder',
      async () => {
        await this.draftsFolder.click()
        let folderName = await this.page
          .locator('.messages-list__box-title')
          .textContent()
        if (folderName === this.translations.main.folders.drafts) {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is matching as expected`
          )
        } else {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is not matching as expected`
          )
        }
      }
    )
  }

  async verifyScheduledEmailsFolder() {
    await Allure.step('Verify Scheduled Emails Folder is visible', async () => {
      await expect(this.secheduledEmailsFolder).toBeVisible()
    })
  }

  async clickScheduledEmailsFolder() {
    await Allure.step(
      'Click on Scheduled Emails Folder and able to navigate to Scheduled Emails folder',
      async () => {
        await this.secheduledEmailsFolder.click()
        let folderName = await this.page
          .locator('.messages-list__box-title')
          .textContent()
        if (folderName === this.translations.main.folders.scheduled) {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is matching as expected`
          )
        } else {
          await Allure.addAttachment(
            'Folder name should be matching',
            `${folderName} : Folder name is not matching as expected`
          )
        }
      }
    )
  }
}
