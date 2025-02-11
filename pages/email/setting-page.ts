import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'

export class Setting {
  private page: Page
  private translations: Record<string, any>

  private generalSettingButton: Locator
  private generalTab: Locator
  private lastSelectedSignature: Locator
  private alwaysUseLastSelected: Locator
  private conversationView: Locator
  private showEmailsAsConversations: Locator
  private lazyLoadEmails: Locator
  private toggleLazyLoadingEmails: Locator
  private exportAttachments: Locator
  private exportAttachmentsInfo: Locator
  private emailFirst: Locator
  private mailbox: Locator
  private forceRefresh: Locator
  private forceRefreshInfo: Locator
  private defaultSearchBy: Locator
  private chooseDefaultSearch: Locator
  private chooseDefaultSearchDropdown: Locator
  private refreshButton: Locator
  private rememberLastActions: Locator
  private rememberLastOpenedMessage: Locator
  private rememberLastOpenedInfo: Locator
  private rememberLastDraft: Locator
  private rememberLastDraftInfo: Locator
  private keyboardShortcuts: Locator
  private createNewMessageShift: Locator
  private replyEmailShift: Locator
  private replyAllShift: Locator
  private forwardMessageShift: Locator
  private sendEmailCtrlEnter: Locator
  private deleteMessage: Locator

  //Compose and Reply section
  private composeAndReply: Locator
  private signaturesTab: Locator
  private manageSignaturesButton: Locator
  private companySignatureMunich: Locator
  private companySignatureVienna: Locator
  private companySignatureCologne: Locator
  private companySignatureTurkey: Locator
  private companySignatureParis: Locator
  private companySignatureUK: Locator
  private templatesTab: Locator
  private manageTemplatesButton: Locator
  private setYourTemplates: Locator
  private delaySendingEmails: Locator
  private emailDelayOptions: Locator

  //AI Helper section
  private aiHelperButton: Locator
  private automaticAIReplyPreparation: Locator
  private aiFeatureDescription: Locator
  private emailInAutomaticAIReplyPreparation: Locator
  private automaticEventDetection: Locator
  private detectCalendarEvents: Locator
  private aiEventFromText: Locator
  private onViewAIEventFromText: Locator
  private automaticAIContact: Locator
  private emailInAutomaticAIContact: Locator

  //Automatic Reply Section
  private automaticRepliesButton: Locator
  private automaticRepliesHeading: Locator
  private automaticRepliesSubHeading: Locator
  private useAutomaticRepliesText: Locator
  private generalCheckbox: Locator
  private sendRepliesText: Locator
  private specificTimePeriodCheckbox: Locator
  private startTimeButton: Locator
  private endTimeButton: Locator
  private setAutomaticReplyDropdown: Locator
  private noDelayOption: Locator
  private automaticReplyMailHeading: Locator
  private subjectField: Locator

  private textBox: Locator
  private saveButton: Locator

  //Automatic Actions Section
  private automaticActionsButton: Locator
  private quickActionsText: Locator
  private newQuickActionButton: Locator
  private quickActionsStartText: Locator
  private selectYourAccountText: Locator
  private emailListItem!: Locator
  private quickActionDropdownIndicator: Locator
  private noQuickActionsText: Locator
  private moveInvitationEmailsText: Locator
  private moveInvitationEmailSelectText!: Locator
  private moveInvitationEmailCheckbox: Locator
  private moveInvitationEmailDropdown: Locator
  private moveInvitationEmailSelectOption: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('email', locale)

