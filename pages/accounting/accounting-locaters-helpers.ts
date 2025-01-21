import { Locator, Page } from '@playwright/test';

export class PageLocators {
  successMessage // Report Creation and Interaction
      (successMessage: any) {
          throw new Error('Method not implemented.');
  }
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Sidebar Items
  public get accountinglistbutton(): Locator {
    return this.page.getByRole('link', { name: 'Accounting Account overview,' });
  }
  public get paymentssidebarbutton(): Locator {
    return this.page.getByRole('button', { name: 'Payments' });
  }
  public get paymentstransactionsidebarbutton(): Locator {
    return this.page.getByRole('button', { name: 'Payment Transactions' });
  }
  public get paymentsanalysissidebarbutton(): Locator {
    return this.page.getByRole('button', { name: 'Payment Analysis' });
  }
  public get incomesidebarbutton(): Locator {
    return this.page.getByRole('button', { name: 'Income' });
  }
  public get invoicessidebarbutton(): Locator {
    return this.page.getByRole('button', { name: 'Invoices' });
  }
  public get categoriessidebarbutton(): Locator {
    return this.page.getByRole('button', { name: 'Categories' });
  }
  public get reportssidebarbutton(): Locator {
    return this.page.getByRole('button', { name: 'Reports' });
  }
  public get dashboardsidebarbutton(): Locator {
    return this.page.getByRole('button', { name: 'Dashboard' });
  }

  // Dashboard Actions
  public get dashboardexpandbutton(): Locator {
    return this.page.locator('._collapseButton_16zcl_522');
  }
  public get dashboardcollapsebutton(): Locator {
    return this.page.locator('._collapseButton_16zcl_522');
  }

  // Bank Account Filters
  public get searchibanfilter(): Locator {
    return this.page.getByPlaceholder('Search for Title, Name or IBAN');
  }
  public get connectbankbutton(): Locator {
    return this.page.getByRole('button', { name: 'Connect bank account' });
  }
  public get ibanfocusbutton(): Locator {
    return this.page.getByPlaceholder('TR34-0000-0000-0000-0000-');
  }
  public get currencydropdown(): Locator {
    return this.page.getByPlaceholder('Bank Account Currency');
  }

  // Report Creation and Interaction
  public get createnewreportbutton(): Locator {
    return this.page.getByRole('button', { name: 'New Report' });
  }
  public get reporttitlebutton(): Locator {
    return this.page.getByRole('button', { name: 'Untitled' });
  }
  public get addpointbutton(): Locator {
    return this.page.getByRole('button', { name: 'Add point' });
  }
  public get addcolumnbutton(): Locator {
    return this.page.locator('button:has-text("Add column")').first();
  }
  public get reportsavebutton(): Locator {
    return this.page.getByRole('button', { name: 'Save' });
  }
  public get successtoast(): Locator {
    return this.page.locator('text=Report created successfully!');
  }

  // Description Fields
  public get adddescriptionbutton(): Locator {
    return this.page.getByText('Add description');
  }
  public get descriptionfield(): Locator {
    return this.page.getByPlaceholder('Add description');
  }

  // Value Fields
  public get valuefield(): Locator {
    return this.page.getByText('0.00');
  }
  public get valueinputfield(): Locator {
    return this.page.locator('input[type="text"]');
  }

  // KPI Fields
  public get kpirow(): Locator {
    return this.page.locator('tr:nth-child(4) > .p3k2W4DXg_BZ9v1aPgj7 > .viEnUSthJq0OKJu9bPFT > .my-custom-wrapper > .WVerQRu5lq3fYxohEgew > .g269wptdluTiA95H9hS5');
  }
  public get addkpibutton(): Locator {
    return this.page.getByRole('button', { name: 'Add KPI' });
  }

  // Dropdown Fields
  public get monthsbutton(): Locator {
    return this.page.getByRole('button', { name: 'Months' });
  }
  public get maybutton(): Locator {
    return this.page.locator('[id="headlessui-popover-panel-\\:r2r\\:"]').getByRole('button', { name: 'May' });
  }

  // Company and User Assignments
  public get companydropdown(): Locator {
    return this.page.locator('._field_12ii0_1');
  }
  public get selectcompanyplaceholder(): Locator {
    return this.page.getByPlaceholder('Select a company');
  }
  public get companyoption(): Locator {
    return this.page.getByRole('button', { name: 'Schaeffler AG' });
  }
  public get assignusersdiv(): Locator {
    return this.page.locator('div').filter({ hasText: /^Assign users$/ });
  }
  public get useroption(): Locator {
    return this.page.locator('span');
  }
  public get finalassignusersbutton(): Locator {
    return this.page.locator('div:nth-child(5) > .UTEKOvK_lqus0VlXvuJY');
  }
  public get currencyeditUSDoption(): Locator {
    return this.page.getByText('US Dollar');
  }
  public get body(): Locator {
    return this.page.locator('body');
  }
  public get optionalplaceholder(): Locator {
    return this.page.getByPlaceholder('Optional');
  }
  public get manualtrackingbutton(): Locator {
    return this.page.getByText('Manual TrackingYou need to');
  }
  public get connectaccountbutton(): Locator {
    return this.page.getByRole('button', { name: 'Connect account' });
  }
  public get successmessagelocator(): Locator {
    return this.page.locator('text=Account successfully added');
  }
  public get paymentsbutton(): Locator {
    return this.page.getByRole('button', { name: 'Payments' });
  }
  public get searchibanplaceholder(): Locator {
    return this.page.getByPlaceholder('Search for Title, Name or IBAN');
  }
  public get editbankbutton(): Locator {
    return this.page.locator('div:nth-child(3) > .SmartTable-module_tableWrapper__O2vT5 > .SmartTable-module_smartTable__nylwu > tbody > tr > td:nth-child(10) > .SmartTable-module_cellContentWrapper__ppYvz > .SmartTable-module_cellContent__fmjZa > .ca-gap-yellow').first();
  }
  public get bankcurrencyplaceholder(): Locator {
    return this.page.getByPlaceholder('Bank Account Currency');
  }
  public get closecurrencydropdown(): Locator {
    return this.page.locator('div:nth-child(2) > div > div > div > .ca-relative > svg').first();
  }
  public get editbanksavebutton(): Locator {
    return this.page.getByRole('button', { name: 'Save' });
  }
  
  

  // Example Actions
  public async clickaccountinglistbutton(): Promise<void> {
    await this.accountinglistbutton.click();
  }

  public async clickcreatenewreportbutton(): Promise<void> {
    await this.createnewreportbutton.click();
  }

  public async clickreportssidebarbutton(): Promise<void> {
    await this.reportssidebarbutton.click();
  }
}
