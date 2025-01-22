import { Page, Locator } from '@playwright/test'

export class bulkMailingPage {
  private page: Page

  public bulkMailing: Locator
  public upcomingMail: Locator
  public campaignPerformance: Locator

  public importFromClusterix: Locator
  public fileUpload: Locator
  public copyPaste: Locator
  public nextButton: Locator
  public createAudienceButton: Locator
  public fileUploadedText: Locator
  public newCampaignButton: Locator
  public newCampaignNameField: Locator
  public templateSelect: Locator
  public sendToDropdown: Locator
  public selectEmailAddressDrodown: Locator
  public enterNameInput: Locator
  public enterSubjectInput: Locator
  public sendNowButton: Locator
  public scheduleTimingButton: Locator
  public templateButton: Locator
  public backToCampaignsButton: Locator
  public excludeRecipientDropdown: Locator
  public saveAsDraftButton: Locator
  public addParticipantButton: Locator
  public closeAddParticipantModalButton: Locator
  public searchParticipantField: Locator
  public paricipantList: Locator
  public cancelAddParticipantButton: Locator
  public saveAddParticipantButton: Locator
  public campaignDetailsSectionButton: Locator
  public campaignSendTimeSectionButton: Locator
  public selectTimeButton: Locator
  public sendTimeButton: Locator
  public minutesButton: Locator
  public hoursButton: Locator
  public variablesSectionButton: Locator
  public connectToAudienceButton: Locator
  public connectToAudience2Button: Locator
  public campaignSendButton: Locator
  public Toastmsg: Locator
  public campaignCreatedText: Locator
  public campaignUpdatedText: Locator
  public notificationsButton: Locator
  public notificationCard: Locator
  public openFirstInCampaignPerformance: Locator
  public nameCampaignPerformance: Locator
  public sentFirstCampaignPerformance: Locator
  public bounceFirstCampaignPerformance: Locator
  public sideBarButton: Locator
  public campaignNameColumn: Locator
  public audienceColumn: Locator
  public contactsColumn: Locator
  public sentColumn: Locator
  public sentByColumn: Locator
  public participantsColumn: Locator
  public statusColumn: Locator
  public searchByCampaign: Locator
  public allStatusFilter: Locator
  public allStatusCancelButton: Locator
  public campaignsFilterButton: Locator
  public campaignClearAllFilterButton: Locator
  public templateFilterButton: Locator
  public templateFilterDropdownButton: Locator
  public templateFilterDropdownSearchField: Locator
  public templateFilterDropdownOption: Locator
  public userFilterButton: Locator
  public userFilterDropdownOption: Locator
  public userFilterDropdownButton: Locator
  public userFilterDropdownSearchField: Locator
  public audienceFilterButton: Locator
  public audienceFilterDropdownButton: Locator
  public audienceFilterDropdownOption: Locator
  public audiencFilterDropdownSearchField: Locator
  public scheduledAtFilterButton: Locator
  public completedBeforeFilterButton: Locator
  public completedAfterFilterButton: Locator
  public completedAfterDatePicker: Locator
  public completedBeforeDatePicker: Locator
  public orderByFilterButton: Locator
  public orderByClearSelectionButton: Locator
  public orderByCreatedAtButton: Locator
  public orderByCompletedAtButton: Locator
  public orderByUpdatedAtButton: Locator
  public orderByScheduledAtButton: Locator
  public tableItemsCount: Locator
  public campaignMultiSelectButton: Locator
  public campaignSelectAllButton: Locator
  public selectedCount: Locator
  public deleteSelected: Locator
  public duplicateSelected: Locator
  public tableContent: Locator
  public emailRefreshButton: Locator
  public recruiterName: Locator
  public greetingName: Locator
  public recruiterNameaudienceDropdown: Locator
  public greetingNameaudienceDropdown: Locator
  public value1: Locator
  public value2: Locator
  public emailSelect: Locator
  public formTextInput: Locator
  public newCampaignNameFields: Locator
  public addNewAudience: Locator
  public audienceTitle: Locator