    this.generalSettingButton = page.getByRole('button', {
      name: 'General Settings',
    })
    this.generalTab = page.getByText('General', { exact: true })
    this.lastSelectedSignature = page.getByText('Use last selected signature')
    this.alwaysUseLastSelected = page.getByText('Always uses the last selected')
    this.conversationView = page.getByText('Conversation view')
    this.showEmailsAsConversations = page.getByText(
      'Shows emails as conversations'
    )
    this.lazyLoadEmails = page.getByText('Lazy load emails')
    this.toggleLazyLoadingEmails = page.getByText(
      'Toggle lazy loading emails in'
    )
    this.exportAttachments = page.getByText('Export attachments to Files')
    this.exportAttachmentsInfo = page.getByText('When enabled, attachments')
    this.emailFirst = page
      .locator('div')
      .filter({ hasText: /^bhat@innoscripta\.combhat@innoscripta\.com$/ })
      .first()
    this.mailbox = page.getByText('Mailbox').nth(1)
    this.forceRefresh = page.getByText('Force refresh')
    this.forceRefreshInfo = page.getByText('This option forces an update')
    this.defaultSearchBy = page.getByText('Default search by').first()
    this.chooseDefaultSearch = page.getByText('Choose the default search by')
    this.chooseDefaultSearchDropdown = page
      .locator('div')
      .filter({ hasText: /^Date$/ })
      .first()
    this.refreshButton = page.getByRole('button', { name: 'Refresh' })
    this.rememberLastActions = page.getByText('Remember last actions')
    this.rememberLastOpenedMessage = page.getByText(
      'Remember last opened message'
    )
    this.rememberLastOpenedInfo = page.getByText(
      'When enabled, the last opened'
    )
    this.rememberLastDraft = page.getByText('Remember last draft')
    this.rememberLastDraftInfo = page.getByText('When enabled, the last draft')
    this.keyboardShortcuts = page.getByText('Keyboard Shortcuts')
    this.createNewMessageShift = page.getByText('Create a new messageshift N')
    this.replyEmailShift = page.getByText('Reply to email message.shift R')
    this.replyAllShift = page.getByText('Select the Reply All option.shift A')
    this.forwardMessageShift = page.getByText('Forward message.shift F')
    this.sendEmailCtrlEnter = page.getByText('Send email message.ctrl enter')
    this.deleteMessage = page.getByText('Delete messagedeleteor')
    //Compose and Reply section
    this.composeAndReply = page.getByRole('button', {
      name: 'Compose and Reply',
    })
    this.signaturesTab = page.getByText('Signatures', { exact: true })
    this.manageSignaturesButton = page.getByRole('button', {
      name: 'Manage signatures',
    })
    this.companySignatureMunich = page.getByText('Company Signature (MUNICH)')
    this.companySignatureVienna = page.getByText('Company Signature (VIENNA)')
    this.companySignatureCologne = page.getByText('Company Signature (COLOGNE)')
    this.companySignatureTurkey = page.getByText('Company Signature (Turkey)')
    this.companySignatureParis = page.getByText('Company Signature (Paris)')
    this.companySignatureUK = page.getByText('Company Signature (UK)')
    this.templatesTab = page.getByText('Templates', { exact: true })
    this.manageTemplatesButton = page.getByRole('button', {
      name: 'Manage Templates',
    })
    this.setYourTemplates = page.getByText('Set your templates and add')
    this.delaySendingEmails = page.getByText('Delay Sending Emails')
    this.emailDelayOptions = page.getByText(
      'bhat@innoscripta.combhat@innoscripta.comNo delayNo delay1 minute5 minutes10'
    )
    //AI Helper section
    this.aiHelperButton = page.getByRole('button', { name: 'AI Helper' })
    this.automaticAIReplyPreparation = page.getByText(
      'Automatic AI Reply Preparation'
    )
    this.aiFeatureDescription = page.getByText('The following feature enables')
    this.emailInAutomaticAIReplyPreparation = page
      .locator('div')
      .filter({ hasText: /^bhat@innoscripta\.combhat@innoscripta\.com$/ })
      .first()
    this.automaticEventDetection = page.getByText('Automatic Event Detection')
    this.detectCalendarEvents = page.getByText('Automatically detect calender')
    this.aiEventFromText = page.getByText('Automatic AI event from text')
    this.onViewAIEventFromText = page.getByText('On view AI event from text')
    this.automaticAIContact = page.getByText('Automatic AI Contact')
    this.emailInAutomaticAIContact = page
      .locator('div')
      .filter({ hasText: /^bhat@innoscripta\.combhat@innoscripta\.com$/ })
      .nth(2)
    this.startTimeButton = page.getByText('Start time')
    this.endTimeButton = page.getByText('End time')
    this.setAutomaticReplyDropdown = page.getByText(
      'Set when to automatic reply No delayNo delay1 minute5 minutes10 minutes30'
    )
    this.noDelayOption = page
      .locator('div')
      .filter({ hasText: /^No delay$/ })
      .first()

