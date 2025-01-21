import { Locator, Page } from '@playwright/test';

export class PageLocators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Add your variable names and locators here
  get accountingListButton(): Locator { return this.page.getByRole('link', { name: 'Accounting Account overview,' }) }
  get paymentsSidebarButton(): Locator { return this.page.getByRole('button', { name: 'Payments' }); }
  get paymentsTransactionSidebarButton(): Locator { return this.page.getByRole('button', { name: 'Payment Transactions' }); }
  get paymentsAnalysisSidebarButton(): Locator { return this.page.getByRole('button', { name: 'Payment Analysis' }); }
  get incomeSidebarButton(): Locator { return this.page.getByRole('button', { name: 'Income' }); }
  get invoicesSidebarButton(): Locator { return this.page.getByRole('button', { name: 'Invoices' }); }
  get categoriesSidebarButton(): Locator { return this.page.getByRole('button', { name: 'Categories' }); }
  get reportsSidebarButton(): Locator { return this.page.getByRole('button', { name: 'Reports' })}
  get dashboardSidebarButton(): Locator { return this.page.getByRole('button', { name: 'Dashboard' })}
  get dashboardExpandButton(): Locator { return this.page.locator('._collapseButton_16zcl_522')}
  get dashboardCollapseButton(): Locator { return this.page.locator('._collapseButton_16zcl_522')}
  get searchIbanFilter(): Locator { return this.page.getByPlaceholder('Search for Title, Name or IBAN')}
 
  get connectBankButton(): Locator { return this.page.getByRole('button', { name: 'Connect bank account' })}
  get ibanfocusButton(): Locator { return this.page.getByPlaceholder('TR34-0000-0000-0000-0000-')}
  get currencyDropdown(): Locator { return this.page.getByPlaceholder('Bank Account Currency')}

  //Reports Locaters













































  
  get newCampaignButton(): Locator { return this.page.getByText('New Campaign'); }
  get sendToDropdown(): Locator { return this.page.getByLabel('Send to'); }
  get selectEmailAddressDrodown(): Locator { return this.page.getByPlaceholder('Select email address'); }
  get enterNameInput(): Locator { return this.page.getByPlaceholder('Enter name'); }
  get enterSubjectInput(): Locator { return this.page.getByPlaceholder('Enter subject'); }
  get sendNowButton(): Locator { return this.page.locator('label').filter({ hasText: 'Send nowSend your email right' }); }
  get scheduleTimingButton(): Locator { return this.page.getByText('Schedule a timing'); }
  get templateButton(): Locator { return this.page.getByText('Template', { exact: true }); }
  get backToCampaignsButton(): Locator { return this.page.getByRole('button', { name: 'Back to campaigns' }); }
  get excludeRecipientDropdown(): Locator { return this.page.getByLabel('Exclude recipient (optional)'); }
  get saveAsDraftButton(): Locator { return this.page.getByText('Save as draft'); }
  get addParticipantButton(): Locator { return this.page.locator('div').filter({ hasText: /^BackUntitled campaignSave as draftsend$/ }).getByRole('button').nth(1)}
  get closeAddParticipantModalButton(): Locator { return this.page.locator('#undefined').getByRole('button')}
  get searchParticipantField(): Locator { return this.page.getByPlaceholder('User Name')}
  get paricipantList(): Locator { return this.page.getByRole('heading', { name: 'Participant List' })}
  get cancelAddParticipantButton(): Locator { return this.page.locator('div').filter({ hasText: /^Cancel$/ }).first()}
  get saveAddParticipantButton(): Locator { return this.page.locator('div').filter({ hasText: /^Save$/ }).first()}
  get campaignDetailsSectionButton(): Locator { return this.page.locator('li').filter({ hasText: 'Details' })}
  get campaignSendTimeSectionButton(): Locator { return this.page.locator('li').filter({ hasText: 'Send Time' })}
  get selectTimeButton(): Locator { return this.page.getByRole('button', { name: 'Select a delivery date' })}
  get sendTimeButton(): Locator { return this.page.getByText('Send Time'); }
  get minutesButton(): Locator { return this.page.getByRole('button', { name: '26' }).nth(1)}
  get hoursButton(): Locator { return this.page.getByRole('button', { name: '06' }).first()}
  get variablesSectionButton(): Locator { return this.page.locator('li').filter({ hasText: 'Variables' })}
  get connectToAudienceButton(): Locator { return this.page.locator('label').filter({ hasText: 'Connect to audience' }).first()}
  get campaignCreatedText(): Locator { return this.page.getByText('Campaign created successfully'); }
  get campaignUpdatedText(): Locator { return this.page.getByText('Campaign updated successfully'); }
  get notificationsButton(): Locator { return this.page.getByRole('button', { name: 'Notifications' }); }
  get notificationCard(): Locator { return this.page.locator('div:nth-child(27) > .NotificationCardWithHeader_wrapper_368pZ > .NotificationCard_wrapper_1-myM'); }
  get openFirstInCampaignPerformance(): Locator { return this.page.locator('.SmartTable-module_sticky_inZzK > .SmartTable-module_cellContentWrapperppYvz > .SmartTable-module_cellContentfmjZa > .DKumEEqKiJl6DXQFDyR').first()}
  get nameCampaignPerformance(): Locator { return this.page.getByRole('cell', { name: 'new', exact: true }).locator('div').nth(1)}
  get sentFirstCampaignPerformance(): Locator { return this.page.locator('td:nth-child(2) > .SmartTable-module_cellContentWrapper_ppYvz > .SmartTable-module_cellContentfmjZa > .DKumEEqKiJl6DXQFDyR').first()}
  get bounceFirstCampaignPerformance(): Locator { return this.page.locator('td:nth-child(3) > .SmartTable-module_cellContentWrapper_ppYvz > .SmartTable-module_cellContentfmjZa > .DKumEEqKiJl6DXQFDyR').first()}
  get sideBarButton(): Locator { return this.page.locator('div').filter({ hasText: /^DashboardCampaignsAudience© innoscripta AG 2025Imprint-Data Protection-T&C$/ }).getByRole('button').nth(3)}
  get campaignNameColumn(): Locator { return this.page.getByTitle('Campaign Name').locator('div').nth(1)}
  get audienceColumn(): Locator { return this.page.getByTitle('Audience').locator('div').nth(1)}
  get contactsColumn(): Locator { return this.page.getByTitle('Contacts').locator('div').nth(1)}
  get sentColumn(): Locator { return this.page.getByTitle('Sent', { exact: true }).locator('div').nth(1)}
  get sentByColumn(): Locator { return this.page.getByTitle('Sent', { exact: true }).locator('div').nth(1)}
  get participantsColumn(): Locator { return this.page.getByTitle('Participants').locator('div').nth(1)}
  get statusColumn(): Locator { return this.page.getByTitle('Status').locator('div').nth(1)}
  get searchByCampaign(): Locator { return this.page.getByPlaceholder('Search by campaign')}
  get allStatusFilter(): Locator { return this.page.getByRole('button', { name: 'All Statuses' })}
  get allStatusCancelButton(): Locator { return this.page.locator('svg.ca-btn.ca-fill-grey-dark.hover\:ca-fill-theme.active\:ca-fill-theme-dark')}
  get campaignsFilterButton(): Locator { return this.page.locator('div').filter({ hasText: /^Filter$/ }).nth(1)}
  get campaignClearAllFilterButton(): Locator { return this.page.getByRole('button', { name: 'Clear all filters' })}
  get templateFilterButton(): Locator { return this.page.locator('.styles-module_title__9rMDW').first()}
  get templateFilterDropdownButton(): Locator { return this.page.getByRole('button', { name: 'Templates' })}
  get templateFilterDropdownSearchField(): Locator { return this.page.locator('.ca-mb-yellow > div').first()}
 get templateFilterDropdownOption(): Locator { return this.page.locator('div.ca-px-green:has-text("DREGERG")')}
  get userFilterButton(): Locator { return this.page.getByText('Users').nth(1)}
  get userFilterDropdownOption(): Locator { return this.page.locator('div').filter({ hasText: /^Madeline Vandervort-Corwin$/ }).first()}
  get userFilterDropdownButton(): Locator { return this.page.getByRole('button', { name: 'Users' })}
  get userFilterDropdownSearchField(): Locator { return this.page.locator('div:nth-child(5) > .ca-mb-yellow > div').first()}
  get audienceFilterButton(): Locator { return this.page.getByText('Audience', { exact: true }).nth(2)}
  get audienceFilterDropdownButton(): Locator { return this.page.locator('#multi-select-3897-1996')}
  get audienceFilterDropdownOption(): Locator { return this.page.locator('#ca-portal-root').getByText('duplicate1')}
  get audiencFilterDropdownSearchField(): Locator { return this.page.locator('div:nth-child(6) > .ca-mb-yellow > div').first()}
  get scheduledAtFilterButton(): Locator { return this.page.locator('div').filter({ hasText: /^Scheduled at$/ }).nth(1)}
  get completedBeforeFilterButton(): Locator { return this.page.getByPlaceholder('Completed before')}
  get completedAfterFilterButton(): Locator { return this.page.getByPlaceholder('Completed after')}
  get completedAfterDatePicker(): Locator { return this.page.getByText('January2025MOTUWETHFRSASU3031123456789101112131415161718192021222324252627282930').nth(2)}
  get completedBeforeDatePicker(): Locator { return this.page.getByText('January2025MOTUWETHFRSASU3031123456789101112131415161718192021222324252627282930').nth(3)}
  get orderByFilterButton(): Locator { return this.page.locator('div').filter({ hasText: 'Order by' }).nth(3)}
  get orderByClearSelectionButton(): Locator { return this.page.getByRole('button', { name: 'Clear selection' })}
  get orderByCreatedAtButton(): Locator { return this.page.getByText('Created at')}
  get orderByCompletedAtButton(): Locator { return this.page.getByRole('list').getByText('Completed at')}
  get orderByUpdatedAtButton(): Locator { return this.page.getByText('Updated at')}
  get orderByScheduledAtButton(): Locator { return this.page.getByRole('list').getByText('Scheduled at')}
  get tableItemsCount(): Locator { return this.page.getByText('Table Items')}
  get campaignMultiSelectButton(): Locator { return this.page.locator('div').filter({ hasText: /^DraftScheduledQueued\.\.\.6Filter127 Table Items$/ }).getByRole('button').nth(1)}
  get campaignSelectAllButton(): Locator { return this.page.locator('div').filter({ hasText: /^Select all$/ }).first()}
  get selectedCount(): Locator { return this.page.locator('text=0 Selected') || this.page.locator('/^\d+ Selected$/');  }
  get deleteSelected(): Locator { return this.page.locator('div').filter({ hasText: /^Delete selected$/ }).first()}
  get duplicateSelected(): Locator { return this.page.locator('div').filter({ hasText: /^Duplicate selected$/ }).first()}
  get tableContent(): Locator { return this.page.getByText('CampaignsNew CampaignDraftScheduledQueued...6Filter127 Table ItemsSelect all0')}
  // get notifiwcationCard(): Locator { return this.page.}







  get recruiterName(): Locator { return this.page.getByPlaceholder('enter RecruiterName')}
  get greetingName(): Locator { return this.page.getByPlaceholder('enter Greeting')}
  get recruiterNameaudienceDropdown(): Locator { return this.page.locator('#text-input-8544-835')}
  get greetingNameaudienceDropdown(): Locator { return this.page.locator('#text-input-973-1483')}
  // get notifiwcationCard(): Locator { return this.page.}
  // get notifiwcationCard(): Locator { return this.page.}
  // get notifiwcationCard(): Locator { return this.page.}
  // get notifiwcationCard(): Locator { return this.page.}
  // get notifiwcationCard(): Locator { return this.page.}














}