  constructor(page: Page) {
    this.page = page

    this.bulkMailing = page.getByRole('link', {
      name: 'Bulk Mailing Send one-time',
    })
    this.upcomingMail = this.page.getByText('Upcoming Mail DatesHere are')
    this.campaignPerformance = this.page.getByText('Campaign Performance')
    this.importFromClusterix = this.page
      .locator('label')
      .filter({ hasText: 'Import from ClusterixSelect a' })
    this.fileUpload = this.page
      .locator('label')
      .filter({ hasText: 'Upload from FilesUpload' })
    this.copyPaste = this.page
      .locator('label')
      .filter({ hasText: 'Copy & PasteManually paste' })
    this.nextButton = this.page.getByText('Next')
    this.createAudienceButton = this.page.getByText('Create audience')
    this.fileUploadedText = this.page.getByText('file uploaded')
    this.newCampaignButton = this.page.getByText('New Campaign')
    this.newCampaignNameField = this.page.getByText('Untitled campaign')

    this.newCampaignNameFields = this.page.locator('.kW_6nAcmh8OvfvpQH78n')
    this.addNewAudience = this.page.getByRole('button', {
      name: 'Add Audience',
    })
    this.templateSelect = this.page.getByRole('img', {
      name: 'Bulk Mailing - Rejection',
    })
    this.sendToDropdown = this.page.getByLabel('Send to')
    this.selectEmailAddressDrodown = this.page.getByPlaceholder(
      'Select email address'
    )
    this.enterNameInput = this.page.getByPlaceholder('Enter name')
    this.enterSubjectInput = this.page.getByPlaceholder('Enter subject')
    this.sendNowButton = this.page
      .locator('label')
      .filter({ hasText: 'Send nowSend your email right' })
    this.scheduleTimingButton = this.page.getByText('Schedule a timing')
    this.templateButton = this.page.getByText('Template', { exact: true })
    this.backToCampaignsButton = this.page.getByRole('button', {
      name: 'Back to campaigns',
    })
    this.excludeRecipientDropdown = this.page.getByLabel(
      'Exclude recipient (optional)'
    )
    this.saveAsDraftButton = this.page.getByText('Save as draft')
    this.addParticipantButton = this.page
      .locator('div')
      .filter({ hasText: /^BackUntitled campaignSave as draftsend$/ })
      .getByRole('button')
      .nth(1)
    this.closeAddParticipantModalButton = this.page
      .locator('#undefined')
      .getByRole('button')
    this.searchParticipantField = this.page.getByPlaceholder('User Name')
    this.paricipantList = this.page.getByRole('heading', {
      name: 'Participant List',
    })
    this.cancelAddParticipantButton = this.page
      .locator('div')
      .filter({ hasText: /^Cancel$/ })
      .first()
    this.saveAddParticipantButton = this.page
      .locator('div')
      .filter({ hasText: /^Save$/ })
      .first()
    this.campaignDetailsSectionButton = this.page
      .locator('li')
      .filter({ hasText: 'Details' })
    this.campaignSendTimeSectionButton = this.page
      .locator('li')
      .filter({ hasText: 'Send Time' })
    this.selectTimeButton = this.page.getByRole('button', {
      name: 'Select a delivery date',
    })
    this.sendTimeButton = this.page.getByText('Send Time')
    this.minutesButton = this.page.getByRole('button', { name: '26' }).nth(1)
    this.hoursButton = this.page.getByRole('button', { name: '06' }).first()
    this.variablesSectionButton = this.page
      .locator('li')
      .filter({ hasText: 'Variables' })
    this.connectToAudienceButton = this.page
      .locator('label')
      .filter({ hasText: 'Connect to audience' })
      .first()
    this.connectToAudience2Button = this.page
      .locator('label')
      .filter({ hasText: 'Connect to audience' })
      .nth(1)
    this.campaignSendButton = this.page.getByText('send', { exact: true })
    this.Toastmsg = this.page.locator(
      '.Toastify__toast-container--bottom-right'
    )
    this.campaignCreatedText = this.page.getByText(
      'Campaign created successfully'
    )
    this.campaignUpdatedText = this.page.getByText(
      'Campaign updated successfully'
    )
    this.notificationsButton = this.page.getByRole('button', {
      name: 'Notifications',
    })
    this.notificationCard = this.page.locator(
      'div:nth-child(27) > .NotificationCardWithHeader_wrapper__368pZ > .NotificationCard_wrapper__1-myM'
    )
    this.openFirstInCampaignPerformance = this.page
      .locator(
        '.SmartTable-module_sticky__inZzK > .SmartTable-module_cellContentWrapper__ppYvz > .SmartTable-module_cellContent__fmjZa > .DKumEEqKiJl6DXQFDyR_'
      )
      .first()
    this.nameCampaignPerformance = this.page
      .getByRole('cell', { name: 'new', exact: true })
      .locator('div')
      .nth(1)
    this.sentFirstCampaignPerformance = this.page
      .locator(
        'td:nth-child(2) > .SmartTable-module_cellContentWrapper__ppYvz > .SmartTable-module_cellContent__fmjZa > .DKumEEqKiJl6DXQFDyR_'
      )
      .first()
    this.bounceFirstCampaignPerformance = this.page
      .locator(
        'td:nth-child(3) > .SmartTable-module_cellContentWrapper__ppYvz > .SmartTable-module_cellContent__fmjZa > .DKumEEqKiJl6DXQFDyR_'
      )
      .first()
    this.sideBarButton = this.page
      .locator('div')
      .filter({
        hasText:
          /^DashboardCampaignsAudience© innoscripta AG 2025Imprint-Data Protection-T&C$/,
      })
      .getByRole('button')
      .nth(3)
    this.campaignNameColumn = this.page
      .getByTitle('Campaign Name')
      .locator('div')
      .nth(1)
    this.audienceColumn = this.page.getByTitle('Audience').locator('div').nth(1)
    this.contactsColumn = this.page.getByTitle('Contacts').locator('div').nth(1)
    this.sentColumn = this.page.getByTitle('Sent').locator('div').nth(1)
    this.sentByColumn = this.page.getByTitle('Sent by').locator('div').nth(1)
    this.participantsColumn = this.page
      .getByTitle('Participants')
      .locator('div')
      .nth(1)
    this.statusColumn = this.page.getByTitle('Status').locator('div').nth(1)
    this.searchByCampaign = this.page.getByPlaceholder(
      'Search by campaign name...'
    )
    this.allStatusFilter = this.page.getByText('All Status')
    this.allStatusCancelButton = this.page.getByText('Cancel')
    this.campaignsFilterButton = this.page.getByText('Campaigns')
    this.campaignClearAllFilterButton = this.page.getByText('Clear All')
    this.templateFilterButton = this.page.getByText('Templates')
    this.templateFilterDropdownButton = this.page.locator('.dropdown-button')
    this.templateFilterDropdownSearchField = this.page.getByPlaceholder(
      'Search templates...'
    )
    this.templateFilterDropdownOption = this.page.locator('.dropdown-option')
    this.userFilterButton = this.page.getByText('Users')
    this.userFilterDropdownOption = this.page.locator('.user-option')
    this.userFilterDropdownButton = this.page.locator('.user-dropdown')
    this.userFilterDropdownSearchField =
      this.page.getByPlaceholder('Search users...')
    this.audienceFilterButton = this.page.getByText('Audiences')
    this.audienceFilterDropdownButton = this.page.locator('.audience-dropdown')
    this.audienceFilterDropdownOption = this.page.locator('.audience-option')
    this.audiencFilterDropdownSearchField = this.page.getByPlaceholder(
      'Search audiences...'
    )
    this.scheduledAtFilterButton = this.page.getByText('Scheduled At')
    this.completedBeforeFilterButton = this.page.getByText('Completed Before')
    this.completedAfterFilterButton = this.page.getByText('Completed After')
    this.completedAfterDatePicker =
      this.page.getByPlaceholder('Select a date...')
    this.completedBeforeDatePicker =
      this.page.getByPlaceholder('Select a date...')
    this.orderByFilterButton = this.page.getByText('Order By')
    this.orderByClearSelectionButton = this.page.getByText('Clear Selection')
    this.orderByCreatedAtButton = this.page.getByText('Created At')
    this.orderByCompletedAtButton = this.page.getByText('Completed At')
    this.orderByUpdatedAtButton = this.page.getByText('Updated At')
    this.orderByScheduledAtButton = this.page.getByText('Scheduled At')
    this.tableItemsCount = this.page.getByText('items')
    this.campaignMultiSelectButton = this.page.locator('.multi-select-button')
    this.campaignSelectAllButton = this.page.locator('.select-all-button')
    this.selectedCount = this.page.getByText('selected')
    this.deleteSelected = this.page.locator('.delete-selected')
    this.duplicateSelected = this.page.locator('.duplicate-selected')
    this.tableContent = this.page.locator('.table-content')
    this.emailRefreshButton = this.page.getByText('Refresh Emails')
    this.recruiterName = this.page.getByText('Recruiter Name')
    this.greetingName = this.page.getByText('Greeting Name')
    this.recruiterNameaudienceDropdown = this.page.getByRole('textbox', {
      name: 'Select audience column',
    })
    this.greetingNameaudienceDropdown = this.page
      .getByRole('textbox', { name: 'Select audience column' })
      .nth(1)
    this.value1 = this.page.getByText('Firstname').first()
    this.value2 = this.page.getByText('Firstname').nth(1)
    this.emailSelect = this.page.locator('.email-select')
    this.formTextInput = this.page.locator('.form-text-input')
    this.audienceTitle = this.page.locator('input[name="name"]')
  }
}