    //Automatic Reply Section
    this.automaticRepliesButton = page.getByRole('button', {
      name: 'Automatic Reply',
    })
    this.automaticRepliesHeading = page.getByText('Automatic replies').first()
    this.automaticRepliesSubHeading = page.getByText('Automatic replies').nth(1)
    this.useAutomaticRepliesText = page.getByText(
      'Use automatic replies to let'
    )
    this.generalCheckbox = page.getByRole('checkbox')
    this.sendRepliesText = page.getByText('Send replies only during a')
    this.specificTimePeriodCheckbox = page
      .locator('div')
      .filter({
        hasText: /^Send replies only during a specific time period\.$/,
      })
      .getByRole('checkbox')
    this.automaticReplyMailHeading = page.getByRole('heading', {
      name: 'Automatic Reply Mail',
    })
    this.subjectField = page.getByText('Subject')

    this.textBox = page.getByRole('textbox').nth(4)
    this.saveButton = page.getByRole('button', { name: 'Save' })

    //Automatic Actions Section
    this.automaticActionsButton = page.getByRole('button', {
      name: 'Automatic Actions',
    })
    this.quickActionsText = page.getByText('Quick Actions', { exact: true })
    this.newQuickActionButton = page.getByRole('button', {
      name: 'New Quick Action',
    })
    this.quickActionsStartText = page.getByText('Quick actions will start')
    this.selectYourAccountText = page.getByText('Select your account')
    this.quickActionDropdownIndicator = page
      .locator('.eca_dropdown_ddindicator')
      .first()
    this.noQuickActionsText = page.getByText("You haven't created any quick")
    this.moveInvitationEmailsText = page.getByText('Move Invitation Emails')
    this.moveInvitationEmailCheckbox = page.getByRole('checkbox')
    this.moveInvitationEmailDropdown = page.getByText('Please select')
    this.moveInvitationEmailSelectOption = page
      .locator('div')
      .filter({ hasText: /^Please select$/ })
      .first()
  }

  set emailListItemLocator(emailID: string) {
    this.emailListItem = this.page.getByRole('list').getByText(emailID)
  }

  set moveInvitationEmailSelectTextocator(emailID: string) {
    this.moveInvitationEmailSelectText = this.page.getByText(
      `${emailID}Please select`
    )
  }

  async verifyGeneralSettingButton() {
    await Allure.step(
      'Verify General Setting button section is visible',
      async () => {
        await expect(this.generalSettingButton).toBeVisible()
      }
    )
  }

  async clickGeneralSettingButton() {
    await Allure.step(
      'Verify General Setting button section is visible',
      async () => {
        await this.generalSettingButton.click()
      }
    )
  }

  async verifyGeneralTab() {
    await Allure.step('Verify General tab is visible', async () => {
      await expect(this.generalTab).toBeVisible()
    })
  }

  async verifyLastSelectedSignature() {
    await Allure.step(
      'Verify Use last selected signature option is visible',
      async () => {
        await expect(this.lastSelectedSignature).toBeVisible()
      }
    )
  }

  async verifyAlwaysUseLastSelected() {
    await Allure.step(
      'Verify Always uses the last selected option is visible',
      async () => {
        await expect(this.alwaysUseLastSelected).toBeVisible()
      }
    )
  }

  async verifyConversationView() {
    await Allure.step(
      'Verify Conversation view option is visible',
      async () => {
        await expect(this.conversationView).toBeVisible()
      }
    )
  }

  async verifyShowEmailsAsConversations() {
    await Allure.step(
      'Verify Shows emails as conversations option is visible',
      async () => {
        await expect(this.showEmailsAsConversations).toBeVisible()
      }
    )
  }

  async verifyLazyLoadEmails() {
    await Allure.step('Verify Lazy load emails option is visible', async () => {
      await expect(this.lazyLoadEmails).toBeVisible()
    })
  }

  async verifyToggleLazyLoadingEmails() {
    await Allure.step(
      'Verify Toggle lazy loading emails option is visible',
      async () => {
        await expect(this.toggleLazyLoadingEmails).toBeVisible()
      }
    )
  }

  async verifyExportAttachments() {
    await Allure.step(
      'Verify Export Attachments option is visible',
      async () => {
        await expect(this.exportAttachments).toBeVisible()
      }
    )
  }

  async verifyExportAttachmentsInfo() {
    await Allure.step(
      'Verify Export Attachments information is visible',
      async () => {
        await expect(this.exportAttachmentsInfo).toBeVisible()
      }
    )
  }

  async verifyemailFirst() {
    await Allure.step(
      'Verify first instance of Bhat email is visible',
      async () => {
        await expect(this.emailFirst).toBeVisible()
      }
    )
  }

  async verifyMailbox() {
    await Allure.step('Verify Mailbox option is visible', async () => {
      await expect(this.mailbox).toBeVisible()
    })
  }

  async verifyForceRefresh() {
    await Allure.step('Verify Force Refresh option is visible', async () => {
      await expect(this.forceRefresh).toBeVisible()
    })
  }

  async verifyForceRefreshInfo() {
    await Allure.step(
      'Verify Force Refresh information is visible',
      async () => {
        await expect(this.forceRefreshInfo).toBeVisible()
      }
    )
  }

  async verifyDefaultSearchBy() {
    await Allure.step(
      'Verify Default Search By option is visible',
      async () => {
        await expect(this.defaultSearchBy).toBeVisible()
      }
    )
  }

  async verifyChooseDefaultSearch() {
    await Allure.step(
      'Verify Choose Default Search By option is visible',
      async () => {
        await expect(this.chooseDefaultSearch).toBeVisible()
      }
    )
  }

  async verifyChooseDefaultSearchDropdown() {
    await Allure.step(
      'Verify Choose Default Search By dropdown is visible',
      async () => {
        await expect(this.chooseDefaultSearchDropdown).toBeVisible()
      }
    )
  }

  async verifyRefreshButton() {
    await Allure.step('Verify Refresh button is visible', async () => {
      await expect(this.refreshButton).toBeVisible()
    })
  }

  async clickRefreshButton() {
    await Allure.step('Click on Refresh button', async () => {
      await this.refreshButton.click()
    })
  }

  async verifyRememberLastActions() {
    await Allure.step(
      'Verify Remember Last Actions option is visible',
      async () => {
        await expect(this.rememberLastActions).toBeVisible()
      }
    )
  }

  async verifyRememberLastOpenedMessage() {
    await Allure.step(
      'Verify Remember Last Opened Message option is visible',
      async () => {
        await expect(this.rememberLastOpenedMessage).toBeVisible()
      }
    )
  }

  async verifyRememberLastOpenedInfo() {
    await Allure.step(
      'Verify Remember Last Opened Info option is visible',
      async () => {
        await expect(this.rememberLastOpenedInfo).toBeVisible()
      }
    )
  }

  async verifyRememberLastDraft() {
    await Allure.step(
      'Verify Remember Last Draft option is visible',
      async () => {
        await expect(this.rememberLastDraft).toBeVisible()
      }
    )
  }

  async verifyRememberLastDraftInfo() {
    await Allure.step(
      'Verify Remember Last Draft Info option is visible',
      async () => {
        await expect(this.rememberLastDraftInfo).toBeVisible()
      }
    )
  }

  async verifyKeyboardShortcuts() {
    await Allure.step(
      'Verify Keyboard Shortcuts option is visible',
      async () => {
        await expect(this.keyboardShortcuts).toBeVisible()
      }
    )
  }

  async verifyCreateNewMessageShift() {
    await Allure.step(
      'verify Create a New Message using Shift+N is visible',
      async () => {
        await expect(this.createNewMessageShift).toBeVisible()
      }
    )
  }

  async verifyReplyEmailShift() {
    await Allure.step(
      'verify Reply to Email Message using Shift+R is visible',
      async () => {
        await expect(this.replyEmailShift).toBeVisible()
      }
    )
  }

  async verifyReplyAllShift() {
    await Allure.step(
      'verify Select the Reply All option using Shift+A is visible',
      async () => {
        await expect(this.replyAllShift).toBeVisible()
      }
    )
  }

  async verifyForwardMessageShift() {
    await Allure.step(
      'Verify Forward Message Shift option is visible',
      async () => {
        await expect(this.forwardMessageShift).toBeVisible()
      }
    )
  }

  async verifySendEmailCtrlEnter() {
    await Allure.step(
      'Verify Send Email using Ctrl + Enter option is visible',
      async () => {
        await expect(this.sendEmailCtrlEnter).toBeVisible()
      }
    )
  }

  async verifyDeleteMessage() {
    await Allure.step('Verify Delete Message is visible', async () => {
      await expect(this.deleteMessage).toBeVisible()
    })
  }

  //Compose and Reply section
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

  async verifySignaturesTab() {
    await Allure.step('Verify Signatures tab is visible', async () => {
      await expect(this.signaturesTab).toBeVisible()
    })
  }

  async verifyManageSignaturesButton() {
    await Allure.step(
      'Verify Manage Signatures button is visible',
      async () => {
        await expect(this.manageSignaturesButton).toBeVisible()
      }
    )
  }

  async verifyCompanySignatureMunich() {
    await Allure.step(
      'Verify Company Signature (MUNICH) is visible',
      async () => {
        await expect(this.companySignatureMunich).toBeVisible()
      }
    )
  }

  async verifyCompanySignatureVienna() {
    await Allure.step(
      'Verify Company Signature (VIENNA) is visible',
      async () => {
        await expect(this.companySignatureVienna).toBeVisible()
      }
    )
  }

  async verifyCompanySignatureCologne() {
    await Allure.step(
      'Verify Company Signature (COLOGNE) is visible',
      async () => {
        await expect(this.companySignatureCologne).toBeVisible()
      }
    )
  }

  async verifyCompanySignatureTurkey() {
    await Allure.step(
      'Verify Company Signature (Turkey) is visible',
      async () => {
        await expect(this.companySignatureTurkey).toBeVisible()
      }
    )
  }

  async verifyCompanySignatureParis() {
    await Allure.step(
      'Verify Company Signature (Paris) is visible',
      async () => {
        await expect(this.companySignatureParis).toBeVisible()
      }
    )
  }

  async verifyCompanySignatureUK() {
    await Allure.step('Verify Company Signature (UK) is visible', async () => {
      await expect(this.companySignatureUK).toBeVisible()
    })
  }

  async verifyTemplatesTab() {
    await Allure.step('Verify Templates tab is visible', async () => {
      await expect(this.templatesTab).toBeVisible()
    })
  }

  async verifyManageTemplatesButton() {
    await Allure.step('Verify Manage Templates button is visible', async () => {
      await expect(this.manageTemplatesButton).toBeVisible()
    })
  }

  async verifySetYourTemplates() {
    await Allure.step(
      'Verify "Set your templates and add" option is visible',
      async () => {
        await expect(this.setYourTemplates).toBeVisible()
      }
    )
  }

  async verifyDelaySendingEmails() {
    await Allure.step(
      'Verify "Delay Sending Emails" option is visible',
      async () => {
        await expect(this.delaySendingEmails).toBeVisible()
      }
    )
  }

  async verifyEmailDelayOptions() {
    await Allure.step('Verify Email Delay Options are visible', async () => {
      await expect(this.emailDelayOptions).toBeVisible()
    })
  }

  //AI Helper section
  async verifyAIHelperButton() {
    await Allure.step('Verify AI Helper button is visible', async () => {
      await expect(this.aiHelperButton).toBeVisible()
    })
  }

  async clickAIHelperButton() {
    await Allure.step('Verify AI Helper button is visible', async () => {
      await this.aiHelperButton.click()
    })
  }

  async verifyAutomaticAIReplyPreparation() {
    await Allure.step(
      'Verify Automatic AI Reply Preparation option is visible',
      async () => {
        await expect(this.automaticAIReplyPreparation).toBeVisible()
      }
    )
  }

  async verifyAIFeatureDescription() {
    await Allure.step('Verify AI Feature Description is visible', async () => {
      await expect(this.aiFeatureDescription).toBeVisible()
    })
  }

  async verifyEmailInAutomaticAIReplyPreparation() {
    await Allure.step('Verify email locator is visible', async () => {
      await expect(this.emailInAutomaticAIReplyPreparation).toBeVisible()
    })
  }

  async verifyAutomaticEventDetection() {
    await Allure.step(
      'Verify Automatic Event Detection option is visible',
      async () => {
        await expect(this.automaticEventDetection).toBeVisible()
      }
    )
  }

  async verifyDetectCalendarEvents() {
    await Allure.step(
      'Verify Automatically detect calendar events option is visible',
      async () => {
        await expect(this.detectCalendarEvents).toBeVisible()
      }
    )
  }

  async verifyAIEventFromText() {
    await Allure.step(
      'Verify Automatic AI event from text option is visible',
      async () => {
        await expect(this.aiEventFromText).toBeVisible()
      }
    )
  }

  async verifyOnViewAIEventFromText() {
    await Allure.step(
      'Verify On view AI event from text option is visible',
      async () => {
        await expect(this.onViewAIEventFromText).toBeVisible()
      }
    )
  }

  async verifyAutomaticAIContact() {
    await Allure.step(
      'Verify Automatic AI Contact option is visible',
      async () => {
        await expect(this.automaticAIContact).toBeVisible()
      }
    )
  }

  async verifyEmailInAutomaticAIContact() {
    await Allure.step('Verify second email locator is visible', async () => {
      await expect(this.emailInAutomaticAIContact).toBeVisible()
    })
  }

  //Automatic Replies Section

  async verifyAutomaticRepliesButton() {
    await Allure.step(
      'Verify Automatic Replies button is visible',
      async () => {
        await expect(this.automaticRepliesButton).toBeVisible()
      }
    )
  }

  async clickAutomaticRepliesButton() {
    await Allure.step('Click Automatic Replies button', async () => {
      await this.automaticRepliesButton.click()
    })
  }
  async verifyAutomaticRepliesHeading() {
    await Allure.step(
      'Verify Automatic Replies button is visible',
      async () => {
        await expect(this.automaticRepliesHeading).toBeVisible()
      }
    )
  }

  async verifyAutomaticRepliesSubHeading() {
    await Allure.step(
      'Verify Automatic Replies button is visible',
      async () => {
        await expect(this.automaticRepliesSubHeading).toBeVisible()
      }
    )
  }

  async verifyUseAutomaticRepliesText() {
    await Allure.step(
      'Verify "Use automatic replies to let" text is visible',
      async () => {
        await expect(this.useAutomaticRepliesText).toBeVisible()
      }
    )
  }

  async verifyGeneralCheckbox() {
    await Allure.step('Verify general checkbox is visible', async () => {
      await expect(this.generalCheckbox).toBeVisible()
    })
  }

  async checkGeneralCheckbox() {
    await Allure.step('Check general checkbox', async () => {
      await this.generalCheckbox.check()
    })
  }

  async verifySendRepliesText() {
    await Allure.step(
      'Verify "Send replies only during a" text is visible',
      async () => {
        await expect(this.sendRepliesText).toBeVisible()
      }
    )
  }

  async verifySpecificTimePeriodCheckbox() {
    await Allure.step(
      'Verify specific time period checkbox is visible',
      async () => {
        await expect(this.specificTimePeriodCheckbox).toBeVisible()
      }
    )
  }

  async checkSpecificTimePeriodCheckbox() {
    await Allure.step(
      'Verify specific time period checkbox is visible',
      async () => {
        await this.specificTimePeriodCheckbox.check()
      }
    )
  }

  async verifyStartTimeButton() {
    await Allure.step('Verify Start Time button is visible', async () => {
      await expect(this.startTimeButton).toBeVisible()
    })
  }

  async verifyEndTimeButton() {
    await Allure.step('Verify End Time button is visible', async () => {
      await expect(this.endTimeButton).toBeVisible()
    })
  }

  async verifySetAutomaticReplyDropdown() {
    await Allure.step(
      'Verify Set Automatic Reply dropdown is visible',
      async () => {
        await expect(this.setAutomaticReplyDropdown).toBeVisible()
      }
    )
  }

  async verifyNoDelayOption() {
    await Allure.step('Verify No Delay option is visible', async () => {
      await expect(this.noDelayOption).toBeVisible()
    })
  }

  async verifyAutomaticReplyMailHeading() {
    await Allure.step(
      'Verify Automatic Reply Mail heading is visible',
      async () => {
        await expect(this.automaticReplyMailHeading).toBeVisible()
      }
    )
  }

  async verifySubjectField() {
    await Allure.step('Verify Subject field is visible', async () => {
      await expect(this.subjectField).toBeVisible()
    })
  }

  async verifyTextBox() {
    await Allure.step('Verify text box is visible', async () => {
      await expect(this.textBox).toBeVisible()
    })
  }

  async verifySaveButton() {
    await Allure.step('Verify Save button is visible', async () => {
      await expect(this.saveButton).toBeVisible()
    })
  }

  //Automatic Actions Section
  async verifyAutomaticActionsButton() {
    await Allure.step(
      'Verify Automatic Actions button is visible',
      async () => {
        await expect(this.automaticActionsButton).toBeVisible()
      }
    )
  }

  async clickAutomaticActionsButton() {
    await Allure.step('Click Automatic Actions button', async () => {
      await this.automaticActionsButton.click()
    })
  }

  async verifyQuickActionsText() {
    await Allure.step('Verify Quick Actions text is visible', async () => {
      await expect(this.quickActionsText).toBeVisible()
    })
  }

  async verifyNewQuickActionButton() {
    await Allure.step('Verify New Quick Action button is visible', async () => {
      await expect(this.newQuickActionButton).toBeVisible()
    })
  }

  async verifyQuickActionsStartText() {
    await Allure.step(
      'Verify "Quick actions will start" text is visible',
      async () => {
        await expect(this.quickActionsStartText).toBeVisible()
      }
    )
  }

  async verifySelectYourAccountText() {
    await Allure.step(
      'Verify "Select your account" text is visible',
      async () => {
        await expect(this.selectYourAccountText).toBeVisible()
      }
    )
  }

  async verifyQuickActionDropdownIndicator() {
    await Allure.step(
      'Verify first dropdown indicator is visible',
      async () => {
        await expect(this.quickActionDropdownIndicator).toBeVisible()
      }
    )
  }

  async clickQuickActionDropdownIndicator() {
    await Allure.step('Click first dropdown indicator', async () => {
      await this.quickActionDropdownIndicator.click()
    })
  }

  async verifyEmailListItem() {
    await Allure.step('Verify email list item is visible', async () => {
      await expect(this.emailListItem).toBeVisible()
    })
  }

  async clickEmailListItem() {
    await Allure.step(
      'Click on email list item "bhat@innoscripta.com"',
      async () => {
        await this.emailListItem.click()
      }
    )
  }

  async verifyNoQuickActionsText() {
    await Allure.step(
      'Verify "You haven\'t created any quick" text is visible',
      async () => {
        await expect(this.noQuickActionsText).toBeVisible()
      }
    )
  }

  async verifyMoveInvitationEmailsText() {
    await Allure.step(
      'Verify "Move Invitation Emails" text is visible',
      async () => {
        await expect(this.moveInvitationEmailsText).toBeVisible()
      }
    )
  }

  async verifymoveInvitationEmailSelectText() {
    await Allure.step(
      'Verify logged in users EMail ID is visible in Move Inivitation Emails section',
      async () => {
        await expect(this.moveInvitationEmailSelectText).toBeVisible()
      }
    )
  }

  async verifyMoveInvitationEmailCheckbox() {
    await Allure.step('Verify general checkbox is visible', async () => {
      await expect(this.moveInvitationEmailCheckbox).toBeVisible()
    })
  }

  async checkMoveInvitationEmailCheckbox() {
    await Allure.step('Check general checkbox', async () => {
      await this.moveInvitationEmailCheckbox.check()
    })
  }

  async verifyMoveInvitationEmailSelectOption() {
    await Allure.step('Verify Dropdown option is visible', async () => {
      await expect(this.moveInvitationEmailSelectOption).toBeVisible()
    })
  }
  async verifyMoveInvitationEmailDropdown() {
    await Allure.step(
      'Verify "Please select" placeholder text is visible',
      async () => {
        await expect(this.moveInvitationEmailDropdown).toBeVisible()
      }
    )
  }
}
